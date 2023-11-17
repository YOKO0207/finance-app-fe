import { AppLayoutA } from "@/components/layouts";
import { NoteForm } from "@/components/organisms";
import { useNoteCreateHandler } from "@/hooks";
import { NoteInput } from "@/types";

export const NoteNewScreen = () => {
	const { handleNoteCreate } = useNoteCreateHandler();

	const initialValues: NoteInput = {
		note_title: "",
		person_name: "",
		currency_type: "JPY",
	};
	
		const handleFormSubmit = (input: NoteInput) => {
			handleNoteCreate({ input });
		};

	return (
		<AppLayoutA>
			<NoteForm onSubmit={handleFormSubmit} initialValues={initialValues} />
		</AppLayoutA>
	);
};
