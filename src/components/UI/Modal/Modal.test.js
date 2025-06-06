import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal Component', () => {
  let modalClosedMock;

  beforeEach(() => {
    modalClosedMock = jest.fn();
  });

  it('renders modal with children when show prop is true', () => {
    render(
      <Modal show={true} modalClosed={modalClosedMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render modal with children when show prop is false', () => {
    render(
      <Modal show={false} modalClosed={modalClosedMock}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls modalClosed function when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Modal show={true} modalClosed={modalClosedMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const backdrop = container.querySelector('.Backdrop');
    await user.click(backdrop);

    expect(modalClosedMock).toHaveBeenCalledTimes(1);
  });

  it('calls modalClosed function when escape key is pressed', () => {
    render(
      <Modal show={true} modalClosed={modalClosedMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    fireEvent.keyDown(modal, { keyCode: 27 });

    expect(modalClosedMock).toHaveBeenCalledTimes(1);
  });
});
