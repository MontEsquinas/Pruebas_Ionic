import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProvidersFirebaseProvider } from '../providers/providers-firebase/providers-firebase';

// Añadimos del firebase

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

//Config de firebase
export const firebase = {
  apiKey: "AIzaSyBWJtrfWoZPPR4jlgHfg2FywkajiWbDR5o",
  authDomain: "micropractica6-82952.firebaseapp.com",
  databaseURL: "https://micropractica6-82952.firebaseio.com",
  projectId: "micropractica6-82952",
  storageBucket: "micropractica6-82952.appspot.com",
  messagingSenderId: "1043291041191",
  appId: "1:1043291041191:web:43a01426146600d5f75a82"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProvidersFirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersFirebaseProvider
  ]
})
export class AppModule {}
