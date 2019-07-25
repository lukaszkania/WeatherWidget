import React, { Component } from 'react';
import { daysOfWeek, monthNames } from '../../constants/MONTHS_AND_DAYS';
import rain_s_cloudy from '../../img/Assets/rain_s_cloudy.png';
import cloudy from '../../img/Assets/cloudy.png';
import rain_light from '../../img/Assets/rain_light.png';
import partly_cloudy from '../../img/Assets/partly_cloudy.png';
import sunny from '../../img/Assets/sunny.png';

class WeatherData extends Component {
    state = {
        weatherData: {}
    }

    getNameOfTheDay(dateFromApi) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const year = dateFromApi.slice(0, 4)
        const month = dateFromApi.slice(5, 7)
        const day = dateFromApi.slice(8, 10)

        const date = new Date(year, month, day)
        return daysOfWeek[date.getDay()]

    }

    getEndOfNumberDay(dateFromApi) {
        const year = dateFromApi.slice(0, 4)
        const month = dateFromApi.slice(5, 7)
        const day = dateFromApi.slice(8, 10)

        const date = new Date(year, month, day)
        console.log(typeof (date.getDate()))
        if (date.getDate() === 1) {
            return "st"
        } else if (date.getDate() === 2) {
            return "nd"
        } else if (date.getDate() === 3) {
            return "rd"
        } else {
            return "th"
        }
    }

    getNameOfTheMonth(dateFromApi) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const year = dateFromApi.slice(0, 4)
        const month = dateFromApi.slice(5, 7)
        const day = dateFromApi.slice(8, 10)

        const date = new Date(year, month, day)
        return monthNames[date.getMonth()]

    }

    isDayIsToday(dateFromApi) {
        const today = new Date()
        const year = dateFromApi.slice(0, 4)
        const month = dateFromApi.slice(5, 7)
        const day = dateFromApi.slice(8, 10)
        const apiDate = new Date(year, month, day)

        if (today.getDate() === apiDate.getDate() && today.getMonth() === apiDate.getMonth() && today.getFullYear() === apiDate.getFullYear()) {
            return true
        } else {
            return false
        }
    }

    formatString(stringFromApi) {
        const formatedString = stringFromApi.split(/(?=[A-Z])/)
        return formatedString.join(" ")
    }

    displayAssets(weatherTypeInfo) {
        if (weatherTypeInfo === "RainAndCloudy") {
            return (
                <img src={rain_s_cloudy} alt="Rain and Cloudly"></img>
            )
        } else if (weatherTypeInfo === "RainLight") {
            return (
                <img src={rain_light} alt="Rain Light"></img>
            )
        }
        else if (weatherTypeInfo === "Cloudy") {
            return (
                <img src={cloudy} alt="Cloudy"></img>
            )
        }
        else if (weatherTypeInfo === "Sunny") {
            return (
                <img src={sunny} alt="Sunny"></img>
            )
        }
        else if (weatherTypeInfo === "PartlyCloudy") {
            return (
                <img src={partly_cloudy} alt="Partly Cloudly"></img>
            )
        }
    }

    changeCelciusToFar(temperatureInC) {
        return Math.round(9 / 5 * temperatureInC + 32)
    }

    render() {
        let WeatherTodayComponent = ""
        let WeatherOtherDayComponent = ""
        if (this.isDayIsToday(this.props.weather.date)) {
            WeatherTodayComponent =
                <>
                    <div className="today-weather-container">
                        <div className="temperature-container">
                            <p>
                                {this.getNameOfTheDay(this.props.weather.date)}, {this.getNameOfTheMonth(this.props.weather.date)} {this.props.weather.date.slice(8, 10)}{this.getEndOfNumberDay(this.props.weather.date)}
                            </p>
                            <p>
                                {this.formatString(this.props.weather.type)}
                            </p>
                            <div className="asset-and-temperature-container">
                                {this.displayAssets(this.props.weather.type)}
                                <p>{this.changeCelciusToFar(this.props.weather.temperature)}<sup>°F</sup></p>
                            </div>
                        </div>
                        <div className="details-container">
                            <p>Precipitation: {this.props.weather.precipitation}%</p>
                            <p>Humidity: {this.props.weather.humidity}%</p>
                            <p>Wind: {this.props.weather.windInfo.speed} mph {this.props.weather.windInfo.direction}</p>
                            <p>Pollen Count: {this.props.weather.pollenCount}</p>
                        </div>
                    </div>
                </>

        }
        if (this.isDayIsToday(this.props.weather.date)) {
            WeatherOtherDayComponent =
                <div className="weather-container">
                    <p>Today</p>
                    {this.displayAssets(this.props.weather.type)}
                    <p>{this.changeCelciusToFar(this.props.weather.temperature)}<sup>°F</sup>{this.props.weather.temperature}<sup>°C</sup></p>
                    <p>Pollen: {this.props.weather.pollenCount}</p>
                </div>
        }else{
            WeatherOtherDayComponent = 
            <div className="weather-container">
            <p>{this.getNameOfTheDay(this.props.weather.date)}</p>
            {this.displayAssets(this.props.weather.type)}
            <p>{this.changeCelciusToFar(this.props.weather.temperature)}<sup>°F</sup>{this.props.weather.temperature}<sup>°C</sup></p>
            <p>Pollen: {this.props.weather.pollenCount}</p>
        </div>
        }


        return (
            <div className="weather">
                {WeatherTodayComponent}
                {WeatherOtherDayComponent}
            </div>
        );
    }
}

export default WeatherData;