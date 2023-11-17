import { setAuthToken } from "@/adapters";
import { DrawerNavigator } from "@/components/organisms";
import {
	NoteEditScreen,
	NoteNewScreen,
	TransactionEditScreen,
	TransactionIndexScreen,
	TransactionNewScreen,
} from "@/components/screens";
import app from "@/config/firebaseConfig";
import { colors } from "@/styles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { SheetProvider } from "react-native-actions-sheet";
import "./src/components/organisms/actionSheets/sheets";

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
			<SheetProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: colors.primary[500] },
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
					}}
				>
					<Stack.Screen
						name="Drawer"
						component={DrawerNavigator}
						options={{
							headerShown: false,
							headerStyle: {
								backgroundColor: "blue",
							},
						}}
					/>
					<Stack.Screen
						name="NoteNewScreen"
						component={NoteNewScreen}
						options={{ title: "トラベル登録" }}
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
			</SheetProvider>
		</NativeBaseProvider>
	);
}
