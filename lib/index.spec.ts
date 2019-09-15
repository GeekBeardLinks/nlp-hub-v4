import { expect } from 'chai';
import { NlpHub } from './index';
import fs from 'fs';

describe('nlp-hub', () => {
  
  it('can be constructed', () => {
    const filePath: string = 'lib/test/app.json';
    const configuration = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut).to.be.instanceof(NlpHub);
  });

  it('can be set threshold', () => {
    const filePath: string = 'lib/test/app.json';
    const configuration = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut.threshold).to.be.equals('0.8');
  });

  it('can be set apps', () => {
    const filePath: string = 'lib/test/app.json';
    const configuration = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
    const sut: NlpHub = new NlpHub(configuration);
    expect(sut.apps[0].id).to.be.equals('HolaRegex');
  });

  describe('firstMatch', () => {
    describe('regex', () => {

      it('pass "Hola" and get greetings', async () => {
        const filePath: string = 'lib/test/app.json';
        const configuration = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
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
        const filePath: string = 'lib/test/app.json';
        const configuration = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
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
        const filePath: string = 'lib/test/app.json';
        const configuration = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
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
