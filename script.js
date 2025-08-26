const situacoes = [
    {
        texto: "Você quer comprar um sorvete 🍦.",
        opcoes: [
            "Guardar moedas no cofrinho para comprar depois",
            "Comprar só um sorvete pequeno agora",
            "Gastar todas as moedas de uma vez"
        ],
        tipos: ["certa", "medio", "errada"],
        mensagens: [
            "✅ Muito bem! Assim você consegue o sorvete e ainda pode juntar para algo maior.",
            "⚠ Está ok! Você se diverte, mas ainda poderia economizar mais.",
            "❌ Não é legal gastar tudo sem pensar. Planejar ajuda você a ter mais escolhas!"
        ]
    },
    {
        texto: "Você quer comprar um brinquedo novo 🧸.",
        opcoes: [
            "Guardar moedas no cofrinho",
            "Comprar um brinquedo barato agora",
            "Gastar todas as moedas em qualquer brinquedo sem pensar"
        ],
        tipos: ["certa", "medio", "errada"],
        mensagens: [
            "✅ Excelente! Economizar ajuda a conseguir o brinquedo que você realmente quer.",
            "⚠ Está melhorando! Você se diverte, mas ainda pode guardar para algo maior.",
            "❌ Não é legal gastar todo o dinheiro sem planejar!"
        ]
    },
    {
        texto: "Você viu uma promoção de balas 🍬.",
        opcoes: [
            "Guardar dinheiro para algo que realmente quer",
            "Comprar só algumas balas",
            "Comprar todas as balas de uma vez"
        ],
        tipos: ["certa", "medio", "errada"],
        mensagens: [
            "✅ Muito bem! Assim você aprende a escolher o que vale mais a pena.",
            "⚠ Está equilibrado! Você se diverte e ainda guarda um pouco.",
            "❌ Não é legal gastar tudo de uma vez. Planejar é melhor!"
        ]
    },
    {
        texto: "Você recebeu sua mesada 💰.",
        opcoes: [
            "Separar a mesada em cofrinho, diversão e presente",
            "Guardar só uma parte e gastar o resto sem pensar",
            "Gastar toda a mesada assim que recebe"
        ],
        tipos: ["certa", "medio", "errada"],
        mensagens: [
            "✅ Perfeito! Dividir ajuda a controlar o dinheiro e aprender prioridades.",
            "⚠ Está começando a se organizar, mas ainda pode melhorar no planejamento.",
            "❌ Não é legal gastar tudo de uma vez. Planejar ajuda você a ter mais escolhas!"
        ]
    },
    {
        texto: "Você quer comprar um presente para um amigo 🎁.",
        opcoes: [
            "Guardar parte do dinheiro para você e comprar um presente",
            "Dar quase todo o dinheiro de presente",
            "Não comprar nada nem guardar"
        ],
        tipos: ["certa", "medio", "errada"],
        mensagens: [
            "✅ Ótimo! Você aprende a equilibrar diversão e economia.",
            "⚠ É legal presentear, mas também é importante guardar para seus objetivos.",
            "❌ Não é legal desperdiçar ou deixar de planejar. Economizar é melhor!"
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

function pularPorquinho() {
    porquinho.style.animation = "pular 0.5s";
    setTimeout(() => porquinho.style.animation = "", 500);
}

function gerarMoeda() {
    const moeda = document.createElement("div");
    moeda.classList.add("moeda");
    moeda.textContent = "🪙";
    moeda.style.left = Math.random() * 80 + "%";
    document.body.appendChild(moeda);
    setTimeout(() => moeda.remove(), 1000);
}

function gerarEstrela() {
    const estrela = document.createElement("div");
    estrela.classList.add("estrela");
    estrela.textContent = "⭐";
    estrela.style.left = Math.random() * 80 + "%";
    estrela.style.top = Math.random() * 50 + "%";
    document.body.appendChild(estrela);
    setTimeout(() => estrela.remove(), 1000);
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

    // Criar array com todas as opções e embaralhar
    let opcoesCompletas = situacao.opcoes.map((opcao, i) => ({
        texto: opcao,
        tipo: situacao.tipos[i],
        mensagem: situacao.mensagens[i]
    }));
    opcoesCompletas.sort(() => Math.random() - 0.5); // embaralhar opções

    opcoesCompletas.forEach((opcaoObj) => {
        const btn = document.createElement("button");
        btn.textContent = opcaoObj.texto;
        btn.classList.add("opcao-rosa"); // cor inicial

        btn.onclick = () => {
            mensagemDiv.textContent = opcaoObj.mensagem;
            mensagemDiv.classList.add("aparecer");

            btn.classList.remove("opcao-rosa");
            btn.classList.add(opcaoObj.tipo);

            if (opcaoObj.tipo === "certa") {
                moedas += 10;
                estrelas += 1;
                pularPorquinho();
                gerarMoeda();
                gerarEstrela();
            } else if (opcaoObj.tipo === "medio") {
                moedas += 5;
                pularPorquinho();
                gerarMoeda();
            } else {
                moedas -= 5;
                if (moedas < 0) moedas = 0;
            }

            if (moedas < 10) humor = "😐 Pense na próxima vez!";
            else if (moedas < 30) humor = "🙂 Bom trabalho!";
            else humor = "😄 Muito feliz!";

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

    if (moedas >= 40) resultadoDiv.innerHTML += "<p>🎉 Seu Poupancinha está super feliz! Você tomou ótimas decisões!</p>";
    else if (moedas >= 20) resultadoDiv.innerHTML += "<p>🙂 Seu Poupancinha está feliz! Continue tomando boas decisões!</p>";
    else resultadoDiv.innerHTML += "<p>😐 Seu Poupancinha ainda pode melhorar. Tente planejar melhor da próxima vez!</p>";
}

// Inicializa
atualizarStatus();
mostrarSituacao();
