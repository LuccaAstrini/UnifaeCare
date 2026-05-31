import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { GREEN_1 } from "../styles/Colors";

export default function CircularIndicator({ value, style }) {
    return (
        <View style={style}>
            <CircularProgress
                value={value}
                radius={45}
                strokeWidth={8}
                progressColor={GREEN_1}
                activeStrokeColor={GREEN_1}
                inActiveStrokeColor="#e0e0e0"
                valueSuffix="%" 
            />
        </View>
    );
}