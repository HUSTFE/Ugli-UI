const yargs = require('yargs-parser');
const Console = require('./utils/console');
const { createComponentFiles, titleWord } = require('./utils/compFiles');
const Path = require('./utils/path');
const Color = Console.Color;

const argv = yargs(process.argv.slice(2), {
  alias: { file: ['f'], react: ['r'], vue: ['v'], angular: ['a'] },
  boolean: ['react', 'vue', 'angular', 'all'],
});

if (argv.f) {
  const fileName = titleWord(argv.file);
  if (argv.react || argv.all) {
    createComponentFiles(fileName, Path.react);
  }
  if (argv.vue || argv.all) {
    Console.Func.notSupport('Vue component');
  }
  if (argv.angular || argv.all) {
    Console.Func.notSupport('Angular component');
  }
} else {
  console.log(`${Color.FgRed}Failed to create new component!
Filename is required!${Color.Reset}`);
}
