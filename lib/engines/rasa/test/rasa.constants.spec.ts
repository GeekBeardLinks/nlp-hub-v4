export interface RasaUriParts {
    host: string
};

export const BASE_PATH: string = 'http://rasahost';

export const QUERY_200: string = 'QUERY_200';
export const QUERY_204: string = 'QUERY_204';


export const RASA_RESPONSE_204 = {
    proyect: 'mock',
    intent: {
        name: 'intent1',
        confidence: 0.83
    },
    model: 'model1232',
    entities: []
}
export const RASA_RESPONSE_200 = {
    proyect: 'mock',
    intent: {
        name: 'intent1',
        confidence: 0.3
    },
    model: 'model1232',
    entities: []
}
