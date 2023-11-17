import { BACKEND_API_URLS } from "@/constants";
import {
	useTransactionCreateFetcher,
	useTransactionDeleteFetcher,
	useTransactionUpdateFetcher,
} from "@/hooks";
import { TransactionInput } from "@/types";
import { generateUrl } from "@/utils";

const baseTransactionsApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.TRANSACTIONS.TRANSACTIONS}`;
const baseTransactionApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.TRANSACTIONS.TRANSACTION}`;

const baseNoteApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTE}`;
const baseNotesApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.NOTES.NOTES}`;


export const useTransactionCreateHandler = () => {
	const { createTransaction, isFormLoading } = useTransactionCreateFetcher();

	const handleTransactionCreate = (args: {
		input: TransactionInput;
		noteId: string;
	}) => {
		const { input, noteId } = args;
		const apiUrl = generateUrl(baseTransactionsApiUrl, { noteId });
		const noteApiUrl = generateUrl(baseNoteApiUrl, { noteId });
		const validationErrors = createTransaction({
			apiUrl,
			input,
			mutateApiUrls: [apiUrl, noteApiUrl, baseNotesApiUrl],
		});

		return validationErrors;
	};

	return { handleTransactionCreate, isFormLoading };
};

export const useTransactionUpdateHandler = () => {
	const { updateTransaction, isFormLoading } = useTransactionUpdateFetcher();

	const handleTransactionUpdate = (args: {
		input: TransactionInput;
		noteId: string;
		transactionId: string;
	}) => {
		const { input, noteId, transactionId } = args;
		const apiUrl = generateUrl(baseTransactionApiUrl, {
			noteId,
			transactionId,
		});
		const noteApiUrl = generateUrl(baseNoteApiUrl, { noteId });
		const transactionsApiUrl = generateUrl(baseTransactionsApiUrl, { noteId });
		const validationErrors = updateTransaction({
			apiUrl,
			input,
			mutateApiUrls: [transactionsApiUrl, noteApiUrl, baseNotesApiUrl],
		});

		return validationErrors;
	};

	return { handleTransactionUpdate, isFormLoading };
};

export const useTransactionDeleteHandler = () => {
	const { deleteTransaction, isFormLoading } = useTransactionDeleteFetcher();

	const handleTransactionDelete = (args: {
		noteId: string;
		transactionId: string;
	}) => {
		const { noteId, transactionId } = args;
		const apiUrl = generateUrl(baseTransactionApiUrl, {
			noteId,
			transactionId,
		});
		const transactionsApiUrl = generateUrl(baseTransactionsApiUrl, { noteId });
		const noteApiUrl = generateUrl(baseNoteApiUrl, { noteId });
		const validationErrors = deleteTransaction({
			apiUrl,
			mutateApiUrls: [transactionsApiUrl, noteApiUrl, baseNotesApiUrl],
		});

		return validationErrors;
	};

	return { handleTransactionDelete, isFormLoading };
};
