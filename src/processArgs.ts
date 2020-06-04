import { from } from 'rxjs/'

export const sliceOffFirstTwoElements = (args: string[]): string[] =>
  args.slice(2)

export const combineArgListIntoString = (list: string[]): string =>
  list.join(' ')

export const separatePlacesInToListByCommas = (places: string): string[] => {
  const placeNames = places.split(',').filter(name => name.length > 0)
  return placeNames.map(name => name.trim())
}

const processArgsIntoPlaceList = (args: string[]): string[] => {
  const listFromArgs = sliceOffFirstTwoElements(args)
  const stringOfPlaceNames = combineArgListIntoString(listFromArgs)
  return separatePlacesInToListByCommas(stringOfPlaceNames)
}
