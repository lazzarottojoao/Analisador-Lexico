function adicionarToken() {
    if (dadosTokenAtual.token === '') return;

    const apenasMinusculas = /^[a-z]+$/.test(dadosTokenAtual.token);
    const ehAceito = dadosTokenAtual.token.length > 0 && apenasMinusculas;

    if (!ehAceito) {
        return;
    }

    limparMarcadoresTemporarios();
    adicionarMarcadoresPermanentes();

    const estadoMaximoCaminho = Math.max(...dadosTokenAtual.caminho.map(c => c.estado));
    if (estadoMaximoCaminho > estadoMaximoUsado) {
        estadoMaximoUsado = estadoMaximoCaminho;
    }

    todosCaminhos.push({
        token: dadosTokenAtual.token,
        caminho: [...dadosTokenAtual.caminho],
        aceito: ehAceito
    });

    tokens.push({
        token: dadosTokenAtual.token,
        aceito: ehAceito
    });

    const divStatus = document.getElementById('status');
    divStatus.style.display = 'block';
    divStatus.className = 'status accepted';
    const estadoFinal = dadosTokenAtual.caminho.length;
    divStatus.textContent = `Token "${dadosTokenAtual.token}" adicionado (Estado Final: q${estadoFinal})`;

    const proximoEstado = estadoMaximoUsado + 1;
    if (!document.getElementById(`linha-estado-${proximoEstado}`)) {
        criarLinhaEstado(proximoEstado);
    }

    atualizarListaTokens();
    resetarEntradaToken();

    setTimeout(() => {
        divStatus.style.display = 'none';
    }, 3000);
}

function resetarEntradaToken() {
    dadosTokenAtual = { token: '', caminho: [] };
    document.getElementById('entradaToken').value = '';
    document.getElementById('tokenAtual').textContent = '-';
    document.getElementById('estadoAtual').textContent = 'q0';
    document.getElementById('contagemSimbolos').textContent = '0';
    document.getElementById('botaoAdicionarToken').disabled = true;
    valorAnterior = '';
}

function atualizarListaTokens() {
    const lista = document.getElementById('listaTokens');
    lista.innerHTML = '';

    if (tokens.length === 0) {
        lista.innerHTML = '<p style="color: #999; text-align: center;">Nenhum token adicionado ainda</p>';
        return;
    }

    tokens.forEach((t, indice) => {
        const item = document.createElement('div');
        item.className = `token-item ${t.aceito ? 'accepted' : 'rejected'}`;
        
        const infoCaminho = todosCaminhos[indice];
        const textoCaminho = infoCaminho.caminho
            .filter(c => c.valido)
            .map(c => `${c.letra}(q${c.estado})`)
            .join(' → ');
        
        item.innerHTML = `
            <span><strong>Token ${indice + 1}:</strong> "${t.token}" | Caminho: ${textoCaminho}</span>
        `;
        lista.appendChild(item);
    });
}
