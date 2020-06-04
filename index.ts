import { from } from 'rxjs'
import { flatMap, map } from 'rxjs/operators'
import { formatData } from './src/formatData'

export const sliceOffFirstTwoElements = (args: string[]): string[] =>
  args.slice(2)
export const combineArgListIntoString = (list: string[]): string =>
  list.join(' ')
export const separatePlacesInToListByCommas = (places: string): string[] => {
  const placeNames = places.split(',').filter(name => name.length > 0)
  return placeNames.map(name => name.trim())
}
export const processImportArgsIntoListOfNames = (args: string[]): string[] => {
  const listFromArgs = sliceOffFirstTwoElements(args)
  const stringOfPlaceNames = combineArgListIntoString(listFromArgs)
  return separatePlacesInToListByCommas(stringOfPlaceNames)
}

const list = ['Tokyo', 'Paris', 'Vancouver', '---']

const locationList = from(list)
const getData = locationList.pipe(
  flatMap((location, index) => getDataFromAPIs(location, index)),
  map(rawData => formatData(rawData))
)
getData.subscribe({
  next: weatherData => console.log(weatherData),
})
