import { NoteIndexScreen, SettingScreen } from "@/components/screens";
import { colors } from "@/styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: colors.primary[500] },
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}
		>
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
