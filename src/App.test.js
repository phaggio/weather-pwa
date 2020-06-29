import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Test', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(`/simple-weather`);
  expect(linkElement).toBeInTheDocument();
});
