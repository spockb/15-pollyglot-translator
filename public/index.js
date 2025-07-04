// update dom with translation
// start over button click

const startOverBtn = document.getElementById("start-over");

document.getElementById("translate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("translated-div").classList.remove("hidden");
  document.getElementById("translate-form").classList.add("hidden");
  const text = document.getElementById("input-text").value;
  const language = document.querySelector(
    "input[name='language']:checked"
  ).value;

  console.log(text, language);

  translateText(text, language);
});

if (startOverBtn) {
  startOverBtn.addEventListener("click", () => {
    document.getElementById("translated-div").classList.add("hidden");
    document.getElementById("translate-form").classList.remove("hidden");
  });
}

async function translateText(text, language) {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });
  const data = await res.json();
  console.log(data);
  updateDOM(data);
}

function updateDOM(text) {
  document.getElementById("translated-div").innerHTML = `
        <p class="main-label">Original text 👇</p>
        <p class="text-top">${text}</p>
        <p class="main-label">Your translation 👇</p>
        <p class="text-bottom">How are you?</p>
        <button class="button" id="start-over">Start Over</button>
  `;
}
