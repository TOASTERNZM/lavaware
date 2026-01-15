async function submitKey() {
  const input = document.getElementById("keyInput").value.trim();
  const error = document.getElementById("error");

  try {
    const response = await fetch("keys.json");
    const data = await response.json();

    if (data.keys.includes(input)) {
      unlockSite();
    } else {
      error.textContent = "Invalid key";
    }
  } catch (e) {
    error.textContent = "Key system error";
  }
}

function unlockSite() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("site").classList.remove("hidden");
}

function copyScript() {
  const script = `print("Lavaware Loaded")`;
  navigator.clipboard.writeText(script);
  document.getElementById("copied").textContent = "Copied to clipboard!";
}
