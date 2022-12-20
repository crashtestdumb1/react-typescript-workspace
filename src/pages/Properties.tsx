import * as React from 'react';
import styles from '@scss/app.module.scss';

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
      { isShow && <><p>Toggle is on</p><br /><button onClick={() => setIsCount(0)} className={styles.create}>Reset Counter</button><br /></>}
      <button onClick={handleToggle} className={styles.standard}>Toggle</button>
      <button onClick={() => setIsCount(isCount + 1)} className={styles.create}>Count Up</button>
      <button onClick={() => setIsCount(isCount - 1)} className={styles.create}>Count Down</button>

      <p>The current Count is: {isCount}</p>
    </>
  );

  const Welcome = ({ text }: {text : any}) => {
    return <h1>{text}</h1>;
  };

};

export default PageProperties;
