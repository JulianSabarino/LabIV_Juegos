import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './pages/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp(
        { apiKey: "AIzaSyCe4R9-krLhFzhXUYQp2C2E2-MlZ25dVek",
          authDomain: "colmenitas.firebaseapp.com",
          projectId: "colmenitas",
          storageBucket: "colmenitas.appspot.com",
          messagingSenderId: "885265358866",
          appId: "1:885265358866:web:05fc816ab0bcd8155038cb"})),
           provideAuth(() => getAuth()),
           provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp(
            { apiKey: "AIzaSyCe4R9-krLhFzhXUYQp2C2E2-MlZ25dVek",
              authDomain: "colmenitas.firebaseapp.com",
              projectId: "colmenitas",
              storageBucket: "colmenitas.appspot.com",
              messagingSenderId: "885265358866",
              appId: "1:885265358866:web:05fc816ab0bcd8155038cb"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
