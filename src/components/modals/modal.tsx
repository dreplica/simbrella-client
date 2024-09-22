// components/Modal.tsx
import React from 'react'
import { FormButton } from '../forms'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg shadow-lg max-w-sm w-full">
        <FormButton
          className="absolute top-2 right-2 text-gray-600 text-3xl text-white"
          onClick={onClose}
          title="&times;"
          onSubmit={onClose}
        />
        {children}
      </div>
    </div>
  )
}

export default Modal
