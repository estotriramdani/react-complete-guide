import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from './Greeting';

describe('Greeting components', () => {
  // it('should display the correct text', () => {
  //   render(<Greeting />);
  //   expect(screen.getByText('Hello World!')).toBeInTheDocument();
  // });
  test('should contain hello world', () => {
    // arrange
    render(<Greeting />);

    // Act
    // ... do nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World!', {
      trim: true,
      exact: false,
    });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders good to see you if the button was not clicked', () => {
    render(<Greeting />);
    const paragraphElement = screen.getByText('good to see you', {
      exact: false,
    });
    expect(paragraphElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    // arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not renders "good to see you" if the button was clicked', () => {
    // arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText('good to see you', {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
