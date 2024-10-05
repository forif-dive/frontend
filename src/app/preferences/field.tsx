import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { FieldCard } from "@/components/field/FieldCard";
import { fields } from "@/constants/field.constant";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import usePreferenceStore from "@/stores/preference.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function FieldScreen() {
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const { setPreferences } = usePreferenceStore();
  const windowWidth = useWindowWidth();
  function handleSelectField(field: string) {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  }

  const handleNext = () => {
    setPreferences(selectedFields);
    router.push({
      pathname: "/preferences/category",
      params: { selectedFields },
    });
  };

  return (
    <>
      <FlatList
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
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
          </>
        }
        data={fields}
        numColumns={2}
        renderItem={({ item: field }) => (
          <FieldCard
            onPress={() => handleSelectField(field)}
            selected={selectedFields.includes(field)}
            width={windowWidth / 2 - 48}
          >
            {field}
          </FieldCard>
        )}
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        keyExtractor={(item) => item}
      />
      <ThemedView style={styles.buttonContainer}>
        <Button onPress={handleNext} disabled={selectedFields.length === 0}>
          다음
        </Button>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
});
