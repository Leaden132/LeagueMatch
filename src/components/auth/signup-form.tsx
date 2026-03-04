import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import styles from "./auth-form.module.css";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { signUp, resendConfirmation } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await signUp(email, password, displayName);
      setConfirmed(true);
      setInfo("Check your email for a confirmation link.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      await resendConfirmation(email);
      setInfo("Confirmation email resent. Check your inbox.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend email");
    }
  };

  if (confirmed) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Check Your Email</h2>
        {info && <p className={styles.info}>{info}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.text}>
          We sent a confirmation link to <strong>{email}</strong>.
          Click the link to activate your account.
        </p>
        <Button variant="secondary" onClick={handleResend}>
          Resend Confirmation Email
        </Button>
        <p className={styles.link}>
          Already confirmed? <Link to="/login">Log In</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="displayName"
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      {/* TODO: Uncomment when Google OAuth is configured (see tasks/google-auth-setup.md) */}
      {/* <div className={styles.divider}>
        <span>or</span>
      </div>

      <Button variant="secondary" onClick={handleGoogle} className={styles.googleBtn}>
        Continue with Google
      </Button> */}

      <p className={styles.link}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
