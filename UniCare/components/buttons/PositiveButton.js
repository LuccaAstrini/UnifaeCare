import { TouchableOpacity, Text } from "react-native";
import { GREEN_2, GRAY_1 } from "../../src/styles/Colors";
import CustomText from "../CustomText";

export default function PositiveButton({ onPress, title, style = {}, variant = 'bodyLarge', enabled = true }) {
    return (
        <TouchableOpacity
            style={{
                marginTop: 20,
                backgroundColor: enabled ? GREEN_2 : GRAY_1,
                padding: 5,
                borderRadius: 10,
                ...style
            }}
            onPress={onPress}
            disabled={!enabled}
        >
            <CustomText variant={variant} style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
                {title}
            </CustomText>
        </TouchableOpacity>
    )
}