export interface Notes {
	id: string;
	note_title: string;
	person_name: string;
	total: number;
	currency_type: string;
}

export interface Note {
	id: string;
	note_title: string;
	person_name: string;
	total: number;
	currency_type: string;
}

export type NoteInput = {
	note_title: string;
	person_name: string;
	currency_type: string;
};

// export type NoteUpdateInput = {
// 	note_title: string;
// 	person_name: string;
// 	currency_type: string;
// };
