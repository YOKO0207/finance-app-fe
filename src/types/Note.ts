export interface Notes {
	id: string;
	note_title: string;
	person_name: string;
}

export interface Note {
	id: string;
	note_title: string;
	person_name: string;
}

export type NoteCreateInput = {
	note_title: string;
	person_name: string;
};

export type NoteUpdateInput = {
	note_title: string;
	person_name: string;
};