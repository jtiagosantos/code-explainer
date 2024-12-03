import { SignIn } from '@clerk/nextjs';
import { Modal } from './modal';

export const AuthModal = () => {
  return (
    <Modal.Root>
      <Modal.Content>
        <SignIn />
      </Modal.Content>
    </Modal.Root>
  );
};