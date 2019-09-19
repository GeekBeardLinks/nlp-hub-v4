import { expect } from 'chai';
import { RasaRecognizer } from '../rasa';
import { IRecognizerParams } from '../../../model/app';
import * as Constants from './rasa.constants.spec';

import rasaMock from './rasa.mock';
rasaMock(Constants.BASE_PATH);

describe('RasaApp', () => {

    it('Can be instantiated', () => {
        const app: IRecognizerParams = {
            id: 'rasa-1',
            type: 'rasa',
            params: {
                appHost: Constants.BASE_PATH
            }
        }

        const sut: RasaRecognizer = new RasaRecognizer(app);
        expect(sut).to.be.a.instanceOf(RasaRecognizer);
    });
    it('request RASA with utterace with result code 200', async () => {
        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                appHost: Constants.BASE_PATH
            }
        }

        const sut: RasaRecognizer = new RasaRecognizer(app);
        const result = await sut.recognize(Constants.QUERY_200);
        expect(result).to.be.equal(result);
    });
});
