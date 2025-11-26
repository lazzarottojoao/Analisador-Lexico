function limparMarcadoresTemporarios() {
    document.querySelectorAll('.state-marker.temporary').forEach(marcador => {
        marcador.remove();
    });
    document.querySelectorAll('.cell.current').forEach(celula => {
        celula.classList.remove('current');
    });
}

function redesenharMarcadoresTemporarios() {
    limparMarcadoresTemporarios();
    
    dadosTokenAtual.caminho.forEach((c, indice) => {
        if (c.valido) {
            const linha = document.getElementById(`linha-estado-${c.estado}`);
            if (!linha) {
                criarLinhaEstado(c.estado);
                return redesenharMarcadoresTemporarios();
            }
            
            const indiceLetra = alfabeto.indexOf(c.letra);
            if (indiceLetra === -1) return;
            
            const celulas = linha.querySelector('.cells-container').children;
            const celula = celulas[indiceLetra];
            
            const marcador = document.createElement('div');
            marcador.className = 'state-marker temporary';
            marcador.textContent = `q${c.estado}`;
            celula.appendChild(marcador);
            
            if (indice === dadosTokenAtual.caminho.length - 1) {
                celula.classList.add('current');
            }
        }
    });
}

function adicionarMarcadoresPermanentes() {
    dadosTokenAtual.caminho.forEach(c => {
        if (c.valido) {
            const linha = document.getElementById(`linha-estado-${c.estado}`);
            const indiceLetra = alfabeto.indexOf(c.letra);
            const celulas = linha.querySelector('.cells-container').children;
            const celula = celulas[indiceLetra];
            
            const marcador = document.createElement('div');
            marcador.className = 'state-marker';
            marcador.textContent = `q${c.estado}`;
            celula.appendChild(marcador);
        }
    });
}
