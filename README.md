### Weather ###
A cli node app for obtaining the weather for a list of cities and/or postal codes

This app requires three API keys in your environment and a header key. T

The geocode for location and postal code lookup can be obtained from [Google Geocode](https://developers.google.com/maps/documentation/geocoding/).

The key for weather look up can be obtained from 
[https://openweathermap.org/](https://openweathermap.org/current)

The time zone lookup is done through Azure maps and you need both an authoriztion key and the x-client-id key

- Install with Node and npm install
- add a .env file to the app's root directory with the two key pairs 
  - GOOGLE_API_KEY=*key_from_google*  
  - OPENWEATHERMAP_API_Key=*key_from_open_weather*
  - AZURE_KEY= *(Key passed in as part of the query string)*
  - AZURE_CLIENT_ID= *(Key passed in as the header value x-client-id)*

There are a couple ways of running it. It can be run directly from the Typescript using ts-node. To do this just type 
'./weather comma, seperated, city, list

#### ./weather Toronto, Sidney, A1A 1A1, 10005, 90210 ####

or the javascript files can be compiled user npm 'run run compile'. This will compile the file to js in the ./dist folder.
Then the resulting program can be run using the same pattern as for the weather command but substituting ./weatherjs

The tests can be run using npm test or npm run test:watch