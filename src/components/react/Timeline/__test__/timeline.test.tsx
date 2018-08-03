import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Timeline } from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Timeline />, div);
  ReactDOM.unmountComponentAtNode(div);
});
