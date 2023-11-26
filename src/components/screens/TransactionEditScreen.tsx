import { AppLayoutA } from "@/components/layouts";
import { TransactionForm } from "@/components/organisms";
import { SIGNS } from "@/constants";
import { useTransactionDetailSWR, useTransactionUpdateHandler } from "@/hooks";
import { TransactionInput } from "@/types";

interface Props {
	route: any;
}

export const TransactionEditScreen = ({ route }: Props) => {
	const { noteId, transactionId } = route.params;
	const { handleTransactionUpdate } = useTransactionUpdateHandler();

	const { data: transaction } = useTransactionDetailSWR({
		noteId,
		transactionId,
	});

	const initialValues = {
		amount: transaction?.data?.data?.amount || 0,
		currency_type: transaction?.data?.data?.currency_type || "",
		sign: transaction?.data?.data?.sign || SIGNS.PLUS,
		transaction_desctiption:
			transaction?.data?.data?.transaction_desctiption || "",
	};

	const handleFormSubmit = (input: TransactionInput) => {
		const validationErrors = handleTransactionUpdate({
			input,
			noteId,
			transactionId,
		});
		return validationErrors;
	};

	return (
		<AppLayoutA>
			<TransactionForm
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				editScreen={true}
				buttonText="更新する"
			/>
		</AppLayoutA>
	);
};
