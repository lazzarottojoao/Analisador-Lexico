function inicializarAlfabeto() {
    const exibicao = document.getElementById('exibicaoAutomato');
    const linhaAlfabeto = document.createElement('div');
    linhaAlfabeto.className = 'alphabet-row';
    linhaAlfabeto.id = 'cabecalho-alfabeto';
    
    alfabeto.forEach(letra => {
        const cabecalho = document.createElement('div');
        cabecalho.className = 'letter-header';
        cabecalho.textContent = letra;
        linhaAlfabeto.appendChild(cabecalho);
    });
    
    exibicao.innerHTML = '';
    exibicao.appendChild(linhaAlfabeto);
    
    criarLinhaEstado(0);
}

function criarLinhaEstado(estado) {
    const exibicao = document.getElementById('exibicaoAutomato');
    
    if (document.getElementById(`linha-estado-${estado}`)) return;
    
    const linhaEstado = document.createElement('div');
    linhaEstado.className = 'state-row new-row';
    linhaEstado.id = `linha-estado-${estado}`;
    
    const rotuloEstado = document.createElement('div');
    rotuloEstado.className = 'state-label';
    rotuloEstado.textContent = `q${estado}`;
    linhaEstado.appendChild(rotuloEstado);
    
    const containerCelulas = document.createElement('div');
    containerCelulas.className = 'cells-container';
    
    alfabeto.forEach((letra, indice) => {
        const celula = document.createElement('div');
        celula.className = 'cell';
        celula.dataset.letter = letra;
        celula.dataset.state = estado;
        containerCelulas.appendChild(celula);
    });
    
    linhaEstado.appendChild(containerCelulas);
    exibicao.appendChild(linhaEstado);
}
