import { Union, Record } from "../fable-library.4.0.0-theta-001/Types.js";
import { union_type, tuple_type, lambda_type, unit_type, array_type, record_type, class_type, string_type } from "../fable-library.4.0.0-theta-001/Reflection.js";

export class RecordField extends Record {
    constructor(FieldName, FieldType, PropertyInfo) {
        super();
        this.FieldName = FieldName;
        this.FieldType = FieldType;
        this.PropertyInfo = PropertyInfo;
    }
}

export function RecordField$reflection() {
    return record_type("Fable.SimpleJson.RecordField", [], RecordField, () => [["FieldName", string_type], ["FieldType", TypeInfo$reflection()], ["PropertyInfo", class_type("System.Reflection.PropertyInfo")]]);
}

export class UnionCase extends Record {
    constructor(CaseName, CaseTypes, Info) {
        super();
        this.CaseName = CaseName;
        this.CaseTypes = CaseTypes;
        this.Info = Info;
    }
}

export function UnionCase$reflection() {
    return record_type("Fable.SimpleJson.UnionCase", [], UnionCase, () => [["CaseName", string_type], ["CaseTypes", array_type(TypeInfo$reflection())], ["Info", class_type("Microsoft.FSharp.Reflection.UnionCaseInfo")]]);
}

export class TypeInfo extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Unit", "Char", "String", "UInt16", "UInt32", "UInt64", "Int32", "Bool", "Float32", "Float", "Decimal", "Short", "Long", "Byte", "SByte", "DateTime", "DateTimeOffset", "DateOnly", "TimeOnly", "BigInt", "TimeSpan", "Guid", "Uri", "Object", "Any", "Async", "Promise", "Option", "List", "Set", "Array", "Seq", "Tuple", "Map", "Dictionary", "ResizeArray", "HashSet", "Func", "Enum", "Record", "Union"];
    }
}

export function TypeInfo$reflection() {
    return union_type("Fable.SimpleJson.TypeInfo", [], TypeInfo, () => [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [["Item", lambda_type(unit_type, class_type("System.Type"))]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, array_type(TypeInfo$reflection()))]], [["Item", lambda_type(unit_type, tuple_type(TypeInfo$reflection(), TypeInfo$reflection()))]], [["Item", lambda_type(unit_type, tuple_type(TypeInfo$reflection(), TypeInfo$reflection(), class_type("System.Type")))]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, TypeInfo$reflection())]], [["Item", lambda_type(unit_type, array_type(TypeInfo$reflection()))]], [["Item", lambda_type(unit_type, tuple_type(TypeInfo$reflection(), class_type("System.Type")))]], [["Item", lambda_type(unit_type, tuple_type(array_type(RecordField$reflection()), class_type("System.Type")))]], [["Item", lambda_type(unit_type, tuple_type(array_type(UnionCase$reflection()), class_type("System.Type")))]]]);
}

