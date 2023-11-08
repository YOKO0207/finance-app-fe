import {
	getAuth,
	signInWithCredential,
	FacebookAuthProvider,
} from "firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import app from "../config/firebaseConfig";

export const facebookLogin = async () => {
	const result = await LoginManager.logInWithPermissions([
		"public_profile",
		"email",
	]);
	if (result.isCancelled) {
		throw "User cancelled the login process";
	}
	const data = await AccessToken.getCurrentAccessToken();
	if (!data) {
		throw "Something went wrong obtaining access token";
	}

	const auth = getAuth(app);
	const facebookAuthProvider = FacebookAuthProvider.credential(
		data.accessToken
	);
	signInWithCredential(auth, facebookAuthProvider)
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});
};
