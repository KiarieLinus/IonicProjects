// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hackernews_db: {
    databaseURL: 'https://hacker-news.firebaseio.com',
  },
  app_db: {
    apiKey: "AIzaSyAK3G6Kf7Kzd9XzwJGIWVOyMdvV4ONpQqs",
    authDomain: "hacker-news-client-73b7d.firebaseapp.com",
    projectId: "hacker-news-client-73b7d",
    storageBucket: "hacker-news-client-73b7d.appspot.com",
    messagingSenderId: "756915904876",
    databaseURL: 'https://hacker-news.firebaseio.com',
    appId: "1:756915904876:web:be786ecf111347fbc05349",
    measurementId: "G-5HZRKCBL53"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
