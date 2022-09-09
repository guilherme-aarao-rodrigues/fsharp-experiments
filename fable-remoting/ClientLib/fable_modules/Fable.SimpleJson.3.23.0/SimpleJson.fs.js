import { Parsimmon_parse } from "../Fable.Parsimmon.4.0.0/Parsimmon.fs.js";
import { jsonParser } from "./Parser.fs.js";
import { join, toText, printf, toFail } from "../fable-library.4.0.0-theta-001/String.js";
import { head, tail, isEmpty, empty, singleton, concat, ofArray, map as map_1 } from "../fable-library.4.0.0-theta-001/List.js";
import { tryFind, ofList, toList } from "../fable-library.4.0.0-theta-001/Map.js";
import { partialApply, comparePrimitives, isIterable, disposeSafe, getEnumerator } from "../fable-library.4.0.0-theta-001/Util.js";
import { toString } from "../fable-library.4.0.0-theta-001/Decimal.js";
import { toDecimal } from "../fable-library.4.0.0-theta-001/BigInt.js";
import { toString as toString_1 } from "../fable-library.4.0.0-theta-001/Date.js";
import { value as value_5, some } from "../fable-library.4.0.0-theta-001/Option.js";
import { $007CNativeObject$007C_$007C, $007CNativeArray$007C_$007C, $007CNull$007C_$007C, $007CNativeBool$007C_$007C, $007CNativeNumber$007C_$007C, $007CNativeString$007C_$007C } from "./TypeCheck.fs.js";
import { Json } from "./Json.fs.js";
import { map as map_2 } from "../fable-library.4.0.0-theta-001/Array.js";
import { map as map_3, delay, toList as toList_1 } from "../fable-library.4.0.0-theta-001/Seq.js";

export function InteropUtil_isDateOffset(x) {
    if (x instanceof Date) {
        return "offset" in x;
    }
    else {
        return false;
    }
}

export function InteropUtil_isObjectLiteral(x) {
    return (typeof x) === "object";
}

export function InteropUtil_isBigInt(x) {
    if (((((!(x == null)) && InteropUtil_isObjectLiteral(x)) && ("signInt" in x)) && ("v" in x)) && ("digits" in (x["v"]))) {
        return "bound" in (x["v"]);
    }
    else {
        return false;
    }
}

export function SimpleJson_tryParse(input) {
    return Parsimmon_parse(input, jsonParser);
}

export function SimpleJson_parse(input) {
    const matchValue = SimpleJson_tryParse(input);
    if (matchValue == null) {
        return toFail(printf("Could not parse the JSON input: %s"))(input);
    }
    else {
        return matchValue;
    }
}

export function SimpleJson_toString(_arg) {
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
        const arg_4 = join(",", map_1((tupledArg) => {
            const arg_3 = SimpleJson_toString(tupledArg[1]);
            return toText(printf("\"%s\":%s"))(tupledArg[0])(arg_3);
        }, toList(_arg.fields[0])));
        return toText(printf("{%s}"))(arg_4);
    }
    else {
        return "null";
    }
}

export function SimpleJson_toPlainObject(input) {
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

export function SimpleJson_stringify(value) {
    if (value == null) {
        return JSON.stringify(null);
    }
    else {
        return JSON.stringify(value, (key, jsonValue) => {
            let copyOfStruct;
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

export function SimpleJson_parseNative$0027(x) {
    const activePatternResult = $007CNativeString$007C_$007C(x);
    if (activePatternResult != null) {
        const str = activePatternResult;
        return new Json(1, str);
    }
    else {
        const activePatternResult_1 = $007CNativeNumber$007C_$007C(x);
        if (activePatternResult_1 != null) {
            const number = activePatternResult_1;
            return new Json(0, number);
        }
        else {
            const activePatternResult_2 = $007CNativeBool$007C_$007C(x);
            if (activePatternResult_2 != null) {
                const value = activePatternResult_2;
                return new Json(2, value);
            }
            else if ($007CNull$007C_$007C(x) != null) {
                return new Json(3);
            }
            else {
                const activePatternResult_4 = $007CNativeArray$007C_$007C(x);
                if (activePatternResult_4 != null) {
                    const arr = activePatternResult_4;
                    return new Json(4, ofArray(map_2(SimpleJson_parseNative$0027, arr)));
                }
                else {
                    const activePatternResult_5 = $007CNativeObject$007C_$007C(x);
                    if (activePatternResult_5 != null) {
                        const object = value_5(activePatternResult_5);
                        return new Json(5, ofList(toList_1(delay(() => map_3((key) => [key, SimpleJson_parseNative$0027(object[key])], Object.keys(object)))), {
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

export function SimpleJson_parseNative(input) {
    return SimpleJson_parseNative$0027(JSON.parse(input));
}

export function SimpleJson_tryParseNative(input) {
    try {
        return SimpleJson_parseNative(input);
    }
    catch (ex) {
        return void 0;
    }
}

export function SimpleJson_fromObjectLiteral(x) {
    try {
        return SimpleJson_parseNative$0027(x);
    }
    catch (matchValue) {
        return void 0;
    }
}

export function SimpleJson_mapKeys(f, _arg) {
    switch (_arg.tag) {
        case 5: {
            return new Json(5, ofList(map_1((tupledArg) => [f(tupledArg[0]), SimpleJson_mapKeys(f, tupledArg[1])], toList(_arg.fields[0])), {
                Compare: comparePrimitives,
            }));
        }
        case 4: {
            return new Json(4, map_1((_arg_1) => SimpleJson_mapKeys(f, _arg_1), _arg.fields[0]));
        }
        default: {
            return _arg;
        }
    }
}

export function SimpleJson_mapbyKey(f, _arg) {
    switch (_arg.tag) {
        case 5: {
            return new Json(5, ofList(map_1((tupledArg) => {
                const key = tupledArg[0];
                return [key, f(key, tupledArg[1])];
            }, toList(_arg.fields[0])), {
                Compare: comparePrimitives,
            }));
        }
        case 4: {
            return new Json(4, map_1((_arg_1) => SimpleJson_mapbyKey(f, _arg_1), _arg.fields[0]));
        }
        default: {
            return _arg;
        }
    }
}

export function SimpleJson_mapKeysByPath(f, json) {
    const mapKey = (xs, _arg) => {
        switch (_arg.tag) {
            case 5: {
                return new Json(5, ofList(map_1((tupledArg) => {
                    const key = tupledArg[0];
                    const value = tupledArg[1];
                    const keyPath = concat([xs, singleton(key)]);
                    const matchValue = f(keyPath);
                    if (matchValue == null) {
                        return [key, mapKey(keyPath, value)];
                    }
                    else {
                        return [matchValue, mapKey(keyPath, value)];
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

export function SimpleJson_readPath(keys_mut, input_mut) {
    SimpleJson_readPath:
    while (true) {
        const keys = keys_mut, input = input_mut;
        let matchResult, dict, key, dict_1, firstKey, rest;
        if (!isEmpty(keys)) {
            if (isEmpty(tail(keys))) {
                if (input.tag === 5) {
                    matchResult = 1;
                    dict = input.fields[0];
                    key = head(keys);
                }
                else {
                    matchResult = 3;
                }
            }
            else if (input.tag === 5) {
                matchResult = 2;
                dict_1 = input.fields[0];
                firstKey = head(keys);
                rest = tail(keys);
            }
            else {
                matchResult = 3;
            }
        }
        else {
            matchResult = 0;
        }
        switch (matchResult) {
            case 0: {
                return void 0;
            }
            case 1: {
                return tryFind(key, dict);
            }
            case 2: {
                const matchValue_1 = tryFind(firstKey, dict_1);
                let matchResult_1, nextDict;
                if (matchValue_1 != null) {
                    if (matchValue_1.tag === 5) {
                        matchResult_1 = 0;
                        nextDict = matchValue_1.fields[0];
                    }
                    else {
                        matchResult_1 = 1;
                    }
                }
                else {
                    matchResult_1 = 1;
                }
                switch (matchResult_1) {
                    case 0: {
                        keys_mut = rest;
                        input_mut = (new Json(5, nextDict));
                        continue SimpleJson_readPath;
                    }
                    case 1: {
                        return void 0;
                    }
                }
            }
            case 3: {
                return void 0;
            }
        }
        break;
    }
}

