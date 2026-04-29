import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import 'sweetalert2/dist/sweetalert2.min.css'
import '@/assets/scss/style.scss'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter basename={'/'}>
      <App />
    </BrowserRouter>
  // </StrictMode>
)
