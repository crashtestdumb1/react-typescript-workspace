import React from 'react';
import logo from './logo.svg';
import AppContent from '@pages/App';
import styles from "@css/app.module.css";

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <AppContent />
      </header>
    </div>
  );
}

export default App;
