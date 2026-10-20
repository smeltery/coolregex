# Development

Install [Flox](https://flox.dev/docs/install-flox/) and clone this repository.
The committed Flox manifest and lockfile provide Bun, Node.js, pre-commit, and
Actionlint on Linux and macOS. Node runs Next.js; Bun manages dependencies and scripts.

```sh
flox activate
bun install --frozen-lockfile
pre-commit install --install-hooks
pre-commit install --hook-type pre-push
bun run dev
```

Visit <http://localhost:3000>. Edit `app/page.tsx` for the catalog page and
`lib/regex_info.ts` for patterns, titles, descriptions, and icons. JavaScript string
literals require doubled backslashes to preserve regex escapes.

## Checks

```sh
bun run check
bun run build
pre-commit run --all-files
```

The documentation check renders Mermaid diagrams using Chromium. Install its
browser once with `bun x puppeteer browsers install chrome`; on Linux, install
Chromium system dependencies as needed. CI downloads Chromium and uses the browser libraries supplied by its Ubuntu runner.
Builds need network access to download the Google font used by `next/font`.

To update dependencies, use `bun add` or `bun update` and commit `bun.lock`.
Use `flox upgrade` for toolchain updates and commit the Flox lockfile. Authentication
to FloxHub may be required to resolve new packages. Activation never installs hooks
or project dependencies implicitly.

## Production

```sh
bun run build
bun run start
```

Deploy on a Node-compatible Next.js host, including Vercel. Use
`bun install --frozen-lockfile` as the install command and `bun run build` as the
build command. GitHub releases publish source snapshots, not hosted deployments.
