import AppContent from '@pages/App';
import styles from "@scss/app.module.scss";
import Navigation from '@features/Navigation';
import MainContainer from '@routes/Main';

export default function AppLayout() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <Navigation />
        <AppContent />
        <MainContainer />
      </header>
    </div>
  );
}
