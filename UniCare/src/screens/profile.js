import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./TabNavigator";
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function profile() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>UNIFAE Care</Text>
            <Text style={styles.nome}>Cristiane Imamura</Text>
            <Text style={styles.IDinfo}>ID: #8829-REHAB</Text>

            <View>
                <Text style={styles.titlefisio}>Fisioterapeuta responsável</Text>
                <Text style={styles.doutoras}>Dr. Sarah Chen</Text>
                <Text style={styles.especialidades}>Especialista Ortopédica</Text>
            </View>

            <View>
                <Text style={styles.titlefisio}>Fisioterapeuta responsável</Text>
                <Text style={styles.doutoras}>Dr. Vanessa</Text>
                <Text style={styles.especialidades}>Especialista Ortopédica</Text>
            </View>

        <View>
            <View style={styles.divmeta}>
                <Text style={styles.meta}>Meta semanal</Text>
                <Text style={styles.porcentagem}>85% <Text style={styles.concluido}>concluído</Text></Text>
            </View>
        </View>        

        <View style={styles.viewconfig}>    
            <Text style={styles.configsup}>Configurações e suporte</Text>
                <View style={styles.lembretes}>
                    <Text style={styles.notificacoes}>Lembretes</Text>
                    <Text style={styles.notificacoes}>Notificações</Text>
                    <Text style={styles.notificacoes}>Privacidade e Dados</Text>
                </View>
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity> 

        </SafeAreaView>      
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems:"center",
        justifyContent:"center",
    },

    header:{
        fontWeight:"bold",
        fontSize: 20
    },

    nome:{
        fontSize: 40,
        paddingTop: 20,
    },

    IDinfo:{
        color: '#227700',
        fontSize: 15,
        paddingBottom: 20,
    },

    titlefisio:{
        color: '#6d6565',
        paddingBottom: 5,
        paddingTop: 10,
        fontSize: 20,
    }, 

    doutoras:{
       fontWeight:"bold",
       fontSize: 25,
    },

    especialidades:{
        color: '#6d6565',
        paddingBottom: 5,
        fontSize: 20,
    },

    divmeta:{
         color: '#070101',
         
    },

    meta:{
        color: '#017b0f',
        fontSize: 15,
        paddingTop: 30,
        paddingBottom: 10,
        fontWeight:"bold",
    },

    porcentagem:{
        fontWeight: 'bold',
        color: '#017b0f',
        fontSize: 45,
        fontWeight:"bold",
    },
    concluido:{
        fontSize: 20,
        fontWeight:"bold",
    },

    viewconfig:{
        
    },

    configsup:{
        color: '#6d6565',
        paddingTop: 10,
        paddingBottom:20
    },

    notificacoes:{
        fontSize: 20,
    },
    
    lembretes:{
        gap: 18
    },

    button: {
        backgroundColor: '#f7cac6',
        flexDirection: 'row',
        height: 55,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        width: 270
    },    

    buttonText:{
        color: "#ff0000",
        fontWeight: "bold",
        textAlign: "center",
    },
}) ;























