import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';

describe('PasswordStrengthIndicator', () => {
  it('renders nothing when password is empty', () => {
    const { container } = render(<PasswordStrengthIndicator password="" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows Weak for a simple lowercase password', () => {
    render(<PasswordStrengthIndicator password="abc" />);
    expect(screen.getByText('Weak')).toBeInTheDocument();
  });

  it('shows Fair for lowercase + uppercase', () => {
    render(<PasswordStrengthIndicator password="abcDEF" />);
    expect(screen.getByText('Fair')).toBeInTheDocument();
  });

  it('shows Good for lowercase + uppercase + number', () => {
    render(<PasswordStrengthIndicator password="abcDEF1" />);
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('shows Strong for length + mixed case + number', () => {
    render(<PasswordStrengthIndicator password="abcDEF12" />);
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('shows Very Strong for all criteria', () => {
    render(<PasswordStrengthIndicator password="Abcdef1!" />);
    expect(screen.getByText('Very Strong')).toBeInTheDocument();
  });

  it('renders all 5 criteria labels', () => {
    render(<PasswordStrengthIndicator password="a" />);
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('Lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('Number')).toBeInTheDocument();
    expect(screen.getByText('Special character (!@#$...)')).toBeInTheDocument();
  });
});
