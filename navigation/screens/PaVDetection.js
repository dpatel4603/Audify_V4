import Recorder_1_1 from './Recorder_1';
import Audiogram_1 from './Audiogram';
import FilterFns_1 from './FilterFns';
import * as ml5 from "ml5";
import * as p5 from "p5";
let pitch;
let mic;
let AMP;
let FREQ;
let freq;
let VOL;
let playSound = [];
let filteredSound = [];
const crossFileTest = "Test Success";


function setup() //Sets up the frequency and volume detection
{
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(console.log('ml5 microphone starting...'));
  AMP = new p5.Amplitude();
freq = ml5.pitchDetection(
  "./model/", //OBTAINED
  audioContext, //OBTAINED
  mic.stream, //OBTAINED
  modelLoaded); //OBTAINED

}
function gotPitch(error,frequency)
{
  if(error){
    console.error(error);
  }
  else
  {
    if(frequency)
    {
      FREQ = frequency;
    }
    frequency.getPitch(gotPitch);
    console.log('frequency obtained: ' + frequency + ' Hz');
  }
}
function modelLoaded()
{
  console.log('ml5 and p5 loaded...');
  pitch.getPitch(gotPitch);
  VOL = AMP.getLevel() * 100;
}


let pisREC = Recorder_1_1.isREC;
function draw()
{
  
   if(isREC)
   { 
    playSound[playSound.length] = [FREQ,Recorder_1_1.findVolume()];

   } 
  if (pisREC === false && Recorder_1_1.isREC === true)
  {
    filteredSound = FilterFns_1.filterSound(playSound, Audiogram_1.varLeft, Audiogram_1.varRight);
    playSound = [];
  }
   pisREC = Recorder_1_1.isREC; 
   
}