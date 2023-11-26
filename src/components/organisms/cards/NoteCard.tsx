import { CURRENCIES } from "@/constants";
import { colors, shadows } from "@/styles";
import { Note } from "@/types";
import { Box } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Icon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import { SIGNS } from "@/constants";

interface Props {
	note: Note | undefined;
	onDeletePress?: () => void;
	onEditPress?: () => void;
}

export const NoteCard = (props: Props) => {
	const { note, onDeletePress, onEditPress } = props;

	const onEditPressWrapper = () => {
		if (onEditPress) {
			onEditPress();
			SheetManager.hide("card-action-sheet");
		}
	};

	const onDeletePressWrapper = () => {
		if (onDeletePress) {
			onDeletePress();
			SheetManager.hide("card-action-sheet");
		}
	};

	return (
		<View style={styles.container}>
			<Box style={styles.header}>
				<Text style={styles.headerTitle}>{note?.note_title || ""}</Text>
				{onDeletePress && onEditPress && (
					<TouchableOpacity
						onPress={() => {
							SheetManager.show("card-action-sheet", {
								payload: {
									onDeletePress: onDeletePressWrapper,
									onEditPress: onEditPressWrapper,
								},
							});
						}}
						style={styles.actionButton}
					>
						<FeatherIcon
							name="more-vertical"
							size={18}
							color={colors.gray[900]}
						/>
					</TouchableOpacity>
				)}
			</Box>
			<Box>
				<Text style={styles.totalTitle}>貸し借り金額</Text>
				<Box style={styles.contentWrapper}>
					<Text
						style={
							styles.totalText}
					>{`${note?.sign === SIGNS.MINUS ? "-" : ""}${
						(note?.currency_type && CURRENCIES[note?.currency_type].symbol) || ""
					}${note?.total || "0"}`}</Text>
					<Box style={styles.userWrapper}>
						<Box style={styles.userIcon}>
							<Icon name="user" size={12} color="white" />
						</Box>
						<Text style={styles.userText}>{note?.person_name || ""}</Text>
					</Box>
				</Box>
			</Box>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingHorizontal: 18,
		paddingTop: 4,
		paddingBottom: 20,
		borderRadius: 8,
		borderColor: colors.gray[100],
		borderWidth: 1,
		// ...shadows[10],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: colors.gray[50],
		// paddingBottom: 6,
		// paddingBottom: 20,
		marginBottom: 14,
		height: 48
	},
	headerTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.gray[900],
	},
	contentWrapper: {
		justifyContent: "space-between",
		flexDirection: "row",
	},
	totalTitle: {
		color: colors.gray[200],
		fontWeight: "bold",
		fontSize: 10,
		marginBottom: 4,
	},
	minusTotalText: {
		color: colors.secondary[500],
	},
	plusTotalText: {
		color: colors.primary[500],
	},
	totalText: {
		fontWeight: "bold",
		fontSize: 20,
		colors: colors.gray[900],
	},
	userWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	userIcon: {
		backgroundColor: colors.secondary[400],
		width: 20,
		height: 20,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	userText: {
		color: colors.gray[200],
		fontSize: 10,
		fontWeight: "bold",
		marginBottom: 4,
	},
	actionButton: {
		padding: 8,
		// backgroundColor: "red",
	},
});
