import { Select, TextField } from "@/components/atoms";
import { CURRENCIES } from "@/constants";
import { colors } from "@/styles";
import { TransactionInput } from "@/types";
import { Formik } from "formik";
import { Button, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface Props {
	onSubmit: (input: TransactionInput) => void;
	initialValues: TransactionInput;
}

export const TransactionForm = (props: Props) => {
	const { onSubmit, initialValues } = props;

	const validationSchema = Yup.object().shape({
		amount: Yup.number().required("金額は必須です"),
		currency_type: Yup.string().required("通貨を選択してください"),
		transaction_type: Yup.number().required("transaction_typeは必須です"),
		transaction_desctiption: Yup.string(),
	});

	const handleFormSubmit = (input: TransactionInput) => {
		const convertedInput = (input = {
			amount: Number(input.amount),
			currency_type: input.currency_type,
			transaction_type: Number(input.transaction_type),
			transaction_desctiption: input.transaction_desctiption,
		});
		const validationErrors = onSubmit(convertedInput);
		return validationErrors;
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleFormSubmit}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
				values,
				errors,
				touched,
			}) => (
				<>
					<TextField
						onChangeText={handleChange("amount")}
						onBlur={handleBlur("amount")}
						value={values.amount ? values.amount.toString() : ""}
						label="金額"
						note={["支払いをした金額を入力してください。"]}
						error={touched.amount && errors.amount ? errors.amount : ""}
					/>

					<View>
						<Text>Transaction Type</Text>
						<TextInput
							onChangeText={handleChange("transaction_type")}
							onBlur={handleBlur("transaction_type")}
							value={values.transaction_type.toString()}
						/>
						{touched.transaction_type && errors.transaction_type && (
							<Text>{errors.transaction_type}</Text>
						)}
					</View>

					<TextField
						onChangeText={handleChange("transaction_desctiption")}
						onBlur={handleBlur("transaction_desctiption")}
						value={values.transaction_desctiption.toString()}
						label="支払い内容"
						note={["何に支払いをしましたか？", "例）食事代、交通費など"]}
						error={
							touched.transaction_desctiption && errors.transaction_desctiption
								? errors.transaction_desctiption
								: ""
						}
					/>

					<Select
						label="支払いをした通貨"
						note={["支払いをした通貨を入力してください。"]}
						selectedValue={values.currency_type}
						onValueChange={(itemValue) =>
							setFieldValue("currency_type", itemValue)
						}
						items={Object.entries(CURRENCIES).map(([code, symbol]) => ({
							label: `${code} (${symbol})`,
							value: code,
						}))}
						error={
							touched.currency_type && errors.currency_type
								? errors.currency_type
								: ""
						}
					/>

					<Button
						onPress={() => handleSubmit()}
						title="作成"
						color={colors.primary[500]}
					/>
				</>
			)}
		</Formik>
	);
};
