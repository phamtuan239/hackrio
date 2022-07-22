import React from 'react'
import { Modal } from 'antd'
import { mapError } from '../utils/convert'
import { Error } from '../types/error'

const useModal = () => {
  const displayListErrorMessage = (errors: string[]) => {
    return errors.map((error, key) => {
      const errSplit = error.split(':')
      return (
        <p key={key}>
          <b className="text-capitalize">{errSplit[0]}</b>:{errSplit[1]}
        </p>
      )
    })
  }

  const ModalError = (error: Error | Error[] | null, title = null) => {
    const errors = mapError(error)
    Modal.error({
      title: title || 'Error message',
      content: <div>{displayListErrorMessage(errors)}</div>,
      onOk() {}
    })
  }

  const ModalErrorMessage = (msg: string, title = null) => {
    Modal.error({
      title: title || 'Error message',
      content: <div>{msg}</div>,
      onOk() {}
    })
  }

  const ModalSuccess = (msg: string, title = null) => {
    Modal.success({
      title: title || 'Success',
      content: <div>{msg}</div>,
      onOk() {}
    })
  }

  return { ModalError, ModalErrorMessage, ModalSuccess }
}

export default useModal
