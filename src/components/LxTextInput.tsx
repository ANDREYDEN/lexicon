import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface LxTextInputProps extends TextInputProps {}

export function LxTextInput({ style, ...props }: LxTextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
