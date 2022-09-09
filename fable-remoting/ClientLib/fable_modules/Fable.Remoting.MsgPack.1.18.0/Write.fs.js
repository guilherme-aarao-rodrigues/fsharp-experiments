import { addToDict, tryGetValue } from "../fable-library.4.0.0-theta-001/MapUtil.js";
import { name, class_type, option_type, list_type, obj_type, equals, getGenerics, getGenericTypeDefinition, isGenericType, isEnum, getTupleFields, getTupleElements, isTuple, getUnionCaseFields, getUnionFields, isUnion, getElementType, isArray, getRecordFields, getRecordElements, isRecord, fullName } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { FSharpRef } from "../fable-library.4.0.0-theta-001/Types.js";
import { disposeSafe, isDisposable, getEnumerator, count, partialApply, curry } from "../fable-library.4.0.0-theta-001/Util.js";
import { getBytesDouble, getBytesSingle, getBytesInt64, isLittleEndian } from "../fable-library.4.0.0-theta-001/BitConverter.js";
import { head, map, reverse, addRangeInPlace } from "../fable-library.4.0.0-theta-001/Array.js";
import { fromNumber, fromInteger, fromValue, op_RightShiftUnsigned, toInt, fromBits, compare } from "../fable-library.4.0.0-theta-001/Long.js";
import { getBits } from "../fable-library.4.0.0-theta-001/Decimal.js";
import { value as value_7 } from "../fable-library.4.0.0-theta-001/Option.js";
import { printf, toFail } from "../fable-library.4.0.0-theta-001/String.js";
import { get_UTF8 } from "../fable-library.4.0.0-theta-001/Encoding.js";
import { toByteArray } from "../fable-library.4.0.0-theta-001/BigInt.js";
import { guidToArray } from "../fable-library.4.0.0-theta-001/Guid.js";
import { getTicks } from "../fable-library.4.0.0-theta-001/Date.js";
import { ticks, totalMinutes } from "../fable-library.4.0.0-theta-001/TimeSpan.js";
import { dayNumber } from "../fable-library.4.0.0-theta-001/DateOnly.js";

const serializerCache = new Map([]);

function cacheGetOrAdd(typ, f) {
    let matchValue;
    let outArg = null;
    matchValue = [tryGetValue(serializerCache, fullName(typ), new FSharpRef(() => outArg, (v) => {
        outArg = curry(2, v);
    })), outArg];
    if (matchValue[0]) {
        return (arg) => {
            const clo = matchValue[1](arg);
            return (arg_1) => {
                clo(arg_1);
            };
        };
    }
    else {
        addToDict(serializerCache, fullName(typ), curry(2, f));
        return (arg_2) => {
            const clo_1 = partialApply(1, f, [arg_2]);
            return (arg_3) => {
                clo_1(arg_3);
            };
        };
    }
}

function write64bitNumber(b1, b2, b3, b4, b5, b6, b7, b8, out) {
    if ((((b4 > 0) ? true : (b3 > 0)) ? true : (b2 > 0)) ? true : (b1 > 0)) {
        void (out.push(207));
        void (out.push(b1));
        void (out.push(b2));
        void (out.push(b3));
        void (out.push(b4));
        void (out.push(b5));
        void (out.push(b6));
        void (out.push(b7));
        void (out.push(b8));
    }
    else {
        const b1_1 = b5;
        const b2_1 = b6;
        const b3_1 = b7;
        const b4_1 = b8;
        const out_1 = out;
        const writeFormat = true;
        if ((b2_1 > 0) ? true : (b1_1 > 0)) {
            if (writeFormat) {
                void (out_1.push(206));
            }
            void (out_1.push(b1_1));
            void (out_1.push(b2_1));
            void (out_1.push(b3_1));
            void (out_1.push(b4_1));
        }
        else if (b3_1 > 0) {
            if (writeFormat) {
                void (out_1.push(205));
            }
            void (out_1.push(b3_1));
            void (out_1.push(b4_1));
        }
        else {
            if (writeFormat) {
                void (out_1.push(204));
            }
            void (out_1.push(b4_1));
        }
    }
}

function writeSignedNumber(bytes, out) {
    if (isLittleEndian()) {
        addRangeInPlace(reverse(bytes), out);
    }
    else {
        addRangeInPlace(bytes, out);
    }
}

function writeUInt64(n, out) {
    let value_1, value_1_1, value_2, value_3, value_4, value_5, value_6;
    if (compare(n, fromBits(128, 0, true)) < 0) {
        void (out.push(toInt(n) & 0xFF));
    }
    else {
        const n_1 = n;
        write64bitNumber((value_1 = op_RightShiftUnsigned(n_1, 56), toInt(value_1) & 0xFF), (value_1_1 = op_RightShiftUnsigned(n_1, 48), toInt(value_1_1) & 0xFF), (value_2 = op_RightShiftUnsigned(n_1, 40), toInt(value_2) & 0xFF), (value_3 = op_RightShiftUnsigned(n_1, 32), toInt(value_3) & 0xFF), (value_4 = op_RightShiftUnsigned(n_1, 24), toInt(value_4) & 0xFF), (value_5 = op_RightShiftUnsigned(n_1, 16), toInt(value_5) & 0xFF), (value_6 = op_RightShiftUnsigned(n_1, 8), toInt(value_6) & 0xFF), toInt(n_1) & 0xFF, out);
    }
}

function writeInt64(n, out) {
    if (compare(n, fromBits(0, 0, false)) >= 0) {
        writeUInt64(fromValue(n, true), out);
    }
    else if (compare(n, fromBits(4294967264, 4294967295, false)) > 0) {
        void (out.push((toInt(n) & 0xFF) | 224));
    }
    else {
        void (out.push(211));
        writeSignedNumber(getBytesInt64(n), out);
    }
}

function writeByte(b, out) {
    if (b < 128) {
        void (out.push(b));
    }
    else {
        void (out.push(204));
        void (out.push(b));
    }
}

function writeSingle(n, out) {
    void (out.push(202));
    writeSignedNumber(getBytesSingle(n), out);
}

function writeDouble(n, out) {
    void (out.push(203));
    writeSignedNumber(getBytesDouble(n), out);
}

function writeBin(data, out) {
    let n, b, value, b_1, value_1, b_2, value_2, b_3;
    if (data.length < 256) {
        void (out.push(196));
    }
    else if (data.length < 65536) {
        void (out.push(197));
    }
    else {
        void (out.push(198));
    }
    ((n = (data.length >>> 0), (b = ((value = (n >>> 24), value & 0xFF)), (b_1 = ((value_1 = (n >>> 16), value_1 & 0xFF)), (b_2 = ((value_2 = (n >>> 8), value_2 & 0xFF)), (b_3 = (n & 0xFF), (writeFormat) => {
        const b1 = b;
        const b2 = b_1;
        const b3 = b_2;
        const b4 = b_3;
        const out_2 = out;
        const writeFormat_1 = writeFormat;
        if ((b2 > 0) ? true : (b1 > 0)) {
            if (writeFormat_1) {
                void (out_2.push(206));
            }
            void (out_2.push(b1));
            void (out_2.push(b2));
            void (out_2.push(b3));
            void (out_2.push(b4));
        }
        else if (b3 > 0) {
            if (writeFormat_1) {
                void (out_2.push(205));
            }
            void (out_2.push(b3));
            void (out_2.push(b4));
        }
        else {
            if (writeFormat_1) {
                void (out_2.push(204));
            }
            void (out_2.push(b4));
        }
    }))))))(false);
    addRangeInPlace(data, out);
}

function writeArrayHeader(len, out) {
    let value, n, b, value_1, b_1, value_1_1, b_2, value_2, b_3;
    if (len < 16) {
        void (out.push(144 + (len & 0xFF)));
    }
    else if (len < 65536) {
        void (out.push(220));
        void (out.push((value = ((len >> 8) | 0), value & 0xFF)));
        void (out.push(len & 0xFF));
    }
    else {
        void (out.push(221));
        ((n = (len >>> 0), (b = ((value_1 = (n >>> 24), value_1 & 0xFF)), (b_1 = ((value_1_1 = (n >>> 16), value_1_1 & 0xFF)), (b_2 = ((value_2 = (n >>> 8), value_2 & 0xFF)), (b_3 = (n & 0xFF), (writeFormat) => {
            const b1 = b;
            const b2 = b_1;
            const b3 = b_2;
            const b4 = b_3;
            const out_2 = out;
            const writeFormat_1 = writeFormat;
            if ((b2 > 0) ? true : (b1 > 0)) {
                if (writeFormat_1) {
                    void (out_2.push(206));
                }
                void (out_2.push(b1));
                void (out_2.push(b2));
                void (out_2.push(b3));
                void (out_2.push(b4));
            }
            else if (b3 > 0) {
                if (writeFormat_1) {
                    void (out_2.push(205));
                }
                void (out_2.push(b3));
                void (out_2.push(b4));
            }
            else {
                if (writeFormat_1) {
                    void (out_2.push(204));
                }
                void (out_2.push(b4));
            }
        }))))))(false);
    }
}

function writeDecimal(n, out) {
    let n_1, b_1, value, b_1_1, value_1, b_2, value_2, b_3;
    const bits = getBits(n);
    void (out.push(144 + (4 & 0xFF)));
    for (let idx = 0; idx <= (bits.length - 1); idx++) {
        const b = bits[idx] | 0;
        ((n_1 = (b >>> 0), (b_1 = ((value = (n_1 >>> 24), value & 0xFF)), (b_1_1 = ((value_1 = (n_1 >>> 16), value_1 & 0xFF)), (b_2 = ((value_2 = (n_1 >>> 8), value_2 & 0xFF)), (b_3 = (n_1 & 0xFF), (writeFormat) => {
            const b1 = b_1;
            const b2 = b_1_1;
            const b3 = b_2;
            const b4 = b_3;
            const out_2 = out;
            const writeFormat_1 = writeFormat;
            if ((b2 > 0) ? true : (b1 > 0)) {
                if (writeFormat_1) {
                    void (out_2.push(206));
                }
                void (out_2.push(b1));
                void (out_2.push(b2));
                void (out_2.push(b3));
                void (out_2.push(b4));
            }
            else if (b3 > 0) {
                if (writeFormat_1) {
                    void (out_2.push(205));
                }
                void (out_2.push(b3));
                void (out_2.push(b4));
            }
            else {
                if (writeFormat_1) {
                    void (out_2.push(204));
                }
                void (out_2.push(b4));
            }
        }))))))(true);
    }
}

function writeArray(out, t, arr) {
    writeArrayHeader(count(arr), out);
    const enumerator = getEnumerator(arr);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            writeObject(enumerator["System.Collections.IEnumerator.get_Current"](), t, out);
        }
    }
    finally {
        if (isDisposable(enumerator)) {
            disposeSafe(enumerator);
        }
    }
}

function writeMap(out, keyType, valueType, dict) {
    let value, n, b, value_1, b_1, value_1_1, b_2, value_2, b_3;
    const length = count(dict) | 0;
    if (length < 16) {
        void (out.push(128 + (length & 0xFF)));
    }
    else if (length < 65536) {
        void (out.push(222));
        void (out.push((value = ((length >> 8) | 0), value & 0xFF)));
        void (out.push(length & 0xFF));
    }
    else {
        void (out.push(223));
        ((n = (length >>> 0), (b = ((value_1 = (n >>> 24), value_1 & 0xFF)), (b_1 = ((value_1_1 = (n >>> 16), value_1_1 & 0xFF)), (b_2 = ((value_2 = (n >>> 8), value_2 & 0xFF)), (b_3 = (n & 0xFF), (writeFormat) => {
            const b1 = b;
            const b2 = b_1;
            const b3 = b_2;
            const b4 = b_3;
            const out_2 = out;
            const writeFormat_1 = writeFormat;
            if ((b2 > 0) ? true : (b1 > 0)) {
                if (writeFormat_1) {
                    void (out_2.push(206));
                }
                void (out_2.push(b1));
                void (out_2.push(b2));
                void (out_2.push(b3));
                void (out_2.push(b4));
            }
            else if (b3 > 0) {
                if (writeFormat_1) {
                    void (out_2.push(205));
                }
                void (out_2.push(b3));
                void (out_2.push(b4));
            }
            else {
                if (writeFormat_1) {
                    void (out_2.push(204));
                }
                void (out_2.push(b4));
            }
        }))))))(false);
    }
    const enumerator = getEnumerator(dict);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const kvp = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            writeObject(kvp[0], keyType, out);
            writeObject(kvp[1], valueType, out);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
}

function writeSet(out, t, set$) {
    writeArrayHeader(count(set$), out);
    const enumerator = getEnumerator(set$);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            writeObject(enumerator["System.Collections.IEnumerator.get_Current"](), t, out);
        }
    }
    finally {
        if (isDisposable(enumerator)) {
            disposeSafe(enumerator);
        }
    }
}

function writeUnion(out, tag, types, vals) {
    if (vals.length === 0) {
        void (out.push(144 + 1));
        void (out.push(tag & 0xFF));
    }
    else {
        void (out.push(144 + 2));
        void (out.push(tag & 0xFF));
        if (vals.length === 1) {
            writeObject(vals[0], types[0], out);
        }
        else {
            writeArrayHeader(vals.length, out);
            for (let i = 0; i <= (vals.length - 1); i++) {
                writeObject(vals[i], types[i], out);
            }
        }
    }
}

export function writeObject(x, t, out) {
    if (x == null) {
        void (out.push(192));
    }
    else {
        let matchValue;
        let outArg = null;
        matchValue = [tryGetValue(serializerCache, fullName(t), new FSharpRef(() => outArg, (v) => {
            outArg = curry(2, v);
        })), outArg];
        if (matchValue[0]) {
            matchValue[1](x)(out);
        }
        else if (isRecord(t, true)) {
            const fieldTypes = map((x_1) => x_1[1], getRecordElements(t, true));
            cacheGetOrAdd(t, (x_2, out_2) => {
                const out_3 = out_2;
                const vals = getRecordFields(x_2, true);
                writeArrayHeader(vals.length, out_3);
                for (let i = 0; i <= (vals.length - 1); i++) {
                    writeObject(vals[i], fieldTypes[i], out_3);
                }
            })(x)(out);
        }
        else if (isArray(t)) {
            const elementType = getElementType(t);
            cacheGetOrAdd(t, (x_3, out_4) => {
                writeArray(out_4, elementType, x_3);
            })(x)(out);
        }
        else if (isUnion(t, true)) {
            cacheGetOrAdd(t, (x_4, out_5) => {
                const patternInput = getUnionFields(x_4, t, true);
                const case$ = patternInput[0];
                const fieldTypes_1 = map((x_5) => x_5[1], getUnionCaseFields(case$));
                writeUnion(out_5, case$.tag, fieldTypes_1, patternInput[1]);
            })(x)(out);
        }
        else if (isTuple(t)) {
            const fieldTypes_2 = getTupleElements(t);
            cacheGetOrAdd(t, (x_6, out_6) => {
                const out_8 = out_6;
                const vals_2 = getTupleFields(x_6);
                writeArrayHeader(vals_2.length, out_8);
                for (let i_1 = 0; i_1 <= (vals_2.length - 1); i_1++) {
                    writeObject(vals_2[i_1], fieldTypes_2[i_1], out_8);
                }
            })(x)(out);
        }
        else if (isEnum(t)) {
            cacheGetOrAdd(t, (x_7, out_9) => {
                writeInt64(x_7, out_9);
            })(x)(out);
        }
        else if (isGenericType(t)) {
            const tDef = getGenericTypeDefinition(t);
            const genArgs = getGenerics(t);
            if (equals(tDef, list_type(obj_type))) {
                const elementType_1 = head(genArgs);
                cacheGetOrAdd(t, (x_8, out_10) => {
                    writeArray(out_10, elementType_1, x_8);
                })(x)(out);
            }
            else if (equals(tDef, option_type(obj_type))) {
                cacheGetOrAdd(t, (x_9, out_11) => {
                    const opt = x_9;
                    const patternInput_1 = (opt != null) ? [1, [value_7(opt)]] : [0, []];
                    writeUnion(out_11, patternInput_1[0], genArgs, patternInput_1[1]);
                })(x)(out);
            }
            else if (equals(tDef, class_type("System.Collections.Generic.Dictionary`2", [obj_type, obj_type])) ? true : equals(tDef, class_type("Microsoft.FSharp.Collections.FSharpMap`2", [obj_type, obj_type]))) {
                const keyType = genArgs[0];
                const valueType = genArgs[1];
                cacheGetOrAdd(t, (x_10, out_12) => {
                    writeMap(out_12, keyType, valueType, x_10);
                })(x)(out);
            }
            else if (equals(tDef, class_type("Microsoft.FSharp.Collections.FSharpSet`1", [obj_type]))) {
                const elementType_2 = head(genArgs);
                cacheGetOrAdd(t, (x_11, out_13) => {
                    writeSet(out_13, elementType_2, x_11);
                })(x)(out);
            }
            else {
                const arg = name(t);
                toFail(printf("Cannot serialize %s."))(arg);
            }
        }
        else if (((fullName(t) === "Microsoft.FSharp.Core.int16`1") ? true : (fullName(t) === "Microsoft.FSharp.Core.int32`1")) ? true : (fullName(t) === "Microsoft.FSharp.Core.int64`1")) {
            cacheGetOrAdd(t, (x_12, out_14) => {
                writeInt64(x_12, out_14);
            })(x)(out);
        }
        else if (fullName(t) === "Microsoft.FSharp.Core.decimal`1") {
            cacheGetOrAdd(t, (x_13, out_15) => {
                writeDecimal(x_13, out_15);
            })(x)(out);
        }
        else if (fullName(t) === "Microsoft.FSharp.Core.float`1") {
            cacheGetOrAdd(t, (x_14, out_16) => {
                writeDouble(x_14, out_16);
            })(x)(out);
        }
        else if (fullName(t) === "Microsoft.FSharp.Core.float32`1") {
            cacheGetOrAdd(t, (x_15, out_17) => {
                writeSingle(x_15, out_17);
            })(x)(out);
        }
        else {
            const arg_1 = name(t);
            toFail(printf("Cannot serialize %s."))(arg_1);
        }
    }
}

addToDict(serializerCache, "System.Byte", (x) => ((out) => {
    writeByte(x, out);
}));

addToDict(serializerCache, "System.SByte", (x) => ((out) => {
    writeByte(x & 0xFF, out);
}));

addToDict(serializerCache, "Microsoft.FSharp.Core.Unit", (_arg) => ((out) => {
    void (out.push(192));
}));

addToDict(serializerCache, "System.Boolean", (x) => ((out) => {
    void (out.push(x ? 195 : 194));
}));

addToDict(serializerCache, "System.Char", (x) => ((out) => {
    let len, n, b, value, b_1, value_1, b_2, value_2, b_3;
    const out_1 = out;
    const str_1 = get_UTF8().getBytes(x);
    if (str_1.length < 32) {
        void (out_1.push((len = (str_1.length | 0), 160 + (len & 0xFF))));
    }
    else {
        if (str_1.length < 256) {
            void (out_1.push(217));
        }
        else if (str_1.length < 65536) {
            void (out_1.push(218));
        }
        else {
            void (out_1.push(219));
        }
        ((n = (str_1.length >>> 0), (b = ((value = (n >>> 24), value & 0xFF)), (b_1 = ((value_1 = (n >>> 16), value_1 & 0xFF)), (b_2 = ((value_2 = (n >>> 8), value_2 & 0xFF)), (b_3 = (n & 0xFF), (writeFormat) => {
            const b1 = b;
            const b2 = b_1;
            const b3 = b_2;
            const b4 = b_3;
            const out_3 = out_1;
            const writeFormat_1 = writeFormat;
            if ((b2 > 0) ? true : (b1 > 0)) {
                if (writeFormat_1) {
                    void (out_3.push(206));
                }
                void (out_3.push(b1));
                void (out_3.push(b2));
                void (out_3.push(b3));
                void (out_3.push(b4));
            }
            else if (b3 > 0) {
                if (writeFormat_1) {
                    void (out_3.push(205));
                }
                void (out_3.push(b3));
                void (out_3.push(b4));
            }
            else {
                if (writeFormat_1) {
                    void (out_3.push(204));
                }
                void (out_3.push(b4));
            }
        }))))))(false);
    }
    addRangeInPlace(str_1, out_1);
}));

addToDict(serializerCache, "System.String", (x) => ((out) => {
    let len, n, b, value, b_1, value_1, b_2, value_2, b_3;
    const out_1 = out;
    const str_1 = get_UTF8().getBytes(x);
    if (str_1.length < 32) {
        void (out_1.push((len = (str_1.length | 0), 160 + (len & 0xFF))));
    }
    else {
        if (str_1.length < 256) {
            void (out_1.push(217));
        }
        else if (str_1.length < 65536) {
            void (out_1.push(218));
        }
        else {
            void (out_1.push(219));
        }
        ((n = (str_1.length >>> 0), (b = ((value = (n >>> 24), value & 0xFF)), (b_1 = ((value_1 = (n >>> 16), value_1 & 0xFF)), (b_2 = ((value_2 = (n >>> 8), value_2 & 0xFF)), (b_3 = (n & 0xFF), (writeFormat) => {
            const b1 = b;
            const b2 = b_1;
            const b3 = b_2;
            const b4 = b_3;
            const out_3 = out_1;
            const writeFormat_1 = writeFormat;
            if ((b2 > 0) ? true : (b1 > 0)) {
                if (writeFormat_1) {
                    void (out_3.push(206));
                }
                void (out_3.push(b1));
                void (out_3.push(b2));
                void (out_3.push(b3));
                void (out_3.push(b4));
            }
            else if (b3 > 0) {
                if (writeFormat_1) {
                    void (out_3.push(205));
                }
                void (out_3.push(b3));
                void (out_3.push(b4));
            }
            else {
                if (writeFormat_1) {
                    void (out_3.push(204));
                }
                void (out_3.push(b4));
            }
        }))))))(false);
    }
    addRangeInPlace(str_1, out_1);
}));

addToDict(serializerCache, "System.Int32", (x) => ((out) => {
    writeInt64(fromInteger(x, false, 2), out);
}));

addToDict(serializerCache, "System.Int16", (x) => ((out) => {
    writeInt64(fromInteger(x, false, 1), out);
}));

addToDict(serializerCache, "System.Int64", (x) => ((out) => {
    writeInt64(x, out);
}));

addToDict(serializerCache, "System.UInt32", (x) => ((out) => {
    writeUInt64(fromInteger(x, true, 6), out);
}));

addToDict(serializerCache, "System.UInt16", (x) => ((out) => {
    writeUInt64(fromInteger(x, true, 5), out);
}));

addToDict(serializerCache, "System.UInt64", (x) => ((out) => {
    writeUInt64(x, out);
}));

addToDict(serializerCache, "System.Single", (x) => ((out) => {
    writeSingle(x, out);
}));

addToDict(serializerCache, "System.Double", (x) => ((out) => {
    writeDouble(x, out);
}));

addToDict(serializerCache, "System.Decimal", (x) => ((out) => {
    writeDecimal(x, out);
}));

addToDict(serializerCache, "System.Byte[]", (x) => ((out) => {
    writeBin(x, out);
}));

addToDict(serializerCache, "System.Numerics.BigInteger", (x) => ((out) => {
    let copyOfStruct;
    writeBin((copyOfStruct = x, toByteArray(copyOfStruct)), out);
}));

addToDict(serializerCache, "System.Guid", (x) => ((out) => {
    let copyOfStruct;
    writeBin((copyOfStruct = x, guidToArray(copyOfStruct)), out);
}));

addToDict(serializerCache, "System.DateTime", (x) => ((out) => {
    const out_1 = out;
    const dto = x;
    void (out_1.push(144 + 2));
    writeInt64(getTicks(dto), out_1);
    writeInt64(fromInteger(dto.kind, false, 2), out_1);
}));

addToDict(serializerCache, "System.DateTimeOffset", (x) => ((out) => {
    let copyOfStruct;
    const out_1 = out;
    const dto = x;
    void (out_1.push(144 + 2));
    writeInt64(getTicks(dto), out_1);
    writeInt64(fromNumber((copyOfStruct = dto.offset, totalMinutes(copyOfStruct)), false), out_1);
}));

addToDict(serializerCache, "System.DateOnly", (x) => ((out) => {
    let n, b, value, b_1, value_1, b_2, value_2, b_3;
    ((n = (dayNumber(x) >>> 0), (b = ((value = (n >>> 24), value & 0xFF)), (b_1 = ((value_1 = (n >>> 16), value_1 & 0xFF)), (b_2 = ((value_2 = (n >>> 8), value_2 & 0xFF)), (b_3 = (n & 0xFF), (writeFormat) => {
        const b1 = b;
        const b2 = b_1;
        const b3 = b_2;
        const b4 = b_3;
        const out_3 = out;
        const writeFormat_1 = writeFormat;
        if ((b2 > 0) ? true : (b1 > 0)) {
            if (writeFormat_1) {
                void (out_3.push(206));
            }
            void (out_3.push(b1));
            void (out_3.push(b2));
            void (out_3.push(b3));
            void (out_3.push(b4));
        }
        else if (b3 > 0) {
            if (writeFormat_1) {
                void (out_3.push(205));
            }
            void (out_3.push(b3));
            void (out_3.push(b4));
        }
        else {
            if (writeFormat_1) {
                void (out_3.push(204));
            }
            void (out_3.push(b4));
        }
    }))))))(true);
}));

addToDict(serializerCache, "System.TimeOnly", (x) => ((out) => {
    writeUInt64(fromValue(ticks(x), true), out);
}));

addToDict(serializerCache, "System.TimeSpan", (x) => ((out) => {
    let copyOfStruct;
    writeInt64((copyOfStruct = x, ticks(copyOfStruct)), out);
}));

