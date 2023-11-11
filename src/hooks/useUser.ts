import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "@/types";
import app from "@/config/firebaseConfig";

const initialAuthState = {
	uid: "",
	displayName: "",
	isLoggedIn: false,
};

export const useUser = () => {
	const [user, setUser] = useState<User>(initialAuthState);

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((idToken) => {
					console.log(idToken);
				});
				setUser({
					displayName: user.displayName || "",
					uid: user.uid,
					isLoggedIn: true,
				});
			} else {
				setUser(initialAuthState);
			}
		});

		return () => unsubscribe();
	}, []);

	return { user };
};
