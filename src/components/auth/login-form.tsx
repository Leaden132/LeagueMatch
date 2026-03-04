import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import styles from "./auth-form.module.css";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const { signIn, resendConfirmation } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setNeedsConfirmation(false);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to sign in";
      setError(msg);
      if (msg.toLowerCase().includes("email not confirmed")) {
        setNeedsConfirmation(true);
      }
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Log In</h2>
      {error && <p className={styles.error}>{error}</p>}
      {info && <p className={styles.info}>{info}</p>}
      {needsConfirmation && (
        <Button variant="secondary" onClick={handleResend}>
          Resend Confirmation Email
        </Button>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
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
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Log In"}
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
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
