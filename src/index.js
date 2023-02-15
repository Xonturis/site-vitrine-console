import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FakeConsole from './fake-console/FakeConsole';
import reportWebVitals from './reportWebVitals';
import getPrompt from "./fake-console/prompts/welcomePrompt";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FakeConsole prompt={getPrompt()}/>
  // <React.StrictMode>
  //   <FakeConsole />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
