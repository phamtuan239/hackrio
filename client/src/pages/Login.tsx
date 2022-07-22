import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { useChangeEvent } from 'react-hooks-custom'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '../config/api'
import { mapErrorApi } from '../utils/convert'
import useModal from '../hooks/useModal'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { value, onChange } = useChangeEvent({
    email: '',
    password: ''
  })

  const { mutationCallback } = useMutation()
  const [login, { loading }] = mutationCallback(ApiUrl.auth.LOGIN)

  const { ModalError, ModalErrorMessage } = useModal()
  const navigate = useNavigate()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({
      body: value,
      method: 'post',
      onCompleted() {
        navigate('/', { replace: true })
      },
      onError(error) {
        const errorApi = mapErrorApi(error)
        if (errorApi.status === 400) {
          ModalError(errorApi.error)
        } else {
          ModalErrorMessage('Error server cant login')
        }
      }
    })
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col lg={6} className="mx-auto mt-3">
            <Form onSubmit={onSubmitHandler}>
              <h1>Login</h1>
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
              <Button
                disabled={loading}
                variant="outline-warning"
                type="submit"
              >
                {!loading && 'Login'}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Login
