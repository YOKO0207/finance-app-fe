import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import { HomeScreen, SettingScreen } from "@/components/screens";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					}

					return <Icon as={Ionicons} name={iconName} size="sm" color={color} />;
				},
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Login" component={SettingScreen} />
		</Tab.Navigator>
	);
};
