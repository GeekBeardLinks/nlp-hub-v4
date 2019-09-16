import fs from 'fs';
import { LuisApp } from './engines/luis/luis';
import { RasaApp } from './engines/rasa/rasa';
import { RegexApp } from './engines/regex/regex';
import { IApp } from './model/app';
import { Recognizer } from './engines/recognizer';

export interface INlpHubConfiguration {
  threshold: number;
  apps: IApp[];
}

export class NlpHub {
    public threshold: number;
    public apps!: IApp[];
    public recognizers!: any[];

    constructor(configuration: INlpHubConfiguration) {
        this.threshold = configuration.threshold || 0.8;
        this.apps = configuration.apps || [];
        this.recognizers = []
        for (const app of this.apps) {
          this.recognizers.push(this.instanciateRecognizer(app));
        }
    }

    public async firstMatch(utterance: string) {

      for (var _i = 0; _i < this.recognizers.length; _i++) {
        var recognizer = this.recognizers[_i];
        const returnOfApp: any = await this.appProcess(recognizer, this.apps[_i], utterance);
          if (returnOfApp !== null) {
            if (returnOfApp.intent.score > this.threshold) {
              return returnOfApp;
            }
          }
        }
        return({
                engine: 'regex',
                intent: {
                  name: 'NoneDialog',
                  score: 1,
                },
              });
      }

    public instanciateRecognizer(app: IApp) {
      if (app.type === 'regex') {
        return new RegexApp(app);
    } else if (app.type === 'luis') {
      return new LuisApp(app);
    } else if (app.type === 'rasa') {
      return new RasaApp(app);
    } else {
      return (null);
    }
    }

    public async appProcess(recognizer: Recognizer, app: any, utterance: any) {
        if (recognizer instanceof RegexApp) {
            return (await recognizer.recognize(utterance));
        } else if (recognizer instanceof LuisApp) {
          return (await recognizer.recognize(utterance));
        } else if (recognizer instanceof RasaApp) {
          return (await recognizer.rasa(app, utterance));
        } else {
          return (null);
        }
    }
}
