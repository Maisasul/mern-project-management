import React from 'react'

const ConfirmationDialog = ({ message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  return (
    <div className='p-6 text-center space-y-6'>
      <h3 className='text-xl font-semibold text-gray-800'>{message}</h3>
      <div className='flex justify-center gap-4'>
        <button
          onClick={onCancel}
          className='px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className='px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors'
        >
          {confirmText}
        </button>
      </div>
    </div>
  )
}

export default ConfirmationDialog