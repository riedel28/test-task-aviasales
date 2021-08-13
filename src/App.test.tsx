import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import App from './App';

describe('App', () => {
  test('renders App component correctly', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
