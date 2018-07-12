const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { Buffer } = require('buffer');
const { Transform } = require('stream');
const Console = require('./console');
const Path = require('./path');

const projectDir = process.cwd();
const templatePath = path.join(projectDir, '/config/template');
const srcPath = path.resolve(projectDir, 'src');
const compPath = path.resolve(srcPath, 'components');
const stylePath = path.resolve(srcPath, 'style');
const reactPath = path.resolve(compPath, 'react');
const vuePath = path.resolve(compPath, 'vue');
const angularPath = path.resolve(compPath, 'angular');

function questionRl(faq, cb) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(faq, answer => {
    cb(answer);

    rl.close();
  });
}

/**
 * 使得首字母大写
 * @param {string} str
 */
function titleWord(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 创建模版文件
 * @param {string} fileName
 * @param {string} type
 * @param {string} typePath
 */
function createTemplate(fileName, type, typePath) {
  const tempPath = path.resolve(templatePath, `${type}.template`);
  const tempTestPath = path.resolve(templatePath, `${type}.test.template`);
  const ftPath = path.resolve(typePath, `${fileName}`);
  const testPath = path.resolve(ftPath, '__test__');
  const fstylePath = path.resolve(stylePath, `${fileName}`);

  let temp = fs.readFileSync(tempPath, { encoding: 'utf-8' });
  let testTemp = fs.readFileSync(tempTestPath, { encoding: 'utf-8' });
  temp = temp.replace(/\$/gm, fileName);
  testTemp = testTemp.replace(/\$/gm, fileName);

  fs.appendFile(
    path.resolve(typePath, 'index.ts'),
    `export { ${fileName} } from './${fileName}';\n`,
    err => {
      if (err) throw err;
    },
  );
  // create component and test files
  fs.mkdir(ftPath, err => {
    if (err) throw err;
    fs.mkdir(testPath, () => {
      fs.writeFile(path.resolve(testPath, `${fileName.toLowerCase()}.test.tsx`), testTemp, err => {
        if (err) throw err;
      });
    });
    fs.writeFile(path.resolve(ftPath, 'index.tsx'), temp, err => {
      if (err) throw err;
      Console.Func.success(`${fileName} success created`);
    });
  });
  // create style files
  fs.mkdir(fstylePath, () => {
    fs.writeFile(path.resolve(fstylePath, 'index.less'), '', err => {
      if (err) throw err;
    });
  });
  createStories(fileName, type);
}

function createStories(fileName, type) {
  const tempFile = `${type}.stories.template`;
  const storyFile = `${fileName.toLowerCase()}.stories.tsx`;
  const istream = fs.createReadStream(path.resolve(Path.template, tempFile));
  const ostream = fs.createWriteStream(path.resolve(Path.stories[type], storyFile));

  istream.pipe(new Replace$({}, fileName)).pipe(ostream);
}

class Replace$ extends Transform {
  constructor(options, fileName) {
    super(options);
    this.$ = fileName;
  }

  _transform(data, encoding, cb) {
    let str = data.toString();
    str = str.replace(/\$/g, this.$);
    this.push(new Buffer(str));
    cb();
  }
}

function deleteStories(fileName, type) {
  const storyFile = `${fileName.toLowerCase()}.stories.tsx`;
  const file = path.resolve(Path.stories[type], storyFile);

  fs.access(file, err => {
    if (!err) fs.unlinkSync(file);
  });
}

/**
 * 循环删除文件
 * @param {string} filepath 绝对路径
 */
const rmdirp = (() => {
  function mapDir(path, dirs) {
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
      dirs.unshift(path);
      inner(path, dirs);
    } else if (stats.isFile()) {
      fs.unlinkSync(path);
    }
  }

  function inner(pathh, dirs) {
    // TODO: 命名好丑, 更改之
    const dirArr = fs.readdirSync(pathh);

    for (const dirName of dirArr) {
      mapDir(path.resolve(pathh, dirName), dirs);
    }
  }

  return (dirPath, cb = () => {}) => {
    const dirs = [];

    try {
      mapDir(dirPath, dirs);
      for (const dir of dirs) {
        fs.rmdirSync(dir);
      }
    } catch (e) {
      e.code === 'ENOENT' ? cb() : cb(e);
    }
  };
})();

/**
 * 删除文章正则匹配的字符
 * @param {string} file
 * @param {RegExp} pattern
 */
function fdel(file, pattern) {
  let f = fs.readFileSync(file).toString();
  f = f.replace(pattern, '');
  fs.writeFileSync(file, f);
}

function componentFiles(fileName, typePath, { cb1, cb2 }) {
  const type = path.basename(`${typePath}.html`, '.html');
  const ftPath = path.resolve(typePath, `${fileName}`);
  const fstylePath = path.resolve(stylePath, `${fileName}`);

  fs.access(ftPath, err => {
    const faq = `Do you want to delete all files in ${fileName}?(y or n)`;
    err
      ? cb1 && cb1(err)
      : questionRl(faq, answer => {
          if (answer === 'y') {
            rmdirp(ftPath);
            rmdirp(fstylePath);
            deleteStories(fileName, type);
            const pattern = new RegExp(
              String.raw`export { ${fileName} } from \'\.\/${fileName}\'\;\n`,
              'g',
            );
            fdel(path.resolve(typePath, 'index.ts'), pattern);
            cb2 && cb2();
          } else {
            process.exit(0);
          }
        });
  });
}

function deleteComponentFiles(fileName, typePath) {
  const cb1 = () => {
    Console.Func.info(`${fileName} is not exist`);
  };
  const cb2 = () => {
    Console.Func.success(`${fileName} success delete`);
  };

  componentFiles(fileName, typePath, { cb1 });
}

function createComponentFiles(fileName, typePath) {
  const ct = () => createTemplate(fileName, 'react', typePath);

  componentFiles(fileName, typePath, { cb1: ct, cb2: ct });
}

module.exports = {
  createComponentFiles,
  deleteComponentFiles,
  titleWord,
};
