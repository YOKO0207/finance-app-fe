import { StatusBar } from "expo-status-bar";
import { Button, FormControl, Text } from "native-base";
import { View } from "react-native";
import { facebookLogin } from "../services";

export const LoginScreen = () => {
	return (
		<View>
			<FormControl width="100%" alignItems={"center"}>
				<Button backgroundColor="blue.500" width="90%" onPress={facebookLogin}>
					<Text color="white">Facebook login</Text>
				</Button>
			</FormControl>
			<StatusBar style="auto" />
		</View>
	);
};
