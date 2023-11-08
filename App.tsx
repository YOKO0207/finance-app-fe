import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, FormControl, NativeBaseProvider, Text } from "native-base";
import { facebookLogin } from "./src/services/facebookLogin";
import app from "./src/config/firebaseConfig";

export default function App() {
  return (
		<NativeBaseProvider>
			<View style={styles.container}>
				<FormControl width="100%" alignItems={"center"}>
					<Button
						backgroundColor="blue.500"
						width="90%"
						onPress={facebookLogin}
					>
						<Text color="white">Facebook login</Text>
					</Button>
				</FormControl>
				<StatusBar style="auto" />
			</View>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
