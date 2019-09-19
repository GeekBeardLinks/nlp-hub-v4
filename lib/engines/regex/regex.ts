import { IRecognizerParams, IRecognizerResponse, IRegexRecognizerParams } from '../../model/app';
import { Recognizer } from '../recognizer';
export class RegexRecognizer extends Recognizer {
    
    regExp: RegExp | undefined;
    intent: string | undefined;
    id: any;

    constructor(configuration: IRecognizerParams) {
        super();
        this.id = configuration.id;
        const params = configuration.params as IRegexRecognizerParams;

        if(params) {
            this.regExp = new RegExp(params.exp, 'i');
            this.intent = params.intent;
        }
    }

    public async recognize(utterance: string): Promise<IRecognizerResponse> {
        return new Promise((resolve, reject) => {
            if(this.regExp) {
                const match = utterance.match(this.regExp);
                let response: IRecognizerResponse =  {
                    id: this.id,
                    engine: 'regex',
                    intent: {
                        name: this.intent || '',
                        score: match != null ? 1 : 0,
                    },
                    entities: []
                };
                resolve(response);
            } else {
                reject('Error no regex defined');
            }
        });
    }

    public async regex(app: IRecognizerParams , utterance: string): Promise<any> {
        return this.recognize(utterance);
    }
}
