// src/components/molecules/__tests__/LetterForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LetterForm } from '../LetterForm';

// Mock the onSubmit prop
const mockOnSubmit = vi.fn();

const defaultProps = {
  onSubmit: mockOnSubmit,
  isLoading: false,
};

describe('LetterForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('submits the form with valid data and calls onSubmit with correct values', async () => {
    const user = userEvent.setup();

    render(<LetterForm {...defaultProps} />);

    // Fill all required fields
    await user.type(screen.getByPlaceholderText('John Doe'), 'Maria Silva');
    await user.type(screen.getByPlaceholderText('123 Main St, City, State, ZIP'), 'Rua das Flores 123, Lisboa');
    await user.type(screen.getByPlaceholderText('TRK123456789'), 'TRK987654321');
    await user.type(screen.getByLabelText(/Sent Date/i), '2025-11-17');

    // Select status
    await user.click(screen.getByRole('combobox', { name: /status/i }));
    await user.click(screen.getByRole('option', { name: /in transit/i }));

    // Optional notes
    await user.type(screen.getByPlaceholderText('Additional notes...'), 'Urgent delivery');

    // Submit
    await user.click(screen.getByRole('button', { name: /save letter/i }));

    // Assert onSubmit was called once with correct data
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      recipientName: 'Maria Silva',
      address: 'Rua das Flores 123, Lisboa',
      trackingNumber: 'TRK987654321',
      sentDate: '2025-11-17',
      status: 'in_transit',
      notes: 'Urgent delivery',
    });
  });
});