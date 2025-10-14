import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');

const RootTree = import.meta.env.DEV ? (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
) : (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

createRoot(root).render(RootTree);
