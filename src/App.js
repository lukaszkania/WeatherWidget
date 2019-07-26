import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton'
import CITIES_API_URL from './constants/API_URL';
import DropDown from './components/DropDown/DropDown';
import WeatherTodayData from './components/WeatherTodayData/WeatherTodayData';

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

  isDayIsToday(dateFromApi) {
    const today = new Date()
    const year = dateFromApi.slice(0, 4)
    const month = dateFromApi.slice(5, 7)
    const day = dateFromApi.slice(8, 10)
    const apiDate = new Date(year, month, day)

    if (today.getDate() === apiDate.getDate() && today.getMonth() === apiDate.getMonth() && today.getFullYear() === apiDate.getFullYear()) {
      console.log('prawda')
      return true
    } else {
      console.log('falsz')

      return false
    }
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
            if (this.isDayIsToday(weatherObject.date)) {
              return (
            <div className="actual-today-weather-container">
              <WeatherTodayData key={index} weather={weatherObject} />
              </div>
              )
            } else {
              return <div> </div>
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;