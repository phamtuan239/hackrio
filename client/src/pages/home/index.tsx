import React, { useEffect } from 'react'
import { useQuery } from 'react-hooks-axios'
import { useRecoilState } from 'recoil'
import Layout from '../../components/Layout'
import ApiUrl from '../../config/api'
import { userState } from '../../states/user'

const Home = () => {
  const { queryCallback } = useQuery()
  const [auth, { loading }] = queryCallback(ApiUrl.auth.AUTH_INFO)
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    auth({
      onCompleted(data) {
        console.log(data)
        setUser(data.user)
      },
      onError() {}
    })
  }, [])
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default Home
