/* eslint-disable no-console */
// TODO: make render more pure

const yargs = require('yargs')
const art = require('art-template')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

// do sth with msg consoled, formatted to '[√]/[×]say sth'
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
/*
 * @params: template -> inputPath -> outputPath
 * ouputPath DOESN'T exist -> end
 * else -> create new file according to io path && template
 */
const write = template => i => o => fs.existsSync(o) || fs.writeFileSync(o, art(i, template))
// 'foo' -> ['foo', 'foo']
// ['foo', 'bar'] -> ['foo', 'bar']
const readOneStringOrTwo = feed => (typeof feed === 'string' ? [feed, feed] : feed)

// 'react', 'vue', etc...
const type = yargs.argv._[0]
// component name
const name = firstUpperCase(yargs.argv._[1])

const templateSrc = `./scripts/template/${type}`
const config = JSON.parse(fs.readFileSync(`${templateSrc}/config.json`, 'utf8'))

const render = c => (info) => {
  // writeWith:: inputPath -> outputPath -> a
  const writeWith = write(info)
  // create file group, return Boolean(success/failure)
  const createFileGroup = (inputDir, outputDir, template) => {
    // resolve path
    const [iDirPath, oDirPath] = [inputDir, outputDir].map(rawPath => path.resolve(rawPath))
    // create directory && files
    return withLog(`Dir: ${chalk.grey(oDirPath)}`)(() => mkdir(oDirPath))
      && template.reduce((acc, filename) => {
        const [iFile, oFile] = readOneStringOrTwo(filename)
        const [iPath, oPath] = [path.resolve(iDirPath, iFile), path.resolve(oDirPath, oFile)]
        return withLog(`File: ${chalk.grey(oPath)}`)(
          () => (writeWith(iPath)(oPath) && acc)
        )
      }, true)
  }
  // create multiple groups of [directory, template]
  // args include base path of input && output
  const createMulti = ([{ dir, template }, ...other], ...arg) => {
    const [iDir, oDir] = readOneStringOrTwo(dir)
    const [iBase, oBase] = arg
    if (!createFileGroup(`${iBase}/${iDir}`, `${oBase}/${oDir}`, template)) {
      return false
    }
    return other.length ? createMulti(other, ...arg) : true
  }
  // create style files
  const [iDir, oDir] = [path.resolve('./scripts/template/'), path.resolve(`./src/style/${info.name}`)]

  createMulti(c.files, templateSrc, `${c.base}/${info.name}`)
  withLog(`Style dir & file: ${chalk.grey(oDir)}`)(
    () => createFileGroup(iDir, oDir, [['index.sass', 'index.sass']])
  )
}

// render all the stuffs
withLog(
  'Main'
)(() => render(config)({ name, type }))
