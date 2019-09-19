import { expect } from 'chai';
import { LuisRecognizer } from '../luis';
import { IRecognizerParams } from '../../../model/app';

describe('LuisApp', () => {
    it('Can be instantiated', () => {
        const configuration: IRecognizerParams = { id: 'luis', type: "luis", params: { appHost: "https://appHost", appId: "appId", key: 'key' }};
        const sut: LuisRecognizer = new LuisRecognizer(configuration);
        expect(sut).to.be.a.instanceOf(LuisRecognizer);
    });
});
