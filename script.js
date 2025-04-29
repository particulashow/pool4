// Ler parâmetros da URL
const params = new URLSearchParams(window.location.search);
const optA = params.get('optA') || 'Opção A';
const optB = params.get('optB') || 'Opção B';
const optC = params.get('optC') || 'Opção C';
const optD = params.get('optD') || 'Opção D';
const domain = params.get('domain') || 'http://localhost:3900';

let root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

let pieChart = root.container.children.push(am5percent.PieChart.new(root, {
  innerRadius: am5.percent(50),
}));

let pieSeries = pieChart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  alignLabels: false,
}));

pieSeries.labels.template.setAll({
  textType: "circular",
  fontSize: 25,
  fill: am5.color("#FFF"),
  fontWeight: "bold",
});

pieSeries.slices.template.setAll({
  strokeOpacity: 0,
});

// Inicializa o gráfico
pieSeries.data.setAll([
  { category: optA, value: 1 },
  { category: optB, value: 1 },
  { category: optC, value: 1 },
  { category: optD, value: 1 }
]);

// Função para atualizar os dados
function updateData(countA, countB, countC, countD) {
  pieSeries.data.setAll([
    { category: optA, value: countA > 0 ? countA : 0.01 },
    { category: optB, value: countB > 0 ? countB : 0.01 },
    { category: optC, value: countC > 0 ? countC : 0.01 },
    { category: optD, value: countD > 0 ? countD : 0.01 }
  ]);
}

// Função para buscar os dados do servidor
function fetchData() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      let chatHistory = (data.wordcloud || "").toLowerCase().split(',');

      let countA = chatHistory.filter(word => word.trim() === optA.toLowerCase()).length;
      let countB = chatHistory.filter(word => word.trim() === optB.toLowerCase()).length;
      let countC = chatHistory.filter(word => word.trim() === optC.toLowerCase()).length;
      let countD = chatHistory.filter(word => word.trim() === optD.toLowerCase()).length;

      updateData(countA, countB, countC, countD);
    })
    .catch(error => console.error('Erro ao buscar votos:', error));
}

// Atualiza a cada segundo
setInterval(fetchData, 1000);

// Limpar chat inicialmente
fetch(`${domain}/clear-chat?words=${optA},${optB},${optC},${optD}`)
  .then(() => setTimeout(fetchData, 500));
