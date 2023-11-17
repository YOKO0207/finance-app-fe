import { TransactionForm } from "@/components/organisms";
import { useTransactionCreateHandler } from "@/hooks";
import { TransactionInput } from "@/types";
import { AppLayoutA } from "../layouts";

interface Props {
	route: any;
}

export const TransactionNewScreen = ({ route }: Props) => {
	const { noteId } = route.params;
	const { handleTransactionCreate } = useTransactionCreateHandler();

	const initialValues: TransactionInput = {
		amount: null,
		currency_type: "JPY",
		transaction_type: 1,
		transaction_desctiption: "",
	};

	const handleFormSubmit = (input: TransactionInput) => {
		const validationErrors = handleTransactionCreate({
			input,
			noteId,
		});
		return validationErrors;
	};

	return (
		<AppLayoutA>
			<TransactionForm
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
			/>
		</AppLayoutA>
	);
};
