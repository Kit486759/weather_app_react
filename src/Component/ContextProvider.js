import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const Context = createContext()

export default function ContextProvider({ children }) {

    const [city, setCity] = useState("vancouver")
    const apiKey = "bb38ad245b56243dda6f74c97a8bcf6c"
    const [currentData, setCurrentData] = useState([])
    const [forecastData, setForecastData] = useState([])


    useEffect(() => {


        const fetching = async () => {
            try {
                await axios.all([
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
                    ,
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
                ])
                    .then(axios.spread((current, forecast) => {
                        console.log(current.data)
                        console.log(forecast.data)
                        setCurrentData(current.data)
                        setForecastData(forecast.data)
                    }))
            }
            catch (err) {
                console.log(`Error ${err}`)
                alert(`Something wrong, please try again.`)
            }
        }
        fetching()

        // Set interval to reflash the info every 2 minutes.
        const interval = setInterval(() =>
            fetching()
            , 120000)

        // Clear interval if component unmount
        return () => {
            if (interval)
                clearInterval(interval)
        }

    }, [city])

    // Search funtion 
    const searchSubmit = (searchCity) => {
        setCity(searchCity)
    }




    return (
        <>
            {currentData.length !== 0 && forecastData.length !== 0 ?
                < Context.Provider value={{ currentData, forecastData, searchSubmit }}>
                    {children}
                </Context.Provider>
                : null
            }
        </>
    )
}
