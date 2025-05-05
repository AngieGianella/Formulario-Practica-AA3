$(document).ready(function () {
  const listaCursos = $("#listaCursos");

  const cursos = [
    {
      id: 1,
      nombre: "Curso de HTML Básico",
      imagen: "./library/img/html.png",
      creditos: 3,
      docentes: ["Juan Pérez"],
      temas: ["HTML"],
      alumnos: 30,
      duracion: 20,
      notaMinima: 12,
    },
    {
      id: 2,
      nombre: "Curso de JavaScript Avanzado",
      imagen: "./library/img/javascript.png",
      creditos: 4,
      docentes: ["María Díaz", "Carlos Ruiz"],
      temas: ["JavaScript"],
      alumnos: 25,
      duracion: 30,
      notaMinima: 14,
    },
  ];

  const docentesData = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "María Díaz" },
    { id: 3, nombre: "Carlos Ruiz" },
  ];

  const temasData = [
    { id: 1, nombre: "HTML" },
    { id: 2, nombre: "CSS" },
    { id: 3, nombre: "JavaScript" },
    { id: 4, nombre: "Bootstrap" },
  ];

  function fnCursoCard(curso) {
    const card = `
<div class="col-md-6 mb-4">
<div class="card h-100 shadow-sm p-2">
<div class="d-flex align-items-start">
  <img src="${
    curso.imagen
  }" class="img-thumbnail me-3" style="width: 120px; height: 120px; object-fit: cover;" alt="Imagen del curso">
  <div>
    <h6 class="mb-2 fw-bold text-primary">${curso.nombre}</h6>
    <p class="mb-1 small"><strong>ID:</strong> ${curso.id}</p>
    <p class="mb-1 small"><strong>Créditos:</strong> ${curso.creditos}</p>
    <p class="mb-1 small"><strong>Duración:</strong> ${curso.duracion} horas</p>
    <p class="mb-1 small"><strong>Docentes:</strong> ${curso.docentes.join(
      ", "
    )}</p>
    <p class="mb-1 small"><strong>Temas:</strong> ${curso.temas.join(", ")}</p>
    <p class="mb-1 small"><strong>Alumnos:</strong> ${curso.alumnos}</p>
    <p class="mb-0 small"><strong>Nota mínima:</strong> ${curso.notaMinima}</p>
  </div>
</div>
</div>
</div>`;
    listaCursos.prepend(card);
  }

  docentesData.forEach((docente) => {
    $("#cursoDocentes").append(
      `<option value="${docente.nombre}">${docente.nombre}</option>`
    );
  });

  temasData.forEach((tema) => {
    $("#cursoTemas").append(
      `<option value="${tema.nombre}">${tema.nombre}</option>`
    );
  });

  cursos.forEach((curso) => fnCursoCard(curso));

  function validarFormulario() {
    let esValido = true;
    $("#formCurso [required]").each(function () {
      if (
        !$(this).val() ||
        ($(this).is("select") && $(this).val().length === 0)
      ) {
        $(this).addClass("is-invalid");
        esValido = false;
      } else {
        $(this).removeClass("is-invalid");
      }
    });
    return esValido;
  }

  let nuevoCurso = null;

  $("#btnConfirmarGuardar").click(function () {
    if (!validarFormulario()) return;

    nuevoCurso = {
      id: cursos.length + 1,
      nombre: $("#cursoNombre").val(),
      imagen: $("#cursoImagen").val() || ".",
      creditos: $("#cursoCreditos").val(),
      docentes: $("#cursoDocentes").val() || [],
      temas: $("#cursoTemas").val() || [],
      alumnos: $("#cursoAlumnos").val(),
      duracion: $("#cursoDuracion").val(),
      notaMinima: $("#cursoNotaMinima").val(),
    };

    $("#confirmGuardarModal").modal("show");
  });

  $("#btnGuardarCursoFinal").click(function () {
    if (nuevoCurso) {
      cursos.push(nuevoCurso);
      fnCursoCard(nuevoCurso);
      $("#confirmGuardarModal").modal("hide");
      $("#cursoModal").modal("hide");
      $("#confirmModal").modal("show");
      $("#formCurso")[0].reset();
      $("#formCurso .is-invalid").removeClass("is-invalid");
    }
  });
});
