import { inputStyles } from "@/components/atoms/styles";
import { Box } from "native-base";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
	label: string;
	note?: string[];
	value: string;
	onChangeText: (text: string) => void;
	onBlur: (e: any) => void;
	error?: string;
}

export const TextField = (props: Props) => {
	const { label, note, value, onChangeText, onBlur, error } = props;
	return (
		<View style={inputStyles.inputContainer}>
			<Box style={inputStyles.textWrapper}>
				<Text style={inputStyles.lable}>{label}</Text>
				{note && (
					<Box style={inputStyles.noteWrapper}>
						{note.map((item: string, index: number) => (
							<Text key={index} style={inputStyles.note}>{item}</Text>
						))}
					</Box>
				)}
			</Box>
			<TextInput
				style={inputStyles.input}
				onChangeText={onChangeText}
				onBlur={onBlur}
				value={value}
			/>
			{error && <Text style={inputStyles.error}>{error}</Text>}
		</View>
	);
};

