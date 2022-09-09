import { Record } from "../fable-library.4.0.0-theta-001/Types.js";
import { int32 } from "../fable-library.4.0.0-theta-001/Int32.js";
import { string_type, record_type, int32_type, TypeInfo } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { Option, some } from "../fable-library.4.0.0-theta-001/Option.js";
import { seq, noneOf, optWhitespace, whitespace, oneOf, string, takeWhile, test, fail, all, any, digit, lookahead, succeed, eof, letters, letter, lazy, index } from "./Parsimmon.js";
import { join } from "../fable-library.4.0.0-theta-001/String.js";
import { List, reduce } from "../fable-library.4.0.0-theta-001/List.js";

export class TokenPosition extends Record {
    offset: int32;
    line: int32;
    column: int32;
    constructor(offset: int32, line: int32, column: int32) {
        super();
        this.offset = (offset | 0);
        this.line = (line | 0);
        this.column = (column | 0);
    }
}

export function TokenPosition$reflection(): TypeInfo {
    return record_type("Fable.Parsimmon.TokenPosition", [], TokenPosition, () => [["offset", int32_type], ["line", int32_type], ["column", int32_type]]);
}

export class NodeResult$1<t> extends Record {
    name: string;
    value: t;
    start: TokenPosition;
    end: TokenPosition;
    constructor(name: string, value: t, start: TokenPosition, end: TokenPosition) {
        super();
        this.name = name;
        this.value = value;
        this.start = start;
        this.end = end;
    }
}

export function NodeResult$1$reflection(gen0: TypeInfo): TypeInfo {
    return record_type("Fable.Parsimmon.NodeResult`1", [gen0], NodeResult$1, () => [["name", string_type], ["value", gen0], ["start", TokenPosition$reflection()], ["end", TokenPosition$reflection()]]);
}

export function Parsimmon_parseRaw<t>(input: string, parser: any): any {
    return parser.parse(input);
}

export function Parsimmon_parse<t>(input: string, parser: any): Option<t> {
    const result = parser.parse(input);
    if (result.status) {
        return some(result.value);
    }
    else {
        return void 0;
    }
}

export const Parsimmon_index = index;

export function Parsimmon_orTry<t>(otherParser: any, parser: any): any {
    return parser.or(otherParser);
}

export function Parsimmon_times<t>(n: int32, parser: any): any {
    return parser.times(n);
}

export function Parsimmon_atLeast<t>(n: int32, parser: any): any {
    return parser.atLeast(n);
}

export function Parsimmon_atMost<t>(n: int32, parser: any): any {
    return parser.atMost(n);
}

export function Parsimmon_skip<t, u>(skipped: any, keep: any): any {
    return keep.skip(skipped);
}

export function Parsimmon_many<t>(parser: any): any {
    return parser.many();
}

export const Parsimmon_ofLazy = lazy;

export function Parsimmon_seperateByAtLeastOne<t, u>(seperator: any, parser: any): any {
    return parser.sepBy1(seperator);
}

export function Parsimmon_chain<t, u>(after: any, before: any): any {
    return before.then(after);
}

export function Parsimmon_bind<t, u>(f: (arg0: t) => any, p: any): any {
    return p.chain(f);
}

export const Parsimmon_letter = letter;

export function Parsimmon_timesBetween<u>(min: int32, max: int32, parser: any): any {
    return parser.times(min, max);
}

export const Parsimmon_letters = letters;

export const Parsimmon_endOfFile = eof;

export function Parsimmon_notFollowedBy<t, u>(p: any, before: any): any {
    return before.notFollowedBy(p);
}

export const Parsimmon_succeed = succeed;

export const Parsimmon_lookahead = lookahead;

export const Parsimmon_digit = digit;

export const Parsimmon_digits = Parsimmon_many(Parsimmon_digit);

export function Parsimmon_fallback<t>(value: t, parser: any): any {
    return parser.fallback(value);
}

export function Parsimmon_seperateBy<t, u>(content: any, others: any): any {
    return others.sepBy(content);
}

export function Parsimmon_between<t, u, v>(left: any, right: any, middle: any): any {
    return Parsimmon_skip(right, Parsimmon_chain(middle, left));
}

export function Parsimmon_map<t, u>(f: (arg0: t) => u, parser: any): any {
    return parser.map(f);
}

export function Parsimmon_tie(parser: any): any {
    return Parsimmon_map((strings: Array<string>): string => join("", strings), parser);
}

export const Parsimmon_any = any;

export function Parsimmon_choose<t>(ps: List<any>): any {
    return reduce((acc: any, parser: any): any => (acc.or(parser)), ps);
}

export const Parsimmon_all = all;

export const Parsimmon_fail = fail;

export const Parsimmon_satisfy = test;

export const Parsimmon_takeWhile = takeWhile;

export const Parsimmon_str = string;

export const Parsimmon_oneOf = oneOf;

export const Parsimmon_whitespace = whitespace;

export const Parsimmon_optionalWhitespace = optWhitespace;

export function Parsimmon_atLeastOneOrMany<t>(parser: any): any {
    return Parsimmon_atLeast(1, parser);
}

export function Parsimmon_stringReturn<t>(input: string, value: t): any {
    return Parsimmon_map((_arg: string): t => value, Parsimmon_str(input));
}

export const Parsimmon_noneOf = noneOf;

export const Parsimmon_seq2 = seq;

export function Parsimmon_trim<a, t>(trimmed: any, p: any): any {
    return p.trim(trimmed);
}

export function Parsimmon_concat(parser: any): any {
    return parser.map((strings: Array<string>): string => join("", strings));
}

export const Parsimmon_seq3 = seq;

export const Parsimmon_seq4 = seq;

export const Parsimmon_seq5 = seq;

export function Parsimmon_node<t>(description: string, p: any): any {
    return p.node(description);
}

