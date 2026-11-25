(() => {
  const section = document.querySelector("[data-course-schedules]");
  const data = window.HORARIOS_AULA;
  if (!section || !Array.isArray(data)) return;
  const schedules = data.filter((item) => item.grade === document.body.dataset.courseTitle).sort((a, b) => a.page - b.page);
  const select = section.querySelector("#course-parallel");
  const image = section.querySelector(".schedule-image");
  const download = section.querySelector(".schedule-download");
  if (!schedules.length) { section.hidden = true; return; }
  const label = (item) => item.parallel ? `Jornada matutina · Paralelo ${item.parallel}` : "Jornada matutina";
  select.innerHTML = schedules.map((item, index) => `<option value="${index}">${label(item)}</option>`).join("");
  const showSchedule = () => {
    const item = schedules[Number(select.value)] || schedules[0];
    const name = label(item);
    image.src = item.image;
    image.alt = `Horario de ${item.grade}, ${name}`;
    download.dataset.filename = `horario-${item.image.split("/").pop().split("?")[0].replace(/\.svg$/i, ".png")}`;
    download.setAttribute("aria-label", `Descargar horario de ${item.grade}, ${name} como imagen PNG`);
  };
  download.addEventListener("click", (event) => {
    event.preventDefault();
    if (!image.complete || !image.naturalWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(image, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = download.dataset.filename || "horario.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  });
  select.addEventListener("change", showSchedule);
  showSchedule();
})();
