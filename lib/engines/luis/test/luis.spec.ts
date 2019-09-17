import { expect } from 'chai';
import { LuisRecognizer } from '../luis';

describe('LuisApp', () => {
    it('Can be instantiated', () => {
        const sut: LuisRecognizer = new LuisRecognizer();
        expect(sut).to.be.a.instanceOf(LuisRecognizer);
    });
});
