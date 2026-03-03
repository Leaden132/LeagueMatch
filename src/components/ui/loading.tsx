import styles from "./loading.module.css";

export function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
}

export function Skeleton({
  width,
  height,
  borderRadius,
}: {
  width?: string;
  height?: string;
  borderRadius?: string;
}) {
  return (
    <div
      className="skeleton"
      style={{ width: width ?? "100%", height: height ?? "1rem", borderRadius }}
    />
  );
}
