import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "native-base";
import { Notes, Transactions } from "@/types";
import { useTransactionDeleteHandler, useTransactionIndexSWR } from "@/hooks";

type RootStackParamList = {
	TransactionIndexScreen: undefined;
	TransactionNewScreen: { noteId: string };
	TransactionEditScreen: { noteId: string; transactionId: string };
};
type TransactionIndexScreenProps = StackNavigationProp<
	RootStackParamList,
	"TransactionIndexScreen"
>;
interface Props {
	navigation: TransactionIndexScreenProps;
	route: any;
}
export const TransactionIndexScreen = (props: Props) => {
	const { navigation, route } = props;
	const { noteId } = route.params;

	const { data: transactions } = useTransactionIndexSWR({noteId})

	const { handleTransactionDelete } = useTransactionDeleteHandler();

	console.log("inside transaction index", transactions)

	return (
		<View>
			<StatusBar style="auto" />
			{transactions?.data?.data?.map((item: Transactions) => (
				<>
					<Text>{item.id}</Text>
					<Button
						onPress={() =>
							navigation.navigate("TransactionEditScreen", {
								noteId,
								transactionId: item.id,
							})
						}
					>
						edit
					</Button>
					<Button
						onPress={() =>
							handleTransactionDelete({ noteId, transactionId: item.id })
						}
					>
						delete
					</Button>
				</>
			))}
			<Button
				onPress={() =>
					navigation.navigate("TransactionNewScreen", {
						noteId,
					})
				}
			>
				go to transaction new
			</Button>
		</View>
	);
};
