import { Colors } from "@/constants/colors.constant";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const RadioButton = ({
  isSelect,
  onPress,
}: {
  isSelect: boolean;
  onPress: any;
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
        <View
          style={[styles.radioCircle, isSelect && { borderColor: Colors.tint }]}
        >
          <View style={isSelect && styles.selectedCircle} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.tint,
  },
  radioText: {
    fontSize: 16,
  },
});

export default RadioButton;
