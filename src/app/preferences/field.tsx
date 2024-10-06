import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { FieldCard } from "@/components/field/FieldCard";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { getCategory } from "@/services/category.service"; // API 서비스 호출
import usePreferenceStore from "@/stores/preference.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function FieldScreen() {
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const { setPreferences } = usePreferenceStore();
  const windowWidth = useWindowWidth();

  // 카테고리 데이터를 불러오는 useQuery
  const {
    data: fieldsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fields"],
    queryFn: () => getCategory(),
  });

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

  // 로딩 중일 때 처리
  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>로딩 중...</ThemedText>
      </ThemedView>
    );
  }

  // 에러 처리
  if (error) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>데이터를 불러오는 중 오류가 발생했습니다.</ThemedText>
      </ThemedView>
    );
  }

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
        data={fieldsData ? Object.keys(fieldsData) : []} // 필드 데이터의 키(카테고리명) 가져오기
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
