import AppContent from '@pages/App';
import styles from "@css/app.module.css";

export default function AppLayout() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <AppContent />
      </header>
    </div>
  );
}
