import {expect} from 'chai'
import {it, describe} from 'mocha'

import {sliceOffFirstTwoElements} from "../index";

describe('index/sliceOffFirstTwoElements', function () {
    it('should return every array element after  index 1', function () {
        const stringArray = ['zero', 'one', 'two', 'three', 'four']
        const result = sliceOffFirstTwoElements(stringArray)
        expect(result).to.eql(['two', 'three', 'four'])
    })
})
