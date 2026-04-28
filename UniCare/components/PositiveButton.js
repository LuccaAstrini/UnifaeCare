import { TouchableOpacity, Text } from "react-native";
import { GREEN_1 } from "../src/styles/Colors";
import CustomText from "./CustomText";

export default function PositiveButton({ onPress, title }) {
    return (
        <TouchableOpacity
            style={{
                marginTop: 20,
                backgroundColor: GREEN_1,
                padding: 5,
                borderRadius: 10,
            }}
            onPress={onPress} >
            <CustomText variant="bodyLarge" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: 10 }}>
                {title}
            </CustomText>
        </TouchableOpacity>
    )
}