function limparMarcadoresBusca() {
    document.querySelectorAll('.state-marker.search-valid, .state-marker.search-invalid').forEach(marcador => {
        marcador.remove();
    });
    document.querySelectorAll('.cell.search-highlight, .cell.search-highlight-invalid').forEach(celula => {
        celula.classList.remove('search-highlight', 'search-highlight-invalid');
    });
}

function destacarCaminhoBusca(token) {
    limparMarcadoresBusca();

    if (token === '') return;

    const apenasMinusculas = /^[a-z]+$/.test(token);
    let caminhoExiste = true;

    for (let i = 0; i < token.length; i++) {
        const caractere = token[i];
        const estado = i;
        const caractereValido = ehCaractereValido(caractere);

        const linha = document.getElementById(`linha-estado-${estado}`);
        if (!linha) {
            caminhoExiste = false;
            const statusBusca = document.getElementById('statusBusca');
            statusBusca.style.display = 'block';
            statusBusca.className = 'status rejected';
            statusBusca.textContent = `q${estado} não existe - Token não foi adicionado ao autômato`;
            return;
        }

        if (!caractereValido) {
            const statusBusca = document.getElementById('statusBusca');
            statusBusca.style.display = 'block';
            statusBusca.className = 'status rejected';
            statusBusca.textContent = `"${caractere}" inválido - Apenas letras minúsculas são aceitas`;
            return;
        }

        const indiceLetra = alfabeto.indexOf(caractere);
        const celulas = linha.querySelector('.cells-container').children;
        const celula = celulas[indiceLetra];

        const temMarcadorPermanente = Array.from(celula.querySelectorAll('.state-marker'))
            .some(marcador => !marcador.classList.contains('temporary') && 
                          !marcador.classList.contains('search-valid') && 
                          !marcador.classList.contains('search-invalid'));

        if (!temMarcadorPermanente) {
            caminhoExiste = false;
            const marcador = document.createElement('div');
            marcador.className = 'state-marker search-invalid';
            marcador.textContent = `q${estado}`;
            celula.appendChild(marcador);
            celula.classList.add('search-highlight-invalid');

            const statusBusca = document.getElementById('statusBusca');
            statusBusca.style.display = 'block';
            statusBusca.className = 'status rejected';
            statusBusca.textContent = `"${caractere}" no estado q${estado} não existe - Token não foi adicionado`;
            return;
        }

        const marcador = document.createElement('div');
        marcador.className = `state-marker ${caminhoExiste && apenasMinusculas ? 'search-valid' : 'search-invalid'}`;
        marcador.textContent = `q${estado}`;
        celula.appendChild(marcador);

        if (caminhoExiste && apenasMinusculas) {
            celula.classList.add('search-highlight');
        } else {
            celula.classList.add('search-highlight-invalid');
        }
    }

    const statusBusca = document.getElementById('statusBusca');
    statusBusca.style.display = 'block';
    
    if (caminhoExiste && apenasMinusculas) {
        statusBusca.className = 'status accepted';
        statusBusca.textContent = `"${token}" - Caminho válido`;
    } else if (!apenasMinusculas) {
        statusBusca.className = 'status rejected';
        statusBusca.textContent = `"${token}" contém caracteres inválidos`;
    }
}

function finalizarBusca(token) {
    if (token === '') {
        limparMarcadoresBusca();
        document.getElementById('statusBusca').style.display = 'none';
        return;
    }

    const apenasMinusculas = /^[a-z]+$/.test(token);
    let caminhoExiste = true;

    for (let i = 0; i < token.length; i++) {
        const caractere = token[i];
        const estado = i;

        if (!ehCaractereValido(caractere)) {
            caminhoExiste = false;
            break;
        }

        const linha = document.getElementById(`linha-estado-${estado}`);
        if (!linha) {
            caminhoExiste = false;
            break;
        }

        const indiceLetra = alfabeto.indexOf(caractere);
        const celulas = linha.querySelector('.cells-container').children;
        const celula = celulas[indiceLetra];

        const temMarcadorPermanente = Array.from(celula.querySelectorAll('.state-marker'))
            .some(marcador => !marcador.classList.contains('temporary') && 
                          !marcador.classList.contains('search-valid') && 
                          !marcador.classList.contains('search-invalid'));

        if (!temMarcadorPermanente) {
            caminhoExiste = false;
            break;
        }
    }

    const ehValido = token.length > 0 && apenasMinusculas && caminhoExiste;

    const statusBusca = document.getElementById('statusBusca');
    statusBusca.style.display = 'block';
    
    if (ehValido) {
        statusBusca.className = 'status accepted';
        statusBusca.textContent = `"${token}" foi encontrado e aceito pelo autômato (Estado final: q${token.length})`;
    } else if (!apenasMinusculas) {
        statusBusca.className = 'status rejected';
        statusBusca.textContent = `"${token}" Não é aceito - Apenas letras minúsculas são válidas`;
    } else if (!caminhoExiste) {
        statusBusca.className = 'status rejected';
        statusBusca.textContent = `"${token}" Não foi encontrado - Este token não foi adicionado ao autômato`;
    }
}
