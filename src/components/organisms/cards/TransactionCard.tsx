import { CURRENCIES } from "@/constants";
import { colors, shadows } from "@/styles";
import { Transactions } from "@/types";
import { Box } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import FeatherIcon from "react-native-vector-icons/Feather";
import { SIGNS } from "@/constants";

interface Props {
	transaction: Transactions;
	onDeletePress: () => void;
	onEditPress: () => void;
}

export const TransactionCard = (props: Props) => {
	const { transaction, onDeletePress, onEditPress } = props;

	const onEditPressWrapper = () => {
		onEditPress();
		SheetManager.hide("card-action-sheet");
	};

	const onDeletePressWrapper = () => {
		onDeletePress();
		SheetManager.hide("card-action-sheet");
	};

	return (
		<View style={styles.container}>
			<Box>
				<Text style={styles.descriptionText}>
					{transaction.transaction_desctiption || ""}
				</Text>
				<Text style={styles.dateText}>{transaction.created_at || ""}</Text>
			</Box>
			<Box style={styles.totalWrapper}>
				<Text style={styles.totalText}>
					{`${transaction.sign === SIGNS.MINUS ? "-" : ""}${
						CURRENCIES[transaction.currency_type] || ""
					}${transaction.amount}`}
				</Text>
				<TouchableOpacity
					onPress={() => {
						SheetManager.show("card-action-sheet", {
							payload: {
								onDeletePress: onDeletePressWrapper,
								onEditPress: onEditPressWrapper,
							},
						});
					}}
				>
					<FeatherIcon
						name="more-vertical"
						size={20}
						color={colors.gray[900]}
					/>
				</TouchableOpacity>
			</Box>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingHorizontal: 18,
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		aluignItems: "center",
		borderBottomWidth: 1,
		borderColor: colors.gray[50],
		...shadows[10],
	},
	descriptionText: {
		fontSize: 14,
		color: colors.gray[900],
		fontWeight: "bold",
		marginBottom: 4,
	},
	dateText: {
		fontSize: 12,
		color: colors.gray[200],
	},
	totalText: {
		fontSize: 18,
		color: colors.gray[900],
		fontWeight: "bold",
	},
	minusTotalText: {
		color: colors.secondary[500],
	},
	plusTotalText: {
		color: colors.primary[500],
	},
	totalWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
});
