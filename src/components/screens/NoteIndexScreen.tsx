import { AppLayoutA } from "@/components/layouts";
import { NoteCard } from "@/components/organisms";
import { useNoteDeleteHandler, useNoteIndexSWR } from "@/hooks";
import { Notes } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type RootStackParamList = {
	NoteIndexScreen: undefined;
	NoteNewScreen: undefined;
	TransactionIndexScreen: { noteId: string };
	NoteEditScreen: { noteId: string };
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

	const { data: notes } = useNoteIndexSWR();

	const { handleNoteDelete } = useNoteDeleteHandler();

	return (
		<AppLayoutA
			navigateToNewScreen={() => navigation.navigate("NoteNewScreen")}
		>
			<View style={styles.container}>
				{notes?.data?.data?.map((item: Notes) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("TransactionIndexScreen", { noteId: item.id })
						}
						activeOpacity={1}
					>
						<NoteCard
							key={item.id}
							note={item}
							onEditPress={() =>
								navigation.navigate("NoteEditScreen", { noteId: item.id })
							}
							onDeletePress={() => handleNoteDelete({ noteId: item.id })}
						/>
					</TouchableOpacity>
				))}
			</View>
		</AppLayoutA>
	);
};

const styles = StyleSheet.create({
	container: {
		gap:20
	},
});
