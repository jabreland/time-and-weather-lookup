import { it, describe } from 'mocha'
import chai, { expect } from 'chai'
import * as formatData from '../src/formatData'
import { weatherData } from '../src/apiClient'
import * as testData from './TestData'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import after = Mocha.after;
chai.use(chaiAsPromised)


const newYorkWeather: weatherData = {
  error: false,
  index: 0,
  formattedAddress: 'New York, NY, USA',
  location: { lat: 40.7127753, lng: -74.0059728 },
  timeZone: 'America/New_York',
  utcTime: '2020-06-02T12:03:22.5652539Z',
  wind: { speed: 1.5 },
  weather: [{ description: 'clear sky' }],
  main: {
    temp: 14.54,
    feels_like: 12.49,
    pressure: 1019,
    humidity: 55,
  },
}

const newYorkWeatherString = `The local time for New York, NY, USA is 8:03:22 AM\nat latitude 40.7127753 and longitude -74.0059728:\nCurrent Conditions: clear sky with a wind speed of 1.5km/h\nThe temperature is 14.54C, but feels like 12.49C.\nThe atmospheric pressure is: 1019kpa, and the humidity is 55%\n`

describe('formatData/formatTime', function () {
  it('It should calculate the correct local time and return it in a string format', function () {
    const { timeZone, utcTime } = newYorkWeather
    const result = formatData.formatTime(timeZone, utcTime)
    expect(result).to.equal('8:03:22 AM')
  })
})

describe('formatData/formatWeatherData', function () {
 // afterEach(sinon.restore)
  // const stub = sinon.stub(formatData, 'formatTime').returns('8:03:22 AM')
  it('It should provided a formatted data and time', function () {
    const results = formatData.formatData(Promise.resolve(newYorkWeather))
    return expect(results).to.eventually.equal(newYorkWeatherString)
  })
})

describe('formatData/formatErrorData', function () {
  it('It should provided a formatted error message with the correct information', function () {
    const results = formatData.formatErrorData({
      index: 10,
      error: true,
      message: 'bad data',
    } as weatherData)
    expect(results).to.equal(
      `Location: missing Unable to locate data for this location due to bad data`
    )
  })
})
