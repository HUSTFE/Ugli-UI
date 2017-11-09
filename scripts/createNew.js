// TODO to simplify this operation

const yargs = require('yargs')
const art = require('art-template')
const fs = require('fs')
const path = require('path')

const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

const type = yargs.argv._[0]
const name = firstUpperCase(yargs.argv._[1])


const mkdir = p => fs.mkdirSync(path.resolve(p))
const write = object => input => p => fs.writeFileSync(path.resolve(p), art(path.resolve(input), object))

const writeReact = write({ name })

mkdir(`./src/components/${type}/${name}`)
mkdir(`./src/components/${type}/${name}/__test__`)
mkdir(`./src/components/${type}/${name}/__test__/__snapshots__`)
writeReact('./scripts/template/react/index.art')(`./src/components/${type}/${name}/index.js`)
writeReact('./scripts/template/react/__tests__/index.art')(`./src/components/${type}/${name}/__test__/index.js`)
writeReact('./scripts/template/react/__tests__/__snapshots__/index.art.snap')(`./src/components/${type}/${name}/__test__/__snapshots__/index.js.snap`)


mkdir(`./src/style/${name}`)
writeReact('./scripts/template/index.sass')(`./src/style/${name}/index.sass`)



