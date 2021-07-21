import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Gridderer } from '../stories/Thing.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Gridderer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
