import axios from 'axios';
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultCard, ResultCardProps } from "@/components/home/ResultCard";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import Spinner from "../common/Spinner";

import SubwayMapComponent from "./subway-map.component";

import { stations } from "@/constants/stations.constant";
import { API_URL } from '@env';


interface Station {
  id: string;
  name: string;
}

interface Attraction {
  description: string
  // id: number
  latitude: number
  longitude: number
  name: string
  imageUrl: string
  distance: number
}

interface Place {
  attractions: Attraction[]
  dailyPassengers: number
  latitude: number
  longitude: number
  name: string
  stationId: number
}




// const dummyData: ResultCardProps[] = [
//   {
//     picture:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lov2H0eRjJe61buyn0At--ea4cV-pd8enQ&s",
//     title: "명촌 갈대밭",
//     desc: "아름다운 갈대밭이 펼쳐진 자연 공간으로, 조용하고 평화로운 환경에서 러닝을 즐길 수 있습니다.",
//     distance: "개운포역으로부터 3분",
//     meter: 1200,
//   },
//   {
//     picture:
//       "https://img4.yna.co.kr/photo/cms/2016/12/09/01/C0A8CAE200000158E153852200000020_P2.jpg",
//     title: "갈맷길",
//     desc: "부산의 해안 경관을 따라 조성된 트레일로, 바다를 배경으로 상쾌한 러닝을 경험할 수 있습니다.",
//     distance: "일광역으로부터 4분",
//     meter: 1200,
//   },
//   {
//     picture:
//       "https://www.visitbusan.net/uploadImgs/files/cntnts/20191230171623094",
//     title: "온천천 카페거리",
//     desc: "온천천을 따라 조성된 산책로는 러닝과 함께 자연을 즐기기에 좋습니다. 러닝 후에는 근처 카페에서 휴식을 취할 수 있어 편리합니다.",
//     distance: "안락역으로부터 8분",
//     meter: 1200,
//   },
//   {
//     picture:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lov2H0eRjJe61buyn0At--ea4cV-pd8enQ&s",
//     title: "명촌 갈대밭",
//     desc: "아름다운 갈대밭이 펼쳐진 자연 공간으로, 조용하고 평화로운 환경에서 러닝을 즐길 수 있습니다.",
//     distance: "개운포역으로부터 3분",
//     meter: 1200,
//   },
//   {
//     picture:
//       "https://img4.yna.co.kr/photo/cms/2016/12/09/01/C0A8CAE200000158E153852200000020_P2.jpg",
//     title: "갈맷길",
//     desc: "부산의 해안 경관을 따라 조성된 트레일로, 바다를 배경으로 상쾌한 러닝을 경험할 수 있습니다.",
//     distance: "일광역으로부터 4분",
//     meter: 1200,
//   },
//   {
//     picture:
//       "https://www.visitbusan.net/uploadImgs/files/cntnts/20191230171623094",
//     title: "온천천 카페거리",
//     desc: "온천천을 따라 조성된 산책로는 러닝과 함께 자연을 즐기기에 좋습니다. 러닝 후에는 근처 카페에서 휴식을 취할 수 있어 편리합니다.",
//     distance: "안락역으로부터 8분",
//     meter: 1200,
//   },
// ];

export default function StationInfoComponent() {
  const [selectedStation, setSelectedStation] = useState<Station>(stations[0]);
  const [data, setData] = useState<ResultCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setIsLoading(true);
    fetchDataForStation(station.id);
  };

  const fetchDataForStation = async (stationId: string) => {
    setError(null);
    setIsEmpty(false);
    try {
      const response = await axios.get<Place>(`${API_URL}/api/v1/stations/${parseInt(stationId) + 3}`);
      const stationData = response.data;
      if (stationData.attractions.length === 0) {
        setIsEmpty(true);
        setData([]);
      } else {
        const formattedData: ResultCardProps[] = stationData.attractions.map(item => ({
          picture: item.imageUrl,
          title: item.name,
          desc: item.description,
          distance: " ",
          meter: item.distance,
        }));
        setData(formattedData);

      }
      
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      setError("데이터를 불러오는 데 실패했습니다.");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, selectedStation && styles.containerWithPlaces]}
    >
      <ThemedView style={styles.mapsection}>
        <SubwayMapComponent
          onStationSelect={handleStationSelect}
          initialStation={selectedStation}
        />
      </ThemedView>

      {selectedStation && isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner size={50} color="#DDDDDD" thickness={4} />
        </View>
      )}

        {selectedStation && !isLoading && error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <ThemedText style={styles.errorText}>다시 시도해 주세요.</ThemedText>
          </View>
        )}

        {selectedStation && !isLoading && !error && isEmpty && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>추천 장소가 없습니다.</ThemedText>
          </View>
        )}

        {selectedStation && !isLoading && !error && !isEmpty && (
          <View style={styles.listContainer}>
            <FlatList
              nestedScrollEnabled
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
            />

          </View>
          
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexGrow: 0,
  },
  containerWithPlaces: {
    height: 600,
  },
  mapsection: {
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
    // paddingVertical: 32,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '40%'
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
