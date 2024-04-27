import { Modal, ModalBody, ModalHeader, ModalContent, ModalCloseButton, ModalOverlay } from '@chakra-ui/react'
import CreateTripForm from '@/components/form/create-trip'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CreateTripModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Create trip
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateTripForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateTripModal
