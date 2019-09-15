import fs from 'fs';
import { LuisApp } from './engines/luis/luis';
import { RasaApp } from './engines/rasa/rasa';
import { RegexApp } from './engines/regex';
import { IApp } from './model/app';

export interface INlpHubConfiguration {
  threshold: number;
  apps: IApp[];
}

export class NlpHub {
    public threshold: number;
    public apps!: IApp[];

    constructor(configuration: INlpHubConfiguration) {
        this.threshold = configuration.threshold || 0.8;
        this.apps = configuration.apps || [];
    }

    public async firstMatch(utterance: string) {

        for (const app of this.apps) {
          const returnOfApp: any = await this.appProcess(app, utterance);
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
    public async appProcess(app: any, utterance: any) {
        if (app.type === 'regex') {
            const regexApp: RegexApp = new RegexApp();
            return (await regexApp.regex(app, utterance));
        } else if (app.type === 'luis') {
          const luisApp: LuisApp = new LuisApp();
          return (await luisApp.luis(app, utterance));
        } else if (app.type === 'rasa') {
          const luisApp: RasaApp = new RasaApp();
          return (await luisApp.rasa(app, utterance));
        } else {
          return (null);
        }
    }
}
