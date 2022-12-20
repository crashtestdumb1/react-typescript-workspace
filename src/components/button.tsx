const title: string = 'Test Button 1';

export default function Button( title: any ) {
    return (
        <>
        <p>
            <code>
            <button className="button">{title}</button>
            </code>
        </p>
        </>
    );
}