// HARD PROOF THE FILE IS LOADED
alert("auth.js LOADED");

function submitKey() {
  const error = document.getElementById("error");
  error.textContent = "Verifying key...";

  const input = document.getElementById("keyInput").value.trim();

  if (!input) {
    error.textContent = "❌ No key entered";
    return;
  }

  fetch("./keys.json", { cache: "no-store" })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load keys.json");
      }
      return res.json();
    })
    .then(data => {
      if (data[input]) {
        error.textContent = "✅ Key valid. Unlocking...";
        unlockSite();
      } else {
        error.textContent = "❌ Invalid key";
      }
    })
    .catch(err => {
      error.textContent = "❌ FAILED TO VERIFY KEY";
      console.error(err);
    });
}

function unlockSite() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("site").classList.remove("hidden");
}
