import { Modal, ModalBody, ModalContent, ModalCloseButton, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import BusinessForm from '@/components/form/create-business'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CreateBusinessModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Create business
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <BusinessForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateBusinessModal
