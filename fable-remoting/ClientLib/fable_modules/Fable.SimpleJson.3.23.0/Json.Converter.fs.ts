import { toArray as toArray_2, isEmpty as isEmpty_1, find, count, containsKey, toList as toList_1, tryFind, FSharpMap, remove, ofList } from "../fable-library.4.0.0-theta-001/Map.js";
import { map as map_3, choose, tryFind as tryFind_2, toArray, length, tail as tail_1, head, isEmpty, List, empty, singleton, ofArray } from "../fable-library.4.0.0-theta-001/List.js";
import { int32ToString, compare, disposeSafe, getEnumerator, structuralHash, safeHash, equals, comparePrimitives } from "../fable-library.4.0.0-theta-001/Util.js";
import { tryParse, parse as parse_1, int32 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { toString as toString_3, FSharpRef, Union } from "../fable-library.4.0.0-theta-001/Types.js";
import { getUnionFields, getRecordField, makeRecord, fullName, makeUnion, name as name_2, union_type, string_type, TypeInfo } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { Json, Json$reflection } from "./Json.fs.js";
import { toArray as toArray_1, map as map_4, collect, tryFind as tryFind_3, forAll, empty as empty_1, singleton as singleton_1, append, delay, toList } from "../fable-library.4.0.0-theta-001/Seq.js";
import { some, value as value_91, Option, map as map_1 } from "../fable-library.4.0.0-theta-001/Option.js";
import { RecordField, UnionCase, TypeInfo as TypeInfo_1 } from "./TypeInfo.fs.js";
import { toText, join, fromBase64String, printf, toFail, substring, endsWith } from "../fable-library.4.0.0-theta-001/String.js";
import { parse } from "../fable-library.4.0.0-theta-001/Double.js";
import { Uri } from "../fable-library.4.0.0-theta-001/Uri.js";
import { toString as toString_2 } from "../fable-library.4.0.0-theta-001/Decimal.js";
import Decimal from "../fable-library.4.0.0-theta-001/Decimal.js";
import { toString, fromInteger, toNumber, fromNumber, int64, tryParse as tryParse_1, fromInt, parse as parse_2 } from "../fable-library.4.0.0-theta-001/Long.js";
import { SimpleJson_stringify, SimpleJson_parseNative, SimpleJson_parse, SimpleJson_toString, SimpleJson_toPlainObject } from "./SimpleJson.fs.js";
import { toString as toString_1, fromInt32, parse as parse_3 } from "../fable-library.4.0.0-theta-001/BigInt.js";
import { toString as toString_4, parse as parse_4 } from "../fable-library.4.0.0-theta-001/Date.js";
import { parse as parse_5 } from "../fable-library.4.0.0-theta-001/DateOffset.js";
import DateOffset from "../fable-library.4.0.0-theta-001/DateOffset.js";
import { dayNumber, fromDayNumber } from "../fable-library.4.0.0-theta-001/DateOnly.js";
import { create } from "../fable-library.4.0.0-theta-001/TimeOnly.js";
import { parse as parse_6 } from "../fable-library.4.0.0-theta-001/Guid.js";
import { concat, equalsWith, mapIndexed, zip, map as map_2, tryFind as tryFind_1 } from "../fable-library.4.0.0-theta-001/Array.js";
import { getBytesInt32, toInt64 } from "../fable-library.4.0.0-theta-001/BitConverter.js";
import { Dictionary } from "../fable-library.4.0.0-theta-001/MutableMap.js";
import { FSharpResult$2 } from "../fable-library.4.0.0-theta-001/Fable.Core.js";
import { addToSet, addToDict } from "../fable-library.4.0.0-theta-001/MapUtil.js";
import { enumUnion, isPrimitive } from "./TypeInfo.Converter.fs.js";
import { ofList as ofList_1 } from "../fable-library.4.0.0-theta-001/Set.js";
import { HashSet } from "../fable-library.4.0.0-theta-001/MutableSet.js";
import quote from "./quote.js";
import { ticks } from "../fable-library.4.0.0-theta-001/TimeSpan.js";

export const Convert_insideBrowser = (new Function("try {return this===window;}catch(e){ return false;}"))();

function Convert_isDefined(value: any): boolean {
    return !((value === undefined));
}

export function Convert_usingFable3(): boolean {
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
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["MapEmpty", "MapOne", "MapNode"];
    }
}

export function Convert_InternalMap$reflection(): TypeInfo {
    return union_type("Fable.SimpleJson.Convert.InternalMap", [], Convert_InternalMap, () => [[], [["Item1", string_type], ["Item2", Json$reflection()]], [["Item1", string_type], ["Item2", Json$reflection()], ["Item3", Convert_InternalMap$reflection()], ["Item4", Convert_InternalMap$reflection()]]]);
}

export function Convert_flattenMap(_arg: Convert_InternalMap): List<[string, Json]> {
    switch (_arg.tag) {
        case 1: {
            return singleton([_arg.fields[0], _arg.fields[1]]);
        }
        case 2: {
            return toList(delay((): IterableIterator<[string, Json]> => append(Convert_flattenMap(_arg.fields[2]), delay((): IterableIterator<[string, Json]> => append(Convert_flattenMap(_arg.fields[3]), delay((): IterableIterator<[string, Json]> => singleton_1([_arg.fields[0], _arg.fields[1]])))))));
        }
        default: {
            return empty();
        }
    }
}

export function Convert_$007CKeyValue$007C_$007C(key: string, map: FSharpMap<string, Json>): Option<[string, Json, FSharpMap<string, Json>]> {
    return map_1((value: Json): [string, Json, FSharpMap<string, Json>] => [key, value, remove(key, map)], tryFind(key, map));
}

export function Convert_$007CNonArray$007C_$007C(_arg: Json): Option<Json> {
    if (_arg.tag === 4) {
        return void 0;
    }
    else {
        return _arg;
    }
}

export function Convert_$007CMapEmpty$007C_$007C(json: Json): Option<Json> {
    if (json.tag === 1) {
        if (json.fields[0] === "MapEmpty") {
            return json;
        }
        else {
            return void 0;
        }
    }
    else {
        return void 0;
    }
}

export function Convert_$007CMapKey$007C_$007C(_arg: Json): Option<string> {
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

export function Convert_$007CMapOne$007C_$007C(_arg: Json): Option<[string, Json]> {
    if (_arg.tag === 4) {
        if (!isEmpty(_arg.fields[0])) {
            if (head(_arg.fields[0]).tag === 1) {
                if (head(_arg.fields[0]).fields[0] === "MapOne") {
                    if (!isEmpty(tail_1(_arg.fields[0]))) {
                        const activePatternResult = Convert_$007CMapKey$007C_$007C(head(tail_1(_arg.fields[0])));
                        if (activePatternResult != null) {
                            if (!isEmpty(tail_1(tail_1(_arg.fields[0])))) {
                                if (isEmpty(tail_1(tail_1(tail_1(_arg.fields[0]))))) {
                                    const key = value_91(activePatternResult);
                                    return [key, head(tail_1(tail_1(_arg.fields[0])))];
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
}

export function Convert_$007CMapNode$007C_$007C(_arg: Json): Option<[string, Json, Json, Json]> {
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
                                                    const key = value_91(activePatternResult);
                                                    return [key, head(tail_1(tail_1(_arg.fields[0]))), head(tail_1(tail_1(tail_1(_arg.fields[0])))), head(tail_1(tail_1(tail_1(tail_1(_arg.fields[0])))))];
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
}

export function Convert_generateMap(json: Json): Option<Convert_InternalMap> {
    if (Convert_$007CMapEmpty$007C_$007C(json) != null) {
        return new Convert_InternalMap(0);
    }
    else {
        const activePatternResult_1 = Convert_$007CMapOne$007C_$007C(json);
        if (activePatternResult_1 != null) {
            const key = value_91(activePatternResult_1)[0];
            const value = value_91(activePatternResult_1)[1];
            return new Convert_InternalMap(1, key, value);
        }
        else {
            const activePatternResult_2 = Convert_$007CMapNode$007C_$007C(json);
            if (activePatternResult_2 != null) {
                const key_1 = value_91(activePatternResult_2)[0];
                const left = value_91(activePatternResult_2)[2];
                const right = value_91(activePatternResult_2)[3];
                const value_1 = value_91(activePatternResult_2)[1];
                const matchValue = Convert_generateMap(left);
                const matchValue_1 = Convert_generateMap(right);
                if (matchValue != null) {
                    if (matchValue_1 != null) {
                        const leftMap = value_91(matchValue);
                        const rightMap = value_91(matchValue_1);
                        return new Convert_InternalMap(2, key_1, value_1, leftMap, rightMap);
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
    }
}

export function Convert_flatteFable3Map(tree: FSharpMap<string, Json>): List<[string, Json]> {
    return toList(delay((): IterableIterator<[string, Json]> => {
        let matchValue: Option<Json>, matchValue_1: Option<Json>, key: string, value: Json;
        return append((matchValue = tryFind("k", tree), (matchValue_1 = tryFind("v", tree), (matchValue != null) ? ((value_91(matchValue).tag === 1) ? ((matchValue_1 != null) ? ((key = value_91(matchValue).fields[0], (value = value_91(matchValue_1), singleton_1([key, value])))) : ((empty_1()))) : ((empty_1()))) : ((empty_1())))), delay((): IterableIterator<[string, Json]> => {
            let matchValue_3: Option<Json>, left: FSharpMap<string, Json>;
            return append((matchValue_3 = tryFind("left", tree), (matchValue_3 != null) ? ((value_91(matchValue_3).tag === 5) ? ((left = value_91(matchValue_3).fields[0], Convert_flatteFable3Map(left))) : ((empty_1()))) : ((empty_1()))), delay((): IterableIterator<[string, Json]> => {
                const matchValue_4 = tryFind("right", tree);
                if (matchValue_4 != null) {
                    if (value_91(matchValue_4).tag === 5) {
                        const right = value_91(matchValue_4).fields[0];
                        return Convert_flatteFable3Map(right);
                    }
                    else {
                        return empty_1();
                    }
                }
                else {
                    return empty_1();
                }
            }));
        }));
    }));
}

export function Convert_flattenFable3Lists(linkedList: FSharpMap<string, Json>): List<Json> {
    return toList(delay((): IterableIterator<Json> => {
        let matchValue: Option<Json>;
        return append((matchValue = tryFind("head", linkedList), (matchValue == null) ? ((empty_1())) : singleton_1(value_91(matchValue))), delay((): IterableIterator<Json> => {
            const matchValue_1 = tryFind("tail", linkedList);
            if (matchValue_1 != null) {
                if (value_91(matchValue_1).tag === 5) {
                    const tail = value_91(matchValue_1).fields[0];
                    return Convert_flattenFable3Lists(tail);
                }
                else {
                    return empty_1();
                }
            }
            else {
                return empty_1();
            }
        }));
    }));
}

export function Convert_arrayLike(_arg: TypeInfo_1): boolean {
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

export function Convert_isRecord(_arg: TypeInfo_1): boolean {
    if (_arg.tag === 39) {
        return true;
    }
    else {
        return false;
    }
}

export function Convert_unionOfRecords(_arg: TypeInfo_1): boolean {
    if (_arg.tag === 40) {
        return forAll((case$: UnionCase): boolean => {
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

export function Convert_optional(_arg: TypeInfo_1): boolean {
    if (_arg.tag === 27) {
        return true;
    }
    else {
        return false;
    }
}

export function Convert_isQuoted(input: string): boolean {
    if (input.indexOf("\"") === 0) {
        return endsWith(input, "\"");
    }
    else {
        return false;
    }
}

export function Convert_betweenQuotes(input: string): string {
    return ("\"" + input) + "\"";
}

export function Convert_removeQuotes(input: string): string {
    return substring(input, 1, input.length - 2);
}

export function Convert_fromJsonAs(input_mut: Json, typeInfo_mut: TypeInfo_1): any {
    let foundCase: UnionCase, foundCase_1: UnionCase, testExpr: Array<TypeInfo_1>, values_8: List<[string, Json]>, tree: List<Json>, tree_1: FSharpMap<string, Json>;
    Convert_fromJsonAs:
    while (true) {
        const input: Json = input_mut, typeInfo: TypeInfo_1 = typeInfo_mut;
        if (input.tag === 1) {
            if (typeInfo.tag === 9) {
                if (input.fields[0].toLocaleLowerCase() === "nan") {
                    return NaN;
                }
                else {
                    return parse(input.fields[0]);
                }
            }
            else if (typeInfo.tag === 8) {
                if (input.fields[0].toLocaleLowerCase() === "nan") {
                    return NaN;
                }
                else {
                    return parse(input.fields[0]);
                }
            }
            else if (typeInfo.tag === 6) {
                return parse_1(input.fields[0], 511, false, 32);
            }
            else if (typeInfo.tag === 1) {
                return input.fields[0];
            }
            else if (typeInfo.tag === 2) {
                return input.fields[0];
            }
            else if (typeInfo.tag === 22) {
                return Uri.create(input.fields[0]);
            }
            else if (typeInfo.tag === 10) {
                return new Decimal(input.fields[0]);
            }
            else if (typeInfo.tag === 11) {
                return parse_1(input.fields[0], 511, false, 16);
            }
            else if (typeInfo.tag === 3) {
                return parse_1(input.fields[0], 511, true, 16);
            }
            else if (typeInfo.tag === 4) {
                return parse_1(input.fields[0], 511, true, 32);
            }
            else if (typeInfo.tag === 5) {
                return parse_2(input.fields[0], 511, true, 64);
            }
            else if (typeInfo.tag === 38) {
                const patternInput = typeInfo.fields[0]();
                const underlyingType = patternInput[0];
                const originalType = patternInput[1];
                switch (underlyingType.tag) {
                    case 6: {
                        let matchValue_1;
                        let outArg = 0;
                        matchValue_1 = [tryParse(input.fields[0], 511, false, 32, new FSharpRef((): int32 => outArg, (v: int32): void => {
                            outArg = (v | 0);
                        })), outArg];
                        if (matchValue_1[0]) {
                            return matchValue_1[1];
                        }
                        else {
                            const arg_1 = name_2(originalType);
                            return toFail(printf("The value \'%s\' is not valid for enum of type \'%s\'"))(input.fields[0])(arg_1);
                        }
                    }
                    case 12: {
                        let matchValue_2;
                        let outArg_1 = fromInt(0);
                        matchValue_2 = [tryParse_1(input.fields[0], 511, false, 64, new FSharpRef((): int64 => outArg_1, (v_1: int64): void => {
                            outArg_1 = v_1;
                        })), outArg_1];
                        if (matchValue_2[0]) {
                            return matchValue_2[1];
                        }
                        else {
                            const arg_3 = name_2(originalType);
                            return toFail(printf("The value \'%s\' is not valid for enum of type \'%s\'"))(input.fields[0])(arg_3);
                        }
                    }
                    default: {
                        const arg_5 = name_2(originalType);
                        return toFail(printf("The value \'%s\' cannot be converted to enum of type \'%s\'"))(input.fields[0])(arg_5);
                    }
                }
            }
            else if (typeInfo.tag === 30) {
                const elemType = typeInfo.fields[0]();
                if (elemType.tag === 13) {
                    if ((typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? true : Convert_insideBrowser) {
                        return fromBase64String(input.fields[0]);
                    }
                    else {
                        return Array.prototype.slice.call(Buffer.from(input.fields[0], 'base64'));
                    }
                }
                else {
                    return toFail(printf("Cannot convert arbitrary string \'%s\' to %A"))(input.fields[0])(elemType);
                }
            }
            else if (typeInfo.tag === 23) {
                return SimpleJson_toPlainObject(input);
            }
            else if (typeInfo.tag === 12) {
                return parse_2(input.fields[0], 511, false, 64);
            }
            else if (typeInfo.tag === 13) {
                return parse_1(input.fields[0], 511, true, 8);
            }
            else if (typeInfo.tag === 14) {
                return parse_1(input.fields[0], 511, false, 8);
            }
            else if (typeInfo.tag === 19) {
                return parse_3(input.fields[0]);
            }
            else if (typeInfo.tag === 15) {
                return parse_4(input.fields[0]);
            }
            else if (typeInfo.tag === 16) {
                return parse_5(input.fields[0]);
            }
            else if (typeInfo.tag === 17) {
                return fromDayNumber(parse_1(input.fields[0], 511, false, 32));
            }
            else if (typeInfo.tag === 18) {
                return create(parse_2(input.fields[0], 511, false, 64));
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    return (some)(Convert_fromJsonAs(input, typeInfo.fields[0]()));
                }
                else {
                    const arg_63 = JSON.stringify(typeInfo);
                    const arg_62 = SimpleJson_toString(input);
                    return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
                }
            }
            else if (typeInfo.tag === 21) {
                return parse_6(input.fields[0]);
            }
            else if (typeInfo.tag === 40) {
                if (Convert_isQuoted(input.fields[0])) {
                    const patternInput_3 = typeInfo.fields[0]();
                    const caseTypes = patternInput_3[0];
                    const _arg_3 = tryFind_1((case$_6: UnionCase): boolean => (case$_6.CaseName === Convert_removeQuotes(input.fields[0])), caseTypes);
                    if (_arg_3 == null) {
                        const expectedCases_2 = join(", ", map_2((case$_7: UnionCase): string => toText(printf(" \'%s\' "))(case$_7.CaseName), caseTypes));
                        const arg_34 = name_2(patternInput_3[1]);
                        return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(input.fields[0])(arg_34)(expectedCases_2);
                    }
                    else {
                        return makeUnion(value_91(_arg_3).Info, []);
                    }
                }
                else {
                    const patternInput_4 = typeInfo.fields[0]();
                    const caseTypes_1 = patternInput_4[0];
                    const _arg_4 = tryFind_1((case$_8: UnionCase): boolean => (case$_8.CaseName === input.fields[0]), caseTypes_1);
                    if (_arg_4 == null) {
                        const expectedCases_3 = join(", ", map_2((case$_9: UnionCase): string => toText(printf(" \'%s\' "))(case$_9.CaseName), caseTypes_1));
                        const arg_38 = name_2(patternInput_4[1]);
                        return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(input.fields[0])(arg_38)(expectedCases_3);
                    }
                    else {
                        return makeUnion(value_91(_arg_4).Info, []);
                    }
                }
            }
            else if (typeInfo.tag === 39) {
                input_mut = SimpleJson_parse(input.fields[0]);
                typeInfo_mut = typeInfo;
                continue Convert_fromJsonAs;
            }
            else if (typeInfo.tag === 24) {
                const arg_61 = fullName(typeInfo.fields[0]());
                const arg_60 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
            }
            else {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        else if (input.tag === 2) {
            if (typeInfo.tag === 7) {
                return input.fields[0];
            }
            else if (typeInfo.tag === 23) {
                return SimpleJson_toPlainObject(input);
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    return (some)(Convert_fromJsonAs(input, typeInfo.fields[0]()));
                }
                else {
                    const arg_63 = JSON.stringify(typeInfo);
                    const arg_62 = SimpleJson_toString(input);
                    return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
                }
            }
            else if (typeInfo.tag === 24) {
                const arg_61 = fullName(typeInfo.fields[0]());
                const arg_60 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
            }
            else {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        else if (input.tag === 3) {
            if (typeInfo.tag === 2) {
                return null;
            }
            else if (typeInfo.tag === 0) {
                return void 0;
            }
            else if (typeInfo.tag === 23) {
                return SimpleJson_toPlainObject(input);
            }
            else if (typeInfo.tag === 27) {
                return void 0;
            }
            else if (typeInfo.tag === 24) {
                const arg_61 = fullName(typeInfo.fields[0]());
                const arg_60 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
            }
            else {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        else if (input.tag === 5) {
            if (typeInfo.tag === 23) {
                return SimpleJson_toPlainObject(input);
            }
            else if (typeInfo.tag === 40) {
                const patternInput_2 = typeInfo.fields[0]();
                const unionType = patternInput_2[1];
                const cases = patternInput_2[0];
                const matchValue_3 = toList_1(input.fields[0]);
                if (!isEmpty(matchValue_3)) {
                    if (head(matchValue_3)[1].tag === 4) {
                        if (isEmpty(tail_1(matchValue_3))) {
                            const _arg = tryFind_1((case$: UnionCase): boolean => (case$.CaseName === head(matchValue_3)[0]), cases);
                            if (_arg != null) {
                                if ((foundCase = value_91(_arg), (foundCase.CaseTypes.length === 1) && Convert_arrayLike(foundCase.CaseTypes[0]))) {
                                    const foundCase_2 = value_91(_arg);
                                    return makeUnion(foundCase_2.Info, [Convert_fromJsonAs(new Json(4, head(matchValue_3)[1].fields[0]), foundCase_2.CaseTypes[0])]);
                                }
                                else if ((foundCase_1 = value_91(_arg), (foundCase_1.CaseTypes.length === 1) && Convert_optional(foundCase_1.CaseTypes[0]))) {
                                    const foundCase_3 = value_91(_arg);
                                    return makeUnion(foundCase_3.Info, [Convert_fromJsonAs(new Json(4, head(matchValue_3)[1].fields[0]), foundCase_3.CaseTypes[0])]);
                                }
                                else {
                                    const foundCase_4 = value_91(_arg);
                                    if (((foundCase_4.CaseTypes.length === 1) && (!Convert_arrayLike(foundCase_4.CaseTypes[0]))) && (foundCase_4.CaseTypes.length !== length(head(matchValue_3)[1].fields[0]))) {
                                        const arg_14 = length(head(matchValue_3)[1].fields[0]) | 0;
                                        const arg_13 = foundCase_4.CaseTypes.length | 0;
                                        toFail(printf("Expected case \'%s\' to have %d argument types but the JSON data only contained %d values"))(foundCase_4.CaseName)(arg_13)(arg_14);
                                    }
                                    return makeUnion(foundCase_4.Info, map_2((tupledArg: [TypeInfo_1, Json]): any => Convert_fromJsonAs(tupledArg[1], tupledArg[0]), zip(foundCase_4.CaseTypes, toArray(head(matchValue_3)[1].fields[0]))));
                                }
                            }
                            else {
                                const expectedCases = join(", ", map_2((case$_1: UnionCase): string => toText(printf(" \'%s\' "))(case$_1.CaseName), cases));
                                const arg_10 = name_2(unionType);
                                return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(head(matchValue_3)[0])(arg_10)(expectedCases);
                            }
                        }
                        else if ((containsKey("tag", input.fields[0]) && containsKey("fields", input.fields[0])) && (count(input.fields[0]) === 2)) {
                            const matchValue_4 = tryFind("tag", input.fields[0]);
                            const matchValue_5 = tryFind("fields", input.fields[0]);
                            if (matchValue_4 != null) {
                                if (value_91(matchValue_4).tag === 0) {
                                    if (matchValue_5 != null) {
                                        if (value_91(matchValue_5).tag === 4) {
                                            const caseIndex = value_91(matchValue_4).fields[0];
                                            const fieldValues = value_91(matchValue_5).fields[0];
                                            const foundCase_5 = cases[~(~caseIndex)];
                                            return makeUnion(foundCase_5.Info, mapIndexed((index: int32, value_48: Json): any => Convert_fromJsonAs(value_48, foundCase_5.CaseTypes[index]), toArray(fieldValues)));
                                        }
                                        else {
                                            const arg_22 = fullName(unionType);
                                            const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                            return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                        }
                                    }
                                    else {
                                        const arg_22 = fullName(unionType);
                                        const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                        return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                    }
                                }
                                else {
                                    const arg_22 = fullName(unionType);
                                    const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                    return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                }
                            }
                            else {
                                const arg_22 = fullName(unionType);
                                const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                            }
                        }
                        else if (Convert_unionOfRecords(typeInfo)) {
                            const foundDiscriminatorKey = tryFind_2((keyword: string): boolean => containsKey(keyword, input.fields[0]), ofArray(["__typename", "$typename", "$type"]));
                            if (foundDiscriminatorKey != null) {
                                const discriminatorValueJson = find(value_91(foundDiscriminatorKey), input.fields[0]);
                                if (discriminatorValueJson.tag === 1) {
                                    const discriminatorValue = discriminatorValueJson.fields[0];
                                    const foundUnionCase = tryFind_3((case$_4: UnionCase): boolean => (case$_4.CaseName.toUpperCase() === discriminatorValue.toUpperCase()), cases);
                                    if (foundUnionCase != null) {
                                        const case$_5 = value_91(foundUnionCase);
                                        return makeUnion(case$_5.Info, [Convert_fromJsonAs(new Json(5, input.fields[0]), case$_5.CaseTypes[0])]);
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
                    else {
                        const activePatternResult = Convert_$007CNonArray$007C_$007C(head(matchValue_3)[1]);
                        if (activePatternResult != null) {
                            if (isEmpty(tail_1(matchValue_3))) {
                                const json = value_91(activePatternResult);
                                const _arg_1 = tryFind_1((case$_2: UnionCase): boolean => (case$_2.CaseName === head(matchValue_3)[0]), cases);
                                if (_arg_1 != null) {
                                    if ((testExpr = value_91(_arg_1).CaseTypes, (!equalsWith(equals, testExpr, null)) && (testExpr.length === 1))) {
                                        const caseInfo = value_91(_arg_1).Info;
                                        const caseName_3 = value_91(_arg_1).CaseName;
                                        const caseType = value_91(_arg_1).CaseTypes[0];
                                        return makeUnion(caseInfo, [((input_1: Json): (arg0: TypeInfo_1) => any => ((typeInfo_1: TypeInfo_1): any => Convert_fromJsonAs(input_1, typeInfo_1)))(json)(caseType)]);
                                    }
                                    else {
                                        const expectedCases_1 = join(", ", map_2((case$_3: UnionCase): string => toText(printf(" \'%s\' "))(case$_3.CaseName), cases));
                                        const arg_19 = name_2(unionType);
                                        return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(head(matchValue_3)[0])(arg_19)(expectedCases_1);
                                    }
                                }
                                else {
                                    const expectedCases_1 = join(", ", map_2((case$_3: UnionCase): string => toText(printf(" \'%s\' "))(case$_3.CaseName), cases));
                                    const arg_19 = name_2(unionType);
                                    return toFail(printf("Case %s was not valid for type \'%s\', expected one of the cases [%s]"))(head(matchValue_3)[0])(arg_19)(expectedCases_1);
                                }
                            }
                            else if ((containsKey("tag", input.fields[0]) && containsKey("fields", input.fields[0])) && (count(input.fields[0]) === 2)) {
                                const matchValue_4 = tryFind("tag", input.fields[0]);
                                const matchValue_5 = tryFind("fields", input.fields[0]);
                                if (matchValue_4 != null) {
                                    if (value_91(matchValue_4).tag === 0) {
                                        if (matchValue_5 != null) {
                                            if (value_91(matchValue_5).tag === 4) {
                                                const caseIndex = value_91(matchValue_4).fields[0];
                                                const fieldValues = value_91(matchValue_5).fields[0];
                                                const foundCase_5 = cases[~(~caseIndex)];
                                                return makeUnion(foundCase_5.Info, mapIndexed((index: int32, value_48: Json): any => Convert_fromJsonAs(value_48, foundCase_5.CaseTypes[index]), toArray(fieldValues)));
                                            }
                                            else {
                                                const arg_22 = fullName(unionType);
                                                const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                                return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                            }
                                        }
                                        else {
                                            const arg_22 = fullName(unionType);
                                            const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                            return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                        }
                                    }
                                    else {
                                        const arg_22 = fullName(unionType);
                                        const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                        return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                    }
                                }
                                else {
                                    const arg_22 = fullName(unionType);
                                    const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                    return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                }
                            }
                            else if (Convert_unionOfRecords(typeInfo)) {
                                const foundDiscriminatorKey = tryFind_2((keyword: string): boolean => containsKey(keyword, input.fields[0]), ofArray(["__typename", "$typename", "$type"]));
                                if (foundDiscriminatorKey != null) {
                                    const discriminatorValueJson = find(value_91(foundDiscriminatorKey), input.fields[0]);
                                    if (discriminatorValueJson.tag === 1) {
                                        const discriminatorValue = discriminatorValueJson.fields[0];
                                        const foundUnionCase = tryFind_3((case$_4: UnionCase): boolean => (case$_4.CaseName.toUpperCase() === discriminatorValue.toUpperCase()), cases);
                                        if (foundUnionCase != null) {
                                            const case$_5 = value_91(foundUnionCase);
                                            return makeUnion(case$_5.Info, [Convert_fromJsonAs(new Json(5, input.fields[0]), case$_5.CaseTypes[0])]);
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
                        else if ((containsKey("tag", input.fields[0]) && containsKey("fields", input.fields[0])) && (count(input.fields[0]) === 2)) {
                            const matchValue_4 = tryFind("tag", input.fields[0]);
                            const matchValue_5 = tryFind("fields", input.fields[0]);
                            if (matchValue_4 != null) {
                                if (value_91(matchValue_4).tag === 0) {
                                    if (matchValue_5 != null) {
                                        if (value_91(matchValue_5).tag === 4) {
                                            const caseIndex = value_91(matchValue_4).fields[0];
                                            const fieldValues = value_91(matchValue_5).fields[0];
                                            const foundCase_5 = cases[~(~caseIndex)];
                                            return makeUnion(foundCase_5.Info, mapIndexed((index: int32, value_48: Json): any => Convert_fromJsonAs(value_48, foundCase_5.CaseTypes[index]), toArray(fieldValues)));
                                        }
                                        else {
                                            const arg_22 = fullName(unionType);
                                            const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                            return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                        }
                                    }
                                    else {
                                        const arg_22 = fullName(unionType);
                                        const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                        return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                    }
                                }
                                else {
                                    const arg_22 = fullName(unionType);
                                    const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                    return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                }
                            }
                            else {
                                const arg_22 = fullName(unionType);
                                const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                            }
                        }
                        else if (Convert_unionOfRecords(typeInfo)) {
                            const foundDiscriminatorKey = tryFind_2((keyword: string): boolean => containsKey(keyword, input.fields[0]), ofArray(["__typename", "$typename", "$type"]));
                            if (foundDiscriminatorKey != null) {
                                const discriminatorValueJson = find(value_91(foundDiscriminatorKey), input.fields[0]);
                                if (discriminatorValueJson.tag === 1) {
                                    const discriminatorValue = discriminatorValueJson.fields[0];
                                    const foundUnionCase = tryFind_3((case$_4: UnionCase): boolean => (case$_4.CaseName.toUpperCase() === discriminatorValue.toUpperCase()), cases);
                                    if (foundUnionCase != null) {
                                        const case$_5 = value_91(foundUnionCase);
                                        return makeUnion(case$_5.Info, [Convert_fromJsonAs(new Json(5, input.fields[0]), case$_5.CaseTypes[0])]);
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
                else if ((containsKey("tag", input.fields[0]) && containsKey("fields", input.fields[0])) && (count(input.fields[0]) === 2)) {
                    const matchValue_4 = tryFind("tag", input.fields[0]);
                    const matchValue_5 = tryFind("fields", input.fields[0]);
                    if (matchValue_4 != null) {
                        if (value_91(matchValue_4).tag === 0) {
                            if (matchValue_5 != null) {
                                if (value_91(matchValue_5).tag === 4) {
                                    const caseIndex = value_91(matchValue_4).fields[0];
                                    const fieldValues = value_91(matchValue_5).fields[0];
                                    const foundCase_5 = cases[~(~caseIndex)];
                                    return makeUnion(foundCase_5.Info, mapIndexed((index: int32, value_48: Json): any => Convert_fromJsonAs(value_48, foundCase_5.CaseTypes[index]), toArray(fieldValues)));
                                }
                                else {
                                    const arg_22 = fullName(unionType);
                                    const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                    return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                                }
                            }
                            else {
                                const arg_22 = fullName(unionType);
                                const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                                return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                            }
                        }
                        else {
                            const arg_22 = fullName(unionType);
                            const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                            return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                        }
                    }
                    else {
                        const arg_22 = fullName(unionType);
                        const arg_21 = SimpleJson_toString(new Json(5, input.fields[0]));
                        return toFail(printf("Could not deserialize JSON(%s) into type %s"))(arg_21)(arg_22);
                    }
                }
                else if (Convert_unionOfRecords(typeInfo)) {
                    const foundDiscriminatorKey = tryFind_2((keyword: string): boolean => containsKey(keyword, input.fields[0]), ofArray(["__typename", "$typename", "$type"]));
                    if (foundDiscriminatorKey != null) {
                        const discriminatorValueJson = find(value_91(foundDiscriminatorKey), input.fields[0]);
                        if (discriminatorValueJson.tag === 1) {
                            const discriminatorValue = discriminatorValueJson.fields[0];
                            const foundUnionCase = tryFind_3((case$_4: UnionCase): boolean => (case$_4.CaseName.toUpperCase() === discriminatorValue.toUpperCase()), cases);
                            if (foundUnionCase != null) {
                                const case$_5 = value_91(foundUnionCase);
                                return makeUnion(case$_5.Info, [Convert_fromJsonAs(new Json(5, input.fields[0]), case$_5.CaseTypes[0])]);
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
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    return (some)(Convert_fromJsonAs(input, typeInfo.fields[0]()));
                }
                else {
                    const arg_63 = JSON.stringify(typeInfo);
                    const arg_62 = SimpleJson_toString(input);
                    return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
                }
            }
            else if (typeInfo.tag === 12) {
                const get$ = (key: string): Option<Json> => tryFind(key, input.fields[0]);
                const _arg_2 = choose((x_1: Option<Json>): Option<Json> => x_1, ofArray([get$("low"), get$("high"), get$("unsigned")]));
                if (!isEmpty(_arg_2)) {
                    if (head(_arg_2).tag === 0) {
                        if (!isEmpty(tail_1(_arg_2))) {
                            if (head(tail_1(_arg_2)).tag === 0) {
                                if (!isEmpty(tail_1(tail_1(_arg_2)))) {
                                    if (head(tail_1(tail_1(_arg_2))).tag === 2) {
                                        if (isEmpty(tail_1(tail_1(tail_1(_arg_2))))) {
                                            return toInt64(concat([Array.from(getBytesInt32(~(~head(_arg_2).fields[0]))), Array.from(getBytesInt32(~(~head(tail_1(_arg_2)).fields[0])))]), 0);
                                        }
                                        else {
                                            return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                                        }
                                    }
                                    else {
                                        return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                                    }
                                }
                                else {
                                    return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                                }
                            }
                            else {
                                return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                            }
                        }
                        else {
                            return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                        }
                    }
                    else {
                        return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                    }
                }
                else {
                    return toFail(printf("Unable to construct int64 from object literal { low: int, high: int, unsigned: bool }"));
                }
            }
            else if (typeInfo.tag === 28) {
                const elementType_2 = typeInfo.fields[0]();
                return map_3((value_59: Json): any => Convert_fromJsonAs(value_59, elementType_2), Convert_flattenFable3Lists(input.fields[0]));
            }
            else if (typeInfo.tag === 39) {
                const patternInput_6 = typeInfo.fields[0]();
                const recordType = patternInput_6[1];
                const fields = patternInput_6[0];
                return makeRecord(recordType, (values_8 = toList_1(input.fields[0]), map_2((_arg_8: RecordField): any => {
                    let list_10: List<[string, Json]>, f2: [string, Json], clo_48: (arg0: string) => string;
                    const fieldType = _arg_8.FieldType;
                    const fieldName = _arg_8.FieldName;
                    const _arg_9 = tryFind_2((tupledArg_3: [string, Json]): boolean => (fieldName === tupledArg_3[0]), values_8);
                    if (_arg_9 == null) {
                        if (fieldType.tag === 27) {
                            return void 0;
                        }
                        else {
                            let dictKeys;
                            const arg_51 = join(", ", (list_10 = toList_1(input.fields[0]), map_3((f2 = ((clo_48 = toText(printf("\'%s\'")), clo_48)), (arg_50: [string, Json]): string => f2(arg_50[0])), list_10)));
                            dictKeys = toText(printf("[ %s ]"))(arg_51);
                            let recordFields;
                            const arg_54 = join(", ", map_2((_arg_10: RecordField): string => {
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
                        const key_2 = value_91(_arg_9)[0];
                        return Convert_fromJsonAs(value_91(_arg_9)[1], fieldType);
                    }
                }, fields)));
            }
            else if (typeInfo.tag === 34) {
                const patternInput_9 = typeInfo.fields[0]();
                const keyType_2 = patternInput_9[0];
                const pairs_2 = map_3((tupledArg_4: [string, Json]): [any, any] => [Convert_fromJsonAs(new Json(1, tupledArg_4[0]), keyType_2), Convert_fromJsonAs(tupledArg_4[1], patternInput_9[1])], toList_1(input.fields[0]));
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
            else if (typeInfo.tag === 33) {
                const patternInput_10 = typeInfo.fields[0]();
                const valueType_5 = patternInput_10[1];
                const keyType_3 = patternInput_10[0];
                const matchValue_7 = tryFind("comparer", input.fields[0]);
                const matchValue_8 = tryFind("tree", input.fields[0]);
                if (matchValue_7 != null) {
                    if (value_91(matchValue_7).tag === 5) {
                        if (matchValue_8 != null) {
                            if (value_91(matchValue_8).tag === 4) {
                                if ((tree = value_91(matchValue_8).fields[0], isEmpty_1(value_91(matchValue_7).fields[0]))) {
                                    const comparer_2 = value_91(matchValue_7).fields[0];
                                    const tree_2 = value_91(matchValue_8).fields[0];
                                    const matchValue_10 = Convert_generateMap(new Json(4, tree_2));
                                    if (matchValue_10 == null) {
                                        const inputJson = SimpleJson_toString(new Json(4, tree_2));
                                        return toFail(printf("Could not generate map from JSON\n %s"))(inputJson);
                                    }
                                    else {
                                        const pairs_3 = map_3((tupledArg_5: [string, Json]): [any, any] => {
                                            const key_6 = tupledArg_5[0];
                                            return [(!Convert_isQuoted(key_6)) ? Convert_fromJsonAs(new Json(1, key_6), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_6), keyType_3), Convert_fromJsonAs(tupledArg_5[1], valueType_5)];
                                        }, Convert_flattenMap(value_91(matchValue_10)));
                                        switch (keyType_3.tag) {
                                            case 6: {
                                                return ofList(pairs_3, {
                                                    Compare: comparePrimitives,
                                                });
                                            }
                                            case 2: {
                                                return ofList(pairs_3, {
                                                    Compare: comparePrimitives,
                                                });
                                            }
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
                                else {
                                    const pairs_4 = map_3((tupledArg_6: [string, Json]): [string, any] => {
                                        const key_7 = tupledArg_6[0];
                                        return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                                    }, toList_1(input.fields[0]));
                                    switch (keyType_3.tag) {
                                        case 6: {
                                            return ofList(pairs_4, {
                                                Compare: comparePrimitives,
                                            });
                                        }
                                        case 2: {
                                            return ofList(pairs_4, {
                                                Compare: comparePrimitives,
                                            });
                                        }
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
                            else if (value_91(matchValue_8).tag === 5) {
                                if ((tree_1 = value_91(matchValue_8).fields[0], isEmpty_1(value_91(matchValue_7).fields[0]))) {
                                    const comparer_3 = value_91(matchValue_7).fields[0];
                                    const tree_3 = value_91(matchValue_8).fields[0];
                                    input_mut = (new Json(5, ofList(Convert_flatteFable3Map(tree_3), {
                                        Compare: comparePrimitives,
                                    })));
                                    typeInfo_mut = typeInfo;
                                    continue Convert_fromJsonAs;
                                }
                                else {
                                    const pairs_4 = map_3((tupledArg_6: [string, Json]): [string, any] => {
                                        const key_7 = tupledArg_6[0];
                                        return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                                    }, toList_1(input.fields[0]));
                                    switch (keyType_3.tag) {
                                        case 6: {
                                            return ofList(pairs_4, {
                                                Compare: comparePrimitives,
                                            });
                                        }
                                        case 2: {
                                            return ofList(pairs_4, {
                                                Compare: comparePrimitives,
                                            });
                                        }
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
                            else {
                                const pairs_4 = map_3((tupledArg_6: [string, Json]): [string, any] => {
                                    const key_7 = tupledArg_6[0];
                                    return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                                }, toList_1(input.fields[0]));
                                switch (keyType_3.tag) {
                                    case 6: {
                                        return ofList(pairs_4, {
                                            Compare: comparePrimitives,
                                        });
                                    }
                                    case 2: {
                                        return ofList(pairs_4, {
                                            Compare: comparePrimitives,
                                        });
                                    }
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
                        else {
                            const pairs_4 = map_3((tupledArg_6: [string, Json]): [string, any] => {
                                const key_7 = tupledArg_6[0];
                                return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                            }, toList_1(input.fields[0]));
                            switch (keyType_3.tag) {
                                case 6: {
                                    return ofList(pairs_4, {
                                        Compare: comparePrimitives,
                                    });
                                }
                                case 2: {
                                    return ofList(pairs_4, {
                                        Compare: comparePrimitives,
                                    });
                                }
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
                    else {
                        const pairs_4 = map_3((tupledArg_6: [string, Json]): [string, any] => {
                            const key_7 = tupledArg_6[0];
                            return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                        }, toList_1(input.fields[0]));
                        switch (keyType_3.tag) {
                            case 6: {
                                return ofList(pairs_4, {
                                    Compare: comparePrimitives,
                                });
                            }
                            case 2: {
                                return ofList(pairs_4, {
                                    Compare: comparePrimitives,
                                });
                            }
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
                else {
                    const pairs_4 = map_3((tupledArg_6: [string, Json]): [string, any] => {
                        const key_7 = tupledArg_6[0];
                        return [(!Convert_isQuoted(key_7)) ? ((isPrimitive(keyType_3) ? true : enumUnion(keyType_3)) ? Convert_fromJsonAs(new Json(1, key_7), keyType_3) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3)) : Convert_fromJsonAs(SimpleJson_parseNative(key_7), keyType_3), Convert_fromJsonAs(tupledArg_6[1], valueType_5)];
                    }, toList_1(input.fields[0]));
                    switch (keyType_3.tag) {
                        case 6: {
                            return ofList(pairs_4, {
                                Compare: comparePrimitives,
                            });
                        }
                        case 2: {
                            return ofList(pairs_4, {
                                Compare: comparePrimitives,
                            });
                        }
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
            else if (typeInfo.tag === 24) {
                const arg_61 = fullName(typeInfo.fields[0]());
                const arg_60 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
            }
            else {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        else if (input.tag === 4) {
            if (typeInfo.tag === 23) {
                return SimpleJson_toPlainObject(input);
            }
            else if (typeInfo.tag === 27) {
                if (!equals(input, new Json(3))) {
                    return (some)(Convert_fromJsonAs(input, typeInfo.fields[0]()));
                }
                else {
                    const arg_63 = JSON.stringify(typeInfo);
                    const arg_62 = SimpleJson_toString(input);
                    return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
                }
            }
            else if (typeInfo.tag === 40) {
                const patternInput_5 = typeInfo.fields[0]();
                const cases_1 = patternInput_5[0];
                if (!isEmpty(input.fields[0])) {
                    if (head(input.fields[0]).tag === 1) {
                        if (isEmpty(tail_1(input.fields[0]))) {
                            const _arg_5 = tryFind_1((case$_10: UnionCase): boolean => (case$_10.CaseName === head(input.fields[0]).fields[0]), cases_1);
                            if (_arg_5 == null) {
                                const expectedCases_4 = join(", ", map_2((case$_11: UnionCase): string => toText(printf(" \'%s\' "))(case$_11.CaseName), cases_1));
                                const arg_42 = name_2(patternInput_5[1]);
                                return toFail(printf("Case \'%s\' was not valid for type \'%s\', expected one of the cases [%s]"))(head(input.fields[0]).fields[0])(arg_42)(expectedCases_4);
                            }
                            else {
                                const caseName_7 = value_91(_arg_5).CaseName;
                                const caseInfoTypes = value_91(_arg_5).CaseTypes;
                                return makeUnion(value_91(_arg_5).Info, []);
                            }
                        }
                        else {
                            const _arg_6 = tryFind_1((case$_12: UnionCase): boolean => (case$_12.CaseName === head(input.fields[0]).fields[0]), cases_1);
                            if (_arg_6 != null) {
                                const types = value_91(_arg_6).CaseTypes;
                                const foundCaseName = value_91(_arg_6).CaseName;
                                const caseInfo_4 = value_91(_arg_6).Info;
                                if (types.length !== length(tail_1(input.fields[0]))) {
                                    toFail(printf("The number of union case parameters for \'%s\' is different"))(foundCaseName);
                                }
                                return makeUnion(caseInfo_4, map_2((tupledArg_1: [TypeInfo_1, Json]): any => Convert_fromJsonAs(tupledArg_1[1], tupledArg_1[0]), zip(types, toArray(tail_1(input.fields[0])))));
                            }
                            else {
                                const expectedCases_5 = join(", ", map_2((_arg_7: UnionCase): string => _arg_7.CaseName, cases_1));
                                return toFail(printf("Case %s was not valid, expected one of [%s]"))(head(input.fields[0]).fields[0])(expectedCases_5);
                            }
                        }
                    }
                    else {
                        const unexpectedJson_1 = JSON.stringify(input.fields[0]);
                        const expectedType_1 = JSON.stringify(cases_1);
                        return toFail(printf("Expected JSON:\n%s\nto match the type\n%s"))(unexpectedJson_1)(expectedType_1);
                    }
                }
                else {
                    const unexpectedJson_1 = JSON.stringify(input.fields[0]);
                    const expectedType_1 = JSON.stringify(cases_1);
                    return toFail(printf("Expected JSON:\n%s\nto match the type\n%s"))(unexpectedJson_1)(expectedType_1);
                }
            }
            else if (typeInfo.tag === 30) {
                const elementType = typeInfo.fields[0]();
                return toArray(map_3((value_55: Json): any => Convert_fromJsonAs(value_55, elementType), input.fields[0]));
            }
            else if (typeInfo.tag === 28) {
                const elementType_1 = typeInfo.fields[0]();
                return map_3((value_57: Json): any => Convert_fromJsonAs(value_57, elementType_1), input.fields[0]);
            }
            else if (typeInfo.tag === 29) {
                const elementType_3 = typeInfo.fields[0]();
                return ofList_1(map_3((value_61: Json): any => Convert_fromJsonAs(value_61, elementType_3), input.fields[0]), {
                    Compare: compare,
                });
            }
            else if (typeInfo.tag === 31) {
                const elementType_4 = typeInfo.fields[0]();
                return map_3((value_63: Json): any => Convert_fromJsonAs(value_63, elementType_4), input.fields[0]);
            }
            else if (typeInfo.tag === 32) {
                return map_2((tupledArg_2: [TypeInfo_1, Json]): any => Convert_fromJsonAs(tupledArg_2[1], tupledArg_2[0]), zip(typeInfo.fields[0](), toArray(input.fields[0])));
            }
            else if (typeInfo.tag === 33) {
                const patternInput_7 = typeInfo.fields[0]();
                const keyType = patternInput_7[0];
                const pairs = toList(delay((): IterableIterator<any> => collect((keyValuePair: Json): IterableIterator<any> => {
                    let a: Array<TypeInfo_1>;
                    return singleton_1(Convert_fromJsonAs(keyValuePair, new TypeInfo_1(32, (a = [keyType, patternInput_7[1]], (): Array<TypeInfo_1> => a))));
                }, input.fields[0])));
                switch (keyType.tag) {
                    case 6: {
                        return ofList(pairs, {
                            Compare: comparePrimitives,
                        });
                    }
                    case 2: {
                        return ofList(pairs, {
                            Compare: comparePrimitives,
                        });
                    }
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
            else if (typeInfo.tag === 34) {
                const patternInput_8 = typeInfo.fields[0]();
                const keyType_1 = patternInput_8[0];
                const pairs_1 = toList(delay((): IterableIterator<any> => collect((keyValuePair_1: Json): IterableIterator<any> => singleton_1(Convert_fromJsonAs(keyValuePair_1, new TypeInfo_1(32, (): Array<TypeInfo_1> => [keyType_1, patternInput_8[1]]))), input.fields[0])));
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
            else if (typeInfo.tag === 36) {
                const elemType_1 = typeInfo.fields[0]();
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
                const enumerator_2 = getEnumerator(input.fields[0]);
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
            else if (typeInfo.tag === 24) {
                const arg_61 = fullName(typeInfo.fields[0]());
                const arg_60 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
            }
            else {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        else if (typeInfo.tag === 9) {
            return input.fields[0];
        }
        else if (typeInfo.tag === 8) {
            return input.fields[0];
        }
        else if (typeInfo.tag === 6) {
            return Math.floor(input.fields[0]);
        }
        else if (typeInfo.tag === 1) {
            return String.fromCharCode(input.fields[0]);
        }
        else if (typeInfo.tag === 2) {
            return input.fields[0].toString();
        }
        else if (typeInfo.tag === 10) {
            return new Decimal(input.fields[0]);
        }
        else if (typeInfo.tag === 11) {
            return (input.fields[0] + 0x8000 & 0xFFFF) - 0x8000;
        }
        else if (typeInfo.tag === 3) {
            return input.fields[0] & 0xFFFF;
        }
        else if (typeInfo.tag === 4) {
            return input.fields[0] >>> 0;
        }
        else if (typeInfo.tag === 5) {
            return fromNumber(input.fields[0], true);
        }
        else if (typeInfo.tag === 20) {
            return Math.floor(input.fields[0]);
        }
        else if (typeInfo.tag === 38) {
            const patternInput_1 = typeInfo.fields[0]();
            return input.fields[0];
        }
        else if (typeInfo.tag === 23) {
            return SimpleJson_toPlainObject(input);
        }
        else if (typeInfo.tag === 13) {
            return input.fields[0] & 0xFF;
        }
        else if (typeInfo.tag === 14) {
            return (input.fields[0] + 0x80 & 0xFF) - 0x80;
        }
        else if (typeInfo.tag === 19) {
            return fromInt32(Math.floor(input.fields[0]));
        }
        else if (typeInfo.tag === 16) {
            return DateOffset(toNumber(fromNumber(Math.floor(input.fields[0]), false)) * 1000, 0);
        }
        else if (typeInfo.tag === 17) {
            return fromDayNumber(~(~input.fields[0]));
        }
        else if (typeInfo.tag === 27) {
            if (!equals(input, new Json(3))) {
                return (some)(Convert_fromJsonAs(input, typeInfo.fields[0]()));
            }
            else {
                const arg_63 = JSON.stringify(typeInfo);
                const arg_62 = SimpleJson_toString(input);
                return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
            }
        }
        else if (typeInfo.tag === 12) {
            return ((value_51: int32): int64 => fromInteger(value_51, false, 2))(~(~input.fields[0]));
        }
        else if (typeInfo.tag === 24) {
            const arg_61 = fullName(typeInfo.fields[0]());
            const arg_60 = SimpleJson_toString(input);
            return toFail(printf("Cannot convert %s to %s"))(arg_60)(arg_61);
        }
        else {
            const arg_63 = JSON.stringify(typeInfo);
            const arg_62 = SimpleJson_toString(input);
            return toFail(printf("Cannot convert %s to %s"))(arg_62)(arg_63);
        }
        break;
    }
}

export function Convert_fromJson<t>(json: Json, typeInfo: TypeInfo_1): t {
    return Convert_fromJsonAs(json, typeInfo);
}

export const Convert_quoteText = quote;

export function Convert_serialize(value_mut: any, typeInfo_mut: TypeInfo_1): string {
    let copyOfStruct: string, copyOfStruct_1: Date, copyOfStruct_2: Date, copyOfStruct_3: Date, copyOfStruct_4: number;
    Convert_serialize:
    while (true) {
        const value: any = value_mut, typeInfo: TypeInfo_1 = typeInfo_mut;
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
            case 9: {
                if (Number.isNaN(value)) {
                    return Convert_quoteText("NaN");
                }
                else {
                    return value.toString();
                }
            }
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
            case 13: {
                return int32ToString(value);
            }
            case 14: {
                return int32ToString(value);
            }
            case 3: {
                return int32ToString(value);
            }
            case 4: {
                return int32ToString(value);
            }
            case 11: {
                return int32ToString(value);
            }
            case 38: {
                return int32ToString(value);
            }
            case 20: {
                return int32ToString(value);
            }
            case 6: {
                return int32ToString(value);
            }
            case 5: {
                return Convert_betweenQuotes(toString(value));
            }
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
                return ("{" + join(", ", map_2((field: RecordField): string => {
                    const arg_1 = Convert_serialize(getRecordField(value, field.PropertyInfo), field.FieldType);
                    return toText(printf("\"%s\": %s"))(field.FieldName)(arg_1);
                }, typeInfo.fields[0]()[0]))) + "}";
            }
            case 35: {
                const elementType = typeInfo.fields[0]();
                return ("[" + join(", ", map_4((element: any): string => Convert_serialize(element, elementType), value))) + "]";
            }
            case 36: {
                const elementType_1 = typeInfo.fields[0]();
                return ("[" + join(", ", map_4((element_1: any): string => Convert_serialize(element_1, elementType_1), value))) + "]";
            }
            case 29: {
                const elementType_2 = typeInfo.fields[0]();
                return ("[" + join(", ", map_4((element_2: any): string => Convert_serialize(element_2, elementType_2), value))) + "]";
            }
            case 30: {
                const elementType_3 = typeInfo.fields[0]();
                return ("[" + join(", ", map_2((element_3: any): string => Convert_serialize(element_3, elementType_3), value))) + "]";
            }
            case 28: {
                const elementType_4 = typeInfo.fields[0]();
                return ("[" + join(", ", map_3((element_4: any): string => Convert_serialize(element_4, elementType_4), value))) + "]";
            }
            case 31: {
                const elementType_5 = typeInfo.fields[0]();
                return ("[" + join(", ", map_2((element_5: any): string => Convert_serialize(element_5, elementType_5), toArray_1(value)))) + "]";
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
                const caseTypes = patternInput_1[0].find((case$: UnionCase): boolean => (case$.CaseName === name_2(usedCase))).CaseTypes;
                if (enumUnion(typeInfo) ? true : (caseTypes.length === 0)) {
                    return Convert_betweenQuotes(name_2(usedCase));
                }
                else if (caseTypes.length === 1) {
                    return ((("{" + Convert_betweenQuotes(name_2(usedCase))) + ": ") + Convert_serialize(fields[0], caseTypes[0])) + "}";
                }
                else {
                    const serializedFields_1 = join(", ", mapIndexed((index: int32, caseType: TypeInfo_1): string => Convert_serialize(fields[index], caseType), caseTypes));
                    return (((("{" + Convert_betweenQuotes(name_2(usedCase))) + ": ") + "[") + serializedFields_1) + "] }";
                }
            }
            case 33: {
                const patternInput_3 = typeInfo.fields[0]();
                const keyType = patternInput_3[0];
                const serializedValues = join(", ", map_2((tupledArg: [any, any]): string => {
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
                const serializedValues_1 = join(", ", map_4((pair: [any, any]): string => {
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
                    return ("[" + join(", ", mapIndexed((index_1: int32, element_6: any): string => Convert_serialize(element_6, tupleTypes[index_1]), value))) + "]";
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

export function Fable_SimpleJson_Json__Json_stringify_Static_4E60E31B(value: any): string {
    if (Convert_isUsingFable3) {
        console.warn(some("It looks like you using the function Json.stringify from Fable.SimpleJson while also using Fable 3 (nagareyama). Please use Json.serialize instead which supports both Fable 3 and Fable 2.x"));
    }
    return SimpleJson_stringify(value);
}

