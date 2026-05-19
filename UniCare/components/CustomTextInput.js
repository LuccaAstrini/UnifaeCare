import { TextInput } from "react-native-gesture-handler";
import { FONT_FAMILY_MEDIUM } from "../src/styles/Fonts";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GREEN_3 } from "../src/styles/Colors";

export default function CustomInput({ value, onChangeText, placeholder, secureTextEntry }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isSecure = secureTextEntry && !isPasswordVisible;

    return (
        <View>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                    fontSize: 16,
                    fontFamily: FONT_FAMILY_MEDIUM
                }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isSecure}
            />
            {secureTextEntry && (
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(prev => !prev)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={20}
                        color={GREEN_3}
                        />
                </TouchableOpacity>
            )}
        </View>
    );
}