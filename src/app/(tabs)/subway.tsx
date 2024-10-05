import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import LineInfoComponent from "@/components/subway/line-info.component";
import StationInfoComponent from "@/components/subway/station-info.component";

export default function SubwayScreen() {
    const [activeSection, setActiveSection] = useState<number | null>(0);

    const sections = [
        { 
          title: '동해선 광역전철 정보', 
          content: <LineInfoComponent />
        },
        { 
          title: '동해선 역별 정보', 
          content: <StationInfoComponent />
        },
    ];

    const toggleSection = (index: number) => {
        setActiveSection(prevActiveSection => 
            prevActiveSection === index ? null : index
        );
    };

    return (
        <ThemedView style={styles.container}>
            {sections.map((section, index) => (
                <View 
                    key={index} 
                    style={[
                      styles.sectionWrapper,
                      activeSection === index && styles.activeSectionWrapper
                    ]}
                >
                    <TouchableOpacity
                        style={[
                          styles.sectionHeader,
                          activeSection === index ? styles.activeSectionHeader : styles.inactiveSectionHeader
                        ]}
                        onPress={() => toggleSection(index)}
                    >
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                    </TouchableOpacity>
                    {activeSection === index && (
                        <View style={styles.sectionContent}>
                            {section.content}
                        </View>
                    )}
                </View>
            ))}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 80
    },
    sectionWrapper: {
        marginBottom: 16,
    },
    activeSectionWrapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    sectionHeader: {
        padding: 16,
    },
    activeSectionHeader: {
        backgroundColor: '#f0f0f0',
    },
    inactiveSectionHeader: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sectionContent: {
        padding: 16,
    },
});