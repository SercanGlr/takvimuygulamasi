import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './Navigation/index';
import DetailsScreen from './src/screens/DetailsScreen';


export default function App() {
  return (
    <View style={styles.container}>
    <RootNavigation/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
  
   
  },
});
