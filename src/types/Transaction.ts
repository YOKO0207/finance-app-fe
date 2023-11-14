export interface Transactions {
	id: string;
	amount: string;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
}

export interface Transaction {
	id: string;
	amount: string;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
}

export type TransactionCreateInput = {
	amount: string;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
}

export type TransactionUpdateInput = {
	amount: string;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
};
