import { useNoteDetailSWR, useNoteUpdateHandler } from "@/hooks";
import { NoteUpdateInput } from "@/types";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface Props {
	route: any;
}

export const NoteEditScreen = ({ route }: Props) => {
	const { noteId } = route.params;
	const { data: note } = useNoteDetailSWR({ noteId });

	const { handleNoteUpdate } = useNoteUpdateHandler();

	const validationSchema = Yup.object().shape({
		note_title: Yup.string().required("タイトルは必須です"),
		person_name: Yup.string().required("相手の名前は必須です"),
	});

	const initialValues = {
		note_title: note?.data?.data?.note_title || "",
		person_name: note?.data?.data?.note_title || "",
	};

	const handleFormSubmit = (input: NoteUpdateInput) => {
		const validationErrors = handleNoteUpdate({ input, noteId });
		return validationErrors;
	};

	return (
		<View>
			<StatusBar style="auto" />
			<Text>{note?.data?.data?.note_title}</Text>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleFormSubmit}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
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

						<Button onPress={() => handleSubmit()} title="Submit" />
					</>
				)}
			</Formik>
			<Text>{noteId}</Text>
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
