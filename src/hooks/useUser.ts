import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "@/types";
import { app } from "@/config/firebaseConfig";
import { useUserContext } from "@/states/contexts";

const initialAuthState = {
	uid: "",
	displayName: "",
	isLoggedIn: false,
};

export const useUser = () => {
	const { dispatch } = useUserContext();

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((idToken) => {
					console.log(idToken);
				});
				dispatch({
					type: "SET_USER_DATA",
					payload: {
						displayName: user.displayName || "",
						uid: user.uid,
						isLoggedIn: true,
					},
				});
			} else {
				dispatch({
					type: "UNSET_USER_DATA",
				})
			}
		});

		return () => unsubscribe();
	}, []);

};
