import {describe, it} from 'mocha'
import chai, {expect} from 'chai'
import * as formatData from '../src/formatData'
import {newYorkCompleteData} from './testData'
import chaiAsPromised from 'chai-as-promised'
import {completeInfoData} from '../src/weatherAPIClient'

chai.use(chaiAsPromised)

const newYorkWeatherString = `The local time for New York, NY, USA is 8:03:22 AM\nat latitude 40.7127753 and longitude -74.0059728:\nCurrent Conditions: clear sky with a wind speed of 2.6km/h\nThe temperature is 20.5C, but feels like 21.67C.\nThe atmospheric pressure is: 1011kpa, and the humidity is 88%\n`

describe('formatData/formatTime', function () {
  it('It should calculate the correct local time and return it in a string format', function () {
    const { timeZone, utcTime } = newYorkCompleteData
    const result = formatData.formatTime(timeZone, utcTime)
    expect(result).to.equal('8:03:22 AM')
  })
})

describe('formatData/formatWeatherData', function () {
  // afterEach(sinon.restore)
  // const stub = sinon.stub(formatData, 'formatTime').returns('8:03:22 AM')
  it('It should provided a formatted data and time', function () {
    const results = formatData.formatData(newYorkCompleteData)
    return expect(results).to.equal(newYorkWeatherString)
  })
})

describe('formatData/formatErrorData', function () {
  it('It should provided a formatted error message with the correct information', function () {
    const results = formatData.formatErrorData({
      index: 10,
      error: true,
      message: 'bad data',
    } as completeInfoData)
    expect(results).to.equal(
      `Location: missing Unable to locate data for this location due to bad data`
    )
  })
})
