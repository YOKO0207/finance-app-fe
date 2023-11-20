import { User } from "@/types";

export const userInitialState: User = {
	uid: "",
	displayName: "",
	isLoggedIn: false,
};

export type userStateType = typeof userInitialState;
export type userActionType = {
	type: "SET_USER_DATA" ;
	payload: User;
} | {
	type: "UNSET_USER_DATA";
};

export const userReducer = (
	state: userStateType,
	action: userActionType
) => {
	switch (action.type) {
		case "SET_USER_DATA":
			return {
				...state,
				uid: action.payload.uid,
				displayName: action.payload.displayName,
				isLoggedIn: true,
			};
		case "UNSET_USER_DATA":
			return {
				...state,
				...userInitialState,
			};
		default: return state;
	}
};
