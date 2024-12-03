import { createRoot } from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AllContext from './Context/AllContext.js'
import './index.css'
import { FacebookProvider } from 'react-facebook'

createRoot(document.getElementById('root')!).render(
  <AllContext>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
    <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FacebookProvider>
    </GoogleOAuthProvider>
  </AllContext>
)
