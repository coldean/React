import styles from "./CSSModule.module.css";
const CSSModule = () => {
  return (
    <div className={styles.wrapper}>
      hi, I'm <span className="something"> CSS Module!</span>
    </div>
  );
};

export default CSSModule;
