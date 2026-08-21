const copyButton = document.querySelector("[data-copy]");
const installCommand = "npx skills add TechWithEmmaYT/TechwithEmma-Skills";

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(installCommand);
    copyButton.textContent = "Copied";
    copyButton.disabled = true;

    window.setTimeout(() => {
      copyButton.textContent = "Copy";
      copyButton.disabled = false;
    }, 2500);
  } catch {
    copyButton.textContent = "Copy failed";
  }
});
