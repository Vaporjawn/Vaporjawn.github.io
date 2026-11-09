# Capri record Universal Links

Added November 9, 2026. The currently configured GitHub Pages custom domain is `vaporjawn.dev` (verified with the Pages API), so Capri associates `applinks:vaporjawn.dev`. The historical www hostname is not included in the current TLS certificate.

`public/.well-known/apple-app-site-association` permits only `/capri/*` for `YPSLDB35D4.dev.vaporjawn.capri.mobile`. `public/capri/index.html` validates an opaque record kind/identifier and offers an explicit custom-app-link fallback. It never fetches Capri data, interpolates private text or runs an arbitrary command. The page disables referrers and external resource loading. Normal HTTPS requests still include the identifier in the request URL.

The Pages upload action defaults to excluding hidden paths; `include-hidden-files: true` is required to publish `.well-known`. This applies only to the Vite `dist` artifact. Do not place credentials in public assets or build output.

Validate the deployed HTTPS association URL returns the JSON document without a redirect, then install a correctly provisioned Capri build. Apple's association caching and the device's installed entitlement are separate checks; web deployment alone does not prove iOS interception.
