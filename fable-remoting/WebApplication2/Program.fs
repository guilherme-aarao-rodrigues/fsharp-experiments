namespace WebApplication2

#nowarn "20"

open System
open System.Collections.Generic
open System.IO
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.HttpsPolicy
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.AspNetCore.Http

open SharedModels
open Fable.Remoting.Server
open Fable.Remoting.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting

module Program =
    let exitCode = 0

    let musicStore: IMusicStore =
        {

          (* Your implementation here *)
          test = async { return "hello world" } }

    // Create API from musicStore value
    let webApp: RemotingOptions<HttpContext, IMusicStore> =
        Remoting.createApi ()
        |> Remoting.fromValue musicStore

    // Create an API from different value
    // let otherApp =
    //     Remoting.createApi ()
    //     |> Remoting.fromValue otherValue


    [<EntryPoint>]
    let main args =

        let builder =
            WebApplication.CreateBuilder(args)

        builder.Services.AddControllers()

        let app = builder.Build()


        app.UseHttpsRedirection()

        app.UseAuthorization()

        // Add the API to the ASP.NET Core pipeline
        app.UseRemoting(webApp)
        // you can have multiple API's
        // app.UseRemoting(otherApp)

        app.MapControllers()

        app.Run()

        exitCode
