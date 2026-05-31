import { View } from "react-native";

export default function Card({ children, backgroundColor = 'white', style }) {
    return (
        <View
            style={[
                {
                    backgroundColor: backgroundColor,
                    borderRadius: 10,
                    padding: 20,
                    marginVertical: 10,
                    width: '80%',
                    marginHorizontal: 10
                },
                style
            ]}
        >
            {children}
        </View>
    );
}