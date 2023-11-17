import { Select, TextField } from "@/components/atoms";
import { CURRENCIES } from "@/constants";
import { colors } from "@/styles";
import { NoteInput } from "@/types";
import { Formik } from "formik";
import { Button } from "react-native";
import * as Yup from "yup";

interface Props {
	onSubmit: (input: NoteInput) => void;
	initialValues: NoteInput;
}

export const NoteForm = (props: Props) => {
	const { onSubmit, initialValues } = props;

	const validationSchema = Yup.object().shape({
		note_title: Yup.string().required("タイトルは必須です"),
		person_name: Yup.string().required("相手の名前は必須です"),
		currency_type: Yup.string().required("通貨を選択してください"),
	});

	const handleFormSubmit = (input: NoteInput) => {
		const validationErrors = onSubmit(input);
		return validationErrors;
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleFormSubmit}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
				values,
				errors,
				touched,
			}) => (
				<>
					<TextField
						onChangeText={handleChange("note_title")}
						onBlur={handleBlur("note_title")}
						value={values.note_title}
						label="旅の名前"
						note={[
							"分かりやすいように旅の名前をつけましょう",
							"例）ベトナム女子旅",
						]}
						error={
							touched.note_title && errors.note_title ? errors.note_title : ""
						}
					/>

					<TextField
						onChangeText={handleChange("person_name")}
						onBlur={handleBlur("person_name")}
						value={values.person_name}
						label="割り勘をする相手"
						note={["誰と割り勘をしますか？"]}
						error={
							touched.person_name && errors.person_name
								? errors.person_name
								: ""
						}
					/>
					<Select
						label="最終的に清算をする通貨"
						note={[
							"割り勘をするお金と清算をするお金を分けるために使用します。",
							"例えば現地通過で割り勘をし、日本円で清算する時などです。",
							"設定はいつでも変更可能です。",
						]}
						selectedValue={values.currency_type}
						onValueChange={(itemValue) =>
							setFieldValue("currency_type", itemValue)
						}
						items={Object.entries(CURRENCIES).map(([code, symbol]) => ({
							label: `${code} (${symbol})`,
							value: code,
						}))}
						error={
							touched.currency_type && errors.currency_type
								? errors.currency_type
								: undefined
						}
					/>

					<Button
						onPress={() => handleSubmit()}
						title="作成"
						color={colors.primary[500]}
					/>
				</>
			)}
		</Formik>
	);
};
