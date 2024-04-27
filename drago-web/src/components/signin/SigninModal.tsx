'use client'

import { Button, Center, ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa6'
import { signIn } from 'next-auth/react'

interface SignInProps {
  isOpen: boolean
  onClose: () => void
}

function SigninModal ({isOpen, onClose}: SignInProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Google Sign-In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Button size='lg' leftIcon={<FaGoogle />} onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>Google Sign-In</Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SigninModal
