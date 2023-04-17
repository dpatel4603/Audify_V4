
//Defines the 2D array variables: playSound and Audiogram:
function populateSoundList(sound,pS) //a function used to convert an mp3 sound file into a 2D array where Frequency and Volume are given as a function of time
{

return pS;
}

 function findVolume(Ag, f) //Returns the volume that the user can hear a given frequency at
{
    let SLOPE = 0; //Variable representing the Secant-line slope of a line between two points on an audiogram
    let VOLUME = 0;//Variable representing the volume that the user can hear at a given frequency

    if(f < Ag[0][0] || f > Ag[Ag.length - 1][0]) //If the frequency appears out of the range that the user can hear, return false and end the code.
    {
        return false;
        
    }
    else 
    {
    for (let i = 0; i < Ag.length; i++) // repeats for each value in the Audiogram list
    {
        if (f >= Ag[i][0] && f < Ag[i + 1][0]) // if it finds two values such that f is between them: 
        {
            SLOPE = (Ag[i + 1][1]-Ag[i][1])/(Ag[i + 1][0] - Ag[i][0]);
            VOLUME = 0-(SLOPE * (f - Ag[i][0]) + Ag[i][1]); //Assume the user can hear a volume that is in between the two values using a Point-Slope form. 
        }

    }
    return VOLUME;
}
}


function filterSound(pS, lAg, rAg) //Returns a list that represents a sound that has been filtered by a given audiogram. 
{
    let ret = [];
   for(let i = 0; i < pS.length; i++)
   {
    ret[i] = 1; 
        if(pS[i][1] < findVolume(lAg, pS[i][0]))
{
    ret[i] -= 0.5;
} 
if(pS[i][1] < findVolume(rAg,ps[i][0]))
{
    ret[i] -= 0.5; 
}
   }

};




function populateAudiogram(f,V,Ag) //A function intended to place a given frequecy and volume into an audiogram list
{   let noPlaceFound = true; //Variable that is true until a location is found were the frequency and volume given belong in the list
if(Ag.length === 0) //If there is no values entered into the Audiogram.
{
  noPlaceFound = false; //Sets the value of noPlaceFound to false
  Ag = [[f,V]];  //Set the Audiogram to a list with one item [frequency, Volume]
}
if (f > Ag[Ag.length - 1][0] && noPlaceFound) //If the frequency is greater than the largest frequency inputted.
{
    noPlaceFound = false; //Sets the value of noPlaceFound to false.
    Ag[Ag.length] = [f,V]; //Appends the list adding [frequency, Volume] to the end. 
}
if (f < Ag[0][0] && noPlaceFound) // If the inputted frequency is lesser than the lowest frequency inputted. 
{
    for(var i = Ag.length; i > 0; i--) //Repeats for each item in the list starting from the top working down. 
    {
        Ag[i] = Ag[i-1]; //Sets item i in the list to the previous value
    }
    Ag[0] = [f,V]; // Sets the first item to [frequency, Volume].
    noPlaceFound = false;//Sets noPlaceFound to false. 
}
for (let i = 0; i < Ag.length && noPlaceFound; i++) //repeats for every item in the list
{
    if(Ag[i][0] === f) //if item i in the list is equal to the frequency. 
    {
        noPlaceFound = false; //Sets noPlaceFound to false.
        Ag[i][1] = V; //Sets item i's volume to the inputted volume. 
    }
    
}

function removeFromAudiogram(f,Ag)
{
    let retAg = [];
    for(let i = 0; i < Ag.length; i ++)
    {
        if(Ag[i][0] !== f)
        {
            retAg[i] = Ag[i];
        }
    }
    return retAg;
}
function removeAllFromAudiogram()
{
    return [];
}
if(noPlaceFound) //If noPlaceFound is still true.
{
for (let i = Ag.length; i > 0  && noPlaceFound; i--) //Repeats for every value in the list working from the top down. 
{
Ag[i] = Ag[i-1]; //Sets item i in the list to the previous value. 
if(Ag[i-1][0]<f && Ag[i+1]>f) // If f is between the frequency greater than item i and the frequency less than item i
{
    Ag[i] = [f,V]; //Set item i to [frequency, Volume]
    noPlaceFound = false;//Set noPlaceFound to false.
}
}
}
return Ag; //Returns the Audiogram
}
