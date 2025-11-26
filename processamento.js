function processarSimbolo(simbolo) {
    const estadoAtual = dadosTokenAtual.caminho.length;
    
    dadosTokenAtual.token += simbolo;
    
    const ehValido = ehCaractereValido(simbolo);
    dadosTokenAtual.caminho.push({ 
        letra: simbolo, 
        estado: estadoAtual,
        valido: ehValido 
    });

    atualizarPainelInformacoes();

    const proximoEstado = estadoAtual + 1;
    if (!document.getElementById(`linha-estado-${proximoEstado}`)) {
        criarLinhaEstado(proximoEstado);
    }

    redesenharMarcadoresTemporarios();
    atualizarStatusValidacao();
}

function removerUltimoSimbolo() {
    if (dadosTokenAtual.caminho.length === 0) return;

    dadosTokenAtual.caminho.pop();
    dadosTokenAtual.token = dadosTokenAtual.token.slice(0, -1);

    atualizarPainelInformacoes();
    redesenharMarcadoresTemporarios();
    atualizarStatusValidacao();
}
