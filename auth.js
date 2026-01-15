function isValidFormat(key) {
  return /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/.test(key);
}

async function submitKey() {
  const input = document.getElementById("keyInput");
  const error = document.getElementById("error");
  const key = input.value.trim().toUpperCase();

  error.textContent = "";

  if (!isValidFormat(key)) {
    error.textContent = "Invalid key format";
    return;
  }

  try {
    const res = await fetch("./keys.json", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("keys.json not reachable");
    }

    const keys = await res.json();

    if (!keys[key]) {
      error.textContent = "Invalid key";
      return;
    }

    unlock(); // SUCCESS
  } catch (e) {
    console.error(e);
    error.textContent = "Failed to verify key";
  }
}

function unlock() {
  document.getElementById("overlay").style.display = "none";
  const content = document.getElementById("content");
  content.style.display = "block";

  content.innerHTML = `
    <h1 style="color:white;">Choose a download</h1>
    <button onclick="download('tool1.zip')">Tool 1</button>
    <button onclick="download('tool2.zip')">Tool 2</button>
    <button onclick="download('tool3.zip')">Tool 3</button>
  `;
}

function download(file) {
  window.location.href = "files/" + file;
}
