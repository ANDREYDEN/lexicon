import { WordsContext } from "@/src/providers/wordsProvider";
import { Word } from "@/src/types/word";
import { Ionicons } from "@expo/vector-icons";
import { use, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface WordListItemProps {
  word: Word;
}

export function WordListItem({ word }: WordListItemProps) {
  const { deleteWord } = use(WordsContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    deleteWord(word);
  };

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isExpanded ? "180deg" : "0deg", {
            duration: 200,
          }),
        },
      ],
    };
  });

  const definitionAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(isExpanded ? 200 : 0, {
        duration: 200,
      }),
      opacity: withTiming(isExpanded ? 1 : 0, {
        duration: 200,
      }),
    };
  });

  return (
    <Swipeable
      renderRightActions={(_, drag) => (
        <DeleteAction drag={drag} onDelete={handleDelete} />
      )}
      friction={2}
    >
      <Pressable onPress={handleToggleExpanded}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.content}>{word.content}</Text>
            <Animated.View style={chevronAnimatedStyle}>
              <Ionicons name="chevron-up" size={20} color="#666" />
            </Animated.View>
          </View>
          <Animated.View
            style={[styles.definitionContainer, definitionAnimatedStyle]}
          >
            <Text style={styles.definition}>{word.definition}</Text>
          </Animated.View>
        </View>
      </Pressable>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  definitionContainer: {
    overflow: "hidden",
  },
  definition: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: DELETE_ACTION_WIDTH,
  },
});
