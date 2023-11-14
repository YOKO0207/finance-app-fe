export interface Transactions {
	id: string;
	amount: number;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
}

export interface Transaction {
	id: string;
	amount: number;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
}

export type TransactionCreateInput = {
	amount: number;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
}

export type TransactionUpdateInput = {
	amount: number;
	currency_type: number;
	transaction_type: number;
	transaction_desctiption: string;
};
