import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Audiogram() {
  const [upperFre, setUpperFre] = useState('');
  const [lowerFre, setLowerFre] = useState('');
  const navigation = useNavigation();



  const sendVariables = useCallback(() => {
    navigation.navigate('Recording', { upperFre, lowerFre });
  }, [navigation, upperFre, lowerFre]);

  
  return (
    <View style={styles.container}>
      <Text style={styles.bodyFinal}>1.Input the upper limit of the frequency you can hear</Text>
      <Text style={styles.bodyFinal}>2. Input the lower limit of the frequency you can hear</Text>
      <Text style={styles.bodyFinal}>3. Press Submit to finalize your Audiogram</Text>
      <Text></Text>
      <Text style={styles.title}>Upper frequency</Text>
      <TextInput
        value={upperFre}
        underlineColorAndroid="transparent"
        placeholder="Upper Frequency (Hz)"
        onChangeText={(upperFre) => setUpperFre(upperFre)}
      />
      <Text></Text>
      <Text></Text>
      <Text style={styles.title}>Lower Frequency</Text>
      <TextInput
        keyboardType="phone-pad"
        value={lowerFre}
        underlineColorAndroid="transparent"
        placeholder="Lower Frequency (Hz)"
        onChangeText={(lowerFre) => setLowerFre(lowerFre)}
      />
      <Text></Text>
      <Text></Text>
      <Button
        title="Submit Button"
        onPress={() => {

          sendVariables();
        }}
      />       

      
    </View>
  );
}

export default Audiogram;





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
      color: '#20232a',
      fontWeight: 'bold',
      textAlign: 'center'

    },
    bodyFinal: {
      fontSize: 15,
      color: '#20232a',
      textAlign: 'center'
    }
  });
 
  