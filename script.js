// Definição do campo minado
const campoMinado = [];
const totalQuadrados = 24;
const maximoMinas= 23;
var totalMinas= 1; // Ajuste o número de minas conforme necessário
let jogoPerdido = false; // Variável para controlar se o jogo foi perdido

// Referência ao elemento do campo minado
const campoMinadoElement = document.getElementById('campo-minado');

// Função para criar o campo minado
function criarCampoMinado() {
  // Resetar o campo minado
  campoMinado.length = 0;
  campoMinadoElement.innerHTML = '';

  // Preencher o campo com quadrados vazios
  for (let i = 0; i < totalQuadrados; i++) {
    campoMinado.push({ valor: 'vazio', revelado: false });
    const divQuadrado = document.createElement('div');
    divQuadrado.className = 'quadrado';
    divQuadrado.onclick = () => revelarQuadrado(i);
    campoMinadoElement.appendChild(divQuadrado);
  }

  // Colocar as minas em posições aleatórias
  const minasIndices = gerarPosicoesAleatorias(totalMinas, totalQuadrados);
  minasIndices.forEach(indice => {
    campoMinado[indice].valor = 'mina';
  });
}

// Função para revelar um quadrado
function revelarQuadrado(indice) {
  const quadrado = campoMinado[indice];
  const quadradoElement = campoMinadoElement.children[indice];

  if (quadrado.revelado || jogoPerdido) {
    console.log('Este quadrado já foi revelado ou o jogo foi perdido!');
    return;
  }

  quadrado.revelado = true;

  if (quadrado.valor === 'mina') {
    console.log('Você acertou uma mina! Game over!');
    quadradoElement.style.backgroundColor = 'red';
    jogoPerdido = true; // Define o jogo como perdido
    exibirBotaoReiniciar(); // Exibe o botão "Jogar Novamente"

    // Mostra todas as bombas
    campoMinado.forEach((quadrado, index) => {
      if (quadrado.valor === 'mina') {
        const quadradoElement = campoMinadoElement.children[index];
        quadradoElement.style.backgroundColor = 'red';
      }
    });

    return;
  }

  quadradoElement.style.backgroundColor = 'orange';

  const todosRevelados = campoMinado.every(quadrado => quadrado.revelado);
  if (todosRevelados) {
    console.log('Você achou todos os quadrados! Reinicie o jogo.');
    exibirBotaoReiniciar(); // Exibe o botão "Jogar Novamente"
  }
}

// Função para gerar posições aleatórias
function gerarPosicoesAleatorias(totalPosicoes, maximo) {
  const posicoes = [];

  while (posicoes.length < totalPosicoes) {
    const posicao = Math.floor(Math.random() * maximo);

    if (!posicoes.includes(posicao)) {
      posicoes.push(posicao);
    }
  }

  return posicoes;
}

// Função para aumentar a quantidade de bombas
function aumentarBombas() {
  if (jogoPerdido && totalMinas < maximoMinas) { // Verificar se ainda não atingiu o máximo
    totalMinas++;
    atualizarContadorBombas();
    criarCampoMinado();
  }
}

function diminuirBombas() {
  if (jogoPerdido && totalMinas > 1) {
    totalMinas--;
    atualizarContadorBombas();
    criarCampoMinado();
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  jogoPerdido = false; // Define o jogo como não perdido
  ocultarBotaoReiniciar(); // Oculta o botão "Jogar Novamente"
  criarCampoMinado();
}

// Função para exibir o botão "Jogar Novamente"
function exibirBotaoReiniciar() {
  const botaoReiniciar = document.getElementById('reiniciar');
  botaoReiniciar.style.display = 'block';
}

// Função para ocultar o botão "Jogar Novamente"
function ocultarBotaoReiniciar() {
  const botaoReiniciar = document.getElementById('reiniciar');
  botaoReiniciar.style.display = 'none';
}

const contadorBombasElement = document.getElementById('contador-bombas');

function atualizarContadorBombas() {
  contadorBombasElement.innerHTML = totalMinas;
}
window.addEventListener('load', atualizarContadorBombas);
// Chamada inicial para criar o campo minado
criarCampoMinado();