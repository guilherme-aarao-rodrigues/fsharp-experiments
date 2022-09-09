import { Exception, Record, Union } from "../fable-library.4.0.0-theta-001/Types.js";
import { obj_type, class_type, lambda_type, option_type, int32_type, record_type, bool_type, list_type, tuple_type, array_type, uint8_type, string_type, union_type } from "../fable-library.4.0.0-theta-001/Reflection.js";

export class HttpMethod extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["GET", "POST"];
    }
}

export function HttpMethod$reflection() {
    return union_type("Fable.Remoting.Client.HttpMethod", [], HttpMethod, () => [[], []]);
}

export class RequestBody extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Empty", "Json", "Binary"];
    }
}

export function RequestBody$reflection() {
    return union_type("Fable.Remoting.Client.RequestBody", [], RequestBody, () => [[], [["Item", string_type]], [["Item", array_type(uint8_type)]]]);
}

export class HttpRequest extends Record {
    constructor(HttpMethod, Url, Headers, RequestBody, WithCredentials) {
        super();
        this.HttpMethod = HttpMethod;
        this.Url = Url;
        this.Headers = Headers;
        this.RequestBody = RequestBody;
        this.WithCredentials = WithCredentials;
    }
}

export function HttpRequest$reflection() {
    return record_type("Fable.Remoting.Client.HttpRequest", [], HttpRequest, () => [["HttpMethod", HttpMethod$reflection()], ["Url", string_type], ["Headers", list_type(tuple_type(string_type, string_type))], ["RequestBody", RequestBody$reflection()], ["WithCredentials", bool_type]]);
}

export class HttpResponse extends Record {
    constructor(StatusCode, ResponseBody) {
        super();
        this.StatusCode = (StatusCode | 0);
        this.ResponseBody = ResponseBody;
    }
}

export function HttpResponse$reflection() {
    return record_type("Fable.Remoting.Client.HttpResponse", [], HttpResponse, () => [["StatusCode", int32_type], ["ResponseBody", string_type]]);
}

export class RemoteBuilderOptions extends Record {
    constructor(CustomHeaders, BaseUrl, Authorization, WithCredentials, RouteBuilder, CustomResponseSerialization) {
        super();
        this.CustomHeaders = CustomHeaders;
        this.BaseUrl = BaseUrl;
        this.Authorization = Authorization;
        this.WithCredentials = WithCredentials;
        this.RouteBuilder = RouteBuilder;
        this.CustomResponseSerialization = CustomResponseSerialization;
    }
}

export function RemoteBuilderOptions$reflection() {
    return record_type("Fable.Remoting.Client.RemoteBuilderOptions", [], RemoteBuilderOptions, () => [["CustomHeaders", list_type(tuple_type(string_type, string_type))], ["BaseUrl", option_type(string_type)], ["Authorization", option_type(string_type)], ["WithCredentials", bool_type], ["RouteBuilder", lambda_type(string_type, lambda_type(string_type, string_type))], ["CustomResponseSerialization", option_type(lambda_type(array_type(uint8_type), lambda_type(class_type("System.Type"), obj_type)))]]);
}

export class ProxyRequestException extends Exception {
    constructor(response, errorMsg, reponseText) {
        super(errorMsg);
        this.response = response;
        this.reponseText = reponseText;
    }
}

export function ProxyRequestException$reflection() {
    return class_type("Fable.Remoting.Client.ProxyRequestException", void 0, ProxyRequestException, class_type("System.Exception"));
}

export function ProxyRequestException_$ctor_76BC5104(response, errorMsg, reponseText) {
    return new ProxyRequestException(response, errorMsg, reponseText);
}

export function ProxyRequestException__get_Response(this$) {
    return this$.response;
}

export function ProxyRequestException__get_StatusCode(this$) {
    return this$.response.StatusCode;
}

export function ProxyRequestException__get_ResponseText(this$) {
    return this$.reponseText;
}

