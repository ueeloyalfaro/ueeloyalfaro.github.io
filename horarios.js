(() => {
  const root = document.querySelector("[data-schedule-list]");
  if (!root || !Array.isArray(window.HORARIOS_AULA)) return;
  const section = root.closest("[data-schedule-level]");
  const level = section.dataset.scheduleLevel;
  const materials = section.dataset.materials;
  const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const schedules = window.HORARIOS_AULA.filter((item) => item.level === level);
  if (!schedules.length) {
    root.innerHTML = '<p class="schedule-empty">Los horarios de este nivel se publicarán cuando estén disponibles.</p>';
    return;
  }
  root.innerHTML = schedules.map((schedule, index) => {
    const parallel = schedule.parallel ? ` · Paralelo ${esc(schedule.parallel)}` : "";
    const days = schedule.days.map((entries, dayIndex) => {
      const blocks = entries.map((entry) => {
        let value = entry.text.replace(/\bINGLE · S\b/g, "INGLÉS");
        return `<li>${esc(value)}</li>`;
      }).join("");
      return `<tr><th scope="row">${dayNames[dayIndex]}</th><td>${blocks ? `<ul class="schedule-subjects">${blocks}</ul>` : '<span class="schedule-no-entries">Sin materias registradas en el documento</span>'}</td></tr>`;
    }).join("");
    const id = `horario-${level}-${schedule.page}`;
    return `<details class="schedule-card" id="${id}" ${index === 0 ? "open" : ""}>
      <summary><span>${esc(schedule.grade)}${parallel}</span><span class="schedule-toggle" aria-hidden="true">＋</span></summary>
      <div class="schedule-card-content">
        <p class="schedule-day-caption">Materias y docentes por día <span>Jornada indicada: 07h00–13h10</span></p>
        <div class="schedule-table-wrap" role="region" aria-label="Horario de ${esc(schedule.grade)}${parallel}" tabindex="0">
          <table class="schedule-table"><thead><tr><th scope="col">Día</th><th scope="col">Materias y docentes registrados</th></tr></thead><tbody>${days}</tbody></table>
        </div>
        <div class="schedule-materials"><div><span class="section-kicker">MATERIAL ESCOLAR</span><h3>Útiles de ${esc(schedule.grade.toLowerCase())}${parallel}</h3><p>Lista referencial del nivel. Confirma los materiales con la institución antes de comprarlos.</p></div><a class="button button-green" href="${esc(materials)}" download>Descargar lista referencial <span aria-hidden="true">↓</span></a></div>
      </div>
    </details>`;
  }).join("");
})();
