import { WordsContext } from "@/src/providers/wordsProvider";
import { Word } from "@/src/types/word";
import { use } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface WordListItemProps {
  word: Word;
}

export function WordListItem({ word }: WordListItemProps) {
  const { deleteWord } = use(WordsContext);

  const handleDelete = () => {
    deleteWord(word);
  };

  return (
    <Swipeable
      renderRightActions={(_, drag) => (
        <DeleteAction drag={drag} onDelete={handleDelete} />
      )}
      friction={2}
    >
      <View style={styles.container}>
        <Text style={styles.content}>{word.content}</Text>
        <Text style={styles.definition}>{word.definition}</Text>
      </View>
    </Swipeable>
  );
}

const DELETE_ACTION_WIDTH = 80;

interface DeleteActionProps {
  drag: SharedValue<number>;
  onDelete: () => void;
}

function DeleteAction({ drag, onDelete }: DeleteActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + DELETE_ACTION_WIDTH }],
    };
  });

  return (
    <Animated.View style={[styleAnimation, styles.deleteContainer]}>
      <Pressable onPress={onDelete}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </Pressable>
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
