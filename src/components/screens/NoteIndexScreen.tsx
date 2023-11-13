import { StatusBar } from "expo-status-bar";
import { View, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text } from "native-base";
import { showMessage } from "react-native-flash-message";

type RootStackParamList = {
	NoteIndexScreen: undefined; 
	NoteNewScreen: undefined; 
	TransactionIndexScreen: undefined;
};
type NoteIndexScreenProps = StackNavigationProp<
	RootStackParamList,
	"NoteIndexScreen"
>;
interface Props {
	navigation: NoteIndexScreenProps;
}
export const NoteIndexScreen = (props: Props) => {
	const { navigation } = props;

	// const showErrorAlert = (errorMessage: string) => {
	// 	Alert.alert("Error", errorMessage, [{ text: "OK" }], { cancelable: false });
	// };
	
	return (
		<View>
			<StatusBar style="auto" />
			<Button onPress={() => navigation.navigate("NoteNewScreen")}>
				go to note new
			</Button>
			<Button onPress={() => {
				showMessage({
					message: "Hello World",
					type: "info",
				});
			}}>show error</Button>
			<Text onPress={() => navigation.navigate("TransactionIndexScreen")}>取引一覧</Text>
		</View>
	);
};
