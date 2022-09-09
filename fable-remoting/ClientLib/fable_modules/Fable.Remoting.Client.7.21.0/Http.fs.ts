import { HttpResponse, HttpRequest, RequestBody, HttpMethod as HttpMethod_1 } from "./Types.fs.js";
import { List, empty } from "../fable-library.4.0.0-theta-001/List.js";
import { singleton } from "../fable-library.4.0.0-theta-001/AsyncBuilder.js";
import { isCancellationRequested, fromContinuations, cancellationToken } from "../fable-library.4.0.0-theta-001/Async.js";
import { Option, some, value as value_2 } from "../fable-library.4.0.0-theta-001/Option.js";
import { disposeSafe, getEnumerator } from "../fable-library.4.0.0-theta-001/Util.js";
import { InternalUtilities_toUInt8Array } from "./Extensions.fs.js";
import { int32, uint8 } from "../fable-library.4.0.0-theta-001/Int32.js";

const defaultRequestConfig = new HttpRequest(new HttpMethod_1(0), "/", empty(), new RequestBody(0), false);

export function get$(url: string): HttpRequest {
    return new HttpRequest(new HttpMethod_1(0), url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

export function post(url: string): HttpRequest {
    return new HttpRequest(new HttpMethod_1(1), url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

export function request(method: HttpMethod_1, url: string): HttpRequest {
    return new HttpRequest(method, url, defaultRequestConfig.Headers, defaultRequestConfig.RequestBody, defaultRequestConfig.WithCredentials);
}

export function withHeaders(headers: List<[string, string]>, req: HttpRequest): HttpRequest {
    return new HttpRequest(req.HttpMethod, req.Url, headers, req.RequestBody, req.WithCredentials);
}

export function withCredentials(withCredentials_1: boolean, req: HttpRequest): HttpRequest {
    return new HttpRequest(req.HttpMethod, req.Url, req.Headers, req.RequestBody, withCredentials_1);
}

export function withBody(body: RequestBody, req: HttpRequest): HttpRequest {
    return new HttpRequest(req.HttpMethod, req.Url, req.Headers, body, req.WithCredentials);
}

function sendAndRead<$a>(preparation: Option<(arg0: any) => void>, resultMapper: (arg0: any) => $a, req: HttpRequest): any {
    return singleton.Delay((): any => singleton.Bind(cancellationToken(), (_arg: any): any => {
        const token = _arg;
        const request_1 = fromContinuations((tupledArg: [(arg0: $a) => void, (arg0: Error) => void, (arg0: any) => void]): void => {
            const xhr = new XMLHttpRequest();
            if (req.HttpMethod.tag === 1) {
                xhr.open("POST", req.Url);
            }
            else {
                xhr.open("GET", req.Url);
            }
            if (preparation != null) {
                value_2(preparation)(xhr);
            }
            token.register((): void => {
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
            xhr.onreadystatechange = ((): void => {
                const matchValue_1 = xhr.readyState | 0;
                if (matchValue_1 === 4) {
                    if (!isCancellationRequested(token)) {
                        tupledArg[0](resultMapper(xhr));
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

export const send = (req: HttpRequest): any => sendAndRead(void 0, (xhr: any): HttpResponse => (new HttpResponse(xhr.status, xhr.responseText)), req);

export const sendAndReadBinary = (req: HttpRequest): any => sendAndRead((xhr: any): void => {
    xhr.responseType = "arraybuffer";
}, (xhr_1: any): [Array<uint8>, int32] => [new Uint8Array(xhr_1.response), xhr_1.status], req);

