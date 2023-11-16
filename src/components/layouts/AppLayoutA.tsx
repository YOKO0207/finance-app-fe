import { colors } from "@/styles";
import globalStyles from "@/styles/globalStyles";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Box } from "native-base";

interface Props {
	children: ReactNode;
	navigateToNewScreen?: () => void;
}

export const AppLayoutA = (props: Props) => {
	const { children, navigateToNewScreen } = props;

	return (
		<View style={globalStyles.container}>
			<Box style={styles.logo}>
				<Ionicons
					name="airplane"
					size={24}
					color={colors.primary[200]}
				/>
				<Text style={styles.logoText}>Travel Split</Text>
			</Box>
			{children}

			{navigateToNewScreen && (
				<TouchableOpacity style={styles.fab} onPress={navigateToNewScreen}>
					<MaterialIcons name="add" size={32} color="white" />
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		width: 56,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
		right: 20,
		bottom: 20,
		backgroundColor: colors.primary[500],
		borderRadius: 28,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 2,
	},
	fabIcon: {
		fontSize: 24,
		color: "white",
	},
	logo: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 24,
		gap: 4,
	},
	logoText: {
		color: colors.primary[200],
		fontWeight: "bold"
	}
});
