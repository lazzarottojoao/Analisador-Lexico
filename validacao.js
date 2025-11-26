function ehCaractereValido(caractere) {
    return /^[a-z]$/.test(caractere);
}

function atualizarStatusValidacao() {
    const apenasMinusculas = /^[a-z]+$/.test(dadosTokenAtual.token);
    const ehAceito = dadosTokenAtual.token.length > 0 && apenasMinusculas;

    const divStatus = document.getElementById('status');
    const botaoAdicionar = document.getElementById('botaoAdicionarToken');

    if (dadosTokenAtual.token === '') {
        divStatus.style.display = 'none';
        botaoAdicionar.disabled = true;
        return;
    }

    botaoAdicionar.disabled = !ehAceito;
    divStatus.style.display = 'block';
    
    if (ehAceito) {
        divStatus.className = 'status accepted';
        divStatus.textContent = `Token "${dadosTokenAtual.token}" é válido`;
    } else {
        divStatus.className = 'status rejected';
        divStatus.textContent = `Token "${dadosTokenAtual.token}" é inválido`;
    }
}

function atualizarPainelInformacoes() {
    document.getElementById('tokenAtual').textContent = dadosTokenAtual.token || '-';
    document.getElementById('estadoAtual').textContent = `q${dadosTokenAtual.caminho.length}`;
    document.getElementById('contagemSimbolos').textContent = dadosTokenAtual.caminho.length;
}
