const API_KEY = '3ba039ad6fcd65e3ff618207e0f979c0';
const CIDADE = 'Montreal';

async function buscarClima() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CIDADE}&appid=${API_KEY}&units=metric&lang=en`;
        const resposta = await fetch(url);

        if (!resposta.ok) throw new Error('Cidade não encontrada ou chave inválida');

        const dados = await resposta.json();

        const nome = dados.name;
        const temp = Math.round(dados.main.temp);
        const tempMax = Math.round(dados.main.temp_max);
        const tempMin = Math.round(dados.main.temp_min);
        const descricao = dados.weather[0].description;
        const descFormatada = descricao.charAt(0).toUpperCase() + descricao.slice(1);

        document.querySelector('.titulo').textContent = nome;
        document.querySelector('.temperatura').textContent = `${temp}°`;
        document.querySelector('.weather-desc').textContent = descFormatada;

        const subTextos = document.querySelectorAll('.weather-sub p');
        subTextos[0].textContent = `H:${tempMax}°`;
        subTextos[1].textContent = `L:${tempMin}°`;

    } catch (erro) {
        console.error('Erro ao buscar clima:', erro);
    }
}

buscarClima();