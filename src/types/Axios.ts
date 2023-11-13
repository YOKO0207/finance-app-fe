// TODO first create featch request, and see if what kind of response returned
export interface ReturnResponse<T> {
	status: number;
	data: {
		message: string;
		data?: T | undefined;
		meta?: Meta;
		errors?: {
			[key: string]: string[];
		};
	};
}

export interface Meta {
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
	query_string: string;
	has_more_pages: boolean;
}