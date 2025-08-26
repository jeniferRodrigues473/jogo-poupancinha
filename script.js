const situacoes = [
    {
        texto: "Você quer comprar um sorvete bem gostoso 🍦.",
        opcoes: [
            "Guardar algumas moedas e planejar para comprar o sorvete e ainda economizar para outro brinquedo", // ótima
            "Comprar o sorvete agora e aproveitar o momento", // média
            "Gastar todas as moedas em doces de uma vez sem pensar" // errada
        ],
        resposta_correta: 0,
        mensagens: [
            "✅ Ótimo! Planejar ajuda você a aproveitar o sorvete e ainda guardar para outras coisas legais!",
            "🙂 Aproveitar agora é divertido, mas você pode ficar sem dinheiro para outras coisas.",
            "❌ Gastar tudo de uma vez não é bom! Você pode se arrepender depois e ficar sem moedas."
        ]
    },
    {
        texto: "Seu brinquedo favorito quebrou 😢.",
        opcoes: [
            "Ignorar e deixar quebrado", // errada
            "Tentar consertar sozinho e aprender como cuidar", // ótima
            "Pedir ajuda a um amigo ou adulto" // média
        ],
        resposta_correta: 1,
        mensagens: [
            "❌ Ignorar não resolve o problema e você não aprende nada.",
            "✅ Consertar sozinho ajuda você a aprender e cuidar das suas coisas!",
            "🙂 Pedir ajuda é bom, mas tentar sozinho ensina mais sobre responsabilidade."
        ]
    },
    {
        texto: "Você viu uma promoção de balas 🍬 e quer comprar.",
        opcoes: [
            "Comprar todas as balas agora", // errada
            "Guardar dinheiro para algo que realmente deseja", // ótima
            "Comprar só algumas balas e aproveitar sem gastar tudo" // média
        ],
        resposta_correta: 1,
        mensagens: [
            "❌ Comprar todas gasta rápido seu dinheiro e você pode se arrepender.",
            "✅ Guardar ajuda você a conquistar objetivos maiores e mais importantes!",
            "🙂 Comprar só algumas é um bom meio termo, mas ainda é melhor planejar."
        ]
    },
    {
        texto: "Você quer comprar um brinquedo novo 🧸.",
        opcoes: [
            "Guardar moedas e planejar para comprar depois", // ótima
            "Comprar agora sem pensar no futuro", // errada
            "Dar para um amigo para se sentir feliz compartilhando" // média
        ],
        resposta_correta: 0,
        mensagens: [
            "✅ Guardar moedas é ótimo para conseguir o que você quer e aprender a planejar!",
            "❌ Comprar agora pode ser divertido, mas você vai ficar sem moedas.",
            "🙂 Compartilhar é legal e ensina generosidade, mas você ainda não conquistou seu brinquedo."
        ]
    },
    {
        texto: "Você quer comprar um livro interessante 📚.",
        opcoes: [
            "Guardar moedas e planejar para comprar depois", // ótima
            "Pedir o livro agora sem pensar", // errada
            "Esperar sem decidir se realmente vale a pena" // média
        ],
        resposta_correta: 0,
        mensagens: [
            "✅ Planejar e guardar ajuda você a conseguir o livro e aprender sobre paciência!",
            "❌ Pedir agora pode fazer você gastar sem necessidade.",
            "🙂 Pensar antes é bom, mas a ação planejada ainda é melhor para alcançar seu objetivo."
        ]
    }
];

let moedas = 20;
let estrelas = 0;
let humor = "🙂";
let rodadaAtual = 0;
const totalRodadas = 5; // atualizado para incluir a nova situação
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

    situacao.opcoes.forEach((opcao, i) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;

        if (opcao.includes("Guardar")) btn.classList.add("btn-guardar");
        else if (opcao.includes("Comprar")) btn.classList.add("btn-comprar");
        else if (opcao.includes("Esperar")) btn.classList.add("btn-esperar");
        else if (opcao.includes("Dar") || opcao.includes("Pedir")) btn.classList.add("btn-parcial");
        else btn.classList.add("btn-parcial");

        btn.onclick = () => {
            mensagemDiv.textContent = situacao.mensagens[i];
            mensagemDiv.classList.add("aparecer");

            btn.classList.add(i === situacao.resposta_correta ? "certa" : "errada");

            if (i === situacao.resposta_correta) {
                moedas += 10;
                estrelas += 1;
                pularPorquinho();
                gerarMoeda();
                gerarEstrela();
            } else if (situacao.mensagens[i].startsWith("❌")) {
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

    if (moedas >= 30) resultadoDiv.innerHTML += "<p>🎉 Seu Poupancinha está super feliz! Você tomou ótimas decisões!</p>";
    else if (moedas >= 10) resultadoDiv.innerHTML += "<p>🙂 Seu Poupancinha está feliz! Continue tomando boas decisões!</p>";
    else resultadoDiv.innerHTML += "<p>😐 Seu Poupancinha ainda pode melhorar. Tente planejar melhor da próxima vez!</p>";
}

// Inicializa
atualizarStatus();
mostrarSituacao();
