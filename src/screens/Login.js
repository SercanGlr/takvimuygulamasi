import { StyleSheet, Text, View ,SafeAreaView,TextInput,Pressable, Image} from "react-native";
import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { KeyboardAvoidingView } from "react-native";



const { height, width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((UserCredential) => {
      const user = UserCredential._tokenResponse.email;
      const myuserId = auth.currentUser.uid;
    });
  };
  
  function renderHeaderImage(){
    return(  <View style={{marginBottom:15,marginTop:50,alignItems:'center',justifyContent:'center'}}>
      <Image source={require("../../assets/calendar.gif")} style={{width:'100%',height:300 }} resizeMode="contain"/>
    </View>)
  
  }
  return (
    
    <SafeAreaView >
      {renderHeaderImage()}
      <KeyboardAvoidingView>
      <View style={{alignItems:'center',justifyContent:'center'}}>
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
        placeholder="password"
        secureTextEntry={true}
       
      />
         <Pressable
         style={styles.button}
      
          onPress={login}>
            <Text style={styles.subTitle}>Giris Yap</Text>
            </Pressable>
          
        
        
        <Pressable style={styles.button}
    
     onPress={() => navigation.navigate("Register")}
    
   >
     <Text style={styles.subTitle}>Kayıt Ol</Text>
    </Pressable>
        
      </View>
      </KeyboardAvoidingView>
      
       
   
       


   </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: 300,
    marginVertical:10,
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
    borderWidth:0.5,
    
    width:250,
    alignItems:'center',
    height:44,
    justifyContent: 'center',

  },
  subTitle:{
    color:'white',
    fontSize:17,
    fontWeight:'700'

  }
});

