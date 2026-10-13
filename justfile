export PATH := "node_modules/.bin:" + env_var('PATH')

# Downloads build tools and type declarations.
install:
    npm install

# Checks types without generating any code.
check: install
    tsc --noEmit

# Builds `content.js` as a classic script, and `options.js` as a module.
build: check
    esbuild src/content.ts --bundle --outdir=extension
    esbuild src/options.ts --bundle --format=esm --outdir=extension

# Writes `var/schoology-companion.zip` for upload to the Chrome Web Store.
[default]
package: build
    mkdir -p var
    zip -r var/schoology-companion.zip.new extension
    mv var/schoology-companion.zip.new var/schoology-companion.zip
