import {
  Route, 
  staticHandler,
  cacher,
  ResponseCache
} from "https://deno.land/x/peko/mod.ts"

import { recursiveReaddir } from "https://deno.land/x/recursive_readdir@v2.0.0/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.174.0/path/mod.ts"

const cache = new ResponseCache()
const env = Deno.env.toObject()
const filenames = await recursiveReaddir(fromFileUrl(new URL(`../src`, import.meta.url)))

const assets: Route[] = filenames.map(file => {
  const fileRoute = file.slice(file.lastIndexOf("/src/" ) + 5)

  return {
    path: `/${fileRoute}`,
    middleware: env.ENVIRONMENT === "production" ? cacher(cache) : [],
    handler: staticHandler(new URL(`../src/${fileRoute}`, import.meta.url), {
      headers: new Headers({
        "Cache-Control": env.ENVIRONMENT === "production"
          ? "max-age=86400, stale-while-revalidate=604800"
          : "no-store"
      })
    })
  }
})

export default assets
