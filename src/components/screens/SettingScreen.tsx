import { facebookLogout } from "@/services";
import { colors } from "@/styles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppLayoutA } from "../layouts";

export const SettingScreen = () => {
	return (
		<AppLayoutA>
			<View style={styles.innerContainer}>
				<TouchableOpacity onPress={facebookLogout}>
					<Text style={styles.menuItem}>ログアウトする</Text>
				</TouchableOpacity>
			</View>
		</AppLayoutA>
	);
};

const styles = StyleSheet.create({
	menuItem: {
		color: colors.gray[900],
		borderBottomColor: colors.gray[100],
		borderBottomWidth: 1,
		paddingBottom: 16,
		paddingHorizontal: 8,
	},
	innerContainer: {
		marginVertical: 16,
		marginHorizontal: 8,
	}
});
