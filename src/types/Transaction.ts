export interface Transactions {
	id: string;
	amount: number;
	currency_type: string;
	sign: number;
	transaction_desctiption: string;
	created_at: string;
}

export interface Transaction {
	id: string;
	amount: number;
	currency_type: string;
	sign: number;
	transaction_desctiption: string;
}

export type TransactionInput = {
	amount: number | null;
	currency_type: string;
	sign: number;
	transaction_desctiption: string;
};

// export type TransactionUpdateInput = {
// 	amount: number;
// 	currency_type: string;
// 	transaction_type: number;
// 	transaction_desctiption: string;
// };
