$(document).ready(function () {
  $("#btn").click(function () {
    if (
      $("#input").val() !== "" &&
      $("#input").val() <= 731 &&
      $("#input").val() > 0
    ) {
      window.location.href = "./resultado.html?id=" + $("#input").val();
      validarInput($("#input").val());
      $("#input").val("");
      $("#input").focus();
    } else {
      alert("Ingresa un numero del 1 al 731 para buscar un superheroe");
      $("#input").val("");
      $("#input").focus();
    }
  });
});

$(document).ready(function () {
  let urlParams = new URLSearchParams(window.location.search);
  let superheroId = urlParams.get("id");

  $.ajax({
    url: "https://superheroapi.com/api.php/2619421814940190/" + superheroId,
    success: function (data) {
      console.log(data);
      renderData(data);
      renderChart(data);
    },
  });

  function renderData(data) {
    let htmlData = `
    <h2>Superheroe Encontrado</h2>
    <div id="card" class="card col-lg-12 col-md-8 col-sm-6">
      <div class="row">
        <div class="col-md-4">
        <img src="${data.image.url}" class="card-img" alt="...">
        </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Nombre: ${data.name}</h5>
          <p class="card-text">Conexión: ${data.connections["group-affiliation"]}</p>
          <p class="card-text">Publicado por: ${data.biography.publisher}</p>
          <hr>
          <p class="card-text">Ocupación: ${data.work.occupation}</p>
          <hr>
          <p class="card-text">Primera aparicion: ${data.biography["first-appearance"]}</p>
          <hr>
          <p class="card-text">Altura: ${data.appearance.height[1]}</p>
          <hr>
          <p class="card-text">Peso: ${data.appearance.weight[1]}</p>
          <hr>
          <p class="card-text">Alianza: ${data.biography.aliases}</p>
        </div>
      </div>
    </div>
    </div>
    `;
    $("#datos").html(htmlData);
  }

  function renderChart(data) {
    if (data.powerstats.intelligence === "null") {
      alert("No se encontro estadisticas para" + data.name);
      return;
    }
    let chart = new CanvasJS.Chart("estadisticas", {
      title: {
        text: "Estadistica de poder para " + data.name,
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          indexLabel: "{label}: {y}",
          dataPoints: [
            { y: data.powerstats.intelligence, label: "Inteligencia" },
            { y: data.powerstats.strength, label: "Fuerza" },
            { y: data.powerstats.speed, label: "Velocidad" },
            { y: data.powerstats.durability, label: "Durabilidad" },
            { y: data.powerstats.power, label: "Poder" },
            { y: data.powerstats.combat, label: "Combate" },
          ],
        },
      ],
    });
    chart.render();
  }
});
