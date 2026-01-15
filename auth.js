console.log("auth.js loaded"); // DEBUG

async function submitKey() {
  console.log("submitKey() called"); // DEBUG

  const input = document.getElementById("keyInput").value.trim();
  const error = document.getElementById("error");

  error.textContent = "";

  if (!input) {
    error.textContent = "Please enter a key";
    return;
  }

  try {
    const res = await fetch("./keys.json", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to load keys.json");
    }

    const data = await res.json();
    console.log("Loaded keys:", data.keys); // DEBUG

    if (data.keys.includes(input)) {
      unlockSite();
    } else {
      error.textContent = "Invalid key";
    }
  } catch (err) {
    console.error(err);
    error.textContent = "Key system error (check console)";
  }
}

function unlockSite() {
  console.log("Key valid, unlocking site"); // DEBUG
  document.getElementById("overlay").style.display = "none";
  document.getElementById("site").classList.remove("hidden");
}
