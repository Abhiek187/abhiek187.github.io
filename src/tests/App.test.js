import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import App from '../js/App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('2 + 2 is not 5', () => {
  expect(2 + 2).not.toBe(5);
});

it('renders without crashing', () => {
  render(<BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>, container);
});
