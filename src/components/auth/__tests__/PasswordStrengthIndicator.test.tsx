import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';

function renderIndicator(password: string) {
  const { container } = render(<PasswordStrengthIndicator password={password} />);
  const getByText = (text: string) => {
    const el = Array.from(container.querySelectorAll('*')).find(
      (node: Element) => node.textContent === text && node.children.length === 0
    );
    if (!el) throw new Error(`Unable to find element with text: ${text}`);
    return el;
  };
  return { container, getByText };
}

describe('PasswordStrengthIndicator', () => {
  it('renders nothing when password is empty', () => {
    const { container } = render(<PasswordStrengthIndicator password="" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows Weak for a simple lowercase password', () => {
    const { getByText } = renderIndicator('abc');
    expect(getByText('Weak')).toBeTruthy();
  });

  it('shows Fair for lowercase + uppercase', () => {
    const { getByText } = renderIndicator('abcDEF');
    expect(getByText('Fair')).toBeTruthy();
  });

  it('shows Good for lowercase + uppercase + number', () => {
    const { getByText } = renderIndicator('abcDEF1');
    expect(getByText('Good')).toBeTruthy();
  });

  it('shows Strong for length + mixed case + number', () => {
    const { getByText } = renderIndicator('abcDEF12');
    expect(getByText('Strong')).toBeTruthy();
  });

  it('shows Very Strong for all criteria', () => {
    const { getByText } = renderIndicator('Abcdef1!');
    expect(getByText('Very Strong')).toBeTruthy();
  });

  it('renders all 5 criteria labels', () => {
    const { getByText } = renderIndicator('a');
    expect(getByText('At least 8 characters')).toBeTruthy();
    expect(getByText('Uppercase letter')).toBeTruthy();
    expect(getByText('Lowercase letter')).toBeTruthy();
    expect(getByText('Number')).toBeTruthy();
    expect(getByText('Special character (!@#$...)')).toBeTruthy();
  });
});
