const situacoes = [
    {
        texto: "Você quer comprar um sorvete 🍦.",
        opcoes: [
            { texto: "Guardar moedas para comprar depois", tipo: "certa", mensagem: "✅ Ótimo! Guardar moedas ajuda você a alcançar seus objetivos e aprender a planejar." },
            { texto: "Comprar o sorvete agora", tipo: "medio", mensagem: "⚠ Comer agora é divertido, mas se planejar você poderá comprar algo ainda maior depois." },
            { texto: "Pensar antes de comprar", tipo: "medio", mensagem: "✅ Pensar antes é uma boa ideia! Pensar antes ajuda a tomar decisões melhores." }
        ]
    },
    {
        texto: "Seu brinquedo favorito quebrou 😢.",
        opcoes: [
            { texto: "Ignorar e deixar quebrado", tipo: "errada", mensagem: "⚠ Ignorar não resolve, mas você pode aprender tentando consertar ou pedir ajuda." },
            { texto: "Tentar consertar sozinho", tipo: "certa", mensagem: "✅ Consertar sozinho ajuda a aprender habilidades novas e cuidar das suas coisas!" },
            { texto: "Pedir ajuda a alguém", tipo: "medio", mensagem: "✅ Pedir ajuda é ótimo! Trabalhar junto ensina colaboração e paciência." }
        ]
    },
    {
        texto: "Você viu uma promoção de balas 🍬 e quer comprar.",
        opcoes: [
            { texto: "Comprar todas as balas agora", tipo: "errada", mensagem: "⚠ Comprar tudo gasta seu dinheiro rápido, mas você pode aprender a planejar melhor para próximas compras." },
            { texto: "Guardar dinheiro para algo que realmente quer", tipo: "certa", mensagem: "✅ Guardar moedas ajuda você a comprar coisas mais importantes e ensina planejamento!" },
            { texto: "Comprar só algumas balas", tipo: "medio", mensagem: "✅ Comprar algumas balas é equilibrado! Ensina moderação e controle do dinheiro." }
        ]
    },
    {
        texto: "Você quer ganhar uma estrelinha ⭐.",
        opcoes: [
            { texto: "Guardar moedas para comprar depois", tipo: "certa", mensagem: "✅ Guardar moedas ajuda a alcançar seu objetivo com paciência e disciplina!" },
            { texto: "Pedir agora", tipo: "medio", mensagem: "⚠ Pedir agora pode funcionar, mas planejar e esperar ensina paciência e planejamento." },
            { texto: "Esperar um pouco", tipo: "medio", mensagem: "✅ Esperar é bom! Aprender a esperar ajuda a desenvolver autocontrole." }
        ]
    },
    {
        texto: "Você quer comprar um brinquedo novo 🧸.",
        opcoes: [
            { texto: "Guardar moedas no cofrinho", tipo: "certa", mensagem: "✅ Guardar moedas é uma ótima escolha! Ensina planejamento e paciência." },
            { texto: "Comprar agora", tipo: "medio", mensagem: "⚠ Comprar agora pode ser divertido, mas guardar permite alcançar objetivos maiores." },
            { texto: "Dar para um amigo", tipo: "medio", mensagem: "✅ Dar para um amigo é gentil! Ensina generosidade e compartilhamento." }
        ]
    }
];

let moedas = 20;
let estrelas = 0;
let humor = "🙂";
let rodadaAtual = 0;
const totalRodadas = situacoes.length;
let indicesDisponiveis = [...Array(situacoes.length).keys()];

const situacaoTexto = document.getElementById("situacao-texto");
const opcoesDiv = document.getElementById("opcoes");
const proximaBtn = document.getElementById("proxima");
const humorP = document.getElementById("humor");
const moedasP = document.getElementById("moedas");
const estrelasP = document.getElementById("estrelas");
const resultadoDiv = document.getElementById("resultado");
const mensagemDiv = document.getElementById("mensagem-feedback");
const porquinho = document.getElementById("porquinho");
const container = document.querySelector(".container");

// Sons
const somMoeda = new Audio("https://www.soundjay.com/misc/sounds/coin-1.mp3");
const somEstrela = new Audio("https://www.soundjay.com/button/sounds/button-3.mp3");

function animarPorquinho(tipo) {
    if(tipo === 'feliz') porquinho.textContent = "😄";
    else if(tipo === 'medio') porquinho.textContent = "🙂";
    else porquinho.textContent = "😢";

    porquinho.style.animation = "pular 0.7s";
    setTimeout(() => porquinho.style.animation = "", 700);
}

function gerarMoeda() {
    const moeda = document.createElement("div");
    moeda.classList.add("moeda");
    moeda.textContent = "🪙";
    moeda.style.left = Math.random() * 70 + "%";
    moeda.style.top = "0px";
    moeda.style.animationDuration = (0.8 + Math.random() * 0.5) + "s";
    container.appendChild(moeda);
    somMoeda.play();
    setTimeout(() => moeda.remove(), 1500);
}

function gerarEstrela() {
    const estrela = document.createElement("div");
    estrela.classList.add("estrela");
    estrela.textContent = "⭐";
    estrela.style.left = Math.random() * 70 + "%";
    estrela.style.top = "0px";
    estrela.style.animationDuration = (0.8 + Math.random() * 0.5) + "s";
    container.appendChild(estrela);
    somEstrela.play();
    setTimeout(() => estrela.remove(), 1500);
}

function atualizarStatus() {
    humorP.textContent = "Humor: " + humor;
    moedasP.textContent = "Moedas: " + moedas;
    estrelasP.textContent = "Estrelas: " + estrelas;

    if (moedas < 10) humorP.style.color = "#d6336c";
    else if (moedas < 30) humorP.style.color = "#ff69b4";
    else humorP.style.color = "#ff1493";

    [humorP, moedasP, estrelasP].forEach(el => {
        el.classList.add("bounce");
        setTimeout(() => el.classList.remove("bounce"), 500);
    });
}

function mostrarSituacao() {
    if (rodadaAtual >= totalRodadas || indicesDisponiveis.length === 0) {
        fimDoJogo();
        return;
    }

    const idx = indicesDisponiveis.splice(Math.floor(Math.random() * indicesDisponiveis.length), 1)[0];
    const situacao = situacoes[idx];
    situacaoTexto.textContent = situacao.texto;

    opcoesDiv.innerHTML = "";
    mensagemDiv.textContent = "";
    mensagemDiv.classList.remove("aparecer");

    situacao.opcoes.forEach((opcao, i) => {
        const btn = document.createElement("button");
        btn.textContent = opcao.texto;

        if (opcao.texto.includes("Guardar")) btn.classList.add("btn-guardar");
        else if (opcao.texto.includes("Comprar")) btn.classList.add("btn-comprar");
        else btn.classList.add("btn-parcial");

        btn.onclick = () => {
            mensagemDiv.textContent = opcao.mensagem;
            mensagemDiv.classList.add("aparecer");

            switch(opcao.tipo){
                case "certa":
                    btn.classList.add("certa");
                    moedas += 10;
                    estrelas += 1;
                    animarPorquinho('feliz');
                    gerarMoeda();
                    gerarEstrela();
                    humor = "😄 Muito feliz!";
                    break;
                case "medio":
                    btn.classList.add("certa");
                    moedas += 5;
                    estrelas += 0.5;
                    animarPorquinho('medio');
                    gerarMoeda();
                    gerarEstrela();
                    humor = "🙂 Bom trabalho!";
                    break;
                case "errada":
                    btn.classList.add("errada");
                    moedas -= 5;
                    if(moedas < 0) moedas = 0;
                    animarPorquinho('triste');
                    humor = "😐 Pense na próxima vez!";
                    break;
            }

            atualizarStatus();
            rodadaAtual++;
            proximaBtn.style.display = "block";
            proximaBtn.classList.add("aparecer");

            Array.from(opcoesDiv.children).forEach(b => b.disabled = true);
        };

        opcoesDiv.appendChild(btn);
    });
}

proximaBtn.onclick = () => {
    proximaBtn.style.display = "none";
    mostrarSituacao();
};

function fimDoJogo() {
    situacaoTexto.style.display = "none";
    opcoesDiv.style.display = "none";
    proximaBtn.style.display = "none";
    mensagemDiv.style.display = "none";

    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `<h2>Fim do jogo!</h2>
        <p>Moedas finais: ${moedas}</p>
        <p>Estrelas conquistadas: ${estrelas}/${totalRodadas}</p>`;

    if (moedas >= 30) resultadoDiv.innerHTML += "<p>🎉 Seu Poupancinha está super feliz! Você tomou ótimas decisões!</p>";
    else if (moedas >= 10) resultadoDiv.innerHTML += "<p>🙂 Seu Poupancinha está feliz! Continue tomando boas decisões!</p>";
    else resultadoDiv.innerHTML += "<p>😐 Seu Poupancinha ainda pode melhorar. Tente planejar melhor da próxima vez!</p>";
}

// Inicializa
atualizarStatus();
mostrarSituacao();
