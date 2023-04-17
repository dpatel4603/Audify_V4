import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { fft } from 'fft-js';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';


export default function App() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const route = useRoute();
  
  const { upperFre, lowerFre } = route.params || {}; // add check for undefined


  useEffect(() => {
    if (!upperFre || !lowerFre) {
      console.warn('Variables are undefined');
      // Handle the error as required
    }
   
    
  }, [upperFre, lowerFre]);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  
    const recordingURI = recording.getURI();
  
    const source = {
      uri: recordingURI,
    };
  
    const filters = [
      {
        name: 'lowpass',
        type: 'lowpass',
        frequency: upperFre,
        Q: 100,
      },
      {
        name: 'highpass',
        type: 'highpass',
        frequency: lowerFre,
        Q: 100,
      },
      {
        name: 'volume',
        type: 'filter',
        algorithm: async (buffer, _, { sampleRate }) => {
          const fft = new FFT(buffer.length, sampleRate);
          fft.forward(buffer);
  
          const { frequencyData } = fft;
  
          // Set volume to zero if the frequency is not within the range
          if (frequencyData[1000] < 50 || frequencyData[50] < 50) {
            return new Float32Array(buffer.length);
          }
  
          return buffer;
        },
      },
    ];
  
    const processed = await Audio.Sound.createAsync(source, {
      filters,
      progressUpdateIntervalMillis: 50,
      positionMillis: 0,
      volume: 1,
    });
  
    const sound = processed.sound;
    let isPlaying = false;
    let volume = 0;
    
    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) {
        return;
      }
      if (status.isPlaying && !isPlaying) {
        isPlaying = true;
        setInterval(() => {
          volume = Math.random()* 0.5;
          sound.setVolumeAsync(volume);
          if (upperFre === lowerFre) {
            volume = 0;
            sound.setVolumeAsync(volume);
          }

        }, 1000);
      } else if (!status.isPlaying && isPlaying) {
        isPlaying = false;
      }
    });
    
    let updatedRecordings = [...recordings];
    updatedRecordings.push({
      sound: sound,
      // duration: getDurationFormatted(source.durationMillis),
      file: recordingURI,
    });
    
    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const seconds = millis / 1000;
    const minutesDisplay = Math.floor(seconds / 60);
    const secondsDisplay = Math.round(seconds % 60).toString().padStart(2, '0');
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
      );
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.body}> Press Start Recording and the Frequencys will filter in real time</Text>
      <Text></Text>
      <Text></Text>
      <Text>{message}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#eaeaaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeaaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  },
  body: {
    fontSize: 20,
    color: '#20232a',
    fontWeight: 'bold',
    textAlign: 'center'

  }
});