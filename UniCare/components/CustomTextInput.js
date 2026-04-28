import { TextInput } from "react-native-gesture-handler";
import { FONT_FAMILY_MEDIUM } from "../src/styles/Fonts";

export default function CustomInput({ value, onChangeText, placeholder, secureTextEntry }) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                fontSize: 16,
                fontFamily: FONT_FAMILY_MEDIUM
            }}
        />
    )
}