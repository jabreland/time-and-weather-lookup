import { from } from 'rxjs'
import { flatMap, map } from 'rxjs/operators'
import { formatData } from './src/formatData'
import getDataFromAPIs from './src/obtainInformation'

const list = ['Tokyo', 'Paris', 'Vancouver', '---']

const locationList = from(list)
const getData = locationList.pipe(
  flatMap((location, index) => getDataFromAPIs(location, index)),
  map(rawData => formatData(rawData))
)
getData.subscribe({
  next: weatherData => console.log(weatherData),
})
