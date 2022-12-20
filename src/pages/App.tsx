import React from 'react';
import logo from '@images/logo.svg';
import styles from "@css/app.module.css";

export default function AppContent() {
  return (
    <>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </>
  );
}
