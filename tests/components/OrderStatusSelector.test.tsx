import { render, screen } from '@testing-library/react';
import { OrderStatusSelector } from '../../src/components/OrderStatusSelector';
import { Theme } from '@radix-ui/themes';
import userEvent from '@testing-library/user-event';

describe('OrderStatusSelector component', () => {
  const renderComponent = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    );

    return {
      trigger: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
    };
  };

  it('should render New as a default value', () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it('should render correct status', async () => {
    const { trigger, getOptions } = renderComponent();

    await userEvent.click(trigger);

    const options = await getOptions();
    expect(options).toHaveLength(3);
    const labels = options.map(option => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });
});
