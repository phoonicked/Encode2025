import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { wagmiConfig } from '../utils/wagmi.ts'
import { WagmiConfig } from 'wagmi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </StrictMode>,
)
