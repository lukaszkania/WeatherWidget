import React, { Component } from 'react';
import { monthNames } from '../../constants/MONTHS_AND_DAYS';

class WeatherTodayData extends Component {
    state = {
        weatherData: {}
    }

    getEndOfNumberDay(dateFromApi) {
        const year = dateFromApi.slice(0, 4)
        const month = dateFromApi.slice(5, 7)
        const day = dateFromApi.slice(8, 10)

        const date = new Date(year, month, day)
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
        const year = dateFromApi.slice(0, 4)
        const month = dateFromApi.slice(5, 7)
        const day = dateFromApi.slice(8, 10)

        const date = new Date(year, month, day)
        return monthNames[date.getMonth()]

    }


    formatString(stringFromApi) {
        const formatedString = stringFromApi.split(/(?=[A-Z])/)
        return formatedString.join(" ")
    }

    render() {
        return (
            <>
                <div className="temperature-and-asset-container">
                    <div className="temperature-and-asset">
                        <p>
                            {this.props.getNameOfTheDay(this.props.weather.date)}, {this.getNameOfTheMonth(this.props.weather.date)} {this.props.weather.date.slice(8, 10)}{this.getEndOfNumberDay(this.props.weather.date)}
                        </p>
                        <p>
                            {this.formatString(this.props.weather.type)}
                        </p>
                        <div className="img-and-p">
                            {this.props.displayAssets(this.props.weather.type)}
                            <p>{this.props.changeCelciusToFar(this.props.weather.temperature)}<sup>°F</sup></p>
                        </div>
                    </div>
                    <div className="details-container">
                        <p>Precipitation: <span>{this.props.weather.precipitation}%</span></p>
                        <p>Humidity: <span>{this.props.weather.humidity}%</span></p>
                        <p>Wind: <span>{this.props.weather.windInfo.speed} mph {this.props.weather.windInfo.direction}</span></p>
                        <p>Pollen Count: <span>{this.props.weather.pollenCount}</span></p>
                    </div>
                </div>
            </>

        );
    }
}

export default WeatherTodayData;