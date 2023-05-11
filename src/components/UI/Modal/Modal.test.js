import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  let modalClosedMock;

  beforeEach(() => {
    modalClosedMock = jest.fn();
  });

  it('renders modal with children when show prop is true', () => {
    const { getByTestId, queryByText } = render(
      <Modal show={true} modalClosed={modalClosedMock} dataTestId="modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modal = getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(queryByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render modal with children when show prop is false', () => {
    const { queryByText } = render(
      <Modal show={false} modalClosed={modalClosedMock} dataTestId="modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls modalClosed function when backdrop is clicked', () => {
    const { getByTestId } = render(
      <Modal show={true} modalClosed={modalClosedMock} dataTestId="modal">
        <div>Modal Content</div>
      </Modal>
    );

    const backdrop = getByTestId('backdrop');
    fireEvent.click(backdrop);

    expect(modalClosedMock).toHaveBeenCalledTimes(1);
  });

  it('calls modalClosed function when escape key is pressed', () => {
    const { getByTestId } = render(
      <Modal show={true} modalClosed={modalClosedMock} dataTestId="modal">
        <div>Modal Content</div>
      </Modal>
    );

    const modal = getByTestId('modal');
    fireEvent.keyDown(modal, { keyCode: 27 });

    expect(modalClosedMock).toHaveBeenCalledTimes(1);
  });
});
