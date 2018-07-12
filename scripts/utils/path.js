const path = require('path');

const projectDir = process.cwd();
const templatePath = path.join(projectDir, '/config/template');
const srcPath = path.resolve(projectDir, 'src');
const compPath = path.resolve(srcPath, 'components');
const stylePath = path.resolve(srcPath, 'style');
const reactPath = path.resolve(compPath, 'react');
const vuePath = path.resolve(compPath, 'vue');
const angularPath = path.resolve(compPath, 'angular');
const stories = {
  dir: path.resolve(srcPath, 'stories'),
  react: path.resolve(srcPath, 'stories/react'),
  vue: path.resolve(srcPath, 'stories/vue'),
  angular: path.resolve(srcPath, 'stories/angular'),
};

const Path = {
  project: projectDir,
  template: templatePath,
  src: srcPath,
  style: stylePath,
  react: reactPath,
  vue: vuePath,
  angular: angularPath,
  stories,
};

module.exports = Path;
