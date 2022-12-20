import styles from "@scss/button.module.scss";

type ButtonType = {
    title: string
}

export default function Button( {title}: ButtonType) {
    return (
        <>
        <p>
            <code>
            <button className={styles.standard}>{title}</button>
            </code>
        </p>
        </>
    );
}