import React,{useState} from 'react';
import {StyleSheet, Text, View, Image, Linking, Platform, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons,Entypo } from '@expo/vector-icons';

const Profile = (props) => {
    const { _id, name, email, phone, salary, position, picture } = props.route.params.item

    const deleteEmployee = () => {
        fetch('https://b68309d4.ngrok.io/delete',{
            method:'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                _id
            })
        })
        .then(data=>{
            Alert.alert('deleted')
            props.navigation.navigate('Home')
        }).catch(err=>{
            Alert.alert('Error')
        })
    }

    const openDialer = () => {
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return(
        <View style={styles.root}>
            <LinearGradient
                colors = {["#0033ff","#6bc1ff"]} 
                style = {{height: '20%'}}
            />
            <View style={{alignItems: 'center'}}>
                <Image 
                    style={{width:140, height:140, borderRadius:70, marginTop:-50}}
                    source={{uri:picture}}
                />
            </View>
            <View style={{alignItems:'center', margin:15}}>
                <Title>{name}</Title>
                <Text style={{fontSize: 18}}>{position}</Text>
            </View>

            <Card style={styles.mycard} onPress={()=>{
                Linking.openURL(`mailto: ${email}`)
            }}>
                <View style={styles.cardView}>
                   <MaterialIcons name='email' size={32} color="#006aff"/> 
                   <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>

            <Card style={styles.mycard} onPress={()=>{
                openDialer()}}>
                <View style={styles.cardView}>
                   <Entypo name='phone' size={32} color="#006aff"/> 
                   <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>

            <Card style={styles.mycard}>
                <View style={styles.cardView}>
                   <MaterialIcons name='attach-money' size={32} color="#006aff"/> 
                    <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>

            <View style={{flexDirection:'row', justifyContent:'space-around', padding:10}}>
                <Button icon="account-edit" mode="contained" theme={theme} onPress={()=>{
                                                                                        props.navigation.navigate('CreateEmployee',
                                                                                        {_id, name, email, phone, salary, position, picture}
                                                                                        )}}>
                    Edit
                </Button>
                <Button icon="delete" mode="contained" theme={theme} onPress={()=>deleteEmployee()}>
                    Delete
                </Button>
            </View>
            
        </View>
    )
}

const theme = {
    colors:{
        primary:'#006aff'
    }
}

const styles = StyleSheet.create({
    root:{
        flex: 1
    },
    mycard:{
        margin: 3
    },
    cardView:{
        flexDirection:'row',
        padding: 8
    },
    myText:{
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    }
})

export default Profile;