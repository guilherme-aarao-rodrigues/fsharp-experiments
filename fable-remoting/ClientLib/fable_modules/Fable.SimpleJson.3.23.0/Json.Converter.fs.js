import { toArray as toArray_2, isEmpty as isEmpty_1, find, count, containsKey, toList as toList_1, tryFind, remove, ofList } from "../fable-library.4.0.0-theta-001/Map.js";
import { map as map_3, choose, tryFind as tryFind_2, toArray, length, tail as tail_1, head, isEmpty, empty, singleton, ofArray } from "../fable-library.4.0.0-theta-001/List.js";
import { int32ToString, disposeSafe, getEnumerator, structuralHash, safeHash, compare, equals, comparePrimitives } from "../fable-library.4.0.0-theta-001/Util.js";
import { toString as toString_3, FSharpRef, Union } from "../fable-library.4.0.0-theta-001/Types.js";
import { getUnionFields, getRecordField, makeRecord, fullName, makeUnion, name as name_2, union_type, string_type } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { Json, Json$reflection } from "./Json.fs.js";
import { toArray as toArray_1, map as map_4, collect, tryFind as tryFind_3, forAll, empty as empty_1, singleton as singleton_1, append, delay, toList } from "../fable-library.4.0.0-theta-001/Seq.js";
import { value as value_91, some, map as map_1 } from "../fable-library.4.0.0-theta-001/Option.js";
import { toText, join, fromBase64String, printf, toFail, substring, endsWith } from "../fable-library.4.0.0-theta-001/String.js";
import { parse } from "../fable-library.4.0.0-theta-001/Double.js";
import { tryParse, parse as parse_1 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { Uri } from "../fable-library.4.0.0-theta-001/Uri.js";
import { toString as toString_2 } from "../fable-library.4.0.0-theta-001/Decimal.js";
import Decimal from "../fable-library.4.0.0-theta-001/Decimal.js";
import { toString, fromInteger, toNumber, tryParse as tryParse_1, fromInt, parse as parse_2, fromNumber } from "../fable-library.4.0.0-theta-001/Long.js";
import { SimpleJson_stringify, SimpleJson_parseNative, SimpleJson_parse, SimpleJson_toString, SimpleJson_toPlainObject } from "./SimpleJson.fs.js";
import { toString as toString_1, fromInt32, parse as parse_3 } from "../fable-library.4.0.0-theta-001/BigInt.js";
import { toString as toString_4, parse as parse_4 } from "../fable-library.4.0.0-theta-001/Date.js";
import { parse as parse_5 } from "../fable-library.4.0.0-theta-001/DateOffset.js";
import DateOffset from "../fable-library.4.0.0-theta-001/DateOffset.js";
import { dayNumber, fromDayNumber } from "../fable-library.4.0.0-theta-001/DateOnly.js";
import { create } from "../fable-library.4.0.0-theta-001/TimeOnly.js";
import { concat, mapIndexed, equalsWith, zip, map as map_2, tryFind as tryFind_1 } from "../fable-library.4.0.0-theta-001/Array.js";
import { parse as parse_6 } from "../fable-library.4.0.0-theta-001/Guid.js";
import { getBytesInt32, toInt64 } from "../fable-library.4.0.0-theta-001/BitConverter.js";
import { ofList as ofList_1 } from "../fable-library.4.0.0-theta-001/Set.js";
import { TypeInfo } from "./TypeInfo.fs.js";
import { Dictionary } from "../fable-library.4.0.0-theta-001/MutableMap.js";
import { addToSet, addToDict } from "../fable-library.4.0.0-theta-001/MapUtil.js";
import { HashSet } from "../fable-library.4.0.0-theta-001/MutableSet.js";
import { enumUnion, isPrimitive } from "./TypeInfo.Converter.fs.js";
import quote from "./quote.js";
import { ticks } from "../fable-library.4.0.0-theta-001/TimeSpan.js";

export const Convert_insideBrowser = (new Function("try {return this===window;}catch(e){ return false;}"))();

function Convert_isDefined(value) {
    return !((value === undefined));
}

export function Convert_usingFable3() {
    const map = JSON.parse(JSON.stringify(ofList(ofArray([[1, 1], [2, 2]]), {
        Compare: comparePrimitives,
    })));
    const tree = map["tree"];
    if ((Convert_isDefined(tree) && Convert_isDefined(tree["k"])) && Convert_isDefined(tree["v"])) {
        return Convert_isDefined(tree["h"]);
    }
    else {
        return false;
    }
}

export const Convert_isUsingFable3 = Convert_usingFable3();

export class Convert_InternalMap extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["MapEmpty", "MapOne", "MapNode"];
    }
}

export function Convert_InternalMap$reflection() {
    return union_type("Fable.SimpleJson.Convert.InternalMap", [], Convert_InternalMap, () => [[], [["Item1", string_type], ["Item2", Json$reflection()]], [["Item1", string_type], ["Item2", Json$reflection()], ["Item3", Convert_InternalMap$reflection()], ["Item4", Convert_InternalMap$reflection()]]]);
}

export function Convert_flattenMap(_arg) {
    switch (_arg.tag) {
        case 1: {
            return singleton([_arg.fields[0], _arg.fields[1]]);
        }
        case 2: {
            return toList(delay(() => append(Convert_flattenMap(_arg.fields[2]), delay(() => append(Convert_flattenMap(_arg.fields[3]), delay(() => singleton_1([_arg.fields[0], _arg.fields[1]])))))));
        }
        default: {
            return empty();
        }
    }
}

export function Convert_$007CKeyValue$007C_$007C(key, map) {
    return map_1((value) => [key, value, remove(key, map)], tryFind(key, map));
}

export function Convert_$007CNonArray$007C_$007C(_arg) {
    if (_arg.tag === 4) {
        return void 0;
    }
    else {
        return _arg;
    }
}

export function Convert_$007CMapEmpty$007C_$007C(json) {
    let matchResult;
    if (json.tag === 1) {
        if (json.fields[0] === "MapEmpty") {
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
            return json;
        }
        case 1: {
            return void 0;
        }
    }
}

export function Convert_$007CMapKey$007C_$007C(_arg) {
    switch (_arg.tag) {
        case 0: {
            return _arg.fields[0].toString();
        }
        case 1: {
            return _arg.fields[0];
        }
        default: {
            return void 0;
        }
    }
}

export function Convert_$007CMapOne$007C_$007C(_arg) {
    let matchResult, key, value;
    if (_arg.tag === 4) {
        if (!isEmpty(_arg.fields[0])) {
            if (head(_arg.fields[0]).tag === 1) {
                if (head(_arg.fields[0]).fields[0] === "MapOne") {
                    if (!isEmpty(tail_1(_arg.fields[0]))) {
                        const activePatternResult = Convert_$007CMapKey$007C_$007C(head(tail_1(_arg.fields[0])));
                        if (activePatternResult != null) {
                            if (!isEmpty(tail_1(tail_1(_arg.fields[0])))) {
                                if (isEmpty(tail_1(tail_1(tail_1(_arg.fields[0]))))) {
                                    matchResult = 0;
                                    key = activePatternResult;
                                    value = head(tail_1(tail_1(_arg.fields[0])));
                                }
                                else {
                                    matchResult = 1;
                                }
                            }
                            else {
                                matchResult = 1;
                            }
                        }
                        else {
                            matchResult = 1;
                        }
                    }
                    else {
                        matchResult = 1;
                    }
                }
                else {
                    matchResult = 1;
                }
            }
            else {
                matchResult = 1;
            }
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
            return [key, value];
        }
        case 1: {
            return void 0;
        }
    }
}

export function Convert_$007CMapNode$007C_$007C(_arg) {
    let matchResult, key, left, right, value;
    if (_arg.tag === 4) {
        if (!isEmpty(_arg.fields[0])) {
            if (head(_arg.fields[0]).tag === 1) {
                if (head(_arg.fields[0]).fields[0] === "MapNode") {
                    if (!isEmpty(tail_1(_arg.fields[0]))) {
                        const activePatternResult = Convert_$007CMapKey$007C_$007C(head(tail_1(_arg.fields[0])));
                        if (activePatternResult != null) {
                            if (!isEmpty(tail_1(tail_1(_arg.fields[0])))) {
                                if (!isEmpty(tail_1(tail_1(tail_1(_arg.fields[0]))))) {
                                    if (!isEmpty(tail_1(tail_1(tail_1(tail_1(_arg.fields[0])))))) {
                                        if (!isEmpty(tail_1(tail_1(tail_1(tail_1(tail_1(_arg.fields[0]))))))) {
                                            if (head(tail_1(tail_1(tail_1(tail_1(tail_1(_arg.fields[0])))))).tag === 0) {
                                                if (isEmpty(tail_1(tail_1(tail_1(tail_1(tail_1(tail_1(_arg.fields[0])))))))) {
                                                    matchResult = 0;
                                                    key = activePatternResult;
                                                    left = head(tail_1(tail_1(tail_1(_arg.fields[0]))));
                                                    right = head(tail_1(tail_1(tail_1(tail_1(_arg.fields[0])))));
                                                    value = head(tail_1(tail_1(_arg.fields[0])));
                                                }
                                                else {
                                                    matchResult = 1;
                                                }
                                            }
                                            else {
                                                matchResult = 1;
                                            }
                                        }
                                        else {
                                            matchResult = 1;
                                        }
                                    }
                                    else {
                                        matchResult = 1;
                                    }
                                }
                                else {
                                    matchResult = 1;
                                }
                            }
                            else {
                                matchResult = 1;
                            }
                        }
                        else {
                            matchResult = 1;
                        }
                    }
                    else {
                        matchResult = 1;
                    }
                }
                else {
                    matchResult = 1;
                }
            }
            else {
                matchResult = 1;
            }
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
            return [key, value, left, right];
        }
        case 1: {
            return void 0;
        }
    }
}

export function Convert_generateMap(json) {
    if (Convert_$007CMapEmpty$007C_$007C(json) != null) {
        return new Convert_InternalMap(0);
    }
    else {
        const activePatternResult_1 = Convert_$007CMapOne$007C_$007C(json);
        if (activePatternResult_1 != null) {
            const key = activePatternResult_1[0];
            const value = activePatternResult_1[1];
            return new Convert_InternalMap(1, key, value);
        }
        else {
            const activePatternResult_2 = Convert_$007CMapNode$007C_$007C(json);
            if (activePatternResult_2 != null) {
                const key_1 = activePatternResult_2[0];
                const left = activePatternResult_2[2];
                const right = activePatternResult_2[3];
                const value_1 = activePatternResult_2[1];
                const matchValue = Convert_generateMap(left);
                const matchValue_1 = Convert_generateMap(right);
                let matchResult, leftMap, rightMap;
                if (matchValue != null) {
                    if (matchValue_1 != null) {
                        matchResult = 0;
                        leftMap = matchValue;
                        rightMap = matchValue_1;
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
                        return new Convert_InternalMap(2, key_1, value_1, leftMap, rightMap);
                    }
                    case 1: {
                        return void 0;
                    }
                }
            }
            else {
                return void 0;
            }
        }
    }
}

export function Convert_flatteFable3Map(tree) {
    return toList(delay(() => {
        let matchValue, matchValue_1, key, value;
        return append((matchValue = tryFind("k", tree), (matchValue_1 = tryFind("v", tree), (matchValue != null) ? ((matchValue.tag === 1) ? ((matchValue_1 != null) ? ((key = matchValue.fields[0], (value = matchValue_1, singleton_1([key, value])))) : ((empty_1()))) : ((empty_1()))) : ((empty_1())))), delay(() => {
            let matchValue_3, left;
            return append((matchValue_3 = tryFind("left", tree), (matchValue_3 != null) ? ((matchValue_3.tag === 5) ? ((left = matchValue_3.fields[0], Convert_flatteFable3Map(left))) : ((empty_1()))) : ((empty_1()))), delay(() => {
                const matchValue_4 = tryFind("right", tree);
                let matchResult, right;
                if (matchValue_4 != null) {
                    if (matchValue_4.tag === 5) {
                        matchResult = 0;
                        right = matchValue_4.fields[0];
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
                        return Convert_flatteFable3Map(right);
                    }
                    case 1: {
                        return empty_1();
                    }
                }
            }));
        }));
    }));
}

export function Convert_flattenFable3Lists(linkedList) {
    return toList(delay(() => {
        let matchValue;
        return append((matchValue = tryFind("head", linkedList), (matchValue == null) ? ((empty_1())) : singleton_1(matchValue)), delay(() => {
            const matchValue_1 = tryFind("tail", linkedList);
            let matchResult, tail;
            if (matchValue_1 != null) {
                if (matchValue_1.tag === 5) {
                    matchResult = 0;
                    tail = matchValue_1.fields[0];
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
                    return Convert_flattenFable3Lists(tail);
                }
                case 1: {
                    return empty_1();
                }
            }
        }));
    }));
}

export function Convert_arrayLike(_arg) {
    switch (_arg.tag) {
        case 30: {
            return true;
        }
        case 28: {
            return true;
        }
        case 31: {
            return true;
        }
        case 32: {
            return true;
        }
        case 29: {
            return true;
        }
        case 35: {
            return true;
        }
        case 36: {
            return true;
        }
        default: {
            return false;
        }
    }
}

export function Convert_isRecord(_arg) {
    if (_arg.tag === 39) {
        return true;
    }
    else {
        return false;
    }
}

export function Convert_unionOfRecords(_arg) {
    if (_arg.tag === 40) {
        return forAll((case$) => {
            if (case$.CaseTypes.length === 1) {
                return Convert_isRecord(case$.CaseTypes[0]);
            }
            else {
                return false;
            }
        }, _arg.fields[0]()[0]);
    }
    else {
        return false;
    }
}

export function Convert_optional(_arg) {
    if (_arg.tag === 27) {
        return true;
    }
    else {
        return false;
    }
}

export function Convert_isQuoted(input) {
    if (input.indexOf("\"") === 0) {
        return endsWith(input, "\"");
    }
    else {
        return false;
    }
}

export function Convert_betweenQuotes(input) {
    return ("\"" + input) + "\"";
}

export function Convert_removeQuotes(input) {
    return substring(input, 1, input.length - 2);
}

export function Convert_fromJsonAs(input_mut, typeInfo_mut) {
    let foundCase, foundCase_1, testExpr, values_8, tree, tree_1;
    Convert_fromJsonAs:
    while (true) {
        const input = input_mut, typeInfo = typeInfo_mut;
        let matchResult, value_2, value_4, value_5, value_7, value_8, value_9, value_10, value_11, value_12, value_13, value_14, value_15, value_16, value_17, value_18, value_19, value_20, value_21, value_22, value_23, value_24, value_25, value_26, getlElemType, value_27, getElemType, value_28, getElemType_1, value_29, genericJson, value_30, value_31, value_32, value_33, value_34, value_35, value_36, value_37, value_38, value_39, value_40, value_41, value_42, getTypes_1, values, jsonValue_5, optionalTypeDelayed_5, value_49, value_50, dict, caseName_4, getTypes_2, caseName_5, getTypes_3, getFields, serializedRecord, caseValue, getTypes_4, elementTypeDelayed, values_4, elementTypeDelayed_1, values_5, elementTypeDelayed_2, linkedList, elementTypeDelayed_3, values_6, elementTypeDelayed_4, values_7, array_12, tupleTypesDelayed, dict_1, getTypes_5, getTypes_6, tuples, getTypes_7, tuples_1, dict_2, getTypes_8, getType, items, getTypes_9, map, getType_1;
        if (input.tag === 1) {
            if (typeInfo.tag === 9) {
                if (input.fields[0].toLocaleLowerCase() === "nan") {
                    matchResult = 1;
                }
                else {
                    matchResult = 2;
                    value_4 = input.fields[0];
                }
            }
            else if (typeInfo.tag === 8) {
                if (input.fields[0].toLocaleLowerCase() === "nan") {
                    matchResult = 4;
                }
                else {
                    matchResult = 5;
                    value_7 = input.fields[0];
                }
            }
            else if (typeInfo.tag === 6) {
                matchResult = 8;
                value_10 = input.fields[0];
            }
            else if (typeInfo.tag === 1) {
                matchResult = 9;
                value_11 = input.fields[0];
            }
            else if (typeInfo.tag === 2) {
                matchResult = 11;
                value_13 = input.fields[0];
            }
            else if (typeInfo.tag === 22) {
                matchResult = 13;
                value_15 = input.fields[0];
            }
            else if (typeInfo.tag === 10) {
                matchResult = 14;
                value_16 = input.fields[0];
            }
            else if (typeInfo.tag === 11) {
                matchResult = 16;
                value_18 = input.fields[0];
            }
            else if (typeInfo.tag === 3) {
                matchResult = 19;
                value_21 = input.fields[0];
            }
            else if (typeInfo.tag === 4) {
                matchResult = 21;
                value_23 = input.fields[0];
            }
            else if (typeInfo.tag === 5) {
                matchResult = 23;
                value_25 = input.fields[0];
            }
            else if (typeInfo.tag === 38) {
                matchResult = 25;
                getlElemType = typeInfo.fields[0];
                value_27 = input.fields[0];
            }
            else if (typeInfo.tag === 30) {
                matchResult = 27;
                getElemType_1 = typeInfo.fields[0];
                value_29 = input.fields[0];
            }
            else if (typeInfo.tag === 23) {
                matchResult = 30;
                genericJson = input;
            }
            else if (typeInfo.tag === 12) {
                matchResult = 31;
                value_30 = input.fields[0];
            }
            else if (typeInfo.tag === 13) {
                matchResult = 32;
                value_31 = input.fields[0];
            }
            else if (typeInfo.tag === 14) {
                matchResult = 35;
                value_34 = input.fields[0];
            }
            else if (typeInfo.tag === 19) {
                matchResult = 36;
                value_35 = input.fields[0];
            }
            else if (typeInfo.tag === 15) {
                matchResult = 38;
                value_37 = input.fields[0];
            }
            else if (typeInfo.tag === 16) {
                matchResult = 39;
                value_38 = input.fields[0];
            }
            else if (typeInfo.tag === 17) {
                matchResult = 42;
                value_41 = input.fields[0];
            }
            else if (typeInfo.tag === 18) {
                matchResult = 43;
                value_42 = input.fields[0];
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    matchResult = 46;
                    jsonValue_5 = input;
                    optionalTypeDelayed_5 = typeInfo.fields[0];
                }
                else {
                    matchResult = 67;
                }
            }
            else if (typeInfo.tag === 21) {
                matchResult = 47;
                value_49 = input.fields[0];
            }
            else if (typeInfo.tag === 40) {
                if (Convert_isQuoted(input.fields[0])) {
                    matchResult = 50;
                    caseName_4 = input.fields[0];
                    getTypes_2 = typeInfo.fields[0];
                }
                else {
                    matchResult = 51;
                    caseName_5 = input.fields[0];
                    getTypes_3 = typeInfo.fields[0];
                }
            }
            else if (typeInfo.tag === 39) {
                matchResult = 52;
                getFields = typeInfo.fields[0];
                serializedRecord = input.fields[0];
            }
            else if (typeInfo.tag === 24) {
                matchResult = 66;
                getType_1 = typeInfo.fields[0];
            }
            else {
                matchResult = 67;
            }
        }
        else if (input.tag === 2) {
            if (typeInfo.tag === 7) {
                matchResult = 7;
                value_9 = input.fields[0];
            }
            else if (typeInfo.tag === 23) {
                matchResult = 30;
                genericJson = input;
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    matchResult = 46;
                    jsonValue_5 = input;
                    optionalTypeDelayed_5 = typeInfo.fields[0];
                }
                else {
                    matchResult = 67;
                }
            }
            else if (typeInfo.tag === 24) {
                matchResult = 66;
                getType_1 = typeInfo.fields[0];
            }
            else {
                matchResult = 67;
            }
        }
        else if (input.tag === 3) {
            if (typeInfo.tag === 2) {
                matchResult = 28;
            }
            else if (typeInfo.tag === 0) {
                matchResult = 29;
            }
            else if (typeInfo.tag === 23) {
                matchResult = 30;
                genericJson = input;
            }
            else if (typeInfo.tag === 27) {
                matchResult = 45;
            }
            else if (typeInfo.tag === 24) {
                matchResult = 66;
                getType_1 = typeInfo.fields[0];
            }
            else {
                matchResult = 67;
            }
        }
        else if (input.tag === 5) {
            if (typeInfo.tag === 23) {
                matchResult = 30;
                genericJson = input;
            }
            else if (typeInfo.tag === 40) {
                matchResult = 44;
                getTypes_1 = typeInfo.fields[0];
                values = input.fields[0];
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    matchResult = 46;
                    jsonValue_5 = input;
                    optionalTypeDelayed_5 = typeInfo.fields[0];
                }
                else {
                    matchResult = 67;
                }
            }
            else if (typeInfo.tag === 12) {
                matchResult = 49;
                dict = input.fields[0];
            }
            else if (typeInfo.tag === 28) {
                matchResult = 56;
                elementTypeDelayed_2 = typeInfo.fields[0];
                linkedList = input.fields[0];
            }
            else if (typeInfo.tag === 39) {
                matchResult = 60;
                dict_1 = input.fields[0];
                getTypes_5 = typeInfo.fields[0];
            }
            else if (typeInfo.tag === 34) {
                matchResult = 63;
                dict_2 = input.fields[0];
                getTypes_8 = typeInfo.fields[0];
            }
            else if (typeInfo.tag === 33) {
                matchResult = 65;
                getTypes_9 = typeInfo.fields[0];
                map = input.fields[0];
            }
            else if (typeInfo.tag === 24) {
                matchResult = 66;
                getType_1 = typeInfo.fields[0];
            }
            else {
                matchResult = 67;
            }
        }
        else if (input.tag === 4) {
            if (typeInfo.tag === 23) {
                matchResult = 30;
                genericJson = input;
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    matchResult = 46;
                    jsonValue_5 = input;
                    optionalTypeDelayed_5 = typeInfo.fields[0];
                }
                else {
                    matchResult = 67;
                }
            }
            else if (typeInfo.tag === 40) {
                matchResult = 53;
                caseValue = input.fields[0];
                getTypes_4 = typeInfo.fields[0];
            }
            else if (typeInfo.tag === 30) {
                matchResult = 54;
                elementTypeDelayed = typeInfo.fields[0];
                values_4 = input.fields[0];
            }
            else if (typeInfo.tag === 28) {
                matchResult = 55;
                elementTypeDelayed_1 = typeInfo.fields[0];
                values_5 = input.fields[0];
            }
            else if (typeInfo.tag === 29) {
                matchResult = 57;
                elementTypeDelayed_3 = typeInfo.fields[0];
                values_6 = input.fields[0];
            }
            else if (typeInfo.tag === 31) {
                matchResult = 58;
                elementTypeDelayed_4 = typeInfo.fields[0];
                values_7 = input.fields[0];
            }
            else if (typeInfo.tag === 32) {
                matchResult = 59;
                array_12 = input.fields[0];
                tupleTypesDelayed = typeInfo.fields[0];
            }
            else if (typeInfo.tag === 33) {
                matchResult = 61;
                getTypes_6 = typeInfo.fields[0];
                tuples = input.fields[0];
            }
            else if (typeInfo.tag === 34) {
                matchResult = 62;
                getTypes_7 = typeInfo.fields[0];
                tuples_1 = input.fields[0];
            }
            else if (typeInfo.tag === 36) {
                matchResult = 64;
                getType = typeInfo.fields[0];
                items = input.fields[0];
            }
            else if (typeInfo.tag === 24) {
                matchResult = 66;
                getType_1 = typeInfo.fields[0];
            }
            else {
                matchResult = 67;
            }
        }
        else if (typeInfo.tag === 9) {
            matchResult = 0;
            value_2 = input.fields[0];
        }
        else if (typeInfo.tag === 8) {
            matchResult = 3;
            value_5 = input.fields[0];
        }
        else if (typeInfo.tag === 6) {
            matchResult = 6;
            value_8 = input.fields[0];
        }
        else if (typeInfo.tag === 1) {
            matchResult = 10;
            value_12 = input.fields[0];
        }
        else if (typeInfo.tag === 2) {
            matchResult = 12;
            value_14 = input.fields[0];
        }
        else if (typeInfo.tag === 10) {
            matchResult = 15;
            value_17 = input.fields[0];
        }
        else if (typeInfo.tag === 11) {
            matchResult = 17;
            value_19 = input.fields[0];
        }
        else if (typeInfo.tag === 3) {
            matchResult = 18;
            value_20 = input.fields[0];
        }
        else if (typeInfo.tag === 4) {
            matchResult = 20;
            value_22 = input.fields[0];
        }
        else if (typeInfo.tag === 5) {
            matchResult = 22;
            value_24 = input.fields[0];
        }
        else if (typeInfo.tag === 20) {
            matchResult = 24;
            value_26 = input.fields[0];
        }
        else if (typeInfo.tag === 38) {
            matchResult = 26;
            getElemType = typeInfo.fields[0];
            value_28 = input.fields[0];
        }
        else if (typeInfo.tag === 23) {
            matchResult = 30;
            genericJson = input;
        }
        else if (typeInfo.tag === 13) {
            matchResult = 33;
            value_32 = input.fields[0];
        }
        else if (typeInfo.tag === 14) {
            matchResult = 34;
            value_33 = input.fields[0];
        }
        else if (typeInfo.tag === 19) {
            matchResult = 37;
            value_36 = input.fields[0];
        }
        else if (typeInfo.tag === 16) {
            matchResult = 40;
            value_39 = input.fields[0];
        }
        else if (typeInfo.tag === 17) {
            matchResult = 41;
            value_40 = input.fields[0];
        }
        else if (typeInfo.tag === 27) {
            if (!equals(input, new Json(3))) {
                matchResult = 46;
                jsonValue_5 = input;
                optionalTypeDelayed_5 = typeInfo.fields[0];
            }
            else {
                matchResult = 67;
            }
        }
        else if (typeInfo.tag === 12) {
            matchResult = 48;
            value_50 = input.fields[0];
        }
        else if (typeInfo.tag === 24) {
            matchResult = 66;
            getType_1 = typeInfo.fields[0];
        }
        else {
            matchResult = 67;
        }
        switch (matchResult) {
            case 0: {
                return value_2;
            }
            case 1: {
                return NaN;
            }
            case 2: {
                return parse(value_4);
            }
            case 3: {
                return value_5;
            }
            case 4: {
                return NaN;
            }
            case 5: {
                return parse(value_7);
            }
            case 6: {
                return Math.floor(value_8);
            }
            case 7: {
                return value_9;
            }
            case 8: {
                return parse_1(value_10, 511, false, 32);
            }
            case 9: {
                return value_11;
            }
            case 10: {
                return String.fromCharCode(value_12);
            }
            case 11: {
                return value_13;
            }
            case 12: {
                return value_14.toString();
            }
            case 13: {
                return Uri.create(value_15);
            }
            case 14: {
                return new Decimal(value_16);
            }
            case 15: {
                return new Decimal(value_17);
            }
            case 16: {
                return parse_1(value_18, 511, false, 16);
            }
            case 17: {
                return (value_19 + 0x8000 & 0xFFFF) - 0x8000;
            }
            case 18: {
                return value_20 & 0xFFFF;
            }
            case 19: {
                return parse_1(value_21, 511, true, 16);
            }
            case 20: {
                return value_22 >>> 0;
            }
            case 21: {
                return parse_1(value_23, 511, true, 32);
            }
            case 22: {
                return fromNumber(value_24, true);
            }
            case 23: {
                return parse_2(value_25, 511, true, 64);
            }
            case 24: {
                return Math.floor(value_26);
            }
            case 25: {
                const patternInput = getlElemType();
                const underlyingType = patternInput[0];
                const originalType = patternInput[1];
                switch (underlyingType.tag) {
                    case 6: {
                        let matchValue_1;
                        let outArg = 0;
                        matchValue_1 = [tryParse(value_27, 511, false, 32, new FSharpRef(() => outArg, (v) => {
                            outArg = (v | 0);
                        })), outArg];
                        if (matchValue_1[0]) {
                            return matchValue_1[1];
                        }
                        else {
                            const arg_1 = name_2(originalType);
                            return toFail(printf("The value \'%s\' is not valid for enum of type \'%s\'"))(value_27)(arg_1);
                        }
                    }
                    case 12: {
                        let matchValue_2;
                        let outArg_1 = fromInt(0);
                        matchValue_2 = [tryParse_1(value_27, 511, false, 64, new FSharpRef(() => outArg_1, (v_1) => {
                            outArg_1 = v_1;
                        })), outArg_1];
                        if (matchValue_2[0]) {
                            return matchValue_2[1];
                        }
                        else {
                            const arg_3 = name_2(originalType);
                            return toFail(printf("The value \'%s\' is not valid for enum of type \'%s\'"))(value_27)(arg_3);
                        }
                    }
                    default: {
                        const arg_5 = name_2(originalType);
                        return toFail(printf("The value \'%s\' cannot be converted to enum of type \'%s\'"))(value_27)(arg_5);
                    }
                }
            }
            case 26: {
                const patternInput_1 = getElemType();
                return value_28;
            }
            case 27: {
                const elemType = getElemType_1();
                if (elemType.tag === 13) {
                    if ((typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? true : Convert_insideBrowser) {
                        return fromBase64String(value_29);
                    }
                    else {
                        return Array.prototype.slice.call(Buffer.from(value_29, 'base64'));
                    }
                }
                else {
                    return toFail(printf("Cannot convert arbitrary string \'%s\' to %A"))(value_29)(elemType);
                }
            }
            case 28: {
                return null;
            }
            case 29: {
                return void 0;
            }
            case 30: {
                return SimpleJson_toPlainObject(genericJson);
            }
            case 31: {
                return parse_2(value_30, 511, false, 64);
            }
            case 32: {
                return parse_1(value_31, 511, true, 8);
            }
            case 33: {
                return value_32 & 0xFF;
            }
            case 34: {
                return (value_33 + 0x80 & 0xFF) - 0x80;
            }
            case 35: {
                return parse_1(value_34, 511, false, 8);
            }
            case 36: {
                return parse_3(value_35);
            }
            case 37: {
                return fromInt32(Math.floor(value_36));
            }
            case 38: {
                return parse_4(value_37);
            }
            case 39: {
                return parse_5(value_38);
            }
            case 40: {
                return DateOffset(toNumber(fromNumber(Math.floor(value_39), false)) * 1000, 0);
            }
            case 41: {
                return fromDayNumber(~(~value_40));
            }
            case 42: {
                return fromDayNumber(parse_1(value_41, 511, false, 32));
            }
            case 43: {
                return create(parse_2(value_42, 511, false, 64));
            }
            case 44: {
                const patternInput_2 = getTypes_1();
                const unionType = patternInput_2[1];
                const cases = patternInput_2[0];
                const matchValue_3 = toList_1(values);
                let matchResult_1, caseName_1, values_1, caseName_2, json;
                if (!isEmpty(matchValue_3)) {
                    if (head(matchValue_3)[1].tag === 4) {
                        if (isEmpty(tail_1(matchValue_3))) {
                            matchResult_1 = 0;
                            caseName_1 = head(matchValue_3)[0];
                            values_1 = head(matchValue_3)[1].fields[0];
                        }
                        else {
                            matchResult_1 = 2;
                        }
                    }
                    else {
                        const activePatternResult = Convert_$007CNonArray$007C_$007C(head(matchValue_3)[1]);
                        if (activePatternResult != null) {
                            if (isEmpty(tail_1(matchValue_3))) {
                                matchResult_1 = 1;
                                caseName_2 = head(matchValue_3)[0];
                                json = activePatternResult;
                            }
                            else {
                                matchResult_1 = 2;
                            }
                        }
                        else {
                            matchResult_1 = 2;
                        }
                    }
                }
                else {
                    matchResult_1 = 2;
                }
                switch (matchResult_1) {
                    case 0: {
                        const _arg = tryFind_1((case$) => (case$.CaseName === caseName_1), cases);
                        if (_arg != null) {
                            if ((foundCase = _arg, (foundCase.CaseTypes.length === 1) && Convert_arrayLike(foundCase.CaseTypes[0]))) {
                                const foundCase_2 = _arg;
                                return makeUnion(foundCase_2.Info, [Convert_fromJsonAs(new Json(4, values_1), foundCase_2.CaseTypes[0])]);
                            }
                            else if ((foundCase_1 = _arg, (foundCase_1.CaseTypes.length === 1) && Convert_optional(foundCase_1.CaseTypes[0]))) {
                                const foundCase_3 = _arg;
                                return makeUnion(foundCase_3.Info, [Convert_fromJsonAs(new Json(4, values_1), foundCase_3.CaseTypes[0])]);
                            }
                            else {
                                const foundCase_4 = _arg;
                                if (((foundCase_4.CaseTypes.length === 1) && (!Convert_arrayLike(foundCase_4.CaseTypes[0]))) && (foundCase_4.CaseTypes.length !== length(values_1))) {
                                    const arg_14 = length(values_1) | 0;
                                    const arg_13 = foundCase_4.CaseTypes.length | 0;
                                    toFail(printf("Expected case \'%s\' to have %d argument types but the JSON data only contained %d values"))(foundCase_4.CaseName)(arg_13)(arg_14);
                                }
                                return makeUnion(foundCase_4.Info, map_2((tupledArg) => Convert_fromJsonAs(tupledArg[1], tupledArg[0]), zip(foundCase_4.CaseTypes, toArray(values_1))));
                            }
                        }
                        else {
                            const expectedCases = join(", ", map_2((case$_1) => toText(printf(" \'%s\' "))(case$_1.CaseName), cases));
                            const arg_10 = name_2(unionType);
                            return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(caseName_1)(arg_10)(expectedCases);
                        }
                    }
                    case 1: {
                        const _arg_1 = tryFind_1((case$_2) => (case$_2.CaseName === caseName_2), cases);
                        let matchResult_2, caseInfo, caseName_3, caseType;
                        if (_arg_1 != null) {
                            if ((testExpr = _arg_1.CaseTypes, (!equalsWith(equals, testExpr, null)) && (testExpr.length === 1))) {
                                matchResult_2 = 0;
                                caseInfo = _arg_1.Info;
                                caseName_3 = _arg_1.CaseName;
                                caseType = _arg_1.CaseTypes[0];
                            }
                            else {
                                matchResult_2 = 1;
                            }
                        }
                        else {
                            matchResult_2 = 1;
                        }
                        switch (matchResult_2) {
                            case 0: {
                                return makeUnion(caseInfo, [((input_1) => ((typeInfo_1) => Convert_fromJsonAs(input_1, typeInfo_1)))(json)(caseType)]);
                            }
                            case 1: {
                                const expectedCases_1 = join(", ", map_2((case$_3) => toText(printf(" \'%s\' "))(case$_3.CaseName), cases));
                                const arg_19 = name_2(unionType);
                                return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(caseName_2)(arg_19)(expectedCases_1);
                            }
                        }
                    }
                    case 2: {
                        if ((containsKey("tag", values) && containsKey("fields", values)) && (count(values) === 2)) {
                            const matchValue_4 = tryFind("tag", values);
                            const matchValue_5 = tryFind("fields", values);
                            let matchResult_3, caseIndex, fieldValues;
                            if (matchValue_4 != null) {
                                if (matchValue_4.tag === 0) {
                                    if (matchValue_5 != null) {
                                        if (matchValue_5.tag === 4) {
                                            matchResult_3 = 0;
                                            caseIndex = matchValue_4.fields[0];
                                            fieldValues = matchValue_5.fields[0];
                                        }
                                        else {
                                            matchResult_3 = 1;
                                        }
                                    }
                                    else {
                                        matchResult_3 = 1;
                                    }
                                }
                                else {
                                    matchResult_3 = 1;
                                }
                            }
                            else {
                                matchResult_3 = 1;
                            }
                            switch (matchResult_3) {
                                case 0: {
                                    const foundCase_5 = cases[~(~caseIndex)];
                                    return makeUnion(foundCase_5.Info, mapIndexed((index, value_48) => Convert_fromJsonAs(value_48, foundCase_5.CaseTypes[index]), toArray(fieldValues)));
                                }
                                case 1: {
                                    const arg_22 = fullName(unionType);
                                    const arg_21 = SimpleJson_toString(new Json(5, values));
                                    return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                }
                            }
                        }
                        else if (Convert_unionOfRecords(typeInfo)) {
                            const foundDiscriminatorKey = tryFind_2((keyword) => containsKey(keyword, values), ofArray(["__typename", "$typename", "$type"]));
                            if (foundDiscriminatorKey != null) {
                                const discriminatorValueJson = find(foundDiscriminatorKey, values);
                                if (discriminatorValueJson.tag === 1) {
                                    const discriminatorValue = discriminatorValueJson.fields[0];
                                    const foundUnionCase = tryFind_3((case$_4) => (case$_4.CaseName.toUpperCase() === discriminatorValue.toUpperCase()), cases);
                                    if (foundUnionCase != null) {
                                        const case$_5 = foundUnionCase;
                                        return makeUnion(case$_5.Info, [Convert_fromJsonAs(new Json(5, values), case$_5.CaseTypes[0])]);
                                    }
                                    else {
                                        const arg_24 = name_2(unionType);
                                        return toFail(printf("Union of records of type \'%s\' does not have a matching case \'%s\'"))(arg_24)(discriminatorValue);
                                    }
                                }
                                else {
                                    const arg_26 = name_2(unionType);
                                    return toFail(printf("Union of records of type \'%s\' cannot be deserialized with the value of the discriminator key is not a string to match against a specific union case"))(arg_26);
                                }
                            }
                            else {
                                const arg_23 = name_2(unionType);
                                return toFail(printf("Could not serialize the JSON object into the union of records of type %s because the JSON did not contain a known discriminator. Expected \'__typename\', \'$typeName\' or \'$type\'"))(arg_23);
                            }
                        }
                        else {
                            const unexpectedJson = JSON.stringify(matchValue_3);
                            const expectedType = JSON.stringify(cases);
                            return toFail(printf("Expected JSON:\n%s\nto match the type\n%s"))(unexpectedJson)(expectedType);
                        }
                    }
                }
            }
            case 45: {
                return void 0;
            }
            case 46: {
                return (some)(Convert_fromJsonAs(jsonValue_5, optionalTypeDelayed_5()));
            }
            case 47: {
                return parse_6(value_49);
            }
            case 48: {
                return ((value_51) => fromInteger(value_51, false, 2))(~(~value_50));
            }
            case 49: {
                const get$ = (key) => tryFind(key, dict);
                const _arg_2 = choose((x_1) => x_1, ofArray([get$("low"), get$("high"), get$("unsigned")]));
                let matchResult_4, high, low;
                if (!isEmpty(_arg_2)) {
                    if (head(_arg_2).tag === 0) {
                        if (!isEmpty(tail_1(_arg_2))) {
                            if (head(tail_1(_arg_2)).tag === 0) {
                                if (!isEmpty(tail_1(tail_1(_arg_2)))) {
                                    if (head(tail_1(tail_1(_arg_2))).tag === 2) {
                                        if (isEmpty(tail_1(tail_1(tail_1(_arg_2))))) {
                                            matchResult_4 = 0;
                                            high = head(tail_1(_arg_2)).fields[0];
                                            low = head(_arg_2).fields[0];
                                        }
                                        else {
                                            matchResult_4 = 1;
                                        }
                                    }
                                    else {
                                        matchResult_4 = 1;
                                    }
                                }
                                else {
                                    matchResult_4 = 1;
                                }
                            }
                            else {
                                matchResult_4 = 1;
                            }
                        }
                        else {
                            matchResult_4 = 1;
                        }
                    }
                    else {
                        matchResult_4 = 1;
                    }
                }
                else {
                    matchResult_4 = 1;
                }
                switch (matchResult_4) {
                    case 0: {
                        return toInt64(concat([getBytesInt32(~(~low)), getBytesInt32(~(~high))], Uint8Array), 0);
                    }
                    case 1: {
                        return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                    }
                }
            }
            case 50: {
                const patternInput_3 = getTypes_2();
                const caseTypes = patternInput_3[0];
                const _arg_3 = tryFind_1((case$_6) => (case$_6.CaseName === Convert_removeQuotes(caseName_4)), caseTypes);
                if (_arg_3 == null) {
                    const expectedCases_2 = join(", ", map_2((case$_7) => toText(printf(" \'%s\' "))(case$_7.CaseName), caseTypes));
                    const arg_34 = name_2(patternInput_3[1]);
                    return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(caseName_4)(arg_34)(expectedCases_2);
                }
                else {
                    return makeUnion(_arg_3.Info, []);
                }
            }
            case 51: {
                const patternInput_4 = getTypes_3();
                const caseTypes_1 = patternInput_4[0];
                const _arg_4 = tryFind_1((case$_8) => (case$_8.CaseName === caseName_5), caseTypes_1);
                if (_arg_4 == null) {
                    const expectedCases_3 = join(", ", map_2((case$_9) => toText(printf(" \'%s\' "))(case$_9.CaseName), caseTypes_1));
                    const arg_38 = name_2(patternInput_4[1]);
                    return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(caseName_5)(arg_38)(expectedCases_3);
                }
                else {
                    return makeUnion(_arg_4.Info, []);
                }
            }
            case 52: {
                input_mut = SimpleJson_parse(serializedRecord);
                typeInfo_mut = typeInfo;
                continue Convert_fromJsonAs;
            }
            case 53: {
                const patternInput_5 = getTypes_4();
                const cases_1 = patternInput_5[0];
                let matchResult_5, caseName_6, caseName_8, values_3, otherwise_6;
                if (!isEmpty(caseValue)) {
                    if (head(caseValue).tag === 1) {
                        if (isEmpty(tail_1(caseValue))) {
                            matchResult_5 = 0;
                            caseName_6 = head(caseValue).fields[0];
                        }
                        else {
                            matchResult_5 = 1;
                            caseName_8 = head(caseValue).fields[0];
                            values_3 = tail_1(caseValue);
                        }
                    }
                    else {
                        matchResult_5 = 2;
                        otherwise_6 = caseValue;
                    }
                }
                else {
                    matchResult_5 = 2;
                    otherwise_6 = caseValue;
                }
                switch (matchResult_5) {
                    case 0: {
                        const _arg_5 = tryFind_1((case$_10) => (case$_10.CaseName === caseName_6), cases_1);
                        if (_arg_5 == null) {
                            const expectedCases_4 = join(", ", map_2((case$_11) => toText(printf(" \'%s\' "))(case$_11.CaseName), cases_1));
                            const arg_42 = name_2(patternInput_5[1]);
                            return toFail(printf("Case \'%s\' was not valid for type \'%s\', expected one of the cases [%s]"))(caseName_6)(arg_42)(expectedCases_4);
                        }
                        else {
                            const caseName_7 = _arg_5.CaseName;
                            const caseInfoTypes = _arg_5.CaseTypes;
                            return makeUnion(_arg_5.Info, []);
                        }
                    }
                    case 1: {
                        const _arg_6 = tryFind_1((case$_12) => (case$_12.CaseName === caseName_8), cases_1);
                        if (_arg_6 != null) {
                            const types = _arg_6.CaseTypes;
                            const foundCaseName = _arg_6.CaseName;
                            const caseInfo_4 = _arg_6.Info;
                            if (types.length !== length(values_3)) {
                                toFail(printf("The number of union case parameters for \'%s\' is different"))(foundCaseName);
                            }
                            return makeUnion(caseInfo_4, map_2((tupledArg_1) => Convert_fromJsonAs(tupledArg_1[1], tupledArg_1[0]), zip(types, toArray(values_3))));
                        }
                        else {
                            const expectedCases_5 = join(", ", map_2((_arg_7) => _arg_7.CaseName, cases_1));
                            return toFail(printf("Case %s was not valid, expected one of [%s]"))(caseName_8)(expectedCases_5);
                        }
                    }
                    case 2: {
                        const unexpectedJson_1 = JSON.stringify(otherwise_6);
                        const expectedType_1 = JSON.stringify(cases_1);
                        return toFail(printf("Expected JSON:\n%s\nto match the type\n%s"))(unexpectedJson_1)(expectedType_1);
                    }
                }
            }
            case 54: {
                const elementType = elementTypeDelayed();
                return toArray(map_3((value_55) => Convert_fromJsonAs(value_55, elementType), values_4));
            }
            case 55: {
                const elementType_1 = elementTypeDelayed_1();
                return map_3((value_57) => Convert_fromJsonAs(value_57, elementType_1), values_5);
            }
            case 56: {
                const elementType_2 = elementTypeDelayed_2();
                return map_3((value_59) => Convert_fromJsonAs(value_59, elementType_2), Convert_flattenFable3Lists(linkedList));
            }
            case 57: {
                const elementType_3 = elementTypeDelayed_3();
                return ofList_1(map_3((value_61) => Convert_fromJsonAs(value_61, elementType_3), values_6), {
                    Compare: compare,
                });
            }
            case 58: {
                const elementType_4 = elementTypeDelayed_4();
                return map_3((value_63) => Convert_fromJsonAs(value_63, elementType_4), values_7);
            }
            case 59: {
                return map_2((tupledArg_2) => Convert_fromJsonAs(tupledArg_2[1], tupledArg_2[0]), zip(tupleTypesDelayed(), toArray(array_12)));
            }
            case 60: {
                const patternInput_6 = getTypes_5();
                const recordType = patternInput_6[1];
                const fields = patternInput_6[0];
                return makeRecord(recordType, (values_8 = toList_1(dict_1), map_2((_arg_8) => {
                    let list_10, f2, clo_48;
                    const fieldType = _arg_8.FieldType;
                    const fieldName = _arg_8.FieldName;
                    const _arg_9 = tryFind_2((tupledArg_3) => (fieldName === tupledArg_3[0]), values_8);
                    if (_arg_9 == null) {
                        if (fieldType.tag === 27) {
                            return void 0;
                        }
                        else {
                            let dictKeys;
                            const arg_51 = join(", ", (list_10 = toList_1(dict_1), map_3((f2 = ((clo_48 = toText(printf("\'%s\'")), clo_48)), (arg_50) => f2(arg_50[0])), list_10)));
                            dictKeys = toText(printf("[ %s ]"))(arg_51);
                            let recordFields;
                            const arg_54 = join(", ", map_2((_arg_10) => {
                                const name_1 = _arg_10.FieldName;
                                if (_arg_10.FieldType.tag === 27) {
                                    return toText(printf("optional(\'%s\')"))(name_1);
                                }
                                else {
                                    return toText(printf("required(\'%s\')"))(name_1);
                                }
                            }, fields));
                            recordFields = toText(printf("[ %s ]"))(arg_54);
                            const arg_57 = name_2(recordType);
                            return toFail(printf("Could not find the required key \'%s\' in the JSON object literal with keys %s to match with record type \'%s\' that has fields %s"))(fieldName)(dictKeys)(arg_57)(recordFields);
                        }
                    }
                    else {
                        const key_2 = _arg_9[0];
                        return Convert_fromJsonAs(_arg_9[1], fieldType);
                    }
                }, fields)));
            }
            case 61: {
                const patternInput_7 = getTypes_6();
                const keyType = patternInput_7[0];
                const pairs = toList(delay(() => collect((keyValuePair) => {
                    let a;
                    return singleton_1(Convert_fromJsonAs(keyValuePair, new TypeInfo(32, (a = [keyType, patternInput_7[1]], () => a))));
                }, tuples)));
                switch (keyType.tag) {
                    case 6:
                    case 2:
                    case 7: {
                        return ofList(pairs, {
                            Compare: comparePrimitives,
                        });
                    }
                    default: {
                        return ofList(pairs, {
                            Compare: compare,
                        });
                    }
                }
            }
            case 62: {
                const patternInput_8 = getTypes_7();
                const keyType_1 = patternInput_8[0];
                const pairs_1 = toList(delay(() => collect((keyValuePair_1) => singleton_1(Convert_fromJsonAs(keyValuePair_1, new TypeInfo(32, () => [keyType_1, patternInput_8[1]]))), tuples_1)));
                const output = (keyType_1.tag === 40) ? (new Dictionary([], {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) : ((keyType_1.tag === 39) ? (new Dictionary([], {
                    Equals: equals,
                    GetHashCode: structuralHash,
                })) : (new Dictionary([], {
                    Equals: equals,
                    GetHashCode: structuralHash,
                })));
                const enumerator = getEnumerator(pairs_1);
                try {
                    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                        const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        addToDict(output, forLoopVar[0], forLoopVar[1]);
                    }
                }
                finally {
                    disposeSafe(enumerator);
                }
                return output;
            }
            case 63: {
                const patternInput_9 = getTypes_8();
                const keyType_2 = patternInput_9[0];
                const pairs_2 = map_3((tupledArg_4) => [Convert_fromJsonAs(new Json(1, tupledArg_4[0]), keyType_2), Convert_fromJsonAs(tupledArg_4[1], patternInput_9[1])], toList_1(dict_2));
                const output_1 = (keyType_2.tag === 40) ? (new Dictionary([], {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) : ((keyType_2.tag === 39) ? (new Dictionary([], {
                    Equals: equals,
                    GetHashCode: structuralHash,
                })) : (new Dictionary([], {
                    Equals: equals,
                    GetHashCode: structuralHash,
                })));
                const enumerator_1 = getEnumerator(pairs_2);
                try {
                    while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
                        const forLoopVar_1 = enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                        addToDict(output_1, forLoopVar_1[0], forLoopVar_1[1]);
                    }
                }
                finally {
                    disposeSafe(enumerator_1);
                }
                return output_1;
            }
            case 64: {
                const elemType_1 = getType();
                const hashset = (elemType_1.tag === 40) ? (new HashSet([], {
                    Equals: equals,
                    GetHashCode: safeHash,
                })) : ((elemType_1.tag === 39) ? (new HashSet([], {
                    Equals: equals,
                    GetHashCode: structuralHash,
                })) : (new HashSet([], {
                    Equals: equals,
                    GetHashCode: structuralHash,
                })));
                const enumerator_2 = getEnumerator(items);
                try {
                    while (enumerator_2["System.Collections.IEnumerator.MoveNext"]()) {
                        addToSet(Convert_fromJsonAs(enumerator_2["System.Collections.Generic.IEnumerator`1.get_Current"](), elemType_1), hashset);
                    }
                }
                finally {
                    disposeSafe(enumerator_2);
                }
                return hashset;
            }
            case 65: {
                const patternInput_10 = getTypes_9();
                const valueType_5 = patternInput_10[1];
                const keyType_3 = patternInput_10[0];
                const matchValue_7 = tryFind("comparer", map);
                const matchValue_8 = tryFind("tree", map);
                let matchResult_6, comparer_2, tree_2, comparer_3, tree_3;
                if (matchValue_7 != null) {
                    if (matchValue_7.tag === 5) {
                        if (matchValue_8 != null) {
                            if (matchValue_8.tag === 4) {
                                if ((tree = matchValue_8.fields[0], isEmpty_1(matchValue_7.fields[0]))) {
                                    matchResult_6 = 0;
                                    comparer_2 = matchValue_7.fields[0];
                                    tree_2 = matchValue_8.fields[0];
                                }
                                else {
                                    matchResult_6 = 2;
                                }
                            }
                            else if (matchValue_8.tag === 5) {
                                if ((tree_1 = matchValue_8.fields[0], isEmpty_1(matchValue_7.fields[0]))) {
                                    matchResult_6 = 1;
                                    comparer_3 = matchValue_7.fields[0];
                                    tree_3 = matchValue_8.fields[0];
                                }
                                else {
                                    matchResult_6 = 2;
                                }
                            }
                            else {
                                matchResult_6 = 2;
                            }
                        }
                        else {
                            matchResult_6 = 2;
                        }
                    }
                    else {
                        matchResult_6 = 2;
                    }
                }
                else {
                    matchResult_6 = 2;
                }
                switch (matchResult_6) {
                    case 0: {
                        const matchValue_10 = Convert_generateMap(new Json(4, tree_2));
                        if (matchValue_10 == null) {
                            const inputJson = SimpleJson_toString(new Json(4, tree_2));
                            return toFail(printf("Could not generate map from JSON\n %s"))(inputJson);
                        }
                        else {
                            const pairs_3 = map_3((tupledArg_5) => {
                                const key_6 = tupledArg_5[0];
                                return [(!Convert_isQuoted(key_6)) ? Convert_fromJsonAs(new Json(1, key_6), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_6), keyType_3), Convert_fromJsonAs(tupledArg_5[1], valueType_5)];
                            }, Convert_flattenMap(matchValue_10));
                            switch (keyType_3.tag) {
                                case 6:
                                case 2:
                                case 7: {
                                    return ofList(pairs_3, {
                                        Compare: comparePrimitives,
                                    });
                                }
                                default: {
                                    return ofList(pairs_3, {
                                        Compare: compare,
                                    });
                                }
                            }
                        }
                    }
                    case 1: {
                        input_mut = (new Json(5, ofList(Convert_flatteFable3Map(tree_3), {
                            Compare: comparePrimitives,
                        })));
                        typeInfo_mut = typeInfo;
                        continue Convert_fromJsonAs;
                    }
                    case 2: {
                        const pairs_4 = map_3((tupledArg_6) => {
                            const key_7 = tupledArg_6[0];
                            return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                        }, toList_1(map));
                        switch (keyType_3.tag) {
                            case 6:
                            case 2:
                            case 7: {
                                return ofList(pairs_4, {
                                    Compare: comparePrimitives,
                                });
                            }
                            default: {
                                return ofList(pairs_4, {
                                    Compare: compare,
                                });
                            }
                        }
                    }
                }
            }
            case 66: {
                const arg_61 = fullName(getType_1());
                const arg_60 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
            }
            case 67: {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        break;
    }
}

export function Convert_fromJson(json, typeInfo) {
    return Convert_fromJsonAs(json, typeInfo);
}

export const Convert_quoteText = quote;

export function Convert_serialize(value_mut, typeInfo_mut) {
    let copyOfStruct, copyOfStruct_1, copyOfStruct_2, copyOfStruct_3, copyOfStruct_4;
    Convert_serialize:
    while (true) {
        const value = value_mut, typeInfo = typeInfo_mut;
        switch (typeInfo.tag) {
            case 2: {
                const content = value;
                if (content == null) {
                    return "null";
                }
                else {
                    return Convert_quoteText(content);
                }
            }
            case 0: {
                return "null";
            }
            case 9:
            case 8: {
                if (Number.isNaN(value)) {
                    return Convert_quoteText("NaN");
                }
                else {
                    return value.toString();
                }
            }
            case 1: {
                return Convert_quoteText(value);
            }
            case 13:
            case 14:
            case 3:
            case 4:
            case 11:
            case 38:
            case 20:
            case 6: {
                return int32ToString(value);
            }
            case 5:
            case 12: {
                return Convert_betweenQuotes(toString(value));
            }
            case 19: {
                return Convert_betweenQuotes(toString_1(value));
            }
            case 10: {
                return Convert_betweenQuotes(toString_2(value));
            }
            case 7: {
                if (value) {
                    return "true";
                }
                else {
                    return "false";
                }
            }
            case 21: {
                return Convert_betweenQuotes((copyOfStruct = value, copyOfStruct));
            }
            case 22: {
                return Convert_betweenQuotes(toString_3(value));
            }
            case 15: {
                return Convert_betweenQuotes((copyOfStruct_1 = value, toString_4(copyOfStruct_1, "O")));
            }
            case 16: {
                return Convert_betweenQuotes((copyOfStruct_2 = value, toString_4(copyOfStruct_2, "O")));
            }
            case 17: {
                return int32ToString((copyOfStruct_3 = value, dayNumber(copyOfStruct_3)));
            }
            case 18: {
                return Convert_betweenQuotes(toString((copyOfStruct_4 = value, ticks(copyOfStruct_4))));
            }
            case 39: {
                return ("{" + join(", ", map_2((field) => {
                    const arg_1 = Convert_serialize(getRecordField(value, field.PropertyInfo), field.FieldType);
                    return toText(printf("\"%s\": %s"))(field.FieldName)(arg_1);
                }, typeInfo.fields[0]()[0]))) + "}";
            }
            case 35: {
                const elementType = typeInfo.fields[0]();
                return ("[" + join(", ", map_4((element) => Convert_serialize(element, elementType), value))) + "]";
            }
            case 36: {
                const elementType_1 = typeInfo.fields[0]();
                return ("[" + join(", ", map_4((element_1) => Convert_serialize(element_1, elementType_1), value))) + "]";
            }
            case 29: {
                const elementType_2 = typeInfo.fields[0]();
                return ("[" + join(", ", map_4((element_2) => Convert_serialize(element_2, elementType_2), value))) + "]";
            }
            case 30: {
                const elementType_3 = typeInfo.fields[0]();
                return ("[" + join(", ", map_2((element_3) => Convert_serialize(element_3, elementType_3), value))) + "]";
            }
            case 28: {
                const elementType_4 = typeInfo.fields[0]();
                return ("[" + join(", ", map_3((element_4) => Convert_serialize(element_4, elementType_4), value))) + "]";
            }
            case 31: {
                const elementType_5 = typeInfo.fields[0]();
                return ("[" + join(", ", map_2((element_5) => Convert_serialize(element_5, elementType_5), toArray_1(value)))) + "]";
            }
            case 27: {
                const matchValue = value;
                if (matchValue != null) {
                    value_mut = value_91(matchValue);
                    typeInfo_mut = typeInfo.fields[0]();
                    continue Convert_serialize;
                }
                else {
                    return "null";
                }
            }
            case 40: {
                const patternInput_1 = typeInfo.fields[0]();
                const patternInput_2 = getUnionFields(value, patternInput_1[1]);
                const usedCase = patternInput_2[0];
                const fields = patternInput_2[1];
                const caseTypes = patternInput_1[0].find((case$) => (case$.CaseName === name_2(usedCase))).CaseTypes;
                if (enumUnion(typeInfo) ? true : (caseTypes.length === 0)) {
                    return Convert_betweenQuotes(name_2(usedCase));
                }
                else if (caseTypes.length === 1) {
                    return ((("{" + Convert_betweenQuotes(name_2(usedCase))) + ": ") + Convert_serialize(fields[0], caseTypes[0])) + "}";
                }
                else {
                    const serializedFields_1 = join(", ", mapIndexed((index, caseType) => Convert_serialize(fields[index], caseType), caseTypes));
                    return (((("{" + Convert_betweenQuotes(name_2(usedCase))) + ": ") + "[") + serializedFields_1) + "] }";
                }
            }
            case 33: {
                const patternInput_3 = typeInfo.fields[0]();
                const keyType = patternInput_3[0];
                const serializedValues = join(", ", map_2((tupledArg) => {
                    const serializedKey = Convert_serialize(tupledArg[0], keyType);
                    const serializedValue = Convert_serialize(tupledArg[1], patternInput_3[1]);
                    if (isPrimitive(keyType) ? true : enumUnion(keyType)) {
                        if (!Convert_isQuoted(serializedKey)) {
                            return (Convert_quoteText(serializedKey) + ": ") + serializedValue;
                        }
                        else {
                            return (serializedKey + ": ") + serializedValue;
                        }
                    }
                    else {
                        return ((("[" + serializedKey) + ", ") + serializedValue) + "]";
                    }
                }, toArray_2(value)));
                if (isPrimitive(keyType) ? true : enumUnion(keyType)) {
                    return ("{" + serializedValues) + "}";
                }
                else {
                    return ("[" + serializedValues) + "]";
                }
            }
            case 34: {
                const patternInput_4 = typeInfo.fields[0]();
                const keyType_1 = patternInput_4[0];
                const serializedValues_1 = join(", ", map_4((pair) => {
                    const patternInput_5 = [pair[0], pair[1]];
                    const serializedKey_1 = Convert_serialize(patternInput_5[0], keyType_1);
                    const serializedValue_1 = Convert_serialize(patternInput_5[1], patternInput_4[1]);
                    if (isPrimitive(keyType_1) ? true : enumUnion(keyType_1)) {
                        if (!Convert_isQuoted(serializedKey_1)) {
                            return (Convert_betweenQuotes(serializedKey_1) + ": ") + serializedValue_1;
                        }
                        else {
                            return (serializedKey_1 + ": ") + serializedValue_1;
                        }
                    }
                    else {
                        return ((("[" + serializedKey_1) + ", ") + serializedValue_1) + "]";
                    }
                }, value));
                if (isPrimitive(keyType_1) ? true : enumUnion(keyType_1)) {
                    return ("{" + serializedValues_1) + "}";
                }
                else {
                    return ("[" + serializedValues_1) + "]";
                }
            }
            case 32: {
                const tupleTypes = typeInfo.fields[0]();
                if (tupleTypes.length === 1) {
                    return ("[" + Convert_serialize(value, tupleTypes[0])) + "]";
                }
                else {
                    return ("[" + join(", ", mapIndexed((index_1, element_6) => Convert_serialize(element_6, tupleTypes[index_1]), value))) + "]";
                }
            }
            case 23: {
                return SimpleJson_stringify(value);
            }
            case 24: {
                return SimpleJson_stringify(value);
            }
            default: {
                return "null";
            }
        }
        break;
    }
}

export function Fable_SimpleJson_Json__Json_stringify_Static_4E60E31B(value) {
    if (Convert_isUsingFable3) {
        console.warn(some("It looks like you using the function Json.stringify from Fable.SimpleJson while also using Fable 3 (nagareyama). Please use Json.serialize instead which supports both Fable 3 and Fable 2.x"));
    }
    return SimpleJson_stringify(value);
}

