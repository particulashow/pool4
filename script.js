const votes = { A: 0, B: 0, C: 0, D: 0 };

function updatePoll() {
  const total = votes.A + votes.B + votes.C + votes.D || 1;

  document.getElementById("countA").textContent = votes.A;
  document.getElementById("countB").textContent = votes.B;
  document.getElementById("countC").textContent = votes.C;
  document.getElementById("countD").textContent = votes.D;

  document.getElementById("fillA").style.width = `${(votes.A / total) * 100}%`;
  document.getElementById("fillB").style.width = `${(votes.B / total) * 100}%`;
  document.getElementById("fillC").style.width = `${(votes.C / total) * 100}%`;
  document.getElementById("fillD").style.width = `${(votes.D / total) * 100}%`;
}

// Simulação de votos (podes substituir isto por WebSocket, comentários ou teclado)
setInterval(() => {
  const keys = ["A", "B", "C", "D"];
  const random = keys[Math.floor(Math.random() * keys.length)];
  votes[random]++;
  updatePoll();
}, 1500);
