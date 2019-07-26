import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton'
import CITIES_API_URL from './constants/API_URL';
import DropDown from './components/DropDown/DropDown';
import WeatherTodayData from './components/WeatherTodayData/WeatherTodayData';
import WeatherOtherDayData from './components/WeatherOtherDayData/WeatherOtherDayData';
import { daysOfWeek } from './constants/MONTHS_AND_DAYS';
import rain_s_cloudy from './img/Assets/rain_s_cloudy.png';
import cloudy from './img/Assets/cloudy.png';
import rain_light from './img/Assets/rain_light.png';
import partly_cloudy from './img/Assets/partly_cloudy.png';
import sunny from './img/Assets/sunny.png';

class App extends Component {
  state = {
    cities: [],
    activeCity: "",
    activeCityName: "",
    weather: [],
    currentDate: ""
  }


  getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const day = currentDate.getDate()

    return (year + "-" + month + "-" + day)
  }

  // Getting data from api after component did mount
  componentDidMount() {
    // Getting data from local storage
    const localStorageCityId = localStorage.getItem("cityId")
    const localStorageCityName = localStorage.getItem("cityName")
    // Getting all avaliable cities from API
    axios.get(CITIES_API_URL).then(response => {
      this.setState({
        cities: response.data,
        currentDate: this.getCurrentDate(),
        activeCity: localStorageCityId,
        activeCityName: localStorageCityName
      })

      // Checking if user has something saved in local storage and if it is true getting proper data weather from API
      if (this.state.activeCity !== "") {
        axios.get(CITIES_API_URL + localStorageCityId + "/weather?date=" + this.state.currentDate).then(response => {
          this.setState({
            weather: response.data
          })
        }).catch(error => {
          console.log(error.message)
        })
      } else {
        this.setState({
          activeCity: "",
          weather: []
        })
      }

    }).catch(error => {
      console.log(error.message)
    })


  }

  onClick(event) {
    // Getting weather data from api
    axios.get(CITIES_API_URL + event + "/weather?date=" + this.state.currentDate).then(response => {
      this.setState({
        weather: response.data,
        activeCity: event,
        activeCityName: this.state.cities[event - 1].name
      })
    }).catch(error => {
      console.log(error.message)
    })
    // Updating local storage data
    localStorage.setItem("cityId", event)
    localStorage.setItem("cityName", this.state.cities[event - 1].name)
  }

  getNameOfTheDay(dateFromApi) {
    const year = dateFromApi.slice(0, 4)
    const month = dateFromApi.slice(5, 7)
    const day = dateFromApi.slice(8, 10)

    const date = new Date(year, month, day)
    return daysOfWeek[date.getDay()]

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
    // GETTING TITLE OF BUTTON COMPONENT
    let titleOfButtonComponent = ""
    if (this.state.activeCityName === "") {
      titleOfButtonComponent =
        <em>
          Please select city name...
        </em>
    } else {
      titleOfButtonComponent = this.state.activeCityName
    }

    // MAIN RETURN
    return (
      <div className="main-container">
        <DropdownButton id="dropdown-basic-button" title={titleOfButtonComponent}>
          {this.state.cities.map(cityObject => {
            return <DropDown key={cityObject.id} cityObject={cityObject} onClick={this.onClick.bind(this, cityObject.id)} />
          })}
        </DropdownButton>
        <div className="weather-container">
          {this.state.weather.map((weatherObject, index) => {
            if (index === 0) {
              return (
                <div className="actual-today-weather-container">
                  <WeatherTodayData key={index} weather={weatherObject} changeCelciusToFar={this.changeCelciusToFar} displayAssets={this.displayAssets} getNameOfTheDay={this.getNameOfTheDay} />
                </div>
              )
            }
          })}
        </div>
        <div className="rest-of-week-weather-container">
          {this.state.weather.map((weatherObject, index) => {
            let isToday;
            if (index === 0) {
              isToday = true
            }
            return (
              <WeatherOtherDayData key={index} isToday={isToday} weather={weatherObject} changeCelciusToFar={this.changeCelciusToFar} displayAssets={this.displayAssets} getNameOfTheDay={this.getNameOfTheDay} />
            )

          })}
        </div>
      </div>
    );
  }
}

export default App;