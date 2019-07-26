import React, { Component } from 'react';

class WeatherOtherDayData extends Component {
    state = {}
    render() {
        return (
            <div className="other-day-weather">
                <p>

                    {this.props.isToday ? "Today" : this.props.getNameOfTheDay(this.props.weather.date)}

                </p>

                {this.props.displayAssets(this.props.weather.type)}

                <div className="temperatures">
                    <p>
                        {this.props.changeCelciusToFar(this.props.weather.temperature)} <sup>°F</sup>
                    </p>
                    <p>
                        {this.props.weather.temperature}<sup>°C</sup>
                    </p>
                </div>
                <p>
                    Pollen {this.props.weather.pollenCount}
                </p>
            </div>
        );
    }
}

export default WeatherOtherDayData;

