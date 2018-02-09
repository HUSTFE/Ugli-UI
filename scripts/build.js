#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs')
const proc = require('child_process')
const path = require('path')
const chalk = require('chalk')

const rollupEntry = path.resolve(__dirname, '../rollup.entry.temp.js')
const buildDirectory = path.resolve(__dirname, '../build')

console.log(chalk.bold.green('Building release version...'))

// regenerate AUTHORS.txt to project root.
// console.log(chalk.gray('Generating new AUTHORS.txt file...'))
// proc.execSync('yarn authors')
// console.log(chalk.green('Done!\n'))

// copy needed meta file to build directory.
console.log(chalk.gray('Coping meta files to build directory...'))
const filesToCopy = [
  'LICENSE',
  'README.md',
  'AUTHORS.txt',
]

filesToCopy.forEach((fileName) => {
  const filePath = path.resolve(__dirname, `../${fileName}`)
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`File '${chalk.bold(fileName)}' is required while build release version.\n`))
    process.exit(1)
  }
  fs.copyFileSync(filePath, `${buildDirectory}/${fileName}`)
})
console.log(chalk.green('Done!\n'))

// Create a new package.json
console.log(chalk.gray('Creating a new package.json...'))
const packageJson = require('../package.json')

delete packageJson.jest
delete packageJson.scripts
delete packageJson.betterScripts
delete packageJson.devDependencies
delete packageJson['pre-commit']
packageJson.main = './dest/ugli-ui.js'
packageJson.files = ['./dest/ugli-ui.js', './dest/ugli-ui.css']
fs.writeFileSync(`${buildDirectory}/package.json`, JSON.stringify(packageJson))
console.log(chalk.green('Done!\n'))

// write a new entry and build
console.log(chalk.gray('Building ES package...'))
const components = fs.readdirSync('./src/components/react')
const entryCode =
`
import { version } from './package.json'
${components.map(comp => `import ${comp} from './src/components/react/${comp}'`).join('\n')}

export default { version, ${components.join(', ')} }
`

fs.writeFileSync(rollupEntry, entryCode)
proc.execSync('yarn build')
fs.unlinkSync(rollupEntry)
console.log(chalk.green('Done!\n'))

console.log(chalk.bold.green('Build successfully!'))
