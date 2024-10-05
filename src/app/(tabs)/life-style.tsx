import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import {
  LifeStyleCard,
  LifeStyleCardProps,
} from "@/components/life-style/LifeStyleCard";
import { Colors } from "@/constants/colors.constant";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

const activity = "러닝";

const mockData: LifeStyleCardProps[] = [
  {
    activity: "낚시",
    Icon: () => <FontAwesome5 name="running" size={24} color={Colors.tint} />,
    places: ["부산진역", "부산대역", "부전역"],
  },
  {
    activity: "수영",
    Icon: () => (
      <FontAwesome6 name="person-swimming" size={24} color={Colors.tint} />
    ),
    places: ["수영1", "수영2", "수영3", "수영4", "수영5"],
  },
  {
    activity: "스키",
    Icon: () => (
      <FontAwesome6 name="person-skiing" size={24} color={Colors.tint} />
    ),
    places: ["롯데백화점 센텀시티점", "노란마켓 부산해운대센텀점"],
  },
  {
    activity: "독서",
    Icon: () => <FontAwesome6 name="book" size={24} color={Colors.tint} />,
    places: ["독서1", "독서2"],
  },
];

export default function LifeStyleScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedActivity, setSelectedActivity] =
    useState<LifeStyleCardProps | null>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const handleSelectActivity = (activity: LifeStyleCardProps) => {
    setSelectedActivity(activity);
    bottomSheetRef.current?.snapToIndex(1);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <ThemedText style={styles.title}>
            준성님, 최근에 {activity}이 가장 많이 저장되었어요. {activity}이
            취미라면{" "}
            <ThemedText
              style={[
                styles.title,
                {
                  fontWeight: "bold",
                },
              ]}
              color={Colors.tint}
            >
              부산진역
            </ThemedText>
            을 추천드려요.
          </ThemedText>
        }
        data={mockData}
        renderItem={({ item }) => (
          <LifeStyleCard
            Icon={item.Icon}
            activity={item.activity}
            places={item.places}
            onPress={() => handleSelectActivity(item)}
          />
        )}
        keyExtractor={(item) => item.activity}
        ItemSeparatorComponent={() => (
          <ThemedView
            style={{
              height: 2,
              backgroundColor: "#E5E5E5",
              marginVertical: 24,
            }}
          />
        )}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        index={-1}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          <ThemedText type="subtitle" style={{ marginTop: 16 }}>
            {selectedActivity && selectedActivity.activity} 저장 목록 수정
          </ThemedText>
          <FlatList
            style={{ marginTop: 48, paddingBottom: 24 }}
            data={selectedActivity && selectedActivity.places}
            renderItem={({ item }) => (
              <ThemedView
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ThemedText>{item}</ThemedText>
                <ThemedText color={"#D91B1B"}>삭제</ThemedText>
              </ThemedView>
            )}
            ListFooterComponent={
              <ThemedView
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 32,
                }}
              >
                <ThemedText color={"#D91B1B"}>저장 목록 삭제</ThemedText>
              </ThemedView>
            }
          />
        </BottomSheetView>
      </BottomSheet>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "light",
    lineHeight: 40,
    marginBottom: 32,
  },
  container: {
    flex: 1,
    paddingTop: 96,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
