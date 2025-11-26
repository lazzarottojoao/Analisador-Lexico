function inicializarAplicacao() {
    inicializarAlfabeto();
    atualizarListaTokens();
    inicializarOuvintesEventos();
    document.getElementById('botaoAdicionarToken').disabled = true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAplicacao);
} else {
    inicializarAplicacao();
}
