module Samples
    open System    
    //open Fable.Core.JsInterop
    //open Fable.Import
    //open Fetch
    
    let myInteger1 = 13
    let myInteger2 = 46
    let myString = "this is a string"
    let myFunction (x : int) (s : string) = 
        printfn "This is a my integer (%d) and this is my string: %s" x s
        0

    let myArray = [| 1; myInteger1; myInteger2  |]
    type NestedRecord={Foo:string}

    type DU =
      |Case1 of int
      |Case2 of NestedRecord

    type DU2 = X|Y|Z

    type MyRecord =
      { Id: Guid
        MyStringField: string
        MyIntegerField: int
        MyOptionPrimitive: int option
        Nested: NestedRecord
        NestedOption: NestedRecord option
        NestedOptionList: NestedRecord option list
        List: int list
        ListOfRecords: NestedRecord list
        DU: DU
        DU2: DU2
        }