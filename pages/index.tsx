import { authClient } from "@/lib/auth/client";

export default function Home() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>HOME</h1>
      <button onClick={handleLogin}>
        Login with GitHub
      </button>
    </div>
  );
}