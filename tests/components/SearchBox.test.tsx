import { render, screen } from '@testing-library/react';
import { SearchBox } from '../../src/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox component', () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    const input = screen.getByPlaceholderText(/search/i);

    return {
      input,
      onChange,
    };
  };

  it('should render a search input ', () => {
    const { input } = renderComponent();

    expect(input).toBeInTheDocument();
  });

  it('should call onChange when enter key is pressed', async () => {
    const { input, onChange } = renderComponent();
    const searchTerm = 'SearchTerm';

    await userEvent.type(input, searchTerm + '{enter}');

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('should  not call onChange when search field is empty', async () => {
    const { input, onChange } = renderComponent();

    await userEvent.type(input, '{enter}');

    expect(onChange).not.toHaveBeenCalled();
  });
});
