import { useNoteCreateFetcher } from "@/hooks";
import { SYSTEM_MESSAGES } from "@/constants";
import { BACKEND_API_URLS } from "@/constants";
import { generateUrl } from "@/utils";
import { NoteCreateInput } from "@/types";

const basePostsApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTES}`;
const basePostApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTES}`;

export const useNoteCreateHandler = () => {
	const { createNote, isFormLoading } =
		useNoteCreateFetcher();

	const handleNoteCreate = (args: { input: NoteCreateInput }) => {
		const { input } = args;
		const validationErrors = createNote({
			apiUrl: basePostsApiUrl,
			input,
		});

		return validationErrors;
	};

	return { handleNoteCreate, isFormLoading };
};
