import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../CustomText';
import Card from '../cards/Card';
import { GREEN_2, WHITE } from '../../styles/Colors';

const CustomStepText = ({ step, text }) => {
    return (
        <View style={styles.container}>
            <View style={{
                width: '15%',
                alignItems: 'center',
                borderRadius: 10,
                paddingVertical: 10,
                marginRight: 15,
                backgroundColor: GREEN_2,
            }}>
                <CustomText variant='bodyLarge' style={{ fontWeight: 700 }} color={WHITE}>
                    {step}
                </CustomText>
            </View>
            <CustomText variant='bodyMedium' style={{ flex: 1 }}>
                {text}
            </CustomText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: 'center'
    },
});

export default CustomStepText;