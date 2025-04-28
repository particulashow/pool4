// Ler parâmetros do URL
const params = new URLSearchParams(window.location.search);
const question = params.get('question') || 'Qual a tua cor preferida?';
const optA = params.get('optA') || 'Azul';
const optB = params.get('optB') || 'Vermelho';
const optC = params.get('optC') || 'Verde';
const optD = params.get('optD') || 'Amarelo';
const domain = params.get('domain') || 'http://localhost:4000';

let root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

let pieChart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout
}));

let series = pieChart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category"
}));

series.labels.template.setAll({
  textType: "circular",
  fontSize: 25,
  fill: am5.color("#FFF"),
  fontWeight: "bold"
});

series.slices.template.setAll({
  strokeOpacity: 0
});

// Inicializa o gráfico
series.data.setAll([
  { category: optA, value: 0 },
  { category: optB, value: 0 },
  { category: optC, value: 0 },
  { category: optD, value: 0 }
]);

// Função para buscar os comentários e atualizar
function fetchVotes() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const wordcloud = data.wordcloud?.toLowerCase().split(',') || [];

      const countA = wordcloud.filter(word => word.trim() === optA.toLowerCase()).length;
      const countB = wordcloud.filter(word => word.trim() === optB.toLowerCase()).length;
      const countC = wordcloud.filter(word => word.trim() === optC.toLowerCase()).length;
      const countD = wordcloud.filter(word => word.trim() === optD.toLowerCase()).length;

      series.data.setAll([
        { category: optA, value: countA > 0 ? countA : 0.01 },
        { category: optB, value: countB > 0 ? countB : 0.01 },
        { category: optC, value: countC > 0 ? countC : 0.01 },
        { category: optD, value: countD > 0 ? countD : 0.01 }
      ]);
    })
    .catch(error => console.error("Erro ao buscar votos:", error));
}

// Atualiza a cada segundo
setInterval(fetchVotes, 1000);

// Limpa chat para nova votação
fetch(`${domain}/clear-chat?words=${optA},${optB},${optC},${optD}`);
