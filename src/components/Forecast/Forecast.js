import React, {useState} from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';


const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);
    function getForecast(e) {
        e.preventDefault();
        if(city.length===0) {
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);
        let uriEncodedCity=encodeURIComponent(city);
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": process.env.REACT_APP_API_KEY
	}
    })
    
       .then(response => response.json())
       
    .then(response => {
        if(response.cod!==200) {
            throw new Error()
        }
        setResponseObj(response);
        setLoading(false);
	console.log(response);
    })
    .catch(err => {
        setError(true);
        setLoading(false);

	console.error(err.message);
    });
    }
    
    return (
        
       <div>
           
           <div>
           <h2>Find Current Weather Conditions</h2>
           <form onSubmit = {getForecast}>
               <input
                    type="text"
                    placeholder="Enter the city"
                    maxLength="50"
                    className={classes.textInput}
                    value = {city}
                    onChange={(e)=>setCity(e.target.value)}
               />
               <div>
               <label className={classes.Radio}>
                   <input
                        type ="radio"
                        name = "units"
                        checked = {unit === "imperial"}
                        value = "imperial"
                        onChange = {(e)=>setUnit(e.target.value)}
                   />
                   Fahrenheit
               </label>
                <label className={classes.Radio}>
                    <input
                        type ="radio"
                        name = "units"
                        checked={unit==="metric"}
                        value="metric"
                        onChange={(e)=>setUnit(e.target.value)}
                    />
                    Celcius
                </label>
                </div>
                
                <button className={classes.Button} type="submit">Get Forecast</button>
                
           </form>
           <Conditions
              responseObj={responseObj}
              error={error} //new
              loading={loading} //new
              />
       </div>
       </div>
    )
}

export default Forecast;
