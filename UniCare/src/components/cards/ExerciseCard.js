import { View } from "react-native"
import Card from "./Card";
import CustomText from "../CustomText";
import { GRAY_1, GREEN_1, GREEN_2, GREEN_3, GREEN_4 } from "../../styles/Colors";
import PositiveButton from "../buttons/PositiveButton";

export default function ExerciseCard({ exercise, isPending }) {
    return (
        <Card style={{ width: '90%' }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <CustomText variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                    Quantidade de exercícios
                </CustomText>

                <CustomText variant="bodyMedium" style={{ fontWeight: 'bold', color: GREEN_2 }}>
                    {exercise.exercisesCount ? `${exercise.exercisesCount}` : 'Nenhum exercício'}
                </CustomText>
            </View>

            <Card style={{ marginTop: 10, width: '100%', marginHorizontal: 0, backgroundColor: '#dbdbdb' }}>
                <CustomText variant="bodyLarge">
                    {exercise.name}
                </CustomText>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <CustomText variant="captionBold" style={{ paddingRight: 10 }}>
                        {exercise.region1}
                    </CustomText>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <CustomText variant="captionBold" style={{ color: GREEN_1 }}>
                        {exercise.objective}
                    </CustomText>
                </View>

                <PositiveButton title={isPending ? "Avaliar exercício" : "Iniciar exercício"} onPress={() => { exercise.onPress() }} variant='label' />
            </Card>
        </Card>
    )
}