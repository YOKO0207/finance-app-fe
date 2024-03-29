import { setAuthToken } from "@/adapters";
import { DrawerNavigator } from "@/components/organisms";
import {
	NoteEditScreen,
	NoteNewScreen,
	TransactionEditScreen,
	TransactionIndexScreen,
	TransactionNewScreen,
	LoginScreen,
	SettingScreen,
} from "@/components/screens";
import { auth } from "@/config/firebaseConfig";
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
import { ReactElement } from "react";
import { useUser } from "@/hooks";
import { UserProvider, useUserContext } from "@/states/contexts";

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
		<UserProvider>
			<AppWrapper>
				<NativeBaseProvider>
					<SheetProvider>
						<AppNavigator />
						<FlashMessage position="bottom" />
					</SheetProvider>
				</NativeBaseProvider>
			</AppWrapper>
		</UserProvider>
	);
}

interface AppWrapperProps {
	children: ReactElement;
}
const AppWrapper = (props: AppWrapperProps) => {
	const { children } = props;

	useUser();

	return <>{children}</>;
};

const AppNavigator = () => {
	const { state: user } = useUserContext();
	return (
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
			{user.isLoggedIn ? (
			<>
				<Stack.Screen
					name="Drawer"
					component={DrawerNavigator}
					options={{
						headerShown: false,
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
					options={{ title: "トラベル編集" }}
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
			</>
			) : (
			<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{ title: "ログイン", headerShown: false }}
				/>
				)}
				</Stack.Navigator>
		</NavigationContainer>
	);
}