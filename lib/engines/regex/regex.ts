import { IApp, IRecognizerResponse } from '../../model/app';
import { Recognizer } from '../recognizer';
export class RegexApp extends Recognizer {
    
    regExp: RegExp | undefined;
    intent: string | undefined;

    constructor(configuration?: IApp) {
        super();
        if(configuration) {
            this.regExp = new RegExp(configuration.exp, 'i');
            this.intent = configuration.intent;
        }
    }

    recognize(utterance: string): Promise<IRecognizerResponse> {
        throw new Error("Method not implemented.");
    }

    public async regex(app: IApp , utterance: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const regExp = new RegExp(app.exp, 'i');
            const match = utterance.match(regExp);
            resolve(this.regexResponse(app, match));

        });
    }

    public regexResponse(app: IApp, match: any) {
        const r = {
            engine: 'regex',
            intent: {
                name: app.intent,
                score: match != null ? 1 : 0,
            },
        };
        return r;
    }
}
