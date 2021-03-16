import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GlobalProvider} from './context/GlobalState'
import { SpeechProvider } from '@speechly/react-client';
ReactDOM.render(
  <SpeechProvider appId="19fc62aa-d0d4-43c0-aa30-fa8d6ef63459" language="en-US">
  <GlobalProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GlobalProvider>
  </SpeechProvider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
