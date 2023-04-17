import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';



export default function HomeScreen() {
  
    return (
        <ScrollView style = {styles.container}>
          <Text style={styles.title}>Welcome to Audify</Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.body}>Please look at the different tabs</Text>
          <Text style={styles.body}> below to work with your filter</Text>
          
          <Image 
          style={{width: 250, height: 250, alignContent: 'center'}}
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEy0NcuR7BU36OwhftXbDN8rH0Lgo_1WIjMA&usqp=CAU' }}/> 
          <Text style={styles.title}>Instructions</Text>
          <Text style={styles.body}> 1. Use Audiogram tap to input your audiogram</Text>
          <Text style={styles.body}> 2. Record audio using the reacording tab</Text>
          <Text style={styles.body}> 3. The sound filter should be applied to the recording</Text>
          <View style={{ paddingBottom: 100 }}></View>
      
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaaa',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 20,
    textAlign: 'center'
  },
});

