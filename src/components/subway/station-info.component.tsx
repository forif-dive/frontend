import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

import SubwayMapComponent from "./subway-map.component";

interface Station {
    id: string;
    name: string;
  }

export default function StationInfoComponent() {
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);

    const handleStationSelect = (station: Station) => {
        setSelectedStation(station);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.mapsection}>
                <SubwayMapComponent onStationSelect={handleStationSelect} />
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.text}>
                {selectedStation 
                    ? `선택된 역: ${selectedStation.name}`
                    : '역을 선택해주세요'}
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText style={styles.text}>
                {selectedStation
                    ? `${selectedStation.name} 역에 대한 상세 정보가 여기에 표시됩니다.`
                    : '역을 선택하면 상세 정보가 표시됩니다.'}
                </ThemedText>    
            </ThemedView>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    //   backgroundColor: '#f0f0f0',
    },
    mapsection: {
        marginBottom: 16,
    },
    section: {
        padding: 16,
        marginBottom: 16,
    //   backgroundColor: 'red',
        borderRadius: 8,
        borderColor: '#f0f0f0',
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
  });