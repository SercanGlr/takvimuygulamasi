import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import Events from './Events';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DetailsScreen({ route }) {
  const { events,selectedDate } = route.params;
  const navigation=useNavigation()
  return (
    
      <View style={{marginTop:50}}>
         <AntDesign name="arrowleft" size={24} color="black" style={{marginLeft:20}} onPress={()=>navigation.goBack()}/>

        
 
      <Events events={events} selectedDate={selectedDate} />
      </View>

  );
}
