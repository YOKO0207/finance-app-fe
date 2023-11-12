import { BASE_FIREBSE_BACKEND_URL } from "@env";
import axios from "axios";

const baseURL = BASE_FIREBSE_BACKEND_URL;
const jsonHeaders = { "Content-Type": "application/json" };

const createAxiosClient = (baseURL: string, headers: any) => {
	return axios.create({
		baseURL,
		headers,
	});
}

export const axiosClient = createAxiosClient(baseURL, jsonHeaders);

export const setAuthToken = (token: string | null) => {
	if (token) {
		
		axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axiosClient.defaults.headers.common["Authorization"];
	}
};