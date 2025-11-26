function inicializarOuvintesEventos() {
    document.getElementById('entradaToken').addEventListener('input', function(evento) {
        const novoValor = evento.target.value;

        if (novoValor.includes(' ')) {
            evento.target.value = novoValor.replace(/\s/g, '');
            valorAnterior = evento.target.value;
            return;
        }

        if (novoValor.length < valorAnterior.length) {
            const diferenca = valorAnterior.length - novoValor.length;
            for (let i = 0; i < diferenca; i++) {
                removerUltimoSimbolo();
            }
        } else if (novoValor.length > valorAnterior.length) {
            const novosCaracteres = novoValor.slice(valorAnterior.length);
            for (let caractere of novosCaracteres) {
                processarSimbolo(caractere);
            }
        }

        valorAnterior = novoValor;
    });

    document.getElementById('entradaToken').addEventListener('keydown', function(evento) {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            if (!document.getElementById('botaoAdicionarToken').disabled) {
                adicionarToken();
            }
        }
    });

    document.getElementById('entradaBusca').addEventListener('input', function(evento) {
        const valorBusca = evento.target.value.replace(/\s/g, '');
        evento.target.value = valorBusca;

        if (valorBusca.length > valorBuscaAnterior.length) {
            destacarCaminhoBusca(valorBusca);
        } else if (valorBusca.length < valorBuscaAnterior.length) {
            destacarCaminhoBusca(valorBusca);
        }

        valorBuscaAnterior = valorBusca;
    });

    document.getElementById('entradaBusca').addEventListener('keydown', function(evento) {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            const valorBusca = evento.target.value;
            finalizarBusca(valorBusca);
        }
    });
}
