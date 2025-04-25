const votes = { A: 0, B: 0, C: 0, D: 0 };
const streamId = "748c0ff7"; // substitui pelo teu stream ID se necessário
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);

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

// Remove acentos e põe tudo em maiúsculas
function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

// WebSocket connection
socket.addEventListener("open", () => {
  console.log("Ligado ao WebSocket do SocialStreamNinja!");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "chat-message") {
    const message = normalize(data.message);

    if (message === "A") votes.A++;
    else if (message === "B") votes.B++;
    else if (message === "C") votes.C++;
    else if (message === "D") votes.D++;

    updatePoll();
  }
});
