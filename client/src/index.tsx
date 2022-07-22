import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AxiosProvider, axios } from 'react-hooks-axios'
import { RecoilRoot } from 'recoil'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Router>
    <RecoilRoot>
      <AxiosProvider axios={axios}>
        <App />
      </AxiosProvider>
    </RecoilRoot>
  </Router>
)
