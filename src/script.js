window.addEventListener("DOMContentLoaded", () => {
  if (!window.DwellerApp) {
    console.error("DwellerApp failed to load.");
    return;
  }

  window.DwellerApp.init();
});
