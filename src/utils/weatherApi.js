import axios from 'axios';

let API_Weather = 'http://api.openweathermap.org/data/2.5/weather?';
let apiKey = '70309cd7ebc25e4746cb0b15d2c7907f';
const getWeatherData = async (cityname) => {
    try {
        const { data } = await axios.get(API_Weather + `q=${cityname}&lang=vi&appid=${apiKey}`);
        return data;
    } catch (error) {
        throw error;
    }
}
export default getWeatherData
