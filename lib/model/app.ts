import { IIntentLuis } from './luis-response';
export interface IRecognizerParams {
    id: string;
    type: string;
    params: ILuisRecognizerParams | IRegexRecognizerParams | IRasaRecognizerParams ;
}

export interface IRegexRecognizerParams {
    intent: string;
    exp: string;
}

export interface ILuisRecognizerParams {
    appId: string;
    key: string;
    appHost: string;
}

export interface IRasaRecognizerParams {
    appHost: string;
}

// TODO: terminar de armar  modelo
export interface IAppResponse {
    engine: string;
    entities: any;
    intent: IIntentLuis;
    originalResponse: any;
}

export interface IRecognizerResponse {
    engine: string;
    entities: any;
    intent: IRecognizerIntent;
    id: string;
    originalResponse?: any;
}

export interface IRecognizerIntent {
    name: string;
    score: number;
}
