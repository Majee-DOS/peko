import * as Peko from "../../mod.ts" // <- https://deno.land/x/peko/mod.ts
import { renderToString } from "https://npm.reversehttp.com/preact,preact/hooks,htm/preact,preact-render-to-string"
import { renderFile, configure as configureEta } from "https://deno.land/x/eta@v1.12.3/mod.ts"

import config from "../config.ts"

import pages from "../preact/routes/pages.ts"
import assets from "../preact/routes/assets.ts"
import APIs from "../preact/routes/APIs.ts"

import Home from "../preact/src/pages/Home.js"
import About from "../preact/src/pages/About.js"

// Configure eta
configureEta({
  // This tells Eta to look for templates in the /views directory
  views: `${Deno.cwd()}/examples/eta-templating/views/`
})

// adjust premade preact page render fcns to use eta
// parege.route ternary operator used to return Home & About page specifics
pages.forEach(page => page.handler = Peko.ssrHandler({
  render: async (ctx) => {
    const appHTML = renderToString(page.route === "/" ? Home(ctx.state) : About(), null, null)
    const etaResult = await renderFile("./template.eta", {
      appHTML,
      title: page.route === "/" ? `<title>Peko</title>` : `<title>Peko | About</title>`,
      modulepreload: `<script modulepreload="true" type="module" src="/pages/${page.route === "/" ? "Home.js" : "About.js"}"></script>`,
      hydrationScript: `<script type="module">
          import { hydrate } from "https://npm.reversehttp.com/preact,preact/hooks,htm/preact,preact-render-to-string";
          import App from ${page.route === "/" ? "/pages/Home.js" : "/pages/About.js"};
          hydrate(App(${JSON.stringify(ctx.state)}), document.getElementById("root"))
      </script>`
    })

    return etaResult ? etaResult : "Eta templating error!"
  }
}))

const server = new Peko.Server()

// Configure Peko
server.setConfig(config)
// SSR'ed app page routes
server.addRoutes(pages)
// Static assets
server.addRoutes(assets)
// Custom API functions
server.addRoutes(APIs)

// Start Peko server :)
server.listen()