import { render, screen } from '@testing-library/react';
import { OrderStatusSelector } from '../../src/components/OrderStatusSelector';
import { Theme } from '@radix-ui/themes';
import userEvent from '@testing-library/user-event';

describe('OrderStatusSelector component', () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      trigger: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
      getOption: (label: RegExp) =>
        screen.findByRole('option', { name: label }),
      onChange,
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

  test.each([
    { label: /processed/i, value: 'processed' },
    { label: /fulfilled/i, value: 'fulfilled' },
  ])(
    'should call onChange with $value when selected',
    async ({ label, value }) => {
      const { trigger, onChange, getOption } = renderComponent();
      await userEvent.click(trigger);

      const option = await getOption(label);
      await userEvent.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("should call on change with 'new' when selected", async () => {
    const { trigger, onChange, getOption } = renderComponent();
    await userEvent.click(trigger);

    const processedOption = await getOption(/fulfilled/i);
    await userEvent.click(processedOption);

    await userEvent.click(trigger);
    const newOption = await getOption(/new/i);
    await userEvent.click(newOption);

    expect(onChange).toHaveBeenCalledWith('new');
  });
});
