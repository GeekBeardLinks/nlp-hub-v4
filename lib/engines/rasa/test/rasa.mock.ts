import nock = require('nock');
//const querystring = require('querystring');

import * as Constants from './rasa.constants.spec';
// import { RasaUriParts } from './rasa.constants.spec';

interface NockPostReplyParams {
    uri: string;
    code: number;
    body?: any;
    headers?: nock.RequestHeaderMatcher;
    requestBody: any;
}

function AddPostReplyToNock(nock: nock.Scope, nockPostParams: NockPostReplyParams) {
    return nock.post(nockPostParams.uri,nockPostParams.requestBody)
                .reply(nockPostParams.code,
                    nockPostParams.body);
}

var rasaCases: NockPostReplyParams[] = [
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_200},
      code: 200,
      headers: undefined,
      body: Constants.RASA_RESPONSE_200,
    },
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_204},
      code: 200,
      headers: undefined,
      body: Constants.RASA_RESPONSE_204,
    }
];

const rasaMock = function(basePath: string) {

    var cases: NockPostReplyParams[] = rasaCases;

    cases.reduce((scope, current) => AddPostReplyToNock(scope, current), nock(basePath));

    // for (let mockUrl of nock.pendingMocks()) {
    //   console.error('url: %j', mockUrl);
    // }

};

export default rasaMock;