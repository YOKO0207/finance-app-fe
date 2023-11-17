import { StyleSheet } from "react-native";
import { colors } from "@/styles";

export const inputStyles = StyleSheet.create({
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: colors.gray[40],
		padding: 10,
		borderRadius: 4,
		backgroundColor: "white",
	},
	textWrapper: {
		marginBottom: 8,
	},
	lable: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.gray[900],
	},
	noteWrapper: {
		marginTop: 8,
	},
	note: {
		color: colors.gray[200],
		fontSize: 13,
	},
	error: {
		color: "red",
	},
});
