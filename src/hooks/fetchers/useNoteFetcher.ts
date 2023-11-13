import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import useSWR from "swr";
import { fetcherService } from "@/adapters";
import { SYSTEM_MESSAGES } from "@/constants";
import { NoteCreateInput } from "@/types";
import { SWRFetcher, generateUrl } from "@/utils";

export const useNoteCreateFetcher = () => {
	const [isFormLoading, setIsFormLoading] = useState(false);

	const createNote = async (args: {
		apiUrl: string;
		input: NoteCreateInput;
	}) => {
		const { apiUrl, input } = args;
		setIsFormLoading(true);
		try {
			const res = await fetcherService.post(apiUrl, input);
			if (res && res.status >= 200 && res.status < 300) {
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

// const basePostIndexApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.INDEX}`;
// const basePostDetailApiUrl = `${BASE_API_URL}/${BACKEND_ROUTES.POSTS.DETAIL}`;

// export const usePostIndexSWR = () => {
// 	return useSWR(basePostIndexApiUrl, SWRFetcher<Posts[]>, {
// 		revalidateIfStale: true,
// 		revalidateOnFocus: false,
// 		revalidateOnReconnect: false,
// 	});
// };

// export const usePostDetailSWR = () => {
// 	const router = useRouter();
// 	const { showBoundary } = useErrorBoundary();

// 	const getKey = useCallback(() => {
// 		if (!router.isReady) {
// 			return null;
// 		}
// 		const { postId } = router.query;
// 		if (postId == undefined) {
// 			showBoundary(SYSTEM_MESSAGES.ILEGAL_URL);
// 			return null;
// 		}
// 		return generateUrl(basePostDetailApiUrl, { postId });
// 	}, [router.isReady, router.query, showBoundary]);

// 	return useSWR(getKey, SWRFetcher<Post>, {
// 		revalidateIfStale: true,
// 		revalidateOnFocus: false,
// 		revalidateOnReconnect: false,
// 	});
// };
