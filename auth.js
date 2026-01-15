function isValidFormat(key) {
  return /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/.test(key);
}

async function submitKey() {
  const keyInput = document.getElementById("keyInput");
  const error = document.getElementById("error");

  const key = keyInput.value.trim().toUpperCase();
  error.textContent = "";

  if (!isValidFormat(key)) {
    error.textContent = "Invalid key format";
    return;
  }

  try {
    // IMPORTANT: fetch from repo root (GitHub Pages)
    const res = await fetch("keys.json", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const keys = await res.json();

    if (!keys[key]) {
      error.textContent = "Invalid key";
      return;
    }

    unlock(); 
  } catch (err) {
    console.error("Key verification failed:", err);
    error.textContent = "Failed to verify key";
  }
}

function unlock() {
  
  document.getElementById("overlay").style.display = "none";

  /
  const content = document.getElementById("content");
  content.style.display = "block";

 
  content.innerHTML = `
    <h1 style="color:white;">Choose a download</h1>

    <div style="display:flex; gap:15px; flex-wrap:wrap;">
      <button onclick="downloadFile('tool1.zip')">Tool 1</button>
      <button onclick="downloadFile('tool2.zip')">Tool 2</button>
      <button onclick="downloadFile('tool3.zip')">Tool 3</button>
    </div>
  `;
}

function downloadFile(file) {
  window.location.href = "files/" + file;
}
