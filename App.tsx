import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { DrawerNavigator } from "./src/components/organisms";
import {
	NoteNewScreen,
	TransactionIndexScreen,
	TransactionNewScreen
} from "./src/screens";

const Stack = createNativeStackNavigator();

export default function App() {

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
						name="TransactionIndexScreen"
						component={TransactionIndexScreen}
						options={{ title: "取引一覧" }}
					/>
					<Stack.Screen
						name="TransactionNewScreen"
						component={TransactionNewScreen}
						options={{ title: "取引登録" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
