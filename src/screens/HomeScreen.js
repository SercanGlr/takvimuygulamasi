import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Text, View } from 'react-native';

import { auth, db } from '../../firebase/firebase';

import AddEventModal from './AddEventModal';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { collection, query, where,onSnapshot,addDoc } from 'firebase/firestore';


export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [isAktif, setIsAktif] = useState(true);
  const [isAddEventModalVisible, setAddEventModalVisibility] = useState(false);

  useEffect(() => {
    const myUserUid = auth.currentUser.uid;
    const eventsRef = query(collection(db, "events"), where("userUid", "==", myUserUid));
    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      const eventsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        date: doc.data().date,
        reminder: doc.data().reminder,
        isAktif:doc.data().isAktif,
      }));
      setEvents(eventsList);
    });

    return unsubscribe;
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const addEvent = async (title, reminder) => {
    const event = {
      title: title,
      date: selectedDate,
      reminder: reminder,
      isAktif:isAktif,
    };

    const myUserUid = auth.currentUser.uid;

    // Cloud Firestore'e veri ekle
    await addDoc(collection(db, "events"), {
      ...event,
      userUid: myUserUid,
    });
    console.log('Event added to Firestore successfully!');
  };

  const showAddEventModal = () => {
    setAddEventModalVisibility(true);
  };

  const hideAddEventModal = () => {
    setAddEventModalVisibility(false);
  };

  const navigation=useNavigation();

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          handleDayPress(day);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: 'blue',
          },
        }}
      />
      <Pressable
         style={styles.button}
      
         onPress={showAddEventModal}>
            <Text style={styles.subTitle}>Event Ekle</Text>
            </Pressable>
     

      <AddEventModal
        isVisible={isAddEventModalVisible}
        onClose={hideAddEventModal}
        onAddEvent={addEvent}
        selectedDate={selectedDate}
      />

     
         <Pressable
         style={styles.button}
      
         onPress={()=>navigation.navigate('DetailsScreen', { events: events,selectedDate:selectedDate })}>
            <Text style={styles.subTitle}>Eventleri Göster</Text>
            </Pressable>
          

      
    </View>
  );
}
const styles = StyleSheet.create({
  button:{
    marginVertical:10,
    borderRadius:8,
    marginLeft:'auto',
    marginRight:'auto',
   

    
    backgroundColor:'#e5331d',
    width:370,
    alignItems:'center',
    height:45,
    justifyContent: 'center',

  },
  subTitle:{
    color:'white',
    fontSize:17,
    fontWeight:'800'

  }
}
  )
