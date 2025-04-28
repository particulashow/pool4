const params = new URLSearchParams(window.location.search);
const domain = params.get('domain') || 'http://localhost:4000';

// Pergunta e opções da URL
const questionText = params.get('question') || 'Qual a tua cor preferida?';
const optionA = params.get('optA') || 'Azul';
const optionB = params.get('optB') || 'Vermelho';
const optionC = params.get('optC') || 'Verde';
const optionD = params.get('optD') || 'Amarelo';

const wordsOptions = {
  A: optionA.toLowerCase(),
  B: optionB.toLowerCase(),
  C: optionC.toLowerCase(),
  D: optionD.toLowerCase()
};

document.getElementById('question').textContent = questionText;

const optionsDiv = document.getElementById('options');

// Cria as opções no HTML
['A', 'B', 'C', 'D'].forEach(letter => {
  const optDiv = document.createElement('div');
  optDiv.classList.add('option');
  optDiv.id = `option${letter}`;
  optDiv.innerHTML = `
    <div class="label">${letter}) ${params.get(`opt${letter}`)}</div>
    <div class="bar"><div class="fill" id="fill${letter}"></div></div>
    <div class="count" id="count${letter}">0</div>
  `;
  optionsDiv.appendChild(optDiv);
});

// Atualizar votos
function updatePoll(votes) {
  const totalVotes = votes.A + votes.B + votes.C + votes.D;

  ['A', 'B', 'C', 'D'].forEach(letter => {
    document.getElementById(`count${letter}`).textContent = votes[letter];
    document.getElementById(`fill${letter}`).style.width = totalVotes ? (votes[letter] / totalVotes) * 100 + "%" : "0%";
  });
}

// Buscar dados
function fetchVotes() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const words = (data.wordcloud || "").toLowerCase().split(',');
      const votes = {
        A: words.filter(w => w.trim() === wordsOptions.A).length,
        B: words.filter(w => w.trim() === wordsOptions.B).length,
        C: words.filter(w => w.trim() === wordsOptions.C).length,
        D: words.filter(w => w.trim() === wordsOptions.D).length
      };
      updatePoll(votes);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

// Atualizar a cada segundo
setInterval(fetchVotes, 1000);
fetchVotes();
