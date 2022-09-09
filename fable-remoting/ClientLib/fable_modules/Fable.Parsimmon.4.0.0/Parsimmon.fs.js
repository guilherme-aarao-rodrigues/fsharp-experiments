import { Record } from "../fable-library.4.0.0-theta-001/Types.js";
import { string_type, record_type, int32_type } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { some } from "../fable-library.4.0.0-theta-001/Option.js";
import { seq, noneOf, optWhitespace, whitespace, oneOf, string, takeWhile, test, fail, all, any, digit, lookahead, succeed, eof, letters, letter, lazy, index } from "./Parsimmon.js";
import { join } from "../fable-library.4.0.0-theta-001/String.js";
import { reduce } from "../fable-library.4.0.0-theta-001/List.js";

export class TokenPosition extends Record {
    constructor(offset, line, column) {
        super();
        this.offset = (offset | 0);
        this.line = (line | 0);
        this.column = (column | 0);
    }
}

export function TokenPosition$reflection() {
    return record_type("Fable.Parsimmon.TokenPosition", [], TokenPosition, () => [["offset", int32_type], ["line", int32_type], ["column", int32_type]]);
}

export class NodeResult$1 extends Record {
    constructor(name, value, start, end) {
        super();
        this.name = name;
        this.value = value;
        this.start = start;
        this.end = end;
    }
}

export function NodeResult$1$reflection(gen0) {
    return record_type("Fable.Parsimmon.NodeResult`1", [gen0], NodeResult$1, () => [["name", string_type], ["value", gen0], ["start", TokenPosition$reflection()], ["end", TokenPosition$reflection()]]);
}

export function Parsimmon_parseRaw(input, parser) {
    return parser.parse(input);
}

export function Parsimmon_parse(input, parser) {
    const result = parser.parse(input);
    if (result.status) {
        return some(result.value);
    }
    else {
        return void 0;
    }
}

export const Parsimmon_index = index;

export function Parsimmon_orTry(otherParser, parser) {
    return parser.or(otherParser);
}

export function Parsimmon_times(n, parser) {
    return parser.times(n);
}

export function Parsimmon_atLeast(n, parser) {
    return parser.atLeast(n);
}

export function Parsimmon_atMost(n, parser) {
    return parser.atMost(n);
}

export function Parsimmon_skip(skipped, keep) {
    return keep.skip(skipped);
}

export function Parsimmon_many(parser) {
    return parser.many();
}

export const Parsimmon_ofLazy = lazy;

export function Parsimmon_seperateByAtLeastOne(seperator, parser) {
    return parser.sepBy1(seperator);
}

export function Parsimmon_chain(after, before) {
    return before.then(after);
}

export function Parsimmon_bind(f, p) {
    return p.chain(f);
}

export const Parsimmon_letter = letter;

export function Parsimmon_timesBetween(min, max, parser) {
    return parser.times(min, max);
}

export const Parsimmon_letters = letters;

export const Parsimmon_endOfFile = eof;

export function Parsimmon_notFollowedBy(p, before) {
    return before.notFollowedBy(p);
}

export const Parsimmon_succeed = succeed;

export const Parsimmon_lookahead = lookahead;

export const Parsimmon_digit = digit;

export const Parsimmon_digits = Parsimmon_many(Parsimmon_digit);

export function Parsimmon_fallback(value, parser) {
    return parser.fallback(value);
}

export function Parsimmon_seperateBy(content, others) {
    return others.sepBy(content);
}

export function Parsimmon_between(left, right, middle) {
    return Parsimmon_skip(right, Parsimmon_chain(middle, left));
}

export function Parsimmon_map(f, parser) {
    return parser.map(f);
}

export function Parsimmon_tie(parser) {
    return Parsimmon_map((strings) => join("", strings), parser);
}

export const Parsimmon_any = any;

export function Parsimmon_choose(ps) {
    return reduce((acc, parser) => (acc.or(parser)), ps);
}

export const Parsimmon_all = all;

export const Parsimmon_fail = fail;

export const Parsimmon_satisfy = test;

export const Parsimmon_takeWhile = takeWhile;

export const Parsimmon_str = string;

export const Parsimmon_oneOf = oneOf;

export const Parsimmon_whitespace = whitespace;

export const Parsimmon_optionalWhitespace = optWhitespace;

export function Parsimmon_atLeastOneOrMany(parser) {
    return Parsimmon_atLeast(1, parser);
}

export function Parsimmon_stringReturn(input, value) {
    return Parsimmon_map((_arg) => value, Parsimmon_str(input));
}

export const Parsimmon_noneOf = noneOf;

export const Parsimmon_seq2 = seq;

export function Parsimmon_trim(trimmed, p) {
    return p.trim(trimmed);
}

export function Parsimmon_concat(parser) {
    return parser.map((strings) => join("", strings));
}

export const Parsimmon_seq3 = seq;

export const Parsimmon_seq4 = seq;

export const Parsimmon_seq5 = seq;

export function Parsimmon_node(description, p) {
    return p.node(description);
}

