import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useChangeEvent } from 'react-hooks-custom'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '../config/api'
import { mapErrorApi } from '../utils/convert'
import useModal from '../hooks/useModal'
import ResendMail, { SendMailBody } from '../components/ResendMail'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import Layout from '../components/Layout'

const ForgotPassword = () => {
  const { value, onChange } = useChangeEvent({
    email: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [sendMailBody, setSendMailBody] = useState<SendMailBody>()

  const { mutationCallback } = useMutation()
  const [forgotPassword, { loading }] = mutationCallback(
    '/api/v1/auth/forgot-password'
  )

  const { ModalError } = useModal()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    forgotPassword({
      body: value,
      method: 'post',
      onCompleted(data) {
        setIsSuccess(true)
        setSendMailBody({
          email: data.email,
          method: data.method
        })
      },
      onError(error) {
        const errorApi = mapErrorApi(error)
        if (errorApi.status === 400) {
          ModalError(errorApi.error)
        }
      }
    })
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col lg={6} className="mx-auto mt-3">
            {!isSuccess && (
              <Form onSubmit={onSubmitHandler}>
                <h1>Forgot Password</h1>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Your email account"
                    name="email"
                    required={true}
                    onChange={onChange}
                    disabled={loading}
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  variant="outline-warning"
                  type="submit"
                >
                  {!loading && 'Send'}
                  {loading && <Spinner animation="border" size="sm" />}
                </Button>
              </Form>
            )}
            {isSuccess && <ResendMail body={sendMailBody} />}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ForgotPassword
