document.getElementById("translate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("translated-div").classList.remove("hidden");
  document.getElementById("translate-form").classList.add("hidden");
  const text = document.getElementById("input-text").value;
  const language = document.querySelector(
    "input[name='language']:checked"
  ).value;
  translateText(text, language);
});

async function translateText(text, language) {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });
  const data = await res.json();
  updateDOM(data.result, text);
}

function updateDOM(translatedText, originalText) {
  document.getElementById("translated-div").innerHTML = `
        <p class="main-label">Original text 👇</p>
        <p class="text-top">${originalText}</p>
        <p class="main-label">Your translation 👇</p>
        <p class="text-bottom">${translatedText}</p>
        <button class="button" id="start-over">Start Over</button>
  `;
  const startOverBtn = document.getElementById("start-over");
  if (startOverBtn) {
    startOverBtn.addEventListener("click", () => {
      document.getElementById("translated-div").classList.add("hidden");
      document.getElementById("translate-form").classList.remove("hidden");
      document.getElementById("translate-form").reset();
    });
  }
}
