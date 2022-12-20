import Button from "@components/button";

const title: string = 'Test Button 1';

export default function pageButton() {
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
