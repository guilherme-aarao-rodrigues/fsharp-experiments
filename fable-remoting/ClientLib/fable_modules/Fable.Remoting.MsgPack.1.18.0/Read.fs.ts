import { head, map, fill } from "../fable-library.4.0.0-theta-001/Array.js";
import { float64, float32, uint32, int16, uint16, int8, int32, uint8 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { isEnum, int8_type, uint16_type, uint32_type, bigint_type, array_type, uint8_type, fullName, decimal_type, int16_type, int64_type, getTupleElements, makeTuple, isTuple, getElementType, isArray, list_type, option_type, isGenericType, makeUnion, getUnionCaseFields, getUnionCases, int32_type, isUnion, getRecordElements, makeRecord, isRecord, obj_type, getGenericTypeDefinition, equals, name, getGenerics, class_type, TypeInfo } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { get_UTF8 } from "../fable-library.4.0.0-theta-001/Encoding.js";
import { toNumber, toInt, fromInteger, fromBits, equals as equals_2, int64, uint64, fromValue } from "../fable-library.4.0.0-theta-001/Long.js";
import { isLittleEndian, toDouble, toSingle, toInt64 } from "../fable-library.4.0.0-theta-001/BitConverter.js";
import { printf, toFail } from "../fable-library.4.0.0-theta-001/String.js";
import { Dictionary } from "../fable-library.4.0.0-theta-001/MutableMap.js";
import { compare, structuralHash, equals as equals_1 } from "../fable-library.4.0.0-theta-001/Util.js";
import { addToDict } from "../fable-library.4.0.0-theta-001/MapUtil.js";
import { ofArray } from "../fable-library.4.0.0-theta-001/Map.js";
import { FSharpSet__Add, empty } from "../fable-library.4.0.0-theta-001/Set.js";
import { some } from "../fable-library.4.0.0-theta-001/Option.js";
import { singleton, collect, delay, toList } from "../fable-library.4.0.0-theta-001/Seq.js";
import { rangeDouble } from "../fable-library.4.0.0-theta-001/Range.js";
import { fromTicks } from "../fable-library.4.0.0-theta-001/Date.js";
import { fromTicks as fromTicks_1 } from "../fable-library.4.0.0-theta-001/DateOffset.js";
import { fromTicks as fromTicks_2, fromMinutes } from "../fable-library.4.0.0-theta-001/TimeSpan.js";
import { fromIntArray } from "../fable-library.4.0.0-theta-001/Decimal.js";
import { arrayToGuid } from "../fable-library.4.0.0-theta-001/Guid.js";
import { fromByteArray } from "../fable-library.4.0.0-theta-001/BigInt.js";
import { fromDayNumber } from "../fable-library.4.0.0-theta-001/DateOnly.js";
import { create } from "../fable-library.4.0.0-theta-001/TimeOnly.js";

export function interpretStringAs(typ: any, str: string): any {
    return str;
}

export class Reader {
    data: Array<uint8>;
    pos: int32;
    numberBuffer: Array<uint8>;
    constructor(data: Array<uint8>) {
        this.data = data;
        this.pos = 0;
        this.numberBuffer = fill(new Array(8), 0, 8, 0);
    }
}

export function Reader$reflection(): TypeInfo {
    return class_type("Fable.Remoting.MsgPack.Read.Reader", void 0, Reader);
}

export function Reader_$ctor_Z3F6BC7B1(data: Array<uint8>): Reader {
    return new Reader(data);
}

export function Reader__ReadByte(_: Reader): uint8 {
    _.pos = ((_.pos + 1) | 0);
    return _.data[_.pos - 1];
}

export function Reader__ReadRawBin_Z524259A4(_: Reader, len: int32): Array<uint8> {
    _.pos = ((_.pos + len) | 0);
    return _.data.slice(_.pos - len, (_.pos - 1) + 1);
}

export function Reader__ReadString_Z524259A4(_: Reader, len: int32): string {
    _.pos = ((_.pos + len) | 0);
    return get_UTF8().getString(_.data, _.pos - len, len);
}

export function Reader__ReadUInt8(x: Reader): uint8 {
    return Reader__ReadByte(x);
}

export function Reader__ReadInt8(x: Reader): int8 {
    const value = Reader__ReadByte(x);
    return ((value + 0x80 & 0xFF) - 0x80) | 0;
}

export function Reader__ReadUInt16(x: Reader): uint16 {
    const value = Reader__ReadInt16(x) | 0;
    return value & 0xFFFF;
}

export function Reader__ReadInt16(_: Reader): int16 {
    _.pos = ((_.pos + 2) | 0);
    return ((((_.data[_.pos - 2] + 0x8000 & 0xFFFF) - 0x8000) << 8) | ((_.data[_.pos - 1] + 0x8000 & 0xFFFF) - 0x8000)) | 0;
}

export function Reader__ReadUInt32(x: Reader): uint32 {
    const value = Reader__ReadInt32(x) | 0;
    return value >>> 0;
}

export function Reader__ReadInt32(_: Reader): int32 {
    _.pos = ((_.pos + 4) | 0);
    return (((((~(~_.data[_.pos - 4])) << 24) | ((~(~_.data[_.pos - 3])) << 16)) | ((~(~_.data[_.pos - 2])) << 8)) | (~(~_.data[_.pos - 1]))) | 0;
}

export function Reader__ReadUInt64(x: Reader): uint64 {
    return fromValue(Reader__ReadInt64(x), true);
}

export function Reader__ReadInt64(_: Reader): int64 {
    return Reader__readNumber(_, 8, (tupledArg: [Array<uint8>, int32]): boolean => toInt64(tupledArg[0], tupledArg[1]));
}

export function Reader__ReadFloat32(x: Reader): float32 {
    return Reader__readNumber(x, 4, (tupledArg: [Array<uint8>, int32]): boolean => toSingle(tupledArg[0], tupledArg[1]));
}

export function Reader__ReadFloat64(x: Reader): float64 {
    return Reader__readNumber(x, 8, (tupledArg: [Array<uint8>, int32]): boolean => toDouble(tupledArg[0], tupledArg[1]));
}

export function Reader__ReadMap_412036CA(x: Reader, len: int32, t: any): any {
    const args = getGenerics(t);
    if (args.length !== 2) {
        const arg = name(t);
        toFail(printf("Expecting %s, but the data contains a map."))(arg);
    }
    let pairs;
    const arr = fill(new Array(len), 0, len, null);
    for (let i: int32 = 0; i <= (len - 1); i++) {
        arr[i] = [Reader__Read_24524716(x, args[0]), Reader__Read_24524716(x, args[1])];
    }
    pairs = arr;
    if (equals(getGenericTypeDefinition(t), class_type("System.Collections.Generic.Dictionary`2", [obj_type, obj_type]))) {
        const dict = new Dictionary([], {
            Equals: equals_1,
            GetHashCode: structuralHash,
        });
        pairs.forEach((tupledArg: [any, any]): void => {
            addToDict(dict, tupledArg[0], tupledArg[1]);
        });
        return dict;
    }
    else {
        return ofArray(pairs, {
            Compare: compare,
        });
    }
}

export function Reader__ReadSet_412036CA(x: Reader, len: int32, t: any): any {
    const args = getGenerics(t);
    if (args.length !== 1) {
        const arg = name(t);
        toFail(printf("Expecting %s, but the data contains a set."))(arg);
    }
    let set$ = empty({
        Compare: compare,
    });
    for (let forLoopVar: int32 = 0; forLoopVar <= (len - 1); forLoopVar++) {
        set$ = FSharpSet__Add(set$, Reader__Read_24524716(x, args[0]));
    }
    return set$;
}

export function Reader__ReadRawArray_412036CA(x: Reader, len: int32, elementType: any): Array<any> {
    const arr = fill(new Array(len), 0, len, null);
    for (let i: int32 = 0; i <= (len - 1); i++) {
        arr[i] = Reader__Read_24524716(x, elementType);
    }
    return arr;
}

export function Reader__ReadArray_412036CA(x: Reader, len: int32, t: any): any {
    if (isRecord(t)) {
        return makeRecord(t, map((prop: any): any => Reader__Read_24524716(x, prop[1]), getRecordElements(t)));
    }
    else if (isUnion(t, true)) {
        const tag = Reader__Read_24524716(x, int32_type);
        let case$;
        const array_1 = getUnionCases(t, true);
        case$ = array_1.find((x_1: any): boolean => (x_1.tag === tag));
        const fieldTypes = map((x_2: any): any => x_2[1], getUnionCaseFields(case$));
        return makeUnion(case$, (fieldTypes.length === 1) ? [Reader__Read_24524716(x, fieldTypes[0])] : ((fieldTypes.length === 0) ? [] : ((void Reader__ReadByte(x), map((arg: any): any => Reader__Read_24524716(x, arg), fieldTypes)))), true);
    }
    else if (isGenericType(t) && equals(getGenericTypeDefinition(t), option_type(obj_type))) {
        if (Reader__ReadByte(x) === 0) {
            return null;
        }
        else {
            return some(Reader__Read_24524716(x, head(getGenerics(t))));
        }
    }
    else if (isGenericType(t) && equals(getGenericTypeDefinition(t), list_type(obj_type))) {
        const elementType = head(getGenerics(t));
        return toList(delay((): IterableIterator<any> => collect((matchValue: int32): IterableIterator<any> => singleton(Reader__Read_24524716(x, elementType)), rangeDouble(0, 1, len - 1))));
    }
    else if (isArray(t)) {
        return Reader__ReadRawArray_412036CA(x, len, getElementType(t));
    }
    else if (isTuple(t)) {
        return makeTuple(map((arg_2: any): any => Reader__Read_24524716(x, arg_2), getTupleElements(t)), t);
    }
    else if (equals(t, class_type("System.DateTime"))) {
        const dateTimeTicks = Reader__Read_24524716(x, int64_type);
        const kindAsInt = Reader__Read_24524716(x, int64_type);
        return fromTicks(dateTimeTicks, equals_2(kindAsInt, fromBits(1, 0, false)) ? 1 : (equals_2(kindAsInt, fromBits(2, 0, false)) ? 2 : 0));
    }
    else if (equals(t, class_type("System.DateTimeOffset"))) {
        return fromTicks_1(Reader__Read_24524716(x, int64_type), fromMinutes(Reader__Read_24524716(x, int16_type)));
    }
    else if (isGenericType(t) && equals(getGenericTypeDefinition(t), class_type("Microsoft.FSharp.Collections.FSharpSet`1", [obj_type]))) {
        return Reader__ReadSet_412036CA(x, len, t);
    }
    else if (equals(t, decimal_type) ? true : (fullName(t) === "Microsoft.FSharp.Core.decimal`1")) {
        return fromIntArray(Reader__ReadRawArray_412036CA(x, 4, int32_type));
    }
    else {
        const arg_5 = x.pos | 0;
        const arg_4 = name(t);
        return toFail(printf("Expecting %s at position %d, but the data contains an array."))(arg_4)(arg_5);
    }
}

export function Reader__ReadBin_412036CA(x: Reader, len: int32, t: any): any {
    if (equals(t, class_type("System.Guid"))) {
        return arrayToGuid(Reader__ReadRawBin_Z524259A4(x, len));
    }
    else if (equals(t, array_type(uint8_type))) {
        return Reader__ReadRawBin_Z524259A4(x, len);
    }
    else if (equals(t, bigint_type)) {
        return fromByteArray(Reader__ReadRawBin_Z524259A4(x, len));
    }
    else {
        const arg_1 = x.pos | 0;
        const arg = name(t);
        return toFail(printf("Expecting %s at position %d, but the data contains bin."))(arg)(arg_1);
    }
}

export function Reader__Read_24524716(x: Reader, t: any): any {
    const matchValue = Reader__ReadByte(x);
    if ((matchValue | 31) === 191) {
        return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~(~(matchValue & 31))));
    }
    else if (matchValue === 192) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            return null;
        }
    }
    else if (matchValue === 194) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            return false;
        }
    }
    else if (matchValue === 195) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            return true;
        }
    }
    else if (matchValue === 196) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else if ((matchValue | 15) === 143) {
            return Reader__ReadMap_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadBin_412036CA(x, ~(~Reader__ReadByte(x)), t);
        }
    }
    else if (matchValue === 197) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else if ((matchValue | 15) === 143) {
            return Reader__ReadMap_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadBin_412036CA(x, ~(~Reader__ReadUInt16(x)), t);
        }
    }
    else if (matchValue === 198) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else if ((matchValue | 15) === 143) {
            return Reader__ReadMap_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadBin_412036CA(x, ~(~Reader__ReadUInt32(x)), t);
        }
    }
    else if (matchValue === 202) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            return Reader__ReadFloat32(x);
        }
    }
    else if (matchValue === 203) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            return Reader__ReadFloat64(x);
        }
    }
    else if (matchValue === 204) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_6 = t;
            const n_12 = Reader__ReadUInt8(x);
            if (typ_6 === int32_type) {
                return ~(~n_12);
            }
            else {
                const typeName_6 = fullName(typ_6);
                if (typeName_6 === "System.Int64") {
                    return fromInteger(n_12, false, 4);
                }
                else if (typ_6 === int16_type) {
                    return (n_12 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_6 === uint32_type) {
                    return n_12;
                }
                else if (typeName_6 === "System.UInt64") {
                    return fromInteger(n_12, true, 4);
                }
                else if (typ_6 === uint16_type) {
                    return n_12;
                }
                else if (typeName_6 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_12, false, 4));
                }
                else if (typeName_6 === "System.DateOnly") {
                    return fromDayNumber(~(~n_12));
                }
                else if (typeName_6 === "System.TimeOnly") {
                    return create(fromInteger(n_12, false, 4));
                }
                else if (typeName_6 === "Microsoft.FSharp.Core.int16`1") {
                    return (n_12 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName_6 === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n_12);
                }
                else if (typeName_6 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_12, false, 4);
                }
                else if (typ_6 === uint8_type) {
                    return n_12;
                }
                else if (typ_6 === int8_type) {
                    return (n_12 + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_6)) {
                    return n_12;
                }
                else {
                    const arg_1_7 = name(typ_6);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_12)(arg_1_7);
                }
            }
        }
    }
    else if (matchValue === 205) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_7 = t;
            const n_14 = Reader__ReadUInt16(x);
            if (typ_7 === int32_type) {
                return ~(~n_14);
            }
            else {
                const typeName_7 = fullName(typ_7);
                if (typeName_7 === "System.Int64") {
                    return fromInteger(n_14, false, 5);
                }
                else if (typ_7 === int16_type) {
                    return (n_14 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_7 === uint32_type) {
                    return n_14;
                }
                else if (typeName_7 === "System.UInt64") {
                    return fromInteger(n_14, true, 5);
                }
                else if (typ_7 === uint16_type) {
                    return n_14;
                }
                else if (typeName_7 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_14, false, 5));
                }
                else if (typeName_7 === "System.DateOnly") {
                    return fromDayNumber(~(~n_14));
                }
                else if (typeName_7 === "System.TimeOnly") {
                    return create(fromInteger(n_14, false, 5));
                }
                else if (typeName_7 === "Microsoft.FSharp.Core.int16`1") {
                    return (n_14 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName_7 === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n_14);
                }
                else if (typeName_7 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_14, false, 5);
                }
                else if (typ_7 === uint8_type) {
                    return n_14 & 0xFF;
                }
                else if (typ_7 === int8_type) {
                    return (n_14 + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_7)) {
                    return n_14;
                }
                else {
                    const arg_1_8 = name(typ_7);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_14)(arg_1_8);
                }
            }
        }
    }
    else if (matchValue === 206) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_8 = t;
            const n_16 = Reader__ReadUInt32(x);
            if (typ_8 === int32_type) {
                return ~(~n_16);
            }
            else {
                const typeName_8 = fullName(typ_8);
                if (typeName_8 === "System.Int64") {
                    return fromInteger(n_16, false, 6);
                }
                else if (typ_8 === int16_type) {
                    return (n_16 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_8 === uint32_type) {
                    return n_16;
                }
                else if (typeName_8 === "System.UInt64") {
                    return fromInteger(n_16, true, 6);
                }
                else if (typ_8 === uint16_type) {
                    return n_16 & 0xFFFF;
                }
                else if (typeName_8 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_16, false, 6));
                }
                else if (typeName_8 === "System.DateOnly") {
                    return fromDayNumber(~(~n_16));
                }
                else if (typeName_8 === "System.TimeOnly") {
                    return create(fromInteger(n_16, false, 6));
                }
                else if (typeName_8 === "Microsoft.FSharp.Core.int16`1") {
                    return (n_16 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName_8 === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n_16);
                }
                else if (typeName_8 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_16, false, 6);
                }
                else if (typ_8 === uint8_type) {
                    return n_16 & 0xFF;
                }
                else if (typ_8 === int8_type) {
                    return (n_16 + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_8)) {
                    return n_16;
                }
                else {
                    const arg_1_9 = name(typ_8);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_16)(arg_1_9);
                }
            }
        }
    }
    else if (matchValue === 207) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_9 = t;
            const n_18 = Reader__ReadUInt64(x);
            if (typ_9 === int32_type) {
                return ~(~toInt(n_18));
            }
            else {
                const typeName_9 = fullName(typ_9);
                if (typeName_9 === "System.Int64") {
                    return fromValue(n_18, false);
                }
                else if (typ_9 === int16_type) {
                    return (toInt(n_18) + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_9 === uint32_type) {
                    return toInt(n_18) >>> 0;
                }
                else if (typeName_9 === "System.UInt64") {
                    return fromValue(n_18, true);
                }
                else if (typ_9 === uint16_type) {
                    return toInt(n_18) & 0xFFFF;
                }
                else if (typeName_9 === "System.TimeSpan") {
                    return fromTicks_2(fromValue(n_18, false));
                }
                else if (typeName_9 === "System.DateOnly") {
                    return fromDayNumber(~(~toInt(n_18)));
                }
                else if (typeName_9 === "System.TimeOnly") {
                    return create(fromValue(n_18, false));
                }
                else if (typeName_9 === "Microsoft.FSharp.Core.int16`1") {
                    return (toInt(n_18) + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName_9 === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~toInt(n_18));
                }
                else if (typeName_9 === "Microsoft.FSharp.Core.int64`1") {
                    return fromValue(n_18, false);
                }
                else if (typ_9 === uint8_type) {
                    return toInt(n_18) & 0xFF;
                }
                else if (typ_9 === int8_type) {
                    return (toInt(n_18) + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_9)) {
                    return toNumber(n_18);
                }
                else {
                    const arg_1_10 = name(typ_9);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_18)(arg_1_10);
                }
            }
        }
    }
    else if (matchValue === 208) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_5 = t;
            const n_10 = Reader__ReadInt8(x) | 0;
            if (typ_5 === int32_type) {
                return n_10;
            }
            else {
                const typeName_5 = fullName(typ_5);
                if (typeName_5 === "System.Int64") {
                    return fromInteger(n_10, false, 0);
                }
                else if (typ_5 === int16_type) {
                    return n_10;
                }
                else if (typ_5 === uint32_type) {
                    return n_10 >>> 0;
                }
                else if (typeName_5 === "System.UInt64") {
                    return fromInteger(n_10, true, 0);
                }
                else if (typ_5 === uint16_type) {
                    return n_10 & 0xFFFF;
                }
                else if (typeName_5 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_10, false, 0));
                }
                else if (typeName_5 === "System.DateOnly") {
                    return fromDayNumber(n_10);
                }
                else if (typeName_5 === "System.TimeOnly") {
                    return create(fromInteger(n_10, false, 0));
                }
                else if (typeName_5 === "Microsoft.FSharp.Core.int16`1") {
                    return n_10;
                }
                else if (typeName_5 === "Microsoft.FSharp.Core.int32`1") {
                    return n_10;
                }
                else if (typeName_5 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_10, false, 0);
                }
                else if (typ_5 === uint8_type) {
                    return n_10 & 0xFF;
                }
                else if (typ_5 === int8_type) {
                    return n_10;
                }
                else if (isEnum(typ_5)) {
                    return n_10;
                }
                else {
                    const arg_1_6 = name(typ_5);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_10)(arg_1_6);
                }
            }
        }
    }
    else if (matchValue === 209) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_4 = t;
            const n_8 = Reader__ReadInt16(x) | 0;
            if (typ_4 === int32_type) {
                return n_8;
            }
            else {
                const typeName_4 = fullName(typ_4);
                if (typeName_4 === "System.Int64") {
                    return fromInteger(n_8, false, 1);
                }
                else if (typ_4 === int16_type) {
                    return n_8;
                }
                else if (typ_4 === uint32_type) {
                    return n_8 >>> 0;
                }
                else if (typeName_4 === "System.UInt64") {
                    return fromInteger(n_8, true, 1);
                }
                else if (typ_4 === uint16_type) {
                    return n_8 & 0xFFFF;
                }
                else if (typeName_4 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_8, false, 1));
                }
                else if (typeName_4 === "System.DateOnly") {
                    return fromDayNumber(n_8);
                }
                else if (typeName_4 === "System.TimeOnly") {
                    return create(fromInteger(n_8, false, 1));
                }
                else if (typeName_4 === "Microsoft.FSharp.Core.int16`1") {
                    return n_8;
                }
                else if (typeName_4 === "Microsoft.FSharp.Core.int32`1") {
                    return n_8;
                }
                else if (typeName_4 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_8, false, 1);
                }
                else if (typ_4 === uint8_type) {
                    return n_8 & 0xFF;
                }
                else if (typ_4 === int8_type) {
                    return (n_8 + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_4)) {
                    return n_8;
                }
                else {
                    const arg_1_5 = name(typ_4);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_8)(arg_1_5);
                }
            }
        }
    }
    else if (matchValue === 210) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_3 = t;
            const n_6 = Reader__ReadInt32(x) | 0;
            if (typ_3 === int32_type) {
                return n_6;
            }
            else {
                const typeName_3 = fullName(typ_3);
                if (typeName_3 === "System.Int64") {
                    return fromInteger(n_6, false, 2);
                }
                else if (typ_3 === int16_type) {
                    return (n_6 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_3 === uint32_type) {
                    return n_6 >>> 0;
                }
                else if (typeName_3 === "System.UInt64") {
                    return fromInteger(n_6, true, 2);
                }
                else if (typ_3 === uint16_type) {
                    return n_6 & 0xFFFF;
                }
                else if (typeName_3 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_6, false, 2));
                }
                else if (typeName_3 === "System.DateOnly") {
                    return fromDayNumber(n_6);
                }
                else if (typeName_3 === "System.TimeOnly") {
                    return create(fromInteger(n_6, false, 2));
                }
                else if (typeName_3 === "Microsoft.FSharp.Core.int16`1") {
                    return (n_6 + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName_3 === "Microsoft.FSharp.Core.int32`1") {
                    return n_6;
                }
                else if (typeName_3 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_6, false, 2);
                }
                else if (typ_3 === uint8_type) {
                    return n_6 & 0xFF;
                }
                else if (typ_3 === int8_type) {
                    return (n_6 + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_3)) {
                    return n_6;
                }
                else {
                    const arg_1_4 = name(typ_3);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_6)(arg_1_4);
                }
            }
        }
    }
    else if (matchValue === 211) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else {
            const typ_2 = t;
            const n_4 = Reader__ReadInt64(x);
            if (typ_2 === int32_type) {
                return ~(~toInt(n_4));
            }
            else {
                const typeName_2 = fullName(typ_2);
                if (typeName_2 === "System.Int64") {
                    return fromValue(n_4, false);
                }
                else if (typ_2 === int16_type) {
                    return (toInt(n_4) + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ_2 === uint32_type) {
                    return toInt(n_4) >>> 0;
                }
                else if (typeName_2 === "System.UInt64") {
                    return fromValue(n_4, true);
                }
                else if (typ_2 === uint16_type) {
                    return toInt(n_4) & 0xFFFF;
                }
                else if (typeName_2 === "System.TimeSpan") {
                    return fromTicks_2(fromValue(n_4, false));
                }
                else if (typeName_2 === "System.DateOnly") {
                    return fromDayNumber(~(~toInt(n_4)));
                }
                else if (typeName_2 === "System.TimeOnly") {
                    return create(fromValue(n_4, false));
                }
                else if (typeName_2 === "Microsoft.FSharp.Core.int16`1") {
                    return (toInt(n_4) + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName_2 === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~toInt(n_4));
                }
                else if (typeName_2 === "Microsoft.FSharp.Core.int64`1") {
                    return fromValue(n_4, false);
                }
                else if (typ_2 === uint8_type) {
                    return toInt(n_4) & 0xFF;
                }
                else if (typ_2 === int8_type) {
                    return (toInt(n_4) + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ_2)) {
                    return toNumber(n_4);
                }
                else {
                    const arg_1_3 = name(typ_2);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_4)(arg_1_3);
                }
            }
        }
    }
    else if (matchValue === 217) {
        return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~(~Reader__ReadByte(x))));
    }
    else if (matchValue === 218) {
        return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~(~Reader__ReadUInt16(x))));
    }
    else if (matchValue === 219) {
        return interpretStringAs(t, Reader__ReadString_Z524259A4(x, ~(~Reader__ReadUInt32(x))));
    }
    else if (matchValue === 220) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadArray_412036CA(x, ~(~Reader__ReadUInt16(x)), t);
        }
    }
    else if (matchValue === 221) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadArray_412036CA(x, ~(~Reader__ReadUInt32(x)), t);
        }
    }
    else if (matchValue === 222) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else if ((matchValue | 15) === 143) {
            return Reader__ReadMap_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadMap_412036CA(x, ~(~Reader__ReadUInt16(x)), t);
        }
    }
    else if (matchValue === 223) {
        if ((matchValue | 127) === 127) {
            const typ = t;
            const n = matchValue;
            if (typ === int32_type) {
                return ~(~n);
            }
            else {
                const typeName = fullName(typ);
                if (typeName === "System.Int64") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === int16_type) {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typ === uint32_type) {
                    return n;
                }
                else if (typeName === "System.UInt64") {
                    return fromInteger(n, true, 4);
                }
                else if (typ === uint16_type) {
                    return n;
                }
                else if (typeName === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n, false, 4));
                }
                else if (typeName === "System.DateOnly") {
                    return fromDayNumber(~(~n));
                }
                else if (typeName === "System.TimeOnly") {
                    return create(fromInteger(n, false, 4));
                }
                else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                    return (n + 0x8000 & 0xFFFF) - 0x8000;
                }
                else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                    return ~(~n);
                }
                else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n, false, 4);
                }
                else if (typ === uint8_type) {
                    return n;
                }
                else if (typ === int8_type) {
                    return (n + 0x80 & 0xFF) - 0x80;
                }
                else if (isEnum(typ)) {
                    return n;
                }
                else {
                    const arg_1_1 = name(typ);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
                }
            }
        }
        else if ((matchValue | 31) === 255) {
            const typ_1 = t;
            const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
            if (typ_1 === int32_type) {
                return n_2;
            }
            else {
                const typeName_1 = fullName(typ_1);
                if (typeName_1 === "System.Int64") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === int16_type) {
                    return n_2;
                }
                else if (typ_1 === uint32_type) {
                    return n_2 >>> 0;
                }
                else if (typeName_1 === "System.UInt64") {
                    return fromInteger(n_2, true, 0);
                }
                else if (typ_1 === uint16_type) {
                    return n_2 & 0xFFFF;
                }
                else if (typeName_1 === "System.TimeSpan") {
                    return fromTicks_2(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "System.DateOnly") {
                    return fromDayNumber(n_2);
                }
                else if (typeName_1 === "System.TimeOnly") {
                    return create(fromInteger(n_2, false, 0));
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                    return n_2;
                }
                else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                    return fromInteger(n_2, false, 0);
                }
                else if (typ_1 === uint8_type) {
                    return n_2 & 0xFF;
                }
                else if (typ_1 === int8_type) {
                    return n_2;
                }
                else if (isEnum(typ_1)) {
                    return n_2;
                }
                else {
                    const arg_1_2 = name(typ_1);
                    return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
                }
            }
        }
        else if ((matchValue | 15) === 159) {
            return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else if ((matchValue | 15) === 143) {
            return Reader__ReadMap_412036CA(x, ~(~(matchValue & 15)), t);
        }
        else {
            return Reader__ReadMap_412036CA(x, ~(~Reader__ReadUInt32(x)), t);
        }
    }
    else if ((matchValue | 127) === 127) {
        const typ = t;
        const n = matchValue;
        if (typ === int32_type) {
            return ~(~n);
        }
        else {
            const typeName = fullName(typ);
            if (typeName === "System.Int64") {
                return fromInteger(n, false, 4);
            }
            else if (typ === int16_type) {
                return (n + 0x8000 & 0xFFFF) - 0x8000;
            }
            else if (typ === uint32_type) {
                return n;
            }
            else if (typeName === "System.UInt64") {
                return fromInteger(n, true, 4);
            }
            else if (typ === uint16_type) {
                return n;
            }
            else if (typeName === "System.TimeSpan") {
                return fromTicks_2(fromInteger(n, false, 4));
            }
            else if (typeName === "System.DateOnly") {
                return fromDayNumber(~(~n));
            }
            else if (typeName === "System.TimeOnly") {
                return create(fromInteger(n, false, 4));
            }
            else if (typeName === "Microsoft.FSharp.Core.int16`1") {
                return (n + 0x8000 & 0xFFFF) - 0x8000;
            }
            else if (typeName === "Microsoft.FSharp.Core.int32`1") {
                return ~(~n);
            }
            else if (typeName === "Microsoft.FSharp.Core.int64`1") {
                return fromInteger(n, false, 4);
            }
            else if (typ === uint8_type) {
                return n;
            }
            else if (typ === int8_type) {
                return (n + 0x80 & 0xFF) - 0x80;
            }
            else if (isEnum(typ)) {
                return n;
            }
            else {
                const arg_1_1 = name(typ);
                return toFail(printf("Cannot interpret integer %A as %s."))(n)(arg_1_1);
            }
        }
    }
    else if ((matchValue | 31) === 255) {
        const typ_1 = t;
        const n_2 = ((matchValue + 0x80 & 0xFF) - 0x80) | 0;
        if (typ_1 === int32_type) {
            return n_2;
        }
        else {
            const typeName_1 = fullName(typ_1);
            if (typeName_1 === "System.Int64") {
                return fromInteger(n_2, false, 0);
            }
            else if (typ_1 === int16_type) {
                return n_2;
            }
            else if (typ_1 === uint32_type) {
                return n_2 >>> 0;
            }
            else if (typeName_1 === "System.UInt64") {
                return fromInteger(n_2, true, 0);
            }
            else if (typ_1 === uint16_type) {
                return n_2 & 0xFFFF;
            }
            else if (typeName_1 === "System.TimeSpan") {
                return fromTicks_2(fromInteger(n_2, false, 0));
            }
            else if (typeName_1 === "System.DateOnly") {
                return fromDayNumber(n_2);
            }
            else if (typeName_1 === "System.TimeOnly") {
                return create(fromInteger(n_2, false, 0));
            }
            else if (typeName_1 === "Microsoft.FSharp.Core.int16`1") {
                return n_2;
            }
            else if (typeName_1 === "Microsoft.FSharp.Core.int32`1") {
                return n_2;
            }
            else if (typeName_1 === "Microsoft.FSharp.Core.int64`1") {
                return fromInteger(n_2, false, 0);
            }
            else if (typ_1 === uint8_type) {
                return n_2 & 0xFF;
            }
            else if (typ_1 === int8_type) {
                return n_2;
            }
            else if (isEnum(typ_1)) {
                return n_2;
            }
            else {
                const arg_1_2 = name(typ_1);
                return toFail(printf("Cannot interpret integer %A as %s."))(n_2)(arg_1_2);
            }
        }
    }
    else if ((matchValue | 15) === 159) {
        return Reader__ReadArray_412036CA(x, ~(~(matchValue & 15)), t);
    }
    else if ((matchValue | 15) === 143) {
        return Reader__ReadMap_412036CA(x, ~(~(matchValue & 15)), t);
    }
    else {
        const arg_16 = name(t);
        const arg_14 = x.pos | 0;
        return toFail(printf("Position %d, byte %d, expected type %s."))(arg_14)(matchValue)(arg_16);
    }
}

export function Reader__readNumber<$a>(this$: Reader, len: int32, bytesInterpretation: (arg0: [Array<uint8>, int32]) => $a): $a {
    this$.pos = ((this$.pos + len) | 0);
    if (isLittleEndian()) {
        for (let i: int32 = 0; i <= (len - 1); i++) {
            this$.numberBuffer[i] = this$.data[(this$.pos - 1) - i];
        }
        return bytesInterpretation([this$.numberBuffer, 0]);
    }
    else {
        return bytesInterpretation([this$.data, this$.pos - len]);
    }
}

