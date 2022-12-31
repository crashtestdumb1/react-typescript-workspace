import * as React from 'react';
import styles from '@scss/app.module.scss';


const Welcome = ({ text }: {text : any}) => {
  return <h1>{text}</h1>;
};

const PageProperties = () => {
  const greeting = 'Welcome to the Properties page';
  const [isShow, setIsShow] = React.useState(false);

  let[isCount, setIsCount] = React.useState(0);

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <h1>{greeting}</h1>
      { isShow && <><p>Toggle is on</p><br /><Welcome text="Welcome Component Text" /><button onClick={() => setIsCount(0)} className={styles.create}>Reset Counter</button><br /></>}
      <button onClick={handleToggle} className={styles['standard-create']}>Toggle</button>
      <button onClick={() => setIsCount(isCount + 1)} className={styles['standard-create']}>Count Up</button>
      <button onClick={() => setIsCount(isCount - 1)} className={styles.outline}>Count Down</button>

      <p>The current Count is: {isCount}</p>
    </>
  );

};

export default PageProperties;
