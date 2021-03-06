import { from, Observable, of } from 'rxjs'
import { getLocationData} from './apiClient'
import getTimeData from './timeAPIClient'

import { flatMap, map, switchMap } from 'rxjs/operators'
import { getWeatherData, completeInfoData } from './weatherAPIClient'

const getDataFromAPIs = (
  location: string,
  index: number
): Observable<completeInfoData> => {
  const createStreamFromLocation = from(getLocationData(location, index)).pipe(
    switchMap(locationData => getTimeData(locationData)),
    switchMap(locationAndTimeData => getWeatherData(locationAndTimeData))
  )

  return createStreamFromLocation
}

export default getDataFromAPIs
