import { equals, getEnumUnderlyingType, isEnum, getTupleElements, isTuple, getElementType, isArray, getFunctionElements, isFunction, getUnionCases, getUnionCaseFields, isUnion, getGenerics, getRecordElements, name, isRecord, fullName } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { UnionCase, RecordField, TypeInfo } from "./TypeInfo.fs.js";
import { value, Option } from "../fable-library.4.0.0-theta-001/Option.js";
import { map } from "../fable-library.4.0.0-theta-001/Array.js";
import { collect, singleton, append, delay, toArray } from "../fable-library.4.0.0-theta-001/Seq.js";
import { structuralHash, Lazy } from "../fable-library.4.0.0-theta-001/Util.js";
import { Dictionary } from "../fable-library.4.0.0-theta-001/MutableMap.js";
import { int32 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { tryGetValue } from "../fable-library.4.0.0-theta-001/MapUtil.js";
import { FSharpRef } from "../fable-library.4.0.0-theta-001/Types.js";
import { endsWith, isNullOrEmpty } from "../fable-library.4.0.0-theta-001/String.js";

export function $007CPrimitiveType$007C_$007C(primType: any): Option<TypeInfo> {
    const matchValue = fullName(primType);
    if (matchValue === "System.String") {
        return new TypeInfo(2);
    }
    else if (matchValue === "System.Char") {
        return new TypeInfo(1);
    }
    else if (matchValue === "System.Int16") {
        return new TypeInfo(11);
    }
    else if (matchValue === "System.Int32") {
        return new TypeInfo(6);
    }
    else if (matchValue === "Microsoft.FSharp.Core.int64`1") {
        return new TypeInfo(12);
    }
    else if (matchValue === "System.Int64") {
        return new TypeInfo(12);
    }
    else if (matchValue === "System.UInt16") {
        return new TypeInfo(3);
    }
    else if (matchValue === "System.UInt32") {
        return new TypeInfo(4);
    }
    else if (matchValue === "System.UInt64") {
        return new TypeInfo(5);
    }
    else if (matchValue === "System.DateTime") {
        return new TypeInfo(15);
    }
    else if (matchValue === "System.DateOnly") {
        return new TypeInfo(17);
    }
    else if (matchValue === "System.TimeOnly") {
        return new TypeInfo(18);
    }
    else if (matchValue === "System.TimeSpan") {
        return new TypeInfo(20);
    }
    else if (matchValue === "System.DateTimeOffset") {
        return new TypeInfo(16);
    }
    else if (matchValue === "System.Boolean") {
        return new TypeInfo(7);
    }
    else if (matchValue === "System.Single") {
        return new TypeInfo(8);
    }
    else if (matchValue === "System.Double") {
        return new TypeInfo(9);
    }
    else if (matchValue === "Microsoft.FSharp.Core.decimal`1") {
        return new TypeInfo(10);
    }
    else if (matchValue === "System.Decimal") {
        return new TypeInfo(10);
    }
    else if (matchValue === "System.Numerics.BigInteger") {
        return new TypeInfo(19);
    }
    else if (matchValue === "Microsoft.FSharp.Core.Unit") {
        return new TypeInfo(0);
    }
    else if (matchValue === "System.Guid") {
        return new TypeInfo(21);
    }
    else if (matchValue === "System.Byte") {
        return new TypeInfo(13);
    }
    else if (matchValue === "System.SByte") {
        return new TypeInfo(14);
    }
    else if (matchValue === "System.Object") {
        return new TypeInfo(23);
    }
    else if (matchValue === "System.Uri") {
        return new TypeInfo(22);
    }
    else {
        return void 0;
    }
}

export function $007CRecordType$007C_$007C(t: any): Option<Array<[any, string, any]>> {
    if (isRecord(t)) {
        return map((field: any): [any, string, any] => [field, name(field), field[1]], getRecordElements(t));
    }
    else {
        return void 0;
    }
}

export function $007CSetType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("Microsoft.FSharp.Collections.FSharpSet`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CNullable$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("System.Nullable`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CUnionType$007C_$007C(t: any): Option<Array<[string, any, Array<any>]>> {
    if (isUnion(t)) {
        return map((info: any): [string, any, Array<any>] => [name(info), info, map((prop: any): any => prop[1], getUnionCaseFields(info))], getUnionCases(t));
    }
    else {
        return void 0;
    }
}

export function $007CMapType$007C_$007C(t: any): Option<[any, any]> {
    if (fullName(t).indexOf("Microsoft.FSharp.Collections.FSharpMap`2") === 0) {
        const genArgs = getGenerics(t);
        return [genArgs[0], genArgs[1]];
    }
    else {
        return void 0;
    }
}

export function $007CListType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("Microsoft.FSharp.Collections.FSharpList`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function flattenFuncTypes(typeDef: any): Array<any> {
    return toArray(delay((): IterableIterator<any> => {
        if (isFunction(typeDef)) {
            const patternInput = getFunctionElements(typeDef);
            return append(flattenFuncTypes(patternInput[0]), delay((): IterableIterator<any> => flattenFuncTypes(patternInput[1])));
        }
        else {
            return singleton(typeDef);
        }
    }));
}

export function $007CFuncType$007C_$007C(t: any): Option<Array<any>> {
    if (isFunction(t)) {
        return flattenFuncTypes(t);
    }
    else {
        return void 0;
    }
}

export function $007CArrayType$007C_$007C(t: any): Option<any> {
    if (isArray(t)) {
        return getElementType(t);
    }
    else {
        return void 0;
    }
}

export function $007COptionType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("Microsoft.FSharp.Core.FSharpOption`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CTupleType$007C_$007C(t: any): Option<Array<any>> {
    if (isTuple(t)) {
        return getTupleElements(t);
    }
    else {
        return void 0;
    }
}

export function $007CSeqType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("System.Collections.Generic.IEnumerable`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CDictionaryType$007C_$007C(t: any): Option<[any, any]> {
    if (fullName(t).indexOf("System.Collections.Generic.Dictionary") === 0) {
        const genArgs = getGenerics(t);
        return [genArgs[0], genArgs[1]];
    }
    else {
        return void 0;
    }
}

export function $007CResizeArrayType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("System.Collections.Generic.List") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CHashSetType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("System.Collections.Generic.HashSet") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CAsyncType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("Microsoft.FSharp.Control.FSharpAsync`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

export function $007CPromiseType$007C_$007C(t: any): Option<any> {
    if (fullName(t).indexOf("Fable.Core.JS.Promise`1") === 0) {
        return getGenerics(t)[0];
    }
    else {
        return void 0;
    }
}

function lazyToDelayed<$a>(l: any, unitVar: void): $a {
    return l.Value;
}

export function $007CEnumType$007C_$007C(t: any): Option<any> {
    if (isEnum(t)) {
        return getEnumUnderlyingType(t);
    }
    else {
        return void 0;
    }
}

function _createTypeInfo(resolvedType: any): TypeInfo {
    let l: any, l_3: any, l_4: any, l_5: any, l_6: any, l_7: any, l_8: any, l_9: any, l_10: any, l_11: any, l_12: any, l_13: any, l_14: any, l_15: any, l_16: any, l_17: any;
    const activePatternResult = $007CPrimitiveType$007C_$007C(resolvedType);
    if (activePatternResult != null) {
        const typeInfo = value(activePatternResult);
        return typeInfo;
    }
    else {
        const activePatternResult_1 = $007CFuncType$007C_$007C(resolvedType);
        if (activePatternResult_1 != null) {
            const types = value(activePatternResult_1);
            return new TypeInfo(37, (l = (new Lazy((): Array<TypeInfo> => map(createTypeInfo, types))), (): Array<TypeInfo> => lazyToDelayed(l, void 0)));
        }
        else {
            const activePatternResult_2 = $007CRecordType$007C_$007C(resolvedType);
            if (activePatternResult_2 != null) {
                const fields = value(activePatternResult_2);
                const l_1 = new Lazy((): [Array<RecordField>, any] => [toArray(delay((): IterableIterator<RecordField> => collect((matchValue: [any, string, any]): IterableIterator<RecordField> => singleton(new RecordField(matchValue[1], createTypeInfo(matchValue[2]), matchValue[0])), fields))), resolvedType]);
                return new TypeInfo(39, (): [Array<RecordField>, any] => lazyToDelayed(l_1, void 0));
            }
            else {
                const activePatternResult_3 = $007CUnionType$007C_$007C(resolvedType);
                if (activePatternResult_3 != null) {
                    const cases = value(activePatternResult_3);
                    const l_2 = new Lazy((): [Array<UnionCase>, any] => [toArray(delay((): IterableIterator<UnionCase> => collect((matchValue_1: [string, any, Array<any>]): IterableIterator<UnionCase> => singleton(new UnionCase(matchValue_1[0], map(createTypeInfo, matchValue_1[2]), matchValue_1[1])), cases))), resolvedType]);
                    return new TypeInfo(40, (): [Array<UnionCase>, any] => lazyToDelayed(l_2, void 0));
                }
                else {
                    const activePatternResult_4 = $007CEnumType$007C_$007C(resolvedType);
                    if (activePatternResult_4 != null) {
                        const elemType = value(activePatternResult_4);
                        return new TypeInfo(38, (l_3 = (new Lazy((): [TypeInfo, any] => [createTypeInfo(elemType), resolvedType])), (): [TypeInfo, any] => lazyToDelayed(l_3, void 0)));
                    }
                    else {
                        const activePatternResult_5 = $007CListType$007C_$007C(resolvedType);
                        if (activePatternResult_5 != null) {
                            const elemType_1 = value(activePatternResult_5);
                            return new TypeInfo(28, (l_4 = (new Lazy((): TypeInfo => createTypeInfo(elemType_1))), (): TypeInfo => lazyToDelayed(l_4, void 0)));
                        }
                        else {
                            const activePatternResult_6 = $007CResizeArrayType$007C_$007C(resolvedType);
                            if (activePatternResult_6 != null) {
                                const elemType_2 = value(activePatternResult_6);
                                return new TypeInfo(35, (l_5 = (new Lazy((): TypeInfo => createTypeInfo(elemType_2))), (): TypeInfo => lazyToDelayed(l_5, void 0)));
                            }
                            else {
                                const activePatternResult_7 = $007CHashSetType$007C_$007C(resolvedType);
                                if (activePatternResult_7 != null) {
                                    const elemType_3 = value(activePatternResult_7);
                                    return new TypeInfo(36, (l_6 = (new Lazy((): TypeInfo => createTypeInfo(elemType_3))), (): TypeInfo => lazyToDelayed(l_6, void 0)));
                                }
                                else {
                                    const activePatternResult_8 = $007CArrayType$007C_$007C(resolvedType);
                                    if (activePatternResult_8 != null) {
                                        const elemType_4 = value(activePatternResult_8);
                                        return new TypeInfo(30, (l_7 = (new Lazy((): TypeInfo => createTypeInfo(elemType_4))), (): TypeInfo => lazyToDelayed(l_7, void 0)));
                                    }
                                    else {
                                        const activePatternResult_9 = $007CTupleType$007C_$007C(resolvedType);
                                        if (activePatternResult_9 != null) {
                                            const types_1 = value(activePatternResult_9);
                                            return new TypeInfo(32, (l_8 = (new Lazy((): Array<TypeInfo> => map(createTypeInfo, types_1))), (): Array<TypeInfo> => lazyToDelayed(l_8, void 0)));
                                        }
                                        else {
                                            const activePatternResult_10 = $007COptionType$007C_$007C(resolvedType);
                                            if (activePatternResult_10 != null) {
                                                const elemType_5 = value(activePatternResult_10);
                                                return new TypeInfo(27, (l_9 = (new Lazy((): TypeInfo => createTypeInfo(elemType_5))), (): TypeInfo => lazyToDelayed(l_9, void 0)));
                                            }
                                            else {
                                                const activePatternResult_11 = $007CNullable$007C_$007C(resolvedType);
                                                if (activePatternResult_11 != null) {
                                                    const elemType_6 = value(activePatternResult_11);
                                                    return new TypeInfo(27, (l_10 = (new Lazy((): TypeInfo => createTypeInfo(elemType_6))), (): TypeInfo => lazyToDelayed(l_10, void 0)));
                                                }
                                                else {
                                                    const activePatternResult_12 = $007CSetType$007C_$007C(resolvedType);
                                                    if (activePatternResult_12 != null) {
                                                        const elemType_7 = value(activePatternResult_12);
                                                        return new TypeInfo(29, (l_11 = (new Lazy((): TypeInfo => createTypeInfo(elemType_7))), (): TypeInfo => lazyToDelayed(l_11, void 0)));
                                                    }
                                                    else {
                                                        const activePatternResult_13 = $007CMapType$007C_$007C(resolvedType);
                                                        if (activePatternResult_13 != null) {
                                                            const keyType = value(activePatternResult_13)[0];
                                                            const valueType = value(activePatternResult_13)[1];
                                                            return new TypeInfo(33, (l_12 = (new Lazy((): [TypeInfo, TypeInfo] => [createTypeInfo(keyType), createTypeInfo(valueType)])), (): [TypeInfo, TypeInfo] => lazyToDelayed(l_12, void 0)));
                                                        }
                                                        else {
                                                            const activePatternResult_14 = $007CDictionaryType$007C_$007C(resolvedType);
                                                            if (activePatternResult_14 != null) {
                                                                const keyType_1 = value(activePatternResult_14)[0];
                                                                const valueType_1 = value(activePatternResult_14)[1];
                                                                return new TypeInfo(34, (l_13 = (new Lazy((): [TypeInfo, TypeInfo, any] => [createTypeInfo(keyType_1), createTypeInfo(valueType_1), valueType_1])), (): [TypeInfo, TypeInfo, any] => lazyToDelayed(l_13, void 0)));
                                                            }
                                                            else {
                                                                const activePatternResult_15 = $007CSeqType$007C_$007C(resolvedType);
                                                                if (activePatternResult_15 != null) {
                                                                    const elemType_8 = value(activePatternResult_15);
                                                                    return new TypeInfo(31, (l_14 = (new Lazy((): TypeInfo => createTypeInfo(elemType_8))), (): TypeInfo => lazyToDelayed(l_14, void 0)));
                                                                }
                                                                else {
                                                                    const activePatternResult_16 = $007CAsyncType$007C_$007C(resolvedType);
                                                                    if (activePatternResult_16 != null) {
                                                                        const elemType_9 = value(activePatternResult_16);
                                                                        return new TypeInfo(25, (l_15 = (new Lazy((): TypeInfo => createTypeInfo(elemType_9))), (): TypeInfo => lazyToDelayed(l_15, void 0)));
                                                                    }
                                                                    else {
                                                                        const activePatternResult_17 = $007CPromiseType$007C_$007C(resolvedType);
                                                                        if (activePatternResult_17 != null) {
                                                                            const elemType_10 = value(activePatternResult_17);
                                                                            return new TypeInfo(26, (l_16 = (new Lazy((): TypeInfo => createTypeInfo(elemType_10))), (): TypeInfo => lazyToDelayed(l_16, void 0)));
                                                                        }
                                                                        else {
                                                                            return new TypeInfo(24, (l_17 = (new Lazy((): any => resolvedType)), (): any => lazyToDelayed(l_17, void 0)));
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const typeInfoCache = new Dictionary([], {
    Equals: equals,
    GetHashCode: structuralHash,
});

export function createTypeInfo(resolvedType: any): TypeInfo {
    let matchValue;
    let outArg = null;
    matchValue = [tryGetValue(typeInfoCache, resolvedType, new FSharpRef((): TypeInfo => outArg, (v: TypeInfo): void => {
        outArg = v;
    })), outArg];
    if (matchValue[0]) {
        return matchValue[1];
    }
    else {
        const ti_1 = _createTypeInfo(resolvedType);
        if (((!isNullOrEmpty(fullName(resolvedType))) && (!endsWith(fullName(resolvedType), "`1[]"))) && (!endsWith(fullName(resolvedType), "`2[]"))) {
            typeInfoCache.set(resolvedType, ti_1);
            return ti_1;
        }
        else {
            return ti_1;
        }
    }
}

export function isPrimitive(_arg: TypeInfo): boolean {
    switch (_arg.tag) {
        case 0: {
            return true;
        }
        case 2: {
            return true;
        }
        case 3: {
            return true;
        }
        case 4: {
            return true;
        }
        case 5: {
            return true;
        }
        case 6: {
            return true;
        }
        case 7: {
            return true;
        }
        case 8: {
            return true;
        }
        case 9: {
            return true;
        }
        case 10: {
            return true;
        }
        case 11: {
            return true;
        }
        case 12: {
            return true;
        }
        case 13: {
            return true;
        }
        case 15: {
            return true;
        }
        case 16: {
            return true;
        }
        case 17: {
            return true;
        }
        case 18: {
            return true;
        }
        case 19: {
            return true;
        }
        case 21: {
            return true;
        }
        case 27: {
            return true;
        }
        default: {
            return false;
        }
    }
}

export function enumUnion(_arg: TypeInfo): boolean {
    if (_arg.tag === 40) {
        const array = _arg.fields[0]()[0];
        return array.every((case$: UnionCase): boolean => (case$.CaseTypes.length === 0));
    }
    else {
        return false;
    }
}

