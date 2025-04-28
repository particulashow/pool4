const domain = new URLSearchParams(window.location.search).get('domain') || 'http://localhost:3900';

const options = {
  A: "azul",
  B: "vermelho",
  C: "verde",
  D: "amarelo"
};

function updatePoll(votes) {
  const totalVotes = votes.A + votes.B + votes.C + votes.D;

  document.getElementById('countA').textContent = votes.A;
  document.getElementById('countB').textContent = votes.B;
  document.getElementById('countC').textContent = votes.C;
  document.getElementById('countD').textContent = votes.D;

  document.getElementById('fillA').style.width = totalVotes ? (votes.A / totalVotes) * 100 + "%" : "0%";
  document.getElementById('fillB').style.width = totalVotes ? (votes.B / totalVotes) * 100 + "%" : "0%";
  document.getElementById('fillC').style.width = totalVotes ? (votes.C / totalVotes) * 100 + "%" : "0%";
  document.getElementById('fillD').style.width = totalVotes ? (votes.D / totalVotes) * 100 + "%" : "0%";
}

function fetchVotes() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const words = (data.wordcloud || "").toLowerCase().split(',');
      const votes = {
        A: words.filter(w => w.trim() === options.A).length,
        B: words.filter(w => w.trim() === options.B).length,
        C: words.filter(w => w.trim() === options.C).length,
        D: words.filter(w => w.trim() === options.D).length
      };
      updatePoll(votes);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

// Atualizar a cada segundo
setInterval(fetchVotes, 1000);

// Primeira carga
fetchVotes();
