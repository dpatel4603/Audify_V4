import * as React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native'

export default function HelpAndOptions({ navigation }) {
    return (
        <View style = {styles.container}>
          <Text style={styles.title}> Thank You For Using Audify</Text>
          <Text style={styles.title}> If you have any questions feel free to contact us</Text>
          <Text></Text>
          <Text>
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:AudifyEA@gmail.com')}>
            <Text style={styles.button}>AudifyEA@gmail.com</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#e7a117',

  },
});


