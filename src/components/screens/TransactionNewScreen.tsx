import { useTransactionCreateHandler } from "@/hooks";
import { TransactionCreateInput } from "@/types";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CURRENCIES } from "@/constants";
import * as Yup from "yup";

interface Props {
	route: any;
}

export const TransactionNewScreen = ({ route }: Props) => {
	const { noteId } = route.params;
	const { handleTransactionCreate } = useTransactionCreateHandler();

	const validationSchema = Yup.object().shape({
		amount: Yup.number().required("amountは必須です"),
		currency_type: Yup.string().required("通貨を選択してください"),
		transaction_type: Yup.number().required("transaction_typeは必須です"),
		transaction_desctiption: Yup.string(),
	});

	const initialValues = {
		amount: 0,
		currency_type: "",
		transaction_type: 1,
		transaction_desctiption: "",
	};

	const handleFormSubmit = (input: TransactionCreateInput) => {
		const convertedInput = input = {
			amount: Number(input.amount),
			currency_type: input.currency_type,
			transaction_type: Number(input.transaction_type),
			transaction_desctiption: input.transaction_desctiption,
		}
		const validationErrors = handleTransactionCreate({
			input: convertedInput,
			noteId,
		});
		return validationErrors;
	};

	return (
		<View>
			<StatusBar style="auto" />
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
						<View style={styles.inputContainer}>
							<Text>Amount</Text>
							<TextInput
								style={styles.input}
								onChangeText={handleChange("amount")}
								onBlur={handleBlur("amount")}
								value={values.amount.toString()}
							/>
							{touched.amount && errors.amount && (
								<Text style={styles.error}>{errors.amount}</Text>
							)}
						</View>

						<View style={styles.inputContainer}>
							<Text>Transaction Type</Text>
							<TextInput
								style={styles.input}
								onChangeText={handleChange("transaction_type")}
								onBlur={handleBlur("transaction_type")}
								value={values.transaction_type.toString()}
							/>
							{touched.transaction_type && errors.transaction_type && (
								<Text style={styles.error}>{errors.transaction_type}</Text>
							)}
						</View>

						<View style={styles.inputContainer}>
							<Text>Transaction description</Text>
							<TextInput
								style={styles.input}
								onChangeText={handleChange("transaction_desctiption")}
								onBlur={handleBlur("transaction_desctiption")}
								value={values.transaction_desctiption}
							/>
							{touched.transaction_desctiption &&
								errors.transaction_desctiption && (
									<Text style={styles.error}>
										{errors.transaction_desctiption}
									</Text>
								)}
						</View>

						<View style={styles.inputContainer}>
							<Text>Select a Currency:</Text>
							<Picker
								selectedValue={values.currency_type}
								onValueChange={(itemValue) =>
									setFieldValue("currency_type", itemValue)
								}
							>
								{Object.entries(CURRENCIES).map(([code, symbol]) => (
									<Picker.Item
										key={code}
										label={`${code} (${symbol})`}
										value={code}
									/>
								))}
							</Picker>
						</View>

						<Button onPress={() => handleSubmit()} title="Submit" />
					</>
				)}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
		borderRadius: 4,
	},
	error: {
		color: "red",
	},
});
