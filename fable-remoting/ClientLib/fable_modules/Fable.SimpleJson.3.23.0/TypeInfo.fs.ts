import { Union, Record } from "../fable-library.4.0.0-theta-001/Types.js";
import { union_type, tuple_type, lambda_type, unit_type, array_type, record_type, class_type, string_type, TypeInfo as TypeInfo_1 } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { int32 } from "../fable-library.4.0.0-theta-001/Int32.js";

export class RecordField extends Record {
    FieldName: string;
    FieldType: TypeInfo;
    PropertyInfo: any;
    constructor(FieldName: string, FieldType: TypeInfo, PropertyInfo: any) {
        super();
        this.FieldName = FieldName;
        this.FieldType = FieldType;
        this.PropertyInfo = PropertyInfo;
    }
}

export function RecordField$reflection(): TypeInfo_1 {
    return record_type("Fable.SimpleJson.RecordField", [], RecordField, () => [["FieldName", string_type], ["FieldType", TypeInfo$reflection()], ["PropertyInfo", class_type("System.Reflection.PropertyInfo")]]);
}

export class UnionCase extends Record {
    CaseName: string;
    CaseTypes: Array<TypeInfo>;
    Info: any;
    constructor(CaseName: string, CaseTypes: Array<TypeInfo>, Info: any) {
        super();
        this.CaseName = CaseName;
        this.CaseTypes = CaseTypes;
        this.Info = Info;
    }
}

export function UnionCase$reflection(): TypeInfo_1 {
    return record_type("Fable.SimpleJson.UnionCase", [], UnionCase, () => [["CaseName", string_type], ["CaseTypes", array_type(TypeInfo$reflection())], ["Info", class_type("Microsoft.FSharp.Reflection.UnionCaseInfo")]]);
}

export class TypeInfo extends Union {
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Unit", "Char", "String", "UInt16", "UInt32", "UInt64", "Int32", "Bool", "Float32", "Float", "Decimal", "Short", "Long", "Byte", "SByte", "DateTime", "DateTimeOffset", "DateOnly", "TimeOnly", "BigInt", "TimeSpan", "Guid", "Uri", "Object", "Any", "Async", "Promise", "Option", "List", "Set", "Array", "Seq", "Tuple", "Map", "Dictionary", "ResizeArray", "HashSet", "Func", "Enum", "Record", "Union"];
    }
}

export function TypeInfo$reflection(): TypeInfo_1 {
    return union_type("Fable.SimpleJson.TypeInfo", [], TypeInfo, () => [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [["Item", lambda_type(unit_type, class_type("System.Type"))]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, array_type(TypeInfo$reflection()))]], [["Item", lambda_type(unit_type, tuple_type(TypeInfo$reflection(), TypeInfo$reflection()))]], [["Item", lambda_type(unit_type, tuple_type(TypeInfo$reflection(), TypeInfo$reflection(), class_type("System.Type")))]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, array_type(TypeInfo$reflection()))]], [["Item", lambda_type(unit_type, tuple_type(TypeInfo$reflection(), class_type("System.Type")))]], [["Item", lambda_type(unit_type, tuple_type(array_type(RecordField$reflection()), class_type("System.Type")))]], [["Item", lambda_type(unit_type, tuple_type(array_type(UnionCase$reflection()), class_type("System.Type")))]]]);
}

