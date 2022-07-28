import { printf, toConsole } from "./fable_modules/fable-library.4.0.0-snake-island-alpha-017/String.js";
import { int32 } from "./fable_modules/fable-library.4.0.0-snake-island-alpha-017/Int32.js";
import { Union, Record } from "./fable_modules/fable-library.4.0.0-snake-island-alpha-017/Types.js";
import { list_type, option_type, class_type, union_type, int32_type, record_type, string_type, TypeInfo } from "./fable_modules/fable-library.4.0.0-snake-island-alpha-017/Reflection.js";
import { Option } from "./fable_modules/fable-library.4.0.0-snake-island-alpha-017/Option.js";
import { List } from "./fable_modules/fable-library.4.0.0-snake-island-alpha-017/List.js";

export const myInteger1 = 13;

export const myInteger2 = 46;

export const myString = "this is a string";

export function myFunction(x: int32, s: string): int32 {
    toConsole(printf("This is a my integer (%d) and this is my string: %s"))(x)(s);
    return 0;
}

export const myArray = [1, myInteger1, myInteger2];

export class NestedRecord extends Record {
    Foo: string;
    constructor(Foo: string) {
        super();
        this.Foo = Foo;
    }
}

export function NestedRecord$reflection(): TypeInfo {
    return record_type("Samples.NestedRecord", [], NestedRecord, () => [["Foo", string_type]]);
}

export class DU extends Union {
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Case1", "Case2"];
    }
}

export function DU$reflection(): TypeInfo {
    return union_type("Samples.DU", [], DU, () => [[["Item", int32_type]], [["Item", NestedRecord$reflection()]]]);
}

export class DU2 extends Union {
    tag: int32;
    fields: Array<any>;
    constructor(tag: int32, ...fields: Array<any>) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["X", "Y", "Z"];
    }
}

export function DU2$reflection(): TypeInfo {
    return union_type("Samples.DU2", [], DU2, () => [[], [], []]);
}

export class MyRecord extends Record {
    Id: string;
    MyStringField: string;
    MyIntegerField: int32;
    MyOptionPrimitive: Option<int32>;
    Nested: NestedRecord;
    NestedOption: Option<NestedRecord>;
    NestedOptionList: List<Option<NestedRecord>>;
    List: List<int32>;
    ListOfRecords: List<NestedRecord>;
    DU: DU;
    DU2: DU2;
    constructor(Id: string, MyStringField: string, MyIntegerField: int32, MyOptionPrimitive: Option<int32>, Nested: NestedRecord, NestedOption: Option<NestedRecord>, NestedOptionList: List<Option<NestedRecord>>, List: List<int32>, ListOfRecords: List<NestedRecord>, DU: DU, DU2: DU2) {
        super();
        this.Id = Id;
        this.MyStringField = MyStringField;
        this.MyIntegerField = (MyIntegerField | 0);
        this.MyOptionPrimitive = MyOptionPrimitive;
        this.Nested = Nested;
        this.NestedOption = NestedOption;
        this.NestedOptionList = NestedOptionList;
        this.List = List;
        this.ListOfRecords = ListOfRecords;
        this.DU = DU;
        this.DU2 = DU2;
    }
}

export function MyRecord$reflection(): TypeInfo {
    return record_type("Samples.MyRecord", [], MyRecord, () => [["Id", class_type("System.Guid")], ["MyStringField", string_type], ["MyIntegerField", int32_type], ["MyOptionPrimitive", option_type(int32_type)], ["Nested", NestedRecord$reflection()], ["NestedOption", option_type(NestedRecord$reflection())], ["NestedOptionList", list_type(option_type(NestedRecord$reflection()))], ["List", list_type(int32_type)], ["ListOfRecords", list_type(NestedRecord$reflection())], ["DU", DU$reflection()], ["DU2", DU2$reflection()]]);
}

