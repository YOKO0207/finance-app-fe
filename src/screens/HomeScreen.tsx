import { StatusBar } from "expo-status-bar";
import { Button, FormControl, Text } from "native-base";
import { View } from "react-native";
import { useUser } from "../hooks";
import { facebookLogout } from "../services";

export const HomeScreen = () => {
	const { user } = useUser();
	
	return (
		<View>
			<Text>Welcome {user.displayName}</Text>
			<FormControl width="100%" alignItems={"center"}>
				{user.isLoggedIn && (
					<Button
						backgroundColor="blue.500"
						width="90%"
						onPress={facebookLogout}
					>
						<Text color="white">Facebook logout</Text>
					</Button>
				)}
			</FormControl>
			<StatusBar style="auto" />
		</View>
	);
};
