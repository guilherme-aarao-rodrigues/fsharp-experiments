import { Parsimmon_parse } from "../Fable.Parsimmon.4.0.0/Parsimmon.fs.js";
import { jsonParser } from "./Parser.fs.js";
import { some, value as value_5, Option } from "../fable-library.4.0.0-theta-001/Option.js";
import { Json } from "./Json.fs.js";
import { join, toText, printf, toFail } from "../fable-library.4.0.0-theta-001/String.js";
import { head, tail, isEmpty, empty, List, singleton, concat, ofArray, map as map_1 } from "../fable-library.4.0.0-theta-001/List.js";
import { tryFind, ofList, toList } from "../fable-library.4.0.0-theta-001/Map.js";
import { partialApply, comparePrimitives, isIterable, disposeSafe, getEnumerator } from "../fable-library.4.0.0-theta-001/Util.js";
import { toString } from "../fable-library.4.0.0-theta-001/Decimal.js";
import { toDecimal } from "../fable-library.4.0.0-theta-001/BigInt.js";
import { toString as toString_1 } from "../fable-library.4.0.0-theta-001/Date.js";
import { $007CNativeObject$007C_$007C, $007CNativeArray$007C_$007C, $007CNull$007C_$007C, $007CNativeBool$007C_$007C, $007CNativeNumber$007C_$007C, $007CNativeString$007C_$007C } from "./TypeCheck.fs.js";
import { map as map_2 } from "../fable-library.4.0.0-theta-001/Array.js";
import { map as map_3, delay, toList as toList_1 } from "../fable-library.4.0.0-theta-001/Seq.js";
import { int32 } from "../fable-library.4.0.0-theta-001/Int32.js";

export function InteropUtil_isDateOffset(x: any): boolean {
    if (x instanceof Date) {
        return "offset" in x;
    }
    else {
        return false;
    }
}

export function InteropUtil_isObjectLiteral(x: any): boolean {
    return (typeof x) === "object";
}

export function InteropUtil_isBigInt(x: any): boolean {
    if (((((!(x == null)) && InteropUtil_isObjectLiteral(x)) && ("signInt" in x)) && ("v" in x)) && ("digits" in (x["v"]))) {
        return "bound" in (x["v"]);
    }
    else {
        return false;
    }
}

export function SimpleJson_tryParse(input: string): Option<Json> {
    return Parsimmon_parse(input, jsonParser);
}

export function SimpleJson_parse(input: string): Json {
    const matchValue = SimpleJson_tryParse(input);
    if (matchValue == null) {
        return toFail(printf("Could not parse the JSON input: %s"))(input);
    }
    else {
        return value_5(matchValue);
    }
}

export function SimpleJson_toString(_arg: Json): string {
    if (_arg.tag === 2) {
        if (_arg.fields[0]) {
            return "true";
        }
        else {
            return "false";
        }
    }
    else if (_arg.tag === 0) {
        return _arg.fields[0].toString();
    }
    else if (_arg.tag === 1) {
        return toText(printf("\"%s\""))(_arg.fields[0]);
    }
    else if (_arg.tag === 4) {
        const arg_1 = join(",", map_1(SimpleJson_toString, _arg.fields[0]));
        return toText(printf("[%s]"))(arg_1);
    }
    else if (_arg.tag === 5) {
        const arg_4 = join(",", map_1((tupledArg: [string, Json]): string => {
            const arg_3 = SimpleJson_toString(tupledArg[1]);
            return toText(printf("\"%s\":%s"))(tupledArg[0])(arg_3);
        }, toList(_arg.fields[0])));
        return toText(printf("{%s}"))(arg_4);
    }
    else {
        return "null";
    }
}

export function SimpleJson_toPlainObject(input: Json): any {
    switch (input.tag) {
        case 2: {
            return input.fields[0];
        }
        case 0: {
            return input.fields[0];
        }
        case 1: {
            return input.fields[0];
        }
        case 4: {
            const array = [];
            const enumerator = getEnumerator(input.fields[0]);
            try {
                while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                    const value_3 = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    void (array.push(SimpleJson_toPlainObject(value_3)));
                }
            }
            finally {
                disposeSafe(enumerator);
            }
            return array;
        }
        case 5: {
            const jsObject = ({});
            const enumerator_1 = getEnumerator(toList(input.fields[0]));
            try {
                while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                    const forLoopVar = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    jsObject[forLoopVar[0]] = SimpleJson_toPlainObject(forLoopVar[1]);
                }
            }
            finally {
                disposeSafe(enumerator_1);
            }
            return jsObject;
        }
        default: {
            return null;
        }
    }
}

export function SimpleJson_stringify<a>(value: a): string {
    if (value == null) {
        return JSON.stringify(null);
    }
    else {
        return JSON.stringify(value, (key: string, jsonValue: any): any => {
            let copyOfStruct: Date;
            if (InteropUtil_isBigInt(jsonValue)) {
                return toString(toDecimal(jsonValue));
            }
            else if (jsonValue instanceof Date) {
                return toString_1(jsonValue, "o");
            }
            else if ((typeof jsonValue) === "string") {
                return jsonValue;
            }
            else if (isIterable(jsonValue)) {
                return Array.isArray(jsonValue) ? jsonValue : (Array.from(jsonValue));
            }
            else if (InteropUtil_isBigInt(jsonValue)) {
                return toString(toDecimal(jsonValue));
            }
            else if (InteropUtil_isDateOffset(jsonValue)) {
                return (copyOfStruct = jsonValue, toString_1(copyOfStruct, "O"));
            }
            else {
                return jsonValue;
            }
        }, some(0));
    }
}

export function SimpleJson_parseNative$0027(x: any): Json {
    const activePatternResult = $007CNativeString$007C_$007C(x);
    if (activePatternResult != null) {
        const str = value_5(activePatternResult);
        return new Json(1, str);
    }
    else {
        const activePatternResult_1 = $007CNativeNumber$007C_$007C(x);
        if (activePatternResult_1 != null) {
            const number = value_5(activePatternResult_1);
            return new Json(0, number);
        }
        else {
            const activePatternResult_2 = $007CNativeBool$007C_$007C(x);
            if (activePatternResult_2 != null) {
                const value = value_5(activePatternResult_2);
                return new Json(2, value);
            }
            else if ($007CNull$007C_$007C(x) != null) {
                return new Json(3);
            }
            else {
                const activePatternResult_4 = $007CNativeArray$007C_$007C(x);
                if (activePatternResult_4 != null) {
                    const arr = value_5(activePatternResult_4);
                    return new Json(4, ofArray(map_2(SimpleJson_parseNative$0027, arr)));
                }
                else {
                    const activePatternResult_5 = $007CNativeObject$007C_$007C(x);
                    if (activePatternResult_5 != null) {
                        const object = value_5(activePatternResult_5);
                        return new Json(5, ofList(toList_1(delay((): IterableIterator<[string, Json]> => map_3((key: string): [string, Json] => [key, SimpleJson_parseNative$0027(object[key])], Object.keys(object)))), {
                            Compare: comparePrimitives,
                        }));
                    }
                    else {
                        return new Json(3);
                    }
                }
            }
        }
    }
}

export function SimpleJson_parseNative(input: string): Json {
    return SimpleJson_parseNative$0027(JSON.parse(input));
}

export function SimpleJson_tryParseNative(input: string): Option<Json> {
    try {
        return SimpleJson_parseNative(input);
    }
    catch (ex) {
        return void 0;
    }
}

export function SimpleJson_fromObjectLiteral<a>(x: a): Option<Json> {
    try {
        return SimpleJson_parseNative$0027(x);
    }
    catch (matchValue) {
        return void 0;
    }
}

export function SimpleJson_mapKeys(f: (arg0: string) => string, _arg: Json): Json {
    switch (_arg.tag) {
        case 5: {
            return new Json(5, ofList(map_1((tupledArg: [string, Json]): [string, Json] => [f(tupledArg[0]), SimpleJson_mapKeys(f, tupledArg[1])], toList(_arg.fields[0])), {
                Compare: comparePrimitives,
            }));
        }
        case 4: {
            return new Json(4, map_1((_arg_1: Json): Json => SimpleJson_mapKeys(f, _arg_1), _arg.fields[0]));
        }
        default: {
            return _arg;
        }
    }
}

export function SimpleJson_mapbyKey(f: (arg0: string, arg1: Json) => Json, _arg: Json): Json {
    switch (_arg.tag) {
        case 5: {
            return new Json(5, ofList(map_1((tupledArg: [string, Json]): [string, Json] => {
                const key = tupledArg[0];
                return [key, f(key, tupledArg[1])];
            }, toList(_arg.fields[0])), {
                Compare: comparePrimitives,
            }));
        }
        case 4: {
            return new Json(4, map_1((_arg_1: Json): Json => SimpleJson_mapbyKey(f, _arg_1), _arg.fields[0]));
        }
        default: {
            return _arg;
        }
    }
}

export function SimpleJson_mapKeysByPath(f: (arg0: List<string>) => Option<string>, json: Json): Json {
    const mapKey = (xs: List<string>, _arg: Json): Json => {
        switch (_arg.tag) {
            case 5: {
                return new Json(5, ofList(map_1((tupledArg: [string, Json]): [string, Json] => {
                    const key = tupledArg[0];
                    const value = tupledArg[1];
                    const keyPath = concat([xs, singleton(key)]);
                    const matchValue = f(keyPath);
                    if (matchValue == null) {
                        return [key, mapKey(keyPath, value)];
                    }
                    else {
                        return [value_5(matchValue), mapKey(keyPath, value)];
                    }
                }, toList(_arg.fields[0])), {
                    Compare: comparePrimitives,
                }));
            }
            case 4: {
                return new Json(4, map_1(partialApply(1, mapKey, [xs]), _arg.fields[0]));
            }
            default: {
                return _arg;
            }
        }
    };
    return mapKey(empty(), json);
}

export function SimpleJson_readPath(keys_mut: List<string>, input_mut: Json): Option<Json> {
    SimpleJson_readPath:
    while (true) {
        const keys: List<string> = keys_mut, input: Json = input_mut;
        if (!isEmpty(keys)) {
            if (isEmpty(tail(keys))) {
                if (input.tag === 5) {
                    return tryFind(head(keys), input.fields[0]);
                }
                else {
                    return void 0;
                }
            }
            else if (input.tag === 5) {
                const matchValue_1 = tryFind(head(keys), input.fields[0]);
                if (matchValue_1 != null) {
                    if (value_5(matchValue_1).tag === 5) {
                        const nextDict = value_5(matchValue_1).fields[0];
                        keys_mut = tail(keys);
                        input_mut = (new Json(5, nextDict));
                        continue SimpleJson_readPath;
                    }
                    else {
                        return void 0;
                    }
                }
                else {
                    return void 0;
                }
            }
            else {
                return void 0;
            }
        }
        else {
            return void 0;
        }
        break;
    }
}

