localStorage.setItem("amedi_logged", "yes");
if (localStorage.getItem("amedi_logged") !== "yes") {
  window.location.href = "index.html"; // эгер кирбесе кайра login'ге жиберет
}
