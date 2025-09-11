import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react';
import store from './store'
import {system} from "./theme.js";
import {ColorModeProvider} from "./contexts/ColorModeContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ChakraProvider value={system}>
        <Provider store={store}>
         <ColorModeProvider>
             <App />
         </ColorModeProvider>
        </Provider>
      </ChakraProvider>
  </StrictMode>,
)
