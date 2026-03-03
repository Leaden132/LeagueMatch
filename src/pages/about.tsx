import styles from "./about.module.css";

export default function About() {
  return (
    <section className={styles.page}>
      <div className="wrapper">
        <h2 className={styles.title}>
          What is <span className={styles.accent}>League of Legends?</span>
        </h2>
        <p className={styles.subtitle}>League of Legends</p>
        <p>
          League of Legends is Riot Games' multiplayer online battle arena
          &mdash; <strong className={styles.highlight}>MOBA</strong>.
        </p>
        <p>
          Two teams of five players can pick from a pool of over{" "}
          <strong className={styles.highlight}>150 champions</strong> with
          unique abilities and fight to destroy the enemy base.
        </p>
        <p>
          Over{" "}
          <strong className={styles.highlight}>120 million</strong> player
          base worldwide.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Select your Champion</h3>
            <p>
              Over 150 playable champions are waiting to be played by you, with
              new champions added every few months. Choose the best champion for
              you!
            </p>
          </div>
          <div className={styles.card}>
            <h3>Choose your Role</h3>
            <p>
              Each player needs to choose a specific position on the map which
              offers distinctive experiences and enjoyment.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Destroy the Nexus</h3>
            <p>
              Collaborate with your teammates to destroy the enemy Nexus and
              achieve victory!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
