import Button from "@components/button";

export default function pageButton() {
  const title: string = 'Test Button 1';

  return (
    <>
      <p>
        <code>
          Buttons:
          <Button title={title} />
        </code>
      </p>
    </>
  );
}
