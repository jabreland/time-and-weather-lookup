import { expect } from 'chai'
import { it, describe } from 'mocha'

import * as index from '../index'

describe('index/sliceOffFirstTwoElements', function () {
  it('should return every array element after  index 1', function () {
    const stringArray = ['zero', 'one', 'two', 'three', 'four']
    const expectedArray = ['two', 'three', 'four']
    const result = index.sliceOffFirstTwoElements(stringArray)
    expect(result).to.have.lengthOf(expectedArray.length)
    expect(result).to.eql(expectedArray)
  })
  it('should return an empty array if two or less items are passed in', function () {
    const stringArrayWithOneElement = ['zero']
    const stringArrayWithTwoElements = ['zero', 'one']
    const result = index.sliceOffFirstTwoElements(stringArrayWithOneElement)
    const result2 = index.sliceOffFirstTwoElements(stringArrayWithTwoElements)
    expect(result).to.not.be.null
    expect(result2).to.not.be.null
    expect(result).to.have.lengthOf(0)
    expect(result2).to.have.lengthOf(0)
  })
})

describe('index/combineArgsListIntoString', function () {
  it('should return a string with the former list items combined into as string', function () {
    const placeList = ['New', 'York,', 'North', 'Vancouver,']
    const expectedResult = 'New York, North Vancouver,'
    const result = index.combineArgListIntoString(placeList)
    expect(result).to.equal(expectedResult)
  })
})

describe('index/separatePlacesInToListByCommas', function () {
  it('should return a list of full place names', function () {
    const placeString = 'New York, North Vancouver, London,'
    const expectedResult = ['New York', 'North Vancouver', 'London']
    const result: string[] = index.separatePlacesInToListByCommas(placeString)
    expect(result).to.have.lengthOf(expectedResult.length)
    expect(result).to.eql(expectedResult)
  })
})

describe('index/processImportArgsIntoListOfNames', function () {
  it('should a cleaned up list of place names and postal codes', function () {
    const inputArgsList = [
      'weather/',
      'path/to/weather',
      'New',
      'York,',
      'North',
      'Vancouver,',
      'London,',
      'Pluto,',
      '10005',
    ]
    const expectedResultList = [
      'New York',
      'North Vancouver',
      'London',
      'Pluto',
      '10005',
    ]
    const result = index.processImportArgsIntoListOfNames(inputArgsList)
    expect(result).to.have.lengthOf(expectedResultList.length)
    expect(result).to.eql(expectedResultList)
  })
})
