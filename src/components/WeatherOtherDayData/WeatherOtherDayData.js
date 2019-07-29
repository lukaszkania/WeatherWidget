import React, { Component } from 'react';

class WeatherOtherDayData extends Component {
    state = {}

    render() {
        return (
            <div onClick={this.onClick} className="other-day-weather">
                <div className="day-name">

                    {this.props.isToday ? "Today" : this.props.getNameOfTheDay(this.props.weather.date)}

                </div>
                <div className="weather-img">
                    {this.props.displayAssets(this.props.weather.type)}
                </div>
                <div className="temperatures">
                    <div className="farenheit-degrees">
                        {this.props.changeCelciusToFar(this.props.weather.temperature)}<sup>°</sup>
                    </div>
                    <div className="celcius-degrees">
                        {this.props.weather.temperature}<sup>°</sup>
                    </div>
                </div>
                <div className="pollen">
                    Pollen {this.props.weather.pollenCount}
                </div>
            </div>
        );
    }
}

export default WeatherOtherDayData;

