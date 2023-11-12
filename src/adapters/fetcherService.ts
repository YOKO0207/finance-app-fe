import { ReturnResponse } from "@/types";
import { axiosClient } from "@/adapters";

class FetcherService {
	async get<T>(
		url: string
	): Promise<ReturnResponse<T> | undefined> {
		try {
			const response = await axiosClient.get(url);
			return response;
		} catch (error: any) {
			throw error.response;
		}
	}
	async SWRGet<T>(url: string): Promise<ReturnResponse<T> | undefined> {
		try {
			const response = await axiosClient.get(url);
			return response;
		} catch (error: any) {
			throw error.response;
		}
	}
	async post<T, TReturnValues>(
		apiUrl: string,
		input: T | FormData
	): Promise<ReturnResponse<{} | TReturnValues> | undefined> {
		try {
			const response = await axiosClient.post(apiUrl, input);
			return response;
		} 
		catch (error: any) {
			throw error.response;
		}
	}
	async postWithReturnValue<T, TReturnValues>(
		apiUrl: string,
		input: T | FormData
	): Promise<ReturnResponse<TReturnValues> | undefined> {
		try {
			const response = await axiosClient.post(apiUrl, input);
			return response;
		} catch (error: any) {
			throw error.response;
		}
	}
	async patch<T>(
		apiUrl: string,
		input: T
	): Promise<ReturnResponse<{}> | undefined> {
		try {
			const response = await axiosClient.patch(apiUrl, input);
			return response;
		} catch (error: any) {
			throw error.response;
		}
	}
	async delete(apiUrl: string): Promise<ReturnResponse<{}> | undefined> {
		try {
			const response = await axiosClient.delete(apiUrl);
			return response;
		} catch (error: any) {
			throw error.response;
		}
	}
}

export const fetcherService = new FetcherService();
