import { Input } from "@/components/common/Input";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RecommendBtn } from "@/components/home/RecommendBtn";
import { RecommendLabel } from "@/components/home/RecommendLabel";
import { ResultCard } from "@/components/home/ResultCard";
import useLocation from "@/hooks/useLocation";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { chat } from "@/services/chat.service";
import { Greeting } from "@/services/place.service";
import {
  getAttractionsByStation,
  getStation,
} from "@/services/station.service";
import usePreferenceStore from "@/stores/preference.store";
import { Attraction, Recommendation } from "@/types/station";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { location, isLoading } = useLocation();
  const { preferences } = usePreferenceStore();
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;

  const [inputList, setInputList] = useState<
    (string | Recommendation | Attraction)[]
  >([]);

  const [inputValue, setInputValue] = useState("");
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const { data: greeting, isLoading: isGreetingLoading } = useQuery({
    queryKey: [preferences, location, "greeting"],
    queryFn: async () => {
      const data = await Greeting({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        preferences: preferences,
      });
      return data;
    },
    enabled: !!location?.coords,
    retry: false,
  });

  useEffect(() => {
    if (greeting) {
      setInputList((prev) => [...prev, ...greeting.recommendations]);
    }
  }, [greeting]);

  const animatedGreeting = useTypingAnimation(greeting?.greeting || "", 20);

  const { data: station, isLoading: isStationLoading } = useQuery({
    queryKey: ["station"],
    queryFn: async () => {
      const data = await getStation({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
      return data;
    },
    enabled: !!location?.coords,
    retry: false,
  });

  const { data: attractions } = useQuery({
    queryKey: ["attractions"],
    queryFn: async () => {
      const data = await getAttractionsByStation({
        station_name: station?.station_name,
      });
      return data;
    },
    enabled: !!station?.station_name,
    retry: false,
  });

  function recommendationToString(recommendation: Recommendation): string {
    return `Attraction Name: ${recommendation.name}, Description: ${recommendation.description}, Distance: ${recommendation.distance}m, Time: ${recommendation.time}min, Image URL: ${recommendation.image_url}`;
  }

  function handleLabelClick(label: string) {
    setIsLabelVisible(false);
    if (attractions && !inputList.includes(label)) {
      setInputList([...inputList, label, ...attractions.attractions]);
    } else if (!inputList.includes(label)) {
      setInputList([...inputList, label]);
    }

    handleChatResponse(label);
  }

  async function handleChatResponse(userInput: string) {
    try {
      // previous_chat에 들어갈 값을 필터링 및 변환
      const previousChatStrings = inputList.map((item) => {
        if (typeof item === "string") {
          return item;
        } else {
          return recommendationToString(item as Recommendation);
        }
      });

      const { response } = await chat({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        preferences: preferences,
        previous_chat: [...previousChatStrings, userInput],
      });

      setInputList((prev) => [...prev, response]);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmit() {
    if (inputValue) {
      setInputList([...inputList, inputValue]);
      setIsLabelVisible(false);
      // AI 응답 처리
      handleChatResponse(inputValue);
      setInputValue("");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ThemedText
              type="title"
              style={{
                fontWeight: "medium",
                fontSize: 28,
                marginBottom: 24,
                minHeight: 96,
              }}
            >
              {isGreetingLoading || isLoading
                ? "위치 정보를 기반으로 추천해드릴게요. 잠시만 기다려주세요."
                : animatedGreeting}
            </ThemedText>
            <ThemedView
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <ThemedText type="defaultSemiBold">
                {isStationLoading
                  ? "근처 역 정보를 불러오는 중..."
                  : `현재 위치 : ${
                      station ? station.station_name : "위치를 불러오는 중"
                    }`}
              </ThemedText>
            </ThemedView>
          </>
        }
        data={inputList || []}
        ItemSeparatorComponent={() => (
          <ThemedView
            style={{
              height: 2,
              backgroundColor: "#E5E5E5",
              marginVertical: 24,
            }}
          />
        )}
        // Result
        renderItem={({ item }) => {
          const isUser = typeof item === "string";

          if (isUser) {
            return (
              <ThemedText
                style={{
                  alignSelf: "flex-end",
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 4,
                }}
              >
                {item as string}
              </ThemedText>
            );
          } else {
            const recommendation = item as Recommendation;
            return (
              <ResultCard
                title={recommendation.name}
                desc={recommendation.description}
                distance={recommendation.time}
                meter={recommendation.distance}
                picture={recommendation.image_url}
              />
            );
          }
        }}
        ListFooterComponent={
          <>
            {greeting?.recommendations && <RecommendBtn />}
            {greeting?.recommendations && isLabelVisible && (
              <ThemedView style={styles.recommendContainer}>
                <RecommendLabel
                  onPress={() =>
                    handleLabelClick(
                      `${station?.station_name} 근처의 다른 구경거리를 추천해줘`
                    )
                  }
                >
                  {station?.station_name} 근처의 다른 구경거리를 추천해줘
                </RecommendLabel>
                {greeting.suggested_questions.map((label) => (
                  <RecommendLabel
                    key={label}
                    onPress={() => handleLabelClick(label)}
                  >
                    {label}
                  </RecommendLabel>
                ))}
              </ThemedView>
            )}
          </>
        }
      />
      {/* Input */}
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
    marginVertical: 32,
  },
});
