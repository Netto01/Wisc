//======================================================================//
//   1. ESTRUTURAS DE DADOS PARA OS PONTOS COMPOSTOS (VALIDADO)
//======================================================================//
const INDEX_DATA = {
    'wisc': {
        'icv': {},
        'iop': {},
        'imo': {},
        'ivp': {},
        'qit': {}
    }
};

const PERCENTILE_CONFIDENCE_DATA = {};

//======================================================================//
//   2. FUNÇÕES AUXILIARES PARA POPULAR AS NORMAS DOS ÍNDICES (VALIDADO)
//======================================================================//
function addCompositeConversionEntry(compositeScore, percentile, confidenceInterval) {
    PERCENTILE_CONFIDENCE_DATA[compositeScore] = {
        percentile: percentile,
        ci: confidenceInterval
    };
}

function addIndexNormEntry(scaleType, indexId, sumScaledScore, compositeScore) {
    if (!INDEX_DATA[scaleType][indexId]) {
        INDEX_DATA[scaleType][indexId] = {};
    }
    INDEX_DATA[scaleType][indexId][sumScaledScore] = compositeScore;
}

//======================================================================//
//   3. FUNÇÕES PÚBLICAS DE CÁLCULO (VALIDADO)
//======================================================================//
function getCompositeScore(scaleType, indexId, sumScaledScore) {
    if (sumScaledScore === null || isNaN(sumScaledScore)) {
        return null;
    }
    const compositeScore = INDEX_DATA?.[scaleType]?.[indexId]?.[sumScaledScore];
    return compositeScore !== undefined ? compositeScore : null;
}

function getPercentileRank(compositeScore) {
    if (compositeScore === null || isNaN(compositeScore)) {
        return null;
    }
    const data = PERCENTILE_CONFIDENCE_DATA[compositeScore];
    return data ? data.percentile : null;
}

function getConfidenceInterval(compositeScore) {
    if (compositeScore === null || isNaN(compositeScore)) {
        return null;
    }
    const data = PERCENTILE_CONFIDENCE_DATA[compositeScore];
    return data ? data.ci : null;
}

//======================================================================//
//   4. FUNÇÃO DE CLASSIFICAÇÃO QUALITATIVA DOS ESCORES COMPOSTOS
//======================================================================//
/**
 * Retorna a classificação qualitativa para um escore composto.
 * Baseado nas faixas padrão do WISC-V.
 */
function getCompositeScoreClassification(compositeScore) {
    const score = Number(compositeScore);
    
    if (compositeScore === null || isNaN(score)) {
        return '--';
    }

    if (score <= 69)  return 'Extremamente Baixo';
    if (score <= 79)  return 'Limítrofe';
    if (score <= 89)  return 'Médio Inferior';
    if (score <= 109) return 'Média';
    if (score <= 119) return 'Média Superior';
    if (score <= 129) return 'Superior';
    if (score >= 130) return 'Muito Superior';

    return '--'; // Segurança extra
}

//======================================================================//
//   5. FUNÇÃO PARA ATUALIZAR A TABELA DE ÍNDICES (NOVA)
//======================================================================//
/**
 * Atualiza todas as células da tabela de índices compostos
 * Inclui agora a classificação qualitativa
 */
function updateCompositeScoresTable() {
    const scales = ['icv', 'iop', 'imo', 'ivp', 'qit'];
    
    scales.forEach(scaleId => {
        const row = document.querySelector(`tr[data-scale="${scaleId}"]`);
        if (row) {
            // Aqui você precisa calcular ou obter a soma dos pontos ponderados
            // Substitua esta linha pela sua lógica de cálculo da soma
            const sumScaledScore = calculateSumScaledScore(scaleId); 
            
            // Calcular todos os valores
            const compositeScore = getCompositeScore('wisc', scaleId, sumScaledScore);
            const percentile = getPercentileRank(compositeScore);
            const confidenceInterval = getConfidenceInterval(compositeScore);
            const classification = getCompositeScoreClassification(compositeScore); // NOVA LINHA
            
            // Atualizar as células na tabela
            const sumCell = row.querySelector('.sum-scaled-score');
            const compositeCell = row.querySelector('.composite-score');
            const percentileCell = row.querySelector('.percentile-rank');
            const confidenceCell = row.querySelector('.confidence-interval');
            const classificationCell = row.querySelector('.composite-classification'); // NOVA LINHA
            
            if (sumCell) sumCell.textContent = sumScaledScore || '--';
            if (compositeCell) compositeCell.textContent = compositeScore || '--';
            if (percentileCell) percentileCell.textContent = percentile || '--';
            if (confidenceCell) confidenceCell.textContent = confidenceInterval || '--';
            if (classificationCell) classificationCell.textContent = classification; // NOVA LINHA
        }
    });
}

//======================================================================//
//   6. FUNÇÃO AUXILIAR PARA CALCULAR SOMA (VOCÊ PRECISA IMPLEMENTAR)
//======================================================================//
/**
 * Esta função precisa ser implementada com sua lógica específica
 * para calcular a soma dos pontos ponderados de cada índice
 */
function calculateSumScaledScore(scaleId) {
    // EXEMPLO - substitua pela sua lógica real
    // Esta função deve somar os pontos ponderados dos subtestes de cada índice
    
    switch(scaleId) {
        case 'icv':
            // Somar pontos ponderados de: Semelhanças, Vocabulário, Informação, etc.
            return getSumOfScaledScores(['similarities', 'vocabulary', 'information']);
        case 'iop':
            // Somar pontos ponderados de: Cubos, Conceitos Figurativos, etc.
            return getSumOfScaledScores(['block_design', 'picture_concepts', 'matrix_reasoning']);
        case 'imo':
            // Somar pontos ponderados de: Dígitos, Sequência de Números e Letras
            return getSumOfScaledScores(['digit_span', 'letter_number_sequencing']);
        case 'ivp':
            // Somar pontos ponderados de: Código, Procurar Símbolos
            return getSumOfScaledScores(['coding', 'symbol_search']);
        case 'qit':
            // Somar TODOS os pontos ponderados principais
            return getSumOfAllMainSubtests();
        default:
            return null;
    }
}

/**
 * Função auxiliar para somar pontos ponderados de subtestes específicos
 * Substitua pela sua implementação real
 */
function getSumOfScaledScores(subtestIds) {
    // EXEMPLO - substitua pela sua lógica de obter pontos ponderados
    let sum = 0;
    subtestIds.forEach(subtestId => {
        // Aqui você pegaria o ponto ponderado real de cada subteste
        const scaledScore = getScaledScoreForSubtest(subtestId);
        if (scaledScore !== null && !isNaN(scaledScore)) {
            sum += scaledScore;
        }
    });
    return sum > 0 ? sum : null;
}

/**
 * Função auxiliar para obter ponto ponderado de um subteste
 * Substitua pela sua implementação real
 */
function getScaledScoreForSubtest(subtestId) {
    // EXEMPLO - substitua pela sua lógica real
    // Isso deve pegar o ponto ponderado de cada subteste da sua interface
    const element = document.querySelector(`[data-subtest="${subtestId}"] .scaled-score`);
    return element ? parseInt(element.textContent) || null : null;
}

/**
 * Função para somar todos os subtestes principais para o QIT
 */
function getSumOfAllMainSubtests() {
    // EXEMPLO - ajuste conforme seus subtestes principais
    const mainSubtests = [
        'similarities', 'vocabulary', 'block_design', 'matrix_reasoning',
        'digit_span', 'coding', 'information', 'picture_concepts',
        'letter_number_sequencing', 'symbol_search'
    ];
    return getSumOfScaledScores(mainSubtests);
}

//======================================================================//
//   4. DADOS DE CONVERSÃO - ICV (Fonte: Planilha Fornecida)
//======================================================================//

// Tabela de conversão: Soma de Pontos Ponderados -> Ponto Composto
addIndexNormEntry('wisc', 'icv', 4, 47);
addIndexNormEntry('wisc', 'icv', 5, 49);
addIndexNormEntry('wisc', 'icv', 6, 51);
addIndexNormEntry('wisc', 'icv', 7, 53);
addIndexNormEntry('wisc', 'icv', 8, 55);
addIndexNormEntry('wisc', 'icv', 9, 57);
addIndexNormEntry('wisc', 'icv', 10, 59);
addIndexNormEntry('wisc', 'icv', 11, 61);
addIndexNormEntry('wisc', 'icv', 12, 63);
addIndexNormEntry('wisc', 'icv', 13, 65);
addIndexNormEntry('wisc', 'icv', 14, 67);
addIndexNormEntry('wisc', 'icv', 15, 70);
addIndexNormEntry('wisc', 'icv', 16, 72);
addIndexNormEntry('wisc', 'icv', 17, 74);
addIndexNormEntry('wisc', 'icv', 18, 76);
addIndexNormEntry('wisc', 'icv', 19, 78);
addIndexNormEntry('wisc', 'icv', 20, 80);
addIndexNormEntry('wisc', 'icv', 21, 82);
addIndexNormEntry('wisc', 'icv', 22, 84);
addIndexNormEntry('wisc', 'icv', 23, 86);
addIndexNormEntry('wisc', 'icv', 24, 88);
addIndexNormEntry('wisc', 'icv', 25, 91);
addIndexNormEntry('wisc', 'icv', 26, 93);
addIndexNormEntry('wisc', 'icv', 27, 95);
addIndexNormEntry('wisc', 'icv', 28, 97);
addIndexNormEntry('wisc', 'icv', 29, 99);
addIndexNormEntry('wisc', 'icv', 30, 101);
addIndexNormEntry('wisc', 'icv', 31, 103);
addIndexNormEntry('wisc', 'icv', 32, 104);
addIndexNormEntry('wisc', 'icv', 33, 106);
addIndexNormEntry('wisc', 'icv', 34, 108);
addIndexNormEntry('wisc', 'icv', 35, 110);
addIndexNormEntry('wisc', 'icv', 36, 111);
addIndexNormEntry('wisc', 'icv', 37, 113);
addIndexNormEntry('wisc', 'icv', 38, 115);
addIndexNormEntry('wisc', 'icv', 39, 117);
addIndexNormEntry('wisc', 'icv', 40, 119);
addIndexNormEntry('wisc', 'icv', 41, 121);
addIndexNormEntry('wisc', 'icv', 42, 123);
addIndexNormEntry('wisc', 'icv', 43, 125);
addIndexNormEntry('wisc', 'icv', 44, 126);
addIndexNormEntry('wisc', 'icv', 45, 128);
addIndexNormEntry('wisc', 'icv', 46, 130);
addIndexNormEntry('wisc', 'icv', 47, 132);
addIndexNormEntry('wisc', 'icv', 48, 134);
addIndexNormEntry('wisc', 'icv', 49, 136);
addIndexNormEntry('wisc', 'icv', 50, 138);
addIndexNormEntry('wisc', 'icv', 51, 141);
addIndexNormEntry('wisc', 'icv', 52, 143);
addIndexNormEntry('wisc', 'icv', 53, 146);
addIndexNormEntry('wisc', 'icv', 54, 148);
addIndexNormEntry('wisc', 'icv', 55, 151);
addIndexNormEntry('wisc', 'icv', 56, 153);
addIndexNormEntry('wisc', 'icv', 57, 155);

// Tabela de conversão: Ponto Composto -> Percentil / Intervalo de Confiança
addCompositeConversionEntry(47, '<0,1', '43-58');
addCompositeConversionEntry(49, '<0,1', '45-60');
addCompositeConversionEntry(51, '0.1', '47-62');
addCompositeConversionEntry(53, '0.1', '49-64');
addCompositeConversionEntry(55, '0.1', '51-65');
addCompositeConversionEntry(57, '0.2', '53-67');
addCompositeConversionEntry(59, '0.3', '55-69');
addCompositeConversionEntry(61, '0.5', '56-71');
addCompositeConversionEntry(63, '1', '58-73');
addCompositeConversionEntry(65, '1', '60-75');
addCompositeConversionEntry(67, '1', '62-77');
addCompositeConversionEntry(70, '2', '65-79');
addCompositeConversionEntry(72, '3', '67-81');
addCompositeConversionEntry(74, '4', '69-83');
addCompositeConversionEntry(76, '5', '70-85');
addCompositeConversionEntry(78, '7', '72-87');
addCompositeConversionEntry(80, '9', '74-89');
addCompositeConversionEntry(82, '12', '76-90');
addCompositeConversionEntry(84, '14', '78-92');
addCompositeConversionEntry(86, '18', '80-94');
addCompositeConversionEntry(88, '21', '82-96');
addCompositeConversionEntry(91, '27', '84-99');
addCompositeConversionEntry(93, '32', '86-101');
addCompositeConversionEntry(95, '37', '88-103');
addCompositeConversionEntry(97, '42', '90-104');
addCompositeConversionEntry(99, '47', '92-106');
addCompositeConversionEntry(101, '53', '94-108');
addCompositeConversionEntry(103, '58', '96-110');
addCompositeConversionEntry(104, '61', '96-111');
addCompositeConversionEntry(106, '66', '98-113');
addCompositeConversionEntry(108, '70', '100-115');
addCompositeConversionEntry(110, '75', '102-117');
addCompositeConversionEntry(111, '77', '103-117');
addCompositeConversionEntry(113, '81', '105-119');
addCompositeConversionEntry(115, '84', '107-121');
addCompositeConversionEntry(117, '87', '109-123');
addCompositeConversionEntry(119, '90', '110-125');
addCompositeConversionEntry(121, '92', '112-127');
addCompositeConversionEntry(123, '94', '114-129');
addCompositeConversionEntry(125, '95', '116-130');
addCompositeConversionEntry(126, '96', '117-131');
addCompositeConversionEntry(128, '97', '119-133');
addCompositeConversionEntry(130, '98', '121-135');
addCompositeConversionEntry(132, '98', '123-137');
addCompositeConversionEntry(134, '99', '124-139');
addCompositeConversionEntry(136, '99', '126-141');
addCompositeConversionEntry(138, '99', '128-143');
addCompositeConversionEntry(141, '99.7', '131-145');
addCompositeConversionEntry(143, '99.8', '133-147');
addCompositeConversionEntry(146, '99.9', '136-150');
addCompositeConversionEntry(148, '99.9', '137-152');
addCompositeConversionEntry(151, '>99,9', '140-155');
addCompositeConversionEntry(153, '>99,9', '142-157');
addCompositeConversionEntry(155, '>99.9', '144-158');

//======================================================================//
//   DADOS DE CONVERSÃO - IOP (Fonte: Planilha Fornecida)
//======================================================================//

// --- Tabela para IOP (Índice de Organização Perceptual) ---
addIndexNormEntry('wisc', 'iop', 4, 47);
addIndexNormEntry('wisc', 'iop', 5, 49);
addIndexNormEntry('wisc', 'iop', 6, 51);
addIndexNormEntry('wisc', 'iop', 7, 53);
addIndexNormEntry('wisc', 'iop', 8, 55);
addIndexNormEntry('wisc', 'iop', 9, 57);
addIndexNormEntry('wisc', 'iop', 10, 59);
addIndexNormEntry('wisc', 'iop', 11, 61);
addIndexNormEntry('wisc', 'iop', 12, 63);
addIndexNormEntry('wisc', 'iop', 13, 65);
addIndexNormEntry('wisc', 'iop', 14, 67);
addIndexNormEntry('wisc', 'iop', 15, 69);
addIndexNormEntry('wisc', 'iop', 16, 71);
addIndexNormEntry('wisc', 'iop', 17, 73);
addIndexNormEntry('wisc', 'iop', 18, 75);
addIndexNormEntry('wisc', 'iop', 19, 77);
addIndexNormEntry('wisc', 'iop', 20, 79);
addIndexNormEntry('wisc', 'iop', 21, 81);
addIndexNormEntry('wisc', 'iop', 22, 83);
addIndexNormEntry('wisc', 'iop', 23, 86);
addIndexNormEntry('wisc', 'iop', 24, 88);
addIndexNormEntry('wisc', 'iop', 25, 90);
addIndexNormEntry('wisc', 'iop', 26, 92);
addIndexNormEntry('wisc', 'iop', 27, 94);
addIndexNormEntry('wisc', 'iop', 28, 96);
addIndexNormEntry('wisc', 'iop', 29, 98);
addIndexNormEntry('wisc', 'iop', 30, 100);
addIndexNormEntry('wisc', 'iop', 31, 102);
addIndexNormEntry('wisc', 'iop', 32, 104);
addIndexNormEntry('wisc', 'iop', 33, 106);
addIndexNormEntry('wisc', 'iop', 34, 108);
addIndexNormEntry('wisc', 'iop', 35, 110);
addIndexNormEntry('wisc', 'iop', 36, 112);
addIndexNormEntry('wisc', 'iop', 37, 114);
addIndexNormEntry('wisc', 'iop', 38, 116);
addIndexNormEntry('wisc', 'iop', 39, 118);
addIndexNormEntry('wisc', 'iop', 40, 120);
addIndexNormEntry('wisc', 'iop', 41, 122);
addIndexNormEntry('wisc', 'iop', 42, 124);
addIndexNormEntry('wisc', 'iop', 43, 126);
addIndexNormEntry('wisc', 'iop', 44, 128);
addIndexNormEntry('wisc', 'iop', 45, 130);
addIndexNormEntry('wisc', 'iop', 46, 132);
addIndexNormEntry('wisc', 'iop', 47, 134);
addIndexNormEntry('wisc', 'iop', 48, 136);
addIndexNormEntry('wisc', 'iop', 49, 138);
addIndexNormEntry('wisc', 'iop', 50, 140);
addIndexNormEntry('wisc', 'iop', 51, 142);
addIndexNormEntry('wisc', 'iop', 52, 144);
addIndexNormEntry('wisc', 'iop', 53, 146);
addIndexNormEntry('wisc', 'iop', 54, 148);
addIndexNormEntry('wisc', 'iop', 55, 150);
addIndexNormEntry('wisc', 'iop', 56, 152);
addIndexNormEntry('wisc', 'iop', 57, 155);

// --- Dados de Percentil e IC para IOP ---
// Nota: Muitos destes podem ser duplicados do ICV, mas adicionamos
// para garantir que quaisquer diferenças sutis na sua planilha sejam capturadas.
addCompositeConversionEntry(47, '<0,1', '43-58');
addCompositeConversionEntry(49, '<0,1', '45-60');
addCompositeConversionEntry(51, '0.1', '47-62');
addCompositeConversionEntry(53, '0.1', '49-64');
addCompositeConversionEntry(55, '0.1', '51-65');
addCompositeConversionEntry(57, '0.2', '53-67');
addCompositeConversionEntry(59, '0.3', '55-69');
addCompositeConversionEntry(61, '0.5', '56-71');
addCompositeConversionEntry(63, '1', '58-73');
addCompositeConversionEntry(65, '1', '60-75');
addCompositeConversionEntry(67, '1', '62-77');
addCompositeConversionEntry(69, '2', '64-78');
addCompositeConversionEntry(71, '3', '66-80');
addCompositeConversionEntry(73, '4', '68-82');
addCompositeConversionEntry(75, '5', '70-84');
addCompositeConversionEntry(77, '6', '71-86');
addCompositeConversionEntry(79, '8', '73-88');
addCompositeConversionEntry(81, '10', '75-90');
addCompositeConversionEntry(83, '13', '77-91');
addCompositeConversionEntry(86, '18', '80-94');
addCompositeConversionEntry(88, '21', '82-96');
addCompositeConversionEntry(90, '25', '83-98');
addCompositeConversionEntry(92, '30', '85-100');
addCompositeConversionEntry(94, '34', '87-102');
addCompositeConversionEntry(96, '39', '89-104');
addCompositeConversionEntry(98, '45', '91-105');
addCompositeConversionEntry(100, '50', '93-107');
addCompositeConversionEntry(102, '55', '95-109');
addCompositeConversionEntry(104, '61', '96-111');
addCompositeConversionEntry(106, '66', '98-113');
addCompositeConversionEntry(108, '70', '100-115');
addCompositeConversionEntry(110, '75', '102-117');
addCompositeConversionEntry(112, '79', '104-118');
addCompositeConversionEntry(114, '82', '106-120');
addCompositeConversionEntry(116, '86', '108-122');
addCompositeConversionEntry(118, '88', '110-124');
addCompositeConversionEntry(120, '91', '111-126');
addCompositeConversionEntry(122, '93', '113-128');
addCompositeConversionEntry(124, '95', '115-130');
addCompositeConversionEntry(126, '96', '117-131');
addCompositeConversionEntry(128, '97', '119-133');
addCompositeConversionEntry(130, '98', '121-135');
addCompositeConversionEntry(132, '98', '123-137');
addCompositeConversionEntry(134, '99', '124-139');
addCompositeConversionEntry(136, '99', '126-141');
addCompositeConversionEntry(138, '99', '128-143');
addCompositeConversionEntry(140, '99.6', '130-144');
addCompositeConversionEntry(142, '99.7', '132-146');
addCompositeConversionEntry(144, '99.8', '134-148');
addCompositeConversionEntry(146, '99.9', '136-150');
addCompositeConversionEntry(148, '99.9', '137-152');
addCompositeConversionEntry(150, '>99,9', '139-154');
addCompositeConversionEntry(152, '>99,9', '141-156');
addCompositeConversionEntry(155, '>99.9', '144-158');

//======================================================================//
//   DADOS DE CONVERSÃO - IMO (Fonte: Planilha Fornecida)
//======================================================================//

// --- Tabela para IMO (Índice de Memória Operacional) ---
addIndexNormEntry('wisc', 'imo', 3, 49);
addIndexNormEntry('wisc', 'imo', 4, 52);
addIndexNormEntry('wisc', 'imo', 5, 56);
addIndexNormEntry('wisc', 'imo', 6, 59);
addIndexNormEntry('wisc', 'imo', 7, 62);
addIndexNormEntry('wisc', 'imo', 8, 65);
addIndexNormEntry('wisc', 'imo', 9, 68);
addIndexNormEntry('wisc', 'imo', 10, 71);
addIndexNormEntry('wisc', 'imo', 11, 74);
addIndexNormEntry('wisc', 'imo', 12, 77);
addIndexNormEntry('wisc', 'imo', 13, 80);
addIndexNormEntry('wisc', 'imo', 14, 83);
addIndexNormEntry('wisc', 'imo', 15, 85);
addIndexNormEntry('wisc', 'imo', 16, 88);
addIndexNormEntry('wisc', 'imo', 17, 91);
addIndexNormEntry('wisc', 'imo', 18, 94);
addIndexNormEntry('wisc', 'imo', 19, 97);
addIndexNormEntry('wisc', 'imo', 20, 100);
addIndexNormEntry('wisc', 'imo', 21, 103);
addIndexNormEntry('wisc', 'imo', 22, 106);
addIndexNormEntry('wisc', 'imo', 23, 109);
addIndexNormEntry('wisc', 'imo', 24, 112);
addIndexNormEntry('wisc', 'imo', 25, 115);
addIndexNormEntry('wisc', 'imo', 26, 118);
addIndexNormEntry('wisc', 'imo', 27, 120);
addIndexNormEntry('wisc', 'imo', 28, 123);
addIndexNormEntry('wisc', 'imo', 29, 126);
addIndexNormEntry('wisc', 'imo', 30, 129);
addIndexNormEntry('wisc', 'imo', 31, 132);
addIndexNormEntry('wisc', 'imo', 32, 135);
addIndexNormEntry('wisc', 'imo', 33, 138);
addIndexNormEntry('wisc', 'imo', 34, 141);
addIndexNormEntry('wisc', 'imo', 35, 144);
addIndexNormEntry('wisc', 'imo', 36, 147);
addIndexNormEntry('wisc', 'imo', 37, 151);
addIndexNormEntry('wisc', 'imo', 38, 155);

// --- Dados de Percentil e IC para IMO ---
addCompositeConversionEntry(49, '<0,1', '45-60');
addCompositeConversionEntry(52, '0.1', '48-63');
addCompositeConversionEntry(56, '0.2', '52-66');
addCompositeConversionEntry(59, '0.3', '55-69');
addCompositeConversionEntry(62, '1', '57-72');
addCompositeConversionEntry(65, '1', '60-75');
addCompositeConversionEntry(68, '2', '63-77');
addCompositeConversionEntry(71, '3', '66-80');
addCompositeConversionEntry(74, '4', '69-83');
addCompositeConversionEntry(77, '6', '71-86');
addCompositeConversionEntry(80, '9', '74-89');
addCompositeConversionEntry(83, '13', '77-91');
addCompositeConversionEntry(85, '16', '79-93');
addCompositeConversionEntry(88, '21', '82-96');
addCompositeConversionEntry(91, '27', '84-99');
addCompositeConversionEntry(94, '34', '87-102');
addCompositeConversionEntry(97, '42', '90-104');
addCompositeConversionEntry(100, '50', '93-107');
addCompositeConversionEntry(103, '58', '96-110');
addCompositeConversionEntry(106, '66', '98-113');
addCompositeConversionEntry(109, '73', '101-116');
addCompositeConversionEntry(112, '79', '104-118');
addCompositeConversionEntry(115, '84', '107-121');
addCompositeConversionEntry(118, '88', '110-124');
addCompositeConversionEntry(120, '91', '111-126');
addCompositeConversionEntry(123, '94', '114-129');
addCompositeConversionEntry(126, '96', '117-131');
addCompositeConversionEntry(129, '97', '120-134');
addCompositeConversionEntry(132, '98', '123-137');
addCompositeConversionEntry(135, '99', '125-140');
addCompositeConversionEntry(138, '99', '128-143');
addCompositeConversionEntry(141, '99.7', '131-145');
addCompositeConversionEntry(144, '99.8', '134-148');
addCompositeConversionEntry(147, '99.9', '136-151');
addCompositeConversionEntry(151, '>99,9', '140-155');
addCompositeConversionEntry(155, '>99,9', '144-158');

//======================================================================//
//   DADOS DE CONVERSÃO - IVP (Fonte: Planilha Fornecida)
//======================================================================//

// --- Tabela para IVP (Índice de Velocidade de Processamento) ---
addIndexNormEntry('wisc', 'ivp', 3, 49);
addIndexNormEntry('wisc', 'ivp', 4, 52);
addIndexNormEntry('wisc', 'ivp', 5, 55);
addIndexNormEntry('wisc', 'ivp', 6, 58);
addIndexNormEntry('wisc', 'ivp', 7, 61);
addIndexNormEntry('wisc', 'ivp', 8, 64);
addIndexNormEntry('wisc', 'ivp', 9, 68);
addIndexNormEntry('wisc', 'ivp', 10, 71);
addIndexNormEntry('wisc', 'ivp', 11, 74);
addIndexNormEntry('wisc', 'ivp', 12, 77);
addIndexNormEntry('wisc', 'ivp', 13, 80);
addIndexNormEntry('wisc', 'ivp', 14, 83);
addIndexNormEntry('wisc', 'ivp', 15, 86);
addIndexNormEntry('wisc', 'ivp', 16, 89);
addIndexNormEntry('wisc', 'ivp', 17, 92);
addIndexNormEntry('wisc', 'ivp', 18, 95);
addIndexNormEntry('wisc', 'ivp', 19, 97);
addIndexNormEntry('wisc', 'ivp', 20, 100);
addIndexNormEntry('wisc', 'ivp', 21, 103);
addIndexNormEntry('wisc', 'ivp', 22, 105);
addIndexNormEntry('wisc', 'ivp', 23, 108);
addIndexNormEntry('wisc', 'ivp', 24, 111);
addIndexNormEntry('wisc', 'ivp', 25, 115);
addIndexNormEntry('wisc', 'ivp', 26, 118);
addIndexNormEntry('wisc', 'ivp', 27, 121);
addIndexNormEntry('wisc', 'ivp', 28, 123);
addIndexNormEntry('wisc', 'ivp', 29, 126);
addIndexNormEntry('wisc', 'ivp', 30, 129);
addIndexNormEntry('wisc', 'ivp', 31, 131);
addIndexNormEntry('wisc', 'ivp', 32, 134);
addIndexNormEntry('wisc', 'ivp', 33, 137);
addIndexNormEntry('wisc', 'ivp', 34, 141);
addIndexNormEntry('wisc', 'ivp', 35, 144);
addIndexNormEntry('wisc', 'ivp', 36, 147);
addIndexNormEntry('wisc', 'ivp', 37, 151);
addIndexNormEntry('wisc', 'ivp', 38, 155);

// --- Dados de Percentil e IC para IVP ---
addCompositeConversionEntry(49, '<0,1', '46-64');
addCompositeConversionEntry(52, '0.1', '49-67');
addCompositeConversionEntry(55, '0.1', '51-69');
addCompositeConversionEntry(58, '0.3', '54-72');
addCompositeConversionEntry(61, '0.5', '57-75');
addCompositeConversionEntry(64, '1', '59-77');
addCompositeConversionEntry(68, '2', '63-81');
addCompositeConversionEntry(71, '3', '66-83');
addCompositeConversionEntry(74, '4', '68-86');
addCompositeConversionEntry(77, '6', '71-89');
addCompositeConversionEntry(80, '9', '73-91');
addCompositeConversionEntry(83, '13', '76-94');
addCompositeConversionEntry(86, '18', '79-97');
addCompositeConversionEntry(89, '23', '81-99');
addCompositeConversionEntry(92, '30', '84-102');
addCompositeConversionEntry(95, '37', '87-105');
addCompositeConversionEntry(97, '42', '88-106');
addCompositeConversionEntry(100, '50', '91-109');
addCompositeConversionEntry(103, '58', '94-112');
addCompositeConversionEntry(105, '63', '95-113');
addCompositeConversionEntry(108, '70', '98-116');
addCompositeConversionEntry(111, '77', '101-119');
addCompositeConversionEntry(115, '84', '104-122');
addCompositeConversionEntry(118, '88', '107-125');
addCompositeConversionEntry(121, '92', '110-127');
addCompositeConversionEntry(123, '94', '111-129');
addCompositeConversionEntry(126, '96', '114-132');
addCompositeConversionEntry(129, '97', '117-134');
addCompositeConversionEntry(131, '98', '118-136');
addCompositeConversionEntry(134, '99', '121-139');
addCompositeConversionEntry(137, '99', '124-142');
addCompositeConversionEntry(141, '99.7', '127-145');
addCompositeConversionEntry(144, '99.8', '130-148');
addCompositeConversionEntry(147, '99.9', '132-150');
addCompositeConversionEntry(151, '>99,9', '136-154');
addCompositeConversionEntry(155, '>99,9', '139-157');

//======================================================================//
//   DADOS DE CONVERSÃO - QIT (Fonte: Planilha Fornecida)
//======================================================================//

// --- Tabela para QIT (Quociente de Inteligência Total) ---
addIndexNormEntry('wisc', 'qit', 11, 40);
addIndexNormEntry('wisc', 'qit', 12, 41);
addIndexNormEntry('wisc', 'qit', 13, 41);
addIndexNormEntry('wisc', 'qit', 14, 42);
addIndexNormEntry('wisc', 'qit', 15, 43);
addIndexNormEntry('wisc', 'qit', 16, 43);
addIndexNormEntry('wisc', 'qit', 17, 44);
addIndexNormEntry('wisc', 'qit', 18, 44);
addIndexNormEntry('wisc', 'qit', 19, 45);
addIndexNormEntry('wisc', 'qit', 20, 46);
addIndexNormEntry('wisc', 'qit', 21, 46);
addIndexNormEntry('wisc', 'qit', 22, 47);
addIndexNormEntry('wisc', 'qit', 23, 47);
addIndexNormEntry('wisc', 'qit', 24, 48);
addIndexNormEntry('wisc', 'qit', 25, 49);
addIndexNormEntry('wisc', 'qit', 26, 49);
addIndexNormEntry('wisc', 'qit', 27, 50);
addIndexNormEntry('wisc', 'qit', 28, 50);
addIndexNormEntry('wisc', 'qit', 29, 51);
addIndexNormEntry('wisc', 'qit', 30, 52);
addIndexNormEntry('wisc', 'qit', 31, 52);
addIndexNormEntry('wisc', 'qit', 32, 53);
addIndexNormEntry('wisc', 'qit', 33, 53);
addIndexNormEntry('wisc', 'qit', 34, 54);
addIndexNormEntry('wisc', 'qit', 35, 55);
addIndexNormEntry('wisc', 'qit', 36, 55);
addIndexNormEntry('wisc', 'qit', 37, 56);
addIndexNormEntry('wisc', 'qit', 38, 56);
addIndexNormEntry('wisc', 'qit', 39, 57);
addIndexNormEntry('wisc', 'qit', 40, 58);
addIndexNormEntry('wisc', 'qit', 41, 58);
addIndexNormEntry('wisc', 'qit', 42, 59);
addIndexNormEntry('wisc', 'qit', 43, 59);
addIndexNormEntry('wisc', 'qit', 44, 60);
addIndexNormEntry('wisc', 'qit', 45, 60);
addIndexNormEntry('wisc', 'qit', 46, 61);
addIndexNormEntry('wisc', 'qit', 47, 61);
addIndexNormEntry('wisc', 'qit', 48, 62);
addIndexNormEntry('wisc', 'qit', 49, 62);
addIndexNormEntry('wisc', 'qit', 50, 63);
addIndexNormEntry('wisc', 'qit', 51, 63);
addIndexNormEntry('wisc', 'qit', 52, 64);
addIndexNormEntry('wisc', 'qit', 53, 65);
addIndexNormEntry('wisc', 'qit', 54, 65);
addIndexNormEntry('wisc', 'qit', 55, 66);
addIndexNormEntry('wisc', 'qit', 56, 67);
addIndexNormEntry('wisc', 'qit', 57, 67);
addIndexNormEntry('wisc', 'qit', 58, 68);
addIndexNormEntry('wisc', 'qit', 59, 69);
addIndexNormEntry('wisc', 'qit', 60, 69);
addIndexNormEntry('wisc', 'qit', 61, 70);
addIndexNormEntry('wisc', 'qit', 62, 71);
addIndexNormEntry('wisc', 'qit', 63, 72);
addIndexNormEntry('wisc', 'qit', 64, 73);
addIndexNormEntry('wisc', 'qit', 65, 73);
addIndexNormEntry('wisc', 'qit', 66, 74);
addIndexNormEntry('wisc', 'qit', 67, 75);
addIndexNormEntry('wisc', 'qit', 68, 76);
addIndexNormEntry('wisc', 'qit', 69, 77);
addIndexNormEntry('wisc', 'qit', 70, 77);
addIndexNormEntry('wisc', 'qit', 71, 78);
addIndexNormEntry('wisc', 'qit', 72, 79);
addIndexNormEntry('wisc', 'qit', 73, 80);
addIndexNormEntry('wisc', 'qit', 74, 81);
addIndexNormEntry('wisc', 'qit', 75, 81);
addIndexNormEntry('wisc', 'qit', 76, 82);
addIndexNormEntry('wisc', 'qit', 77, 83);
addIndexNormEntry('wisc', 'qit', 78, 84);
addIndexNormEntry('wisc', 'qit', 79, 84);
addIndexNormEntry('wisc', 'qit', 80, 85);
addIndexNormEntry('wisc', 'qit', 81, 86);
addIndexNormEntry('wisc', 'qit', 82, 86);
addIndexNormEntry('wisc', 'qit', 83, 87);
addIndexNormEntry('wisc', 'qit', 84, 87);
addIndexNormEntry('wisc', 'qit', 85, 88);
addIndexNormEntry('wisc', 'qit', 86, 89);
addIndexNormEntry('wisc', 'qit', 87, 89);
addIndexNormEntry('wisc', 'qit', 88, 90);
addIndexNormEntry('wisc', 'qit', 89, 91);
addIndexNormEntry('wisc', 'qit', 90, 92);
addIndexNormEntry('wisc', 'qit', 91, 93);
addIndexNormEntry('wisc', 'qit', 92, 94);
addIndexNormEntry('wisc', 'qit', 93, 94);
addIndexNormEntry('wisc', 'qit', 94, 95);
addIndexNormEntry('wisc', 'qit', 95, 96);
addIndexNormEntry('wisc', 'qit', 96, 97);
addIndexNormEntry('wisc', 'qit', 97, 98);
addIndexNormEntry('wisc', 'qit', 98, 98);
addIndexNormEntry('wisc', 'qit', 99, 99);
addIndexNormEntry('wisc', 'qit', 100, 100);
addIndexNormEntry('wisc', 'qit', 101, 101);
addIndexNormEntry('wisc', 'qit', 102, 102);
addIndexNormEntry('wisc', 'qit', 103, 102);
addIndexNormEntry('wisc', 'qit', 104, 103);
addIndexNormEntry('wisc', 'qit', 105, 104);
addIndexNormEntry('wisc', 'qit', 106, 105);
addIndexNormEntry('wisc', 'qit', 107, 105);
addIndexNormEntry('wisc', 'qit', 108, 106);
addIndexNormEntry('wisc', 'qit', 109, 107);
addIndexNormEntry('wisc', 'qit', 110, 107);
addIndexNormEntry('wisc', 'qit', 111, 108);
addIndexNormEntry('wisc', 'qit', 112, 109);
addIndexNormEntry('wisc', 'qit', 113, 110);
addIndexNormEntry('wisc', 'qit', 114, 111);
addIndexNormEntry('wisc', 'qit', 115, 111);
addIndexNormEntry('wisc', 'qit', 116, 112);
addIndexNormEntry('wisc', 'qit', 117, 113);
addIndexNormEntry('wisc', 'qit', 118, 114);
addIndexNormEntry('wisc', 'qit', 119, 114);
addIndexNormEntry('wisc', 'qit', 120, 115);
addIndexNormEntry('wisc', 'qit', 121, 116);
addIndexNormEntry('wisc', 'qit', 122, 117);
addIndexNormEntry('wisc', 'qit', 123, 118);
addIndexNormEntry('wisc', 'qit', 124, 119);
addIndexNormEntry('wisc', 'qit', 125, 119);
addIndexNormEntry('wisc', 'qit', 126, 120);
addIndexNormEntry('wisc', 'qit', 127, 121);
addIndexNormEntry('wisc', 'qit', 128, 122);
addIndexNormEntry('wisc', 'qit', 129, 123);
addIndexNormEntry('wisc', 'qit', 130, 123);
addIndexNormEntry('wisc', 'qit', 131, 124);
addIndexNormEntry('wisc', 'qit', 132, 125);
addIndexNormEntry('wisc', 'qit', 133, 126);
addIndexNormEntry('wisc', 'qit', 134, 126);
addIndexNormEntry('wisc', 'qit', 135, 127);
addIndexNormEntry('wisc', 'qit', 136, 128);
addIndexNormEntry('wisc', 'qit', 137, 129);
addIndexNormEntry('wisc', 'qit', 138, 129);
addIndexNormEntry('wisc', 'qit', 139, 130);
addIndexNormEntry('wisc', 'qit', 140, 131);
addIndexNormEntry('wisc', 'qit', 141, 131);
addIndexNormEntry('wisc', 'qit', 142, 132);
addIndexNormEntry('wisc', 'qit', 143, 133);
addIndexNormEntry('wisc', 'qit', 144, 133);
addIndexNormEntry('wisc', 'qit', 145, 134);
addIndexNormEntry('wisc', 'qit', 146, 134);
addIndexNormEntry('wisc', 'qit', 147, 135);
addIndexNormEntry('wisc', 'qit', 148, 136);
addIndexNormEntry('wisc', 'qit', 149, 136);
addIndexNormEntry('wisc', 'qit', 150, 137);
addIndexNormEntry('wisc', 'qit', 151, 138);
addIndexNormEntry('wisc', 'qit', 152, 138);
addIndexNormEntry('wisc', 'qit', 153, 139);
addIndexNormEntry('wisc', 'qit', 154, 140);
addIndexNormEntry('wisc', 'qit', 155, 140);
addIndexNormEntry('wisc', 'qit', 156, 141);
addIndexNormEntry('wisc', 'qit', 157, 142);
addIndexNormEntry('wisc', 'qit', 158, 142);
addIndexNormEntry('wisc', 'qit', 159, 143);
addIndexNormEntry('wisc', 'qit', 160, 144);
addIndexNormEntry('wisc', 'qit', 161, 144);
addIndexNormEntry('wisc', 'qit', 162, 145);
addIndexNormEntry('wisc', 'qit', 163, 146);
addIndexNormEntry('wisc', 'qit', 164, 146);
addIndexNormEntry('wisc', 'qit', 165, 147);
addIndexNormEntry('wisc', 'qit', 166, 148);
addIndexNormEntry('wisc', 'qit', 167, 148);
addIndexNormEntry('wisc', 'qit', 168, 149);
addIndexNormEntry('wisc', 'qit', 169, 150);
addIndexNormEntry('wisc', 'qit', 170, 150);
addIndexNormEntry('wisc', 'qit', 171, 151);
addIndexNormEntry('wisc', 'qit', 172, 151);
addIndexNormEntry('wisc', 'qit', 173, 152);
addIndexNormEntry('wisc', 'qit', 174, 152);
addIndexNormEntry('wisc', 'qit', 175, 153);
addIndexNormEntry('wisc', 'qit', 176, 153);
addIndexNormEntry('wisc', 'qit', 177, 154);
addIndexNormEntry('wisc', 'qit', 178, 154);
addIndexNormEntry('wisc', 'qit', 179, 155);
addIndexNormEntry('wisc', 'qit', 180, 155);
addIndexNormEntry('wisc', 'qit', 181, 156);
addIndexNormEntry('wisc', 'qit', 182, 156);
addIndexNormEntry('wisc', 'qit', 183, 157);
addIndexNormEntry('wisc', 'qit', 184, 157);
addIndexNormEntry('wisc', 'qit', 185, 158);
addIndexNormEntry('wisc', 'qit', 186, 158);
addIndexNormEntry('wisc', 'qit', 187, 159);
addIndexNormEntry('wisc', 'qit', 188, 159);
addIndexNormEntry('wisc', 'qit', 189, 160);
addIndexNormEntry('wisc', 'qit', 190, 160);

// --- Dados de Percentil e IC para QIT ---
addCompositeConversionEntry(40, '<0,1', '37-47');
addCompositeConversionEntry(41, '<0,1', '38-48');
addCompositeConversionEntry(42, '<0.1', '39-49');
addCompositeConversionEntry(43, '<0.1', '40-50');
addCompositeConversionEntry(44, '<0.1', '41-51');
addCompositeConversionEntry(45, '<0.1', '42-52');
addCompositeConversionEntry(46, '<0.1', '43-53');
addCompositeConversionEntry(47, '<0,1', '44-54');
addCompositeConversionEntry(48, '<0,1', '45-54');
addCompositeConversionEntry(49, '<0,1', '46-55');
addCompositeConversionEntry(50, '<0,1', '47-56');
addCompositeConversionEntry(51, '0.1', '48-57');
addCompositeConversionEntry(52, '0.1', '49-58');
addCompositeConversionEntry(53, '0.1', '49-59');
addCompositeConversionEntry(54, '0.1', '50-60');
addCompositeConversionEntry(55, '0.1', '51-61');
addCompositeConversionEntry(56, '0.2', '52-62');
addCompositeConversionEntry(57, '0.2', '53-63');
addCompositeConversionEntry(58, '0.3', '54-64');
addCompositeConversionEntry(59, '0.3', '55-65');
addCompositeConversionEntry(60, '0.4', '56-66');
addCompositeConversionEntry(61, '0.5', '57-67');
addCompositeConversionEntry(62, '1', '58-68');
addCompositeConversionEntry(63, '1', '59-69');
addCompositeConversionEntry(64, '1', '60-70');
addCompositeConversionEntry(65, '1', '61-71');
addCompositeConversionEntry(66, '1', '62-72');
addCompositeConversionEntry(67, '1', '63-73');
addCompositeConversionEntry(68, '2', '64-74');
addCompositeConversionEntry(69, '2', '65-75');
addCompositeConversionEntry(70, '2', '66-76');
addCompositeConversionEntry(71, '3', '67-77');
addCompositeConversionEntry(72, '3', '68-78');
addCompositeConversionEntry(73, '4', '69-79');
addCompositeConversionEntry(74, '4', '70-80');
addCompositeConversionEntry(75, '5', '71-81');
addCompositeConversionEntry(76, '5', '72-82');
addCompositeConversionEntry(77, '6', '73-83');
addCompositeConversionEntry(78, '7', '74-84');
addCompositeConversionEntry(79, '8', '75-85');
addCompositeConversionEntry(80, '9', '76-86');
addCompositeConversionEntry(81, '10', '77-87');
addCompositeConversionEntry(82, '12', '78-87');
addCompositeConversionEntry(83, '13', '79-88');
addCompositeConversionEntry(84, '14', '80-89');
addCompositeConversionEntry(85, '16', '81-90');
addCompositeConversionEntry(86, '18', '81-91');
addCompositeConversionEntry(87, '19', '82-92');
addCompositeConversionEntry(88, '21', '83-93');
addCompositeConversionEntry(89, '23', '84-94');
addCompositeConversionEntry(90, '25', '85-95');
addCompositeConversionEntry(91, '27', '86-95');
addCompositeConversionEntry(92, '30', '87-97');
addCompositeConversionEntry(93, '32', '88-98');
addCompositeConversionEntry(94, '34', '89-99');
addCompositeConversionEntry(95, '37', '90-100');
addCompositeConversionEntry(96, '39', '91-101');
addCompositeConversionEntry(97, '42', '92-102');
addCompositeConversionEntry(98, '45', '93-103');
addCompositeConversionEntry(99, '47', '94-104');
addCompositeConversionEntry(100, '50', '95-105');
addCompositeConversionEntry(101, '53', '96-106');
addCompositeConversionEntry(102, '55', '97-107');
addCompositeConversionEntry(103, '58', '98-108');
addCompositeConversionEntry(104, '61', '99-109');
addCompositeConversionEntry(105, '63', '100-110');
addCompositeConversionEntry(106, '66', '101-111');
addCompositeConversionEntry(107, '68', '102-112');
addCompositeConversionEntry(108, '70', '103-113');
addCompositeConversionEntry(109, '73', '104-114');
addCompositeConversionEntry(110, '75', '105-115');
addCompositeConversionEntry(111, '77', '106-116');
addCompositeConversionEntry(112, '79', '107-117');
addCompositeConversionEntry(113, '81', '108-118');
addCompositeConversionEntry(114, '82', '109-119');
addCompositeConversionEntry(115, '84', '110-119');
addCompositeConversionEntry(116, '86', '111-120');
addCompositeConversionEntry(117, '87', '112-121');
addCompositeConversionEntry(118, '88', '113-122');
addCompositeConversionEntry(119, '90', '113-123');
addCompositeConversionEntry(120, '91', '114-124');
addCompositeConversionEntry(121, '92', '115-125');
addCompositeConversionEntry(122, '93', '116-126');
addCompositeConversionEntry(123, '94', '117-127');
addCompositeConversionEntry(124, '95', '118-128');
addCompositeConversionEntry(125, '95', '119-129');
addCompositeConversionEntry(126, '96', '120-130');
addCompositeConversionEntry(127, '96', '121-131');
addCompositeConversionEntry(128, '97', '122-132');
addCompositeConversionEntry(129, '97', '123-133');
addCompositeConversionEntry(130, '98', '124-134');
addCompositeConversionEntry(131, '98', '125-135');
addCompositeConversionEntry(132, '98', '126-136');
addCompositeConversionEntry(133, '99', '127-137');
addCompositeConversionEntry(134, '99', '128-138');
addCompositeConversionEntry(135, '99', '129-139');
addCompositeConversionEntry(136, '99', '130-140');
addCompositeConversionEntry(137, '99', '131-141');
addCompositeConversionEntry(138, '99', '132-142');
addCompositeConversionEntry(139, '99.5', '133-143');
addCompositeConversionEntry(140, '99.6', '134-144');
addCompositeConversionEntry(141, '99.7', '135-145');
addCompositeConversionEntry(142, '99.7', '136-146');
addCompositeConversionEntry(143, '99.8', '137-147');
addCompositeConversionEntry(144, '99.8', '138-148');
addCompositeConversionEntry(145, '99.9', '139-149');
addCompositeConversionEntry(146, '99.9', '140-150');
addCompositeConversionEntry(147, '99.9', '141-151');
addCompositeConversionEntry(148, '99.9', '142-151');
addCompositeConversionEntry(149, '99.9', '143-152');
addCompositeConversionEntry(150, '>99,9', '144-153');
addCompositeConversionEntry(151, '>99,9', '145-154');
addCompositeConversionEntry(152, '>99,9', '146-155');
addCompositeConversionEntry(153, '>99,9', '146-156');
addCompositeConversionEntry(154, '>99,9', '147-157');
addCompositeConversionEntry(155, '>99,9', '148-158');
addCompositeConversionEntry(156, '>99,9', '149-159');
addCompositeConversionEntry(157, '>99,9', '150-160');
addCompositeConversionEntry(158, '>99,9', '151-161');
addCompositeConversionEntry(159, '>99,9', '152-162');
addCompositeConversionEntry(160, '>99,9', '153-163');
