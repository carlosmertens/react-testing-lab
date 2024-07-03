import { render, screen } from '@testing-library/react';
import { TagList } from '../../src/components/TagList';

describe('TagList component', () => {
  it('should render asyncronous list', async () => {
    render(<TagList />);

    // 1. Use waitFor()
    // await waitFor(() => {
    //   const listItems = screen.getAllByRole('listitem');
    //   expect(listItems.length).toBeGreaterThan(0);
    // });

    // 2. USe findAllByRole
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });
});
