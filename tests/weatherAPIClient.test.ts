import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as weatherAPIClient from '../src/weatherAPIClient'
import * as testData from './testData'

describe('weatherAPIClient/createOpenWeatherURL', function () {
  it('should create a valid URL string to the OpenWeatherMap API', function () {
    const key = '39fakeKeyStringthisisSuppost123toBe33'
    const location = { lat: 40.7127753, lng: -74.0059728 }
    const { lat, lng } = location
    const result = weatherAPIClient.createOpenWeatherURL(location, key)
    expect(result).to.not.undefined
    expect(result).to.not.be.empty
    expect(result).to.equal(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
    )
  })
})

describe('weatherAPI/parseDataFromOpenWeather', function () {
  it('It should parse weather data for required properties', function () {
    const providedWeather = testData.newYorkWeatherData
    const locationData = testData.newYorkLocationAndTimeData
    const expectedResult = testData.newYorkCompleteData
    const parsedWeather = weatherAPIClient.parseDataFromOpenWeather(
      locationData,
      providedWeather
    )
    console.log(parsedWeather)
    expect(parsedWeather).to.not.be.undefined
    expect(parsedWeather).to.not.be.empty
    expect(parsedWeather).to.be.eql(expectedResult)
  })
})
