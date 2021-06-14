import React, { useContext, useState } from 'react';
import { Context } from './ContextProvider'
import styled, { ThemeProvider } from 'styled-components';

const theme = {
    font: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    highestColor: "red",
    lowestColor: "blue",
    feelColor: "#f1bf99"
}

const StyleDivWrap = styled.div`
background-color: teal;
width:fit-content;
height:fit-content;
margin:0 auto;
padding:30px;
border-radius: 30px;
`

const StyleUl = styled.ul`
list-style: none;
margin:0;
padding:0;
`

const StyleTitle = styled.h1`
font-size : 20pt;
font-family: ${(props) => props.theme.font};
margin:0;
`

const StyleP = styled.p`
font-family:Arial, Helvetica, sans-serif;
color:${(props) =>
        props.high ? props.theme.highestColor :
            props.low ? props.theme.lowestColor :
                props.feel ? props.theme.feelColor :
                    "black"};
`

export default function Current() {

    const { currentData, searchSubmit } = useContext(Context)
    const [searchKey, setsearchKey] = useState()

    const searchInput = (e) => {
        // console.log(e.target.value)
        setsearchKey(e.target.value)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <StyleDivWrap>
                    <StyleUl>
                        <input placeholder="Search city..." onChange={(e) => searchInput(e)}></input>
                        <button onClick={() => searchSubmit(searchKey)}>Search</button>
      
                        <StyleTitle>
                            {currentData.name},{currentData.sys.country}
                        </StyleTitle>
                        <li><StyleP>temp: {currentData.main.temp}</StyleP></li>
                        <li><StyleP feel>feels_like: {currentData.main.feels_like}</StyleP></li>
                        <li><StyleP high>temp_max: {currentData.main.temp_max}</StyleP></li>
                        <li><StyleP low>temp_min: {currentData.main.temp_min}</StyleP></li>
                        <li><StyleP>humidity: {currentData.main.humidity}</StyleP></li>
                        <li><StyleP>pressure: {currentData.main.pressure}</StyleP></li>
                        <li><StyleP>
                            <img src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`} alt="weatherIcon" />
                        </StyleP></li>
                        <li><StyleP>{currentData.weather[0].description}</StyleP></li>

                    </StyleUl>
                </StyleDivWrap>
            </ThemeProvider>
        </>
    )
}
