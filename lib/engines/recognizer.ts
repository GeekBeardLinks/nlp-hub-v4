import { IRecognizerResponse } from "../model/app";

export abstract class Recognizer {
    
    abstract async recognize(utterance: string): Promise<IRecognizerResponse>;
}