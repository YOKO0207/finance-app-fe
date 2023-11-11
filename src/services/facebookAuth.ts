import {
	FacebookAuthProvider,
	getAuth,
	signInWithCredential,
	signOut,
} from "firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import app from "../config/firebaseConfig";

const auth = getAuth(app);

export const facebookLogin = async () => {
	const result = await LoginManager.logInWithPermissions([
		"public_profile"
	]);
	if (result.isCancelled) {
		throw "User cancelled the login process";
	}
	const data = await AccessToken.getCurrentAccessToken();
	if (!data) {
		throw "Something went wrong obtaining access token";
	}

	
	const facebookAuthProvider = FacebookAuthProvider.credential(
		data.accessToken
	);
	signInWithCredential(auth, facebookAuthProvider)
		.then((user) => {
			console.log(user);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const facebookLogout = async () => {
	const auth = getAuth(app);

	// Sign out from Firebase
	try {
		await signOut(auth)
			.then(() => {
				console.log("User signed out from Firebase");
			})
			.catch((error) => {
				console.error("Firebase sign out error", error);
			});

		// Log out from Facebook
		LoginManager.logOut();
		console.log("User logged out from Facebook");
	} catch (error) {
		console.log(error);
	}
};
