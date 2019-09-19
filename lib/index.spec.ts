import { expect } from 'chai';
import { NlpHub, INlpHubConfiguration } from './index';
import fs from 'fs';

describe('nlp-hub', () => {
  const configuration: INlpHubConfiguration = {
    threshold: 0.8,
    defaultIntent: 'default',
    apps: [
        { id: "HolaRegex", type: "regex", params: { intent: "greetings", exp: "(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)" }},
        { id: "recommender", type: "regex", params: {intent: "recommender", exp: "^Comprar vuelo$",  }},
        { id: 'rasa', type: "rasa", params: { appHost: "localhost:5000" }},
        { id: 'luis', type: "luis", params: { appHost: "https://appHost", appId: "appId", key: 'key' }},
    ]
  };

  it('can be constructed', () => {
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut).to.be.instanceof(NlpHub);
  });

  it('can be set threshold', () => {
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut.threshold).to.be.equals(0.8);
  });

  it('can be set apps', () => {
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut.apps[0].id).to.be.equals('HolaRegex');
  });

  describe('firstMatch', () => {
    describe('regex', () => {

      it('pass "Hola" and get greetings', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'Hola';
        const responseExpected = {
          id: 'HolaRegex',
          engine: 'regex',
          intent: {
            name: 'greetings',
            score: 1,
          },
          entities: []
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

      it('pass "Comprar vuelo" and get recommender', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'Comprar vuelo';
        const responseExpected = {
          id: 'recommender',
          engine: 'regex',
          intent: {
            name: 'recommender',
            score: 1,
          },
          entities: []
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

      it('pass "asd" and get none', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'asd';
        const responseExpected = {
          engine: 'regex',
          intent: {
            name: 'none',
            score: 1,
          },
        };
        //const response: any = await sut.firstMatch(utterance);
        //expect(response).to.be.deep.equals(responseExpected);
      });

      it('pass "test default" and get default', async () => {
        const caseConfiguration: INlpHubConfiguration = {
          threshold: 0.8,
          defaultIntent: 'defaultIntent',
          apps: [
              { id: "HolaRegex", type: "regex", params: {intent: "greetings", exp: "(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)" }},
              { id: "recommender", type: "regex", params: {intent: "recommender", exp: "^Comprar vuelo$"} }
          ]
        };
        const sut: NlpHub = new NlpHub(caseConfiguration);
        const utterance: string = 'test default';
        const responseExpected = {
          id: 'default',
          engine: 'default',
          intent: {
            name: 'defaultIntent',
            score: 1,
          },
          entities: []
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

    } );
  });
});
