import { stations } from "@/constants/stations.constant";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import {
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
  initialStation?: Station;
}

const STATION_WIDTH = 80;

const SubwayMapComponent: React.FC<SubwayMapProps> = ({
  onStationSelect,
  initialStation,
}) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(
    initialStation || null
  );
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (initialStation) {
      setSelectedStation(initialStation);
      onStationSelect(initialStation);
    }
  }, [initialStation, onStationSelect]);

  const handleStationPress = (station: Station) => {
    setSelectedStation(station);
    onStationSelect(station);
  };

  const totalWidth = stations.length * STATION_WIDTH;
  const contentWidth = totalWidth + windowWidth - STATION_WIDTH;

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        horizontal
        style={styles.container}
        contentContainerStyle={{
          width: contentWidth,
          paddingLeft: windowWidth / 2 - STATION_WIDTH / 2,
          paddingRight: windowWidth / 2 + STATION_WIDTH / 2,
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
    color: "#0054a6",
  },
});

export default SubwayMapComponent;
