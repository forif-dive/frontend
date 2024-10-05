import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { View, Image, StyleSheet } from "react-native";
  
export default function LineInfoComponent() {

    return (
        <ThemedView>
            <View>
                <ThemedText>동해선 광역전철은 한국철도공사 부산경남본부에서 운영하는 광역전철로서, 부산과 울산을 잇는 동남권 핵심 교통망입니다.</ThemedText>
                <ThemedText>총 65.7km, 23개 역을 운영하며, 편도 기준 75분 소요됩니다.</ThemedText>
            </View>

            <Image source={require('./../../assets/images/subway/subway.jpg')}
                style={styles.image}
                resizeMode="contain"/>

            <View>
                <ThemedText style={styles.boldText}>광역 생활권 형성</ThemedText>
                <ThemedText>부산과 울산을 1시간대에 연결함으로써 두 도시 간 출퇴근이 가능한 일상 생활권을 형성했습니다.</ThemedText>
                <ThemedText style={styles.boldText}>비수도권 최초</ThemedText>
                <ThemedText>수도권이 아닌 지방에서 광역도시를 잇는 최초의 광역철도망입니다.</ThemedText>
                <ThemedText style={styles.boldText}>동남권 메가시티</ThemedText>
                <ThemedText>동남권 메가시티의 공동생활권을 구축하는 초석 역할을 할 것으로 기대됩니다.</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8
    },
    regularText: {
        fontSize: 16,
    },
    image: {
      height: 150,
      width: '100%'
    }
  });
  