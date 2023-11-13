import { StatusBar } from "expo-status-bar";
import { Button, FormControl, Text } from "native-base";
import { View } from "react-native";
import { facebookLogin } from "@/services";
import { useUser } from "@/hooks";

export const SettingScreen = () => {
	const { user } = useUser();
	return (
		<View>
			{user && <Text>{user.displayName}</Text>}
			<FormControl width="100%" alignItems={"center"}>
				<Button backgroundColor="blue.500" width="90%" onPress={facebookLogin}>
					<Text color="white">Facebook login</Text>
				</Button>
			</FormControl>
			<StatusBar style="auto" />
		</View>
	);
};
