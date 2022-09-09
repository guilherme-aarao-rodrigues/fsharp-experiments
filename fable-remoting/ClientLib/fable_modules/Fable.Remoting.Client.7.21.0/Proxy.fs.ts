import { fromContinuations } from "../fable-library.4.0.0-theta-001/Async.js";
import { toFail, printf, toText, trimEnd } from "../fable-library.4.0.0-theta-001/String.js";
import { Option, value as value_1 } from "../fable-library.4.0.0-theta-001/Option.js";
import { RecordField, TypeInfo } from "../Fable.SimpleJson.3.23.0/TypeInfo.fs.js";
import { getGenerics, isGenericType, getFunctionElements, isFunction } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { take, equalsWith, last, head } from "../fable-library.4.0.0-theta-001/Array.js";
import { curry, equals } from "../fable-library.4.0.0-theta-001/Util.js";
import { empty, singleton, append, delay, toList } from "../fable-library.4.0.0-theta-001/Seq.js";
import { int32, uint8 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { singleton as singleton_1 } from "../fable-library.4.0.0-theta-001/AsyncBuilder.js";
import { send, get$, post, withBody, withHeaders, sendAndReadBinary } from "./Http.fs.js";
import { RemoteBuilderOptions, RequestBody, ProxyRequestException_$ctor_76BC5104, HttpResponse } from "./Types.fs.js";
import { SimpleJson_parseNative } from "../Fable.SimpleJson.3.23.0/SimpleJson.fs.js";
import { Convert_serialize, Convert_arrayLike, Convert_fromJsonAs } from "../Fable.SimpleJson.3.23.0/Json.Converter.fs.js";

export function Blob_readBlobAsText(blob: any): any {
    return fromContinuations((tupledArg: [(arg0: string) => void, (arg0: Error) => void, (arg0: any) => void]): void => {
        const reader = new FileReader();
        reader.onload = ((_arg_2: any): void => {
            if (reader.readyState === 2) {
                tupledArg[0](reader.result);
            }
        });
        reader.readAsText(blob);
    });
}

export function Proxy_combineRouteWithBaseUrl(route: string, baseUrl: Option<string>): string {
    if (baseUrl != null) {
        const arg = trimEnd(value_1(baseUrl), "/");
        return toText(printf("%s%s"))(arg)(route);
    }
    else {
        return route;
    }
}

export function Proxy_isByteArray(_arg: TypeInfo): boolean {
    if (_arg.tag === 30) {
        if (_arg.fields[0]().tag === 13) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export function Proxy_isAsyncOfByteArray(_arg: TypeInfo): boolean {
    if (_arg.tag === 25) {
        const matchValue = _arg.fields[0]();
        if (matchValue.tag === 30) {
            if (matchValue.fields[0]().tag === 13) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export function Proxy_getReturnType(typ_mut: any): any {
    Proxy_getReturnType:
    while (true) {
        const typ: any = typ_mut;
        if (isFunction(typ)) {
            typ_mut = getFunctionElements(typ)[1];
            continue Proxy_getReturnType;
        }
        else if (isGenericType(typ)) {
            return head(getGenerics(typ));
        }
        else {
            return typ;
        }
        break;
    }
}

export function Proxy_proxyFetch<$a, $b, $c, $d, $e, $f, $g, $h>(options: RemoteBuilderOptions, typeName: string, func: RecordField, fieldType: any): (arg0: $a, arg1: $b, arg2: $c, arg3: $d, arg4: $e, arg5: $f, arg6: $g, arg7: $h) => any {
    let funcArgs;
    const matchValue = func.FieldType;
    switch (matchValue.tag) {
        case 25: {
            funcArgs = [func.FieldType];
            break;
        }
        case 26: {
            funcArgs = [func.FieldType];
            break;
        }
        case 37: {
            funcArgs = matchValue.fields[0]();
            break;
        }
        default: {
            funcArgs = toFail(printf("Field %s does not have a valid definiton"))(func.FieldName);
        }
    }
    const argumentCount = (funcArgs.length - 1) | 0;
    const returnTypeAsync = last(funcArgs);
    let binaryInput;
    const matchValue_1 = func.FieldType;
    if (matchValue_1.tag === 37) {
        const matchValue_2 = matchValue_1.fields[0]();
        if ((!equalsWith(equals, matchValue_2, null)) && (matchValue_2.length === 2)) {
            const output = matchValue_2[1];
            binaryInput = Proxy_isByteArray(matchValue_2[0]);
        }
        else {
            binaryInput = false;
        }
    }
    else {
        binaryInput = false;
    }
    const url = Proxy_combineRouteWithBaseUrl(options.RouteBuilder(typeName, func.FieldName), options.BaseUrl);
    const funcNeedParameters = ((!equalsWith(equals, funcArgs, null)) && (funcArgs.length === 1)) ? ((funcArgs[0].tag === 25) ? false : (!(funcArgs[0].tag === 26))) : (((!equalsWith(equals, funcArgs, null)) && (funcArgs.length === 2)) ? ((funcArgs[0].tag === 0) ? (!(funcArgs[1].tag === 25)) : true) : true);
    const contentType = binaryInput ? "application/octet-stream" : "application/json; charset=utf-8";
    const inputArgumentTypes = take(argumentCount, funcArgs);
    const headers = toList(delay((): IterableIterator<[string, string]> => append(singleton(["Content-Type", contentType]), delay((): IterableIterator<[string, string]> => append(singleton(["x-remoting-proxy", "true"]), delay((): IterableIterator<[string, string]> => append(options.CustomHeaders, delay((): IterableIterator<[string, string]> => {
        const matchValue_3 = options.Authorization;
        if (matchValue_3 == null) {
            return empty();
        }
        else {
            return singleton(["Authorization", value_1(matchValue_3)]);
        }
    }))))))));
    let executeRequest;
    if ((curry(2, options.CustomResponseSerialization) != null) ? true : Proxy_isAsyncOfByteArray(returnTypeAsync)) {
        let onOk;
        const matchValue_4 = options.CustomResponseSerialization;
        if (curry(2, matchValue_4) != null) {
            const serializer = value_1(curry(2, matchValue_4));
            const returnType = Proxy_getReturnType(fieldType);
            onOk = ((response: Array<uint8>): any => serializer(response)(returnType));
        }
        else {
            onOk = ((value: Array<uint8>): any => value);
        }
        executeRequest = ((requestBody: RequestBody): any => singleton_1.Delay((): any => singleton_1.Bind(funcNeedParameters ? sendAndReadBinary(withHeaders(headers, withBody(requestBody, post(url)))) : sendAndReadBinary(withHeaders(headers, get$(url))), (_arg: [Array<uint8>, int32]): any => {
            const statusCode = _arg[1] | 0;
            const response_1 = _arg[0];
            if (statusCode === 200) {
                return singleton_1.Return(onOk(response_1));
            }
            else {
                const n = statusCode | 0;
                const responseAsBlob = new Blob([response_1.buffer], { type: 'text/plain' });
                return singleton_1.Bind(Blob_readBlobAsText(responseAsBlob), (_arg_1: string): any => {
                    const response_2 = new HttpResponse(statusCode, _arg_1);
                    const errorMsg = (n === 500) ? toText(printf("Internal server error (500) while making request to %s"))(url) : toText(printf("Http error (%d) while making request to %s"))(n)(url);
                    return singleton_1.ReturnFrom((() => {
                        throw ProxyRequestException_$ctor_76BC5104(response_2, errorMsg, response_2.ResponseBody);
                    })());
                });
            }
        })));
    }
    else {
        const returnType_1 = (returnTypeAsync.tag === 25) ? returnTypeAsync.fields[0]() : ((returnTypeAsync.tag === 26) ? returnTypeAsync.fields[0]() : toFail(printf("Expected field %s to have a return type of Async<\'t>"))(func.FieldName));
        executeRequest = ((requestBody_1: RequestBody): any => singleton_1.Delay((): any => singleton_1.Bind(funcNeedParameters ? send(withHeaders(headers, withBody(requestBody_1, post(url)))) : send(withHeaders(headers, get$(url))), (_arg_2: HttpResponse): any => {
            const response_3 = _arg_2;
            const matchValue_5 = response_3.StatusCode | 0;
            if (matchValue_5 === 200) {
                const parsedJson = SimpleJson_parseNative(response_3.ResponseBody);
                return singleton_1.Return(Convert_fromJsonAs(parsedJson, returnType_1));
            }
            else {
                return (matchValue_5 === 500) ? singleton_1.ReturnFrom((() => {
                    throw ProxyRequestException_$ctor_76BC5104(response_3, toText(printf("Internal server error (500) while making request to %s"))(url), response_3.ResponseBody);
                })()) : singleton_1.ReturnFrom((() => {
                    throw ProxyRequestException_$ctor_76BC5104(response_3, toText(printf("Http error (%d) from server occured while making request to %s"))(matchValue_5)(url), response_3.ResponseBody);
                })());
            }
        })));
    }
    return (arg0: $a): (arg0: $b, arg1: $c, arg2: $d, arg3: $e, arg4: $f, arg5: $g, arg6: $h) => any => ((arg1: $b): (arg0: $c, arg1: $d, arg2: $e, arg3: $f, arg4: $g, arg5: $h) => any => ((arg2: $c): (arg0: $d, arg1: $e, arg2: $f, arg3: $g, arg4: $h) => any => ((arg3: $d): (arg0: $e, arg1: $f, arg2: $g, arg3: $h) => any => ((arg4: $e): (arg0: $f, arg1: $g, arg2: $h) => any => ((arg5: $f): (arg0: $g, arg1: $h) => any => ((arg6: $g): (arg0: $h) => any => ((arg7: $h): any => {
        let matchValue_6: int32;
        const inputArguments = funcNeedParameters ? take(argumentCount, [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7]) : [];
        return executeRequest(binaryInput ? (new RequestBody(2, arg0)) : ((matchValue_6 = (inputArgumentTypes.length | 0), (matchValue_6 === 1) ? ((!Convert_arrayLike(inputArgumentTypes[0])) ? (new RequestBody(1, Convert_serialize(inputArguments[0], new TypeInfo(32, (): Array<TypeInfo> => inputArgumentTypes)))) : (new RequestBody(1, Convert_serialize([inputArguments[0]], new TypeInfo(30, (): TypeInfo => inputArgumentTypes[0]))))) : (new RequestBody(1, Convert_serialize(inputArguments, new TypeInfo(32, (): Array<TypeInfo> => inputArgumentTypes)))))));
    })))))));
}

