const KEY_URL = "https://raw.githubusercontent.com/USERNAME/REPO/main/keys.json";

function isValidFormat(key) {
  return /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/.test(key);
}

async function submitKey() {
  const input = document.getElementById("keyInput");
  const error = document.getElementById("error");
  const key = input.value.trim().toUpperCase();

  if (!isValidFormat(key)) {
    error.textContent = "Invalid key format";
    return;
  }

  try {
    const res = await fetch(KEY_URL);
    const keys = await res.json();

    if (keys[key]) {
      localStorage.setItem("authorized", "true");
      window.location.href = "downloads.html";
    } else {
      error.textContent = "Invalid key";
    }
  } catch {
    error.textContent = "Failed to verify key";
  }
}
