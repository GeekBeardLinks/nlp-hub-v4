import { IIntentLuis } from './luis-response';
export interface IApp {
    id: string;
    type: string;
    intent?: string;
    exp: string;
    key?: string;
    kb?: string;
    appHost?: string;
    appId?: string;
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
