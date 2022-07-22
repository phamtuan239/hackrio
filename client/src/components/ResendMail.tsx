import React from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '../config/api'
import useModal from '../hooks/useModal'
import Layout from './Layout'

export type SendMailBody = {
  method: string
  email: string
}

interface ResendMailProps {
  body: SendMailBody | undefined
}

const ResendMail = ({ body }: ResendMailProps) => {
  const { mutationCallback } = useMutation()
  const [resendMail, { loading }] = mutationCallback(ApiUrl.auth.SEND_MAIL)

  const { ModalErrorMessage, ModalSuccess } = useModal()

  const onResendHandler = () => {
    resendMail({
      body,
      onCompleted() {
        ModalSuccess('Successfully.Please check your email again.')
      },
      onError() {
        ModalErrorMessage('Error server cant send mail')
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col lg={6} className="mx-auto mt-3">
          <h4>We sent link to verify your email.</h4>
          <Button
            onClick={onResendHandler}
            disabled={loading}
            variant="outline-warning"
            type="submit"
          >
            {!loading && 'Resend mail'}
            {loading && <Spinner animation="border" size="sm" />}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ResendMail
