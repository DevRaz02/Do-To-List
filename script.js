const input = document.querySelector(".input-task");
const button = document.querySelector(".btn-add-task");
const ListaComplete = document.querySelector(".task-list");

let listaItens = [];

function addTask() {
  if (input.value.trim() === "") {
    alert("Digite uma tarefa");
    return;
  }

  listaItens.push({
    task: input.value,
    concluida: false,
  });

  input.value = "";

  mostraTask();
}

function mostraTask() {
  let novaLista = "";

  listaItens.forEach((item, posicao) => {
    novaLista =
      novaLista +
      `
    
    <li class="task-item ${item.concluida && "done"}"> 
      <img src="accept.png" alt="Img-check" onclick = " concluirTask(${posicao})"/>
      <p>${item.task}</p>
      <img src="delete.png" alt="Img-delete" onclick="deletarTask(${posicao})" />

    </li>
    
    `;
  });

  ListaComplete.innerHTML = novaLista;

  localStorage.setItem("lista", JSON.stringify(listaItens));
}

function concluirTask(posicao) {
  listaItens[posicao].concluida = !listaItens[posicao].concluida;

  mostraTask();
}

function carregarTask() {
  const listaSalva = localStorage.getItem("lista");

  if (listaSalva) {
    listaItens = JSON.parse(listaSalva);
  }

  mostraTask();
}

function deletarTask(posicao) {
  listaItens.splice(posicao, 1);

  mostraTask();
}
carregarTask();
button.addEventListener("click", addTask);
