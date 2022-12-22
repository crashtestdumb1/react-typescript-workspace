import { useState } from 'react';
import Button from "@components/button";

type MyButtonProps = {
  count: number;
  onClick: () => void;
};

export default function PageState() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
    
  function handleReset() {
    setCount(0);
  }

    return (
      <div>
        <h1>State Management</h1>
        <h3> Changing together: </h3>
        <MyButton count={count} onClick={handleClick} /><br />
        <MyButton count={count} onClick={handleClick} /><br />
        <h3> Changing independently: </h3>
        <MyIndieButton /><br />
        <MyIndieButton /><br />
        <h3> Utilities </h3>
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  
  }

function MyIndieButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button onClick={handleClick}>
      Clicked {count} times!
    </button>
  );
}
function MyButton({ count, onClick}: MyButtonProps) {

  return (
    <button onClick={onClick}>
      Clicked {count} times!
    </button>
  );
}

