import { List, empty } from "../fable-library.4.0.0-theta-001/List.js";
import { uncurry } from "../fable-library.4.0.0-theta-001/Util.js";
import { toFail, printf, toText } from "../fable-library.4.0.0-theta-001/String.js";
import { RemoteBuilderOptions } from "./Types.fs.js";
import { Reader_$ctor_Z3F6BC7B1, Reader__Read_24524716 } from "../Fable.Remoting.MsgPack.1.18.0/Read.fs.js";
import { int32, uint8 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { fullName, makeRecord, getRecordElements, name as name_1, class_type, TypeInfo } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { Option, value } from "../fable-library.4.0.0-theta-001/Option.js";
import { createTypeInfo } from "../Fable.SimpleJson.3.23.0/TypeInfo.Converter.fs.js";
import { pick, map } from "../fable-library.4.0.0-theta-001/Array.js";
import { singleton, collect, delay, toArray } from "../fable-library.4.0.0-theta-001/Seq.js";
import { Proxy_proxyFetch } from "./Proxy.fs.js";
import { TypeInfo as TypeInfo_1, RecordField } from "../Fable.SimpleJson.3.23.0/TypeInfo.fs.js";

export function RemotingModule_createApi(): RemoteBuilderOptions {
    let clo: (arg0: string, arg1: string) => string;
    return new RemoteBuilderOptions(empty(), void 0, void 0, false, uncurry(2, (clo = toText(printf("/%s/%s")), (arg: string): (arg0: string) => string => {
        const clo_1 = clo(arg);
        return clo_1;
    })), uncurry(2, void 0));
}

export function RemotingModule_withRouteBuilder(builder: (arg0: string, arg1: string) => string, options: RemoteBuilderOptions): RemoteBuilderOptions {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, builder, options.CustomResponseSerialization);
}

export function RemotingModule_withBaseUrl(url: string, options: RemoteBuilderOptions): RemoteBuilderOptions {
    return new RemoteBuilderOptions(options.CustomHeaders, url, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withCustomHeader(headers: List<[string, string]>, options: RemoteBuilderOptions): RemoteBuilderOptions {
    return new RemoteBuilderOptions(headers, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withAuthorizationHeader(token: string, options: RemoteBuilderOptions): RemoteBuilderOptions {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, token, options.WithCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withCredentials(withCredentials: boolean, options: RemoteBuilderOptions): RemoteBuilderOptions {
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, withCredentials, options.RouteBuilder, options.CustomResponseSerialization);
}

export function RemotingModule_withBinarySerialization(options: RemoteBuilderOptions): RemoteBuilderOptions {
    const serializer = (response: Array<uint8>, returnType: any): any => Reader__Read_24524716(Reader_$ctor_Z3F6BC7B1(response), returnType);
    return new RemoteBuilderOptions(options.CustomHeaders, options.BaseUrl, options.Authorization, options.WithCredentials, options.RouteBuilder, serializer);
}

export class Remoting {
    constructor() {
    }
}

export function Remoting$reflection(): TypeInfo {
    return class_type("Fable.Remoting.Client.Remoting", void 0, Remoting);
}

export function Remoting_$ctor(): Remoting {
    return new Remoting();
}

export function Remoting_buildProxy_Z2B50D2A3<t>(options: RemoteBuilderOptions, resolver: Option<any>): t {
    const resolvedType = value(resolver).ResolveType();
    const schemaType = createTypeInfo(resolvedType);
    if (schemaType.tag === 39) {
        const patternInput = schemaType.fields[0]();
        const recordType = patternInput[1];
        const fieldTypes = map((prop: any): [string, any] => [name_1(prop), prop[1]], getRecordElements(recordType));
        return makeRecord(recordType, toArray(delay((): IterableIterator<any> => collect((field: RecordField): IterableIterator<any> => {
            let matchValue: TypeInfo_1;
            const normalize = (n: int32): any => {
                const fieldType = pick((tupledArg: [string, any]): Option<any> => {
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
                    return (a: any): any => fn(a)(null)(null)(null)(null)(null)(null)(null);
                }
                else if (n === 2) {
                    const proxyF = (a_1: any, b: any): any => fn(a_1)(b)(null)(null)(null)(null)(null)(null);
                    return proxyF;
                }
                else if (n === 3) {
                    const proxyF_1 = (a_2: any, b_1: any, c: any): any => fn(a_2)(b_1)(c)(null)(null)(null)(null)(null);
                    return proxyF_1;
                }
                else if (n === 4) {
                    const proxyF_2 = (a_3: any, b_2: any, c_1: any, d: any): any => fn(a_3)(b_2)(c_1)(d)(null)(null)(null)(null);
                    return proxyF_2;
                }
                else if (n === 5) {
                    const proxyF_3 = (a_4: any, b_3: any, c_2: any, d_1: any, e: any): any => fn(a_4)(b_3)(c_2)(d_1)(e)(null)(null)(null);
                    return proxyF_3;
                }
                else if (n === 6) {
                    const proxyF_4 = (a_5: any, b_4: any, c_3: any, d_2: any, e_1: any, f: any): any => fn(a_5)(b_4)(c_3)(d_2)(e_1)(f)(null)(null);
                    return proxyF_4;
                }
                else if (n === 7) {
                    const proxyF_5 = (a_6: any, b_5: any, c_4: any, d_3: any, e_2: any, f_1: any, g: any): any => fn(a_6)(b_5)(c_4)(d_3)(e_2)(f_1)(g)(null);
                    return proxyF_5;
                }
                else if (n === 8) {
                    const proxyF_6 = (a_7: any, b_6: any, c_5: any, d_4: any, e_3: any, f_2: any, g_1: any, h: any): any => fn(a_7)(b_6)(c_5)(d_4)(e_3)(f_2)(g_1)(h);
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

