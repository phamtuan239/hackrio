import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { useChangeEvent } from 'react-hooks-custom'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '../config/api'
import { mapErrorApi } from '../utils/convert'
import useModal from '../hooks/useModal'
import ResendMail, { SendMailBody } from '../components/ResendMail'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import Layout from '../components/Layout'

const Register = () => {
  const { value, onChange } = useChangeEvent({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [sendMailBody, setSendMailBody] = useState<SendMailBody>()

  const { mutationCallback } = useMutation()
  const [register, { loading }] = mutationCallback(ApiUrl.auth.REGISTER)

  const { ModalError } = useModal()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register({
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
                <h1>Register</h1>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="user123"
                    name="name"
                    required={true}
                    onChange={onChange}
                    disabled={loading}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    required={true}
                    onChange={onChange}
                    disabled={loading}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required={true}
                    minLength={6}
                    name="password"
                    onChange={onChange}
                    disabled={loading}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    required={true}
                    pattern={value.password}
                    onChange={onChange}
                    disabled={loading}
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  variant="outline-warning"
                  type="submit"
                >
                  {!loading && 'Regsiter'}
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

export default Register
