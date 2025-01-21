import PostPreviewContainer from "../components/PostPreviewContainer.jsx";
import styles from "./Root.module.css";

function Root() {
    return (
        <>
            <div className={styles.container}>
                <div>
                    <div>{"Here are some post you can look at"}</div>
                </div>
                <PostPreviewContainer />
            </div>
        </>
    );
}

export default Root;
