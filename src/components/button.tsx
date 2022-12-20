import styles from "@scss/button.module.scss";

export default function Button( { title }: { title: string }) {
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