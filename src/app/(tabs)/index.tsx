import { Input } from "@/components/common/Input";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RecommendBtn } from "@/components/home/RecommendBtn";
import { RecommendLabel } from "@/components/home/RecommendLabel";
import { ResultCard, ResultCardProps } from "@/components/home/ResultCard";
import useLocation from "@/hooks/useLocation";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const data: ResultCardProps[] = [
  {
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lov2H0eRjJe61buyn0At--ea4cV-pd8enQ&s",
    title: "명촌 갈대밭",
    desc: "아름다운 갈대밭이 펼쳐진 자연 공간으로, 조용하고 평화로운 환경에서 러닝을 즐길 수 있습니다.",
    distance: "개운포역으로부터 3분",
    meter: 1200,
  },
  {
    picture:
      "https://img4.yna.co.kr/photo/cms/2016/12/09/01/C0A8CAE200000158E153852200000020_P2.jpg",
    title: "갈맷길",
    desc: "부산의 해안 경관을 따라 조성된 트레일로, 바다를 배경으로 상쾌한 러닝을 경험할 수 있습니다.",
    distance: "일광역으로부터 4분",
    meter: 1200,
  },
  {
    picture:
      "https://www.visitbusan.net/uploadImgs/files/cntnts/20191230171623094",
    title: "온천천 카페거리",
    desc: "온천천을 따라 조성된 산책로는 러닝과 함께 자연을 즐기기에 좋습니다. 러닝 후에는 근처 카페에서 휴식을 취할 수 있어 편리합니다.",
    distance: "안락역으로부터 8분",
    meter: 1200,
  },
];

const recommendLabels = [
  "안락역의 다른 구경거리를 추천해줘",
  "명촌 갈대밭 근처에 있는 맛있는 카페를 추천해줘",
  "꽤 많은 러닝 크루들과 뛸 장소를 추천해줘",
];

export default function HomeScreen() {
  const { location, isLoading } = useLocation();
  // const { preferences } = usePreferenceStore();
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;

  const [inputList, setInputList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLabelShow, setIsLabelShow] = useState(true);

  function handleLabelClick(label: string) {
    if (!inputList.includes(label)) {
      setInputList([...inputList, label]);
      setIsLabelShow(false);
    }
  }

  function handleSubmit() {
    if (inputValue && !inputList.includes(inputValue)) {
      setInputList([...inputList, inputValue]);
      setInputValue("");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ThemedText
            type="title"
            style={{ fontWeight: "medium", fontSize: 28, marginBottom: 24 }}
          >
            {isLoading
              ? "위치 정보를 기반으로 추천해드릴게요. 잠시만 기다려주세요."
              : location?.coords.latitude}
          </ThemedText>
        }
        data={data}
        ItemSeparatorComponent={() => (
          <ThemedView
            style={{
              height: 2,
              backgroundColor: "#E5E5E5",
              marginVertical: 24,
            }}
          />
        )}
        renderItem={({ item }) => <ResultCard {...item} />}
        ListFooterComponent={
          <>
            <RecommendBtn />
            {isLabelShow && (
              <ThemedView style={styles.recommendContainer}>
                {recommendLabels.map((label) => (
                  <RecommendLabel
                    key={label}
                    onPress={() => handleLabelClick(label)}
                  >
                    {label}
                  </RecommendLabel>
                ))}
              </ThemedView>
            )}

            <ThemedView style={!isLabelShow && styles.recommendContainer}>
              <ThemedText>{inputList[0]}</ThemedText>
            </ThemedView>
          </>
        }
      />
      <ThemedView
        style={{
          position: "absolute",
          top: windowHeight - insets.bottom - 220,
          width: "100%",
          left: 16,
        }}
      >
        <Input
          value={inputValue}
          onChangeText={(t) => setInputValue(t)}
          placeholder="궁금하거나 필요한 것을 말씀해 주세요"
          blurOnSubmit={true}
          onSubmitEditing={() => handleSubmit()}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  recommendContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
    marginTop: 32,
    marginBottom: 32,
  },
});
