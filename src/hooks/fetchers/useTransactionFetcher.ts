import { fetcherService } from "@/adapters";
import { BACKEND_API_URLS, SYSTEM_MESSAGES } from "@/constants";
import {
	Transaction,
	TransactionCreateInput,
	TransactionUpdateInput,
	Transactions,
} from "@/types";
import { SWRFetcher, generateUrl } from "@/utils";
import { useState } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import useSWR, { mutate } from "swr";

export const useTransactionCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const createTransaction = async (args: {
		apiUrl: string;
		input: TransactionCreateInput;
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
		createTransaction,
		isFormLoading,
	};
};

export const useTransactionUpdateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const updateTransaction = async (args: {
		apiUrl: string;
		input: TransactionUpdateInput;
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
		updateTransaction,
		isFormLoading,
	};
};

export const useTransactionDeleteFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const deleteTransaction = async (args: {
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
		deleteTransaction,
		isFormLoading,
	};
};

const baseTransactionsApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.TRANSACTIONS.TRANSACTIONS}`;
const baseTransactionApiUrl = `${process.env.EXPO_PUBLIC_BASE_FIREBSE_BACKEND_URL}/${BACKEND_API_URLS.TRANSACTIONS.TRANSACTION}`;

export const useTransactionIndexSWR = (args: { noteId: string }) => {
	const { noteId } = args;
	const apiUrl = generateUrl(baseTransactionsApiUrl, { noteId });
	return useSWR(apiUrl, SWRFetcher<Transactions[]>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};

export const useTransactionDetailSWR = (args: {
	noteId: string;
	transactionId: string;
}) => {
	const { noteId, transactionId } = args;
	const apiUrl = generateUrl(baseTransactionApiUrl, { noteId, transactionId });
	return useSWR(apiUrl, SWRFetcher<Transaction>, {
		revalidateIfStale: true,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};
