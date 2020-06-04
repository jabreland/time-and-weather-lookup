import { from, Observable, of } from 'rxjs'
import { getLocationData, weatherData, getWeatherData } from './apiClient'
import getTimeData from './timeAPIClient'

import { flatMap, map, switchMap } from 'rxjs/operators'

const getDataFromAPIs = (
  location: string,
  index: number
): Observable<weatherData> => {
  const createStreamFromLocation = from(getLocationData(location, index)).pipe(
    switchMap(locationData => getTimeData(locationData)),
    //    catchError(err => from( {index: -1, message: err.message, error: true})),
    switchMap(locationAndTimeData => getWeatherData(locationAndTimeData))
  )

  return createStreamFromLocation
}

export default getDataFromAPIs
