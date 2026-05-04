import { TouchableOpacity, Text } from "react-native";
import { GREEN_1, GREEN_2, GREEN_3 } from "../src/styles/Colors";
import CustomText from "./CustomText";

export default function PositiveButton({ onPress, title, variant = 'bodyLarge' }) {
    return (
        <TouchableOpacity
            style={{
                marginTop: 20,
                backgroundColor: GREEN_2,
                padding: 5,
                borderRadius: 10,
            }}
            onPress={onPress} >
            <CustomText variant={variant} style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
                {title}
            </CustomText>
        </TouchableOpacity>
    )
}