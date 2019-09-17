import { Recognizer } from "../recognizer";
import { IRecognizerResponse, IApp } from "../../model/app";
import { INlpHubConfiguration } from "../..";

export class DefaultRecognizer extends Recognizer {
    defaultResult: IRecognizerResponse;

    constructor(configuration?: INlpHubConfiguration) {
        super();
        this.defaultResult = {
            id: 'default',
            engine: 'default',
            intent: {
              name: 'unknown',
              score: 1,
            },
            entities: []
        };
        if(configuration) {
            this.defaultResult.intent.name = configuration.defaultIntent || 'unknown';
        }
    };
    

    public async recognize(utterance: string): Promise<IRecognizerResponse> {
        return new Promise((resolve) => {
            resolve(this.defaultResult);
        })
    }
    
}