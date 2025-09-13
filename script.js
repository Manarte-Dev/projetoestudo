const coresSemanas = [
  "#4caf50", "#2196f3", "#ff9800", "#9c27b0",
  "#f44336", "#00bcd4", "#ffeb3b", "#795548"
];

document.querySelectorAll(".semana").forEach((divSemana, sIndex) => {
  const progressBar = divSemana.querySelector(".progress-bar");
  divSemana.style.borderColor = coresSemanas[sIndex];
  divSemana.querySelector("h2").style.color = coresSemanas[sIndex];
  progressBar.style.backgroundColor = coresSemanas[sIndex];

  const checkboxes = divSemana.querySelectorAll("li input[type='checkbox']");
  const progressKey = `semana${sIndex+1}-progress`;

  const updateProgress = () => {
    const total = checkboxes.length;
    const done = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = (done / total) * 100;
    progressBar.style.width = `${percent}%`;
    localStorage.setItem(progressKey, percent);
  };

  checkboxes.forEach((checkbox, dIndex) => {
    const key = `semana${sIndex+1}-dia${dIndex+1}-done`;
    checkbox.checked = localStorage.getItem(key) === "true";
    if (checkbox.checked) checkbox.parentElement.classList.add("completed");

    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
      checkbox.parentElement.classList.toggle("completed");
      updateProgress();
    });
  });

  const savedProgress = localStorage.getItem(progressKey);
  if (savedProgress) progressBar.style.width = savedProgress;
  else updateProgress();
});

document.getElementById("limpar").addEventListener("click", () => {
  if(confirm("Deseja realmente limpar todo o progresso?")){
    localStorage.clear();
    document.querySelectorAll(".semana li input[type='checkbox']").forEach(cb => {
      cb.checked = false;
      cb.parentElement.classList.remove("completed");
    });
    document.querySelectorAll(".progress-bar").forEach(bar => bar.style.width = "0%");
  }
});
