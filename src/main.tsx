import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/api'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
)

