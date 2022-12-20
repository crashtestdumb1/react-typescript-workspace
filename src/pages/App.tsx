import React from 'react';
import logo from '@images/logo.svg';
import styles from "@css/app.module.css";
import Connect from '@components/terraStation/connect';

export default function AppContent() {
  return (
    <>
      <img src={logo} className={styles['App-logo']} alt="logo" />
      <p>
        <code>
          <Connect />
        </code>
      </p>
    </>
  );
}
