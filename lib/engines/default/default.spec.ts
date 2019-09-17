import { DefaultRecognizer } from "./default";
import { expect } from "chai";
import { IRecognizerResponse, IApp } from "../../model/app";
import { INlpHubConfiguration } from "../..";

describe('DefaultRecognizer', () => {
    it('returns default result', async () => {
        const expectedResult: IRecognizerResponse =  {
            id: 'default',
            engine: 'default',
            intent: {
              name: 'defaultIntent',
              score: 1,
            },
            entities: []
        };
        const configuration: INlpHubConfiguration = {
            threshold: 0.8,
            defaultIntent: 'defaultIntent',
            apps: []
        } 
        const sut = new DefaultRecognizer(configuration);
        const result = await sut.recognize('test');
        expect(result).to.deep.equal(expectedResult);

    });
});