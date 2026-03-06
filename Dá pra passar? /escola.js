const input = require('readline-sync');


let dadosEscolares = {
    disciplina: "",
    notas: [],
    mediaAnual: 0,
    status: ""
};


function lerNotaValida(mensagem) {
    while (true) {
        let nota = input.questionFloat(mensagem);
        if (nota >= 0 && nota <= 10) {
            return nota;
        }
        console.log("Erro: A nota deve ser entre 0 e 10.");
    }
}


function lancarNotas() {
    dadosEscolares.disciplina = input.question("Nome da disciplina: ");
    dadosEscolares.notas = []; // Limpa notas anteriores

    for (let i = 1; i <= 4; i++) {
        let nota = lerNotaValida(`Digite a nota do ${i}o bimestre: `);
        dadosEscolares.notas.push(nota);
    }
    console.log("\nNotas lançadas com sucesso!");
}


function calcularAprovacao() {
    if (dadosEscolares.notas.length === 0) {
        console.log("Erro: Lance as notas primeiro (Opção 1).");
        return;
    }

    const soma = dadosEscolares.notas.reduce((acc, nota) => acc + nota, 0);
    const media = soma / 4;
    const nota4Bimestre = dadosEscolares.notas[3];

    dadosEscolares.mediaAnual = media;

    
    if (nota4Bimestre < 4.0) {
        dadosEscolares.status = "VS (Vínculo Suplementar/Prova Final)";
    } else if (media >= 7.0) {
        dadosEscolares.status = "Aprovado";
    } else {
        dadosEscolares.status = "Recuperação";
    }

    console.log("Calculado.");
}


function exibirResultado() {
    if (!dadosEscolares.status) {
        console.log("Erro: Calcule a aprovação primeiro (Opção 2).");
        return;
    }

    console.log("\n--- RESULTADO FINAL ---");
    console.log(`Disciplina: ${dadosEscolares.disciplina}`);
    console.log(`Média Anual: ${dadosEscolares.mediaAnual.toFixed(2)}`);
    console.log(`Status: ${dadosEscolares.status}`);
    console.log("-----------------------\n");
}


function menu() {
    let sair = false;

    while (!sair) {
        console.log("\n--- SISTEMA ESCOLAR ---");
        console.log("1) Lançar notas");
        console.log("2) Calcular aprovação");
        console.log("3) Exibir resultado");
        console.log("4) Sair");
        
        const opcao = input.question("Escolha uma opcao: ");

        switch (opcao) {
            case '1':
                lancarNotas();
                break;
            case '2':
                calcularAprovacao();
                break;
            case '3':
                exibirResultado();
                break;
            case '4':
                console.log("Saindo do programa...");
                sair = true;
                break;
            default:
                console.log("Opção inválida!");
                break;
        }
    }
}


menu();
