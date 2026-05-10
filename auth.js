// auth.js — keys are stored as SHA-256 hashes, never plaintext
// To add a new key:
//   1. Go to https://emn178.github.io/online-tools/sha256.html
//   2. Hash your key (uppercase, trimmed)
//   3. Add the hash to the VALID_HASHES set below

const VALID_HASHES = new Set([
  // Example: hash of "LAVA-ABCD-1234"
  // Replace these with your own hashed keys
  "REPLACE_WITH_SHA256_HASH_OF_YOUR_KEY",
  "REPLACE_WITH_ANOTHER_HASH",
]);

async function submitKey() {
  const errorEl = document.getElementById("error") || document.getElementById("modalStatus");
  const input   = (document.getElementById("keyInput")?.value || "").trim().toUpperCase();

  if (!input) {
    showError(errorEl, "No key entered.");
    return;
  }

  showError(errorEl, "Verifying…", "loading");

  try {
    const hash = await sha256(input);

    if (VALID_HASHES.has(hash)) {
      showError(errorEl, "Access granted.", "success");
      setTimeout(unlockSite, 600);
    } else {
      showError(errorEl, "Invalid key.", "error");
      shake();
    }
  } catch (e) {
    showError(errorEl, "Verification failed.", "error");
    console.error(e);
  }
}

function unlockSite() {
  const overlay = document.getElementById("overlay");
  const site    = document.getElementById("site");

  overlay.style.transition = "opacity 0.5s ease";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";

  site.classList.remove("hidden");
  site.classList.add("visible");

  setTimeout(() => overlay.remove(), 500);
}

async function sha256(str) {
  const buf  = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function showError(el, msg, type = "error") {
  if (!el) return;
  el.textContent = msg;
  el.className   = type;
}

function shake() {
  const inp = document.getElementById("keyInput");
  if (!inp) return;
  inp.classList.add("shake");
  inp.addEventListener("animationend", () => inp.classList.remove("shake"), { once: true });
}

// Allow Enter key
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("keyInput")?.addEventListener("keydown", e => {
    if (e.key === "Enter") submitKey();
  });
});
