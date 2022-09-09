import { HttpResponse, HttpRequest, RequestBody, HttpMethod as HttpMethod_1 } from "./Types.fs.js";
import { empty } from "../fable-library.4.0.0-theta-001/List.js";
import { singleton } from "../fable-library.4.0.0-theta-001/AsyncBuilder.js";
import { isCancellationRequested, fromContinuations, cancellationToken } from "../fable-library.4.0.0-theta-001/Async.js";
import { disposeSafe, getEnumerator } from "../fable-library.4.0.0-theta-001/Util.js";
import { some } from "../fable-library.4.0.0-theta-001/Option.js";
import { InternalUtilities_toUInt8Array } from "./Extensions.fs.js";

const defaultRequestConfig = new HttpRequest(new HttpMethod_1(0), "/", empty(), new RequestBody(0), false);

export function get$(url) {
    return new HttpRequest(new HttpMethod_1(0), url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

export function post(url) {
    return new HttpRequest(new HttpMethod_1(1), url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

export function request(method, url) {
    return new HttpRequest(method, url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

export function withHeaders(headers, req) {
    return new HttpRequest(req.HttpMethod, req.Url, headers, req.RequestBody, req.WithCredentials);
}

export function withCredentials(withCredentials_1, req) {
    return new HttpRequest(req.HttpMethod, req.Url, req.Headers, req.RequestBody, withCredentials_1);
}

export function withBody(body, req) {
    return new HttpRequest(req.HttpMethod, req.Url, req.Headers, body, req.WithCredentials);
}

function sendAndRead(preparation, resultMapper, req) {
    return singleton.Delay(() => singleton.Bind(cancellationToken(), (_arg) => {
        const token = _arg;
        const request_1 = fromContinuations((tupledArg) => {
            const xhr = new XMLHttpRequest();
            if (req.HttpMethod.tag === 1) {
                xhr.open("POST", req.Url);
            }
            else {
                xhr.open("GET", req.Url);
            }
            if (preparation != null) {
                preparation(xhr);
            }
            token.register(() => {
                xhr.abort();
                tupledArg[2](new Error(token));
            });
            const enumerator = getEnumerator(req.Headers);
            try {
                while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                    const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    xhr.setRequestHeader(forLoopVar[0], forLoopVar[1]);
                }
            }
            finally {
                disposeSafe(enumerator);
            }
            xhr.withCredentials = req.WithCredentials;
            xhr.onreadystatechange = (() => {
                const matchValue_1 = xhr.readyState | 0;
                let matchResult;
                if (matchValue_1 === 4) {
                    if (!isCancellationRequested(token)) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 1;
                    }
                }
                else {
                    matchResult = 1;
                }
                switch (matchResult) {
                    case 0: {
                        tupledArg[0](resultMapper(xhr));
                        break;
                    }
                    case 1: {
                        break;
                    }
                }
            });
            const matchValue_2 = req.RequestBody;
            switch (matchValue_2.tag) {
                case 1: {
                    xhr.send(some(matchValue_2.fields[0]));
                    break;
                }
                case 2: {
                    xhr.send(some(InternalUtilities_toUInt8Array(matchValue_2.fields[0])));
                    break;
                }
                default: {
                    xhr.send();
                }
            }
        });
        return singleton.ReturnFrom(request_1);
    }));
}

export const send = (req) => sendAndRead(void 0, (xhr) => (new HttpResponse(xhr.status, xhr.responseText)), req);

export const sendAndReadBinary = (req) => sendAndRead((xhr) => {
    xhr.responseType = "arraybuffer";
}, (xhr_1) => [new Uint8Array(xhr_1.response), xhr_1.status], req);

