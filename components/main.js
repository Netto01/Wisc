//======================================================================//
// PLATAFORMA WECHSLER - SISTEMA COMPLETO
// Arquivo: main.js
// Versão: 4.1 - com Múltiplos Gráficos de Análise
//======================================================================//

// --- Variáveis Globais da Interface ---
let mainContent;
let homeLink, meusAvaliadosLink, corrigirTestesLink;
let modal;
let darkModeToggle;

// --- Dicionários para Nomes Completos ---
const subtestFullNames = {
    'sm': 'Semelhanças', 'vc': 'Vocabulário', 'co': 'Compreensão', 'in': 'Informação', 'rp': 'Raciocínio com Palavras',
    'cb': 'Cubos', 'cn': 'Conceitos Figurativos', 'rm': 'Raciocínio Matricial', 'cf': 'Completar Figuras',
    'dg': 'Dígitos', 'snl': 'Sequência de Números e Letras', 'ar': 'Aritmética',
    'cd': 'Código', 'ps': 'Procurar Símbolos', 'ca': 'Cancelamento'
};
const indexFullNames = {
    'icv': 'Índice de Compreensão Verbal',
    'iop': 'Índice de Organização Perceptual',
    'imo': 'Índice de Memória Operacional',
    'ivp': 'Índice de Velocidade de Processamento',
    'qit': 'Quociente de Inteligência Total'
};

//======================================================================//
//   1. SISTEMA DE PERSISTÊNCIA DE DADOS (BACKUP E EXPORTAÇÃO)
//======================================================================//

/**
 * Exporta todos os testes salvos para um arquivo JSON.
 */
function exportAllTests() {
    try {
        const tests = getSavedTests();
        if (tests.length === 0) {
            alert('Não há testes para exportar.');
            return;
        }
        const dataToExport = {
            version: '4.1',
            exportDate: new Date().toISOString(),
            totalTests: tests.length,
            tests: tests
        };
        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wechsler_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert(`${tests.length} teste(s) exportado(s) com sucesso!`);
    } catch (error) {
        console.error('Erro ao exportar testes:', error);
        alert('Ocorreu um erro ao exportar os testes.');
    }
}

/**
 * Importa testes de um arquivo JSON.
 */
function importTests(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!importedData.tests || !Array.isArray(importedData.tests)) {
                throw new Error('Arquivo de backup inválido ou malformado.');
            }
            const currentTests = getSavedTests();
            const importedTests = importedData.tests;
            const confirmMessage = currentTests.length > 0
                ? `Você tem ${currentTests.length} teste(s) salvos. Deseja:\n\n[OK] - Adicionar os ${importedTests.length} novos testes aos existentes\n[Cancelar] - Substituir TUDO pelos testes do backup`
                : `Importar ${importedTests.length} teste(s)?`;

            const addToExisting = confirm(confirmMessage);

            if (currentTests.length === 0 || !addToExisting) {
                saveAllTests(importedTests);
                alert(`${importedTests.length} teste(s) importado(s) com sucesso!`);
            } else {
                const mergedTests = [...currentTests, ...importedTests];
                saveAllTests(mergedTests);
                alert(`${importedTests.length} teste(s) adicionado(s) aos ${currentTests.length} existentes.`);
            }
            if (document.querySelector('.meus-avaliados-page')) {
                loadMeusAvaliados();
            }
        } catch (error) {
            console.error('Erro ao importar testes:', error);
            alert('Erro ao importar o arquivo. Verifique se é um backup válido.');
        }
    };
    reader.readAsText(file);
}

/**
 * Exporta um relatório de teste para formato Word (HTML).
 */
function exportTestToWord(testData) {
    const synthesisForHtml = testData.synthesisText ? testData.synthesisText.replace(/\n/g, '<br>') : '';
    const html = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
        <head><meta charset="utf-8"><title>Relatório ${testData.patientName}</title>
        <style>body{font-family:Arial,sans-serif;line-height:1.6}h1,h2{color:#2563eb}table{border-collapse:collapse;width:100%;margin:10px 0}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background-color:#f2f2f2}p{text-align:justify}</style>
        </head><body><h1>Relatório de Avaliação ${testData.testType}</h1>
        <h2>Dados do Avaliado</h2><div><strong>Nome:</strong> ${testData.patientName}</div><div><strong>Nascimento:</strong> ${formatDateString(testData.dob)}</div><div><strong>Avaliação:</strong> ${formatDateString(testData.testDate)}</div><div><strong>Idade:</strong> ${testData.ageAtTest}</div>
        <h2>Resultados dos Subtestes</h2><table><thead><tr><th>Subteste</th><th>P. Bruta</th><th>P. Ponderada</th><th>Classificação</th></tr></thead><tbody>${Object.entries(testData.rawScores).map(([id,s])=>`<tr><td>${getSubtestFullName(id)}</td><td>${s??"--"}</td><td>${testData.scaledScores[id]??"--"}</td><td>${testData.classifications[id]??"--"}</td></tr>`).join('')}</tbody></table>
        <h2>Índices Compostos</h2><table><thead><tr><th>Índice</th><th>P. Composta</th><th>Percentil</th><th>IC 95%</th><th>Classificação</th></tr></thead><tbody>${Object.entries(testData.indices).map(([id,d])=>`<tr><td>${getIndexFullName(id)}</td><td>${d.compositeScore??"--"}</td><td>${d.percentileRank??"--"}</td><td>${d.confidenceInterval??"--"}</td><td>${d.classification??"--"}</td></tr>`).join('')}</tbody></table>
        ${testData.synthesisText?`<h2>Síntese Interpretativa</h2><p>${synthesisForHtml}</p>`:''}
        </body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${testData.patientName}_${testData.testType}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Adiciona os botões de Importar/Exportar na página "Meus Avaliados".
 */
function addBackupButtons() {
    if (document.querySelector('.backup-buttons-container')) return;
    const searchContainer = document.querySelector('.search-bar-container');
    if (!searchContainer) return;
    const backupButtonsHtml = `<div class="backup-buttons-container"><button class="backup-button export-btn" id="exportAllBtn"><i class="fas fa-download"></i> Exportar Backup</button><label class="backup-button import-btn" for="importFile"><i class="fas fa-upload"></i> Importar Backup<input type="file" id="importFile" accept=".json" style="display:none;"></label></div>`;
    searchContainer.insertAdjacentHTML('afterend', backupButtonsHtml);
    document.getElementById('exportAllBtn')?.addEventListener('click', exportAllTests);
    document.getElementById('importFile')?.addEventListener('change', (e) => {
        if (e.target.files[0]) importTests(e.target.files[0]);
        e.target.value = '';
    });
}

/**
 * Adiciona o botão de exportar para Word no rodapé do modal.
 */
function addWordExportButton() {
    if (document.getElementById('exportWordBtn')) return;
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) return;
    const footerHtml = `<div class="modal-footer"><div class="modal-footer-info"><span>Dados salvos localmente</span></div><button class="modal-action-btn primary" id="exportWordBtn"><i class="fas fa-file-word"></i> Exportar para Word</button></div>`;
    modalContent.insertAdjacentHTML('beforeend', footerHtml);
    document.getElementById('exportWordBtn')?.addEventListener('click', () => {
        const testId = document.querySelector('.modal-content').dataset.testId;
        if (testId) exportTestToWord(getTestById(testId));
    });
}

//======================================================================//
//   2. FUNÇÕES AUXILIARES, SÍNTESE E GRÁFICOS
//======================================================================//

function getSubtestFullName(id) { return subtestFullNames[id.toLowerCase()] || id; }
function getIndexFullName(id) { return indexFullNames[id.toLowerCase()] || id; }
function formatDateString(dateString) {
    if (!dateString) return '--';
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
}

/**
 * Gera o texto da síntese interpretativa com base na lógica avançada.
 */
function generateSynthesisText(testData) {
    if (!testData?.patientName || !testData.indices?.qit?.compositeScore) {
        return 'Dados insuficientes para gerar a síntese detalhada.';
    }
    const { patientName, indices } = testData;
    const synthesisParts = [];
    const lowScoreImplications = {
        icv: 'Dificuldades nessa função podem acarretar prejuízos na realização de representações mentais visuais, na manipulação mental de objetos, na verificação de como os objetos ficariam alterados, na estimativa ou comparação de comprimentos e distâncias, na leitura de gráficos, mapas e plantas, bem como na resolução de problemas e formação de conceitos não verbais. Adicionalmente, podem haver dificuldades de raciocínio lógico e na percepção de relações entre padrões.',
        iop: 'Dificuldade nessa função pode acarretar prejuízos para fazer representações mentais visuais, na manipulação mental e para verificar como os objetos ficariam alterados, para estimar ou comparar comprimentos, distâncias, leitura de gráficos, mapas e plantas, dificuldade de resolução de problemas e formação de conceitos não verbais, dificuldade de raciocínio lógico e de perceber relações entre os padrões.',
        imo: 'Dificuldades nessa função podem resultar em problemas para seguir instruções de tarefas, manter informações na mente para uso subsequente, realizar cálculos e resolver problemas matemáticos mentalmente, e realizar duas tarefas ao mesmo tempo. Durante a leitura, podem surgir dificuldades para conectar um parágrafo ao outro e compreender o conteúdo lido, além de dificuldades para organizar informações em uma ordem temporal.',
        ivp: 'Dificuldades nessas funções podem levar à lentidão na execução de tarefas, resultando em demoras para completar atividades escolares e cotidianas, afetando a leitura, escrita e memória de trabalho. Isso pode resultar em um desempenho acadêmico inferior e frustração, além de impactar negativamente a socialização e a capacidade de resolver problemas rapidamente. A sobrecarga cognitiva pode causar fadiga e estresse, e a desorganização pode dificultar seguir instruções e gerenciar o tempo.'
    };

    synthesisParts.push(`${patientName} foi submetido(a) a aplicação dos subtestes da Escala Wechsler de Inteligência para Crianças/adolescentes - 4ª Edição (WISC-IV), a partir dos quais foram derivados os seus Pontos Compostos. O QI Total (QIT) é derivado da combinação de pontuações em 10 subtestes e é considerado a estimativa mais representativa do funcionamento intelectual global. A habilidade cognitiva geral de ${patientName} supera aproximadamente ${indices.qit.percentileRank}% das crianças/adolescentes da sua idade (QIT= ${indices.qit.compositeScore}; intervalo de confiança 95% = ${indices.qit.confidenceInterval}).`);

    const processIndex = (id, intro, desc) => {
        if (!indices[id] || !indices[id].compositeScore) return;
        let text = `${intro} ${patientName}, mensuradas pelo ${getIndexFullName(id)}, estão acima de aproximadamente ${indices[id].percentileRank}% das crianças/adolescentes com a mesma idade (${id.toUpperCase()} = ${indices[id].compositeScore}; intervalo de confiança 95% = ${indices[id].confidenceInterval}). ${desc}.`;
        if (parseInt(indices[id].compositeScore) < 90) text += ` ${lowScoreImplications[id] || ''}`;
        synthesisParts.push(text);
    };

    processIndex('icv', 'No que diz respeito às habilidades de raciocínio verbal de', 'O Índice de Compreensão Verbal avalia raciocínio verbal e formação de conceitos');
    processIndex('iop', 'Nas habilidades de raciocínio não verbal de', 'O Índice de Organização Perceptual avalia formação de conceitos não verbais, percepção e organização visual, processamento simultâneo, coordenação visuomotora, aprendizagem e a habilidade de separar figura e fundo de um estímulo visual');
    processIndex('imo', 'Quanto às habilidades de memória operacional de', 'O Índice de Memória Operacional avalia as habilidades do examinando de sustentar atenção, concentração e exercer controle mental');
    processIndex('ivp', 'Por fim, as habilidades de velocidade de processamento de', 'O Índice de Velocidade de Processamento é um indicador da velocidade com a qual a criança/adolescente pode processar mentalmente uma informação, simples ou rotineira, sem errar. Desempenhos em tarefas dessa natureza podem ser influenciados pela discriminação visual e coordenação visuomotora');

    synthesisParts.push(`---\nAVISO: Esta síntese é gerada automaticamente como um auxílio à interpretação dos resultados. Ela não substitui o julgamento clínico e a análise qualitativa do profissional qualificado, que deve considerar o histórico completo e o comportamento do avaliado durante o teste.`);
    return synthesisParts.join('\n\n');
}

// --- MODIFICADO: A função renderIndexChart foi substituída pelas 3 funções abaixo ---

/**
 * Renderiza um GRÁFICO DE BARRAS com os Índices Compostos e o QIT.
 * @param {HTMLCanvasElement} chartCanvas O elemento canvas para desenhar.
 * @param {object} testData O objeto de dados do teste do paciente.
 */
function renderIndexBarChart(chartCanvas, testData) {
    const existingChart = Chart.getChart(chartCanvas);
    if (existingChart) {
        existingChart.destroy();
    }

    // MODIFICAÇÃO: A condição "id !== 'qit'" foi removida para incluir o QIT.
    // Adicionada verificação "data &&" para evitar erros com dados malformados.
    const indicesData = Object.entries(testData.indices)
        .filter(([id, data]) => data && data.compositeScore && data.compositeScore !== '--')
        .map(([id, data]) => ({
            id: id.toUpperCase(),
            name: getIndexFullName(id),
            score: parseInt(data.compositeScore)
        }));

    // Reordenar para que QIT seja o primeiro para destaque visual.
    indicesData.sort((a, b) => {
        if (a.id === 'QIT') return -1;
        if (b.id === 'QIT') return 1;
        return 0;
    });

    const labels = indicesData.map(d => d.name);
    const scores = indicesData.map(d => d.score);

    const isDarkMode = document.body.classList.contains('dark-mode');
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? '#f9fafb' : '#1f2937';

    const averageBand = {
        id: 'averageBand',
        beforeDatasetsDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, height }, scales: { x } } = chart;
            if (!options.display) { return; }
            ctx.save();
            const lowerPixel = x.getPixelForValue(options.start);
            const upperPixel = x.getPixelForValue(options.end);
            ctx.fillStyle = options.color;
            ctx.fillRect(lowerPixel, top, upperPixel - lowerPixel, bottom - top);
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = options.labelColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const textX = lowerPixel + (upperPixel - lowerPixel) / 2;
            const textY = top + (height / 2);
            ctx.fillText(options.label, textX, textY);
            ctx.restore();
        }
    };

    const valueLabels = {
        id: 'valueLabels',
        afterDatasetsDraw(chart, args, options) {
            const { ctx } = chart;
            ctx.save();
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach((element, index) => {
                        ctx.fillStyle = options.color;
                        ctx.font = `${options.font.weight} ${options.font.size}px ${options.font.family || 'Arial'}`;
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';
                        const dataString = dataset.data[index].toString();
                        const position = element.getProps(['x', 'y'], true);
                        const padding = 5;
                        ctx.fillText(dataString, position.x + padding, position.y);
                    });
                }
            });
            ctx.restore();
        }
    };

    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontuação Composta',
                data: scores,
                // MODIFICAÇÃO: Adicionada cor para o QIT e cores padrão.
                // O uso de slice garante que o número de cores corresponda ao de barras.
                backgroundColor: [
                    'rgba(107, 114, 128, 0.7)', // Cor para QIT (cinza)
                    'rgba(37, 99, 235, 0.7)',  // ICV
                    'rgba(5, 150, 105, 0.7)',   // IOP
                    'rgba(217, 119, 6, 0.7)',   // IMO
                    'rgba(220, 38, 38, 0.7)'    // IVP
                ].slice(0, scores.length),
                borderColor: [
                    '#6b7280', // Borda para QIT
                    '#2563eb',
                    '#059669',
                    '#d97706',
                    '#dc2626'
                ].slice(0, scores.length),
                borderWidth: 2,
                borderRadius: 5,
            }]
        },
        plugins: [averageBand, valueLabels],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: false, min: 40, max: 160,
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { size: 12 } }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: textColor, font: { size: 14 } }
                }
            },
            plugins: {
                averageBand: {
                    display: true, start: 90, end: 109,
                    color: 'rgba(40, 167, 69, 0.15)',
                    label: 'Média',
                    labelColor: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
                },
                valueLabels: {
                    color: textColor,
                    font: { size: 12, weight: 'bold' }
                },
                legend: { display: false },
                title: {
                    // MODIFICAÇÃO: Título atualizado.
                    display: true, text: 'Perfil de Índices Compostos e QIT', color: textColor,
                    font: { size: 18, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                tooltip: {
                    backgroundColor: '#111827', titleFont: { size: 14 },
                    bodyFont: { size: 12 }, padding: 10, cornerRadius: 8
                }
            }
        }
    });
}


/**
 * --- NOVO ---
 * Renderiza um GRÁFICO DE BARRAS com os Subtestes individuais.
 * @param {HTMLCanvasElement} chartCanvas O elemento canvas para desenhar.
 * @param {object} testData O objeto de dados do teste do paciente.
 */
function renderSubtestBarChart(chartCanvas, testData) {
    const existingChart = Chart.getChart(chartCanvas);
    if (existingChart) existingChart.destroy();

    const subtestData = Object.entries(testData.scaledScores)
        .filter(([id, score]) => score !== null && score !== '--')
        .map(([id, score]) => ({
            name: getSubtestFullName(id),
            score: parseInt(score)
        }));

    const labels = subtestData.map(d => d.name);
    const scores = subtestData.map(d => d.score);
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#f9fafb' : '#1f2937';

    const averageBandSubtest = {
        id: 'averageBand',
        beforeDatasetsDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;
            const lowerPixel = x.getPixelForValue(8);
            const upperPixel = x.getPixelForValue(12);
            ctx.save();
            ctx.fillStyle = options.color;
            ctx.fillRect(lowerPixel, top, upperPixel - lowerPixel, bottom - top);
            ctx.restore();
        }
    };
    
    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontuação Ponderada',
                data: scores,
                backgroundColor: 'rgba(13, 148, 136, 0.7)',
                borderColor: 'rgba(13, 148, 136, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        plugins: [averageBandSubtest],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: false, min: 1, max: 19, ticks: { color: textColor } },
                y: { ticks: { color: textColor, font: {size: 14} } }
            },
            plugins: {
                averageBand: { color: 'rgba(40, 167, 69, 0.15)' },
                title: { display: true, text: 'Perfil dos Subtestes (Pontos Ponderados)', color: textColor, font: {size: 18, weight: 'bold'} },
                legend: { display: false }
            }
        }
    });
}

/**
 * --- MODIFICADO ---
 * Renderiza um GRÁFICO DE RADAR com os Índices Compostos e o QIT.
 * @param {HTMLCanvasElement} chartCanvas O elemento canvas para desenhar.
 * @param {object} testData O objeto de dados do teste do paciente.
 */
function renderIndexRadarChart(chartCanvas, testData) {
    const existingChart = Chart.getChart(chartCanvas);
    if (existingChart) existingChart.destroy();

    // MODIFICAÇÃO: Removido o filtro "id !== 'qit'" e adicionada verificação de segurança "data &&".
    const indicesData = Object.entries(testData.indices)
        .filter(([id, data]) => data && data.compositeScore && data.compositeScore !== '--')
        .map(([id, data]) => ({
            // MODIFICAÇÃO: Lógica para abreviar tanto os Índices quanto o QIT.
            name: getIndexFullName(id).replace('Índice de ', '').replace('Quociente de Inteligência ', ''),
            score: parseInt(data.compositeScore)
        }));

    const labels = indicesData.map(d => d.name);
    const scores = indicesData.map(d => d.score);
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#f9fafb' : '#1f2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

    new Chart(chartCanvas, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontuação Composta',
                data: scores,
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 40,
                    max: 160,
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: { color: textColor, font: { size: 14 } },
                    ticks: {
                        color: textColor,
                        backdropColor: isDarkMode ? '#1f2937' : '#fff',
                        stepSize: 20
                    }
                }
            },
            plugins: {
                // MODIFICAÇÃO: Título atualizado para incluir QIT.
                title: { display: true, text: 'Perfil de Índices e QIT (Radar)', color: textColor, font: {size: 18, weight: 'bold'} },
                legend: { display: false }
            }
        }
    });
}



//======================================================================//
//   3. CLASSIFICAÇÕES E DADOS DO LOCALSTORAGE
//======================================================================//

function getCompositeScoreClassification(score) {
    const s = Number(score);
    if (score === null || isNaN(s)) return '--';
    if (s <= 69) return 'Extremamente Baixo'; if (s <= 79) return 'Limítrofe';
    if (s <= 89) return 'Médio Inferior'; if (s <= 109) return 'Média';
    if (s <= 119) return 'Média Superior'; if (s <= 129) return 'Superior';
    if (s >= 130) return 'Muito Superior'; return '--';
}

function getSavedTests() {
    try { return JSON.parse(localStorage.getItem('wechslerApp_savedTests')) || []; }
    catch (e) { console.error("Erro ao carregar testes:", e); return []; }
}
function saveAllTests(tests) {
    try { localStorage.setItem('wechslerApp_savedTests', JSON.stringify(tests)); }
    catch (e) { console.error("Erro ao salvar testes:", e); }
}
function getTestById(testId) { return getSavedTests().find(test => test.id === parseInt(testId, 10)); }
function deleteTestById(testId) { saveAllTests(getSavedTests().filter(test => test.id !== parseInt(testId, 10))); }

//======================================================================//
//   4. LÓGICA PRINCIPAL DO APLICATIVO (SALVAR, CALCULAR)
//======================================================================//

function saveTestResults(testType) {
    const page = document.querySelector('.correction-page');
    const patientName = page.querySelector('input[data-field="patient-name"]')?.value.trim();
    const dob = page.querySelector('input[data-field="dob"]')?.value;
    const testDate = page.querySelector('input[data-field="test-date"]')?.value;
    if (!patientName || !dob || !testDate) {
        alert('Por favor, preencha todos os dados do avaliado.');
        return;
    }
    const ageDetails = calculateAgeDetails(dob, testDate);
    const newTest = {
        id: Date.now(), patientName, dob, testDate, testType: testType.toUpperCase(),
        ageAtTest: ageDetails ? `${ageDetails.years}a ${ageDetails.months}m` : '--',
        rawScores: {}, scaledScores: {}, classifications: {}, indices: {}
    };
    page.querySelectorAll('.subtest-item').forEach(item => {
        const rawInput = item.querySelector('.raw-score-input');
        const subtestId = rawInput?.dataset.subtest;
        if (subtestId) {
            newTest.rawScores[subtestId] = rawInput.value !== '' ? parseInt(rawInput.value, 10) : null;
            newTest.scaledScores[subtestId] = item.querySelector('.scaled-score-output')?.value || '--';
            newTest.classifications[subtestId] = item.querySelector('.classification-output')?.textContent || '--';
        }
    });
    page.querySelectorAll('.summary-results-table tbody tr[data-scale]').forEach(row => {
        const scaleId = row.dataset.scale;
        newTest.indices[scaleId] = {
            sumScaledScore: row.querySelector('.sum-scaled-score')?.textContent || '--',
            compositeScore: row.querySelector('.composite-score')?.textContent || '--',
            percentileRank: row.querySelector('.percentile-rank')?.textContent || '--',
            confidenceInterval: row.querySelector('.confidence-interval')?.textContent || '--',
            classification: row.querySelector('.composite-classification')?.textContent || '--'
        };
    });
    newTest.synthesisText = generateSynthesisText(newTest);
    const allTests = getSavedTests();
    allTests.push(newTest);
    saveAllTests(allTests);
    alert(`Teste de '${patientName}' salvo com sucesso!`);
    loadMeusAvaliados();
}

function updateCalculations(testType) {
    const dob = document.getElementById(`${testType}-dob`)?.value || '';
    const testDate = document.getElementById(`${testType}-test-date`)?.value || '';
    const ageOutput = document.querySelector('.age-output');
    let ageInfo = null;
    if (dob && testDate) {
        ageInfo = calculateAgeDetails(dob, testDate);
        ageOutput.textContent = ageInfo ? `${ageInfo.years}a ${ageInfo.months}m` : 'Idade inválida';
    } else {
        ageOutput.textContent = '--';
    }
    document.querySelectorAll('.raw-score-input').forEach(input => {
        const subtestId = input.dataset.subtest;
        const rawScore = input.value !== '' ? parseInt(input.value, 10) : null;
        const scaledScoreOutput = input.closest('.subtest-item')?.querySelector('.scaled-score-output');
        const classificationOutput = input.closest('.subtest-item')?.querySelector('.classification-output');
        if (ageInfo && rawScore !== null && !isNaN(rawScore)) {
            const scaledScore = getScaledScore(testType, subtestId, ageInfo.ageRangeKey, rawScore);
            if(scaledScoreOutput) scaledScoreOutput.value = scaledScore ?? '--';
            if(classificationOutput) classificationOutput.textContent = getClassification(scaledScore);
        } else {
            if (scaledScoreOutput) scaledScoreOutput.value = '--';
            if (classificationOutput) classificationOutput.textContent = '--';
        }
    });
    updateSummaryTable(testType, ageInfo);
}

function updateSummaryTable(testType, ageInfo) {
    const summaryTableBody = document.querySelector('.summary-results-table tbody');
    if (!summaryTableBody) return;
    const indexDefinitions = {
        'icv': { subtests: ['sm', 'vc', 'co', 'in', 'rp'], core: ['sm', 'vc', 'co'], num: 3 },
        'iop': { subtests: ['cb', 'cn', 'rm'], core: ['cb', 'cn', 'rm'], num: 3 },
        'imo': { subtests: ['dg', 'snl'], core: ['dg', 'snl'], num: 2 },
        'ivp': { subtests: ['cd', 'ps'], core: ['cd', 'ps'], num: 2 }
    };
    const qitCoreSubtests = ['cb', 'sm', 'dg', 'cn', 'cd', 'vc', 'snl', 'rm', 'co', 'ps'];
    const currentScaledScores = {};
    document.querySelectorAll('.raw-score-input').forEach(input => {
        const scaledScoreEl = input.closest('.subtest-item')?.querySelector('.scaled-score-output');
        if (scaledScoreEl?.value && scaledScoreEl.value !== '--') {
            currentScaledScores[input.dataset.subtest] = parseInt(scaledScoreEl.value, 10);
        }
    });
    summaryTableBody.querySelectorAll('tr[data-scale]').forEach(row => {
        const scaleId = row.dataset.scale;
        const sumCell = row.querySelector('.sum-scaled-score');
        const compCell = row.querySelector('.composite-score');
        const percCell = row.querySelector('.percentile-rank');
        const ciCell = row.querySelector('.confidence-interval');
        const classCell = row.querySelector('.composite-classification');
        sumCell.textContent = compCell.textContent = percCell.textContent = ciCell.textContent = classCell.textContent = '--';
        if (!ageInfo?.ageRangeKey) return;
        let sumScaled = null;
        if (scaleId === 'qit') {
            const allCorePresent = qitCoreSubtests.every(subId => currentScaledScores[subId] !== undefined);
            if (allCorePresent) {
                sumScaled = qitCoreSubtests.reduce((acc, subId) => acc + currentScaledScores[subId], 0);
            }
        } else {
            const def = indexDefinitions[scaleId];
            if (def) {
                const subtestsForSum = def.core.map(id => currentScaledScores[id]).filter(s => s !== undefined);
                if (subtestsForSum.length < def.num) {
                    const supplemental = def.subtests.find(id => !def.core.includes(id) && currentScaledScores[id] !== undefined);
                    if (supplemental) subtestsForSum.push(currentScaledScores[supplemental]);
                }
                if (subtestsForSum.length >= def.num) {
                    sumScaled = subtestsForSum.slice(0, def.num).reduce((acc, score) => acc + score, 0);
                }
            }
        }
        if (sumScaled !== null) {
            sumCell.textContent = sumScaled;
            const composite = getCompositeScore(testType, scaleId, sumScaled);
            compCell.textContent = composite ?? '--';
            percCell.textContent = getPercentileRank(composite) ?? '--';
            ciCell.textContent = getConfidenceInterval(composite) ?? '--';
            classCell.textContent = getCompositeScoreClassification(composite);
        }
    });
}

//======================================================================//
//   5. RENDERIZAÇÃO DE PÁGINAS E INTERFACE
//======================================================================//

function clearActiveLinks() { document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active')); }

function loadWelcomeScreen() {
    clearActiveLinks();
    homeLink?.classList.add('active');
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    mainContent.innerHTML = `<div class="dashboard"><div class="dashboard-header"><h2>Painel Inicial</h2><p>${hoje.charAt(0).toUpperCase() + hoje.slice(1)}</p></div><div class="main-actions"><div class="action-card" data-action="corrigir-testes"><div class="action-card-icon"><i class="fas fa-file-signature"></i></div><div class="action-card-text"><h4>Corrigir Novo Teste</h4><p>Iniciar a correção de uma nova escala.</p></div></div><div class="action-card" data-action="meus-avaliados"><div class="action-card-icon"><i class="fas fa-users-cog"></i></div><div class="action-card-text"><h4>Gerenciar Avaliados</h4><p>Visualizar todos os testes salvos.</p></div></div></div><footer class="system-footer"><p><strong>Plataforma de Correção Wechsler</strong> é um sistema projetado para otimizar e agilizar o processo de correção das escalas de inteligência.</p><p class="credits">Construído por Arlindo Neto CRP 23/003158</p></footer></div>`;
    mainContent.querySelectorAll('.action-card').forEach(card => card.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        if (action === 'corrigir-testes') loadCorrigirTestes(); else if (action === 'meus-avaliados') loadMeusAvaliados();
    }));
}

function loadMeusAvaliados() {
    clearActiveLinks();
    meusAvaliadosLink?.classList.add('active');
    mainContent.innerHTML = `<div class="meus-avaliados-page"><div class="dashboard-header"><h2>Meus Avaliados</h2><p>Pesquise, visualize ou exclua os testes salvos.</p></div><div class="search-bar-container"><i class="fas fa-search"></i><input type="search" id="patientSearchInput" placeholder="Buscar por nome ou tipo de teste..."></div><div id="patientGrid" class="patient-grid"></div></div>`;
    addBackupButtons();
    const allTests = [...getSavedTests()].reverse();
    renderPatientList(allTests);
    document.getElementById('patientSearchInput')?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        renderPatientList(allTests.filter(t => t.patientName.toLowerCase().includes(searchTerm) || t.testType.toLowerCase().includes(searchTerm)));
    });
}

function renderPatientList(tests) {
    const grid = document.getElementById('patientGrid');
    if (!grid) return;
    if (tests.length === 0) {
        grid.innerHTML = `<div class="empty-state-container"><i class="fas fa-folder-open"></i><h3>Nenhuma Pasta Encontrada</h3><p>Não há testes salvos que correspondam à sua busca.</p><button class="test-button" id="addNewTestBtn">Corrigir um Novo Teste</button></div>`;
        grid.querySelector('#addNewTestBtn')?.addEventListener('click', loadCorrigirTestes);
        return;
    }
    grid.innerHTML = tests.map(test => `
        <div class="folder-card" data-id="${test.id}"><div class="folder-tab ${test.testType.toLowerCase()}">${test.testType}</div><div class="folder-content"><div class="folder-patient-info"><i class="fas fa-user-circle patient-avatar"></i><h4 class="patient-name">${test.patientName}</h4></div><ul class="folder-details-list"><li><strong>Nascimento:</strong> ${formatDateString(test.dob)}</li><li><strong>Avaliação:</strong> ${formatDateString(test.testDate)}</li><li><strong>Idade no Teste:</strong> ${test.ageAtTest}</li></ul><div class="folder-actions"><button class="view-button"><i class="fas fa-eye"></i> Visualizar</button><button class="delete-button" title="Excluir"><i class="fas fa-trash-alt"></i></button></div></div></div>`).join('');

    grid.addEventListener('click', function(event) {
        const target = event.target;
        const viewButton = target.closest('.view-button');
        const deleteButton = target.closest('.delete-button');
        const card = target.closest('.folder-card');

        if (!card) return;

        const testId = card.dataset.id;
        const testData = getTestById(testId);

        if (viewButton && testData) {
            displayTestInModal(testData);
        } else if (deleteButton && testData) {
            if (confirm(`Tem certeza que deseja excluir o teste de ${testData.patientName}?`)) {
                deleteTestById(testId);
                loadMeusAvaliados();
            }
        }
    });
}

// --- MODIFICADO: Função displayTestInModal completamente atualizada ---
function displayTestInModal(testData) {
    modal.innerHTML = '';
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.dataset.testId = testData.id;

    const qitScore = testData.indices.qit?.compositeScore || '--';
    const heroSection = `<div class="modal-header"><button class="close-button">&times;</button><div class="modal-patient-header"><div class="modal-patient-avatar"><i class="fas fa-user"></i></div><div class="modal-patient-info"><h3>${testData.patientName}</h3><span class="modal-test-badge"><i class="fas fa-brain"></i>${testData.testType}</span></div></div><div class="modal-quick-stats"><div class="stat-card"><div class="stat-label">Nascimento</div><div class="stat-value">${formatDateString(testData.dob)}</div></div><div class="stat-card"><div class="stat-label">Avaliação</div><div class="stat-value">${formatDateString(testData.testDate)}</div></div><div class="stat-card"><div class="stat-label">Idade</div><div class="stat-value">${testData.ageAtTest}</div></div><div class="stat-card"><div class="stat-label">QIT</div><div class="stat-value">${qitScore}</div></div></div></div>`;
    
    const chartHtml = `
        <div class="modal-section">
            <div class="modal-section-header">
                <h4 class="modal-section-title"><i class="fas fa-chart-bar"></i> Perfil Gráfico</h4>
                <div class="modal-chart-controls">
                    <button class="chart-toggle-btn active" data-chart-type="index-bar">Índices (Barras)</button>
                    <button class="chart-toggle-btn" data-chart-type="index-radar">Índices (Radar)</button>
                    <button class="chart-toggle-btn" data-chart-type="subtest-bar">Subtestes</button>
                </div>
            </div>
            <div class="chart-container" style="position: relative; height:40vh; width:100%;">
                <canvas id="dynamicChart"></canvas>
            </div>
        </div>`;

    const subtestsHtml = `<div class="modal-section"><h4 class="modal-section-title"><i class="fas fa-clipboard-list"></i>Resultados dos Subtestes</h4><div class="modal-table-wrapper"><table class="modal-scores-table"><thead><tr><th>Subteste</th><th>P. Bruta</th><th>P. Ponderada</th><th>Classificação</th></tr></thead><tbody>${Object.entries(testData.rawScores).map(([id, s]) => `<tr data-id="${id}"><td data-label="Subteste">${getSubtestFullName(id)}</td><td data-label="P. Bruta">${s ?? '--'}</td><td data-label="P. Ponderada"><span class="score-badge ${getScoreClass(testData.scaledScores[id])}">${testData.scaledScores[id] ?? '--'}</span></td><td data-label="Classificação">${testData.classifications[id] ?? '--'}</td></tr>`).join('')}</tbody></table></div></div>`;
    const indicesHtml = `<div class="modal-section"><h4 class="modal-section-title"><i class="fas fa-chart-line"></i>Resultados dos Índices</h4><div class="modal-table-wrapper"><table class="modal-scores-table"><thead><tr><th>Índice</th><th>P. Composta</th><th>Percentil</th><th>IC 95%</th><th>Classificação</th></tr></thead><tbody>${Object.entries(testData.indices).map(([id, d]) => `<tr data-id="${id}"><td data-label="Índice">${getIndexFullName(id)}</td><td data-label="P. Composta"><span class="score-badge ${getCompositeScoreClass(d.compositeScore)}">${d.compositeScore ?? '--'}</span></td><td data-label="Percentil">${d.percentileRank ?? '--'}</td><td data-label="IC 95%">${d.confidenceInterval ?? '--'}</td><td data-label="Classificação">${d.classification ?? '--'}</td></tr>`).join('')}</tbody></table></div></div>`;
    const synthesisHtml = testData.synthesisText ? `<div class="modal-section"><h4 class="modal-section-title"><i class="fas fa-comment-dots"></i>Síntese Interpretativa</h4><div class="synthesis-content">${testData.synthesisText.replace(/\n/g, '<br>')}</div></div>` : '';

    content.innerHTML = `${heroSection}<div class="modal-body">${chartHtml}${subtestsHtml}${indicesHtml}${synthesisHtml}</div>`;
    modal.appendChild(content);
    addWordExportButton();
    modal.style.display = 'block';
    content.querySelector('.close-button').onclick = () => modal.style.display = 'none';

    const chartCanvas = document.getElementById('dynamicChart');

    const chartRenderers = {
        'index-bar': () => renderIndexBarChart(chartCanvas, testData),
        'index-radar': () => renderIndexRadarChart(chartCanvas, testData),
        'subtest-bar': () => renderSubtestBarChart(chartCanvas, testData)
    };

    chartRenderers['index-bar']();

    document.querySelectorAll('.chart-toggle-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.chart-toggle-btn').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const chartType = e.currentTarget.dataset.chartType;
            chartRenderers[chartType]();
        });
    });
}

function getScoreClass(score) { const s = parseInt(score); if (isNaN(s)) return 'medium'; if (s >= 13) return 'high'; if (s <= 7) return 'low'; return 'medium'; }
function getCompositeScoreClass(score) { const s = parseInt(score); if (isNaN(s)) return 'medium'; if (s >= 110) return 'high'; if (s <= 89) return 'low'; return 'medium'; }

function loadCorrigirTestes() {
    clearActiveLinks();
    corrigirTestesLink?.classList.add('active');
    mainContent.innerHTML = `<div class="test-selection-page"><div class="dashboard-header"><h2>Corrigir Testes</h2><p>Selecione a escala que deseja corrigir:</p></div><div class="test-selection" style="margin-top:2rem;text-align:center;"><button class="test-button" data-test="wisc">WISC-IV</button><button class="test-button" data-test="wais">WAIS-III</button><button class="test-button" data-test="wasi">WASI</button></div></div>`;
    mainContent.querySelectorAll('.test-button[data-test]').forEach(button => {
        button.addEventListener('click', (event) => {
            const testType = event.target.dataset.test;
            // Assumindo que você tem funções como getWiscHtml(), etc.
            const functionName = `get${testType.charAt(0).toUpperCase() + testType.slice(1)}Html`;
            if (typeof window[functionName] === 'function') {
                mainContent.innerHTML = window[functionName]();
                setupTestFormListeners(testType);
            } else {
                 console.error(`Função de template ${functionName} não encontrada.`);
                 // Provisório para o exemplo funcionar
                 alert(`Template para ${testType.toUpperCase()} não implementado neste exemplo.`);
            }
        });
    });
}

//======================================================================//
//   6. INICIALIZAÇÃO DA APLICAÇÃO E EVENTOS
//======================================================================//

function setupTestFormListeners(testType) {
    const form = document.querySelector('.correction-page');
    if (!form) return;
    const updateFn = () => updateCalculations(testType);
    form.addEventListener('input', (e) => {
        if (e.target.matches('input[data-field], .raw-score-input')) {
            updateFn();
        }
    });
    form.querySelector('.save-test-button')?.addEventListener('click', () => saveTestResults(testType));
    updateFn();
}

document.addEventListener('DOMContentLoaded', () => {
    mainContent = document.getElementById('main-section-content');
    homeLink = document.getElementById('homeLink');
    meusAvaliadosLink = document.getElementById('meusAvaliadosLink');
    corrigirTestesLink = document.getElementById('corrigirTestesLink');
    modal = document.getElementById('patientDetailsModal');
    darkModeToggle = document.getElementById('darkModeToggle');

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    darkModeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    window.addEventListener('click', (event) => { if (event.target === modal) modal.style.display = 'none'; });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') modal.style.display = 'none'; });

    homeLink?.addEventListener('click', (e) => { e.preventDefault(); loadWelcomeScreen(); });
    meusAvaliadosLink?.addEventListener('click', (e) => { e.preventDefault(); loadMeusAvaliados(); });
    corrigirTestesLink?.addEventListener('click', (e) => { e.preventDefault(); loadCorrigirTestes(); });

    loadWelcomeScreen();
});