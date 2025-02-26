import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlaqueComponent from '../components/Memorial/PlaqueComponent';

describe('PlaqueComponent', () => {
  it('renders name and date of death', () => {
    render(
      <PlaqueComponent
        name="John Doe"
        dateOfDeath="2022-01-15T00:00:00.000Z"
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // The formatted date should contain "January" and "2022"
    expect(screen.getByText(/January.*2022/)).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <PlaqueComponent
        name="Jane Smith"
        dateOfDeath="2022-03-10T00:00:00.000Z"
        description="Beloved mother and friend"
      />
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Beloved mother and friend')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(
      <PlaqueComponent
        name="Robert Johnson"
        dateOfDeath="2022-05-22T00:00:00.000Z"
      />
    );

    expect(screen.getByText('Robert Johnson')).toBeInTheDocument();
    // The component contains "div" elements, so we can't check for the absence
    // of any description element. Instead, we should check that there's no text
    // that might be a description.
    expect(screen.queryByText(/Beloved/)).not.toBeInTheDocument();
    expect(screen.queryByText(/mother/)).not.toBeInTheDocument();
    expect(screen.queryByText(/father/)).not.toBeInTheDocument();
  });
});