import { facebookLogin } from "@/services";
import { Text, Image, Linking, TouchableOpacity, Alert } from "react-native";
import { Button, FormControl, Box } from "native-base";
import { View, StyleSheet } from "react-native";
import { colors } from "@/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export const LoginScreen = () => {

	const openURL = async () => {
		const url = "https://yoko0207.github.io/travel-split-privacy-policy.github.io/";
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
	};

	return (
		<View style={styles.container}>
			<Box style={styles.logoWrapper}>
				<Image
					source={require("../../../assets/logo.jpg")}
					alt="logo"
					style={styles.logoImage}
				/>
			</Box>
			<FormControl style={styles.formControl}>
				<Button onPress={facebookLogin} style={styles.facebookLoginButton}>
					<Box style={styles.facebookLoginButtonInnerWrapper}>
						<Ionicons name="logo-facebook" size={24} color="white" />
						<Text style={styles.facebookLoginButtonText}>
							Facebookでログインする
						</Text>
					</Box>
				</Button>
			</FormControl>
			
			<Box style={styles.privacyPolicyWrapper}>
				<Text style={styles.privacyPolicyText}>
					ログインすることで
				</Text>
				<TouchableOpacity onPress={() => openURL()}>
					<Text style={styles.privacyPolicyLink}>プライバシーポリシー</Text>
				</TouchableOpacity>
				<Text style={styles.privacyPolicyText}>に同意します。</Text>
			</Box>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 60,
	},
	formControl: {
		width: "100%",
		alignItems: "center",
	},
	facebookLoginButton: {
		backgroundColor: "#4267B2",
		width: "85%",
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
		fontSize: 14,
	},
	logo: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 50,
		gap: 4,
	},
	logoText: {
		color: colors.primary[500],
		fontWeight: "bold",
		fontSize: 32,
	},
	logoWrapper: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		height: "85%",
	},
	logoImage: {
		marginTop: 60,
		width: 220,
		height: 240,
	},
	privacyPolicyWrapper: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	privacyPolicyText: {
		color: colors.gray[900],
		fontSize: 12,
	},
	privacyPolicyLink: {
		color: colors.primary[600]
	},
});


