import { AppLayoutA } from "@/components/layouts";
import { NoteCard, TransactionCard } from "@/components/organisms";
import {
	useNoteDetailSWR,
	useTransactionDeleteHandler,
	useTransactionIndexSWR,
} from "@/hooks";
import { Transactions } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { colors } from "@/styles";

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

	const { data: transactions } = useTransactionIndexSWR({ noteId });
	const { data: note } = useNoteDetailSWR({ noteId });

	const { handleTransactionDelete } = useTransactionDeleteHandler();

	console.log("inside transaction index", transactions);

	return (
		<AppLayoutA
			navigateToNewScreen={() =>
				navigation.navigate("TransactionNewScreen", {
					noteId,
				})
			}
		>
			<View style={styles.noteWrapper}>
				<NoteCard note={note?.data?.data} />
			</View>
			<View style={styles.container}>
				{transactions?.data?.data?.map((item: Transactions, index: number) => (
					<View key={item.id} >
						<TransactionCard
						isElementTop={index === 0}
						isElmentBottom={transactions?.data?.data?.length ? index === transactions?.data?.data?.length - 1 : false}
							transaction={item}
							onDeletePress={() =>
								handleTransactionDelete({ noteId, transactionId: item.id })
							}
							onEditPress={() =>
								navigation.navigate("TransactionEditScreen", {
									noteId,
									transactionId: item.id,
								})
							}
						/>
					</View>
				))}
			</View>
		</AppLayoutA>
	);
};

const styles = StyleSheet.create({
	noteWrapper: {
		marginBottom: 24,
	},
	container: {
		borderRadius: 8,
		borderColor: colors.gray[100],
		borderWidth: 1,
	},
	// transactionWrapper: {
	// 	borderRadius: 20,
	// },
});
