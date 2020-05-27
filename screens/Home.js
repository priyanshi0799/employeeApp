import React,{useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList, Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper';
import { useSelector , useDispatch } from 'react-redux'

const Home = (props) =>{ 
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const {data,loading} = useSelector((state)=>{
        return state
    })

    const fetchData = () => {
        fetch('https://b68309d4.ngrok.io/')
        .then(res=>res.json())
        .then(data=>{
            // setData(data)
            // setLoading(false)
            dispatch({
                type:'ADD_DATA',
                payload:data
            })
            dispatch({
                type:'SET_LOADING',
                payload:false
            })
        }).catch(err=>{
            Alert.alert(err)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])
    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard} onPress={()=>props.navigation.navigate('Profile',{item:item})}>
                <View style={styles.cardView}>
                    <Image style={{width:60, height:60, borderRadius: 30}}
                        source={{uri:item.picture}}/>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text>{item.position}</Text>
                    </View> 
                </View>
            </Card>
        )
    })

    return(
        <View style={{flex:1}}>
            <FlatList 
                data={data}
                renderItem = {({item})=>{
                    return renderList(item)
                }}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading}
            />
            
            <FAB 
            onPress = {()=>props.navigation.navigate('CreateEmployee')}
            style={styles.fab} small={false} icon="plus" theme={{colors:{accent:'#006aff'}}}
            />    
        </View>
        
    )
}

const styles = StyleSheet.create({
    mycard:{
        margin: 5
    },
    cardView:{
        flexDirection:'row',
        padding: 6
    },
    text:{
        fontSize: 18
    },
    fab:{
        position:'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

export default Home;