import { useNoteCreateHandler } from "@/hooks";
import { NoteCreateInput } from "@/types";
import { StatusBar } from "expo-status-bar";
import {
	View,
	TextInput,
	Button,
	Text,
	StyleSheet
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import { Formik } from "formik";
import { CURRENCIES } from "@/constants";

export const NoteNewScreen = () => {
	const { handleNoteCreate } = useNoteCreateHandler();

	const validationSchema = Yup.object().shape({
		note_title: Yup.string().required("タイトルは必須です"),
		person_name: Yup.string().required("相手の名前は必須です"),
		currency_type: Yup.string().required("通貨を選択してください"),
	});

	const initialValues = {
		note_title: "",
		person_name: "",
		currency_type: "",
	};

	const handleFormSubmit = (input: NoteCreateInput) => {
		const validationErrors = handleNoteCreate({ input });
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
							<Text>Note Title</Text>
							<TextInput
								style={styles.input}
								onChangeText={handleChange("note_title")}
								onBlur={handleBlur("note_title")}
								value={values.note_title}
							/>
							{touched.note_title && errors.note_title && (
								<Text style={styles.error}>{errors.note_title}</Text>
							)}
						</View>

						<View style={styles.inputContainer}>
							<Text>Person Name</Text>
							<TextInput
								style={styles.input}
								onChangeText={handleChange("person_name")}
								onBlur={handleBlur("person_name")}
								value={values.person_name}
							/>
							{touched.person_name && errors.person_name && (
								<Text style={styles.error}>{errors.person_name}</Text>
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