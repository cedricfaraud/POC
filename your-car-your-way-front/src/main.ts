// Ajoutez cette ligne pour déclarer global
(window as any).global = window;

// Ajoutez ces imports pour polyremplir les modules nécessaires
import * as process from 'process';
(window as any).process = process;

import * as crypto from 'crypto-browserify';
(window as any).crypto = crypto;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
