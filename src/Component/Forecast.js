import React, { useContext, useState, useEffect } from 'react';
import { Context } from './ContextProvider';
import styled from 'styled-components';

const StyleDivWrap = styled.div`
margin:auto;
`
const StyleUl = styled.ul`
list-style: none;
text-align: center;
margin:0;
padding:0;
`
const StyleLi = styled.li`
margin:0;
`
const StyleDiv = styled.div`
display: inline-block;
width:fit-content;
height:fit-content;
background-color:teal;
padding:20px;
margin:10px;
border-radius: 30px;
`

export default function Forecast() {

    const { forecastData } = useContext(Context)
    const [data, setData] = useState([])

    useEffect(() => {

         // Filter the forecast data to set an array of 5
        const dataArr = []

        for (let i = 0; i < forecastData.list.length; i += 9) {
            dataArr.push(forecastData.list[i])
        }
        setData(dataArr)

    }, [forecastData])

    console.log(data)
    return (
        <StyleDivWrap>
            {data.map((data, index) => {
                return (
                    <StyleDiv key={index}>
                        <StyleUl>
                            <StyleLi>{data.dt_txt.slice(0, 10)}</StyleLi>
                            <StyleLi>{data.main.temp}&deg;c</StyleLi>
                            <StyleLi>
                                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weatherIcon" />
                            </StyleLi>
                            <StyleLi>{data.weather[0].description}</StyleLi>
                        </StyleUl>
                    </StyleDiv>
                )
            })}
        </StyleDivWrap>
    )
}
