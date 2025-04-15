// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Log Click Events and Page Views
document.addEventListener("click", (event) => {
  const timestamp = new Date().toISOString();
  const eventType = "click";
  const eventObject = event.target.tagName.toLowerCase();
  console.log(`${timestamp}, ${eventType}, ${eventObject}`);
});
window.addEventListener("load", () => {
  const timestamp = new Date().toISOString();
  const eventType = "view";
  const eventObject = "page";
  console.log(`${timestamp}, ${eventType}, ${eventObject}`);
});

// Text Analysis
document.getElementById("analyze-text").addEventListener("click", () => {
  const text = document.getElementById("text-input").value;

  // Calculate counts
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  const wordCount = (text.match(/\b\w+\b/g) || []).length;
  const spaceCount = (text.match(/\s/g) || []).length;
  const newlineCount = (text.match(/\n/g) || []).length;
  const specialSymbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

  // Tokenize and count pronouns
  const pronouns = ["he", "she", "it", "they", "we", "you", "i"];
  const pronounCounts = {};
  pronouns.forEach((pronoun) => {
    pronounCounts[pronoun] = (text.match(new RegExp(`\\b${pronoun}\\b`, "gi")) || []).length;
  });

  // Tokenize and count prepositions
  const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through"];
  const prepositionCounts = {};
  prepositions.forEach((preposition) => {
    prepositionCounts[preposition] = (text.match(new RegExp(`\\b${preposition}\\b`, "gi")) || []).length;
  });

  // Tokenize and count indefinite articles
  const articles = ["a", "an"];
  const articleCounts = {};
  articles.forEach((article) => {
    articleCounts[article] = (text.match(new RegExp(`\\b${article}\\b`, "gi")) || []).length;
  });

  // Display results
  const output = `
    <p><strong>Letter Count:</strong> ${letterCount}</p>
    <p><strong>Word Count:</strong> ${wordCount}</p>
    <p><strong>Space Count:</strong> ${spaceCount}</p>
    <p><strong>Newline Count:</strong> ${newlineCount}</p>
    <p><strong>Special Symbol Count:</strong> ${specialSymbolCount}</p>
    <p><strong>Pronoun Counts:</strong> ${JSON.stringify(pronounCounts)}</p>
    <p><strong>Preposition Counts:</strong> ${JSON.stringify(prepositionCounts)}</p>
    <p><strong>Article Counts:</strong> ${JSON.stringify(articleCounts)}</p>
  `;
  document.getElementById("analysis-output").innerHTML = output;
});