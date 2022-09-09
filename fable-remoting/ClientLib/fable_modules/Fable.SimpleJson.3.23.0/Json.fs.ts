import { int32 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { Union } from "../fable-library.4.0.0-theta-001/Types.js";
import { union_type, class_type, list_type, bool_type, string_type, float64_type, TypeInfo } from "../fable-library.4.0.0-theta-001/Reflection.js";

export class Json extends Union {
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["JNumber", "JString", "JBool", "JNull", "JArray", "JObject"];
    }
}

export function Json$reflection(): TypeInfo {
    return union_type("Fable.SimpleJson.Json", [], Json, () => [[["Item", float64_type]], [["Item", string_type]], [["Item", bool_type]], [], [["Item", list_type(Json$reflection())]], [["Item", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [string_type, Json$reflection()])]]]);
}

