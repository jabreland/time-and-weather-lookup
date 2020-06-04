import { from } from 'rxjs'
import { flatMap, map } from 'rxjs/operators'
import { formatData } from './src/formatData'
import processArgsIntoPlaceList from './src/processArgs'
import getDataFromAPIs from './src/obtainInformation'

const getAndDisplayTimeAndWeatherForLocationList = (args: string[]) => {
  console.log('Fetching Time and weather data...')
  const locationList = from(processArgsIntoPlaceList(args))
  const getData = locationList.pipe(
    flatMap((location, index) => getDataFromAPIs(location, index)),
    map(rawData => formatData(rawData))
  )
  getData.subscribe({
    next: weatherData => console.log(weatherData),
  })
}
