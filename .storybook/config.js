import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../src/stories', true, /\.stories\.tsx?$/);
  req.keys().forEach(fileName => {
    req(fileName);
  });
}

configure(loadStories, module);
