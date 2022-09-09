import { Parsimmon_seq3, Parsimmon_seperateBy, Parsimmon_ofLazy, Parsimmon_optionalWhitespace, Parsimmon_between, Parsimmon_satisfy, Parsimmon_orTry, Parsimmon_many, Parsimmon_oneOf, Parsimmon_stringReturn, Parsimmon_choose, Parsimmon_str, Parsimmon_seq2, Parsimmon_map, Parsimmon_digit, Parsimmon_atLeastOneOrMany, Parsimmon_concat } from "../Fable.Parsimmon.4.0.0/Parsimmon.fs.js";
import { parse } from "../fable-library.4.0.0-theta-001/Double.js";
import { regexp } from "../Fable.Parsimmon.4.0.0/./Parsimmon.js";
import { map, ofArray } from "../fable-library.4.0.0-theta-001/List.js";
import { Json } from "./Json.fs.js";
import { ofList } from "../fable-library.4.0.0-theta-001/Map.js";
import { Lazy, comparePrimitives } from "../fable-library.4.0.0-theta-001/Util.js";

export const digits = Parsimmon_concat(Parsimmon_atLeastOneOrMany(Parsimmon_digit));

export const jint = Parsimmon_map(parse, digits);

export const negJint = Parsimmon_map((tupledArg) => (-tupledArg[1]), Parsimmon_seq2(Parsimmon_str("-"), jint));

export const jfloat = Parsimmon_map(parse, Parsimmon_choose(ofArray([regexp(new RegExp("-?(0|[1-9][0-9]*)?[.][0-9]+([eE][+-]?[0-9]+)?")), regexp(new RegExp("-?[1-9][0-9]*[eE][+-]?[0-9]+"))])));

export const jnumber = Parsimmon_map((arg) => (new Json(0, arg)), Parsimmon_choose(ofArray([jfloat, jint, negJint])));

export const jbool = Parsimmon_choose(ofArray([Parsimmon_stringReturn("true", new Json(2, true)), Parsimmon_stringReturn("false", new Json(2, false))]));

export const jnull = Parsimmon_stringReturn("null", new Json(3));

export const stringLiteral = (() => {
    const escape = Parsimmon_map((_arg) => {
        if (_arg === "b") {
            return "\b";
        }
        else if (_arg === "f") {
            return "\f";
        }
        else if (_arg === "n") {
            return "\n";
        }
        else if (_arg === "r") {
            return "\r";
        }
        else if (_arg === "t") {
            return "\t";
        }
        else {
            return _arg;
        }
    }, Parsimmon_oneOf("\"\\/bfnrt"));
    const anyCharSnippet = Parsimmon_concat(Parsimmon_many(Parsimmon_orTry(Parsimmon_map((tuple) => tuple[1], Parsimmon_seq2(Parsimmon_str("\\"), escape)), Parsimmon_satisfy((c_1) => ((c_1 !== "\"") && (c_1 !== "\\"))))));
    return Parsimmon_between(Parsimmon_str("\""), Parsimmon_str("\""), anyCharSnippet);
})();

export const jstring = stringLiteral.map((arg) => (new Json(1, arg)));

export function withWhitespace(p) {
    return Parsimmon_between(Parsimmon_optionalWhitespace, Parsimmon_optionalWhitespace, p);
}

export const jvalue = Parsimmon_choose(map(withWhitespace, ofArray([jnull, jbool, jnumber, jstring])));

export const comma = withWhitespace(Parsimmon_str(","));

export function json$004080() {
    return Parsimmon_ofLazy(() => Parsimmon_choose(ofArray([jvalue, Parsimmon_map((arg_1) => (new Json(4, ofArray(arg_1))), Parsimmon_between(withWhitespace(Parsimmon_str("[")), withWhitespace(Parsimmon_str("]")), Parsimmon_seperateBy(comma, json$004080$002D1.Value))), Parsimmon_map((arg_4) => (new Json(5, ofList(ofArray(arg_4), {
        Compare: comparePrimitives,
    }))), Parsimmon_between(withWhitespace(Parsimmon_str("{")), withWhitespace(Parsimmon_str("}")), Parsimmon_seperateBy(comma, Parsimmon_map((tupledArg) => [tupledArg[0], tupledArg[2]], Parsimmon_seq3(withWhitespace(stringLiteral), withWhitespace(Parsimmon_str(":")), withWhitespace(json$004080$002D1.Value))))))])));
}

export const json$004080$002D1 = new Lazy(json$004080);

export const json = json$004080$002D1.Value;

export const jsonParser = withWhitespace(json);

