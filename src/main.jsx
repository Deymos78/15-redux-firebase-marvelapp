import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { MarvelApp } from './MarvelApp'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <MarvelApp />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
)
