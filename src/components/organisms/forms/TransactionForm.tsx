import { ChipSelect, Select, TextField } from "@/components/atoms";
import { CURRENCIES, TRANSACTION_TYPE_ITEMS } from "@/constants";
import { colors } from "@/styles";
import { TransactionInput } from "@/types";
import { Formik } from "formik";
import { Button, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface Props {
	onSubmit: (input: TransactionInput) => void;
	initialValues: TransactionInput;
	editScreen?: boolean;
}

export const TransactionForm = (props: Props) => {
	const { onSubmit, initialValues, editScreen = false } = props;

	const validationSchema = Yup.object().shape({
		amount: Yup.number().required("金額は必須です"),
		currency_type: Yup.string().required("通貨を選択してください"),
		sign: Yup.number().required("種別は必須です"),
		transaction_desctiption: Yup.string(),
	});

	const handleFormSubmit = (input: TransactionInput) => {
		const convertedInput = (input = {
			amount: Number(input.amount),
			currency_type: input.currency_type,
			sign: Number(input.sign),
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
					<ChipSelect
						label=""
						items={TRANSACTION_TYPE_ITEMS}
						selectedValue={values.sign}
						onSelect={(value) => setFieldValue("sign", value)}
						error={touched.sign && errors.sign ? errors.sign : ""}
					/>
					<TextField
						onChangeText={handleChange("amount")}
						onBlur={handleBlur("amount")}
						value={values.amount ? values.amount.toString() : ""}
						label="金額"
						note={["支払いをした金額を入力してください。"]}
						error={touched.amount && errors.amount ? errors.amount : ""}
					/>

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

					{!editScreen && (
						<Select
							label="支払いをした通貨"
							note={["支払いをした通貨を入力してください。"]}
							selectedValue={values.currency_type}
							onValueChange={(itemValue) =>
								setFieldValue("currency_type", itemValue)
							}
							items={Object.entries(CURRENCIES).map(([code, currency]) => ({
								label: `${currency.name} (${currency.symbol})`,
								value: code,
							}))}
							error={
								touched.currency_type && errors.currency_type
									? errors.currency_type
									: ""
							}
						/>
					)}

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
