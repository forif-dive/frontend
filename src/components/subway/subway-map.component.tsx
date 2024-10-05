import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Station {
  id: string;
  name: string;
}

interface SubwayMapProps {
  onStationSelect: (station: Station) => void;
}

const stations: Station[] = [
  { id: "1", name: "부전" },
  { id: "2", name: "거제해맞이" },
  { id: "3", name: "거제" },
  { id: "4", name: "교대" },
  { id: "5", name: "동래" },
  { id: "6", name: "안락" },
  { id: "7", name: "부산원동" },
  { id: "8", name: "재송" },
  { id: "9", name: "센텀" },
  { id: "10", name: "벡스코" },
  { id: "11", name: "신해운대" },
  { id: "12", name: "송정" },
  { id: "13", name: "오시리아" },
  { id: "14", name: "기장" },
  { id: "15", name: "일광" },
  { id: "16", name: "좌천" },
  { id: "17", name: "월내" },
  { id: "18", name: "서생" },
  { id: "19", name: "남창" },
  { id: "20", name: "망양" },
  { id: "21", name: "덕하" },
  { id: "22", name: "개운포" },
  { id: "23", name: "태화강" },
];

const STATION_WIDTH = 80;
const SCREEN_WIDTH = Dimensions.get("window").width;

const SubwayMapComponent: React.FC<SubwayMapProps> = ({ onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const handleStationPress = (station: Station) => {
    setSelectedStation(station);
    onStationSelect(station);
  };

  const totalWidth = stations.length * STATION_WIDTH;
  const contentWidth = totalWidth + SCREEN_WIDTH - STATION_WIDTH;

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        horizontal
        style={styles.container}
        contentContainerStyle={{
          width: contentWidth,
          paddingLeft: SCREEN_WIDTH / 2 - STATION_WIDTH / 2,
          paddingRight: SCREEN_WIDTH / 2 + STATION_WIDTH / 2,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.mapContainer, { width: totalWidth }]}>
          <View style={styles.line} />
          {stations.map((station, index) => (
            <TouchableOpacity
              key={station.id}
              style={[
                styles.station,
                { left: index * STATION_WIDTH },
                selectedStation?.id === station.id && styles.selectedStation,
              ]}
              onPress={() => handleStationPress(station)}
            >
              <View style={styles.stationDot} />
              <Text
                style={[
                  styles.stationName,
                  selectedStation?.id === station.id &&
                    styles.selectedStationName,
                ]}
              >
                {station.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  container: {
    height: 80,
    backgroundColor: "#fff",
  },
  mapContainer: {
    height: "100%",
    paddingVertical: 8,
  },
  line: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#0054a6", // 0054a6
  },
  station: {
    position: "absolute",
    alignItems: "center",
    top: "50%",
    marginTop: -2.5,
    width: STATION_WIDTH,
  },
  stationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#0054a6",
  },
  selectedStation: {
    transform: [{ scale: 1.2 }],
  },
  stationName: {
    marginTop: 4,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  selectedStationName: {
    fontWeight: "bold",
    color: "#0054a6", // 선택된 역 이름의 색상을 변경할 수도 있습니다.
  },
});

export default SubwayMapComponent;
