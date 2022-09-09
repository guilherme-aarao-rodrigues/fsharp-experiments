import { uint8, int32 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { Exception, Record, Union } from "../fable-library.4.0.0-theta-001/Types.js";
import { obj_type, class_type, lambda_type, option_type, int32_type, record_type, bool_type, list_type, tuple_type, array_type, uint8_type, string_type, union_type, TypeInfo } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { List } from "../fable-library.4.0.0-theta-001/List.js";
import { Option } from "../fable-library.4.0.0-theta-001/Option.js";

export class HttpMethod extends Union {
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["GET", "POST"];
    }
}

export function HttpMethod$reflection(): TypeInfo {
    return union_type("Fable.Remoting.Client.HttpMethod", [], HttpMethod, () => [[], []]);
}

export class RequestBody extends Union {
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Empty", "Json", "Binary"];
    }
}

export function RequestBody$reflection(): TypeInfo {
    return union_type("Fable.Remoting.Client.RequestBody", [], RequestBody, () => [[], [["Item", string_type]], [["Item", array_type(uint8_type)]]]);
}

export class HttpRequest extends Record {
    HttpMethod: HttpMethod;
    Url: string;
    Headers: List<[string, string]>;
    RequestBody: RequestBody;
    WithCredentials: boolean;
    constructor(HttpMethod: HttpMethod, Url: string, Headers: List<[string, string]>, RequestBody: RequestBody, WithCredentials: boolean) {
        super();
        this.HttpMethod = HttpMethod;
        this.Url = Url;
        this.Headers = Headers;
        this.RequestBody = RequestBody;
        this.WithCredentials = WithCredentials;
    }
}

export function HttpRequest$reflection(): TypeInfo {
    return record_type("Fable.Remoting.Client.HttpRequest", [], HttpRequest, () => [["HttpMethod", HttpMethod$reflection()], ["Url", string_type], ["Headers", list_type(tuple_type(string_type, string_type))], ["RequestBody", RequestBody$reflection()], ["WithCredentials", bool_type]]);
}

export class HttpResponse extends Record {
    StatusCode: int32;
    ResponseBody: string;
    constructor(StatusCode: int32, ResponseBody: string) {
        super();
        this.StatusCode = (StatusCode | 0);
        this.ResponseBody = ResponseBody;
    }
}

export function HttpResponse$reflection(): TypeInfo {
    return record_type("Fable.Remoting.Client.HttpResponse", [], HttpResponse, () => [["StatusCode", int32_type], ["ResponseBody", string_type]]);
}

export class RemoteBuilderOptions extends Record {
    CustomHeaders: List<[string, string]>;
    BaseUrl: Option<string>;
    Authorization: Option<string>;
    WithCredentials: boolean;
    RouteBuilder: (arg0: string, arg1: string) => string;
    CustomResponseSerialization: Option<(arg0: Array<uint8>, arg1: any) => any>;
    constructor(CustomHeaders: List<[string, string]>, BaseUrl: Option<string>, Authorization: Option<string>, WithCredentials: boolean, RouteBuilder: (arg0: string, arg1: string) => string, CustomResponseSerialization: Option<(arg0: Array<uint8>, arg1: any) => any>) {
        super();
        this.CustomHeaders = CustomHeaders;
        this.BaseUrl = BaseUrl;
        this.Authorization = Authorization;
        this.WithCredentials = WithCredentials;
        this.RouteBuilder = RouteBuilder;
        this.CustomResponseSerialization = CustomResponseSerialization;
    }
}

export function RemoteBuilderOptions$reflection(): TypeInfo {
    return record_type("Fable.Remoting.Client.RemoteBuilderOptions", [], RemoteBuilderOptions, () => [["CustomHeaders", list_type(tuple_type(string_type, string_type))], ["BaseUrl", option_type(string_type)], ["Authorization", option_type(string_type)], ["WithCredentials", bool_type], ["RouteBuilder", lambda_type(string_type, lambda_type(string_type, string_type))], ["CustomResponseSerialization", option_type(lambda_type(array_type(uint8_type), lambda_type(class_type("System.Type"), obj_type)))]]);
}

export class ProxyRequestException extends Exception {
    response: HttpResponse;
    reponseText: string;
    constructor(response: HttpResponse, errorMsg: string, reponseText: string) {
        super(errorMsg);
        this.response = response;
        this.reponseText = reponseText;
    }
}

export function ProxyRequestException$reflection(): TypeInfo {
    return class_type("Fable.Remoting.Client.ProxyRequestException", void 0, ProxyRequestException, class_type("System.Exception"));
}

export function ProxyRequestException_$ctor_76BC5104(response: HttpResponse, errorMsg: string, reponseText: string): ProxyRequestException {
    return new ProxyRequestException(response, errorMsg, reponseText);
}

export function ProxyRequestException__get_Response(this$: ProxyRequestException): HttpResponse {
    return this$.response;
}

export function ProxyRequestException__get_StatusCode(this$: ProxyRequestException): int32 {
    return this$.response.StatusCode;
}

export function ProxyRequestException__get_ResponseText(this$: ProxyRequestException): string {
    return this$.reponseText;
}

