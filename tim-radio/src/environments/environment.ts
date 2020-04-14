// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "AIzaSyDcT28On27FZWqw8TcPQTskkwpLGn7UMKI",
    authDomain: "tim-radio.firebaseapp.com",
    databaseURL: "https://tim-radio.firebaseio.com",
    projectId: "tim-radio",
    storageBucket: "tim-radio.appspot.com",
    messagingSenderId: "386385101538",
    appId: "1:386385101538:web:07d457daeb9a0ab55954bb",
    measurementId: "G-S9C18Q6XFV"
  },
  auth: {
    clientID: '8CGuKCGO0DDDgzAGLO1nmjglTQ9zPp6n',
    domain: 'tim-radio.eu.auth0.com', // e.g., you.auth0.com
    audience: 'https://tim-radio-api',
    auth0RedirectUri: 'http://localhost:4200/callback', // URL to return to after auth0 login
    auth0ReturnTo: 'http://localhost:4200', // URL to return to after auth0 logout
    scope: 'openid profile'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
