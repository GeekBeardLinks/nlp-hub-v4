import http = require('http');
import localVarRequest = require('request');
import { IRecognizerParams, IAppResponse, IRecognizerResponse, ILuisRecognizerParams } from '../../model/app';
import { IEntityLuis, IIntentLuis, ILuisResponse } from '../../model/luis-response';
import { Recognizer } from '../recognizer';
export class LuisRecognizer extends Recognizer {

    baseUri: string;

    constructor(configuration: IRecognizerParams){
        super();
        
        this.baseUri = '';
        const params = configuration.params as ILuisRecognizerParams;

        if (params){
            this.baseUri = `${params.appHost}/luis/v2.0/apps/${params.appId}?subscription-key=${params.key}&timezoneOffset=0&verbose=true`;
        }
    }

    public recognize(utterance: string): Promise<IRecognizerResponse> {
        const options: localVarRequest.Options = {
            method: 'GET',
            uri: `${this.baseUri}&q=${encodeURIComponent(utterance)}`,
        };

        return new Promise<IRecognizerResponse>((resolve: any, reject: any) => {
            localVarRequest(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        body = JSON.parse(body);
                        const intent: IIntentLuis = {
                            intent: body.topScoringIntent.intent,
                            score: body.topScoringIntent.score,
                        };
                        const myResponse: IAppResponse = {
                            engine: 'luis',
                            entities: [],
                            intent,
                            originalResponse: body,
                        };
                        body.entities.forEach((e: IEntityLuis) => {
                            myResponse.entities.push({
                                score: e.score,
                                type: e.type,
                                value: e.entity,
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

    public async luis(app: IRecognizerParams, utterance: string): Promise<any> {

            return this.recognize(utterance);
    }
}
