import Button from "@components/button";

export default function pageButton() {
  const title: string = 'Test Button 1';
  const btnTitle: string = 'Reactive Button';
  function handleClick() {
    alert('You clicked the button!');
  }

  return (
    <>
      <code>
        Buttons:
        <Button title={title} />

        <button onClick={handleClick}>{btnTitle}</button>
      </code>
    </>
  );
}
