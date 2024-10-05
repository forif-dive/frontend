import axios from 'axios';
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultCard, ResultCardProps } from "@/components/home/ResultCard";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Spinner from "../common/Spinner";
import { useQuery } from "@tanstack/react-query";
import SubwayMapComponent from "./subway-map.component";

import { stations } from "@/constants/stations.constant";
import { API_URL } from '@env';

interface Station {
  id: string;
  name: string;
}

interface Attraction {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  distance: number;
  image_url: string;
}

interface Place {
  attractions: Attraction[];
}

export default function StationInfoComponent() {
  const [selectedStation, setSelectedStation] = useState<Station>(stations[0]);
  const [nullStation, setNullStation] = useState<Station | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [listData, setListData] = useState<ResultCardProps[]>([]);
  const errorHandled = useRef(false);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['station-info', selectedStation.name],
    queryFn: async () => {
      setIsEmpty(false);
      errorHandled.current = false;

      const response = await axios.post<Place>(
        `${API_URL}/get_attractions_by_station`, 
        {"station_name": selectedStation.name + "역"}
      );
      return response.data;
    },
    enabled: !!selectedStation.name,
    retry: false,
    
  });

  useEffect(() => {
    if (error && !errorHandled.current) {
      setIsEmpty(true);
      errorHandled.current = true;
      setNullStation(selectedStation);
    }
  }, [error]);

  useEffect(() => {
    if (data?.attractions) {
      const formattedData: ResultCardProps[] = data.attractions.map(item => ({
        picture: item.image_url,
        title: item.name,
        desc: item.description,
        distance: "",
        meter: item.distance,
      }));
      setListData(formattedData);
    } else {
      setListData([]);
      setIsEmpty(true);
    }
  }, [data]);

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    if (!(isEmpty && nullStation == station)) {
      refetch();
    }
  };

  return (
    <View style={[styles.container, selectedStation && styles.containerWithPlaces]}>
      <ThemedView style={styles.mapsection}>
        <SubwayMapComponent
          onStationSelect={handleStationSelect}
          initialStation={selectedStation}
        />
      </ThemedView>

      {isLoading && !isEmpty ? (
        <View style={styles.spinnerContainer}>
          <Spinner size={50} color="#DDDDDD" thickness={4} />
        </View>
      ) : isEmpty ? (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>추천 장소가 없습니다.</ThemedText>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            nestedScrollEnabled
            data={listData}
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
            keyExtractor={(item, index) => `${item.title}-${index}`}
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

