import { AppLayoutA } from "@/components/layouts";
import { NoteForm } from "@/components/organisms";
import { useNoteDetailSWR, useNoteUpdateHandler } from "@/hooks";
import { NoteInput } from "@/types";

interface Props {
	route: any;
}

export const NoteEditScreen = ({ route }: Props) => {
	const { noteId } = route.params;
	const { data: note } = useNoteDetailSWR({ noteId });

	const { handleNoteUpdate } = useNoteUpdateHandler();

	const initialValues: NoteInput = {
		note_title: note?.data?.data?.note_title || "",
		person_name: note?.data?.data?.person_name || "",
		currency_type: note?.data?.data?.currency_type || "",
	};

	const handleFormSubmit = (input: NoteInput) => {
		handleNoteUpdate({ input, noteId });
	};

	return (
		<AppLayoutA>
			<NoteForm onSubmit={handleFormSubmit} initialValues={initialValues} buttonText="更新する" />
		</AppLayoutA>
	);
};
