import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Greet from '../../src/components/Greet';

describe('Greet component', () => {
  it('should render with a name when name is provided', () => {
    render(<Greet name='Carlos' />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/carlos/i);
  });

  it('should render login button when name is not provided', () => {
    render(<Greet />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
