import { render, screen } from '@testing-library/react';
import { UserAccount } from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount component', () => {
  let user: User;

  beforeEach(() => {
    user = { id: 1, name: 'carlos', isAdmin: true };
  });

  it('should render the user name', () => {
    render(<UserAccount user={user} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('should render edit button if user is admin', () => {
    render(<UserAccount user={user} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it('should not render edit button if user is not admin', () => {
    user.isAdmin = false;

    render(<UserAccount user={user} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
