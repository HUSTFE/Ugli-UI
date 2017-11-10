// TODO: make render more pure

const yargs = require('yargs')
const art = require('art-template')
const fs = require('fs')
const path = require('path')

const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')
const mkdir = p => fs.existsSync(p) || fs.mkdirSync(path.resolve(p))
const write = object => input => p => fs.existsSync(p) || fs.writeFileSync(path.resolve(p), art(path.resolve(input), object))

const type = yargs.argv._[0]
const name = firstUpperCase(yargs.argv._[1])
const templateSrc = `./scripts/template/${type}`
const config = JSON.parse(fs.readFileSync(`${templateSrc}/config.json`, 'utf8'))

const render = c => (info) => {
  const writeWith = write(info)
  let l = c.dir.length

  for (let i = 0; i < l; i += 1) {
    mkdir(`${c.base}${info.name}${c.dir[i]}`)
  }

  l = c.file.length

  for (let i = 0; i < l; i += 1) {
    writeWith(`${templateSrc}${c.file[i][0]}`)(`${c.base}${info.name}${c.file[i][1]}`)
  }

  mkdir(`./src/style/${info.name}`)
  writeWith('./scripts/template/index.sass')(`./src/style/${info.name}/index.sass`)
}

try {
  render(config)({ name, type })
} catch (e) {
  console.log(e)
  console.log('[X] create error')
}
console.log('[-] create end')
