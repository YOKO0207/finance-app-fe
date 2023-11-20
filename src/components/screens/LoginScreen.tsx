import { facebookLogin } from "@/services";
import { Text } from "react-native";
import { Button, FormControl, Box } from "native-base";
import { View, StyleSheet } from "react-native";
import { colors } from "@/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export const LoginScreen = () => {
	return (
		<View style={styles.container}>
			<Box style={styles.logo}>
				<Ionicons name="airplane" size={48} color={colors.primary[500]} />
				<Text style={styles.logoText}>Travel Split</Text>
			</Box>
			<FormControl style={styles.formControl}>
				<Button onPress={facebookLogin} style={styles.facebookLoginButton}>
					<Box style={styles.facebookLoginButtonInnerWrapper}>
						<Ionicons name="logo-facebook" size={28} color="white" />
						<Text style={styles.facebookLoginButtonText}>
							Facebookでログインする
						</Text>
					</Box>
				</Button>
				
			</FormControl>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "center",
		backgroundColor: "white",
		alignItems: "center",
	},
	formControl: {
		width: "100%",
		alignItems: "center",
	},
	facebookLoginButton: {
		backgroundColor: "#4267B2",
		width: "90%",
		textAlign: "center",
	},
	facebookLoginButtonInnerWrapper: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		gap: 8,
	},
	facebookLoginButtonText: {
		color: "white",
		fontSize: 16,
	},
	logo: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 100,
		gap: 4,
	},
	logoText: {
		color: colors.primary[500],
		fontWeight: "bold",
		fontSize: 32,
	},
});


