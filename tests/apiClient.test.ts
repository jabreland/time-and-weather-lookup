import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import fetch from 'node-fetch'
import sinon from 'sinon'

chai.use(chaiAsPromised)

import * as apiClient from '../src/apiClient'
import * as testData from './TestData'
import { geocodeData } from '../src/apiClient'
import { newYorkgeocode } from './TestData'

export const newYork: geocodeData = {
  index: 0,
  formattedAddress: 'New York, NY, USA',
  location: { lat: 40.7127753, lng: -74.0059728 },
  error: false,
}

describe('apiClient/createGeocodeURL', function () {
  it('should create a valid URL string to Google Geocode', function () {
    const key = '39fakeKeyStringthisisSuppost123toBe33'
    const location = '10005'
    const result = apiClient.createGeocodeURL(location, key)
    expect(result).to.not.undefined
    expect(result).to.not.be.empty
    expect(result).to.equal(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
    )
  })
})

describe('apiClient/createOpenWeatherURL', function () {
  it('should create a valid URL string to the OpenWeatherMap API', function () {
    const key = '39fakeKeyStringthisisSuppost123toBe33'
    const location = { lat: 40.7127753, lng: -74.0059728 }
    const { lat, lng } = location
    const result = apiClient.createOpenWeatherURL(location, key)
    expect(result).to.not.undefined
    expect(result).to.not.be.empty
    expect(result).to.equal(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${key}`
    )
  })

  describe('apiClient/extractRequiredDataFromGeocode', function () {
    it('should return an object with the required data given a response', async function () {
      const result = await apiClient.extractRequiredDataFromGeocode(
        Promise.resolve(testData.newYorkServerResponse),
        0
      )
      expect(result).to.not.be.undefined
      expect(result).to.not.be.empty
      expect(result).to.eql(newYork)
    })

    it('should return an error true object if a null or undefined response is passed in ', async function () {
      const nullResult = await apiClient.extractRequiredDataFromGeocode(null, 1)
      const undefinedResult = await apiClient.extractRequiredDataFromGeocode(
        undefined,
        2
      )
      expect(nullResult).to.have.property('error', true)
      expect(nullResult).to.have.property('index', 1)
      expect(nullResult).to.have.property('message', 'bad response from server')
      expect(undefinedResult).to.have.property('error', true)
      expect(undefinedResult).to.have.property('index', 2)
      expect(undefinedResult).to.have.property(
        'message',
        'bad response from server'
      )
    })

    it('should return an error true object if an empty results array is passed in as a response', function () {
      const resultsArray = apiClient.extractRequiredDataFromGeocode(
        Promise.resolve({ results: [] }),
        3
      )
      return expect(resultsArray).to.eventually.eql({
        error: true,
        index: 3,
        message: 'bad response from server',
      })
    })
  })
})

describe('apiClient/newGeocodeData', function () {
  it('It should return a basic geocode object with just error and index fields when an empty object is passed in', function () {
    const expectedValue = { index: -1, error: false }
    const result = apiClient.newGeocodeData({} as geocodeData)
    expect(result).to.not.be.undefined
    expect(result).to.eql(expectedValue)
  })

  it('should just pass the values of a full formed object through', function () {
    const result = apiClient.newGeocodeData(newYork)
    expect(result).to.eql(newYork)
  })
})

const mockApiResponse = (mybody = {}, ok = true) => {
  return {
    status: 200,
    headers: { 'Content-type': 'application/json' },
    ok: () => {
      return ok
    },
    json: () => {
      return new Promise(resolve => resolve({ results: mybody }))
    },
  }
}


