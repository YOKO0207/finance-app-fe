import { BACKEND_API_URLS } from "@/constants";
import {
	useTransactionCreateFetcher,
	useTransactionDeleteFetcher,
	useTransactionUpdateFetcher,
} from "@/hooks";
import { TransactionCreateInput, TransactionUpdateInput } from "@/types";
import { generateUrl } from "@/utils";

const baseTransactionsApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.TRANSACTIONS.TRANSACTIONS}`;
const baseTransactionApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.TRANSACTIONS.TRANSACTION}`;

export const useTransactionCreateHandler = () => {
	const { createTransaction, isFormLoading } = useTransactionCreateFetcher();

	const handleTransactionCreate = (args: {
		input: TransactionCreateInput;
		noteId: string;
	}) => {
		const { input, noteId } = args;
		const apiUrl = generateUrl(baseTransactionsApiUrl, { noteId });
		const validationErrors = createTransaction({
			apiUrl,
			input,
			mutateApiUrls: [apiUrl],
		});

		return validationErrors;
	};

	return { handleTransactionCreate, isFormLoading };
};

export const useTransactionUpdateHandler = () => {
	const { updateTransaction, isFormLoading } = useTransactionUpdateFetcher();

	const handleTransactionUpdate = (args: {
		input: TransactionUpdateInput;
		noteId: string;
		transactionId: string;
	}) => {
		const { input, noteId, transactionId } = args;
		const apiUrl = generateUrl(baseTransactionApiUrl, {
			noteId,
			transactionId,
		});
		const transactionsApiUrl = generateUrl(baseTransactionsApiUrl, { noteId });
		const validationErrors = updateTransaction({
			apiUrl,
			input,
			mutateApiUrls: [transactionsApiUrl],
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
		const validationErrors = deleteTransaction({
			apiUrl,
			mutateApiUrls: [transactionsApiUrl],
		});

		return validationErrors;
	};

	return { handleTransactionDelete, isFormLoading };
};
