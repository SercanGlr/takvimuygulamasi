import { StyleSheet, Pressable,Text, View ,Alert, TextInput, SafeAreaView,Image} from "react-native";
import React, { useState } from "react";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { Dimensions } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";



const {height,width}=Dimensions.get("screen");

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isimSoyisim, setIsimSoyisim] = useState("");
  const [kimlik, setKimlik] = useState("");
  const [cinsiyet, setCinsiyet] = useState("");
  const [adress, setAdress] = useState("");

  const register = () => {
    if(email===""  || password==="" || phone===""|| kimlik===""|| adress===""|| cinsiyet===""|| isimSoyisim===""){
        Alert.alert('Invalid Details', 'Please fill all the details', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
  
      }
      createUserWithEmailAndPassword(auth,email,password).then((UserCredential)=>{
        const user=UserCredential._tokenResponse.email
        const myUserUid=auth.currentUser.uid;
        console.log(user),
        console.log(UserCredential)
        setDoc(doc(db,"users",`${myUserUid}`),{
            email:user,
            password:password,
            isimSoyisim:isimSoyisim,
            phone:phone,
            kimlik:kimlik,
            cinsiyet:cinsiyet,
            adress:adress


           
    
          })
    
      })
    

      }
    
  const navigation=useNavigation();
  function renderHeaderImage(){
    return(  <View style={{marginBottom:15,marginTop:50,alignItems:'center',justifyContent:'center'}}>
      <Image source={require("../../assets/calendar.gif")} style={{width:'100%',height:200 }} resizeMode="cover"/>
    </View>)
  
  }
  return (
     
 
    <KeyboardAvoidingView>
    <SafeAreaView>
    <ScrollView vertical showsVerticalScrollIndicator={false}>   
    {renderHeaderImage()}
   
   
      <View style={{ marginHorizontal: 15,alignItems:'center',justifyContent:'center' }}>
      <TextInput
        style={styles.input}
        onChangeText={setIsimSoyisim}
        value={isimSoyisim}
        placeholder="isim-soyisim"
   
      />
       <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="e-mail orn:orn@gmail.com"
   
      />
            <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Sifre"
        secureTextEntry={true}
        
   
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Telefon No Exp:5555555555"
        keyboardType="numeric"
        maxLength={11}
   
      />
       
       <TextInput
        style={styles.input}
        onChangeText={setKimlik}
        value={kimlik}
        placeholder="Kimlik No"
        maxLength={11}
   
      />

      <TextInput
        style={styles.input}
        onChangeText={setAdress}
        value={adress}
        placeholder="Adresiniz"
   
      />
   
       

  
        
      <TextInput
        style={styles.input}
        onChangeText={setCinsiyet}
        value={cinsiyet}
        placeholder="Erkek-Kadın"
   
      />
        
      </View>
     
          
        
        
        <Pressable style={styles.button}
    
     onPress={register}
    
   >
     <Text style={styles.subTitle}>Kayıt Ol</Text>
    </Pressable>

         <Pressable style={{width:250,marginLeft:'auto',
    marginRight:'auto',alignItems:'center',justifyContent:'center'}}
    
     onPress={() => navigation.goBack()}
    
   >
     <Text style={{...styles.subTitle,color:'black'}}>Hesabın var mı ? Giris Yap</Text>
    </Pressable>
  </ScrollView>

</SafeAreaView>
</KeyboardAvoidingView>
  
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
 
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: 300,
    marginVertical: 10,
    marginLeft: 8,
    fontSize:17,
    fontWeight:'500'
  },
  button:{
    marginVertical:10,
    borderRadius:12,
    marginLeft:'auto',
    marginRight:'auto',
   

    
    backgroundColor:'#e5331d',
    width:250,
    alignItems:'center',
    height:44,
    justifyContent: 'center',
    marginVertical:20

  },
  subTitle:{
    color:'white',
    fontSize:17,
    fontWeight:'700'

  }
});

