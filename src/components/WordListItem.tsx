import { StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Word } from "../types/word";

interface WordListItemProps {
  word: Word;
}

export function WordListItem({ word }: WordListItemProps) {
  return (
    <Swipeable renderRightActions={DeleteAction} friction={2}>
      <View style={styles.container}>
        <Text style={styles.content}>{word.content}</Text>
        <Text style={styles.definition}>{word.definition}</Text>
      </View>
    </Swipeable>
  );
}

const DELETE_ACTION_WIDTH = 80;

function DeleteAction(_: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + DELETE_ACTION_WIDTH }],
    };
  });

  return (
    <Animated.View style={[styleAnimation, styles.deleteContainer]}>
      <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  content: {
    fontSize: 18,
    fontWeight: "bold",
  },
  definition: {
    fontSize: 16,
    color: "gray",
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: DELETE_ACTION_WIDTH,
  },
});
