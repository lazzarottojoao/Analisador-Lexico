const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');
let tokens = [];
let dadosTokenAtual = { token: '', caminho: [] };
let todosCaminhos = [];
let estadoMaximoUsado = -1;
let valorAnterior = '';
let valorBuscaAnterior = '';
