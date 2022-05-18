const { render, screen } = require('@testing-library/react');
const { default: Async } = require('./Async');

describe('Async components', () => {
  test('renders posts if request is succeed', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValue({
      json: async () => [
        { id: 'p1', title: 'post 1' },
        { id: 'p2', title: 'post 2' },
      ],
    });
    render(<Async />);
    const listItemElements = await screen.findAllByRole(
      'listitem',
      {},
      { timeout: 2000 }
    );
    expect(listItemElements).not.toHaveLength(0);
  });
});
