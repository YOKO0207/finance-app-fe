import { createDrawerNavigator } from "@react-navigation/drawer";
import { NoteIndexScreen, SettingScreen } from "../../screens";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name="NoteIndexScreen"
				component={NoteIndexScreen}
				options={{ title: "ノート一覧" }}
			/>
			<Drawer.Screen
				name="SettingScreen"
				component={SettingScreen}
				options={{ title: "設定" }}
			/>
		</Drawer.Navigator>
	);
};
