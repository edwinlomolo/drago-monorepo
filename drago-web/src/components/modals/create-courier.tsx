import { Modal, ModalContent, ModalBody, ModalHeader, ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import CreateCourierForm from '@/components/form/create-courier'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CreateCourierModal = ({isOpen, onClose}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Create courier
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateCourierForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateCourierModal
