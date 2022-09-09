import { empty } from "../fable-library.4.0.0-theta-001/List.js";
import { uncurry } from "../fable-library.4.0.0-theta-001/Util.js";
import { toFail, printf, toText } from "../fable-library.4.0.0-theta-001/String.js";
import { RemoteBuilderOptions } from "./Types.fs.js";
import { Reader_$ctor_Z3F6BC7B1, Reader__Read_24524716 } from "../Fable.Remoting.MsgPack.1.18.0/Read.fs.js";
import { fullName, makeRecord, getRecordElements, name as name_1, class_type } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { value } from "../fable-library.4.0.0-theta-001/Option.js";
import { createTypeInfo } from "../Fable.SimpleJson.3.23.0/TypeInfo.Converter.fs.js";
import { pick, map } from "../fable-library.4.0.0-theta-001/Array.js";
import { singleton, collect, delay, toArray } from "../fable-library.4.0.0-theta-001/Seq.js";
import { Proxy_proxyFetch } from "./Proxy.fs.js";

export function RemotingModule_createApi() {
    let clo;
    return new RemoteBuilderOptions(empty(), void 0, void 0, false, uncurry(2, (clo = toText(printf("/%s/%s")), (arg) => {
        const clo_1 = clo(arg);
        return clo_1;
    })), uncurry(2, void 0));
}

export function RemotingModule_withRouteBuilder(builder, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, builder, options.CustomResponseSerialization);
}

export function RemotingModule_withBaseUrl(url, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, url, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withCustomHeader(headers, options) {
    return new RemoteBuilderOptions(headers, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withAuthorizationHeader(token, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, token, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withCredentials(withCredentials, options) {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, withCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withBinarySerialization(options) {
    const serializer = (response, returnType) => Reader__Read_24524716(Reader_$ctor_Z3F6BC7B1(response), returnType);
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, serializer);
}

export class Remoting {
    constructor() {
    }
}

export function Remoting$reflection() {
    return class_type("Fable.Remoting.Client.Remoting", void 0, Remoting);
}

export function Remoting_$ctor() {
    return new Remoting();
}

export function Remoting_buildProxy_Z2B50D2A3(options, resolver) {
    const resolvedType = value(resolver).ResolveType();
    const schemaType = createTypeInfo(resolvedType);
    if (schemaType.tag === 39) {
        const patternInput = schemaType.fields[0]();
        const recordType = patternInput[1];
        const fieldTypes = map((prop) => [name_1(prop), prop[1]], getRecordElements(recordType));
        return makeRecord(recordType, toArray(delay(() => collect((field) => {
            let matchValue;
            const normalize = (n) => {
                const fieldType = pick((tupledArg) => {
                    if (tupledArg[0] === field.FieldName) {
                        return tupledArg[1];
                    }
                    else {
                        return void 0;
                    }
                }, fieldTypes);
                const fn = Proxy_proxyFetch(options, name_1(recordType), field, fieldType);
                if (n === 0) {
                    return fn(null)(null)(null)(null)(null)(null)(null)(null);
                }
                else if (n === 1) {
                    return (a) => fn(a)(null)(null)(null)(null)(null)(null)(null);
                }
                else if (n === 2) {
                    const proxyF = (a_1, b) => fn(a_1)(b)(null)(null)(null)(null)(null)(null);
                    return proxyF;
                }
                else if (n === 3) {
                    const proxyF_1 = (a_2, b_1, c) => fn(a_2)(b_1)(c)(null)(null)(null)(null)(null);
                    return proxyF_1;
                }
                else if (n === 4) {
                    const proxyF_2 = (a_3, b_2, c_1, d) => fn(a_3)(b_2)(c_1)(d)(null)(null)(null)(null);
                    return proxyF_2;
                }
                else if (n === 5) {
                    const proxyF_3 = (a_4, b_3, c_2, d_1, e) => fn(a_4)(b_3)(c_2)(d_1)(e)(null)(null)(null);
                    return proxyF_3;
                }
                else if (n === 6) {
                    const proxyF_4 = (a_5, b_4, c_3, d_2, e_1, f) => fn(a_5)(b_4)(c_3)(d_2)(e_1)(f)(null)(null);
                    return proxyF_4;
                }
                else if (n === 7) {
                    const proxyF_5 = (a_6, b_5, c_4, d_3, e_2, f_1, g) => fn(a_6)(b_5)(c_4)(d_3)(e_2)(f_1)(g)(null);
                    return proxyF_5;
                }
                else if (n === 8) {
                    const proxyF_6 = (a_7, b_6, c_5, d_4, e_3, f_2, g_1, h) => fn(a_7)(b_6)(c_5)(d_4)(e_3)(f_2)(g_1)(h);
                    return proxyF_6;
                }
                else {
                    return toFail(printf("Cannot generate proxy function for %s. Only up to 8 arguments are supported. Consider using a record type as input"))(field.FieldName);
                }
            };
            return singleton(normalize((matchValue = field.FieldType, (matchValue.tag === 25) ? 0 : ((matchValue.tag === 26) ? 0 : ((matchValue.tag === 37) ? (matchValue.fields[0]().length - 1) : 0)))));
        }, patternInput[0]))));
    }
    else {
        const arg_1 = fullName(resolvedType);
        return toFail(printf("Cannot build proxy. Exepected type %s to be a valid protocol definition which is a record of functions"))(arg_1);
    }
}

