import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Calendar from '../components/Calendar';
import AppointmentCard from '../components/cards/AppointmentCard';
import { GREEN_2, GREEN_3, GRAY_1 } from '../styles/Colors';
import Card from '../components/cards/Card';
import CustomText from '../components/CustomText';
import { useOnlineCalendar } from '../hooks/useOnlineCalendar';

export default function OnlineCalendar() {
    const vm = useOnlineCalendar();

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <Text style={styles.title}>Consultas agendadas</Text>

            <Calendar
                onDayPress={vm.handleDayPress}
                selectedDate={vm.selectedDate}
            />

            {vm.selectedDate ? (
                <>
                    <Text style={styles.sectionLabel}>
                        {vm.selectedDate.toLocaleDateString('pt-BR', {
                            weekday: 'long', day: '2-digit', month: 'long',
                        })}
                    </Text>

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
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: GREEN_3,
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: GRAY_1,
        textTransform: 'capitalize',
        marginTop: 20,
        marginBottom: 10,
    },
    list: {
        paddingBottom: 90,
    },
});
