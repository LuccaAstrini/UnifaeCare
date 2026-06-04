import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Calendar from '../components/Calendar';
import AppointmentCard from '../components/cards/AppointmentCard';
import { GREEN_2, GREEN_3, GREEN_4, ORAGEN_1, GRAY_1 } from '../styles/Colors';
import Card from '../components/cards/Card';
import CustomText from '../components/CustomText';
import { useOnlineCalendar } from '../hooks/useOnlineCalendar';

export default function OnlineCalendar() {
    const vm = useOnlineCalendar();

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <CustomText variant="title" style={styles.title}>
                Consultas agendadas
            </CustomText>

            <Calendar
                onDayPress={vm.handleDayPress}
                selectedDate={vm.selectedDate}
            />

            {vm.selectedDate ? (
                <>
                    <View style = {{ marginTop: 12, marginBottom: 8 }}>
                        <CustomText variant="label">
                            {vm.selectedDate.toLocaleDateString('pt-BR', {
                                weekday: 'long', day: '2-digit', month: 'long',
                            })}
                        </CustomText>
                    </View>

                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: GREEN_4 }]} />
                            <CustomText variant="label" color={GRAY_1}>Consulta Online</CustomText>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: ORAGEN_1 }]} />
                            <CustomText variant="label" color={GRAY_1}>Consulta Presencial</CustomText>
                        </View>
                    </View>


                    <FlatList
                        data={vm.appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <AppointmentCard time={item.time} title={item.title} category={item.category} />
                        )}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Card style={{ width: '100%' }}>
                        <CustomText variant='bodyMedium' color={GREEN_2}>Nenhuma consulta agendada para esta data.</CustomText>
                    </Card>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    list: {
        paddingBottom: 90,
    },
    legend: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
        marginBottom: 4,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});
