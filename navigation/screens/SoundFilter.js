import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';


function SoundFilter() {
  const route = useRoute();
  const { varLeft, varRight, recording } = route.params || {}; // add check for undefined


  useEffect(() => {
    if (!varLeft || !varRight) {
      console.warn('Variables are undefined');
      // Handle the error as required
    }
   
    
  }, [varLeft, varRight]);

  

  return (
        <View style = {styles.container}>
          <Text style={styles.title}> Welcome to the Sound Filter</Text>
          <Text style={styles.title}> Press the button below to Filter</Text>
          <Text>{varLeft}</Text>
          
          {/* <Text> {route.params.SoundFilter1}</Text> */}

        </View>
    );
}

export default SoundFilter;

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
    fontSize: 20,
    fontWeight: 'bold',
  },
});


