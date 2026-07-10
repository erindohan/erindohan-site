// Server-side password gate for the unlisted book excerpt.
//
// The excerpt page is a normal static page, but this Edge Function runs BEFORE
// it is served (for any path under /read/*). Unless the visitor has already
// entered the correct password, the page's HTML is never sent to the browser —
// so it can't be bypassed by "View Source". The password itself lives only in
// the EXCERPT_PASSWORD environment variable on Netlify, never in the site code.
//
// If EXCERPT_PASSWORD is not set, the gate stays open (the page behaves as a
// plain unlisted page) so no one is ever locked out by a missing config.

// In-source configuration: Netlify auto-discovers edge functions in this
// directory and reads this `config` to bind the function to a route. This is
// Netlify's recommended, most reliable declaration method — a netlify.toml
// [[edge_functions]] entry alone was not binding the function on deploy.
export const config = {
  path: "/read/*",
  cache: "manual",
};

const COOKIE_NAME = "excerpt_unlocked";

export default async (request, context) => {
  const password = Netlify.env.get("EXCERPT_PASSWORD");

  // Diagnostic: proves in the Netlify "Edge Functions" log that this function
  // actually runs for /read/* requests, and whether it can see the password.
  console.log(
    `[excerpt-gate] ${request.method} ${new URL(request.url).pathname} — password configured: ${Boolean(password)}`,
  );

  // No password configured → don't gate, just serve the page.
  if (!password) {
    return context.next();
  }

  const token = await sha256(`itirtt::${password}`);
  const url = new URL(request.url);

  // Handle a password submission.
  if (request.method === "POST") {
    const form = await request.formData();
    const attempt = (form.get("password") || "").toString().trim();

    if (attempt === password) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: url.pathname,
          "Set-Cookie": `${COOKIE_NAME}=${token}; Path=/read; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
          "Cache-Control": "no-store",
        },
      });
    }
    return gatePage({ error: true });
  }

  // Already unlocked (valid cookie present) → serve the page.
  const cookies = request.headers.get("cookie") || "";
  const unlocked = cookies
    .split(/;\s*/)
    .some((c) => c === `${COOKIE_NAME}=${token}`);

  if (unlocked) {
    return context.next();
  }

  // Locked → show the password prompt.
  return gatePage({ error: false });
};

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function gatePage({ error }) {
  const errorMsg = error
    ? `<p class="err">That password isn't right. Please check the email and try again.</p>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>A Private Reading — Erin Dohan</title>
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --cream: #FAF6F1; --warm-white: #FDF9F5; --terracotta: #C4836A;
    --terracotta-dark: #A0624B; --terracotta-light: #D9A08A; --dark: #2C2420;
    --mid: #6B5B52; --light-mid: #9E8D85; --border: #E8DED6;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "DM Sans", system-ui, sans-serif;
    background: var(--cream); color: var(--dark);
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 2rem 1.5rem;
  }
  .card {
    width: 100%; max-width: 26rem; text-align: center;
    background: var(--warm-white); border: 1px solid var(--border);
    border-radius: 4px; padding: 3rem 2.25rem;
  }
  .eyebrow {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--terracotta); margin-bottom: 1.25rem;
  }
  h1 {
    font-family: "Playfair Display", Georgia, serif; font-weight: 700;
    font-size: 1.9rem; line-height: 1.2; color: var(--dark); margin-bottom: 0.85rem;
  }
  .lede {
    font-family: "Cormorant Garamond", Georgia, serif; font-style: italic;
    font-size: 1.3rem; line-height: 1.5; color: var(--mid); margin-bottom: 2rem;
  }
  form { display: flex; flex-direction: column; gap: 0.85rem; }
  input[type="password"] {
    font-family: "DM Sans", sans-serif; font-size: 1rem; text-align: center;
    padding: 0.85rem 1rem; border: 1px solid var(--border); border-radius: 3px;
    background: #fff; color: var(--dark); width: 100%;
  }
  input[type="password"]:focus {
    outline: none; border-color: var(--terracotta);
  }
  button {
    font-family: "DM Sans", sans-serif; font-size: 0.85rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: #fff;
    background: var(--dark); border: none; border-radius: 3px;
    padding: 0.9rem 1rem; cursor: pointer; transition: background 0.2s;
  }
  button:hover { background: var(--terracotta-dark); }
  .err {
    color: var(--terracotta-dark); font-size: 0.85rem; margin-bottom: 1rem;
  }
  .note {
    font-size: 0.8rem; color: var(--light-mid); margin-top: 1.75rem; line-height: 1.5;
  }
  .note a { color: var(--terracotta); text-decoration: none; }
  .note a:hover { text-decoration: underline; text-underline-offset: 2px; }
</style>
</head>
<body>
  <main class="card">
    <p class="eyebrow">A Private Reading</p>
    <h1>The First Pages</h1>
    <p class="lede">A free excerpt from <em>I Think I'm Ready to Talk</em>, just for readers on my list.</p>
    ${errorMsg}
    <form method="POST" autocomplete="off">
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        aria-label="Password"
        autofocus
        required
      />
      <button type="submit">Unlock the Excerpt</button>
    </form>
    <p class="note">This password was sent in your welcome email when you joined the list.<br />
      Not on the list yet? <a href="/#newsletter">Sign up here</a> and I'll send it over.</p>
  </main>
</body>
</html>`;

  return new Response(html, {
    status: error ? 401 : 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
