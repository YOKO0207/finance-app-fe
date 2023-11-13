import { BACKEND_API_URLS } from "@/constants";
import { useNoteCreateFetcher, useNoteDeleteFetcher, useNoteUpdateFetcher } from "@/hooks";
import { NoteCreateInput, NoteUpdateInput } from "@/types";
import { generateUrl } from "@/utils";

const baseNotesApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTES}`;
const baseNoteApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTE}`;

export const useNoteCreateHandler = () => {
	const { createNote, isFormLoading } =
		useNoteCreateFetcher();

	const handleNoteCreate = (args: { input: NoteCreateInput }) => {
		const { input } = args;
		const validationErrors = createNote({
			apiUrl: baseNotesApiUrl,
			input,
			mutateApiUrls: [baseNotesApiUrl],
		});

		return validationErrors;
	};

	return { handleNoteCreate, isFormLoading };
};

export const useNoteUpdateHandler = () => {
	const { updateNote, isFormLoading } = useNoteUpdateFetcher();

	const handleNoteUpdate = (args: { input: NoteUpdateInput, noteId: string }) => {
		const { input, noteId } = args;
		const apiUrl = generateUrl(baseNoteApiUrl, { noteId });
		const validationErrors = updateNote({apiUrl, input, mutateApiUrls: [baseNotesApiUrl]});

		return validationErrors;
	};

	return { handleNoteUpdate, isFormLoading };
};

export const useNoteDeleteHandler = () => {
	const { deleteNote, isFormLoading } = useNoteDeleteFetcher();

	const handleNoteDelete = (args: {noteId: string}) => {
		const { noteId } = args;
		const apiUrl = generateUrl(baseNoteApiUrl, { noteId });
		const validationErrors = deleteNote({ apiUrl, mutateApiUrls: [baseNotesApiUrl] });

		return validationErrors;
	};

	return { handleNoteDelete, isFormLoading };
};
