import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const KEY_HEIGHT = 55;

const lines = [
  ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  ["enter", "w", "x", "c", "v", "b", "n", "del"],
];

const getKeyWidthFactor = (key: string): number => {
  switch (key) {
    case "enter":
      return 2;
    case "del":
      return 2;
    default:
      return 1;
  }
};

interface Props {
  onKeyPress?: (key: string) => void;
  onEnterPress?: () => void;
  onDelPress?: () => void;
}

export function Keyboard({
  onKeyPress,
  onEnterPress,
  onDelPress,
}: Props) {
  const pressKey = (key: string) => {
    switch (key) {
      case "enter":
        onEnterPress?.();
        return;
      case "del":
        onDelPress?.();
        return;
      default:
        onKeyPress?.(key);
    }
  };

  return (
    <SafeAreaView edges={["bottom"]}>
      <View style={style.container}>
        {lines.map((line) => (
          <View style={style.row} key={line.join("")}>
            {line.map((key) => (
              <View style={letterStyle(key)} key={key}>
                <TouchableOpacity
                  onPress={() => pressKey(key)}
                  activeOpacity={0.7}
                >
                  <View style={style.letterContainer}>
                    <Text style={style.letter}>{key.toLocaleUpperCase()}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: "row",
  },

  letterContainer: {
    borderRadius: 4,
    backgroundColor: "#636363",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    color: "white",
    fontWeight: "bold",
  }
});

const letterStyle = (key: string): ViewStyle => {
  return {
    width: `${getKeyWidthFactor(key) * 10}%`,
    height: KEY_HEIGHT,
    padding: 4,
  };
};
