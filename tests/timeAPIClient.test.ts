import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as timeAPIClient from '../src/timeAPIClient'
import * as testData from './testData'

chai.use(chaiAsPromised)

const azurekey = 'MyKey'

describe('timeAPIClient/createAzureUrl', function () {
  it('should return a url string', function () {
    const lat = 90,
      lng = 90

    const result = timeAPIClient.createAzureUrl({ lat, lng }, azurekey)
    expect(result).to.equal(
      `https://atlas.microsoft.com/timezone/byCoordinates/json?api-version=1.0&query=${lat},${lng}&subscription-key=${azurekey}`
    )
  })
})

describe('timeAPI/azureHeaders', () => {
  it('should create a new head object with the proper header x-ms-client-id', () => {
    const headers = timeAPIClient.azureHeaders(azurekey)
    expect(headers.get('x-ms-client-id')).to.exist.and.be.equal(azurekey)
  })
})

describe('timeAPIClient/extractTimeZoneFromResponse', () => {
  it('should return the timezone and the utc stamp from the json provided by the timezone server', () => {
    const result = timeAPIClient.extractTimeZoneFromResponse(
      testData.newYorkTime,
      testData.newYorkLocationData
    )
    expect(result).to.have.property('timeZone', 'America/New_York')
    expect(result).to.have.property('utcTime')
  })
})
