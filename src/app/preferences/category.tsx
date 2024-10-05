import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { categories } from "@/constants/field.constant";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen() {
  const router = useRouter();
  const { selectedFields } = useLocalSearchParams() as {
    selectedFields: string;
  };
  const selectedFieldsArray = selectedFields.split(",");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleSelectCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const filteredCategories = categories.filter((category) =>
    selectedFieldsArray.includes(category.name)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView style={[styles.container]}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>
          준성님의 라이프스타일을 선택해주세요.
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={{ marginBottom: 40, fontWeight: "medium" }}
          color="#656F79"
        >
          선택한 라이프스타일은 이후 다양한 개인 맞춤형 서비스를 제공하는 데
          사용됩니다.
        </ThemedText>
        {filteredCategories.map((category) => (
          <View key={category.name}>
            <ThemedText
              type="subtitle"
              style={{ marginBottom: 32 }}
              key={category.name}
            >
              {category.name}
            </ThemedText>
            <ThemedView
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 32,
                gap: 8,
              }}
            >
              {category.options.map((option) => (
                <Chip
                  key={option}
                  onPress={() => handleSelectCategory(option)}
                  selected={selectedCategories.includes(option)}
                >
                  {option}
                </Chip>
              ))}
            </ThemedView>
          </View>
        ))}
        <ThemedView>
          <Button
            disabled={selectedCategories.length === 0}
            onPress={() =>
              router.push({
                pathname: "/preferences/analyze",
                params: { selectedCategories },
              })
            }
          >
            다음
          </Button>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
