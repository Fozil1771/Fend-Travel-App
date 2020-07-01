import { restElement } from "@babel/types";
import { updateUI } from "./updateUI"
/* Global Variables */

//Api informations 
//geonames
const geoBaseUrl = process.env.GEO_URL;
const geoUser =  process.env.GEO_ID;
//weatherbit
const weatherUrl =  process.env.WEATHER_URL;
const weatherKey =  process.env.WEATHER_KEY;
//pixabay
const imgUrl =  process.env.IMG_URL;
const subUrl =  process.env.IMG_SUB;


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);

export async function performAction(e) {
    const cityName = document.getElementById('city').value;
    //Checking, if the user entered lowercase name 
    //And handling it 
    if(cityName[0] != cityName[0].toUpperCase()){
        cityName[0].toUpperCase
    }

      
    
    const data1 = await getLocalation(geoBaseUrl, cityName, geoUser);
    const res1 = {
        destination: data1.geonames[0].name,
        country: data1.geonames[0].countryName
    };

    const data2 = await getWeather(weatherUrl, cityName, weatherKey);
    const res2 = {
        temperature: data2.data[0].temp,
        weatherInfo: data2.data[0].weather.description,
        weatherPressure: data2.data[0].pres,
        
    };

    const data3 = await getImages(imgUrl, cityName, subUrl);
    const res3 = { largeImg: data3.hits[0].largeImageURL }
   
    // create a single object to post
    const data = {
        destination: res1.destination,
        country: res1.country,
        temperature: res2.temperature,
        weatherInfo: res2.weatherInfo,
        weatherPressure: res2.weatherPressure,
        weatherIcon: res2.weatherIcon,
        largeImg: res3.largeImg
    }

    await fetch('http://localhost:8080/addData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    await updateUI();
}
   
//Getting datas

const getLocalation = async(url, name, userkey) => {
    const res = await fetch(url + name + userkey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('Error', error)
    }
}

const getWeather = async(url, name, userkey)=> {
    const res = await fetch(url + name + userkey)
    try {
        const data = await res.json();
        console.log(data)
        return data
    }catch (error) {
        console.log('Error', error)
    }
}

const getImages = async(url, name, subText) => {
    const res = await fetch(url + name + subText)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('Error', error)
    }
}

