import { fetcherService } from "@/adapters";
import { BACKEND_API_URLS, SYSTEM_MESSAGES } from "@/constants";
import { Note, NoteCreateInput, NoteUpdateInput, Notes } from "@/types";
import { SWRFetcher, generateUrl } from "@/utils";
import { useState } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import useSWR, { mutate } from "swr";

export const useNoteCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const createNote = async (args: {
		apiUrl: string;
		input: NoteCreateInput;
		mutateApiUrls: string[];
	}) => {
		const { apiUrl, input, mutateApiUrls } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.post(apiUrl, input);
			if (res && res.status >= 200 && res.status < 300) {
				mutateApiUrls.forEach((url) => mutate(url));
				showMessage({
					message: res?.data?.message || SYSTEM_MESSAGES.SUCCESS,
					type: "success",
				});
			} else if (res?.data?.errors) {
				return res.data.errors;
			} else {
				Alert.alert(
					"Error",
					res?.data?.message || SYSTEM_MESSAGES.FAILURE,
					[{ text: "OK" }],
					{
						cancelable: false,
					}
				);
			}
		} catch (error) {
			Alert.alert("Error", SYSTEM_MESSAGES.FATAL_ERROR, [{ text: "OK" }], {
				cancelable: false,
			});
		} finally {
			setIsFormLoading(false);
		}
	};

	return {
		createNote,
		isFormLoading,
	};
};

export const useNoteUpdateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const updateNote = async (args: {
		apiUrl: string;
		input: NoteUpdateInput;
		mutateApiUrls: string[];
	}) => {
		const { apiUrl, input, mutateApiUrls } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.patch(apiUrl, input);
			if (res && res.status >= 200 && res.status < 300) {
				mutateApiUrls.forEach((url) => mutate(url));
				showMessage({
					message: res?.data?.message || SYSTEM_MESSAGES.SUCCESS,
					type: "success",
				});
			} else if (res?.data?.errors) {
				return res.data.errors;
			} else {
				Alert.alert(
					"Error",
					res?.data?.message || SYSTEM_MESSAGES.FAILURE,
					[{ text: "OK" }],
					{
						cancelable: false,
					}
				);
			}
		} catch (error) {
			Alert.alert("Error", SYSTEM_MESSAGES.FATAL_ERROR, [{ text: "OK" }], {
				cancelable: false,
			});
		} finally {
			setIsFormLoading(false);
		}
	};

	return {
		updateNote,
		isFormLoading,
	};
};

export const useNoteDeleteFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const deleteNote = async (args: {
		apiUrl: string;
		mutateApiUrls: string[];
	}) => {
		const { apiUrl, mutateApiUrls } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.delete(apiUrl);
			if (res && res.status >= 200 && res.status < 300) {
				mutateApiUrls.forEach((url) => mutate(url));
				showMessage({
					message: res?.data?.message || SYSTEM_MESSAGES.SUCCESS,
					type: "success",
				});
			} else if (res?.data?.errors) {
				return res.data.errors;
			} else {
				Alert.alert(
					"Error",
					res?.data?.message || SYSTEM_MESSAGES.FAILURE,
					[{ text: "OK" }],
					{
						cancelable: false,
					}
				);
			}
		} catch (error) {
			Alert.alert("Error", SYSTEM_MESSAGES.FATAL_ERROR, [{ text: "OK" }], {
				cancelable: false,
			});
		} finally {
			setIsFormLoading(false);
		}
	};

	return {
		deleteNote,
		isFormLoading,
	};
};

const baseNotesApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTES}`;
const baseNoteApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTE}`;

export const useNoteIndexSWR = () => {
	return useSWR(baseNotesApiUrl, SWRFetcher<Notes[]>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};

export const useNoteDetailSWR = (args: { noteId: string }) => {
	const { noteId } = args;
	const url = generateUrl(baseNoteApiUrl, { noteId });
	return useSWR(url, SWRFetcher<Note>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};
