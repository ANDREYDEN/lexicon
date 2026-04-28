import { StyleSheet, TextInputProps } from "react-native";
import { LxTextInput } from "./LxTextInput";

interface LxTextAreaProps extends TextInputProps {}

export function LxTextArea({ style, ...props }: LxTextAreaProps) {
  return <LxTextInput style={[styles.textArea, style]} multiline {...props} />;
}

const styles = StyleSheet.create({
  textArea: {
    minHeight: 80,
  },
});
