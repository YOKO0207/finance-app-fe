import { StatusBar } from "expo-status-bar";
import { View, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import { useNoteIndexSWR, useNoteDeleteHandler } from "@/hooks";
import { Notes } from "@/types";

type RootStackParamList = {
	NoteIndexScreen: undefined;
	NoteNewScreen: undefined;
	TransactionIndexScreen: undefined;
	NoteEditScreen: { noteId: string};
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

	// const showErrorAlert = (errorMessage: string) => {
	// 	Alert.alert("Error", errorMessage, [{ text: "OK" }], { cancelable: false });
	// };
	
	return (
		<View>
			<StatusBar style="auto" />
			<Button onPress={() => navigation.navigate("NoteNewScreen")}>
				go to note new
			</Button>
			{notes?.data?.data?.map((item: Notes) => (
				<>
					<Text key={item.id}>{item.note_title}</Text>
					<Text onPress={() => navigation.navigate("NoteEditScreen", { noteId: item.id})}>
						編集
					</Text>
					<Button onPress={() => handleNoteDelete({noteId: item.id})}>削除</Button>
					{/* <Text onPress={() => navigation.navigate("TransactionIndexScreen")}>
						取引一覧
					</Text> */}
				</>
			))}
			
		</View>
	);
};
