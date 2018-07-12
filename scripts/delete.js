const yargs = require('yargs-parser');
const Path = require('./utils/path');
const Console = require('./utils/console');
const { deleteComponentFiles, titleWord } = require('./utils/compFiles');

const argv = yargs(process.argv.slice(2), {
  alias: { comp: ['c'], react: ['r'], vue: ['v'], angular: ['a'] },
  boolean: ['react', 'vue', 'angular', 'all'],
});

if (argv.comp) {
  const fileName = titleWord(argv.comp);
  if (argv.react || argv.all) {
    deleteComponentFiles(fileName, Path.react);
  }
  if (argv.vue || argv.all) {
    Console.Func.notSupport('Vue component');
  }
  if (argv.angular || argv.all) {
    Console.Func.notSupport('Angular component');
  }
} else {
  Console.Func.info('Do nothing');
}
