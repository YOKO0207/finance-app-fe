import { facebookLogout } from "@/services";
import { colors } from "@/styles";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppLayoutA } from "../layouts";

export const SettingScreen = () => {
	return (
		<AppLayoutA>
				<TouchableOpacity onPress={facebookLogout}>
					<Text style={styles.menuItem}>
						ログアウトする
					</Text>
				</TouchableOpacity>
		</AppLayoutA>
	);
};

const styles = StyleSheet.create({
	menuItem: {
		color: colors.gray[900],
		borderBottomColor: colors.gray[100],
		borderBottomWidth: 1,
		paddingBottom: 16,
	},
});
