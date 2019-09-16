import http = require('http');
import localVarRequest = require('request');
import { IApp, IAppResponse, IRecognizerResponse } from '../../model/app';
import { IEntityLuis, IIntentLuis, ILuisResponse } from '../../model/luis-response';
import { Recognizer } from '../recognizer';
export class LuisApp extends Recognizer {

    constructor(configuration?: IApp){
        super();
    }

    recognize(utterance: string): Promise<IRecognizerResponse> {
        throw new Error("Method not implemented.");
    }

    public async luis(app: IApp, utterance: string): Promise<any> {
            const options: localVarRequest.Options = {
                method: 'GET',
                uri: `${app.appHost}/luis/v2.0/apps/${app.id}?subscription-key=${app.key}&timezoneOffset=0&verbose=true&q=${encodeURIComponent(utterance)}`,
            };

            return new Promise<{ response: http.IncomingMessage; body: ILuisResponse; }>((resolve: any, reject: any) => {
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
}
