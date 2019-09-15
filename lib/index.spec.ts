import { expect } from 'chai';
import { NlpHub, INlpHubConfiguration } from './index';
import fs from 'fs';

describe('nlp-hub', () => {
  const configuration: INlpHubConfiguration = {
    threshold: 0.8,
    apps: [
        { id: "HolaRegex", type: "regex", intent: "greetings", exp: "(^hola$|^holaa$|^holas$|^holi$|^holis$|^hi$|^hello$)" },
        { id: "recommender", intent: "recommender", exp: "^Comprar vuelo$", type: "regex" },
        { id: 'rasa', type: "rasa", appHost: "localhost:5000", exp: '' },
        { id: 'luis', type: "luis", key: "a", appHost: "a", exp: '' },
        { id: "qna", type: "qnamaker", kb: "055836dd-...", key: "bdf...", exp: '' }
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
          engine: 'regex',
          intent: {
            name: 'greetings',
            score: 1,
          },
        };
        const response: any = await sut.firstMatch(utterance);
        expect(response).to.be.deep.equals(responseExpected);
      });

      it('pass "Comprar vuelo" and get recommender', async () => {
        const sut: NlpHub = new NlpHub(configuration);
        const utterance: string = 'Comprar vuelo';
        const responseExpected = {
          engine: 'regex',
          intent: {
            name: 'recommender',
            score: 1,
          },
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

    } );
  });
});
