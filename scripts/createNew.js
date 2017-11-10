/* eslint-disable no-console */
// TODO: make render more pure

const yargs = require('yargs')
const art = require('art-template')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const withLog = msg => (func) => {
  // console.log(`[-] ${msg}`)
  // TODO: handle promise
  try {
    func()
    console.log(`${chalk.bold.green('[√]')} ${msg}`)
    return true
  } catch (e) {
    console.log(e)
    console.log(`${chalk.bold.red('[×]')} ${msg}`)
  }
  return false
}

const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')
const mkdir = p => fs.existsSync(p) || fs.mkdirSync(p)
const write = object => i => o => fs.existsSync(o) || fs.writeFileSync(o, art(i, object))
const readOneStringOrTwo = feed => (typeof feed === 'string' ? [feed, feed] : feed)

const type = yargs.argv._[0]
const name = firstUpperCase(yargs.argv._[1])

const templateSrc = `./scripts/template/${type}`
const config = JSON.parse(fs.readFileSync(`${templateSrc}/config.json`, 'utf8'))

const render = c => (info) => {
  const writeWith = write(info)
  // we need function writeWith, so can't put this outside.
  const createFileGroup = (inputDir, outputDir, template) => {
    const [iDirPath, oDirPath] = [inputDir, outputDir].map(rawPath => path.resolve(rawPath))
    return withLog(`Dir: ${chalk.grey(oDirPath)}`)(() => mkdir(oDirPath))
      && template.reduce((acc, filename) => {
        const [iFile, oFile] = readOneStringOrTwo(filename)
        const [iPath, oPath] = [path.resolve(iDirPath, iFile), path.resolve(oDirPath, oFile)]
        return withLog(`File: ${chalk.grey(oPath)}`)(
          () => (writeWith(iPath)(oPath) && acc)
        )
      }, true)
  }
  const createMulti = ([{ dir, template }, ...other], ...arg) => {
    const [iDir, oDir] = readOneStringOrTwo(dir)
    const [iBase, oBase] = arg
    if (!createFileGroup(`${iBase}/${iDir}`, `${oBase}/${oDir}`, template)) {
      return false
    }
    return other.length ? createMulti(other, ...arg) : true
  }
  // style template and output path
  const [iDir, oDir] = [path.resolve('./scripts/template/'), path.resolve(`./src/style/${info.name}`)]

  createMulti(c.files, templateSrc, `${c.base}/${info.name}`)
  withLog(`Style dir & file: ${chalk.grey(oDir)}`)(
    () => createFileGroup(iDir, oDir, [['index.sass', 'index.sass']])
  )
}

withLog(
  'Main'
)(() => render(config)({ name, type }))
