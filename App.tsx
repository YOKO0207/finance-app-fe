import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { DrawerNavigator } from "@/components/organisms";
import {
	NoteNewScreen,
	TransactionIndexScreen,
	TransactionNewScreen,
	TransactionEditScreen,
	NoteEditScreen,
} from "@/components/screens";
import FlashMessage from "react-native-flash-message";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "@/config/firebaseConfig";
import { setAuthToken } from "@/adapters"

const Stack = createNativeStackNavigator();

export default function App() {

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdToken().then((idToken) => {
					setAuthToken(idToken);
				});
			} else {
				setAuthToken(null);
			}
		});

		return () => unsubscribe(); // Cleanup subscription on unmount
	}, []);

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Drawer"
						component={DrawerNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="NoteNewScreen"
						component={NoteNewScreen}
						options={{ title: "ノート新規作成" }}
					/>
					<Stack.Screen
						name="NoteEditScreen"
						component={NoteEditScreen}
						options={{ title: "ノート編集" }}
					/>
					<Stack.Screen
						name="TransactionIndexScreen"
						component={TransactionIndexScreen}
						options={{ title: "取引一覧" }}
					/>
					<Stack.Screen
						name="TransactionNewScreen"
						component={TransactionNewScreen}
						options={{ title: "取引登録" }}
					/>
					<Stack.Screen
						name="TransactionEditScreen"
						component={TransactionEditScreen}
						options={{ title: "取引編集" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			<FlashMessage position="bottom" />
		</NativeBaseProvider>
	);
}
