import fs from 'fs';
import { LuisRecognizer } from './engines/luis/luis';
import { RasaRecognizer } from './engines/rasa/rasa';
import { RegexRecognizer } from './engines/regex/regex';
import { IApp } from './model/app';
import { DefaultRecognizer } from './engines/default/default';

export interface INlpHubConfiguration {
  threshold: number;
  defaultIntent: string;
  apps: IApp[];
}

let recognizersMap: {[index: string]: any} = {
    'regex': RegexRecognizer,
    'luis': LuisRecognizer,
    'rasa': RasaRecognizer
}

export class NlpHub {
    public threshold: number;
    public apps!: IApp[];
    public recognizers!: any[];

    constructor(configuration: INlpHubConfiguration) {
        this.threshold = configuration.threshold || 0.8;
        this.apps = configuration.apps || [];
        this.recognizers = [];
        for (const app of this.apps) {
          let recognizer = this.instanciateRecognizer(app);
          if (recognizer){
            this.recognizers.push(recognizer);
          }
        }
        this.recognizers.push(new DefaultRecognizer(configuration));
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
  }

    public instanciateRecognizer(app: IApp) {
      if (app.type in recognizersMap) {
        return new recognizersMap[app.type](app);
      } else {
        return (null);
      }
    }
}
