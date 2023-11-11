import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text } from "native-base";

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
	return (
		<View>
			<StatusBar style="auto" />
			<Button onPress={() => navigation.navigate("NoteNewScreen")}>
				go to note new
			</Button>
			<Text onPress={() => navigation.navigate("TransactionIndexScreen")}>取引一覧</Text>
		</View>
	);
};
