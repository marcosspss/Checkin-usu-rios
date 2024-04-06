let participantes = [
  {
    nome: "Marcos Paulo",
    email: "marcos.paulo-ss@outlook.com",
    dataInscricao: new Date(2024, 1, 2, 20, 30),
    dataCheckin: new Date(2024, 1, 2, 20, 30),
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 3, 15, 18, 45),
    dataCheckin: new Date(2024, 2, 28, 10, 30),
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    dataInscricao: new Date(2024, 3, 10, 14, 20),
    dataCheckin: new Date(2024, 2, 26, 16, 15),
  },
  {
    nome: "Carla Santos",
    email: "carla.santos@example.com",
    dataInscricao: new Date(2024, 3, 5, 9, 0),
    dataCheckin: new Date(2024, 2, 27, 11, 45),
  },
  {
    nome: "Rafaela Costa",
    email: "rafaela.costa@example.com",
    dataInscricao: new Date(2024, 3, 20, 12, 10),
    dataCheckin: new Date(2024, 2, 29, 14, 30),
  },
  {
    nome: "José Almeida",
    email: "jose.almeida@example.com",
    dataInscricao: new Date(2024, 3, 8, 17, 30),
    dataCheckin: new Date(2024, 2, 24, 19, 0),
  },
  {
    nome: "Mariana Lima",
    email: "mariana.lima@example.com",
    dataInscricao: new Date(2024, 3, 18, 10, 15),
    dataCheckin: new Date(2024, 2, 30, 12, 45),
  },
  {
    nome: "Gustavo Rodrigues",
    email: "gustavo.rodrigues@example.com",
    dataInscricao: new Date(2024, 3, 12, 15, 40),
    dataCheckin: new Date(2024, 2, 26, 18, 20),
  },
  {
    nome: "Isabela Ferreira",
    email: "isabela.ferreira@example.com",
    dataInscricao: new Date(2024, 3, 22, 8, 50),
    dataCheckin: new Date(2024, 2, 31, 10, 10),
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@example.com",
    dataInscricao: new Date(2024, 3, 6, 13, 5),
    dataCheckin: new Date(2024, 2, 25, 15, 15),
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
    data-email= "${participante.email}"
    onclick = "fazerCheckIn(event)" >
    Confirmar check-in 
    </button>`;
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  // substituir informação do HTML
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email;
  });
  if (participanteExiste) {
    alert("Email já Cadastrado !");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.querySelector('[name="nome"]').value = "";
  event.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const mensagemConfirmaçao = "Tem certeza que deseja fazer o check-in?";
  if (confirm(mensagemConfirmaçao) == false) {
    return;
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
};
