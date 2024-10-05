import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { FieldCard } from "@/components/field/FieldCard";
import { Colors } from "@/constants/colors.constant";
import { fields } from "@/constants/field.constant";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FieldScreen() {
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const windowWidth = useWindowWidth();
  function handleSelectField(field: string) {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ThemedView style={[styles.container]}>
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
        <FlatList
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
        <ThemedView>
          <Button
            onPress={() =>
              router.push({
                pathname: "/preferences/category",
                params: { selectedFields },
              })
            }
            disabled={selectedFields.length === 0}
          >
            다음
          </Button>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
