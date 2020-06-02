import {describe, it} from 'mocha'
import chai, {expect} from 'chai'
import chaiAsPromised from "chai-as-promised";
import fetch, {Response} from "node-fetch";
import sinon from 'sinon'

chai.use(chaiAsPromised)

import * as apiClient from '../src/apiClient'

import * as locationTestData from './googleTestData'
import {geocodeData, newGeocodeData} from "../src/apiClient";

const newYork: geocodeData = {
    index: 0,
    formattedAddress: 'New York, NY, USA',
    location: {lat: 40.7127753, lng: -74.0059728},
    error: false
}

describe('apiClient/createGeocodeURL', function () {
    it('should create a valid URL string to Google Geocode', function () {
        const key = '39fakeKeyStringthisisSuppost123toBe33'
        const location = '10005'
        const result = apiClient.createGeocodeURL(location, key)
        expect(result).to.not.undefined
        expect(result).to.not.be.empty
        expect(result).to.equal(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
    })
})


describe('apiClient/createOpenWeatherURL', function () {
    it('should create a valid URL string to the OpenWeatherMap API', function () {
        const key = '39fakeKeyStringthisisSuppost123toBe33'
        const location = {lat: 40.7127753, lng: -74.0059728}
        const {lat, lng} = location
        const result = apiClient.createOpenWeatherURL(location, key)
        expect(result).to.not.undefined
        expect(result).to.not.be.empty
        expect(result).to.equal(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`)
    })

    describe('apiClient/extractRequiredDataFromGeocode', function () {

        it('should return an object with the required data given a response', function () {
            const result = apiClient.extractRequiredDataFromGeocode(locationTestData.newYork, 0)
            expect(result).to.not.be.undefined
            expect(result).to.not.be.empty
            expect(result).to.eql(newYork)
        })

        it('should return an error true object if a null or undefined response is passed in ', function () {
            const nullResult = apiClient.extractRequiredDataFromGeocode(null, 1)
            const undefinedResult = apiClient.extractRequiredDataFromGeocode(undefined, 2)
            expect(nullResult).to.have.property('error', true)
            expect(nullResult).to.have.property('index', 1)
            expect(nullResult).to.have.property('message', 'bad response from server')
            expect(undefinedResult).to.have.property('error', true)
            expect(undefinedResult).to.have.property('index', 2)
            expect(undefinedResult).to.have.property('message', 'bad response from server')
        })

        it('should return an error true object if an empty results array is passed in as a response', function () {
            const resultsArray = apiClient.extractRequiredDataFromGeocode({results: []}, 3)
            expect(resultsArray).to.have.property('error', true)
            expect(resultsArray).to.have.property('index', 3)
            expect(resultsArray).to.have.property('message', 'bad response from server')
        })
    })
})


describe('apiClient/newGeocodeData', function () {
    it('It should return a basic geocode object with just error and index fields when an empty object is passed in', function () {
        const expectedValue = {index: -1, error: false,}
        const result = apiClient.newGeocodeData({} as geocodeData)
        expect(result).to.not.be.undefined
        expect(result).to.eql(expectedValue)
    })

    it('should just pass the values of a full formed object through', function () {
        const result = apiClient.newGeocodeData(newYork)
        expect(result).to.eql(newYork)
    })
})


const mockApiResponse = (mybody = {}, ok = true)=> {
    return {
        status: 200,
        headers: {'Content-type': 'application/json'},
        ok: () => {return ok},
        json: ()=> { return new Promise(resolve => resolve({results: mybody }))}
    }
}

// @ts-ignore
const stub = sinon.stub(fetch, 'Promise')
describe('apiClient/getLocationData', function () {
    afterEach(() =>{stub.reset()})
    after(sinon.restore)
    it('should an geocode object with an error if an error occurs', function () {
        stub.throws(new Error('test error'))
        const result = apiClient.getLocationData('New York', 1)
        return expect(result).eventually.eql({index : 1, error: true, message: 'test error'})
    });

    it('should only call fetch once', function () {
        apiClient.getLocationData('New York', 1)
        return expect(stub.calledOnce).to.be.true;
    })

    it.skip('should return a complete geocodeData object', function () {
        const data = locationTestData.newYork.results[0]
        stub.resolves(mockApiResponse(locationTestData.newYork))
        const result = apiClient.getLocationData('New York', 1)
        return expect(result).eventually.eql({index : 1, error: false})
    })
})

describe('apiClient/getWeatherData', function () {
    // @ts-ignore
    afterEach(() => {
        stub.reset()
    })
    it('should an geocode object with an error if an error occurs', function () {
        stub.throws(new Error('test error'))
        const result = apiClient.getWeatherData(newYork)
        return expect(result).eventually.eql({index: newYork.index, error: true, message: 'test error'})
    });

    it('should only call fetch once', function () {
        apiClient.getWeatherData(newYork)
        return expect(stub.calledOnce).to.be.true;
    })
})

