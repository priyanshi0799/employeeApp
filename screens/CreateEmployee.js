import React,{useState} from 'react';
import {StyleSheet, View, Modal, Alert,KeyboardAvoidingView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({navigation,route}) => {

    const getDetails = (type) => {
        if(route.params){
            console.log(route.params)
            switch(type){
                case 'name':
                    return route.params.name
                case 'email':
                    return route.params.email
                case 'phone':
                    return route.params.phone
                case 'salary':
                    return route.params.salary
                case 'position':
                    return route.params.position
                case 'picture':
                    return route.params.picture
            }
        }
        return ''
    }

    
    const [name,setName] = useState(getDetails('name'));
    const [phone,setPhone] = useState(getDetails('phone'));
    const [email,setEmail] = useState(getDetails('email'));
    const [salary,setSalary] = useState(getDetails('salary'));
    const [position,setPosition] = useState(getDetails('position'));
    const [picture,setPicture] = useState(false);
    const [modal,setModal] = useState(false);
    const [enableShift, setEnableShift] = useState(false)

    const submitData = () => {
        fetch('https://b68309d4.ngrok.io/send-data',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                picture: picture,
                salary: salary,
                position: position
            })
        })
        .then(res=>res.json)
        .then(data=>{
            Alert.alert(data.name, 'is Saved Successfully')
            navigation.navigate('Home')
        }).catch(err=>{
            Alert.alert(err)
        })
    }

    const updateData = () => {
        fetch('https://b68309d4.ngrok.io/update',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id:route.params._id,
                name: name,
                email: email,
                phone: phone,
                picture: picture,
                salary: salary,
                position: position
            })
        }).then(res=>res.json)
        .then(data=>{
            Alert.alert('Updated Successfully')
            navigation.navigate('Home')
        }).catch(err=>{
            Alert.alert("Error")
        })
    }

    const pickFromGallery = async() => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data  = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1
            })
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test/${data.uri.split('.')[1]}`
                }
                handleUpload(newFile);
            }
        }else{
            Alert.alert('Photo is mandatory')
        }
    }
    const pickFromCamera = async() => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
            let data  = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1
            })
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test/${data.uri.split('.')[1]}`
                }
                handleUpload(newFile);
            }
        }else{
            Alert.alert('Photo is mandatory')
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append('cloud_name','priyanshi')

        fetch('https://api.cloudinary.com/v1_1/priyanshi/image/upload',{
            method: 'post',
            body: data
        }).then(res=>res.json())
        .then(data=>{
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert(err)
        })
    }


    return(
        <KeyboardAvoidingView behavior='position' style={styles.root} enabled = {enableShift}>
        <View>
                <TextInput style={styles.input}
                    label='Name'
                    value={name}
                    theme={theme}
                    onFocus={()=>setEnableShift(false)}
                    mode='outlined'
                    onChangeText={text => setName(text)}
                />
                <TextInput style={styles.input}
                    label='Email'
                    value={email}
                    theme={theme}
                    onFocus={()=>setEnableShift(false)}
                    mode='outlined'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput style={styles.input}
                    label='Phone Number'
                    value={phone}
                    theme={theme}
                    onFocus={()=>setEnableShift(false)}
                    keyboardType="number-pad"
                    mode='outlined'
                    onChangeText={text => setPhone(text)}
                />
                <TextInput style={styles.input}
                    label='Position'
                    value={position}
                    theme={theme}
                    onFocus={()=>setEnableShift(true)}
                    mode='outlined'
                    onChangeText={text => setPosition(text)}
                />
                <TextInput style={styles.input}
                    label='Salary'
                    value={salary}
                    theme={theme}
                    onFocus={()=>setEnableShift(true)}
                    keyboardType="number-pad"
                    mode='outlined'
                    onChangeText={text => setSalary(text)}
                />
                <Button 
                    style={styles.input}
                    icon={picture==''?"upload":'check' }
                    mode="contained" 
                    theme={theme}
                    onPress={() => setModal(true)}
                >
                    Upload Image
                </Button>
                {route.params ? <Button 
                                    style={styles.input}
                                    icon="content-save" 
                                    mode="contained" 
                                    theme={theme}
                                    onPress={()=> updateData()}
                                >
                                    Update
                                </Button>:<Button 
                                    style={styles.input}
                                    icon="content-save" 
                                    mode="contained" 
                                    theme={theme}
                                    onPress={()=> submitData()}
                                >
                                    Save
                                </Button>}
                

                <Modal 
                    animationType="slide" 
                    transparent={true} 
                    visible={modal} 
                    onRequestClose={()=>setModal(false)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButton}>
                            <Button icon="camera" mode="contained" onPress={() => pickFromCamera()} theme={theme}>
                                Take Pic
                            </Button>
                            <Button icon="folder-open" mode="contained" onPress={() => pickFromGallery()} theme={theme}>
                                Upload
                            </Button>
                        </View>
                        <Button icon="cancel" onPress={() => setModal(false)} theme={theme}>
                                Close me
                        </Button>
                    </View>
                </Modal>
            
        </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary:'#006aff'
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    input:{
        margin:6
    },
    modalButton:{
        flexDirection : 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    modalView:{
        position: 'absolute',
        bottom: 2,
        width: '100%',
        backgroundColor: 'white'
    }
})

export default CreateEmployee;