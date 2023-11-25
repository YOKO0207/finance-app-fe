import { Select as NativeBaseSelect } from "native-base";
import { inputStyles } from "@/components/atoms/styles";
import { Box } from "native-base";
import { View, Text } from "react-native";
import { colors } from "@/styles";

interface Props {
	selectedValue: string;
	onValueChange: (itemValue: string) => void;
	items: { label: string; value: string }[];
	label: string;
	note?: string[]
	error?: string;
}

export const Select = (props: Props) => {
	const { selectedValue, onValueChange, items, label, note, error } = props;
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
			<NativeBaseSelect
				selectedValue={selectedValue}
				accessibilityLabel="選択してください"
				placeholder="選択してください"
				onValueChange={onValueChange}
				_selectedItem={{
					bg: "gray.300",
				}}
				backgroundColor={"white"}
				borderColor={colors.gray[40]}
				py={3}
				borderRadius={4}
			>
				{items.map((item, index) => (
					<NativeBaseSelect.Item
						key={index}
						label={item.label}
						value={item.value}
					/>
				))}
			</NativeBaseSelect>
			{error && <Text style={inputStyles.error}>{error}</Text>}
		</View>
	);
}