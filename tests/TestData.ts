import { geocodeData } from 'src/apiClient'

export const postalCodeA1A1A1 = {
  results: [
    {
      access_points: [],
      address_components: ['Array'],
      formatted_address: "St. John's, NL A1A 1A1, Canada",
      geometry: {
        bounds: {
          northeast: { lat: 47.571081, lng: -52.69360289999999 },
          southwest: { lat: 47.5692721, lng: -52.6969515 },
        },
        location: { lat: 47.5699075, lng: -52.6954629 },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: { lat: 47.5715255302915, lng: -52.69360289999999 },
          southwest: { lat: 47.5688275697085, lng: -52.6969515 },
        },
      },
      place_id: 'ChIJa9jsjMajDEsRyPOIaQxwCzY',
      types: ['Array'],
    },
  ],
  status: 'OK',
}

export const zip90210 = {
  results: [
    {
      access_points: ['Array'],
      address_components: ['Array'],
      formatted_address: '450 N Roxbury Dr #600, Beverly Hills, CA 90210, USA',
      geometry: {
        location: { lat: 34.0683231, lng: -118.4069666 },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: { lat: 34.0696720802915, lng: -118.4056176197085 },
          southwest: { lat: 34.0669741197085, lng: -118.4083155802915 },
        },
      },
      place_id: 'ChIJ0X23Lgi8woARbiCgULcWgqQ',
      plus_code: ['Object'],
      types: ['Array'],
    },
  ],
  status: 'OK',
}

export const toronto = {
  results: [
    {
      access_points: ['Array'],
      address_components: ['Array'],
      formatted_address: 'Toronto, ON, Canada',
      geometry: {
        bounds: {
          northeast: { lat: 43.8554579, lng: -79.1168971 },
          southwest: { lat: 43.5810245, lng: -79.639219 },
        },
        location: { lat: 43.653226, lng: -79.3831843 },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: { lat: 43.8554579, lng: -79.1168971 },
          southwest: { lat: 43.5810245, lng: -79.639219 },
        },
      },
      place_id: 'ChIJpTvG15DL1IkRd8S0KlBVNTI',
      types: [Array],
    },
  ],
  status: 'OK',
}

export const newYorkServerResponse = {
  results: [
    {
      access_points: ['Array'],
      address_components: ['Array'],
      formatted_address: 'New York, NY, USA',
      geometry: {
        bounds: {
          northeast: { lat: 40.9175771, lng: -73.70027209999999 },
          southwest: { lat: 40.4773991, lng: -74.25908989999999 },
        },
        location: { lat: 40.7127753, lng: -74.0059728 },
        location_type: 'APPROXIMATE',
        viewport: {
          northeast: { lat: 40.9175771, lng: -73.70027209999999 },
          southwest: { lat: 40.4773991, lng: -74.25908989999999 },
        },
      },
      place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
      types: ['Array'],
    },
  ],
  status: 'OK',
}

export const newYorkTime = {
  Version: '2020a',
  ReferenceUtcTimestamp: '2020-06-02T12:03:22.5652539Z',
  TimeZones: [
    {
      Id: 'America/New_York',
      Names: {
        ISO6391LanguageCode: 'en',
        Generic: 'Eastern Time',
        Standard: 'Eastern Standard Time',
        Daylight: 'Eastern Daylight Time',
      },
      ReferenceTime: {
        Tag: 'EDT',
        StandardOffset: '-05:00:00',
        DaylightSavings: '01:00:00',
        WallTime: '2020-06-02T08:03:22.5652539-04:00',
        PosixTzValidYear: 2020,
        PosixTz: 'EST+5EDT,M3.2.0,M11.1.0',
        Sunrise: '2020-06-02T05:44:13.509-04:00',
        Sunset: '2020-06-02T20:28:13.099-04:00',
      },
    },
  ],
}

export const newYorkgeocode: geocodeData = {
  index: 0,
  formattedAddress: 'New York, NY, USA',
  location: { lat: 40.7127753, lng: -74.0059728 },
  error: false,
}
