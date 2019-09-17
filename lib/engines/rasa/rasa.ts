import http = require('http');
import localVarRequest = require('request');
import { IApp, IAppResponse, IRecognizerResponse } from '../../model/app';
import { IIntentLuis } from '../../model/luis-response';
import { IEntitYRasa, IRasaResponse } from '../../model/rasa-response';
import { Recognizer } from '../recognizer';
export class RasaRecognizer extends Recognizer{
    baseUri: string;
    
    constructor(configuration?: IApp){
        super();
        this.baseUri = '';
        if(configuration){
            this.baseUri = `${configuration.appHost}/parse`
        }
    }

    public recognize(utterance: string): Promise<IRecognizerResponse> {
        const options: localVarRequest.Options = {
            body: {
                q: utterance,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            json: true,
            url: this.baseUri,
        };

        return new Promise<IRecognizerResponse>((resolve: any, reject: any) => {
            localVarRequest(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        body = JSON.parse(body);
                        const intent: IIntentLuis = {
                            intent: body.intent.name,
                            score: body.intent.score,
                        };
                        const myResponse: IAppResponse = {
                            engine: 'rasa',
                            entities: [],
                            intent,
                            originalResponse: body,
                        };
                        body.entities.forEach((e: IEntitYRasa) => {
                            myResponse.entities.push({
                                score: e.confidence,
                                type: e.entity,
                                value: e.value,
                            });
                        });
                        resolve(myResponse);
                    } else {
                        reject({ response, body });
                    }
                }
            });
        });

    }

    public async rasa(app: IApp, utterance: string): Promise<any> {
        return this.recognize(utterance);
    }
}
