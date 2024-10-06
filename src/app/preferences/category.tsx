import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { getCategory } from "@/services/category.service"; // 카테고리 API 호출
import usePreferenceStore from "@/stores/preference.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

export default function CategoryScreen() {
  const router = useRouter();
  const { preferences, setPreferences } = usePreferenceStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const windowHeight = Dimensions.get("window").height;

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(),
  });

  function handleSelectCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const handleNext = () => {
    setPreferences([...preferences, ...selectedCategories]);
    router.push({
      pathname: "/preferences/analyze",
    });
  };

  const filteredData = categoriesData
    ? Object.entries(categoriesData).filter(([category]) =>
        preferences.includes(category)
      )
    : [];

  if (filteredData.length > 0) {
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

          {filteredData.map(([category, options]) => (
            <View key={category}>
              <ThemedText
                type="subtitle"
                style={{ marginBottom: 32 }}
                key={category}
              >
                {category}
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
                {(options as unknown as string[]).map((option) => (
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
          <Button
            disabled={selectedCategories.length === 0}
            onPress={handleNext}
          >
            다음
          </Button>
        </ThemedView>
      </ScrollView>
    );
  }

  return null;
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
