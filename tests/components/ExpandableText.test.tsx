import { render, screen } from '@testing-library/react';
import { ExpandableText } from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText component', () => {
  const limit = 255;
  const shortText = 'a'.repeat(limit - 1);
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';

  it('should render the full text if less than 255 characters', () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  it('should truncate text if longer than 255 characters', () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/more/i);
  });

  it('should expand text when show more button is click', async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it('should collapse text when show less button is click', async () => {
    render(<ExpandableText text={longText} />);
    const showMoreBtn = screen.getByRole('button', { name: /more/i });
    await userEvent.click(showMoreBtn);

    const showLessBtn = screen.getByRole('button', { name: /less/i });
    await userEvent.click(showLessBtn);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreBtn).toHaveTextContent(/more/i);
  });
});
