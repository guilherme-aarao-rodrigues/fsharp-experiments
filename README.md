# fsharp-experiments
F# Experiments
# Fable
Transpiling F# to Typescript using a sample (F#) project as a base, which is a basic dotnet project created via
```
dotnet new console -lang "F#"
```
### Required CLI Commands (in order): 
```
dotnet tool restore
dotnet fable Fable.fsproj --lang typescript --typedArrays false
```
All source files referenced by the project file will then be transpiled to the language of choice (in the above example, typescript).
