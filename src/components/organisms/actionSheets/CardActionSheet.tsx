import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Box } from "native-base";
import { colors } from "@/styles";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { useState } from "react";

interface Props {
	onEditPress: () => void;
	onDeletePress: () => void;
}

export const CardActionSheet = (props: SheetProps<Props>) => {
	const { payload } = props;

	const [dialogVisible, setDialogVisible] = useState<boolean>(false);

	return (
		<ActionSheet id={props.sheetId}>
			<View style={styles.container}>
				<TouchableOpacity
					style={[styles.actionButton, styles.editButton]}
					onPress={payload?.onEditPress}
				>
					{/* <Box style={styles.iconWrapper}>
						<Icon name="edit-2" size={14} />
					</Box> */}
					<Text style={styles.actionText}>編集する</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setDialogVisible(true)}>
					<Box style={styles.actionButton}>
						<Box style={{ ...styles.iconWrapper, ...styles.deleteIconWrapper }}>
							<Icon name="delete" size={12} color="white" />
						</Box>
						<Text style={{ ...styles.actionText, ...styles.deleteText }}>
							削除する
						</Text>
						<ConfirmDialog
							title="確認画面"
							message="本当に実行しますか？"
							visible={dialogVisible}
							onTouchOutside={() => setDialogVisible(false)}
							positiveButton={{
								title: "はい",
								onPress: () => {
									setDialogVisible(false);
									payload?.onDeletePress();
								},
							}}
							negativeButton={{
								title: "いいえ",
								onPress: () => setDialogVisible(false),
							}}
						/>
					</Box>
				</TouchableOpacity>
			</View>
		</ActionSheet>
	);
};

const styles = StyleSheet.create({
	container: {
		// gap: 32,
		paddingVertical: 32,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		justifyContent: "center",
	},
	editButton: {
		borderBottomColor: colors.gray[20],
		borderBottomWidth: 1,
		paddingBottom: 24,
		marginBottom: 24,
	},
	actionText: {
		fontSize: 14,
		marginLeft: 8,
		color: colors.gray[900],
	},
	deleteText: {
		color: colors.error[500],
		marginBottom: 4
		// fontWeight: "bold",
	},
	iconWrapper: {
		alignItems: "center",
		justifyContent: "center",
		width: 24,
		height: 24,
		borderRadius: 40,
		backgroundColor: colors.gray[100],
	},
	deleteIconWrapper: {
		paddingRight: 2,
		backgroundColor: colors.error[500],
	},
});
