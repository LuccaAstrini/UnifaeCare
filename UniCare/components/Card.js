import { View } from "react-native";

export default function Card({ children }) {
    return (
        <View
            style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                marginVertical: 10,
                marginHorizontal: 10
            }}
        >
            {children}
        </View>
    );
}