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
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

export default function App() {

	useEffect(() => {
		// Initialize Axios token on app start
		initAxiosAuthToken();

		// set auth token to axios header when user auth state changes
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken();
				await SecureStore.setItemAsync("userToken", token);
				setAuthToken(token);
			} else {
				await SecureStore.deleteItemAsync("userToken");
				setAuthToken(null);
			}
		});

		// unsubscribe to the listener when unmounting
		return () => unsubscribe();
	}, []);

	// get stored token from secure store and set it to axios header
	const initAxiosAuthToken = async () => {
		const storedToken = await SecureStore.getItemAsync("userToken");
		setAuthToken(storedToken);
	};

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
