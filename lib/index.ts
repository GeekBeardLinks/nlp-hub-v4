import fs from 'fs';
import { LuisRecognizer } from './engines/luis/luis';
import { RasaRecognizer } from './engines/rasa/rasa';
import { RegexRecognizer } from './engines/regex/regex';
import { IApp } from './model/app';

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
      for (const recognizer of this.recognizers) {
        const returnOfApp: any = await recognizer.recognize(utterance);
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
        return new RegexRecognizer(app);
    } else if (app.type === 'luis') {
      return new LuisRecognizer(app);
    } else if (app.type === 'rasa') {
      return new RasaRecognizer(app);
    } else {
      return (null);
    }
    }
}
