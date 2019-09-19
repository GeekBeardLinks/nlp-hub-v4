import { expect } from 'chai';
import { IRecognizerParams } from '../../../model/app';
import { LuisRecognizer } from '../luis';
import * as Constants from './luis.constants.spec';

import luisMock from './luis.mock';
luisMock(Constants.BASE_PATH);

describe('LuisApp', () => {
    it('Can be instantiated', () => {
        const app: IRecognizerParams = {
            id: 'ID',
            params: {
                appHost: 'LUIS_HOST',
                appId: 'APP_ID',
                key: 'APP_KEY',
            },
            type: 'luis',
        };

        const sut: LuisRecognizer = new LuisRecognizer(app);
        expect(sut).to.be.a.instanceOf(LuisRecognizer);
    });

    it('request LUIS with utterace with result code 200', async function() {

        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                key: Constants.SUBSCRIPTION_KEY,
                appHost: Constants.BASE_PATH,
                appId: Constants.APP_ID_CODE_200
            }
        }

        const sut: LuisRecognizer = new LuisRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_200);
        expect(result.engine).is.equal('luis');
        expect(result.intent).is.deep.equal({
            name: "INTENT.200",
            score: 0.92
        });
        expect(result.entities.length).is.equal(0);

    });

    it('request LUIS with utterace with result code 204', async function() {

        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                key: Constants.SUBSCRIPTION_KEY,
                appHost: Constants.BASE_PATH,
                appId: Constants.APP_ID_CODE_204
            }
        }

        const sut: LuisRecognizer = new LuisRecognizer(app);
        const result = await sut.recognice(Constants.QUERY_204);
        expect(result.engine).is.equal('luis');
        expect(result.intent).is.deep.equal({
            name: "INTENT.204",
            score: 0.2
        });
        expect(result.entities.length).is.equal(0);
    });

    it('request LUIS with utterace with result code 500', async function() {

        const app: IRecognizerParams = {
            id: 'ID',
            type: 'luis',
            params: {
                key: Constants.SUBSCRIPTION_KEY,
                appHost: Constants.BASE_PATH,
                appId: Constants.APP_ID_CODE_500
            }
        }

        const sut: LuisRecognizer = new LuisRecognizer(app);
        try {
            await sut.recognice(Constants.QUERY_500);
        } catch (error) {
            expect(error).is.instanceOf(Error);
            expect(error.message).to.be.equal('{"response":{"statusCode":500,"body":"{}","headers":{"content-type":"application/json"},"request":{"uri":{"protocol":"http:","slashes":true,"auth":null,"host":"westus.api.cognitive.microsoft.com","port":null,"hostname":"westus.api.cognitive.microsoft.com","hash":null,"search":"?q=QUERY_500&subscription-key=SUBS_KEY&timezoneOffset=0&verbose=true","query":"q=QUERY_500&subscription-key=SUBS_KEY&timezoneOffset=0&verbose=true","pathname":"/luis/v2.0/apps/APP_ID_500","path":"/luis/v2.0/apps/APP_ID_500?q=QUERY_500&subscription-key=SUBS_KEY&timezoneOffset=0&verbose=true","href":"http://westus.api.cognitive.microsoft.com/luis/v2.0/apps/APP_ID_500?q=QUERY_500&subscription-key=SUBS_KEY&timezoneOffset=0&verbose=true"},"method":"GET","headers":{}}},"body":"{}"}');
        }
        // expect(result.intent).is.deep.equal({
        //     name: "INTENT.204",
        //     score: 0.2
        // });
        // expect(result.entities.length).is.equal(0);

    });

});
