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
    const response = await fetch("./keys.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load keys.json");
    }

    const data = await response.json();
    console.log("Loaded keys:", data); // DEBUG

    // Check if the key exists in your object
    if (data[input]) {
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
  console.log("Key valid, unlocking site");
  document.getElementById("overlay").style.display = "none";
  document.getElementById("site").classList.remove("hidden");
}
