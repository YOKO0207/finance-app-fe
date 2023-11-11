import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "native-base";

type RootStackParamList = {
	TransactionIndexScreen: undefined;
	TransactionNewScreen: undefined;
};
type TransactionIndexScreenProps = StackNavigationProp<
	RootStackParamList,
	"TransactionIndexScreen"
>;
interface Props {
	navigation: TransactionIndexScreenProps;
}

export const TransactionIndexScreen = (props: Props) => {
	const { navigation } = props;

	return (
		<View>
			<StatusBar style="auto" />
			<Button onPress={() => navigation.navigate("TransactionNewScreen")}>
				go to transaction new
			</Button>
		</View>
	);
};
