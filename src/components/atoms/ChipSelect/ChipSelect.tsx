import { inputStyles } from "@/components/atoms/styles";
import { colors } from "@/styles";
import { Box } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-paper";

interface Items {
	label: string;
	value: string | number;
}
interface Props {
	label: string;
	note?: string[];
	onSelect: (value: string | number) => void;
	error?: string;
	items: Items[];
	selectedValue: string | number;
}

export const ChipSelect = (props: Props) => {
	const { label, note, onSelect, error, items, selectedValue } =
		props;
	return (
		<View style={styles.inputContainer}>
			{label || note && (
					<Box style={inputStyles.textWrapper}>
						<Text style={inputStyles.lable}>{label}</Text>
						{note && (
							<Box style={inputStyles.noteWrapper}>
								{note.map((item: string, index: number) => (
									<Text key={index} style={inputStyles.note}>
										{item}
									</Text>
								))}
							</Box>
						)}
					</Box>
				)}

			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{items.map((item: Items) => (
					<Chip
						key={item.value}
						selected={selectedValue === item.value}
						onPress={() => onSelect(item.value)}
						style={{
							margin: 4,
							backgroundColor:
								selectedValue === item.value
									? colors.primary[400]
									: colors.gray[40],
						}}
						selectedColor="white"
					>
						{item.label}
					</Chip>
				))}
			</View>
			{error && <Text style={inputStyles.error}>{error}</Text>}
		</View>
	);
};

export const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 10,
	},
});
