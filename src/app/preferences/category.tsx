import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { categories } from "@/constants/field.constant";
import usePreferenceStore from "@/stores/preference.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

export default function CategoryScreen() {
  const router = useRouter();
  const windowHeight = Dimensions.get("window").height;
  const { preferences, setPreferences } = usePreferenceStore();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleSelectCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const filteredCategories = categories.filter((category) =>
    preferences.includes(category.name)
  );

  const handleNext = () => {
    const combinedPreferences = [...preferences, ...selectedCategories];
    setPreferences(combinedPreferences);
    router.push({
      pathname: "/preferences/analyze",
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <ScrollView
        style={[
          styles.container,
          {
            minHeight: windowHeight - 200,
          },
        ]}
      >
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
      </ScrollView>
      <ThemedView style={styles.buttonContainer}>
        <Button disabled={selectedCategories.length === 0} onPress={handleNext}>
          다음
        </Button>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    position: "relative",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    backgroundColor: "#fff",
  },
});
