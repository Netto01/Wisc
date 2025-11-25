// ======================================================================
// 1. ESTRUTURA BASE DE NORMAS POR ESCALA E SUBTESTE
// ======================================================================
const NORMS_DATA = {
    wisc: {
        sm: {},   // Semelhanças
        vc: {},   // Vocabulário
        co: {},   // Compreensão
        in: {},   // Informação
        rp: {},   // Raciocínio com Palavras
        cb: {},   // Cubos
        cn: {},   // Conceitos Figurativos
        rm: {},   // Raciocínio Matricial
        cf: {},   // Completar Figuras
        dg: {},   // Dígitos
        snl: {},  // Sequência de Números e Letras
        ar: {},   // Aritmética
        cd: {},   // Código
        ps: {},   // Procurar Símbolos
        ca: {}    // Cancelamento
    }
    // Outras escalas como 'wais' e 'wasi' podem ser adicionadas aqui.
};

// ======================================================================
// 2. FUNÇÃO AUXILIAR DE PARSING DE PONTUAÇÃO BRUTA
// ======================================================================
/**
 * Converte uma entrada de ponto bruto (número, faixa ou '-') em um objeto {rawMin, rawMax}.
 * @param {string|number} rawScoreInput - A entrada de ponto bruto (ex: 25, "26-28", "-").
 * @returns {{rawMin: number|null, rawMax: number|null}} Objeto com os limites inferior e superior.
 * @throws {Error} Se a entrada for inválida ou inconsistente.
 */
function _parseRawScore(rawScoreInput) {
    let rawMin = null;
    let rawMax = null;

    if (typeof rawScoreInput === 'number') {
        rawMin = rawMax = rawScoreInput;
    } else if (typeof rawScoreInput === 'string') {
        const trimmedInput = rawScoreInput.trim();

        if (trimmedInput === '-') {
            rawMin = rawMax = null;
        } else if (/^\d+-\d+$/.test(trimmedInput)) {
            const [min, max] = trimmedInput.split('-').map(n => parseInt(n, 10));
            rawMin = min;
            rawMax = max;
        } else if (/^\d+$/.test(trimmedInput)) {
            rawMin = rawMax = parseInt(trimmedInput, 10);
        } else {
            throw new Error(`Formato inválido de entrada: "${rawScoreInput}"`);
        }
    } else {
        throw new Error(`Tipo inválido de entrada: ${typeof rawScoreInput}`);
    }

    if ((rawMin !== null && isNaN(rawMin)) || (rawMax !== null && isNaN(rawMax))) {
        throw new Error(`Valor não numérico encontrado: "${rawScoreInput}"`);
    }

    if (rawMin !== null && rawMax !== null && rawMin > rawMax) {
        throw new Error(`Faixa de ponto bruto invertida: "${rawScoreInput}"`);
    }

    return { rawMin, rawMax };
}

// ======================================================================
// 3. FUNÇÃO PRINCIPAL PARA ADICIONAR NORMAS
// ======================================================================
/**
 * Adiciona uma entrada de norma à estrutura NORMS_DATA.
 * @param {string} scaleType - Ex: "wisc".
 * @param {string} subtestId - Ex: "vc".
 * @param {string} ageRange - Faixa etária em texto (ex: "6-7").
 * @param {string|number} rawScoreInput - Entrada de ponto bruto (ex: 23, "26-28", "-").
 * @param {number} scaledScore - Escore padronizado correspondente.
 */
function addNormEntry(scaleType, subtestId, ageRange, rawScoreInput, scaledScore) {
    if (!NORMS_DATA.hasOwnProperty(scaleType)) {
        console.error(`Erro: Tipo de escala "${scaleType}" não definido.`);
        return;
    }

    if (!NORMS_DATA[scaleType].hasOwnProperty(subtestId)) {
        console.error(`Erro: Subteste "${subtestId}" não encontrado na escala "${scaleType}".`);
        return;
    }

    if (!NORMS_DATA[scaleType][subtestId].hasOwnProperty(ageRange)) {
        NORMS_DATA[scaleType][subtestId][ageRange] = [];
    }

    try {
        const { rawMin, rawMax } = _parseRawScore(rawScoreInput);

        NORMS_DATA[scaleType][subtestId][ageRange].push({
            rawMin,
            rawMax,
            scaled: scaledScore
        });

    } catch (e) {
        console.error(
            `Erro ao adicionar norma para ${scaleType} > ${subtestId} > ${ageRange} com entrada "${rawScoreInput}": ${e.message}`
        );
    }
}

// --- Normas do Subteste Semelhanças (SM) ---

// FAIXA 6-0 — 6 anos (Semelhanças)
addNormEntry("wisc", "sm", "6-0", "-", 1);
addNormEntry("wisc", "sm", "6-0", "-", 2);
addNormEntry("wisc", "sm", "6-0", "-", 3);
addNormEntry("wisc", "sm", "6-0", "-", 4);
addNormEntry("wisc", "sm", "6-0", "0", 5);
addNormEntry("wisc", "sm", "6-0", "-", 6);
addNormEntry("wisc", "sm", "6-0", "1", 7);
addNormEntry("wisc", "sm", "6-0", "2", 8);
addNormEntry("wisc", "sm", "6-0", "3-4", 9);
addNormEntry("wisc", "sm", "6-0", "5", 10);
addNormEntry("wisc", "sm", "6-0", "6-8", 11);
addNormEntry("wisc", "sm", "6-0", "9-11", 12);
addNormEntry("wisc", "sm", "6-0", "12-14", 13);
addNormEntry("wisc", "sm", "6-0", "15-16", 14);
addNormEntry("wisc", "sm", "6-0", "17-18", 15);
addNormEntry("wisc", "sm", "6-0", "19-21", 16);
addNormEntry("wisc", "sm", "6-0", "22-24", 17);
addNormEntry("wisc", "sm", "6-0", "25-27", 18);
addNormEntry("wisc", "sm", "6-0", "28-44", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "6-4", "-", 1);
addNormEntry("wisc", "sm", "6-4", "-", 2);
addNormEntry("wisc", "sm", "6-4", "-", 3);
addNormEntry("wisc", "sm", "6-4", "-", 4);
addNormEntry("wisc", "sm", "6-4", "0", 5);
addNormEntry("wisc", "sm", "6-4", "-", 6);
addNormEntry("wisc", "sm", "6-4", "1", 7);
addNormEntry("wisc", "sm", "6-4", "2-3", 8);
addNormEntry("wisc", "sm", "6-4", "4-5", 9);
addNormEntry("wisc", "sm", "6-4", "6", 10);
addNormEntry("wisc", "sm", "6-4", "7-9", 11);
addNormEntry("wisc", "sm", "6-4", "10-12", 12);
addNormEntry("wisc", "sm", "6-4", "13-14", 13);
addNormEntry("wisc", "sm", "6-4", "15-17", 14);
addNormEntry("wisc", "sm", "6-4", "18-19", 15);
addNormEntry("wisc", "sm", "6-4", "20-22", 16);
addNormEntry("wisc", "sm", "6-4", "23-25", 17);
addNormEntry("wisc", "sm", "6-4", "26-28", 18);
addNormEntry("wisc", "sm", "6-4", "29-44", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "6-8", "-", 1);
addNormEntry("wisc", "sm", "6-8", "-", 2);
addNormEntry("wisc", "sm", "6-8", "-", 3);
addNormEntry("wisc", "sm", "6-8", "0", 4);
addNormEntry("wisc", "sm", "6-8", "-", 5);
addNormEntry("wisc", "sm", "6-8", "1", 6);
addNormEntry("wisc", "sm", "6-8", "2", 7);
addNormEntry("wisc", "sm", "6-8", "3-4", 8);
addNormEntry("wisc", "sm", "6-8", "5-6", 9);
addNormEntry("wisc", "sm", "6-8", "7", 10);
addNormEntry("wisc", "sm", "6-8", "8-10", 11);
addNormEntry("wisc", "sm", "6-8", "11-13", 12);
addNormEntry("wisc", "sm", "6-8", "14-15", 13);
addNormEntry("wisc", "sm", "6-8", "16-18", 14);
addNormEntry("wisc", "sm", "6-8", "19-20", 15);
addNormEntry("wisc", "sm", "6-8", "21-23", 16);
addNormEntry("wisc", "sm", "6-8", "24-26", 17);
addNormEntry("wisc", "sm", "6-8", "27-29", 18);
addNormEntry("wisc", "sm", "6-8", "30-44", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "7-0", "-", 1);
addNormEntry("wisc", "sm", "7-0", "-", 2);
addNormEntry("wisc", "sm", "7-0", "-", 3);
addNormEntry("wisc", "sm", "7-0", "0", 4);
addNormEntry("wisc", "sm", "7-0", "-", 5);
addNormEntry("wisc", "sm", "7-0", "1", 6);
addNormEntry("wisc", "sm", "7-0", "2", 7);
addNormEntry("wisc", "sm", "7-0", "3-4", 8);
addNormEntry("wisc", "sm", "7-0", "5-6", 9);
addNormEntry("wisc", "sm", "7-0", "7-8", 10);
addNormEntry("wisc", "sm", "7-0", "9-11", 11);
addNormEntry("wisc", "sm", "7-0", "12-13", 12);
addNormEntry("wisc", "sm", "7-0", "14-16", 13);
addNormEntry("wisc", "sm", "7-0", "17-19", 14);
addNormEntry("wisc", "sm", "7-0", "20-21", 15);
addNormEntry("wisc", "sm", "7-0", "22-24", 16);
addNormEntry("wisc", "sm", "7-0", "25-27", 17);
addNormEntry("wisc", "sm", "7-0", "28-30", 18);
addNormEntry("wisc", "sm", "7-0", "31-44", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "7-4", "-", 1);
addNormEntry("wisc", "sm", "7-4", "-", 2);
addNormEntry("wisc", "sm", "7-4", "-", 3);
addNormEntry("wisc", "sm", "7-4", "0", 4);
addNormEntry("wisc", "sm", "7-4", "1", 5);
addNormEntry("wisc", "sm", "7-4", "2", 6);
addNormEntry("wisc", "sm", "7-4", "3", 7);
addNormEntry("wisc", "sm", "7-4", "4-5", 8);
addNormEntry("wisc", "sm", "7-4", "6-7", 9);
addNormEntry("wisc", "sm", "7-4", "8-9", 10);
addNormEntry("wisc", "sm", "7-4", "10-12", 11);
addNormEntry("wisc", "sm", "7-4", "13-14", 12);
addNormEntry("wisc", "sm", "7-4", "15-17", 13);
addNormEntry("wisc", "sm", "7-4", "18-19", 14);
addNormEntry("wisc", "sm", "7-4", "20-22", 15);
addNormEntry("wisc", "sm", "7-4", "23-25", 16);
addNormEntry("wisc", "sm", "7-4", "26-28", 17);
addNormEntry("wisc", "sm", "7-4", "29-30", 18);
addNormEntry("wisc", "sm", "7-4", "31-44", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "7-8", "-", 1);
addNormEntry("wisc", "sm", "7-8", "-", 2);
addNormEntry("wisc", "sm", "7-8", "-", 3);
addNormEntry("wisc", "sm", "7-8", "0", 4);
addNormEntry("wisc", "sm", "7-8", "1", 5);
addNormEntry("wisc", "sm", "7-8", "2", 6);
addNormEntry("wisc", "sm", "7-8", "3-4", 7);
addNormEntry("wisc", "sm", "7-8", "5-6", 8);
addNormEntry("wisc", "sm", "7-8", "7-8", 9);
addNormEntry("wisc", "sm", "7-8", "9-10", 10);
addNormEntry("wisc", "sm", "7-8", "11-13", 11);
addNormEntry("wisc", "sm", "7-8", "14-15", 12);
addNormEntry("wisc", "sm", "7-8", "16-18", 13);
addNormEntry("wisc", "sm", "7-8", "19-20", 14);
addNormEntry("wisc", "sm", "7-8", "21-23", 15);
addNormEntry("wisc", "sm", "7-8", "24-25", 16);
addNormEntry("wisc", "sm", "7-8", "26-28", 17);
addNormEntry("wisc", "sm", "7-8", "29-31", 18);
addNormEntry("wisc", "sm", "7-8", "32-44", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "8-0", "-", 1);
addNormEntry("wisc", "sm", "8-0", "-", 2);
addNormEntry("wisc", "sm", "8-0", "-", 3);
addNormEntry("wisc", "sm", "8-0", "0", 4);
addNormEntry("wisc", "sm", "8-0", "1", 5);
addNormEntry("wisc", "sm", "8-0", "2-3", 6);
addNormEntry("wisc", "sm", "8-0", "4-5", 7);
addNormEntry("wisc", "sm", "8-0", "6-7", 8);
addNormEntry("wisc", "sm", "8-0", "8-9", 9);
addNormEntry("wisc", "sm", "8-0", "10-11", 10);
addNormEntry("wisc", "sm", "8-0", "12-14", 11);
addNormEntry("wisc", "sm", "8-0", "15-16", 12);
addNormEntry("wisc", "sm", "8-0", "17-18", 13);
addNormEntry("wisc", "sm", "8-0", "19-21", 14);
addNormEntry("wisc", "sm", "8-0", "22-24", 15);
addNormEntry("wisc", "sm", "8-0", "25-26", 16);
addNormEntry("wisc", "sm", "8-0", "27-29", 17);
addNormEntry("wisc", "sm", "8-0", "30-31", 18);
addNormEntry("wisc", "sm", "8-0", "32-44", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "8-4", "-", 1);
addNormEntry("wisc", "sm", "8-4", "-", 2);
addNormEntry("wisc", "sm", "8-4", "0", 3);
addNormEntry("wisc", "sm", "8-4", "-", 4);
addNormEntry("wisc", "sm", "8-4", "1-2", 5);
addNormEntry("wisc", "sm", "8-4", "3-4", 6);
addNormEntry("wisc", "sm", "8-4", "5-6", 7);
addNormEntry("wisc", "sm", "8-4", "7-8", 8);
addNormEntry("wisc", "sm", "8-4", "9-10", 9);
addNormEntry("wisc", "sm", "8-4", "11-12", 10);
addNormEntry("wisc", "sm", "8-4", "13-14", 11);
addNormEntry("wisc", "sm", "8-4", "15-17", 12);
addNormEntry("wisc", "sm", "8-4", "18-19", 13);
addNormEntry("wisc", "sm", "8-4", "20-22", 14);
addNormEntry("wisc", "sm", "8-4", "23-24", 15);
addNormEntry("wisc", "sm", "8-4", "25-27", 16);
addNormEntry("wisc", "sm", "8-4", "28-30", 17);
addNormEntry("wisc", "sm", "8-4", "31-32", 18);
addNormEntry("wisc", "sm", "8-4", "33-44", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "8-8", "-", 1);
addNormEntry("wisc", "sm", "8-8", "0", 2);
addNormEntry("wisc", "sm", "8-8", "-", 3);
addNormEntry("wisc", "sm", "8-8", "1", 4);
addNormEntry("wisc", "sm", "8-8", "2", 5);
addNormEntry("wisc", "sm", "8-8", "3-4", 6);
addNormEntry("wisc", "sm", "8-8", "5-6", 7);
addNormEntry("wisc", "sm", "8-8", "7-9", 8);
addNormEntry("wisc", "sm", "8-8", "10-11", 9);
addNormEntry("wisc", "sm", "8-8", "12-13", 10);
addNormEntry("wisc", "sm", "8-8", "14-15", 11);
addNormEntry("wisc", "sm", "8-8", "16-18", 12);
addNormEntry("wisc", "sm", "8-8", "19-20", 13);
addNormEntry("wisc", "sm", "8-8", "21-23", 14);
addNormEntry("wisc", "sm", "8-8", "24-25", 15);
addNormEntry("wisc", "sm", "8-8", "26-28", 16);
addNormEntry("wisc", "sm", "8-8", "29-30", 17);
addNormEntry("wisc", "sm", "8-8", "31-32", 18);
addNormEntry("wisc", "sm", "8-8", "33-44", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "9-0", "-", 1);
addNormEntry("wisc", "sm", "9-0", "0", 2);
addNormEntry("wisc", "sm", "9-0", "-", 3);
addNormEntry("wisc", "sm", "9-0", "1", 4);
addNormEntry("wisc", "sm", "9-0", "2-3", 5);
addNormEntry("wisc", "sm", "9-0", "4-5", 6);
addNormEntry("wisc", "sm", "9-0", "6-7", 7);
addNormEntry("wisc", "sm", "9-0", "8-9", 8);
addNormEntry("wisc", "sm", "9-0", "10-12", 9);
addNormEntry("wisc", "sm", "9-0", "13-14", 10);
addNormEntry("wisc", "sm", "9-0", "15-16", 11);
addNormEntry("wisc", "sm", "9-0", "17-19", 12);
addNormEntry("wisc", "sm", "9-0", "20-21", 13);
addNormEntry("wisc", "sm", "9-0", "22-24", 14);
addNormEntry("wisc", "sm", "9-0", "25-26", 15);
addNormEntry("wisc", "sm", "9-0", "27-28", 16);
addNormEntry("wisc", "sm", "9-0", "29-31", 17);
addNormEntry("wisc", "sm", "9-0", "32-33", 18);
addNormEntry("wisc", "sm", "9-0", "34-44", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "9-4", "0", 1);
addNormEntry("wisc", "sm", "9-4", "-", 2);
addNormEntry("wisc", "sm", "9-4", "1", 3);
addNormEntry("wisc", "sm", "9-4", "2", 4);
addNormEntry("wisc", "sm", "9-4", "3-4", 5);
addNormEntry("wisc", "sm", "9-4", "5-6", 6);
addNormEntry("wisc", "sm", "9-4", "7-8", 7);
addNormEntry("wisc", "sm", "9-4", "9-10", 8);
addNormEntry("wisc", "sm", "9-4", "11-13", 9);
addNormEntry("wisc", "sm", "9-4", "14-15", 10);
addNormEntry("wisc", "sm", "9-4", "16-17", 11);
addNormEntry("wisc", "sm", "9-4", "18-20", 12);
addNormEntry("wisc", "sm", "9-4", "21-22", 13);
addNormEntry("wisc", "sm", "9-4", "23-24", 14);
addNormEntry("wisc", "sm", "9-4", "25-27", 15);
addNormEntry("wisc", "sm", "9-4", "28-29", 16);
addNormEntry("wisc", "sm", "9-4", "30-31", 17);
addNormEntry("wisc", "sm", "9-4", "32-33", 18);
addNormEntry("wisc", "sm", "9-4", "34-44", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "9-8", "0", 1);
addNormEntry("wisc", "sm", "9-8", "-", 2);
addNormEntry("wisc", "sm", "9-8", "1", 3);
addNormEntry("wisc", "sm", "9-8", "2", 4);
addNormEntry("wisc", "sm", "9-8", "3-4", 5);
addNormEntry("wisc", "sm", "9-8", "5-7", 6);
addNormEntry("wisc", "sm", "9-8", "8-9", 7);
addNormEntry("wisc", "sm", "9-8", "10-11", 8);
addNormEntry("wisc", "sm", "9-8", "12-13", 9);
addNormEntry("wisc", "sm", "9-8", "14-16", 10);
addNormEntry("wisc", "sm", "9-8", "17-18", 11);
addNormEntry("wisc", "sm", "9-8", "19-21", 12);
addNormEntry("wisc", "sm", "9-8", "22-23", 13);
addNormEntry("wisc", "sm", "9-8", "24-25", 14);
addNormEntry("wisc", "sm", "9-8", "26-28", 15);
addNormEntry("wisc", "sm", "9-8", "29-30", 16);
addNormEntry("wisc", "sm", "9-8", "31-32", 17);
addNormEntry("wisc", "sm", "9-8", "33-34", 18);
addNormEntry("wisc", "sm", "9-8", "35-44", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "10-0", "0", 1);
addNormEntry("wisc", "sm", "10-0", "-", 2);
addNormEntry("wisc", "sm", "10-0", "1", 3);
addNormEntry("wisc", "sm", "10-0", "2", 4);
addNormEntry("wisc", "sm", "10-0", "3-5", 5);
addNormEntry("wisc", "sm", "10-0", "6-7", 6);
addNormEntry("wisc", "sm", "10-0", "8-10", 7);
addNormEntry("wisc", "sm", "10-0", "11-12", 8);
addNormEntry("wisc", "sm", "10-0", "13-14", 9);
addNormEntry("wisc", "sm", "10-0", "15-17", 10);
addNormEntry("wisc", "sm", "10-0", "18-19", 11);
addNormEntry("wisc", "sm", "10-0", "20-21", 12);
addNormEntry("wisc", "sm", "10-0", "22-23", 13);
addNormEntry("wisc", "sm", "10-0", "24-26", 14);
addNormEntry("wisc", "sm", "10-0", "27-28", 15);
addNormEntry("wisc", "sm", "10-0", "29-30", 16);
addNormEntry("wisc", "sm", "10-0", "31-32", 17);
addNormEntry("wisc", "sm", "10-0", "33-34", 18);
addNormEntry("wisc", "sm", "10-0", "35-44", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "10-4", "0", 1);
addNormEntry("wisc", "sm", "10-4", "-", 2);
addNormEntry("wisc", "sm", "10-4", "1", 3);
addNormEntry("wisc", "sm", "10-4", "2-3", 4);
addNormEntry("wisc", "sm", "10-4", "4-5", 5);
addNormEntry("wisc", "sm", "10-4", "6-8", 6);
addNormEntry("wisc", "sm", "10-4", "9-10", 7);
addNormEntry("wisc", "sm", "10-4", "11-13", 8);
addNormEntry("wisc", "sm", "10-4", "14-15", 9);
addNormEntry("wisc", "sm", "10-4", "16-17", 10);
addNormEntry("wisc", "sm", "10-4", "18-20", 11);
addNormEntry("wisc", "sm", "10-4", "21-22", 12);
addNormEntry("wisc", "sm", "10-4", "23-24", 13);
addNormEntry("wisc", "sm", "10-4", "25-27", 14);
addNormEntry("wisc", "sm", "10-4", "28-29", 15);
addNormEntry("wisc", "sm", "10-4", "30-31", 16);
addNormEntry("wisc", "sm", "10-4", "32-33", 17);
addNormEntry("wisc", "sm", "10-4", "34-35", 18);
addNormEntry("wisc", "sm", "10-4", "36-44", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "10-8", "0", 1);
addNormEntry("wisc", "sm", "10-8", "-", 2);
addNormEntry("wisc", "sm", "10-8", "1", 3);
addNormEntry("wisc", "sm", "10-8", "2-3", 4);
addNormEntry("wisc", "sm", "10-8", "4-6", 5);
addNormEntry("wisc", "sm", "10-8", "7-8", 6);
addNormEntry("wisc", "sm", "10-8", "9-11", 7);
addNormEntry("wisc", "sm", "10-8", "12-13", 8);
addNormEntry("wisc", "sm", "10-8", "14-16", 9);
addNormEntry("wisc", "sm", "10-8", "17-18", 10);
addNormEntry("wisc", "sm", "10-8", "19-21", 11);
addNormEntry("wisc", "sm", "10-8", "22-23", 12);
addNormEntry("wisc", "sm", "10-8", "24-25", 13);
addNormEntry("wisc", "sm", "10-8", "26-28", 14);
addNormEntry("wisc", "sm", "10-8", "29-30", 15);
addNormEntry("wisc", "sm", "10-8", "31-32", 16);
addNormEntry("wisc", "sm", "10-8", "33", 17);
addNormEntry("wisc", "sm", "10-8", "34-35", 18);
addNormEntry("wisc", "sm", "10-8", "36-44", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "11-0", "0", 1);
addNormEntry("wisc", "sm", "11-0", "-", 2);
addNormEntry("wisc", "sm", "11-0", "1", 3);
addNormEntry("wisc", "sm", "11-0", "2-4", 4);
addNormEntry("wisc", "sm", "11-0", "5-6", 5);
addNormEntry("wisc", "sm", "11-0", "7-9", 6);
addNormEntry("wisc", "sm", "11-0", "10-12", 7);
addNormEntry("wisc", "sm", "11-0", "13-14", 8);
addNormEntry("wisc", "sm", "11-0", "15-17", 9);
addNormEntry("wisc", "sm", "11-0", "18-19", 10);
addNormEntry("wisc", "sm", "11-0", "20-22", 11);
addNormEntry("wisc", "sm", "11-0", "23-24", 12);
addNormEntry("wisc", "sm", "11-0", "25-26", 13);
addNormEntry("wisc", "sm", "11-0", "27-28", 14);
addNormEntry("wisc", "sm", "11-0", "29-30", 15);
addNormEntry("wisc", "sm", "11-0", "31-32", 16);
addNormEntry("wisc", "sm", "11-0", "33-34", 17);
addNormEntry("wisc", "sm", "11-0", "35", 18);
addNormEntry("wisc", "sm", "11-0", "36-44", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "11-4", "0", 1);
addNormEntry("wisc", "sm", "11-4", "1", 2);
addNormEntry("wisc", "sm", "11-4", "2", 3);
addNormEntry("wisc", "sm", "11-4", "3-4", 4);
addNormEntry("wisc", "sm", "11-4", "5-7", 5);
addNormEntry("wisc", "sm", "11-4", "8-10", 6);
addNormEntry("wisc", "sm", "11-4", "11-12", 7);
addNormEntry("wisc", "sm", "11-4", "13-14", 8);
addNormEntry("wisc", "sm", "11-4", "15-17", 9);
addNormEntry("wisc", "sm", "11-4", "18-20", 10);
addNormEntry("wisc", "sm", "11-4", "21-23", 11);
addNormEntry("wisc", "sm", "11-4", "24-25", 12);
addNormEntry("wisc", "sm", "11-4", "26-27", 13);
addNormEntry("wisc", "sm", "11-4", "28-29", 14);
addNormEntry("wisc", "sm", "11-4", "30-31", 15);
addNormEntry("wisc", "sm", "11-4", "32", 16);
addNormEntry("wisc", "sm", "11-4", "33-34", 17);
addNormEntry("wisc", "sm", "11-4", "35-36", 18);
addNormEntry("wisc", "sm", "11-4", "37-44", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "11-8", "0", 1);
addNormEntry("wisc", "sm", "11-8", "1", 2);
addNormEntry("wisc", "sm", "11-8", "2", 3);
addNormEntry("wisc", "sm", "11-8", "3-4", 4);
addNormEntry("wisc", "sm", "11-8", "5-7", 5);
addNormEntry("wisc", "sm", "11-8", "8-10", 6);
addNormEntry("wisc", "sm", "11-8", "11-13", 7);
addNormEntry("wisc", "sm", "11-8", "14-15", 8);
addNormEntry("wisc", "sm", "11-8", "16-18", 9);
addNormEntry("wisc", "sm", "11-8", "19-20", 10);
addNormEntry("wisc", "sm", "11-8", "21-23", 11);
addNormEntry("wisc", "sm", "11-8", "24-25", 12);
addNormEntry("wisc", "sm", "11-8", "26-27", 13);
addNormEntry("wisc", "sm", "11-8", "28-29", 14);
addNormEntry("wisc", "sm", "11-8", "30-31", 15);
addNormEntry("wisc", "sm", "11-8", "32-33", 16);
addNormEntry("wisc", "sm", "11-8", "34", 17);
addNormEntry("wisc", "sm", "11-8", "35-36", 18);
addNormEntry("wisc", "sm", "11-8", "37-44", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "12-0", "0", 1);
addNormEntry("wisc", "sm", "12-0", "1", 2);
addNormEntry("wisc", "sm", "12-0", "2", 3);
addNormEntry("wisc", "sm", "12-0", "3-4", 4);
addNormEntry("wisc", "sm", "12-0", "5-7", 5);
addNormEntry("wisc", "sm", "12-0", "8-10", 6);
addNormEntry("wisc", "sm", "12-0", "11-13", 7);
addNormEntry("wisc", "sm", "12-0", "14-15", 8);
addNormEntry("wisc", "sm", "12-0", "16-18", 9);
addNormEntry("wisc", "sm", "12-0", "19-21", 10);
addNormEntry("wisc", "sm", "12-0", "22-24", 11);
addNormEntry("wisc", "sm", "12-0", "25-26", 12);
addNormEntry("wisc", "sm", "12-0", "27-28", 13);
addNormEntry("wisc", "sm", "12-0", "29-30", 14);
addNormEntry("wisc", "sm", "12-0", "31-32", 15);
addNormEntry("wisc", "sm", "12-0", "33", 16);
addNormEntry("wisc", "sm", "12-0", "34-35", 17);
addNormEntry("wisc", "sm", "12-0", "36", 18);
addNormEntry("wisc", "sm", "12-0", "37-44", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "12-4", "0", 1);
addNormEntry("wisc", "sm", "12-4", "1", 2);
addNormEntry("wisc", "sm", "12-4", "2", 3);
addNormEntry("wisc", "sm", "12-4", "3-4", 4);
addNormEntry("wisc", "sm", "12-4", "5-8", 5);
addNormEntry("wisc", "sm", "12-4", "9-11", 6);
addNormEntry("wisc", "sm", "12-4", "12-14", 7);
addNormEntry("wisc", "sm", "12-4", "15-16", 8);
addNormEntry("wisc", "sm", "12-4", "17-19", 9);
addNormEntry("wisc", "sm", "12-4", "20-22", 10);
addNormEntry("wisc", "sm", "12-4", "23-24", 11);
addNormEntry("wisc", "sm", "12-4", "25-26", 12);
addNormEntry("wisc", "sm", "12-4", "27-28", 13);
addNormEntry("wisc", "sm", "12-4", "29-30", 14);
addNormEntry("wisc", "sm", "12-4", "31-32", 15);
addNormEntry("wisc", "sm", "12-4", "33-34", 16);
addNormEntry("wisc", "sm", "12-4", "35", 17);
addNormEntry("wisc", "sm", "12-4", "36", 18);
addNormEntry("wisc", "sm", "12-4", "37-44", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "12-8", "0", 1);
addNormEntry("wisc", "sm", "12-8", "1", 2);
addNormEntry("wisc", "sm", "12-8", "2-3", 3);
addNormEntry("wisc", "sm", "12-8", "4-5", 4);
addNormEntry("wisc", "sm", "12-8", "6-8", 5);
addNormEntry("wisc", "sm", "12-8", "9-11", 6);
addNormEntry("wisc", "sm", "12-8", "12-14", 7);
addNormEntry("wisc", "sm", "12-8", "15-17", 8);
addNormEntry("wisc", "sm", "12-8", "18-19", 9);
addNormEntry("wisc", "sm", "12-8", "20-22", 10);
addNormEntry("wisc", "sm", "12-8", "23-25", 11);
addNormEntry("wisc", "sm", "12-8", "26-27", 12);
addNormEntry("wisc", "sm", "12-8", "28-29", 13);
addNormEntry("wisc", "sm", "12-8", "30-31", 14);
addNormEntry("wisc", "sm", "12-8", "32-33", 15);
addNormEntry("wisc", "sm", "12-8", "34", 16);
addNormEntry("wisc", "sm", "12-8", "35-36", 17);
addNormEntry("wisc", "sm", "12-8", "-", 18);
addNormEntry("wisc", "sm", "12-8", "37-44", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "13-0", "0", 1);
addNormEntry("wisc", "sm", "13-0", "1", 2);
addNormEntry("wisc", "sm", "13-0", "2-3", 3);
addNormEntry("wisc", "sm", "13-0", "4-5", 4);
addNormEntry("wisc", "sm", "13-0", "6-8", 5);
addNormEntry("wisc", "sm", "13-0", "9-12", 6);
addNormEntry("wisc", "sm", "13-0", "13-15", 7);
addNormEntry("wisc", "sm", "13-0", "16-17", 8);
addNormEntry("wisc", "sm", "13-0", "18-20", 9);
addNormEntry("wisc", "sm", "13-0", "21-23", 10);
addNormEntry("wisc", "sm", "13-0", "24-25", 11);
addNormEntry("wisc", "sm", "13-0", "26-28", 12);
addNormEntry("wisc", "sm", "13-0", "29-30", 13);
addNormEntry("wisc", "sm", "13-0", "31-32", 14);
addNormEntry("wisc", "sm", "13-0", "33", 15);
addNormEntry("wisc", "sm", "13-0", "34-35", 16);
addNormEntry("wisc", "sm", "13-0", "36", 17);
addNormEntry("wisc", "sm", "13-0", "37", 18);
addNormEntry("wisc", "sm", "13-0", "38-44", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "13-4", "0", 1);
addNormEntry("wisc", "sm", "13-4", "1", 2);
addNormEntry("wisc", "sm", "13-4", "2-3", 3);
addNormEntry("wisc", "sm", "13-4", "4-5", 4);
addNormEntry("wisc", "sm", "13-4", "6-8", 5);
addNormEntry("wisc", "sm", "13-4", "9-12", 6);
addNormEntry("wisc", "sm", "13-4", "13-15", 7);
addNormEntry("wisc", "sm", "13-4", "16-18", 8);
addNormEntry("wisc", "sm", "13-4", "19-20", 9);
addNormEntry("wisc", "sm", "13-4", "21-23", 10);
addNormEntry("wisc", "sm", "13-4", "24-26", 11);
addNormEntry("wisc", "sm", "13-4", "27-28", 12);
addNormEntry("wisc", "sm", "13-4", "29-30", 13);
addNormEntry("wisc", "sm", "13-4", "31-32", 14);
addNormEntry("wisc", "sm", "13-4", "33-34", 15);
addNormEntry("wisc", "sm", "13-4", "35", 16);
addNormEntry("wisc", "sm", "13-4", "36", 17);
addNormEntry("wisc", "sm", "13-4", "37", 18);
addNormEntry("wisc", "sm", "13-4", "38-44", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "13-8", "0", 1);
addNormEntry("wisc", "sm", "13-8", "1", 2);
addNormEntry("wisc", "sm", "13-8", "2-3", 3);
addNormEntry("wisc", "sm", "13-8", "4-5", 4);
addNormEntry("wisc", "sm", "13-8", "6-9", 5);
addNormEntry("wisc", "sm", "13-8", "10-13", 6);
addNormEntry("wisc", "sm", "13-8", "14-16", 7);
addNormEntry("wisc", "sm", "13-8", "17-18", 8);
addNormEntry("wisc", "sm", "13-8", "19-21", 9);
addNormEntry("wisc", "sm", "13-8", "22-24", 10);
addNormEntry("wisc", "sm", "13-8", "25-26", 11);
addNormEntry("wisc", "sm", "13-8", "27-29", 12);
addNormEntry("wisc", "sm", "13-8", "30-31", 13);
addNormEntry("wisc", "sm", "13-8", "32-33", 14);
addNormEntry("wisc", "sm", "13-8", "34", 15);
addNormEntry("wisc", "sm", "13-8", "35-36", 16);
addNormEntry("wisc", "sm", "13-8", "37", 17);
addNormEntry("wisc", "sm", "13-8", "-", 18);
addNormEntry("wisc", "sm", "13-8", "38-44", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "14-0", "0", 1);
addNormEntry("wisc", "sm", "14-0", "1", 2);
addNormEntry("wisc", "sm", "14-0", "2-3", 3);
addNormEntry("wisc", "sm", "14-0", "4-6", 4);
addNormEntry("wisc", "sm", "14-0", "7-9", 5);
addNormEntry("wisc", "sm", "14-0", "10-13", 6);
addNormEntry("wisc", "sm", "14-0", "14-16", 7);
addNormEntry("wisc", "sm", "14-0", "17-19", 8);
addNormEntry("wisc", "sm", "14-0", "20-22", 9);
addNormEntry("wisc", "sm", "14-0", "23-25", 10);
addNormEntry("wisc", "sm", "14-0", "26-27", 11);
addNormEntry("wisc", "sm", "14-0", "28-29", 12);
addNormEntry("wisc", "sm", "14-0", "30-31", 13);
addNormEntry("wisc", "sm", "14-0", "32-33", 14);
addNormEntry("wisc", "sm", "14-0", "34-35", 15);
addNormEntry("wisc", "sm", "14-0", "36", 16);
addNormEntry("wisc", "sm", "14-0", "37", 17);
addNormEntry("wisc", "sm", "14-0", "38", 18);
addNormEntry("wisc", "sm", "14-0", "39-44", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "14-4", "0", 1);
addNormEntry("wisc", "sm", "14-4", "1", 2);
addNormEntry("wisc", "sm", "14-4", "2-3", 3);
addNormEntry("wisc", "sm", "14-4", "4-6", 4);
addNormEntry("wisc", "sm", "14-4", "7-9", 5);
addNormEntry("wisc", "sm", "14-4", "10-13", 6);
addNormEntry("wisc", "sm", "14-4", "14-16", 7);
addNormEntry("wisc", "sm", "14-4", "17-19", 8);
addNormEntry("wisc", "sm", "14-4", "20-23", 9);
addNormEntry("wisc", "sm", "14-4", "24-25", 10);
addNormEntry("wisc", "sm", "14-4", "26-28", 11);
addNormEntry("wisc", "sm", "14-4", "29-30", 12);
addNormEntry("wisc", "sm", "14-4", "31-32", 13);
addNormEntry("wisc", "sm", "14-4", "33", 14);
addNormEntry("wisc", "sm", "14-4", "34-35", 15);
addNormEntry("wisc", "sm", "14-4", "36", 16);
addNormEntry("wisc", "sm", "14-4", "37", 17);
addNormEntry("wisc", "sm", "14-4", "38", 18);
addNormEntry("wisc", "sm", "14-4", "39-44", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "14-8", "0", 1);
addNormEntry("wisc", "sm", "14-8", "1", 2);
addNormEntry("wisc", "sm", "14-8", "2-3", 3);
addNormEntry("wisc", "sm", "14-8", "4-6", 4);
addNormEntry("wisc", "sm", "14-8", "7-10", 5);
addNormEntry("wisc", "sm", "14-8", "11-14", 6);
addNormEntry("wisc", "sm", "14-8", "15-17", 7);
addNormEntry("wisc", "sm", "14-8", "18-20", 8);
addNormEntry("wisc", "sm", "14-8", "21-23", 9);
addNormEntry("wisc", "sm", "14-8", "24-26", 10);
addNormEntry("wisc", "sm", "14-8", "27-28", 11);
addNormEntry("wisc", "sm", "14-8", "29-30", 12);
addNormEntry("wisc", "sm", "14-8", "31-32", 13);
addNormEntry("wisc", "sm", "14-8", "33-34", 14);
addNormEntry("wisc", "sm", "14-8", "35", 15);
addNormEntry("wisc", "sm", "14-8", "36", 16);
addNormEntry("wisc", "sm", "14-8", "37", 17);
addNormEntry("wisc", "sm", "14-8", "38", 18);
addNormEntry("wisc", "sm", "14-8", "39-44", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "15-0", "0", 1);
addNormEntry("wisc", "sm", "15-0", "1", 2);
addNormEntry("wisc", "sm", "15-0", "2-3", 3);
addNormEntry("wisc", "sm", "15-0", "4-6", 4);
addNormEntry("wisc", "sm", "15-0", "7-10", 5);
addNormEntry("wisc", "sm", "15-0", "11-14", 6);
addNormEntry("wisc", "sm", "15-0", "15-17", 7);
addNormEntry("wisc", "sm", "15-0", "18-20", 8);
addNormEntry("wisc", "sm", "15-0", "21-24", 9);
addNormEntry("wisc", "sm", "15-0", "25-26", 10);
addNormEntry("wisc", "sm", "15-0", "27-29", 11);
addNormEntry("wisc", "sm", "15-0", "30-31", 12);
addNormEntry("wisc", "sm", "15-0", "32-33", 13);
addNormEntry("wisc", "sm", "15-0", "34", 14);
addNormEntry("wisc", "sm", "15-0", "35-36", 15);
addNormEntry("wisc", "sm", "15-0", "37", 16);
addNormEntry("wisc", "sm", "15-0", "38", 17);
addNormEntry("wisc", "sm", "15-0", "39", 18);
addNormEntry("wisc", "sm", "15-0", "40-44", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "15-4", "0", 1);
addNormEntry("wisc", "sm", "15-4", "1-2", 2);
addNormEntry("wisc", "sm", "15-4", "3-4", 3);
addNormEntry("wisc", "sm", "15-4", "5-7", 4);
addNormEntry("wisc", "sm", "15-4", "8-10", 5);
addNormEntry("wisc", "sm", "15-4", "11-14", 6);
addNormEntry("wisc", "sm", "15-4", "15-18", 7);
addNormEntry("wisc", "sm", "15-4", "19-21", 8);
addNormEntry("wisc", "sm", "15-4", "22-24", 9);
addNormEntry("wisc", "sm", "15-4", "25-27", 10);
addNormEntry("wisc", "sm", "15-4", "28-29", 11);
addNormEntry("wisc", "sm", "15-4", "30-31", 12);
addNormEntry("wisc", "sm", "15-4", "32-33", 13);
addNormEntry("wisc", "sm", "15-4", "34", 14);
addNormEntry("wisc", "sm", "15-4", "35-36", 15);
addNormEntry("wisc", "sm", "15-4", "37", 16);
addNormEntry("wisc", "sm", "15-4", "38", 17);
addNormEntry("wisc", "sm", "15-4", "39", 18);
addNormEntry("wisc", "sm", "15-4", "40-44", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "15-8", "0", 1);
addNormEntry("wisc", "sm", "15-8", "1-2", 2);
addNormEntry("wisc", "sm", "15-8", "3-4", 3);
addNormEntry("wisc", "sm", "15-8", "5-7", 4);
addNormEntry("wisc", "sm", "15-8", "8-10", 5);
addNormEntry("wisc", "sm", "15-8", "11-14", 6);
addNormEntry("wisc", "sm", "15-8", "15-18", 7);
addNormEntry("wisc", "sm", "15-8", "19-21", 8);
addNormEntry("wisc", "sm", "15-8", "22-25", 9);
addNormEntry("wisc", "sm", "15-8", "26-27", 10);
addNormEntry("wisc", "sm", "15-8", "28-30", 11);
addNormEntry("wisc", "sm", "15-8", "31-32", 12);
addNormEntry("wisc", "sm", "15-8", "33-34", 13);
addNormEntry("wisc", "sm", "15-8", "35", 14);
addNormEntry("wisc", "sm", "15-8", "36", 15);
addNormEntry("wisc", "sm", "15-8", "37", 16);
addNormEntry("wisc", "sm", "15-8", "38", 17);
addNormEntry("wisc", "sm", "15-8", "39", 18);
addNormEntry("wisc", "sm", "15-8", "40-44", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Semelhanças)
addNormEntry("wisc", "sm", "16-0", "0-1", 1);
addNormEntry("wisc", "sm", "16-0", "2", 2);
addNormEntry("wisc", "sm", "16-0", "3-4", 3);
addNormEntry("wisc", "sm", "16-0", "5-7", 4);
addNormEntry("wisc", "sm", "16-0", "8-11", 5);
addNormEntry("wisc", "sm", "16-0", "12-15", 6);
addNormEntry("wisc", "sm", "16-0", "16-18", 7);
addNormEntry("wisc", "sm", "16-0", "19-22", 8);
addNormEntry("wisc", "sm", "16-0", "23-25", 9);
addNormEntry("wisc", "sm", "16-0", "26-28", 10);
addNormEntry("wisc", "sm", "16-0", "29-30", 11);
addNormEntry("wisc", "sm", "16-0", "31-32", 12);
addNormEntry("wisc", "sm", "16-0", "33-34", 13);
addNormEntry("wisc", "sm", "16-0", "35", 14);
addNormEntry("wisc", "sm", "16-0", "36", 15);
addNormEntry("wisc", "sm", "16-0", "37", 16);
addNormEntry("wisc", "sm", "16-0", "38", 17);
addNormEntry("wisc", "sm", "16-0", "39", 18);
addNormEntry("wisc", "sm", "16-0", "40-44", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Semelhanças)
addNormEntry("wisc", "sm", "16-4", "0-1", 1);
addNormEntry("wisc", "sm", "16-4", "2", 2);
addNormEntry("wisc", "sm", "16-4", "3-4", 3);
addNormEntry("wisc", "sm", "16-4", "5-7", 4);
addNormEntry("wisc", "sm", "16-4", "8-11", 5);
addNormEntry("wisc", "sm", "16-4", "12-15", 6);
addNormEntry("wisc", "sm", "16-4", "16-19", 7);
addNormEntry("wisc", "sm", "16-4", "20-22", 8);
addNormEntry("wisc", "sm", "16-4", "23-26", 9);
addNormEntry("wisc", "sm", "16-4", "27-29", 10);
addNormEntry("wisc", "sm", "16-4", "30-31", 11);
addNormEntry("wisc", "sm", "16-4", "32-33", 12);
addNormEntry("wisc", "sm", "16-4", "34", 13);
addNormEntry("wisc", "sm", "16-4", "35", 14);
addNormEntry("wisc", "sm", "16-4", "36", 15);
addNormEntry("wisc", "sm", "16-4", "37", 16);
addNormEntry("wisc", "sm", "16-4", "38", 17);
addNormEntry("wisc", "sm", "16-4", "39", 18);
addNormEntry("wisc", "sm", "16-4", "40-44", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Semelhanças)
addNormEntry("wisc", "sm", "16-8", "0-1", 1);
addNormEntry("wisc", "sm", "16-8", "2", 2);
addNormEntry("wisc", "sm", "16-8", "3-4", 3);
addNormEntry("wisc", "sm", "16-8", "5-7", 4);
addNormEntry("wisc", "sm", "16-8", "8-11", 5);
addNormEntry("wisc", "sm", "16-8", "12-15", 6);
addNormEntry("wisc", "sm", "16-8", "16-19", 7);
addNormEntry("wisc", "sm", "16-8", "20-22", 8);
addNormEntry("wisc", "sm", "16-8", "23-26", 9);
addNormEntry("wisc", "sm", "16-8", "27-29", 10);
addNormEntry("wisc", "sm", "16-8", "30-31", 11);
addNormEntry("wisc", "sm", "16-8", "32-33", 12);
addNormEntry("wisc", "sm", "16-8", "34", 13);
addNormEntry("wisc", "sm", "16-8", "35", 14);
addNormEntry("wisc", "sm", "16-8", "36", 15);
addNormEntry("wisc", "sm", "16-8", "37", 16);
addNormEntry("wisc", "sm", "16-8", "38", 17);
addNormEntry("wisc", "sm", "16-8", "39", 18);
addNormEntry("wisc", "sm", "16-8", "40-44", 19);

// --- Normas do Subteste Cubos (CB) ---

// FAIXA 6-0 — 6 anos (Cubos)
addNormEntry("wisc", "cb", "6-0", "-", 1);
addNormEntry("wisc", "cb", "6-0", "0", 2);
addNormEntry("wisc", "cb", "6-0", "-", 3);
addNormEntry("wisc", "cb", "6-0", "1", 4);
addNormEntry("wisc", "cb", "6-0", "-", 5);
addNormEntry("wisc", "cb", "6-0", "2", 6);
addNormEntry("wisc", "cb", "6-0", "3", 7);
addNormEntry("wisc", "cb", "6-0", "4-6", 8);
addNormEntry("wisc", "cb", "6-0", "7-9", 9);
addNormEntry("wisc", "cb", "6-0", "10-12", 10);
addNormEntry("wisc", "cb", "6-0", "13-16", 11);
addNormEntry("wisc", "cb", "6-0", "17-19", 12);
addNormEntry("wisc", "cb", "6-0", "20-23", 13);
addNormEntry("wisc", "cb", "6-0", "24-26", 14);
addNormEntry("wisc", "cb", "6-0", "27-28", 15);
addNormEntry("wisc", "cb", "6-0", "29-32", 16);
addNormEntry("wisc", "cb", "6-0", "33-36", 17);
addNormEntry("wisc", "cb", "6-0", "37-39", 18);
addNormEntry("wisc", "cb", "6-0", "40-68", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "6-4", "-", 1);
addNormEntry("wisc", "cb", "6-4", "0", 2);
addNormEntry("wisc", "cb", "6-4", "-", 3);
addNormEntry("wisc", "cb", "6-4", "1", 4);
addNormEntry("wisc", "cb", "6-4", "2", 5);
addNormEntry("wisc", "cb", "6-4", "3", 6);
addNormEntry("wisc", "cb", "6-4", "4", 7);
addNormEntry("wisc", "cb", "6-4", "5-7", 8);
addNormEntry("wisc", "cb", "6-4", "8-10", 9);
addNormEntry("wisc", "cb", "6-4", "11-13", 10);
addNormEntry("wisc", "cb", "6-4", "14-17", 11);
addNormEntry("wisc", "cb", "6-4", "18-20", 12);
addNormEntry("wisc", "cb", "6-4", "21-23", 13);
addNormEntry("wisc", "cb", "6-4", "24-26", 14);
addNormEntry("wisc", "cb", "6-4", "27-30", 15);
addNormEntry("wisc", "cb", "6-4", "31-33", 16);
addNormEntry("wisc", "cb", "6-4", "34-37", 17);
addNormEntry("wisc", "cb", "6-4", "38-41", 18);
addNormEntry("wisc", "cb", "6-4", "42-68", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "6-8", "-", 1);
addNormEntry("wisc", "cb", "6-8", "0", 2);
addNormEntry("wisc", "cb", "6-8", "-", 3);
addNormEntry("wisc", "cb", "6-8", "1", 4);
addNormEntry("wisc", "cb", "6-8", "2", 5);
addNormEntry("wisc", "cb", "6-8", "3-4", 6);
addNormEntry("wisc", "cb", "6-8", "5-6", 7);
addNormEntry("wisc", "cb", "6-8", "7-9", 8);
addNormEntry("wisc", "cb", "6-8", "10-12", 9);
addNormEntry("wisc", "cb", "6-8", "13-15", 10);
addNormEntry("wisc", "cb", "6-8", "16-18", 11);
addNormEntry("wisc", "cb", "6-8", "19-21", 12);
addNormEntry("wisc", "cb", "6-8", "22-25", 13);
addNormEntry("wisc", "cb", "6-8", "26-28", 14);
addNormEntry("wisc", "cb", "6-8", "29-33", 15);
addNormEntry("wisc", "cb", "6-8", "32-35", 16);
addNormEntry("wisc", "cb", "6-8", "36-39", 17);
addNormEntry("wisc", "cb", "6-8", "40-43", 18);
addNormEntry("wisc", "cb", "6-8", "44-68", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "7-0", "-", 1);
addNormEntry("wisc", "cb", "7-0", "0", 2);
addNormEntry("wisc", "cb", "7-0", "-", 3);
addNormEntry("wisc", "cb", "7-0", "1", 4);
addNormEntry("wisc", "cb", "7-0", "2", 5);
addNormEntry("wisc", "cb", "7-0", "3-5", 6);
addNormEntry("wisc", "cb", "7-0", "6-7", 7);
addNormEntry("wisc", "cb", "7-0", "8-10", 8);
addNormEntry("wisc", "cb", "7-0", "11-13", 9);
addNormEntry("wisc", "cb", "7-0", "14-16", 10);
addNormEntry("wisc", "cb", "7-0", "17-19", 11);
addNormEntry("wisc", "cb", "7-0", "20-23", 12);
addNormEntry("wisc", "cb", "7-0", "24-26", 13);
addNormEntry("wisc", "cb", "7-0", "27-29", 14);
addNormEntry("wisc", "cb", "7-0", "30-33", 15);
addNormEntry("wisc", "cb", "7-0", "34-36", 16);
addNormEntry("wisc", "cb", "7-0", "37-40", 17);
addNormEntry("wisc", "cb", "7-0", "41-44", 18);
addNormEntry("wisc", "cb", "7-0", "45 -68", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "7-4", "-", 1);
addNormEntry("wisc", "cb", "7-4", "0", 2);
addNormEntry("wisc", "cb", "7-4", "-", 3);
addNormEntry("wisc", "cb", "7-4", "1", 4);
addNormEntry("wisc", "cb", "7-4", "2-3", 5);
addNormEntry("wisc", "cb", "7-4", "4-6", 6);
addNormEntry("wisc", "cb", "7-4", "7-8", 7);
addNormEntry("wisc", "cb", "7-4", "9-11", 8);
addNormEntry("wisc", "cb", "7-4", "12-14", 9);
addNormEntry("wisc", "cb", "7-4", "15-17", 10);
addNormEntry("wisc", "cb", "7-4", "18-20", 11);
addNormEntry("wisc", "cb", "7-4", "21-24", 12);
addNormEntry("wisc", "cb", "7-4", "25-27", 13);
addNormEntry("wisc", "cb", "7-4", "28-31", 14);
addNormEntry("wisc", "cb", "7-4", "32-34", 15);
addNormEntry("wisc", "cb", "7-4", "35-38", 16);
addNormEntry("wisc", "cb", "7-4", "39-42", 17);
addNormEntry("wisc", "cb", "7-4", "43-46", 18);
addNormEntry("wisc", "cb", "7-4", "47-68", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "7-8", "0", 1);
addNormEntry("wisc", "cb", "7-8", "-", 2);
addNormEntry("wisc", "cb", "7-8", "1", 3);
addNormEntry("wisc", "cb", "7-8", "2", 4);
addNormEntry("wisc", "cb", "7-8", "3-4", 5);
addNormEntry("wisc", "cb", "7-8", "5-7", 6);
addNormEntry("wisc", "cb", "7-8", "8-9", 7);
addNormEntry("wisc", "cb", "7-8", "10-12", 8);
addNormEntry("wisc", "cb", "7-8", "13-15", 9);
addNormEntry("wisc", "cb", "7-8", "16-18", 10);
addNormEntry("wisc", "cb", "7-8", "19-22", 11);
addNormEntry("wisc", "cb", "7-8", "23-25", 12);
addNormEntry("wisc", "cb", "7-8", "26-29", 13);
addNormEntry("wisc", "cb", "7-8", "30-32", 14);
addNormEntry("wisc", "cb", "7-8", "33-36", 15);
addNormEntry("wisc", "cb", "7-8", "37-39", 16);
addNormEntry("wisc", "cb", "7-8", "40-43", 17);
addNormEntry("wisc", "cb", "7-8", "44-47", 18);
addNormEntry("wisc", "cb", "7-8", "48-68", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "8-0", "0", 1);
addNormEntry("wisc", "cb", "8-0", "-", 2);
addNormEntry("wisc", "cb", "8-0", "1", 3);
addNormEntry("wisc", "cb", "8-0", "2-3", 4);
addNormEntry("wisc", "cb", "8-0", "4-5", 5);
addNormEntry("wisc", "cb", "8-0", "6-8", 6);
addNormEntry("wisc", "cb", "8-0", "9-11", 7);
addNormEntry("wisc", "cb", "8-0", "12-13", 8);
addNormEntry("wisc", "cb", "8-0", "14-16", 9);
addNormEntry("wisc", "cb", "8-0", "17-20", 10);
addNormEntry("wisc", "cb", "8-0", "21-23", 11);
addNormEntry("wisc", "cb", "8-0", "24-26", 12);
addNormEntry("wisc", "cb", "8-0", "27-30", 13);
addNormEntry("wisc", "cb", "8-0", "31-34", 14);
addNormEntry("wisc", "cb", "8-0", "35-37", 15);
addNormEntry("wisc", "cb", "8-0", "38-41", 16);
addNormEntry("wisc", "cb", "8-0", "42-45", 17);
addNormEntry("wisc", "cb", "8-0", "46-49", 18);
addNormEntry("wisc", "cb", "8-0", "50-68", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "8-4", "0", 1);
addNormEntry("wisc", "cb", "8-4", "-", 2);
addNormEntry("wisc", "cb", "8-4", "1", 3);
addNormEntry("wisc", "cb", "8-4", "2-4", 4);
addNormEntry("wisc", "cb", "8-4", "5-6", 5);
addNormEntry("wisc", "cb", "8-4", "7-9", 6);
addNormEntry("wisc", "cb", "8-4", "10-12", 7);
addNormEntry("wisc", "cb", "8-4", "13-15", 8);
addNormEntry("wisc", "cb", "8-4", "16-18", 9);
addNormEntry("wisc", "cb", "8-4", "19-21", 10);
addNormEntry("wisc", "cb", "8-4", "22-24", 11);
addNormEntry("wisc", "cb", "8-4", "25-28", 12);
addNormEntry("wisc", "cb", "8-4", "29-31", 13);
addNormEntry("wisc", "cb", "8-4", "32-35", 14);
addNormEntry("wisc", "cb", "8-4", "36-39", 15);
addNormEntry("wisc", "cb", "8-4", "40-42", 16);
addNormEntry("wisc", "cb", "8-4", "43-46", 17);
addNormEntry("wisc", "cb", "8-4", "47-50", 18);
addNormEntry("wisc", "cb", "8-4", "51-68", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "8-8", "0", 1);
addNormEntry("wisc", "cb", "8-8", "-", 2);
addNormEntry("wisc", "cb", "8-8", "1-2", 3);
addNormEntry("wisc", "cb", "8-8", "3-4", 4);
addNormEntry("wisc", "cb", "8-8", "5-7", 5);
addNormEntry("wisc", "cb", "8-8", "8-10", 6);
addNormEntry("wisc", "cb", "8-8", "11-13", 7);
addNormEntry("wisc", "cb", "8-8", "14-16", 8);
addNormEntry("wisc", "cb", "8-8", "17-19", 9);
addNormEntry("wisc", "cb", "8-8", "20-22", 10);
addNormEntry("wisc", "cb", "8-8", "23-26", 11);
addNormEntry("wisc", "cb", "8-8", "27-29", 12);
addNormEntry("wisc", "cb", "8-8", "30-33", 13);
addNormEntry("wisc", "cb", "8-8", "34-36", 14);
addNormEntry("wisc", "cb", "8-8", "37-40", 15);
addNormEntry("wisc", "cb", "8-8", "41-44", 16);
addNormEntry("wisc", "cb", "8-8", "45-48", 17);
addNormEntry("wisc", "cb", "8-8", "49-52", 18);
addNormEntry("wisc", "cb", "8-8", "53-68", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "9-0", "0", 1);
addNormEntry("wisc", "cb", "9-0", "1", 2);
addNormEntry("wisc", "cb", "9-0", "2-3", 3);
addNormEntry("wisc", "cb", "9-0", "4-5", 4);
addNormEntry("wisc", "cb", "9-0", "6-8", 5);
addNormEntry("wisc", "cb", "9-0", "9-11", 6);
addNormEntry("wisc", "cb", "9-0", "12-14", 7);
addNormEntry("wisc", "cb", "9-0", "15-17", 8);
addNormEntry("wisc", "cb", "9-0", "18-20", 9);
addNormEntry("wisc", "cb", "9-0", "21-23", 10);
addNormEntry("wisc", "cb", "9-0", "24-27", 11);
addNormEntry("wisc", "cb", "9-0", "28-30", 12);
addNormEntry("wisc", "cb", "9-0", "31-34", 13);
addNormEntry("wisc", "cb", "9-0", "35-38", 14);
addNormEntry("wisc", "cb", "9-0", "39-41", 15);
addNormEntry("wisc", "cb", "9-0", "42-45", 16);
addNormEntry("wisc", "cb", "9-0", "46-49", 17);
addNormEntry("wisc", "cb", "9-0", "50-53", 18);
addNormEntry("wisc", "cb", "9-0", "54-68", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "9-4", "0", 1);
addNormEntry("wisc", "cb", "9-4", "1", 2);
addNormEntry("wisc", "cb", "9-4", "2-3", 3);
addNormEntry("wisc", "cb", "9-4", "4-6", 4);
addNormEntry("wisc", "cb", "9-4", "7-9", 5);
addNormEntry("wisc", "cb", "9-4", "10-12", 6);
addNormEntry("wisc", "cb", "9-4", "13-15", 7);
addNormEntry("wisc", "cb", "9-4", "16-18", 8);
addNormEntry("wisc", "cb", "9-4", "19-21", 9);
addNormEntry("wisc", "cb", "9-4", "22-25", 10);
addNormEntry("wisc", "cb", "9-4", "26-28", 11);
addNormEntry("wisc", "cb", "9-4", "29-32", 12);
addNormEntry("wisc", "cb", "9-4", "33-35", 13);
addNormEntry("wisc", "cb", "9-4", "36-39", 14);
addNormEntry("wisc", "cb", "9-4", "40-43", 15);
addNormEntry("wisc", "cb", "9-4", "44-47", 16);
addNormEntry("wisc", "cb", "9-4", "48-51", 17);
addNormEntry("wisc", "cb", "9-4", "52-55", 18);
addNormEntry("wisc", "cb", "9-4", "56-68", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "9-8", "0", 1);
addNormEntry("wisc", "cb", "9-8", "1-2", 2);
addNormEntry("wisc", "cb", "9-8", "3-4", 3);
addNormEntry("wisc", "cb", "9-8", "5-7", 4);
addNormEntry("wisc", "cb", "9-8", "8-10", 5);
addNormEntry("wisc", "cb", "9-8", "11-13", 6);
addNormEntry("wisc", "cb", "9-8", "14-16", 7);
addNormEntry("wisc", "cb", "9-8", "17-19", 8);
addNormEntry("wisc", "cb", "9-8", "20-22", 9);
addNormEntry("wisc", "cb", "9-8", "23-26", 10);
addNormEntry("wisc", "cb", "9-8", "27-29", 11);
addNormEntry("wisc", "cb", "9-8", "30-33", 12);
addNormEntry("wisc", "cb", "9-8", "34-37", 13);
addNormEntry("wisc", "cb", "9-8", "38-40", 14);
addNormEntry("wisc", "cb", "9-8", "41-44", 15);
addNormEntry("wisc", "cb", "9-8", "45-48", 16);
addNormEntry("wisc", "cb", "9-8", "49-52", 17);
addNormEntry("wisc", "cb", "9-8", "53-56", 18);
addNormEntry("wisc", "cb", "9-8", "57-68", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "10-0", "0", 1);
addNormEntry("wisc", "cb", "10-0", "1-2", 2);
addNormEntry("wisc", "cb", "10-0", "3-5", 3);
addNormEntry("wisc", "cb", "10-0", "6-8", 4);
addNormEntry("wisc", "cb", "10-0", "9-11", 5);
addNormEntry("wisc", "cb", "10-0", "12-14", 6);
addNormEntry("wisc", "cb", "10-0", "15-17", 7);
addNormEntry("wisc", "cb", "10-0", "18-20", 8);
addNormEntry("wisc", "cb", "10-0", "21-24", 9);
addNormEntry("wisc", "cb", "10-0", "25-27", 10);
addNormEntry("wisc", "cb", "10-0", "28-31", 11);
addNormEntry("wisc", "cb", "10-0", "32-34", 12);
addNormEntry("wisc", "cb", "10-0", "35-38", 13);
addNormEntry("wisc", "cb", "10-0", "39-42", 14);
addNormEntry("wisc", "cb", "10-0", "43-46", 15);
addNormEntry("wisc", "cb", "10-0", "47-50", 16);
addNormEntry("wisc", "cb", "10-0", "51-54", 17);
addNormEntry("wisc", "cb", "10-0", "55-58", 18);
addNormEntry("wisc", "cb", "10-0", "59-68", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "10-4", "0", 1);
addNormEntry("wisc", "cb", "10-4", "1-2", 2);
addNormEntry("wisc", "cb", "10-4", "3-5", 3);
addNormEntry("wisc", "cb", "10-4", "6-8", 4);
addNormEntry("wisc", "cb", "10-4", "9-11", 5);
addNormEntry("wisc", "cb", "10-4", "12-15", 6);
addNormEntry("wisc", "cb", "10-4", "16-18", 7);
addNormEntry("wisc", "cb", "10-4", "19-21", 8);
addNormEntry("wisc", "cb", "10-4", "22-25", 9);
addNormEntry("wisc", "cb", "10-4", "26-28", 10);
addNormEntry("wisc", "cb", "10-4", "29-32", 11);
addNormEntry("wisc", "cb", "10-4", "33-36", 12);
addNormEntry("wisc", "cb", "10-4", "37-39", 13);
addNormEntry("wisc", "cb", "10-4", "40-43", 14);
addNormEntry("wisc", "cb", "10-4", "44-47", 15);
addNormEntry("wisc", "cb", "10-4", "48-51", 16);
addNormEntry("wisc", "cb", "10-4", "52-55", 17);
addNormEntry("wisc", "cb", "10-4", "56-59", 18);
addNormEntry("wisc", "cb", "10-4", "60-68", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "10-8", "0", 1);
addNormEntry("wisc", "cb", "10-8", "1-3", 2);
addNormEntry("wisc", "cb", "10-8", "4-6", 3);
addNormEntry("wisc", "cb", "10-8", "7-9", 4);
addNormEntry("wisc", "cb", "10-8", "10-12", 5);
addNormEntry("wisc", "cb", "10-8", "13-15", 6);
addNormEntry("wisc", "cb", "10-8", "16-19", 7);
addNormEntry("wisc", "cb", "10-8", "20-22", 8);
addNormEntry("wisc", "cb", "10-8", "23-26", 9);
addNormEntry("wisc", "cb", "10-8", "27-29", 10);
addNormEntry("wisc", "cb", "10-8", "30-33", 11);
addNormEntry("wisc", "cb", "10-8", "34-37", 12);
addNormEntry("wisc", "cb", "10-8", "38-41", 13);
addNormEntry("wisc", "cb", "10-8", "42-44", 14);
addNormEntry("wisc", "cb", "10-8", "45-48", 15);
addNormEntry("wisc", "cb", "10-8", "49-52", 16);
addNormEntry("wisc", "cb", "10-8", "53-56", 17);
addNormEntry("wisc", "cb", "10-8", "57-60", 18);
addNormEntry("wisc", "cb", "10-8", "61-68", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "11-0", "0-1", 1);
addNormEntry("wisc", "cb", "11-0", "2-3", 2);
addNormEntry("wisc", "cb", "11-0", "4-6", 3);
addNormEntry("wisc", "cb", "11-0", "7-10", 4);
addNormEntry("wisc", "cb", "11-0", "11-13", 5);
addNormEntry("wisc", "cb", "11-0", "14-16", 6);
addNormEntry("wisc", "cb", "11-0", "17-20", 7);
addNormEntry("wisc", "cb", "11-0", "21-23", 8);
addNormEntry("wisc", "cb", "11-0", "24-27", 9);
addNormEntry("wisc", "cb", "11-0", "28-31", 10);
addNormEntry("wisc", "cb", "11-0", "32-34", 11);
addNormEntry("wisc", "cb", "11-0", "35-38", 12);
addNormEntry("wisc", "cb", "11-0", "39-42", 13);
addNormEntry("wisc", "cb", "11-0", "43-46", 14);
addNormEntry("wisc", "cb", "11-0", "47-50", 15);
addNormEntry("wisc", "cb", "11-0", "51-54", 16);
addNormEntry("wisc", "cb", "11-0", "55-58", 17);
addNormEntry("wisc", "cb", "11-0", "59-61", 18);
addNormEntry("wisc", "cb", "11-0", "62-68", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "11-4", "0-1", 1);
addNormEntry("wisc", "cb", "11-4", "2-3", 2);
addNormEntry("wisc", "cb", "11-4", "4-7", 3);
addNormEntry("wisc", "cb", "11-4", "8-10", 4);
addNormEntry("wisc", "cb", "11-4", "11-14", 5);
addNormEntry("wisc", "cb", "11-4", "15-17", 6);
addNormEntry("wisc", "cb", "11-4", "18-21", 7);
addNormEntry("wisc", "cb", "11-4", "22-24", 8);
addNormEntry("wisc", "cb", "11-4", "25-28", 9);
addNormEntry("wisc", "cb", "11-4", "29-32", 10);
addNormEntry("wisc", "cb", "11-4", "33-36", 11);
addNormEntry("wisc", "cb", "11-4", "37-39", 12);
addNormEntry("wisc", "cb", "11-4", "40-43", 13);
addNormEntry("wisc", "cb", "11-4", "44-47", 14);
addNormEntry("wisc", "cb", "11-4", "48-51", 15);
addNormEntry("wisc", "cb", "11-4", "52-55", 16);
addNormEntry("wisc", "cb", "11-4", "56-59", 17);
addNormEntry("wisc", "cb", "11-4", "60-62", 18);
addNormEntry("wisc", "cb", "11-4", "63-68", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "11-8", "0-1", 1);
addNormEntry("wisc", "cb", "11-8", "2-4", 2);
addNormEntry("wisc", "cb", "11-8", "5-7", 3);
addNormEntry("wisc", "cb", "11-8", "8-11", 4);
addNormEntry("wisc", "cb", "11-8", "12-14", 5);
addNormEntry("wisc", "cb", "11-8", "15-18", 6);
addNormEntry("wisc", "cb", "11-8", "19-22", 7);
addNormEntry("wisc", "cb", "11-8", "23-25", 8);
addNormEntry("wisc", "cb", "11-8", "26-29", 9);
addNormEntry("wisc", "cb", "11-8", "30-33", 10);
addNormEntry("wisc", "cb", "11-8", "34-37", 11);
addNormEntry("wisc", "cb", "11-8", "38-41", 12);
addNormEntry("wisc", "cb", "11-8", "42-44", 13);
addNormEntry("wisc", "cb", "11-8", "45-48", 14);
addNormEntry("wisc", "cb", "11-8", "49-52", 15);
addNormEntry("wisc", "cb", "11-8", "53-56", 16);
addNormEntry("wisc", "cb", "11-8", "57-60", 17);
addNormEntry("wisc", "cb", "11-8", "61-63", 18);
addNormEntry("wisc", "cb", "11-8", "64-68", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "12-0", "0-2", 1);
addNormEntry("wisc", "cb", "12-0", "3-4", 2);
addNormEntry("wisc", "cb", "12-0", "5-8", 3);
addNormEntry("wisc", "cb", "12-0", "9-11", 4);
addNormEntry("wisc", "cb", "12-0", "12-15", 5);
addNormEntry("wisc", "cb", "12-0", "16-19", 6);
addNormEntry("wisc", "cb", "12-0", "20-23", 7);
addNormEntry("wisc", "cb", "12-0", "24-27", 8);
addNormEntry("wisc", "cb", "12-0", "28-30", 9);
addNormEntry("wisc", "cb", "12-0", "31-34", 10);
addNormEntry("wisc", "cb", "12-0", "35-38", 11);
addNormEntry("wisc", "cb", "12-0", "39-42", 12);
addNormEntry("wisc", "cb", "12-0", "43-46", 13);
addNormEntry("wisc", "cb", "12-0", "47-49", 14);
addNormEntry("wisc", "cb", "12-0", "50-53", 15);
addNormEntry("wisc", "cb", "12-0", "54-57", 16);
addNormEntry("wisc", "cb", "12-0", "58-61", 17);
addNormEntry("wisc", "cb", "12-0", "62-64", 18);
addNormEntry("wisc", "cb", "12-0", "65-68", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "12-4", "0-2", 1);
addNormEntry("wisc", "cb", "12-4", "3-4", 2);
addNormEntry("wisc", "cb", "12-4", "5-8", 3);
addNormEntry("wisc", "cb", "12-4", "9-12", 4);
addNormEntry("wisc", "cb", "12-4", "13-16", 5);
addNormEntry("wisc", "cb", "12-4", "17-20", 6);
addNormEntry("wisc", "cb", "12-4", "21-24", 7);
addNormEntry("wisc", "cb", "12-4", "25-27", 8);
addNormEntry("wisc", "cb", "12-4", "28-31", 9);
addNormEntry("wisc", "cb", "12-4", "32-35", 10);
addNormEntry("wisc", "cb", "12-4", "36-39", 11);
addNormEntry("wisc", "cb", "12-4", "40-43", 12);
addNormEntry("wisc", "cb", "12-4", "44-47", 13);
addNormEntry("wisc", "cb", "12-4", "48-51", 14);
addNormEntry("wisc", "cb", "12-4", "52-55", 15);
addNormEntry("wisc", "cb", "12-4", "56-58", 16);
addNormEntry("wisc", "cb", "12-4", "59-62", 17);
addNormEntry("wisc", "cb", "12-4", "63-65", 18);
addNormEntry("wisc", "cb", "12-4", "66-68", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "12-8", "0-2", 1);
addNormEntry("wisc", "cb", "12-8", "3-4", 2);
addNormEntry("wisc", "cb", "12-8", "5-8", 3);
addNormEntry("wisc", "cb", "12-8", "9-12", 4);
addNormEntry("wisc", "cb", "12-8", "13-16", 5);
addNormEntry("wisc", "cb", "12-8", "17-20", 6);
addNormEntry("wisc", "cb", "12-8", "21-24", 7);
addNormEntry("wisc", "cb", "12-8", "25-28", 8);
addNormEntry("wisc", "cb", "12-8", "29-32", 9);
addNormEntry("wisc", "cb", "12-8", "33-36", 10);
addNormEntry("wisc", "cb", "12-8", "37-40", 11);
addNormEntry("wisc", "cb", "12-8", "41-44", 12);
addNormEntry("wisc", "cb", "12-8", "45-48", 13);
addNormEntry("wisc", "cb", "12-8", "49-52", 14);
addNormEntry("wisc", "cb", "12-8", "53-56", 15);
addNormEntry("wisc", "cb", "12-8", "57-59", 16);
addNormEntry("wisc", "cb", "12-8", "60-63", 17);
addNormEntry("wisc", "cb", "12-8", "64-65", 18);
addNormEntry("wisc", "cb", "12-8", "66-68", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "13-0", "0-3", 1);
addNormEntry("wisc", "cb", "13-0", "4-5", 2);
addNormEntry("wisc", "cb", "13-0", "6-9", 3);
addNormEntry("wisc", "cb", "13-0", "10-13", 4);
addNormEntry("wisc", "cb", "13-0", "14-17", 5);
addNormEntry("wisc", "cb", "13-0", "18-21", 6);
addNormEntry("wisc", "cb", "13-0", "22-25", 7);
addNormEntry("wisc", "cb", "13-0", "26-29", 8);
addNormEntry("wisc", "cb", "13-0", "30-33", 9);
addNormEntry("wisc", "cb", "13-0", "34-37", 10);
addNormEntry("wisc", "cb", "13-0", "38-41", 11);
addNormEntry("wisc", "cb", "13-0", "42-45", 12);
addNormEntry("wisc", "cb", "13-0", "46-49", 13);
addNormEntry("wisc", "cb", "13-0", "50-53", 14);
addNormEntry("wisc", "cb", "13-0", "54-57", 15);
addNormEntry("wisc", "cb", "13-0", "58-60", 16);
addNormEntry("wisc", "cb", "13-0", "61-63", 17);
addNormEntry("wisc", "cb", "13-0", "64-66", 18);
addNormEntry("wisc", "cb", "13-0", "67-68", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "13-4", "0-3", 1);
addNormEntry("wisc", "cb", "13-4", "4-5", 2);
addNormEntry("wisc", "cb", "13-4", "6-9", 3);
addNormEntry("wisc", "cb", "13-4", "10-13", 4);
addNormEntry("wisc", "cb", "13-4", "14-17", 5);
addNormEntry("wisc", "cb", "13-4", "18-22", 6);
addNormEntry("wisc", "cb", "13-4", "23-26", 7);
addNormEntry("wisc", "cb", "13-4", "27-30", 8);
addNormEntry("wisc", "cb", "13-4", "31-34", 9);
addNormEntry("wisc", "cb", "13-4", "35-38", 10);
addNormEntry("wisc", "cb", "13-4", "39-42", 11);
addNormEntry("wisc", "cb", "13-4", "43-46", 12);
addNormEntry("wisc", "cb", "13-4", "47-50", 13);
addNormEntry("wisc", "cb", "13-4", "51-54", 14);
addNormEntry("wisc", "cb", "13-4", "55-58", 15);
addNormEntry("wisc", "cb", "13-4", "59-61", 16);
addNormEntry("wisc", "cb", "13-4", "62-64", 17);
addNormEntry("wisc", "cb", "13-4", "65-66", 18);
addNormEntry("wisc", "cb", "13-4", "67-68", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "13-8", "0-3", 1);
addNormEntry("wisc", "cb", "13-8", "4-5", 2);
addNormEntry("wisc", "cb", "13-8", "6-9", 3);
addNormEntry("wisc", "cb", "13-8", "10-13", 4);
addNormEntry("wisc", "cb", "13-8", "14-18", 5);
addNormEntry("wisc", "cb", "13-8", "19-22", 6);
addNormEntry("wisc", "cb", "13-8", "23-27", 7);
addNormEntry("wisc", "cb", "13-8", "28-31", 8);
addNormEntry("wisc", "cb", "13-8", "32-35", 9);
addNormEntry("wisc", "cb", "13-8", "36-39", 10);
addNormEntry("wisc", "cb", "13-8", "40-43", 11);
addNormEntry("wisc", "cb", "13-8", "44-47", 12);
addNormEntry("wisc", "cb", "13-8", "48-51", 13);
addNormEntry("wisc", "cb", "13-8", "52-55", 14);
addNormEntry("wisc", "cb", "13-8", "56-59", 15);
addNormEntry("wisc", "cb", "13-8", "60-62", 16);
addNormEntry("wisc", "cb", "13-8", "63-65", 17);
addNormEntry("wisc", "cb", "13-8", "66-67", 18);
addNormEntry("wisc", "cb", "13-8", "68", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "14-0", "0-3", 1);
addNormEntry("wisc", "cb", "14-0", "4-6", 2);
addNormEntry("wisc", "cb", "14-0", "7-10", 3);
addNormEntry("wisc", "cb", "14-0", "11-14", 4);
addNormEntry("wisc", "cb", "14-0", "15-18", 5);
addNormEntry("wisc", "cb", "14-0", "19-23", 6);
addNormEntry("wisc", "cb", "14-0", "24-27", 7);
addNormEntry("wisc", "cb", "14-0", "28-32", 8);
addNormEntry("wisc", "cb", "14-0", "33-36", 9);
addNormEntry("wisc", "cb", "14-0", "37-40", 10);
addNormEntry("wisc", "cb", "14-0", "41-44", 11);
addNormEntry("wisc", "cb", "14-0", "45-48", 12);
addNormEntry("wisc", "cb", "14-0", "49-52", 13);
addNormEntry("wisc", "cb", "14-0", "53-56", 14);
addNormEntry("wisc", "cb", "14-0", "57-60", 15);
addNormEntry("wisc", "cb", "14-0", "61-63", 16);
addNormEntry("wisc", "cb", "14-0", "64-65", 17);
addNormEntry("wisc", "cb", "14-0", "66-67", 18);
addNormEntry("wisc", "cb", "14-0", "68", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "14-4", "0-3", 1);
addNormEntry("wisc", "cb", "14-4", "4-6", 2);
addNormEntry("wisc", "cb", "14-4", "7-10", 3);
addNormEntry("wisc", "cb", "14-4", "11-14", 4);
addNormEntry("wisc", "cb", "14-4", "15-19", 5);
addNormEntry("wisc", "cb", "14-4", "20-23", 6);
addNormEntry("wisc", "cb", "14-4", "24-28", 7);
addNormEntry("wisc", "cb", "14-4", "29-33", 8);
addNormEntry("wisc", "cb", "14-4", "34-37", 9);
addNormEntry("wisc", "cb", "14-4", "38-41", 10);
addNormEntry("wisc", "cb", "14-4", "42-45", 11);
addNormEntry("wisc", "cb", "14-4", "46-49", 12);
addNormEntry("wisc", "cb", "14-4", "50-53", 13);
addNormEntry("wisc", "cb", "14-4", "54-57", 14);
addNormEntry("wisc", "cb", "14-4", "58-60", 15);
addNormEntry("wisc", "cb", "14-4", "61-63", 16);
addNormEntry("wisc", "cb", "14-4", "64-65", 17);
addNormEntry("wisc", "cb", "14-4", "66-67", 18);
addNormEntry("wisc", "cb", "14-4", "68", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "14-8", "0-3", 1);
addNormEntry("wisc", "cb", "14-8", "4-6", 2);
addNormEntry("wisc", "cb", "14-8", "7-10", 3);
addNormEntry("wisc", "cb", "14-8", "11-14", 4);
addNormEntry("wisc", "cb", "14-8", "15-19", 5);
addNormEntry("wisc", "cb", "14-8", "20-24", 6);
addNormEntry("wisc", "cb", "14-8", "25-29", 7);
addNormEntry("wisc", "cb", "14-8", "30-33", 8);
addNormEntry("wisc", "cb", "14-8", "34-38", 9);
addNormEntry("wisc", "cb", "14-8", "39-42", 10);
addNormEntry("wisc", "cb", "14-8", "43-46", 11);
addNormEntry("wisc", "cb", "14-8", "47-50", 12);
addNormEntry("wisc", "cb", "14-8", "51-54", 13);
addNormEntry("wisc", "cb", "14-8", "55-58", 14);
addNormEntry("wisc", "cb", "14-8", "59-61", 15);
addNormEntry("wisc", "cb", "14-8", "62-64", 16);
addNormEntry("wisc", "cb", "14-8", "65-66", 17);
addNormEntry("wisc", "cb", "14-8", "67", 18);
addNormEntry("wisc", "cb", "14-8", "68", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "15-0", "0-4", 1);
addNormEntry("wisc", "cb", "15-0", "5-7", 2);
addNormEntry("wisc", "cb", "15-0", "8-11", 3);
addNormEntry("wisc", "cb", "15-0", "12-15", 4);
addNormEntry("wisc", "cb", "15-0", "16-19", 5);
addNormEntry("wisc", "cb", "15-0", "20-24", 6);
addNormEntry("wisc", "cb", "15-0", "25-29", 7);
addNormEntry("wisc", "cb", "15-0", "30-34", 8);
addNormEntry("wisc", "cb", "15-0", "35-38", 9);
addNormEntry("wisc", "cb", "15-0", "39-43", 10);
addNormEntry("wisc", "cb", "15-0", "44-47", 11);
addNormEntry("wisc", "cb", "15-0", "48-51", 12);
addNormEntry("wisc", "cb", "15-0", "52-55", 13);
addNormEntry("wisc", "cb", "15-0", "56-59", 14);
addNormEntry("wisc", "cb", "15-0", "60-62", 15);
addNormEntry("wisc", "cb", "15-0", "63-64", 16);
addNormEntry("wisc", "cb", "15-0", "65-66", 17);
addNormEntry("wisc", "cb", "15-0", "67", 18);
addNormEntry("wisc", "cb", "15-0", "68", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "15-4", "0-4", 1);
addNormEntry("wisc", "cb", "15-4", "5-7", 2);
addNormEntry("wisc", "cb", "15-4", "8-11", 3);
addNormEntry("wisc", "cb", "15-4", "12-15", 4);
addNormEntry("wisc", "cb", "15-4", "16-20", 5);
addNormEntry("wisc", "cb", "15-4", "21-25", 6);
addNormEntry("wisc", "cb", "15-4", "26-30", 7);
addNormEntry("wisc", "cb", "15-4", "31-34", 8);
addNormEntry("wisc", "cb", "15-4", "35-39", 9);
addNormEntry("wisc", "cb", "15-4", "40-44", 10);
addNormEntry("wisc", "cb", "15-4", "45-48", 11);
addNormEntry("wisc", "cb", "15-4", "49-52", 12);
addNormEntry("wisc", "cb", "15-4", "53-56", 13);
addNormEntry("wisc", "cb", "15-4", "57-59", 14);
addNormEntry("wisc", "cb", "15-4", "60-63", 15);
addNormEntry("wisc", "cb", "15-4", "64-65", 16);
addNormEntry("wisc", "cb", "15-4", "66", 17);
addNormEntry("wisc", "cb", "15-4", "67", 18);
addNormEntry("wisc", "cb", "15-4", "68", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "15-8", "0-4", 1);
addNormEntry("wisc", "cb", "15-8", "5-7", 2);
addNormEntry("wisc", "cb", "15-8", "8-11", 3);
addNormEntry("wisc", "cb", "15-8", "12-16", 4);
addNormEntry("wisc", "cb", "15-8", "17-20", 5);
addNormEntry("wisc", "cb", "15-8", "21-25", 6);
addNormEntry("wisc", "cb", "15-8", "26-30", 7);
addNormEntry("wisc", "cb", "15-8", "31-35", 8);
addNormEntry("wisc", "cb", "15-8", "36-40", 9);
addNormEntry("wisc", "cb", "15-8", "41-44", 10);
addNormEntry("wisc", "cb", "15-8", "45-49", 11);
addNormEntry("wisc", "cb", "15-8", "50-53", 12);
addNormEntry("wisc", "cb", "15-8", "54-56", 13);
addNormEntry("wisc", "cb", "15-8", "57-60", 14);
addNormEntry("wisc", "cb", "15-8", "61-63", 15);
addNormEntry("wisc", "cb", "15-8", "64-65", 16);
addNormEntry("wisc", "cb", "15-8", "66", 17);
addNormEntry("wisc", "cb", "15-8", "67", 18);
addNormEntry("wisc", "cb", "15-8", "68", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Cubos)
addNormEntry("wisc", "cb", "16-0", "0-4", 1);
addNormEntry("wisc", "cb", "16-0", "5-7", 2);
addNormEntry("wisc", "cb", "16-0", "8-11", 3);
addNormEntry("wisc", "cb", "16-0", "12-16", 4);
addNormEntry("wisc", "cb", "16-0", "17-20", 5);
addNormEntry("wisc", "cb", "16-0", "21-25", 6);
addNormEntry("wisc", "cb", "16-0", "26-30", 7);
addNormEntry("wisc", "cb", "16-0", "31-35", 8);
addNormEntry("wisc", "cb", "16-0", "36-40", 9);
addNormEntry("wisc", "cb", "16-0", "41-45", 10);
addNormEntry("wisc", "cb", "16-0", "46-49", 11);
addNormEntry("wisc", "cb", "16-0", "50-53", 12);
addNormEntry("wisc", "cb", "16-0", "54-57", 13);
addNormEntry("wisc", "cb", "16-0", "58-61", 14);
addNormEntry("wisc", "cb", "16-0", "62-64", 15);
addNormEntry("wisc", "cb", "16-0", "65-66", 16);
addNormEntry("wisc", "cb", "16-0", "67", 17);
addNormEntry("wisc", "cb", "16-0", "68", 18);
addNormEntry("wisc", "cb", "16-0", "-", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Cubos)
addNormEntry("wisc", "cb", "16-4", "0-5", 1);
addNormEntry("wisc", "cb", "16-4", "6-8", 2);
addNormEntry("wisc", "cb", "16-4", "9-12", 3);
addNormEntry("wisc", "cb", "16-4", "13-17", 4);
addNormEntry("wisc", "cb", "16-4", "18-21", 5);
addNormEntry("wisc", "cb", "16-4", "22-26", 6);
addNormEntry("wisc", "cb", "16-4", "27-31", 7);
addNormEntry("wisc", "cb", "16-4", "32-36", 8);
addNormEntry("wisc", "cb", "16-4", "37-41", 9);
addNormEntry("wisc", "cb", "16-4", "42-46", 10);
addNormEntry("wisc", "cb", "16-4", "47-50", 11);
addNormEntry("wisc", "cb", "16-4", "51-54", 12);
addNormEntry("wisc", "cb", "16-4", "55-58", 13);
addNormEntry("wisc", "cb", "16-4", "59-61", 14);
addNormEntry("wisc", "cb", "16-4", "62-64", 15);
addNormEntry("wisc", "cb", "16-4", "65-66", 16);
addNormEntry("wisc", "cb", "16-4", "67", 17);
addNormEntry("wisc", "cb", "16-4", "68", 18);
addNormEntry("wisc", "cb", "16-4", "-", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Cubos)
addNormEntry("wisc", "cb", "16-8", "0-5", 1);
addNormEntry("wisc", "cb", "16-8", "6-8", 2);
addNormEntry("wisc", "cb", "16-8", "9-12", 3);
addNormEntry("wisc", "cb", "16-8", "13-17", 4);
addNormEntry("wisc", "cb", "16-8", "18-21", 5);
addNormEntry("wisc", "cb", "16-8", "22-26", 6);
addNormEntry("wisc", "cb", "16-8", "27-31", 7);
addNormEntry("wisc", "cb", "16-8", "32-36", 8);
addNormEntry("wisc", "cb", "16-8", "37-41", 9);
addNormEntry("wisc", "cb", "16-8", "42-46", 10);
addNormEntry("wisc", "cb", "16-8", "47-51", 11);
addNormEntry("wisc", "cb", "16-8", "52-55", 12);
addNormEntry("wisc", "cb", "16-8", "56-58", 13);
addNormEntry("wisc", "cb", "16-8", "59-62", 14);
addNormEntry("wisc", "cb", "16-8", "63-65", 15);
addNormEntry("wisc", "cb", "16-8", "66", 16);
addNormEntry("wisc", "cb", "16-8", "67", 17);
addNormEntry("wisc", "cb", "16-8", "68", 18);
addNormEntry("wisc", "cb", "16-8", "-", 19);

// --- Normas do Subteste Dígitos (DG) ---

// FAIXA 6-0 — 6 anos (Dígitos)
addNormEntry("wisc", "dg", "6-0", "0", 1);
addNormEntry("wisc", "dg", "6-0", "1", 2);
addNormEntry("wisc", "dg", "6-0", "2", 3);
addNormEntry("wisc", "dg", "6-0", "3", 4);
addNormEntry("wisc", "dg", "6-0", "4", 5);
addNormEntry("wisc", "dg", "6-0", "5", 6);
addNormEntry("wisc", "dg", "6-0", "6", 7);
addNormEntry("wisc", "dg", "6-0", "7", 8);
addNormEntry("wisc", "dg", "6-0", "8", 9);
addNormEntry("wisc", "dg", "6-0", "9", 10);
addNormEntry("wisc", "dg", "6-0", "10", 11);
addNormEntry("wisc", "dg", "6-0", "11", 12);
addNormEntry("wisc", "dg", "6-0", "12-13", 13);
addNormEntry("wisc", "dg", "6-0", "14", 14);
addNormEntry("wisc", "dg", "6-0", "15", 15);
addNormEntry("wisc", "dg", "6-0", "16", 16);
addNormEntry("wisc", "dg", "6-0", "17", 17);
addNormEntry("wisc", "dg", "6-0", "18-19", 18);
addNormEntry("wisc", "dg", "6-0", "20-32", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "6-4", "0-1", 1);
addNormEntry("wisc", "dg", "6-4", "2", 2);
addNormEntry("wisc", "dg", "6-4", "3", 3);
addNormEntry("wisc", "dg", "6-4", "4", 4);
addNormEntry("wisc", "dg", "6-4", "5", 5);
addNormEntry("wisc", "dg", "6-4", "6", 6);
addNormEntry("wisc", "dg", "6-4", "7", 7);
addNormEntry("wisc", "dg", "6-4", "8", 8);
addNormEntry("wisc", "dg", "6-4", "9", 9);
addNormEntry("wisc", "dg", "6-4", "10", 10);
addNormEntry("wisc", "dg", "6-4", "11", 11);
addNormEntry("wisc", "dg", "6-4", "12", 12);
addNormEntry("wisc", "dg", "6-4", "13", 13);
addNormEntry("wisc", "dg", "6-4", "14", 14);
addNormEntry("wisc", "dg", "6-4", "15-16", 15);
addNormEntry("wisc", "dg", "6-4", "17", 16);
addNormEntry("wisc", "dg", "6-4", "18", 17);
addNormEntry("wisc", "dg", "6-4", "19", 18);
addNormEntry("wisc", "dg", "6-4", "20-32", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "6-8", "0-2", 1);
addNormEntry("wisc", "dg", "6-8", "3", 2);
addNormEntry("wisc", "dg", "6-8", "-", 3);
addNormEntry("wisc", "dg", "6-8", "4", 4);
addNormEntry("wisc", "dg", "6-8", "5", 5);
addNormEntry("wisc", "dg", "6-8", "6", 6);
addNormEntry("wisc", "dg", "6-8", "7", 7);
addNormEntry("wisc", "dg", "6-8", "8", 8);
addNormEntry("wisc", "dg", "6-8", "9", 9);
addNormEntry("wisc", "dg", "6-8", "10", 10);
addNormEntry("wisc", "dg", "6-8", "11", 11);
addNormEntry("wisc", "dg", "6-8", "12-13", 12);
addNormEntry("wisc", "dg", "6-8", "14", 13);
addNormEntry("wisc", "dg", "6-8", "15", 14);
addNormEntry("wisc", "dg", "6-8", "16", 15);
addNormEntry("wisc", "dg", "6-8", "17", 16);
addNormEntry("wisc", "dg", "6-8", "18-19", 17);
addNormEntry("wisc", "dg", "6-8", "20", 18);
addNormEntry("wisc", "dg", "6-8", "21-32", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "7-0", "0-2", 1);
addNormEntry("wisc", "dg", "7-0", "3", 2);
addNormEntry("wisc", "dg", "7-0", "4", 3);
addNormEntry("wisc", "dg", "7-0", "5", 4);
addNormEntry("wisc", "dg", "7-0", "6", 5);
addNormEntry("wisc", "dg", "7-0", "7", 6);
addNormEntry("wisc", "dg", "7-0", "8", 7);
addNormEntry("wisc", "dg", "7-0", "9", 8);
addNormEntry("wisc", "dg", "7-0", "10", 9);
addNormEntry("wisc", "dg", "7-0", "11", 10);
addNormEntry("wisc", "dg", "7-0", "12", 11);
addNormEntry("wisc", "dg", "7-0", "13", 12);
addNormEntry("wisc", "dg", "7-0", "14", 13);
addNormEntry("wisc", "dg", "7-0", "15-16", 14);
addNormEntry("wisc", "dg", "7-0", "17", 15);
addNormEntry("wisc", "dg", "7-0", "18", 16);
addNormEntry("wisc", "dg", "7-0", "19", 17);
addNormEntry("wisc", "dg", "7-0", "20-21", 18);
addNormEntry("wisc", "dg", "7-0", "22-32", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "7-4", "0-3", 1);
addNormEntry("wisc", "dg", "7-4", "4", 2);
addNormEntry("wisc", "dg", "7-4", "-", 3);
addNormEntry("wisc", "dg", "7-4", "5", 4);
addNormEntry("wisc", "dg", "7-4", "6", 5);
addNormEntry("wisc", "dg", "7-4", "7", 6);
addNormEntry("wisc", "dg", "7-4", "8", 7);
addNormEntry("wisc", "dg", "7-4", "9", 8);
addNormEntry("wisc", "dg", "7-4", "10", 9);
addNormEntry("wisc", "dg", "7-4", "11", 10);
addNormEntry("wisc", "dg", "7-4", "12", 11);
addNormEntry("wisc", "dg", "7-4", "13-14", 12);
addNormEntry("wisc", "dg", "7-4", "15", 13);
addNormEntry("wisc", "dg", "7-4", "16", 14);
addNormEntry("wisc", "dg", "7-4", "17", 15);
addNormEntry("wisc", "dg", "7-4", "18-19", 16);
addNormEntry("wisc", "dg", "7-4", "20", 17);
addNormEntry("wisc", "dg", "7-4", "21", 18);
addNormEntry("wisc", "dg", "7-4", "22-32", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "7-8", "0-3", 1);
addNormEntry("wisc", "dg", "7-8", "4", 2);
addNormEntry("wisc", "dg", "7-8", "5", 3);
addNormEntry("wisc", "dg", "7-8", "6", 4);
addNormEntry("wisc", "dg", "7-8", "7", 5);
addNormEntry("wisc", "dg", "7-8", "8", 6);
addNormEntry("wisc", "dg", "7-8", "9", 7);
addNormEntry("wisc", "dg", "7-8", "10", 8);
addNormEntry("wisc", "dg", "7-8", "11", 9);
addNormEntry("wisc", "dg", "7-8", "12", 10);
addNormEntry("wisc", "dg", "7-8", "13", 11);
addNormEntry("wisc", "dg", "7-8", "14", 12);
addNormEntry("wisc", "dg", "7-8", "15", 13);
addNormEntry("wisc", "dg", "7-8", "16-17", 14);
addNormEntry("wisc", "dg", "7-8", "18", 15);
addNormEntry("wisc", "dg", "7-8", "19", 16);
addNormEntry("wisc", "dg", "7-8", "20", 17);
addNormEntry("wisc", "dg", "7-8", "21-22", 18);
addNormEntry("wisc", "dg", "7-8", "23-32", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "8-0", "0-4", 1);
addNormEntry("wisc", "dg", "8-0", "5", 2);
addNormEntry("wisc", "dg", "8-0", "-", 3);
addNormEntry("wisc", "dg", "8-0", "6", 4);
addNormEntry("wisc", "dg", "8-0", "7", 5);
addNormEntry("wisc", "dg", "8-0", "8", 6);
addNormEntry("wisc", "dg", "8-0", "9", 7);
addNormEntry("wisc", "dg", "8-0", "10", 8);
addNormEntry("wisc", "dg", "8-0", "11", 9);
addNormEntry("wisc", "dg", "8-0", "12", 10);
addNormEntry("wisc", "dg", "8-0", "13", 11);
addNormEntry("wisc", "dg", "8-0", "14-15", 12);
addNormEntry("wisc", "dg", "8-0", "16", 13);
addNormEntry("wisc", "dg", "8-0", "17", 14);
addNormEntry("wisc", "dg", "8-0", "18", 15);
addNormEntry("wisc", "dg", "8-0", "19-20", 16);
addNormEntry("wisc", "dg", "8-0", "21", 17);
addNormEntry("wisc", "dg", "8-0", "22", 18);
addNormEntry("wisc", "dg", "8-0", "23-32", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "8-4", "0-4", 1);
addNormEntry("wisc", "dg", "8-4", "5", 2);
addNormEntry("wisc", "dg", "8-4", "6", 3);
addNormEntry("wisc", "dg", "8-4", "-", 4);
addNormEntry("wisc", "dg", "8-4", "7", 5);
addNormEntry("wisc", "dg", "8-4", "8", 6);
addNormEntry("wisc", "dg", "8-4", "9", 7);
addNormEntry("wisc", "dg", "8-4", "10", 8);
addNormEntry("wisc", "dg", "8-4", "11", 9);
addNormEntry("wisc", "dg", "8-4", "12-13", 10);
addNormEntry("wisc", "dg", "8-4", "14", 11);
addNormEntry("wisc", "dg", "8-4", "15", 12);
addNormEntry("wisc", "dg", "8-4", "16", 13);
addNormEntry("wisc", "dg", "8-4", "17", 14);
addNormEntry("wisc", "dg", "8-4", "18-19", 15);
addNormEntry("wisc", "dg", "8-4", "20", 16);
addNormEntry("wisc", "dg", "8-4", "21", 17);
addNormEntry("wisc", "dg", "8-4", "22-23", 18);
addNormEntry("wisc", "dg", "8-4", "24-32", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "8-8", "0-4", 1);
addNormEntry("wisc", "dg", "8-8", "5", 2);
addNormEntry("wisc", "dg", "8-8", "6", 3);
addNormEntry("wisc", "dg", "8-8", "7", 4);
addNormEntry("wisc", "dg", "8-8", "8", 5);
addNormEntry("wisc", "dg", "8-8", "9", 6);
addNormEntry("wisc", "dg", "8-8", "10", 7);
addNormEntry("wisc", "dg", "8-8", "11", 8);
addNormEntry("wisc", "dg", "8-8", "12", 9);
addNormEntry("wisc", "dg", "8-8", "13", 10);
addNormEntry("wisc", "dg", "8-8", "14", 11);
addNormEntry("wisc", "dg", "8-8", "15", 12);
addNormEntry("wisc", "dg", "8-8", "16-17", 13);
addNormEntry("wisc", "dg", "8-8", "18", 14);
addNormEntry("wisc", "dg", "8-8", "19", 15);
addNormEntry("wisc", "dg", "8-8", "20-21", 16);
addNormEntry("wisc", "dg", "8-8", "22", 17);
addNormEntry("wisc", "dg", "8-8", "23", 18);
addNormEntry("wisc", "dg", "8-8", "24-32", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "9-0", "0-5", 1);
addNormEntry("wisc", "dg", "9-0", "6", 2);
addNormEntry("wisc", "dg", "9-0", "-", 3);
addNormEntry("wisc", "dg", "9-0", "7", 4);
addNormEntry("wisc", "dg", "9-0", "8", 5);
addNormEntry("wisc", "dg", "9-0", "9", 6);
addNormEntry("wisc", "dg", "9-0", "10", 7);
addNormEntry("wisc", "dg", "9-0", "11", 8);
addNormEntry("wisc", "dg", "9-0", "12", 9);
addNormEntry("wisc", "dg", "9-0", "13", 10);
addNormEntry("wisc", "dg", "9-0", "14", 11);
addNormEntry("wisc", "dg", "9-0", "15-16", 12);
addNormEntry("wisc", "dg", "9-0", "17", 13);
addNormEntry("wisc", "dg", "9-0", "18", 14);
addNormEntry("wisc", "dg", "9-0", "19-20", 15);
addNormEntry("wisc", "dg", "9-0", "21", 16);
addNormEntry("wisc", "dg", "9-0", "22", 17);
addNormEntry("wisc", "dg", "9-0", "23-24", 18);
addNormEntry("wisc", "dg", "9-0", "25-32", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "9-4", "0-5", 1);
addNormEntry("wisc", "dg", "9-4", "6", 2);
addNormEntry("wisc", "dg", "9-4", "7", 3);
addNormEntry("wisc", "dg", "9-4", "-", 4);
addNormEntry("wisc", "dg", "9-4", "8", 5);
addNormEntry("wisc", "dg", "9-4", "9", 6);
addNormEntry("wisc", "dg", "9-4", "10", 7);
addNormEntry("wisc", "dg", "9-4", "11", 8);
addNormEntry("wisc", "dg", "9-4", "12", 9);
addNormEntry("wisc", "dg", "9-4", "13-14", 10);
addNormEntry("wisc", "dg", "9-4", "15", 11);
addNormEntry("wisc", "dg", "9-4", "16", 12);
addNormEntry("wisc", "dg", "9-4", "17", 13);
addNormEntry("wisc", "dg", "9-4", "18-19", 14);
addNormEntry("wisc", "dg", "9-4", "20", 15);
addNormEntry("wisc", "dg", "9-4", "21", 16);
addNormEntry("wisc", "dg", "9-4", "22-23", 17);
addNormEntry("wisc", "dg", "9-4", "24", 18);
addNormEntry("wisc", "dg", "9-4", "25-32", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "9-8", "0-5", 1);
addNormEntry("wisc", "dg", "9-8", "6", 2);
addNormEntry("wisc", "dg", "9-8", "7", 3);
addNormEntry("wisc", "dg", "9-8", "8", 4);
addNormEntry("wisc", "dg", "9-8", "9", 5);
addNormEntry("wisc", "dg", "9-8", "-", 6);
addNormEntry("wisc", "dg", "9-8", "10", 7);
addNormEntry("wisc", "dg", "9-8", "11", 8);
addNormEntry("wisc", "dg", "9-8", "12-13", 9);
addNormEntry("wisc", "dg", "9-8", "14", 10);
addNormEntry("wisc", "dg", "9-8", "15", 11);
addNormEntry("wisc", "dg", "9-8", "16", 12);
addNormEntry("wisc", "dg", "9-8", "17-18", 13);
addNormEntry("wisc", "dg", "9-8", "19", 14);
addNormEntry("wisc", "dg", "9-8", "20", 15);
addNormEntry("wisc", "dg", "9-8", "21-22", 16);
addNormEntry("wisc", "dg", "9-8", "23", 17);
addNormEntry("wisc", "dg", "9-8", "24-25", 18);
addNormEntry("wisc", "dg", "9-8", "26-32", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "10-0", "0-6", 1);
addNormEntry("wisc", "dg", "10-0", "7", 2);
addNormEntry("wisc", "dg", "10-0", "-", 3);
addNormEntry("wisc", "dg", "10-0", "8", 4);
addNormEntry("wisc", "dg", "10-0", "9", 5);
addNormEntry("wisc", "dg", "10-0", "10", 6);
addNormEntry("wisc", "dg", "10-0", "11", 7);
addNormEntry("wisc", "dg", "10-0", "12", 8);
addNormEntry("wisc", "dg", "10-0", "13", 9);
addNormEntry("wisc", "dg", "10-0", "14", 10);
addNormEntry("wisc", "dg", "10-0", "15", 11);
addNormEntry("wisc", "dg", "10-0", "16-17", 12);
addNormEntry("wisc", "dg", "10-0", "18", 13);
addNormEntry("wisc", "dg", "10-0", "19", 14);
addNormEntry("wisc", "dg", "10-0", "20-21", 15);
addNormEntry("wisc", "dg", "10-0", "22", 16);
addNormEntry("wisc", "dg", "10-0", "23-24", 17);
addNormEntry("wisc", "dg", "10-0", "25", 18);
addNormEntry("wisc", "dg", "10-0", "26-32", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "10-4", "0-6", 1);
addNormEntry("wisc", "dg", "10-4", "7", 2);
addNormEntry("wisc", "dg", "10-4", "8", 3);
addNormEntry("wisc", "dg", "10-4", "-", 4);
addNormEntry("wisc", "dg", "10-4", "9", 5);
addNormEntry("wisc", "dg", "10-4", "10", 6);
addNormEntry("wisc", "dg", "10-4", "11", 7);
addNormEntry("wisc", "dg", "10-4", "12", 8);
addNormEntry("wisc", "dg", "10-4", "13", 9);
addNormEntry("wisc", "dg", "10-4", "14", 10);
addNormEntry("wisc", "dg", "10-4", "15-16", 11);
addNormEntry("wisc", "dg", "10-4", "17", 12);
addNormEntry("wisc", "dg", "10-4", "18", 13);
addNormEntry("wisc", "dg", "10-4", "19-20", 14);
addNormEntry("wisc", "dg", "10-4", "21", 15);
addNormEntry("wisc", "dg", "10-4", "22", 16);
addNormEntry("wisc", "dg", "10-4", "23-24", 17);
addNormEntry("wisc", "dg", "10-4", "25-26", 18);
addNormEntry("wisc", "dg", "10-4", "27-32", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "10-8", "0-6", 1);
addNormEntry("wisc", "dg", "10-8", "7", 2);
addNormEntry("wisc", "dg", "10-8", "8", 3);
addNormEntry("wisc", "dg", "10-8", "-", 4);
addNormEntry("wisc", "dg", "10-8", "9", 5);
addNormEntry("wisc", "dg", "10-8", "10", 6);
addNormEntry("wisc", "dg", "10-8", "11", 7);
addNormEntry("wisc", "dg", "10-8", "12", 8);
addNormEntry("wisc", "dg", "10-8", "13", 9);
addNormEntry("wisc", "dg", "10-8", "14-15", 10);
addNormEntry("wisc", "dg", "10-8", "16", 11);
addNormEntry("wisc", "dg", "10-8", "17", 12);
addNormEntry("wisc", "dg", "10-8", "18-19", 13);
addNormEntry("wisc", "dg", "10-8", "20", 14);
addNormEntry("wisc", "dg", "10-8", "21", 15);
addNormEntry("wisc", "dg", "10-8", "22-23", 16);
addNormEntry("wisc", "dg", "10-8", "24", 17);
addNormEntry("wisc", "dg", "10-8", "25-26", 18);
addNormEntry("wisc", "dg", "10-8", "27-32", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "11-0", "0-6", 1);
addNormEntry("wisc", "dg", "11-0", "7", 2);
addNormEntry("wisc", "dg", "11-0", "8", 3);
addNormEntry("wisc", "dg", "11-0", "9", 4);
addNormEntry("wisc", "dg", "11-0", "-", 5);
addNormEntry("wisc", "dg", "11-0", "10", 6);
addNormEntry("wisc", "dg", "11-0", "11", 7);
addNormEntry("wisc", "dg", "11-0", "12", 8);
addNormEntry("wisc", "dg", "11-0", "13", 9);
addNormEntry("wisc", "dg", "11-0", "14-15", 10);
addNormEntry("wisc", "dg", "11-0", "16", 11);
addNormEntry("wisc", "dg", "11-0", "17", 12);
addNormEntry("wisc", "dg", "11-0", "18-19", 13);
addNormEntry("wisc", "dg", "11-0", "20", 14);
addNormEntry("wisc", "dg", "11-0", "21-22", 15);
addNormEntry("wisc", "dg", "11-0", "23", 16);
addNormEntry("wisc", "dg", "11-0", "24-25", 17);
addNormEntry("wisc", "dg", "11-0", "26", 18);
addNormEntry("wisc", "dg", "11-0", "27-32", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "11-4", "0-6", 1);
addNormEntry("wisc", "dg", "11-4", "7", 2);
addNormEntry("wisc", "dg", "11-4", "8", 3);
addNormEntry("wisc", "dg", "11-4", "9", 4);
addNormEntry("wisc", "dg", "11-4", "10", 5);
addNormEntry("wisc", "dg", "11-4", "11", 6);
addNormEntry("wisc", "dg", "11-4", "12", 7);
addNormEntry("wisc", "dg", "11-4", "13", 8);
addNormEntry("wisc", "dg", "11-4", "14", 9);
addNormEntry("wisc", "dg", "11-4", "15", 10);
addNormEntry("wisc", "dg", "11-4", "16", 11);
addNormEntry("wisc", "dg", "11-4", "17-18", 12);
addNormEntry("wisc", "dg", "11-4", "19", 13);
addNormEntry("wisc", "dg", "11-4", "20", 14);
addNormEntry("wisc", "dg", "11-4", "21-22", 15);
addNormEntry("wisc", "dg", "11-4", "23", 16);
addNormEntry("wisc", "dg", "11-4", "24-25", 17);
addNormEntry("wisc", "dg", "11-4", "26-27", 18);
addNormEntry("wisc", "dg", "11-4", "28-32", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "11-8", "0-6", 1);
addNormEntry("wisc", "dg", "11-8", "7", 2);
addNormEntry("wisc", "dg", "11-8", "8", 3);
addNormEntry("wisc", "dg", "11-8", "9", 4);
addNormEntry("wisc", "dg", "11-8", "10", 5);
addNormEntry("wisc", "dg", "11-8", "11", 6);
addNormEntry("wisc", "dg", "11-8", "12", 7);
addNormEntry("wisc", "dg", "11-8", "13", 8);
addNormEntry("wisc", "dg", "11-8", "14", 9);
addNormEntry("wisc", "dg", "11-8", "15", 10);
addNormEntry("wisc", "dg", "11-8", "16", 11);
addNormEntry("wisc", "dg", "11-8", "17-18", 12);
addNormEntry("wisc", "dg", "11-8", "19", 13);
addNormEntry("wisc", "dg", "11-8", "20-21", 14);
addNormEntry("wisc", "dg", "11-8", "22", 15);
addNormEntry("wisc", "dg", "11-8", "23-24", 16);
addNormEntry("wisc", "dg", "11-8", "25", 17);
addNormEntry("wisc", "dg", "11-8", "26-27", 18);
addNormEntry("wisc", "dg", "11-8", "28-32", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "12-0", "0-7", 1);
addNormEntry("wisc", "dg", "12-0", "8", 2);
addNormEntry("wisc", "dg", "12-0", "9", 3);
addNormEntry("wisc", "dg", "12-0", "10", 4);
addNormEntry("wisc", "dg", "12-0", "-", 5);
addNormEntry("wisc", "dg", "12-0", "11", 6);
addNormEntry("wisc", "dg", "12-0", "12", 7);
addNormEntry("wisc", "dg", "12-0", "13", 8);
addNormEntry("wisc", "dg", "12-0", "14", 9);
addNormEntry("wisc", "dg", "12-0", "15", 10);
addNormEntry("wisc", "dg", "12-0", "16-17", 11);
addNormEntry("wisc", "dg", "12-0", "18", 12);
addNormEntry("wisc", "dg", "12-0", "19", 13);
addNormEntry("wisc", "dg", "12-0", "20-21", 14);
addNormEntry("wisc", "dg", "12-0", "22", 15);
addNormEntry("wisc", "dg", "12-0", "23-24", 16);
addNormEntry("wisc", "dg", "12-0", "25-26", 17);
addNormEntry("wisc", "dg", "12-0", "27", 18);
addNormEntry("wisc", "dg", "12-0", "28-32", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "12-4", "0-7", 1);
addNormEntry("wisc", "dg", "12-4", "8", 2);
addNormEntry("wisc", "dg", "12-4", "9", 3);
addNormEntry("wisc", "dg", "12-4", "10", 4);
addNormEntry("wisc", "dg", "12-4", "-", 5);
addNormEntry("wisc", "dg", "12-4", "11", 6);
addNormEntry("wisc", "dg", "12-4", "12", 7);
addNormEntry("wisc", "dg", "12-4", "13", 8);
addNormEntry("wisc", "dg", "12-4", "14", 9);
addNormEntry("wisc", "dg", "12-4", "15", 10);
addNormEntry("wisc", "dg", "12-4", "16-17", 11);
addNormEntry("wisc", "dg", "12-4", "18", 12);
addNormEntry("wisc", "dg", "12-4", "19-20", 13);
addNormEntry("wisc", "dg", "12-4", "21", 14);
addNormEntry("wisc", "dg", "12-4", "22-23", 15);
addNormEntry("wisc", "dg", "12-4", "24", 16);
addNormEntry("wisc", "dg", "12-4", "25-26", 17);
addNormEntry("wisc", "dg", "12-4", "27-28", 18);
addNormEntry("wisc", "dg", "12-4", "29-32", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "12-8", "0-7", 1);
addNormEntry("wisc", "dg", "12-8", "8", 2);
addNormEntry("wisc", "dg", "12-8", "9", 3);
addNormEntry("wisc", "dg", "12-8", "10", 4);
addNormEntry("wisc", "dg", "12-8", "-", 5);
addNormEntry("wisc", "dg", "12-8", "11", 6);
addNormEntry("wisc", "dg", "12-8", "12", 7);
addNormEntry("wisc", "dg", "12-8", "13", 8);
addNormEntry("wisc", "dg", "12-8", "14", 9);
addNormEntry("wisc", "dg", "12-8", "15-16", 10);
addNormEntry("wisc", "dg", "12-8", "17", 11);
addNormEntry("wisc", "dg", "12-8", "18", 12);
addNormEntry("wisc", "dg", "12-8", "19-20", 13);
addNormEntry("wisc", "dg", "12-8", "21", 14);
addNormEntry("wisc", "dg", "12-8", "22-23", 15);
addNormEntry("wisc", "dg", "12-8", "24", 16);
addNormEntry("wisc", "dg", "12-8", "25-26", 17);
addNormEntry("wisc", "dg", "12-8", "27-28", 18);
addNormEntry("wisc", "dg", "12-8", "29-32", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "13-0", "0-7", 1);
addNormEntry("wisc", "dg", "13-0", "8", 2);
addNormEntry("wisc", "dg", "13-0", "9", 3);
addNormEntry("wisc", "dg", "13-0", "10", 4);
addNormEntry("wisc", "dg", "13-0", "11", 5);
addNormEntry("wisc", "dg", "13-0", "-", 6);
addNormEntry("wisc", "dg", "13-0", "12", 7);
addNormEntry("wisc", "dg", "13-0", "13", 8);
addNormEntry("wisc", "dg", "13-0", "14", 9);
addNormEntry("wisc", "dg", "13-0", "15-16", 10);
addNormEntry("wisc", "dg", "13-0", "17", 11);
addNormEntry("wisc", "dg", "13-0", "18-19", 12);
addNormEntry("wisc", "dg", "13-0", "20", 13);
addNormEntry("wisc", "dg", "13-0", "21-22", 14);
addNormEntry("wisc", "dg", "13-0", "23", 15);
addNormEntry("wisc", "dg", "13-0", "24-25", 16);
addNormEntry("wisc", "dg", "13-0", "26-27", 17);
addNormEntry("wisc", "dg", "13-0", "28", 18);
addNormEntry("wisc", "dg", "13-0", "29-32", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "13-4", "0-8", 1);
addNormEntry("wisc", "dg", "13-4", "9", 2);
addNormEntry("wisc", "dg", "13-4", "-", 3);
addNormEntry("wisc", "dg", "13-4", "10", 4);
addNormEntry("wisc", "dg", "13-4", "11", 5);
addNormEntry("wisc", "dg", "13-4", "12", 6);
addNormEntry("wisc", "dg", "13-4", "-", 7);
addNormEntry("wisc", "dg", "13-4", "13", 8);
addNormEntry("wisc", "dg", "13-4", "14", 9);
addNormEntry("wisc", "dg", "13-4", "15-16", 10);
addNormEntry("wisc", "dg", "13-4", "17", 11);
addNormEntry("wisc", "dg", "13-4", "18-19", 12);
addNormEntry("wisc", "dg", "13-4", "20", 13);
addNormEntry("wisc", "dg", "13-4", "21-22", 14);
addNormEntry("wisc", "dg", "13-4", "23", 15);
addNormEntry("wisc", "dg", "13-4", "24-25", 16);
addNormEntry("wisc", "dg", "13-4", "26-27", 17);
addNormEntry("wisc", "dg", "13-4", "28-29", 18);
addNormEntry("wisc", "dg", "13-4", "30-32", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "13-8", "0-8", 1);
addNormEntry("wisc", "dg", "13-8", "9", 2);
addNormEntry("wisc", "dg", "13-8", "10", 3);
addNormEntry("wisc", "dg", "13-8", "-", 4);
addNormEntry("wisc", "dg", "13-8", "11", 5);
addNormEntry("wisc", "dg", "13-8", "12", 6);
addNormEntry("wisc", "dg", "13-8", "13", 7);
addNormEntry("wisc", "dg", "13-8", "-", 8);
addNormEntry("wisc", "dg", "13-8", "14-15", 9);
addNormEntry("wisc", "dg", "13-8", "16", 10);
addNormEntry("wisc", "dg", "13-8", "17", 11);
addNormEntry("wisc", "dg", "13-8", "18-19", 12);
addNormEntry("wisc", "dg", "13-8", "20", 13);
addNormEntry("wisc", "dg", "13-8", "21-22", 14);
addNormEntry("wisc", "dg", "13-8", "23", 15);
addNormEntry("wisc", "dg", "13-8", "24-25", 16);
addNormEntry("wisc", "dg", "13-8", "26-27", 17);
addNormEntry("wisc", "dg", "13-8", "28-29", 18);
addNormEntry("wisc", "dg", "13-8", "30-32", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "14-0", "0-8", 1);
addNormEntry("wisc", "dg", "14-0", "9", 2);
addNormEntry("wisc", "dg", "14-0", "10", 3);
addNormEntry("wisc", "dg", "14-0", "-", 4);
addNormEntry("wisc", "dg", "14-0", "11", 5);
addNormEntry("wisc", "dg", "14-0", "12", 6);
addNormEntry("wisc", "dg", "14-0", "13", 7);
addNormEntry("wisc", "dg", "14-0", "14", 8);
addNormEntry("wisc", "dg", "14-0", "15", 9);
addNormEntry("wisc", "dg", "14-0", "16", 10);
addNormEntry("wisc", "dg", "14-0", "17-18", 11);
addNormEntry("wisc", "dg", "14-0", "19", 12);
addNormEntry("wisc", "dg", "14-0", "20-21", 13);
addNormEntry("wisc", "dg", "14-0", "22", 14);
addNormEntry("wisc", "dg", "14-0", "23-24", 15);
addNormEntry("wisc", "dg", "14-0", "25", 16);
addNormEntry("wisc", "dg", "14-0", "26-27", 17);
addNormEntry("wisc", "dg", "14-0", "28-29", 18);
addNormEntry("wisc", "dg", "14-0", "30-32", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "14-4", "0-8", 1);
addNormEntry("wisc", "dg", "14-4", "9", 2);
addNormEntry("wisc", "dg", "14-4", "10", 3);
addNormEntry("wisc", "dg", "14-4", "11", 4);
addNormEntry("wisc", "dg", "14-4", "-", 5);
addNormEntry("wisc", "dg", "14-4", "12", 6);
addNormEntry("wisc", "dg", "14-4", "13", 7);
addNormEntry("wisc", "dg", "14-4", "14", 8);
addNormEntry("wisc", "dg", "14-4", "15", 9);
addNormEntry("wisc", "dg", "14-4", "16", 10);
addNormEntry("wisc", "dg", "14-4", "17-18", 11);
addNormEntry("wisc", "dg", "14-4", "19", 12);
addNormEntry("wisc", "dg", "14-4", "20-21", 13);
addNormEntry("wisc", "dg", "14-4", "22", 14);
addNormEntry("wisc", "dg", "14-4", "23-24", 15);
addNormEntry("wisc", "dg", "14-4", "25-26", 16);
addNormEntry("wisc", "dg", "14-4", "27-28", 17);
addNormEntry("wisc", "dg", "14-4", "29-30", 18);
addNormEntry("wisc", "dg", "14-4", "31-32", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "14-8", "0-8", 1);
addNormEntry("wisc", "dg", "14-8", "9", 2);
addNormEntry("wisc", "dg", "14-8", "10", 3);
addNormEntry("wisc", "dg", "14-8", "11", 4);
addNormEntry("wisc", "dg", "14-8", "-", 5);
addNormEntry("wisc", "dg", "14-8", "12", 6);
addNormEntry("wisc", "dg", "14-8", "13", 7);
addNormEntry("wisc", "dg", "14-8", "14", 8);
addNormEntry("wisc", "dg", "14-8", "15", 9);
addNormEntry("wisc", "dg", "14-8", "16", 10);
addNormEntry("wisc", "dg", "14-8", "17-18", 11);
addNormEntry("wisc", "dg", "14-8", "19", 12);
addNormEntry("wisc", "dg", "14-8", "20-21", 13);
addNormEntry("wisc", "dg", "14-8", "22-23", 14);
addNormEntry("wisc", "dg", "14-8", "24", 15);
addNormEntry("wisc", "dg", "14-8", "25-26", 16);
addNormEntry("wisc", "dg", "14-8", "27-28", 17);
addNormEntry("wisc", "dg", "14-8", "29-30", 18);
addNormEntry("wisc", "dg", "14-8", "31-32", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "15-0", "0-8", 1);
addNormEntry("wisc", "dg", "15-0", "9", 2);
addNormEntry("wisc", "dg", "15-0", "10", 3);
addNormEntry("wisc", "dg", "15-0", "11", 4);
addNormEntry("wisc", "dg", "15-0", "-", 5);
addNormEntry("wisc", "dg", "15-0", "12", 6);
addNormEntry("wisc", "dg", "15-0", "13", 7);
addNormEntry("wisc", "dg", "15-0", "14", 8);
addNormEntry("wisc", "dg", "15-0", "15", 9);
addNormEntry("wisc", "dg", "15-0", "16", 10);
addNormEntry("wisc", "dg", "15-0", "17-18", 11);
addNormEntry("wisc", "dg", "15-0", "19-20", 12);
addNormEntry("wisc", "dg", "15-0", "21", 13);
addNormEntry("wisc", "dg", "15-0", "22-23", 14);
addNormEntry("wisc", "dg", "15-0", "24", 15);
addNormEntry("wisc", "dg", "15-0", "25-26", 16);
addNormEntry("wisc", "dg", "15-0", "27-28", 17);
addNormEntry("wisc", "dg", "15-0", "29-30", 18);
addNormEntry("wisc", "dg", "15-0", "31-32", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "15-4", "0-8", 1);
addNormEntry("wisc", "dg", "15-4", "9", 2);
addNormEntry("wisc", "dg", "15-4", "10", 3);
addNormEntry("wisc", "dg", "15-4", "11", 4);
addNormEntry("wisc", "dg", "15-4", "-", 5);
addNormEntry("wisc", "dg", "15-4", "12", 6);
addNormEntry("wisc", "dg", "15-4", "13", 7);
addNormEntry("wisc", "dg", "15-4", "14", 8);
addNormEntry("wisc", "dg", "15-4", "15", 9);
addNormEntry("wisc", "dg", "15-4", "16", 10);
addNormEntry("wisc", "dg", "15-4", "17-18", 11);
addNormEntry("wisc", "dg", "15-4", "19-20", 12);
addNormEntry("wisc", "dg", "15-4", "21", 13);
addNormEntry("wisc", "dg", "15-4", "22-23", 14);
addNormEntry("wisc", "dg", "15-4", "24", 15);
addNormEntry("wisc", "dg", "15-4", "25-26", 16);
addNormEntry("wisc", "dg", "15-4", "27-28", 17);
addNormEntry("wisc", "dg", "15-4", "29-30", 18);
addNormEntry("wisc", "dg", "15-4", "31-32", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "15-8", "0-8", 1);
addNormEntry("wisc", "dg", "15-8", "9", 2);
addNormEntry("wisc", "dg", "15-8", "10", 3);
addNormEntry("wisc", "dg", "15-8", "11", 4);
addNormEntry("wisc", "dg", "15-8", "12", 5);
addNormEntry("wisc", "dg", "15-8", "-", 6);
addNormEntry("wisc", "dg", "15-8", "13", 7);
addNormEntry("wisc", "dg", "15-8", "14", 8);
addNormEntry("wisc", "dg", "15-8", "15", 9);
addNormEntry("wisc", "dg", "15-8", "16-17", 10);
addNormEntry("wisc", "dg", "15-8", "18", 11);
addNormEntry("wisc", "dg", "15-8", "19-20", 12);
addNormEntry("wisc", "dg", "15-8", "21-22", 13);
addNormEntry("wisc", "dg", "15-8", "23", 14);
addNormEntry("wisc", "dg", "15-8", "24-25", 15);
addNormEntry("wisc", "dg", "15-8", "26", 16);
addNormEntry("wisc", "dg", "15-8", "27-28", 17);
addNormEntry("wisc", "dg", "15-8", "29-30", 18);
addNormEntry("wisc", "dg", "15-8", "31-32", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Dígitos)
addNormEntry("wisc", "dg", "16-0", "0-8", 1);
addNormEntry("wisc", "dg", "16-0", "9", 2);
addNormEntry("wisc", "dg", "16-0", "10", 3);
addNormEntry("wisc", "dg", "16-0", "11", 4);
addNormEntry("wisc", "dg", "16-0", "12", 5);
addNormEntry("wisc", "dg", "16-0", "-", 6);
addNormEntry("wisc", "dg", "16-0", "13", 7);
addNormEntry("wisc", "dg", "16-0", "14", 8);
addNormEntry("wisc", "dg", "16-0", "15", 9);
addNormEntry("wisc", "dg", "16-0", "16-17", 10);
addNormEntry("wisc", "dg", "16-0", "18", 11);
addNormEntry("wisc", "dg", "16-0", "19-20", 12);
addNormEntry("wisc", "dg", "16-0", "21-22", 13);
addNormEntry("wisc", "dg", "16-0", "23", 14);
addNormEntry("wisc", "dg", "16-0", "24-25", 15);
addNormEntry("wisc", "dg", "16-0", "26", 16);
addNormEntry("wisc", "dg", "16-0", "27-28", 17);
addNormEntry("wisc", "dg", "16-0", "29-30", 18);
addNormEntry("wisc", "dg", "16-0", "31-32", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Dígitos)
addNormEntry("wisc", "dg", "16-4", "0-8", 1);
addNormEntry("wisc", "dg", "16-4", "9", 2);
addNormEntry("wisc", "dg", "16-4", "10", 3);
addNormEntry("wisc", "dg", "16-4", "11", 4);
addNormEntry("wisc", "dg", "16-4", "12", 5);
addNormEntry("wisc", "dg", "16-4", "13", 6);
addNormEntry("wisc", "dg", "16-4", "-", 7);
addNormEntry("wisc", "dg", "16-4", "14", 8);
addNormEntry("wisc", "dg", "16-4", "15", 9);
addNormEntry("wisc", "dg", "16-4", "16-17", 10);
addNormEntry("wisc", "dg", "16-4", "18-19", 11);
addNormEntry("wisc", "dg", "16-4", "20", 12);
addNormEntry("wisc", "dg", "16-4", "21-22", 13);
addNormEntry("wisc", "dg", "16-4", "23", 14);
addNormEntry("wisc", "dg", "16-4", "24-25", 15);
addNormEntry("wisc", "dg", "16-4", "26-27", 16);
addNormEntry("wisc", "dg", "16-4", "28-29", 17);
addNormEntry("wisc", "dg", "16-4", "30", 18);
addNormEntry("wisc", "dg", "16-4", "31-32", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Dígitos)
addNormEntry("wisc", "dg", "16-8", "0-8", 1);
addNormEntry("wisc", "dg", "16-8", "9", 2);
addNormEntry("wisc", "dg", "16-8", "10", 3);
addNormEntry("wisc", "dg", "16-8", "11", 4);
addNormEntry("wisc", "dg", "16-8", "12", 5);
addNormEntry("wisc", "dg", "16-8", "13", 6);
addNormEntry("wisc", "dg", "16-8", "14", 7);
addNormEntry("wisc", "dg", "16-8", "15", 8);
addNormEntry("wisc", "dg", "16-8", "16", 9);
addNormEntry("wisc", "dg", "16-8", "17", 10);
addNormEntry("wisc", "dg", "16-8", "18-19", 11);
addNormEntry("wisc", "dg", "16-8", "20-21", 12);
addNormEntry("wisc", "dg", "16-8", "22", 13);
addNormEntry("wisc", "dg", "16-8", "23-24", 14);
addNormEntry("wisc", "dg", "16-8", "25", 15);
addNormEntry("wisc", "dg", "16-8", "26-27", 16);
addNormEntry("wisc", "dg", "16-8", "28-29", 17);
addNormEntry("wisc", "dg", "16-8", "30-31", 18);
addNormEntry("wisc", "dg", "16-8", "32", 19);

// --- Normas do Subteste Cancelamento (CN) ---

// FAIXA 6-0 — 6 anos (Cancelamento)
addNormEntry("wisc", "cn", "6-0", "-", 1);
addNormEntry("wisc", "cn", "6-0", "0", 2);
addNormEntry("wisc", "cn", "6-0", "-", 3);
addNormEntry("wisc", "cn", "6-0", "1", 4);
addNormEntry("wisc", "cn", "6-0", "2", 5);
addNormEntry("wisc", "cn", "6-0", "3", 6);
addNormEntry("wisc", "cn", "6-0", "4-5", 7);
addNormEntry("wisc", "cn", "6-0", "6", 8);
addNormEntry("wisc", "cn", "6-0", "7", 9);
addNormEntry("wisc", "cn", "6-0", "8-9", 10);
addNormEntry("wisc", "cn", "6-0", "10-11", 11);
addNormEntry("wisc", "cn", "6-0", "12", 12);
addNormEntry("wisc", "cn", "6-0", "13-14", 13);
addNormEntry("wisc", "cn", "6-0", "15-16", 14);
addNormEntry("wisc", "cn", "6-0", "17-18", 15);
addNormEntry("wisc", "cn", "6-0", "19-20", 16);
addNormEntry("wisc", "cn", "6-0", "21-22", 17);
addNormEntry("wisc", "cn", "6-0", "23-24", 18);
addNormEntry("wisc", "cn", "6-0", "25-28", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "6-4", "0", 1);
addNormEntry("wisc", "cn", "6-4", "-", 2);
addNormEntry("wisc", "cn", "6-4", "1", 3);
addNormEntry("wisc", "cn", "6-4", "2", 4);
addNormEntry("wisc", "cn", "6-4", "3", 5);
addNormEntry("wisc", "cn", "6-4", "4", 6);
addNormEntry("wisc", "cn", "6-4", "5", 7);
addNormEntry("wisc", "cn", "6-4", "6-7", 8);
addNormEntry("wisc", "cn", "6-4", "8", 9);
addNormEntry("wisc", "cn", "6-4", "9-10", 10);
addNormEntry("wisc", "cn", "6-4", "11", 11);
addNormEntry("wisc", "cn", "6-4", "12-13", 12);
addNormEntry("wisc", "cn", "6-4", "14-15", 13);
addNormEntry("wisc", "cn", "6-4", "16-17", 14);
addNormEntry("wisc", "cn", "6-4", "18-19", 15);
addNormEntry("wisc", "cn", "6-4", "20-21", 16);
addNormEntry("wisc", "cn", "6-4", "22-23", 17);
addNormEntry("wisc", "cn", "6-4", "24", 18);
addNormEntry("wisc", "cn", "6-4", "25-28", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "6-8", "0", 1);
addNormEntry("wisc", "cn", "6-8", "-", 2);
addNormEntry("wisc", "cn", "6-8", "1", 3);
addNormEntry("wisc", "cn", "6-8", "2", 4);
addNormEntry("wisc", "cn", "6-8", "3-4", 5);
addNormEntry("wisc", "cn", "6-8", "5", 6);
addNormEntry("wisc", "cn", "6-8", "6", 7);
addNormEntry("wisc", "cn", "6-8", "7-8", 8);
addNormEntry("wisc", "cn", "6-8", "9", 9);
addNormEntry("wisc", "cn", "6-8", "10", 10);
addNormEntry("wisc", "cn", "6-8", "11-12", 11);
addNormEntry("wisc", "cn", "6-8", "13-14", 12);
addNormEntry("wisc", "cn", "6-8", "15", 13);
addNormEntry("wisc", "cn", "6-8", "16-17", 14);
addNormEntry("wisc", "cn", "6-8", "18-19", 15);
addNormEntry("wisc", "cn", "6-8", "20-21", 16);
addNormEntry("wisc", "cn", "6-8", "22-23", 17);
addNormEntry("wisc", "cn", "6-8", "24-25", 18);
addNormEntry("wisc", "cn", "6-8", "26-28", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "7-0", "0", 1);
addNormEntry("wisc", "cn", "7-0", "1", 2);
addNormEntry("wisc", "cn", "7-0", "2", 3);
addNormEntry("wisc", "cn", "7-0", "3", 4);
addNormEntry("wisc", "cn", "7-0", "4", 5);
addNormEntry("wisc", "cn", "7-0", "5-6", 6);
addNormEntry("wisc", "cn", "7-0", "7", 7);
addNormEntry("wisc", "cn", "7-0", "8", 8);
addNormEntry("wisc", "cn", "7-0", "9-10", 9);
addNormEntry("wisc", "cn", "7-0", "11", 10);
addNormEntry("wisc", "cn", "7-0", "12-13", 11);
addNormEntry("wisc", "cn", "7-0", "14", 12);
addNormEntry("wisc", "cn", "7-0", "15-16", 13);
addNormEntry("wisc", "cn", "7-0", "17-18", 14);
addNormEntry("wisc", "cn", "7-0", "19-20", 15);
addNormEntry("wisc", "cn", "7-0", "21-22", 16);
addNormEntry("wisc", "cn", "7-0", "23-24", 17);
addNormEntry("wisc", "cn", "7-0", "25", 18);
addNormEntry("wisc", "cn", "7-0", "26 -28", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "7-4", "0", 1);
addNormEntry("wisc", "cn", "7-4", "1", 2);
addNormEntry("wisc", "cn", "7-4", "2", 3);
addNormEntry("wisc", "cn", "7-4", "3-4", 4);
addNormEntry("wisc", "cn", "7-4", "5", 5);
addNormEntry("wisc", "cn", "7-4", "6", 6);
addNormEntry("wisc", "cn", "7-4", "7", 7);
addNormEntry("wisc", "cn", "7-4", "8-9", 8);
addNormEntry("wisc", "cn", "7-4", "10", 9);
addNormEntry("wisc", "cn", "7-4", "11-12", 10);
addNormEntry("wisc", "cn", "7-4", "13", 11);
addNormEntry("wisc", "cn", "7-4", "14-15", 12);
addNormEntry("wisc", "cn", "7-4", "16", 13);
addNormEntry("wisc", "cn", "7-4", "17-18", 14);
addNormEntry("wisc", "cn", "7-4", "19-20", 15);
addNormEntry("wisc", "cn", "7-4", "21-22", 16);
addNormEntry("wisc", "cn", "7-4", "23-24", 17);
addNormEntry("wisc", "cn", "7-4", "25", 18);
addNormEntry("wisc", "cn", "7-4", "26-28", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "7-8", "0", 1);
addNormEntry("wisc", "cn", "7-8", "1-2", 2);
addNormEntry("wisc", "cn", "7-8", "3", 3);
addNormEntry("wisc", "cn", "7-8", "4", 4);
addNormEntry("wisc", "cn", "7-8", "5", 5);
addNormEntry("wisc", "cn", "7-8", "6-7", 6);
addNormEntry("wisc", "cn", "7-8", "8", 7);
addNormEntry("wisc", "cn", "7-8", "9", 8);
addNormEntry("wisc", "cn", "7-8", "10-11", 9);
addNormEntry("wisc", "cn", "7-8", "12", 10);
addNormEntry("wisc", "cn", "7-8", "13-14", 11);
addNormEntry("wisc", "cn", "7-8", "15", 12);
addNormEntry("wisc", "cn", "7-8", "16-17", 13);
addNormEntry("wisc", "cn", "7-8", "18", 14);
addNormEntry("wisc", "cn", "7-8", "19-20", 15);
addNormEntry("wisc", "cn", "7-8", "21-22", 16);
addNormEntry("wisc", "cn", "7-8", "23-24", 17);
addNormEntry("wisc", "cn", "7-8", "25", 18);
addNormEntry("wisc", "cn", "7-8", "26-28", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "8-0", "0-1", 1);
addNormEntry("wisc", "cn", "8-0", "2", 2);
addNormEntry("wisc", "cn", "8-0", "3", 3);
addNormEntry("wisc", "cn", "8-0", "4-5", 4);
addNormEntry("wisc", "cn", "8-0", "6", 5);
addNormEntry("wisc", "cn", "8-0", "7", 6);
addNormEntry("wisc", "cn", "8-0", "8-9", 7);
addNormEntry("wisc", "cn", "8-0", "10", 8);
addNormEntry("wisc", "cn", "8-0", "11", 9);
addNormEntry("wisc", "cn", "8-0", "12-13", 10);
addNormEntry("wisc", "cn", "8-0", "14", 11);
addNormEntry("wisc", "cn", "8-0", "15-16", 12);
addNormEntry("wisc", "cn", "8-0", "17", 13);
addNormEntry("wisc", "cn", "8-0", "18-19", 14);
addNormEntry("wisc", "cn", "8-0", "20", 15);
addNormEntry("wisc", "cn", "8-0", "21-22", 16);
addNormEntry("wisc", "cn", "8-0", "23-24", 17);
addNormEntry("wisc", "cn", "8-0", "25", 18);
addNormEntry("wisc", "cn", "8-0", "26-28", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "8-4", "0-1", 1);
addNormEntry("wisc", "cn", "8-4", "2", 2);
addNormEntry("wisc", "cn", "8-4", "3-4", 3);
addNormEntry("wisc", "cn", "8-4", "5", 4);
addNormEntry("wisc", "cn", "8-4", "6", 5);
addNormEntry("wisc", "cn", "8-4", "7-8", 6);
addNormEntry("wisc", "cn", "8-4", "9", 7);
addNormEntry("wisc", "cn", "8-4", "10-11", 8);
addNormEntry("wisc", "cn", "8-4", "12", 9);
addNormEntry("wisc", "cn", "8-4", "13", 10);
addNormEntry("wisc", "cn", "8-4", "14-15", 11);
addNormEntry("wisc", "cn", "8-4", "16", 12);
addNormEntry("wisc", "cn", "8-4", "17-18", 13);
addNormEntry("wisc", "cn", "8-4", "19", 14);
addNormEntry("wisc", "cn", "8-4", "20-21", 15);
addNormEntry("wisc", "cn", "8-4", "22", 16);
addNormEntry("wisc", "cn", "8-4", "23-24", 17);
addNormEntry("wisc", "cn", "8-4", "25", 18);
addNormEntry("wisc", "cn", "8-4", "26-28", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "8-8", "0-1", 1);
addNormEntry("wisc", "cn", "8-8", "2-3", 2);
addNormEntry("wisc", "cn", "8-8", "4", 3);
addNormEntry("wisc", "cn", "8-8", "5", 4);
addNormEntry("wisc", "cn", "8-8", "6-7", 5);
addNormEntry("wisc", "cn", "8-8", "8", 6);
addNormEntry("wisc", "cn", "8-8", "9-10", 7);
addNormEntry("wisc", "cn", "8-8", "11", 8);
addNormEntry("wisc", "cn", "8-8", "12", 9);
addNormEntry("wisc", "cn", "8-8", "13-14", 10);
addNormEntry("wisc", "cn", "8-8", "15", 11);
addNormEntry("wisc", "cn", "8-8", "16-17", 12);
addNormEntry("wisc", "cn", "8-8", "18", 13);
addNormEntry("wisc", "cn", "8-8", "19-20", 14);
addNormEntry("wisc", "cn", "8-8", "21", 15);
addNormEntry("wisc", "cn", "8-8", "22-23", 16);
addNormEntry("wisc", "cn", "8-8", "24-25", 17);
addNormEntry("wisc", "cn", "8-8", "26", 18);
addNormEntry("wisc", "cn", "8-8", "27-28", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "9-0", "0-1", 1);
addNormEntry("wisc", "cn", "9-0", "2-3", 2);
addNormEntry("wisc", "cn", "9-0", "4", 3);
addNormEntry("wisc", "cn", "9-0", "5-6", 4);
addNormEntry("wisc", "cn", "9-0", "7", 5);
addNormEntry("wisc", "cn", "9-0", "8-9", 6);
addNormEntry("wisc", "cn", "9-0", "10", 7);
addNormEntry("wisc", "cn", "9-0", "11", 8);
addNormEntry("wisc", "cn", "9-0", "12-13", 9);
addNormEntry("wisc", "cn", "9-0", "14", 10);
addNormEntry("wisc", "cn", "9-0", "15-16", 11);
addNormEntry("wisc", "cn", "9-0", "17", 12);
addNormEntry("wisc", "cn", "9-0", "18-19", 13);
addNormEntry("wisc", "cn", "9-0", "20", 14);
addNormEntry("wisc", "cn", "9-0", "21", 15);
addNormEntry("wisc", "cn", "9-0", "22-23", 16);
addNormEntry("wisc", "cn", "9-0", "24-25", 17);
addNormEntry("wisc", "cn", "9-0", "26", 18);
addNormEntry("wisc", "cn", "9-0", "27-28", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "9-4", "0-2", 1);
addNormEntry("wisc", "cn", "9-4", "3", 2);
addNormEntry("wisc", "cn", "9-4", "4-5", 3);
addNormEntry("wisc", "cn", "9-4", "6", 4);
addNormEntry("wisc", "cn", "9-4", "7-8", 5);
addNormEntry("wisc", "cn", "9-4", "9", 6);
addNormEntry("wisc", "cn", "9-4", "10", 7);
addNormEntry("wisc", "cn", "9-4", "11-12", 8);
addNormEntry("wisc", "cn", "9-4", "13", 9);
addNormEntry("wisc", "cn", "9-4", "14-15", 10);
addNormEntry("wisc", "cn", "9-4", "16", 11);
addNormEntry("wisc", "cn", "9-4", "17-18", 12);
addNormEntry("wisc", "cn", "9-4", "19", 13);
addNormEntry("wisc", "cn", "9-4", "20", 14);
addNormEntry("wisc", "cn", "9-4", "21-22", 15);
addNormEntry("wisc", "cn", "9-4", "23", 16);
addNormEntry("wisc", "cn", "9-4", "24-25", 17);
addNormEntry("wisc", "cn", "9-4", "26", 18);
addNormEntry("wisc", "cn", "9-4", "27-28", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "9-8", "0-2", 1);
addNormEntry("wisc", "cn", "9-8", "3", 2);
addNormEntry("wisc", "cn", "9-8", "4-5", 3);
addNormEntry("wisc", "cn", "9-8", "6", 4);
addNormEntry("wisc", "cn", "9-8", "7-8", 5);
addNormEntry("wisc", "cn", "9-8", "9", 6);
addNormEntry("wisc", "cn", "9-8", "10-11", 7);
addNormEntry("wisc", "cn", "9-8", "12", 8);
addNormEntry("wisc", "cn", "9-8", "13-14", 9);
addNormEntry("wisc", "cn", "9-8", "15", 10);
addNormEntry("wisc", "cn", "9-8", "16", 11);
addNormEntry("wisc", "cn", "9-8", "17-18", 12);
addNormEntry("wisc", "cn", "9-8", "19", 13);
addNormEntry("wisc", "cn", "9-8", "20-21", 14);
addNormEntry("wisc", "cn", "9-8", "22", 15);
addNormEntry("wisc", "cn", "9-8", "23", 16);
addNormEntry("wisc", "cn", "9-8", "24-25", 17);
addNormEntry("wisc", "cn", "9-8", "26", 18);
addNormEntry("wisc", "cn", "9-8", "27-28", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "10-0", "0-2", 1);
addNormEntry("wisc", "cn", "10-0", "3-4", 2);
addNormEntry("wisc", "cn", "10-0", "5", 3);
addNormEntry("wisc", "cn", "10-0", "6-7", 4);
addNormEntry("wisc", "cn", "10-0", "8", 5);
addNormEntry("wisc", "cn", "10-0", "9-10", 6);
addNormEntry("wisc", "cn", "10-0", "11", 7);
addNormEntry("wisc", "cn", "10-0", "12-13", 8);
addNormEntry("wisc", "cn", "10-0", "14", 9);
addNormEntry("wisc", "cn", "10-0", "15", 10);
addNormEntry("wisc", "cn", "10-0", "16-17", 11);
addNormEntry("wisc", "cn", "10-0", "18", 12);
addNormEntry("wisc", "cn", "10-0", "19-20", 13);
addNormEntry("wisc", "cn", "10-0", "21", 14);
addNormEntry("wisc", "cn", "10-0", "22", 15);
addNormEntry("wisc", "cn", "10-0", "23", 16);
addNormEntry("wisc", "cn", "10-0", "24-25", 17);
addNormEntry("wisc", "cn", "10-0", "26", 18);
addNormEntry("wisc", "cn", "10-0", "27-28", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "10-4", "0-2", 1);
addNormEntry("wisc", "cn", "10-4", "3-4", 2);
addNormEntry("wisc", "cn", "10-4", "5", 3);
addNormEntry("wisc", "cn", "10-4", "6-7", 4);
addNormEntry("wisc", "cn", "10-4", "8", 5);
addNormEntry("wisc", "cn", "10-4", "9-10", 6);
addNormEntry("wisc", "cn", "10-4", "11", 7);
addNormEntry("wisc", "cn", "10-4", "12-13", 8);
addNormEntry("wisc", "cn", "10-4", "14", 9);
addNormEntry("wisc", "cn", "10-4", "15-16", 10);
addNormEntry("wisc", "cn", "10-4", "17", 11);
addNormEntry("wisc", "cn", "10-4", "18", 12);
addNormEntry("wisc", "cn", "10-4", "19-20", 13);
addNormEntry("wisc", "cn", "10-4", "21", 14);
addNormEntry("wisc", "cn", "10-4", "22", 15);
addNormEntry("wisc", "cn", "10-4", "23-24", 16);
addNormEntry("wisc", "cn", "10-4", "25", 17);
addNormEntry("wisc", "cn", "10-4", "26", 18);
addNormEntry("wisc", "cn", "10-4", "27-28", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "10-8", "0-3", 1);
addNormEntry("wisc", "cn", "10-8", "4", 2);
addNormEntry("wisc", "cn", "10-8", "5-6", 3);
addNormEntry("wisc", "cn", "10-8", "7", 4);
addNormEntry("wisc", "cn", "10-8", "8-9", 5);
addNormEntry("wisc", "cn", "10-8", "10", 6);
addNormEntry("wisc", "cn", "10-8", "11-12", 7);
addNormEntry("wisc", "cn", "10-8", "13", 8);
addNormEntry("wisc", "cn", "10-8", "14-15", 9);
addNormEntry("wisc", "cn", "10-8", "16", 10);
addNormEntry("wisc", "cn", "10-8", "17", 11);
addNormEntry("wisc", "cn", "10-8", "18-19", 12);
addNormEntry("wisc", "cn", "10-8", "20", 13);
addNormEntry("wisc", "cn", "10-8", "21", 14);
addNormEntry("wisc", "cn", "10-8", "22-23", 15);
addNormEntry("wisc", "cn", "10-8", "24", 16);
addNormEntry("wisc", "cn", "10-8", "25", 17);
addNormEntry("wisc", "cn", "10-8", "26", 18);
addNormEntry("wisc", "cn", "10-8", "27-28", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "11-0", "0-3", 1);
addNormEntry("wisc", "cn", "11-0", "4", 2);
addNormEntry("wisc", "cn", "11-0", "5-6", 3);
addNormEntry("wisc", "cn", "11-0", "7", 4);
addNormEntry("wisc", "cn", "11-0", "8-9", 5);
addNormEntry("wisc", "cn", "11-0", "10", 6);
addNormEntry("wisc", "cn", "11-0", "11-12", 7);
addNormEntry("wisc", "cn", "11-0", "13", 8);
addNormEntry("wisc", "cn", "11-0", "14-15", 9);
addNormEntry("wisc", "cn", "11-0", "16", 10);
addNormEntry("wisc", "cn", "11-0", "17-18", 11);
addNormEntry("wisc", "cn", "11-0", "19", 12);
addNormEntry("wisc", "cn", "11-0", "20", 13);
addNormEntry("wisc", "cn", "11-0", "21-22", 14);
addNormEntry("wisc", "cn", "11-0", "23", 15);
addNormEntry("wisc", "cn", "11-0", "24", 16);
addNormEntry("wisc", "cn", "11-0", "25", 17);
addNormEntry("wisc", "cn", "11-0", "26", 18);
addNormEntry("wisc", "cn", "11-0", "27-28", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "11-4", "0-3", 1);
addNormEntry("wisc", "cn", "11-4", "4-5", 2);
addNormEntry("wisc", "cn", "11-4", "6", 3);
addNormEntry("wisc", "cn", "11-4", "7-8", 4);
addNormEntry("wisc", "cn", "11-4", "9", 5);
addNormEntry("wisc", "cn", "11-4", "10-11", 6);
addNormEntry("wisc", "cn", "11-4", "12", 7);
addNormEntry("wisc", "cn", "11-4", "13-14", 8);
addNormEntry("wisc", "cn", "11-4", "15", 9);
addNormEntry("wisc", "cn", "11-4", "16", 10);
addNormEntry("wisc", "cn", "11-4", "17-18", 11);
addNormEntry("wisc", "cn", "11-4", "19", 12);
addNormEntry("wisc", "cn", "11-4", "20", 13);
addNormEntry("wisc", "cn", "11-4", "21-22", 14);
addNormEntry("wisc", "cn", "11-4", "23", 15);
addNormEntry("wisc", "cn", "11-4", "24", 16);
addNormEntry("wisc", "cn", "11-4", "25", 17);
addNormEntry("wisc", "cn", "11-4", "26", 18);
addNormEntry("wisc", "cn", "11-4", "27-28", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "11-8", "0-3", 1);
addNormEntry("wisc", "cn", "11-8", "4-5", 2);
addNormEntry("wisc", "cn", "11-8", "6", 3);
addNormEntry("wisc", "cn", "11-8", "7-8", 4);
addNormEntry("wisc", "cn", "11-8", "9", 5);
addNormEntry("wisc", "cn", "11-8", "10-11", 6);
addNormEntry("wisc", "cn", "11-8", "12", 7);
addNormEntry("wisc", "cn", "11-8", "13-14", 8);
addNormEntry("wisc", "cn", "11-8", "15", 9);
addNormEntry("wisc", "cn", "11-8", "16-17", 10);
addNormEntry("wisc", "cn", "11-8", "18", 11);
addNormEntry("wisc", "cn", "11-8", "19", 12);
addNormEntry("wisc", "cn", "11-8", "20-21", 13);
addNormEntry("wisc", "cn", "11-8", "22", 14);
addNormEntry("wisc", "cn", "11-8", "23", 15);
addNormEntry("wisc", "cn", "11-8", "24-25", 16);
addNormEntry("wisc", "cn", "11-8", "26", 17);
addNormEntry("wisc", "cn", "11-8", "27", 18);
addNormEntry("wisc", "cn", "11-8", "28", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "12-0", "0-3", 1);
addNormEntry("wisc", "cn", "12-0", "4-5", 2);
addNormEntry("wisc", "cn", "12-0", "6-7", 3);
addNormEntry("wisc", "cn", "12-0", "8", 4);
addNormEntry("wisc", "cn", "12-0", "9-10", 5);
addNormEntry("wisc", "cn", "12-0", "11", 6);
addNormEntry("wisc", "cn", "12-0", "12-13", 7);
addNormEntry("wisc", "cn", "12-0", "14", 8);
addNormEntry("wisc", "cn", "12-0", "15-16", 9);
addNormEntry("wisc", "cn", "12-0", "17", 10);
addNormEntry("wisc", "cn", "12-0", "18", 11);
addNormEntry("wisc", "cn", "12-0", "19-20", 12);
addNormEntry("wisc", "cn", "12-0", "21", 13);
addNormEntry("wisc", "cn", "12-0", "22", 14);
addNormEntry("wisc", "cn", "12-0", "23", 15);
addNormEntry("wisc", "cn", "12-0", "24-25", 16);
addNormEntry("wisc", "cn", "12-0", "26", 17);
addNormEntry("wisc", "cn", "12-0", "27", 18);
addNormEntry("wisc", "cn", "12-0", "28", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "12-4", "0-3", 1);
addNormEntry("wisc", "cn", "12-4", "4-5", 2);
addNormEntry("wisc", "cn", "12-4", "6-7", 3);
addNormEntry("wisc", "cn", "12-4", "8", 4);
addNormEntry("wisc", "cn", "12-4", "9-10", 5);
addNormEntry("wisc", "cn", "12-4", "11", 6);
addNormEntry("wisc", "cn", "12-4", "12-13", 7);
addNormEntry("wisc", "cn", "12-4", "14", 8);
addNormEntry("wisc", "cn", "12-4", "15-16", 9);
addNormEntry("wisc", "cn", "12-4", "17", 10);
addNormEntry("wisc", "cn", "12-4", "18", 11);
addNormEntry("wisc", "cn", "12-4", "19-20", 12);
addNormEntry("wisc", "cn", "12-4", "21", 13);
addNormEntry("wisc", "cn", "12-4", "22", 14);
addNormEntry("wisc", "cn", "12-4", "23", 15);
addNormEntry("wisc", "cn", "12-4", "24-25", 16);
addNormEntry("wisc", "cn", "12-4", "26", 17);
addNormEntry("wisc", "cn", "12-4", "27", 18);
addNormEntry("wisc", "cn", "12-4", "28", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "12-8", "0-4", 1);
addNormEntry("wisc", "cn", "12-8", "5", 2);
addNormEntry("wisc", "cn", "12-8", "6-7", 3);
addNormEntry("wisc", "cn", "12-8", "8", 4);
addNormEntry("wisc", "cn", "12-8", "9-10", 5);
addNormEntry("wisc", "cn", "12-8", "11", 6);
addNormEntry("wisc", "cn", "12-8", "12-13", 7);
addNormEntry("wisc", "cn", "12-8", "14", 8);
addNormEntry("wisc", "cn", "12-8", "15-16", 9);
addNormEntry("wisc", "cn", "12-8", "17", 10);
addNormEntry("wisc", "cn", "12-8", "18-19", 11);
addNormEntry("wisc", "cn", "12-8", "20", 12);
addNormEntry("wisc", "cn", "12-8", "21", 13);
addNormEntry("wisc", "cn", "12-8", "22", 14);
addNormEntry("wisc", "cn", "12-8", "23", 15);
addNormEntry("wisc", "cn", "12-8", "24-25", 16);
addNormEntry("wisc", "cn", "12-8", "26", 17);
addNormEntry("wisc", "cn", "12-8", "27", 18);
addNormEntry("wisc", "cn", "12-8", "28", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "13-0", "0-4", 1);
addNormEntry("wisc", "cn", "13-0", "5", 2);
addNormEntry("wisc", "cn", "13-0", "6-7", 3);
addNormEntry("wisc", "cn", "13-0", "8-9", 4);
addNormEntry("wisc", "cn", "13-0", "10", 5);
addNormEntry("wisc", "cn", "13-0", "11-12", 6);
addNormEntry("wisc", "cn", "13-0", "13", 7);
addNormEntry("wisc", "cn", "13-0", "14-15", 8);
addNormEntry("wisc", "cn", "13-0", "16", 9);
addNormEntry("wisc", "cn", "13-0", "17", 10);
addNormEntry("wisc", "cn", "13-0", "18-19", 11);
addNormEntry("wisc", "cn", "13-0", "20", 12);
addNormEntry("wisc", "cn", "13-0", "21", 13);
addNormEntry("wisc", "cn", "13-0", "22", 14);
addNormEntry("wisc", "cn", "13-0", "23-24", 15);
addNormEntry("wisc", "cn", "13-0", "25", 16);
addNormEntry("wisc", "cn", "13-0", "26", 17);
addNormEntry("wisc", "cn", "13-0", "27", 18);
addNormEntry("wisc", "cn", "13-0", "28", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "13-4", "0-4", 1);
addNormEntry("wisc", "cn", "13-4", "5-6", 2);
addNormEntry("wisc", "cn", "13-4", "7", 3);
addNormEntry("wisc", "cn", "13-4", "8-9", 4);
addNormEntry("wisc", "cn", "13-4", "10", 5);
addNormEntry("wisc", "cn", "13-4", "11-12", 6);
addNormEntry("wisc", "cn", "13-4", "13", 7);
addNormEntry("wisc", "cn", "13-4", "14-15", 8);
addNormEntry("wisc", "cn", "13-4", "16", 9);
addNormEntry("wisc", "cn", "13-4", "17-18", 10);
addNormEntry("wisc", "cn", "13-4", "19", 11);
addNormEntry("wisc", "cn", "13-4", "20", 12);
addNormEntry("wisc", "cn", "13-4", "21", 13);
addNormEntry("wisc", "cn", "13-4", "22-23", 14);
addNormEntry("wisc", "cn", "13-4", "24", 15);
addNormEntry("wisc", "cn", "13-4", "25", 16);
addNormEntry("wisc", "cn", "13-4", "26", 17);
addNormEntry("wisc", "cn", "13-4", "27", 18);
addNormEntry("wisc", "cn", "13-4", "28", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "13-8", "0-4", 1);
addNormEntry("wisc", "cn", "13-8", "5-6", 2);
addNormEntry("wisc", "cn", "13-8", "7", 3);
addNormEntry("wisc", "cn", "13-8", "8-9", 4);
addNormEntry("wisc", "cn", "13-8", "10", 5);
addNormEntry("wisc", "cn", "13-8", "11-12", 6);
addNormEntry("wisc", "cn", "13-8", "13", 7);
addNormEntry("wisc", "cn", "13-8", "14-15", 8);
addNormEntry("wisc", "cn", "13-8", "16", 9);
addNormEntry("wisc", "cn", "13-8", "17-18", 10);
addNormEntry("wisc", "cn", "13-8", "19", 11);
addNormEntry("wisc", "cn", "13-8", "20", 12);
addNormEntry("wisc", "cn", "13-8", "21", 13);
addNormEntry("wisc", "cn", "13-8", "22-23", 14);
addNormEntry("wisc", "cn", "13-8", "24", 15);
addNormEntry("wisc", "cn", "13-8", "25", 16);
addNormEntry("wisc", "cn", "13-8", "26", 17);
addNormEntry("wisc", "cn", "13-8", "27", 18);
addNormEntry("wisc", "cn", "13-8", "28", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "14-0", "0-4", 1);
addNormEntry("wisc", "cn", "14-0", "5-6", 2);
addNormEntry("wisc", "cn", "14-0", "7-8", 3);
addNormEntry("wisc", "cn", "14-0", "9", 4);
addNormEntry("wisc", "cn", "14-0", "10-11", 5);
addNormEntry("wisc", "cn", "14-0", "12", 6);
addNormEntry("wisc", "cn", "14-0", "13-14", 7);
addNormEntry("wisc", "cn", "14-0", "15", 8);
addNormEntry("wisc", "cn", "14-0", "16", 9);
addNormEntry("wisc", "cn", "14-0", "17-18", 10);
addNormEntry("wisc", "cn", "14-0", "19", 11);
addNormEntry("wisc", "cn", "14-0", "20", 12);
addNormEntry("wisc", "cn", "14-0", "21-22", 13);
addNormEntry("wisc", "cn", "14-0", "23", 14);
addNormEntry("wisc", "cn", "14-0", "24", 15);
addNormEntry("wisc", "cn", "14-0", "25", 16);
addNormEntry("wisc", "cn", "14-0", "26", 17);
addNormEntry("wisc", "cn", "14-0", "27", 18);
addNormEntry("wisc", "cn", "14-0", "28", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "14-4", "0-5", 1);
addNormEntry("wisc", "cn", "14-4", "6", 2);
addNormEntry("wisc", "cn", "14-4", "7-8", 3);
addNormEntry("wisc", "cn", "14-4", "9", 4);
addNormEntry("wisc", "cn", "14-4", "10-11", 5);
addNormEntry("wisc", "cn", "14-4", "12", 6);
addNormEntry("wisc", "cn", "14-4", "13-14", 7);
addNormEntry("wisc", "cn", "14-4", "15", 8);
addNormEntry("wisc", "cn", "14-4", "16-17", 9);
addNormEntry("wisc", "cn", "14-4", "18", 10);
addNormEntry("wisc", "cn", "14-4", "19", 11);
addNormEntry("wisc", "cn", "14-4", "20", 12);
addNormEntry("wisc", "cn", "14-4", "21-22", 13);
addNormEntry("wisc", "cn", "14-4", "23", 14);
addNormEntry("wisc", "cn", "14-4", "24", 15);
addNormEntry("wisc", "cn", "14-4", "25", 16);
addNormEntry("wisc", "cn", "14-4", "26", 17);
addNormEntry("wisc", "cn", "14-4", "27", 18);
addNormEntry("wisc", "cn", "14-4", "28", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "14-8", "0-5", 1);
addNormEntry("wisc", "cn", "14-8", "6", 2);
addNormEntry("wisc", "cn", "14-8", "7-8", 3);
addNormEntry("wisc", "cn", "14-8", "9", 4);
addNormEntry("wisc", "cn", "14-8", "10-11", 5);
addNormEntry("wisc", "cn", "14-8", "12", 6);
addNormEntry("wisc", "cn", "14-8", "13-14", 7);
addNormEntry("wisc", "cn", "14-8", "15", 8);
addNormEntry("wisc", "cn", "14-8", "16-17", 9);
addNormEntry("wisc", "cn", "14-8", "18", 10);
addNormEntry("wisc", "cn", "14-8", "19", 11);
addNormEntry("wisc", "cn", "14-8", "20-21", 12);
addNormEntry("wisc", "cn", "14-8", "22", 13);
addNormEntry("wisc", "cn", "14-8", "23", 14);
addNormEntry("wisc", "cn", "14-8", "24", 15);
addNormEntry("wisc", "cn", "14-8", "25", 16);
addNormEntry("wisc", "cn", "14-8", "26", 17);
addNormEntry("wisc", "cn", "14-8", "27", 18);
addNormEntry("wisc", "cn", "14-8", "28", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "15-0", "0-5", 1);
addNormEntry("wisc", "cn", "15-0", "6-7", 2);
addNormEntry("wisc", "cn", "15-0", "8", 3);
addNormEntry("wisc", "cn", "15-0", "9-10", 4);
addNormEntry("wisc", "cn", "15-0", "11", 5);
addNormEntry("wisc", "cn", "15-0", "12-13", 6);
addNormEntry("wisc", "cn", "15-0", "14", 7);
addNormEntry("wisc", "cn", "15-0", "15", 8);
addNormEntry("wisc", "cn", "15-0", "16-17", 9);
addNormEntry("wisc", "cn", "15-0", "18", 10);
addNormEntry("wisc", "cn", "15-0", "19", 11);
addNormEntry("wisc", "cn", "15-0", "20-21", 12);
addNormEntry("wisc", "cn", "15-0", "22", 13);
addNormEntry("wisc", "cn", "15-0", "23", 14);
addNormEntry("wisc", "cn", "15-0", "24", 15);
addNormEntry("wisc", "cn", "15-0", "25", 16);
addNormEntry("wisc", "cn", "15-0", "26", 17);
addNormEntry("wisc", "cn", "15-0", "27", 18);
addNormEntry("wisc", "cn", "15-0", "28", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "15-4", "0-5", 1);
addNormEntry("wisc", "cn", "15-4", "6-7", 2);
addNormEntry("wisc", "cn", "15-4", "8", 3);
addNormEntry("wisc", "cn", "15-4", "9-10", 4);
addNormEntry("wisc", "cn", "15-4", "11", 5);
addNormEntry("wisc", "cn", "15-4", "12-13", 6);
addNormEntry("wisc", "cn", "15-4", "14", 7);
addNormEntry("wisc", "cn", "15-4", "15-16", 8);
addNormEntry("wisc", "cn", "15-4", "17", 9);
addNormEntry("wisc", "cn", "15-4", "18", 10);
addNormEntry("wisc", "cn", "15-4", "19-20", 11);
addNormEntry("wisc", "cn", "15-4", "21", 12);
addNormEntry("wisc", "cn", "15-4", "22", 13);
addNormEntry("wisc", "cn", "15-4", "23", 14);
addNormEntry("wisc", "cn", "15-4", "24", 15);
addNormEntry("wisc", "cn", "15-4", "25", 16);
addNormEntry("wisc", "cn", "15-4", "26", 17);
addNormEntry("wisc", "cn", "15-4", "27", 18);
addNormEntry("wisc", "cn", "15-4", "28", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "15-8", "0-5", 1);
addNormEntry("wisc", "cn", "15-8", "6-7", 2);
addNormEntry("wisc", "cn", "15-8", "8", 3);
addNormEntry("wisc", "cn", "15-8", "9-10", 4);
addNormEntry("wisc", "cn", "15-8", "11", 5);
addNormEntry("wisc", "cn", "15-8", "12-13", 6);
addNormEntry("wisc", "cn", "15-8", "14", 7);
addNormEntry("wisc", "cn", "15-8", "15-16", 8);
addNormEntry("wisc", "cn", "15-8", "17", 9);
addNormEntry("wisc", "cn", "15-8", "18", 10);
addNormEntry("wisc", "cn", "15-8", "19-20", 11);
addNormEntry("wisc", "cn", "15-8", "21", 12);
addNormEntry("wisc", "cn", "15-8", "22", 13);
addNormEntry("wisc", "cn", "15-8", "23", 14);
addNormEntry("wisc", "cn", "15-8", "24", 15);
addNormEntry("wisc", "cn", "15-8", "25", 16);
addNormEntry("wisc", "cn", "15-8", "26", 17);
addNormEntry("wisc", "cn", "15-8", "27", 18);
addNormEntry("wisc", "cn", "15-8", "28", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "cn", "16-0", "0-6", 1);
addNormEntry("wisc", "cn", "16-0", "7", 2);
addNormEntry("wisc", "cn", "16-0", "8-9", 3);
addNormEntry("wisc", "cn", "16-0", "10", 4);
addNormEntry("wisc", "cn", "16-0", "11-12", 5);
addNormEntry("wisc", "cn", "16-0", "13", 6);
addNormEntry("wisc", "cn", "16-0", "14-15", 7);
addNormEntry("wisc", "cn", "16-0", "16", 8);
addNormEntry("wisc", "cn", "16-0", "17", 9);
addNormEntry("wisc", "cn", "16-0", "18-19", 10);
addNormEntry("wisc", "cn", "16-0", "20", 11);
addNormEntry("wisc", "cn", "16-0", "21", 12);
addNormEntry("wisc", "cn", "16-0", "22", 13);
addNormEntry("wisc", "cn", "16-0", "23-24", 14);
addNormEntry("wisc", "cn", "16-0", "25", 15);
addNormEntry("wisc", "cn", "16-0", "26", 16);
addNormEntry("wisc", "cn", "16-0", "27", 17);
addNormEntry("wisc", "cn", "16-0", "-", 18);
addNormEntry("wisc", "cn", "16-0", "28", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "cn", "16-4", "0-6", 1);
addNormEntry("wisc", "cn", "16-4", "7", 2);
addNormEntry("wisc", "cn", "16-4", "8-9", 3);
addNormEntry("wisc", "cn", "16-4", "10", 4);
addNormEntry("wisc", "cn", "16-4", "11-12", 5);
addNormEntry("wisc", "cn", "16-4", "13", 6);
addNormEntry("wisc", "cn", "16-4", "14-15", 7);
addNormEntry("wisc", "cn", "16-4", "16", 8);
addNormEntry("wisc", "cn", "16-4", "17", 9);
addNormEntry("wisc", "cn", "16-4", "18-19", 10);
addNormEntry("wisc", "cn", "16-4", "20", 11);
addNormEntry("wisc", "cn", "16-4", "21", 12);
addNormEntry("wisc", "cn", "16-4", "22-23", 13);
addNormEntry("wisc", "cn", "16-4", "24", 14);
addNormEntry("wisc", "cn", "16-4", "25", 15);
addNormEntry("wisc", "cn", "16-4", "26", 16);
addNormEntry("wisc", "cn", "16-4", "27", 17);
addNormEntry("wisc", "cn", "16-4", "-", 18);
addNormEntry("wisc", "cn", "16-4", "28", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "cn", "16-8", "0-6", 1);
addNormEntry("wisc", "cn", "16-8", "7-8", 2);
addNormEntry("wisc", "cn", "16-8", "9", 3);
addNormEntry("wisc", "cn", "16-8", "10-11", 4);
addNormEntry("wisc", "cn", "16-8", "12", 5);
addNormEntry("wisc", "cn", "16-8", "13", 6);
addNormEntry("wisc", "cn", "16-8", "14-15", 7);
addNormEntry("wisc", "cn", "16-8", "16", 8);
addNormEntry("wisc", "cn", "16-8", "17-18", 9);
addNormEntry("wisc", "cn", "16-8", "19", 10);
addNormEntry("wisc", "cn", "16-8", "20", 11);
addNormEntry("wisc", "cn", "16-8", "21", 12);
addNormEntry("wisc", "cn", "16-8", "22-23", 13);
addNormEntry("wisc", "cn", "16-8", "24", 14);
addNormEntry("wisc", "cn", "16-8", "25", 15);
addNormEntry("wisc", "cn", "16-8", "26", 16);
addNormEntry("wisc", "cn", "16-8", "27", 17);
addNormEntry("wisc", "cn", "16-8", "28", 18);
addNormEntry("wisc", "cn", "16-8", "-", 19);

// --- Normas do Subteste Códigos (CD) ---

// FAIXA 6-0 — 6 anos (Códigos)
addNormEntry("wisc", "cd", "6-0", "-", 1);
addNormEntry("wisc", "cd", "6-0", "0-2", 2);
addNormEntry("wisc", "cd", "6-0", "3-6", 3);
addNormEntry("wisc", "cd", "6-0", "7-10", 4);
addNormEntry("wisc", "cd", "6-0", "11-14", 5);
addNormEntry("wisc", "cd", "6-0", "15-19", 6);
addNormEntry("wisc", "cd", "6-0", "20-23", 7);
addNormEntry("wisc", "cd", "6-0", "24-27", 8);
addNormEntry("wisc", "cd", "6-0", "28-31", 9);
addNormEntry("wisc", "cd", "6-0", "32-35", 10);
addNormEntry("wisc", "cd", "6-0", "36-40", 11);
addNormEntry("wisc", "cd", "6-0", "41-44", 12);
addNormEntry("wisc", "cd", "6-0", "45-49", 13);
addNormEntry("wisc", "cd", "6-0", "50-53", 14);
addNormEntry("wisc", "cd", "6-0", "54-57", 15);
addNormEntry("wisc", "cd", "6-0", "58-60", 16);
addNormEntry("wisc", "cd", "6-0", "61-62", 17);
addNormEntry("wisc", "cd", "6-0", "63-64", 18);
addNormEntry("wisc", "cd", "6-0", "65", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "6-4", "0-1", 1);
addNormEntry("wisc", "cd", "6-4", "2-4", 2);
addNormEntry("wisc", "cd", "6-4", "5-8", 3);
addNormEntry("wisc", "cd", "6-4", "9-12", 4);
addNormEntry("wisc", "cd", "6-4", "13-16", 5);
addNormEntry("wisc", "cd", "6-4", "17-21", 6);
addNormEntry("wisc", "cd", "6-4", "22-25", 7);
addNormEntry("wisc", "cd", "6-4", "26-29", 8);
addNormEntry("wisc", "cd", "6-4", "30-33", 9);
addNormEntry("wisc", "cd", "6-4", "34-37", 10);
addNormEntry("wisc", "cd", "6-4", "38-42", 11);
addNormEntry("wisc", "cd", "6-4", "43-46", 12);
addNormEntry("wisc", "cd", "6-4", "47-51", 13);
addNormEntry("wisc", "cd", "6-4", "52-55", 14);
addNormEntry("wisc", "cd", "6-4", "56-58", 15);
addNormEntry("wisc", "cd", "6-4", "59-61", 16);
addNormEntry("wisc", "cd", "6-4", "62-63", 17);
addNormEntry("wisc", "cd", "6-4", "64-65", 18);
addNormEntry("wisc", "cd", "6-4", "-", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "6-8", "0-3", 1);
addNormEntry("wisc", "cd", "6-8", "4-6", 2);
addNormEntry("wisc", "cd", "6-8", "7-10", 3);
addNormEntry("wisc", "cd", "6-8", "11-14", 4);
addNormEntry("wisc", "cd", "6-8", "15-18", 5);
addNormEntry("wisc", "cd", "6-8", "19-23", 6);
addNormEntry("wisc", "cd", "6-8", "24-27", 7);
addNormEntry("wisc", "cd", "6-8", "28-31", 8);
addNormEntry("wisc", "cd", "6-8", "32-35", 9);
addNormEntry("wisc", "cd", "6-8", "36-39", 10);
addNormEntry("wisc", "cd", "6-8", "40-43", 11);
addNormEntry("wisc", "cd", "6-8", "44-47", 12);
addNormEntry("wisc", "cd", "6-8", "48-52", 13);
addNormEntry("wisc", "cd", "6-8", "53-56", 14);
addNormEntry("wisc", "cd", "6-8", "57-59", 15);
addNormEntry("wisc", "cd", "6-8", "60-62", 16);
addNormEntry("wisc", "cd", "6-8", "63-64", 17);
addNormEntry("wisc", "cd", "6-8", "65", 18);
addNormEntry("wisc", "cd", "6-8", "-", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "7-0", "0-4", 1);
addNormEntry("wisc", "cd", "7-0", "5-8", 2);
addNormEntry("wisc", "cd", "7-0", "9-11", 3);
addNormEntry("wisc", "cd", "7-0", "12-15", 4);
addNormEntry("wisc", "cd", "7-0", "16-19", 5);
addNormEntry("wisc", "cd", "7-0", "20-24", 6);
addNormEntry("wisc", "cd", "7-0", "25-28", 7);
addNormEntry("wisc", "cd", "7-0", "29-32", 8);
addNormEntry("wisc", "cd", "7-0", "33-36", 9);
addNormEntry("wisc", "cd", "7-0", "37-41", 10);
addNormEntry("wisc", "cd", "7-0", "42-45", 11);
addNormEntry("wisc", "cd", "7-0", "46-49", 12);
addNormEntry("wisc", "cd", "7-0", "50-54", 13);
addNormEntry("wisc", "cd", "7-0", "55-58", 14);
addNormEntry("wisc", "cd", "7-0", "59-61", 15);
addNormEntry("wisc", "cd", "7-0", "62-63", 16);
addNormEntry("wisc", "cd", "7-0", "64-65", 17);
addNormEntry("wisc", "cd", "7-0", "-", 18);
addNormEntry("wisc", "cd", "7-0", "-", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "7-4", "0-5", 1);
addNormEntry("wisc", "cd", "7-4", "6-9", 2);
addNormEntry("wisc", "cd", "7-4", "10-12", 3);
addNormEntry("wisc", "cd", "7-4", "13-16", 4);
addNormEntry("wisc", "cd", "7-4", "17-20", 5);
addNormEntry("wisc", "cd", "7-4", "21-25", 6);
addNormEntry("wisc", "cd", "7-4", "26-30", 7);
addNormEntry("wisc", "cd", "7-4", "31-34", 8);
addNormEntry("wisc", "cd", "7-4", "35-38", 9);
addNormEntry("wisc", "cd", "7-4", "39-43", 10);
addNormEntry("wisc", "cd", "7-4", "44-47", 11);
addNormEntry("wisc", "cd", "7-4", "48-51", 12);
addNormEntry("wisc", "cd", "7-4", "52-56", 13);
addNormEntry("wisc", "cd", "7-4", "57-60", 14);
addNormEntry("wisc", "cd", "7-4", "61-62", 15);
addNormEntry("wisc", "cd", "7-4", "63-64", 16);
addNormEntry("wisc", "cd", "7-4", "65", 17);
addNormEntry("wisc", "cd", "7-4", "-", 18);
addNormEntry("wisc", "cd", "7-4", "-", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "7-8", "0-6", 1);
addNormEntry("wisc", "cd", "7-8", "7-10", 2);
addNormEntry("wisc", "cd", "7-8", "11-13", 3);
addNormEntry("wisc", "cd", "7-8", "14-17", 4);
addNormEntry("wisc", "cd", "7-8", "18-21", 5);
addNormEntry("wisc", "cd", "7-8", "22-26", 6);
addNormEntry("wisc", "cd", "7-8", "27-30", 7);
addNormEntry("wisc", "cd", "7-8", "31-35", 8);
addNormEntry("wisc", "cd", "7-8", "36-40", 9);
addNormEntry("wisc", "cd", "7-8", "41-45", 10);
addNormEntry("wisc", "cd", "7-8", "46-49", 11);
addNormEntry("wisc", "cd", "7-8", "50-53", 12);
addNormEntry("wisc", "cd", "7-8", "54-57", 13);
addNormEntry("wisc", "cd", "7-8", "58-60", 14);
addNormEntry("wisc", "cd", "7-8", "61-63", 15);
addNormEntry("wisc", "cd", "7-8", "64-65", 16);
addNormEntry("wisc", "cd", "7-8", "-", 17);
addNormEntry("wisc", "cd", "7-8", "-", 18);
addNormEntry("wisc", "cd", "7-8", "-", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "8-0", "0-7", 1);
addNormEntry("wisc", "cd", "8-0", "8-10", 2);
addNormEntry("wisc", "cd", "8-0", "11-13", 3);
addNormEntry("wisc", "cd", "8-0", "14-16", 4);
addNormEntry("wisc", "cd", "8-0", "17-18", 5);
addNormEntry("wisc", "cd", "8-0", "19-20", 6);
addNormEntry("wisc", "cd", "8-0", "21-23", 7);
addNormEntry("wisc", "cd", "8-0", "24-25", 8);
addNormEntry("wisc", "cd", "8-0", "26-28", 9);
addNormEntry("wisc", "cd", "8-0", "29-31", 10);
addNormEntry("wisc", "cd", "8-0", "32-35", 11);
addNormEntry("wisc", "cd", "8-0", "36-39", 12);
addNormEntry("wisc", "cd", "8-0", "40-43", 13);
addNormEntry("wisc", "cd", "8-0", "44-46", 14);
addNormEntry("wisc", "cd", "8-0", "47-50", 15);
addNormEntry("wisc", "cd", "8-0", "51-56", 16);
addNormEntry("wisc", "cd", "8-0", "57-60", 17);
addNormEntry("wisc", "cd", "8-0", "61-64", 18);
addNormEntry("wisc", "cd", "8-0", "65-119", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "8-4", "0-8", 1);
addNormEntry("wisc", "cd", "8-4", "9-11", 2);
addNormEntry("wisc", "cd", "8-4", "12-14", 3);
addNormEntry("wisc", "cd", "8-4", "15-17", 4);
addNormEntry("wisc", "cd", "8-4", "18-19", 5);
addNormEntry("wisc", "cd", "8-4", "20-21", 6);
addNormEntry("wisc", "cd", "8-4", "22-24", 7);
addNormEntry("wisc", "cd", "8-4", "25-26", 8);
addNormEntry("wisc", "cd", "8-4", "27-29", 9);
addNormEntry("wisc", "cd", "8-4", "30-32", 10);
addNormEntry("wisc", "cd", "8-4", "33-36", 11);
addNormEntry("wisc", "cd", "8-4", "37-40", 12);
addNormEntry("wisc", "cd", "8-4", "41-44", 13);
addNormEntry("wisc", "cd", "8-4", "45-48", 14);
addNormEntry("wisc", "cd", "8-4", "49-51", 15);
addNormEntry("wisc", "cd", "8-4", "52-57", 16);
addNormEntry("wisc", "cd", "8-4", "58-61", 17);
addNormEntry("wisc", "cd", "8-4", "62-65", 18);
addNormEntry("wisc", "cd", "8-4", "66-119", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "8-8", "0-9", 1);
addNormEntry("wisc", "cd", "8-8", "10-12", 2);
addNormEntry("wisc", "cd", "8-8", "13-15", 3);
addNormEntry("wisc", "cd", "8-8", "16-18", 4);
addNormEntry("wisc", "cd", "8-8", "19-20", 5);
addNormEntry("wisc", "cd", "8-8", "21-22", 6);
addNormEntry("wisc", "cd", "8-8", "23-25", 7);
addNormEntry("wisc", "cd", "8-8", "26-27", 8);
addNormEntry("wisc", "cd", "8-8", "28-30", 9);
addNormEntry("wisc", "cd", "8-8", "31-33", 10);
addNormEntry("wisc", "cd", "8-8", "34-37", 11);
addNormEntry("wisc", "cd", "8-8", "38-41", 12);
addNormEntry("wisc", "cd", "8-8", "42-45", 13);
addNormEntry("wisc", "cd", "8-8", "46-49", 14);
addNormEntry("wisc", "cd", "8-8", "50-52", 15);
addNormEntry("wisc", "cd", "8-8", "53-58", 16);
addNormEntry("wisc", "cd", "8-8", "59-62", 17);
addNormEntry("wisc", "cd", "8-8", "63-66", 18);
addNormEntry("wisc", "cd", "8-8", "67-119", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "9-0", "0-10", 1);
addNormEntry("wisc", "cd", "9-0", "11-13", 2);
addNormEntry("wisc", "cd", "9-0", "14-16", 3);
addNormEntry("wisc", "cd", "9-0", "17-19", 4);
addNormEntry("wisc", "cd", "9-0", "20-21", 5);
addNormEntry("wisc", "cd", "9-0", "22-23", 6);
addNormEntry("wisc", "cd", "9-0", "24-26", 7);
addNormEntry("wisc", "cd", "9-0", "27-28", 8);
addNormEntry("wisc", "cd", "9-0", "29-31", 9);
addNormEntry("wisc", "cd", "9-0", "32-34", 10);
addNormEntry("wisc", "cd", "9-0", "35-38", 11);
addNormEntry("wisc", "cd", "9-0", "39-42", 12);
addNormEntry("wisc", "cd", "9-0", "43-46", 13);
addNormEntry("wisc", "cd", "9-0", "47-50", 14);
addNormEntry("wisc", "cd", "9-0", "51-54", 15);
addNormEntry("wisc", "cd", "9-0", "55-59", 16);
addNormEntry("wisc", "cd", "9-0", "60-63", 17);
addNormEntry("wisc", "cd", "9-0", "64-67", 18);
addNormEntry("wisc", "cd", "9-0", "68-119", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "9-4", "0-10", 1);
addNormEntry("wisc", "cd", "9-4", "11-13", 2);
addNormEntry("wisc", "cd", "9-4", "14-16", 3);
addNormEntry("wisc", "cd", "9-4", "17-19", 4);
addNormEntry("wisc", "cd", "9-4", "20-21", 5);
addNormEntry("wisc", "cd", "9-4", "22-24", 6);
addNormEntry("wisc", "cd", "9-4", "25-27", 7);
addNormEntry("wisc", "cd", "9-4", "28-29", 8);
addNormEntry("wisc", "cd", "9-4", "30-32", 9);
addNormEntry("wisc", "cd", "9-4", "33-35", 10);
addNormEntry("wisc", "cd", "9-4", "36-39", 11);
addNormEntry("wisc", "cd", "9-4", "40-44", 12);
addNormEntry("wisc", "cd", "9-4", "45-48", 13);
addNormEntry("wisc", "cd", "9-4", "49-51", 14);
addNormEntry("wisc", "cd", "9-4", "52-56", 15);
addNormEntry("wisc", "cd", "9-4", "57-60", 16);
addNormEntry("wisc", "cd", "9-4", "61-64", 17);
addNormEntry("wisc", "cd", "9-4", "65-68", 18);
addNormEntry("wisc", "cd", "9-4", "69-119", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "9-8", "0-11", 1);
addNormEntry("wisc", "cd", "9-8", "12-14", 2);
addNormEntry("wisc", "cd", "9-8", "15-17", 3);
addNormEntry("wisc", "cd", "9-8", "18-20", 4);
addNormEntry("wisc", "cd", "9-8", "21-22", 5);
addNormEntry("wisc", "cd", "9-8", "23-25", 6);
addNormEntry("wisc", "cd", "9-8", "26-28", 7);
addNormEntry("wisc", "cd", "9-8", "29-31", 8);
addNormEntry("wisc", "cd", "9-8", "32-34", 9);
addNormEntry("wisc", "cd", "9-8", "35-37", 10);
addNormEntry("wisc", "cd", "9-8", "38-41", 11);
addNormEntry("wisc", "cd", "9-8", "42-45", 12);
addNormEntry("wisc", "cd", "9-8", "46-49", 13);
addNormEntry("wisc", "cd", "9-8", "50-53", 14);
addNormEntry("wisc", "cd", "9-8", "54-57", 15);
addNormEntry("wisc", "cd", "9-8", "58-61", 16);
addNormEntry("wisc", "cd", "9-8", "62-65", 17);
addNormEntry("wisc", "cd", "9-8", "66-69", 18);
addNormEntry("wisc", "cd", "9-8", "70-119", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "10-0", "0-12", 1);
addNormEntry("wisc", "cd", "10-0", "13-15", 2);
addNormEntry("wisc", "cd", "10-0", "16-18", 3);
addNormEntry("wisc", "cd", "10-0", "19-21", 4);
addNormEntry("wisc", "cd", "10-0", "22-23", 5);
addNormEntry("wisc", "cd", "10-0", "24-26", 6);
addNormEntry("wisc", "cd", "10-0", "27-29", 7);
addNormEntry("wisc", "cd", "10-0", "30-32", 8);
addNormEntry("wisc", "cd", "10-0", "33-35", 9);
addNormEntry("wisc", "cd", "10-0", "36-39", 10);
addNormEntry("wisc", "cd", "10-0", "40-42", 11);
addNormEntry("wisc", "cd", "10-0", "43-46", 12);
addNormEntry("wisc", "cd", "10-0", "47-50", 13);
addNormEntry("wisc", "cd", "10-0", "51-54", 14);
addNormEntry("wisc", "cd", "10-0", "55-58", 15);
addNormEntry("wisc", "cd", "10-0", "59-62", 16);
addNormEntry("wisc", "cd", "10-0", "63-66", 17);
addNormEntry("wisc", "cd", "10-0", "67-70", 18);
addNormEntry("wisc", "cd", "10-0", "71-119", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "10-4", "0-13", 1);
addNormEntry("wisc", "cd", "10-4", "14-16", 2);
addNormEntry("wisc", "cd", "10-4", "17-19", 3);
addNormEntry("wisc", "cd", "10-4", "20-22", 4);
addNormEntry("wisc", "cd", "10-4", "23-24", 5);
addNormEntry("wisc", "cd", "10-4", "25-27", 6);
addNormEntry("wisc", "cd", "10-4", "28-30", 7);
addNormEntry("wisc", "cd", "10-4", "31-33", 8);
addNormEntry("wisc", "cd", "10-4", "34-37", 9);
addNormEntry("wisc", "cd", "10-4", "38-40", 10);
addNormEntry("wisc", "cd", "10-4", "41-44", 11);
addNormEntry("wisc", "cd", "10-4", "45-48", 12);
addNormEntry("wisc", "cd", "10-4", "49-51", 13);
addNormEntry("wisc", "cd", "10-4", "52-55", 14);
addNormEntry("wisc", "cd", "10-4", "56-59", 15);
addNormEntry("wisc", "cd", "10-4", "60-63", 16);
addNormEntry("wisc", "cd", "10-4", "64-67", 17);
addNormEntry("wisc", "cd", "10-4", "68-71", 18);
addNormEntry("wisc", "cd", "10-4", "72-119", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "10-8", "0-14", 1);
addNormEntry("wisc", "cd", "10-8", "15-17", 2);
addNormEntry("wisc", "cd", "10-8", "18-20", 3);
addNormEntry("wisc", "cd", "10-8", "21-23", 4);
addNormEntry("wisc", "cd", "10-8", "24-25", 5);
addNormEntry("wisc", "cd", "10-8", "26-28", 6);
addNormEntry("wisc", "cd", "10-8", "29-31", 7);
addNormEntry("wisc", "cd", "10-8", "32-35", 8);
addNormEntry("wisc", "cd", "10-8", "36-38", 9);
addNormEntry("wisc", "cd", "10-8", "39-42", 10);
addNormEntry("wisc", "cd", "10-8", "43-45", 11);
addNormEntry("wisc", "cd", "10-8", "46-49", 12);
addNormEntry("wisc", "cd", "10-8", "50-53", 13);
addNormEntry("wisc", "cd", "10-8", "54-57", 14);
addNormEntry("wisc", "cd", "10-8", "58-61", 15);
addNormEntry("wisc", "cd", "10-8", "62-64", 16);
addNormEntry("wisc", "cd", "10-8", "65-68", 17);
addNormEntry("wisc", "cd", "10-8", "69-72", 18);
addNormEntry("wisc", "cd", "10-8", "73-119", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "11-0", "0-14", 1);
addNormEntry("wisc", "cd", "11-0", "15-17", 2);
addNormEntry("wisc", "cd", "11-0", "18-20", 3);
addNormEntry("wisc", "cd", "11-0", "21-23", 4);
addNormEntry("wisc", "cd", "11-0", "24-26", 5);
addNormEntry("wisc", "cd", "11-0", "27-29", 6);
addNormEntry("wisc", "cd", "11-0", "30-32", 7);
addNormEntry("wisc", "cd", "11-0", "33-36", 8);
addNormEntry("wisc", "cd", "11-0", "37-40", 9);
addNormEntry("wisc", "cd", "11-0", "41-43", 10);
addNormEntry("wisc", "cd", "11-0", "44-47", 11);
addNormEntry("wisc", "cd", "11-0", "48-51", 12);
addNormEntry("wisc", "cd", "11-0", "52-54", 13);
addNormEntry("wisc", "cd", "11-0", "55-58", 14);
addNormEntry("wisc", "cd", "11-0", "59-62", 15);
addNormEntry("wisc", "cd", "11-0", "63-66", 16);
addNormEntry("wisc", "cd", "11-0", "67-70", 17);
addNormEntry("wisc", "cd", "11-0", "71-73", 18);
addNormEntry("wisc", "cd", "11-0", "74-119", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "11-4", "0-15", 1);
addNormEntry("wisc", "cd", "11-4", "16-18", 2);
addNormEntry("wisc", "cd", "11-4", "19-21", 3);
addNormEntry("wisc", "cd", "11-4", "22-24", 4);
addNormEntry("wisc", "cd", "11-4", "25-26", 5);
addNormEntry("wisc", "cd", "11-4", "27-30", 6);
addNormEntry("wisc", "cd", "11-4", "31-34", 7);
addNormEntry("wisc", "cd", "11-4", "35-37", 8);
addNormEntry("wisc", "cd", "11-4", "38-41", 9);
addNormEntry("wisc", "cd", "11-4", "42-45", 10);
addNormEntry("wisc", "cd", "11-4", "46-48", 11);
addNormEntry("wisc", "cd", "11-4", "49-52", 12);
addNormEntry("wisc", "cd", "11-4", "53-56", 13);
addNormEntry("wisc", "cd", "11-4", "57-59", 14);
addNormEntry("wisc", "cd", "11-4", "60-63", 15);
addNormEntry("wisc", "cd", "11-4", "64-67", 16);
addNormEntry("wisc", "cd", "11-4", "68-71", 17);
addNormEntry("wisc", "cd", "11-4", "72-75", 18);
addNormEntry("wisc", "cd", "11-4", "76-119", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "11-8", "0-15", 1);
addNormEntry("wisc", "cd", "11-8", "16-18", 2);
addNormEntry("wisc", "cd", "11-8", "19-21", 3);
addNormEntry("wisc", "cd", "11-8", "22-25", 4);
addNormEntry("wisc", "cd", "11-8", "26-27", 5);
addNormEntry("wisc", "cd", "11-8", "28-31", 6);
addNormEntry("wisc", "cd", "11-8", "32-35", 7);
addNormEntry("wisc", "cd", "11-8", "36-38", 8);
addNormEntry("wisc", "cd", "11-8", "39-42", 9);
addNormEntry("wisc", "cd", "11-8", "43-46", 10);
addNormEntry("wisc", "cd", "11-8", "47-50", 11);
addNormEntry("wisc", "cd", "11-8", "51-53", 12);
addNormEntry("wisc", "cd", "11-8", "54-57", 13);
addNormEntry("wisc", "cd", "11-8", "58-61", 14);
addNormEntry("wisc", "cd", "11-8", "62-65", 15);
addNormEntry("wisc", "cd", "11-8", "66-69", 16);
addNormEntry("wisc", "cd", "11-8", "70-72", 17);
addNormEntry("wisc", "cd", "11-8", "73-76", 18);
addNormEntry("wisc", "cd", "11-8", "77-119", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "12-0", "0-16", 1);
addNormEntry("wisc", "cd", "12-0", "17-19", 2);
addNormEntry("wisc", "cd", "12-0", "20-22", 3);
addNormEntry("wisc", "cd", "12-0", "23-26", 4);
addNormEntry("wisc", "cd", "12-0", "27-28", 5);
addNormEntry("wisc", "cd", "12-0", "29-32", 6);
addNormEntry("wisc", "cd", "12-0", "33-36", 7);
addNormEntry("wisc", "cd", "12-0", "37-40", 8);
addNormEntry("wisc", "cd", "12-0", "41-43", 9);
addNormEntry("wisc", "cd", "12-0", "44-47", 10);
addNormEntry("wisc", "cd", "12-0", "48-51", 11);
addNormEntry("wisc", "cd", "12-0", "52-55", 12);
addNormEntry("wisc", "cd", "12-0", "56-59", 13);
addNormEntry("wisc", "cd", "12-0", "60-62", 14);
addNormEntry("wisc", "cd", "12-0", "63-66", 15);
addNormEntry("wisc", "cd", "12-0", "67-70", 16);
addNormEntry("wisc", "cd", "12-0", "71-74", 17);
addNormEntry("wisc", "cd", "12-0", "75-78", 18);
addNormEntry("wisc", "cd", "12-0", "79-119", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "12-4", "0-17", 1);
addNormEntry("wisc", "cd", "12-4", "18-20", 2);
addNormEntry("wisc", "cd", "12-4", "21-23", 3);
addNormEntry("wisc", "cd", "12-4", "24-26", 4);
addNormEntry("wisc", "cd", "12-4", "27-29", 5);
addNormEntry("wisc", "cd", "12-4", "30-33", 6);
addNormEntry("wisc", "cd", "12-4", "34-37", 7);
addNormEntry("wisc", "cd", "12-4", "38-41", 8);
addNormEntry("wisc", "cd", "12-4", "42-45", 9);
addNormEntry("wisc", "cd", "12-4", "46-48", 10);
addNormEntry("wisc", "cd", "12-4", "49-52", 11);
addNormEntry("wisc", "cd", "12-4", "53-56", 12);
addNormEntry("wisc", "cd", "12-4", "57-60", 13);
addNormEntry("wisc", "cd", "12-4", "61-64", 14);
addNormEntry("wisc", "cd", "12-4", "65-68", 15);
addNormEntry("wisc", "cd", "12-4", "69-72", 16);
addNormEntry("wisc", "cd", "12-4", "73-76", 17);
addNormEntry("wisc", "cd", "12-4", "77-80", 18);
addNormEntry("wisc", "cd", "12-4", "81-119", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "12-8", "0-17", 1);
addNormEntry("wisc", "cd", "12-8", "18-20", 2);
addNormEntry("wisc", "cd", "12-8", "21-23", 3);
addNormEntry("wisc", "cd", "12-8", "24-27", 4);
addNormEntry("wisc", "cd", "12-8", "28-30", 5);
addNormEntry("wisc", "cd", "12-8", "31-34", 6);
addNormEntry("wisc", "cd", "12-8", "35-38", 7);
addNormEntry("wisc", "cd", "12-8", "39-42", 8);
addNormEntry("wisc", "cd", "12-8", "43-46", 9);
addNormEntry("wisc", "cd", "12-8", "47-50", 10);
addNormEntry("wisc", "cd", "12-8", "51-54", 11);
addNormEntry("wisc", "cd", "12-8", "55-57", 12);
addNormEntry("wisc", "cd", "12-8", "58-61", 13);
addNormEntry("wisc", "cd", "12-8", "62-65", 14);
addNormEntry("wisc", "cd", "12-8", "66-69", 15);
addNormEntry("wisc", "cd", "12-8", "70-74", 16);
addNormEntry("wisc", "cd", "12-8", "75-78", 17);
addNormEntry("wisc", "cd", "12-8", "79-82", 18);
addNormEntry("wisc", "cd", "12-8", "83-119", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "13-0", "0-18", 1);
addNormEntry("wisc", "cd", "13-0", "19-21", 2);
addNormEntry("wisc", "cd", "13-0", "22-24", 3);
addNormEntry("wisc", "cd", "13-0", "25-28", 4);
addNormEntry("wisc", "cd", "13-0", "29-31", 5);
addNormEntry("wisc", "cd", "13-0", "32-35", 6);
addNormEntry("wisc", "cd", "13-0", "36-39", 7);
addNormEntry("wisc", "cd", "13-0", "40-43", 8);
addNormEntry("wisc", "cd", "13-0", "44-47", 9);
addNormEntry("wisc", "cd", "13-0", "48-51", 10);
addNormEntry("wisc", "cd", "13-0", "52-55", 11);
addNormEntry("wisc", "cd", "13-0", "56-59", 12);
addNormEntry("wisc", "cd", "13-0", "60-63", 13);
addNormEntry("wisc", "cd", "13-0", "64-67", 14);
addNormEntry("wisc", "cd", "13-0", "68-71", 15);
addNormEntry("wisc", "cd", "13-0", "72-75", 16);
addNormEntry("wisc", "cd", "13-0", "76-80", 17);
addNormEntry("wisc", "cd", "13-0", "81-84", 18);
addNormEntry("wisc", "cd", "13-0", "85-119", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "13-4", "0-19", 1);
addNormEntry("wisc", "cd", "13-4", "20-22", 2);
addNormEntry("wisc", "cd", "13-4", "23-25", 3);
addNormEntry("wisc", "cd", "13-4", "26-28", 4);
addNormEntry("wisc", "cd", "13-4", "29-32", 5);
addNormEntry("wisc", "cd", "13-4", "33-36", 6);
addNormEntry("wisc", "cd", "13-4", "37-40", 7);
addNormEntry("wisc", "cd", "13-4", "41-44", 8);
addNormEntry("wisc", "cd", "13-4", "45-48", 9);
addNormEntry("wisc", "cd", "13-4", "49-52", 10);
addNormEntry("wisc", "cd", "13-4", "53-56", 11);
addNormEntry("wisc", "cd", "13-4", "57-60", 12);
addNormEntry("wisc", "cd", "13-4", "61-64", 13);
addNormEntry("wisc", "cd", "13-4", "65-69", 14);
addNormEntry("wisc", "cd", "13-4", "70-73", 15);
addNormEntry("wisc", "cd", "13-4", "74-77", 16);
addNormEntry("wisc", "cd", "13-4", "78-81", 17);
addNormEntry("wisc", "cd", "13-4", "82-86", 18);
addNormEntry("wisc", "cd", "13-4", "87-119", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "13-8", "0-19", 1);
addNormEntry("wisc", "cd", "13-8", "20-22", 2);
addNormEntry("wisc", "cd", "13-8", "23-25", 3);
addNormEntry("wisc", "cd", "13-8", "26-29", 4);
addNormEntry("wisc", "cd", "13-8", "30-33", 5);
addNormEntry("wisc", "cd", "13-8", "34-37", 6);
addNormEntry("wisc", "cd", "13-8", "38-41", 7);
addNormEntry("wisc", "cd", "13-8", "42-45", 8);
addNormEntry("wisc", "cd", "13-8", "46-49", 9);
addNormEntry("wisc", "cd", "13-8", "50-53", 10);
addNormEntry("wisc", "cd", "13-8", "54-57", 11);
addNormEntry("wisc", "cd", "13-8", "58-61", 12);
addNormEntry("wisc", "cd", "13-8", "62-66", 13);
addNormEntry("wisc", "cd", "13-8", "67-70", 14);
addNormEntry("wisc", "cd", "13-8", "71-74", 15);
addNormEntry("wisc", "cd", "13-8", "75-79", 16);
addNormEntry("wisc", "cd", "13-8", "80-83", 17);
addNormEntry("wisc", "cd", "13-8", "84-88", 18);
addNormEntry("wisc", "cd", "13-8", "89-119", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "14-0", "0-20", 1);
addNormEntry("wisc", "cd", "14-0", "21-23", 2);
addNormEntry("wisc", "cd", "14-0", "24-26", 3);
addNormEntry("wisc", "cd", "14-0", "27-30", 4);
addNormEntry("wisc", "cd", "14-0", "31-34", 5);
addNormEntry("wisc", "cd", "14-0", "35-38", 6);
addNormEntry("wisc", "cd", "14-0", "39-42", 7);
addNormEntry("wisc", "cd", "14-0", "43-46", 8);
addNormEntry("wisc", "cd", "14-0", "47-50", 9);
addNormEntry("wisc", "cd", "14-0", "51-54", 10);
addNormEntry("wisc", "cd", "14-0", "55-58", 11);
addNormEntry("wisc", "cd", "14-0", "59-63", 12);
addNormEntry("wisc", "cd", "14-0", "64-67", 13);
addNormEntry("wisc", "cd", "14-0", "68-72", 14);
addNormEntry("wisc", "cd", "14-0", "73-76", 15);
addNormEntry("wisc", "cd", "14-0", "77-81", 16);
addNormEntry("wisc", "cd", "14-0", "82-85", 17);
addNormEntry("wisc", "cd", "14-0", "86-90", 18);
addNormEntry("wisc", "cd", "14-0", "91-119", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "14-4", "0-21", 1);
addNormEntry("wisc", "cd", "14-4", "22-24", 2);
addNormEntry("wisc", "cd", "14-4", "25-27", 3);
addNormEntry("wisc", "cd", "14-4", "28-31", 4);
addNormEntry("wisc", "cd", "14-4", "32-35", 5);
addNormEntry("wisc", "cd", "14-4", "36-38", 6);
addNormEntry("wisc", "cd", "14-4", "39-43", 7);
addNormEntry("wisc", "cd", "14-4", "44-47", 8);
addNormEntry("wisc", "cd", "14-4", "48-51", 9);
addNormEntry("wisc", "cd", "14-4", "52-55", 10);
addNormEntry("wisc", "cd", "14-4", "56-60", 11);
addNormEntry("wisc", "cd", "14-4", "61-64", 12);
addNormEntry("wisc", "cd", "14-4", "65-69", 13);
addNormEntry("wisc", "cd", "14-4", "70-73", 14);
addNormEntry("wisc", "cd", "14-4", "74-78", 15);
addNormEntry("wisc", "cd", "14-4", "79-83", 16);
addNormEntry("wisc", "cd", "14-4", "84-87", 17);
addNormEntry("wisc", "cd", "14-4", "88-92", 18);
addNormEntry("wisc", "cd", "14-4", "93-119", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "14-8", "0-21", 1);
addNormEntry("wisc", "cd", "14-8", "22-24", 2);
addNormEntry("wisc", "cd", "14-8", "25-28", 3);
addNormEntry("wisc", "cd", "14-8", "29-32", 4);
addNormEntry("wisc", "cd", "14-8", "33-35", 5);
addNormEntry("wisc", "cd", "14-8", "36-39", 6);
addNormEntry("wisc", "cd", "14-8", "40-43", 7);
addNormEntry("wisc", "cd", "14-8", "44-47", 8);
addNormEntry("wisc", "cd", "14-8", "48-52", 9);
addNormEntry("wisc", "cd", "14-8", "53-56", 10);
addNormEntry("wisc", "cd", "14-8", "57-61", 11);
addNormEntry("wisc", "cd", "14-8", "62-65", 12);
addNormEntry("wisc", "cd", "14-8", "66-70", 13);
addNormEntry("wisc", "cd", "14-8", "71-75", 14);
addNormEntry("wisc", "cd", "14-8", "76-79", 15);
addNormEntry("wisc", "cd", "14-8", "80-84", 16);
addNormEntry("wisc", "cd", "14-8", "85-89", 17);
addNormEntry("wisc", "cd", "14-8", "90-94", 18);
addNormEntry("wisc", "cd", "14-8", "95-119", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "15-0", "0-22", 1);
addNormEntry("wisc", "cd", "15-0", "23-25", 2);
addNormEntry("wisc", "cd", "15-0", "26-29", 3);
addNormEntry("wisc", "cd", "15-0", "30-32", 4);
addNormEntry("wisc", "cd", "15-0", "33-36", 5);
addNormEntry("wisc", "cd", "15-0", "37-40", 6);
addNormEntry("wisc", "cd", "15-0", "41-44", 7);
addNormEntry("wisc", "cd", "15-0", "45-48", 8);
addNormEntry("wisc", "cd", "15-0", "49-53", 9);
addNormEntry("wisc", "cd", "15-0", "54-57", 10);
addNormEntry("wisc", "cd", "15-0", "58-62", 11);
addNormEntry("wisc", "cd", "15-0", "63-66", 12);
addNormEntry("wisc", "cd", "15-0", "67-71", 13);
addNormEntry("wisc", "cd", "15-0", "72-76", 14);
addNormEntry("wisc", "cd", "15-0", "77-81", 15);
addNormEntry("wisc", "cd", "15-0", "82-86", 16);
addNormEntry("wisc", "cd", "15-0", "87-91", 17);
addNormEntry("wisc", "cd", "15-0", "92-97", 18);
addNormEntry("wisc", "cd", "15-0", "98-119", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "15-4", "0-23", 1);
addNormEntry("wisc", "cd", "15-4", "24-26", 2);
addNormEntry("wisc", "cd", "15-4", "27-29", 3);
addNormEntry("wisc", "cd", "15-4", "30-33", 4);
addNormEntry("wisc", "cd", "15-4", "34-37", 5);
addNormEntry("wisc", "cd", "15-4", "38-41", 6);
addNormEntry("wisc", "cd", "15-4", "42-45", 7);
addNormEntry("wisc", "cd", "15-4", "46-49", 8);
addNormEntry("wisc", "cd", "15-4", "50-54", 9);
addNormEntry("wisc", "cd", "15-4", "55-58", 10);
addNormEntry("wisc", "cd", "15-4", "59-63", 11);
addNormEntry("wisc", "cd", "15-4", "64-68", 12);
addNormEntry("wisc", "cd", "15-4", "69-73", 13);
addNormEntry("wisc", "cd", "15-4", "74-78", 14);
addNormEntry("wisc", "cd", "15-4", "79-83", 15);
addNormEntry("wisc", "cd", "15-4", "84-88", 16);
addNormEntry("wisc", "cd", "15-4", "89-93", 17);
addNormEntry("wisc", "cd", "15-4", "94-99", 18);
addNormEntry("wisc", "cd", "15-4", "100-119", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "15-8", "0-24", 1);
addNormEntry("wisc", "cd", "15-8", "25-27", 2);
addNormEntry("wisc", "cd", "15-8", "28-30", 3);
addNormEntry("wisc", "cd", "15-8", "31-34", 4);
addNormEntry("wisc", "cd", "15-8", "35-37", 5);
addNormEntry("wisc", "cd", "15-8", "38-41", 6);
addNormEntry("wisc", "cd", "15-8", "42-46", 7);
addNormEntry("wisc", "cd", "15-8", "47-50", 8);
addNormEntry("wisc", "cd", "15-8", "51-54", 9);
addNormEntry("wisc", "cd", "15-8", "55-59", 10);
addNormEntry("wisc", "cd", "15-8", "60-64", 11);
addNormEntry("wisc", "cd", "15-8", "65-69", 12);
addNormEntry("wisc", "cd", "15-8", "70-74", 13);
addNormEntry("wisc", "cd", "15-8", "75-79", 14);
addNormEntry("wisc", "cd", "15-8", "80-84", 15);
addNormEntry("wisc", "cd", "15-8", "85-90", 16);
addNormEntry("wisc", "cd", "15-8", "91-95", 17);
addNormEntry("wisc", "cd", "15-8", "96-101", 18);
addNormEntry("wisc", "cd", "15-8", "102-119", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Códigos)
addNormEntry("wisc", "cd", "16-0", "0-25", 1);
addNormEntry("wisc", "cd", "16-0", "26-28", 2);
addNormEntry("wisc", "cd", "16-0", "29-31", 3);
addNormEntry("wisc", "cd", "16-0", "32-34", 4);
addNormEntry("wisc", "cd", "16-0", "35-38", 5);
addNormEntry("wisc", "cd", "16-0", "39-42", 6);
addNormEntry("wisc", "cd", "16-0", "43-46", 7);
addNormEntry("wisc", "cd", "16-0", "47-51", 8);
addNormEntry("wisc", "cd", "16-0", "52-55", 9);
addNormEntry("wisc", "cd", "16-0", "56-60", 10);
addNormEntry("wisc", "cd", "16-0", "61-65", 11);
addNormEntry("wisc", "cd", "16-0", "66-70", 12);
addNormEntry("wisc", "cd", "16-0", "71-75", 13);
addNormEntry("wisc", "cd", "16-0", "76-81", 14);
addNormEntry("wisc", "cd", "16-0", "82-86", 15);
addNormEntry("wisc", "cd", "16-0", "87-91", 16);
addNormEntry("wisc", "cd", "16-0", "92-97", 17);
addNormEntry("wisc", "cd", "16-0", "98-103", 18);
addNormEntry("wisc", "cd", "16-0", "104-119", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Códigos)
addNormEntry("wisc", "cd", "16-4", "0-26", 1);
addNormEntry("wisc", "cd", "16-4", "27-29", 2);
addNormEntry("wisc", "cd", "16-4", "30-32", 3);
addNormEntry("wisc", "cd", "16-4", "33-35", 4);
addNormEntry("wisc", "cd", "16-4", "36-39", 5);
addNormEntry("wisc", "cd", "16-4", "40-43", 6);
addNormEntry("wisc", "cd", "16-4", "44-47", 7);
addNormEntry("wisc", "cd", "16-4", "48-51", 8);
addNormEntry("wisc", "cd", "16-4", "52-56", 9);
addNormEntry("wisc", "cd", "16-4", "57-61", 10);
addNormEntry("wisc", "cd", "16-4", "62-66", 11);
addNormEntry("wisc", "cd", "16-4", "67-71", 12);
addNormEntry("wisc", "cd", "16-4", "72-77", 13);
addNormEntry("wisc", "cd", "16-4", "78-82", 14);
addNormEntry("wisc", "cd", "16-4", "83-87", 15);
addNormEntry("wisc", "cd", "16-4", "88-93", 16);
addNormEntry("wisc", "cd", "16-4", "94-99", 17);
addNormEntry("wisc", "cd", "16-4", "100-105", 18);
addNormEntry("wisc", "cd", "16-4", "106-119", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Códigos)
addNormEntry("wisc", "cd", "16-8", "0-27", 1);
addNormEntry("wisc", "cd", "16-8", "28-30", 2);
addNormEntry("wisc", "cd", "16-8", "31-33", 3);
addNormEntry("wisc", "cd", "16-8", "34-36", 4);
addNormEntry("wisc", "cd", "16-8", "37-40", 5);
addNormEntry("wisc", "cd", "16-8", "41-44", 6);
addNormEntry("wisc", "cd", "16-8", "45-48", 7);
addNormEntry("wisc", "cd", "16-8", "49-52", 8);
addNormEntry("wisc", "cd", "16-8", "53-57", 9);
addNormEntry("wisc", "cd", "16-8", "58-62", 10);
addNormEntry("wisc", "cd", "16-8", "63-67", 11);
addNormEntry("wisc", "cd", "16-8", "68-72", 12);
addNormEntry("wisc", "cd", "16-8", "73-78", 13);
addNormEntry("wisc", "cd", "16-8", "79-83", 14);
addNormEntry("wisc", "cd", "16-8", "84-89", 15);
addNormEntry("wisc", "cd", "16-8", "90-95", 16);
addNormEntry("wisc", "cd", "16-8", "96-101", 17);
addNormEntry("wisc", "cd", "16-8", "102-107", 18);
addNormEntry("wisc", "cd", "16-8", "108-119", 19);

// --- Normas do Subteste Vocabulário (VC) ---

// FAIXA 6-0 — 6 anos (Vocabulário)
addNormEntry("wisc", "vc", "6-0", "0-2", 1);
addNormEntry("wisc", "vc", "6-0", "3", 2);
addNormEntry("wisc", "vc", "6-0", "4", 3);
addNormEntry("wisc", "vc", "6-0", "5-6", 4);
addNormEntry("wisc", "vc", "6-0", "7", 5);
addNormEntry("wisc", "vc", "6-0", "8-9", 6);
addNormEntry("wisc", "vc", "6-0", "10", 7);
addNormEntry("wisc", "vc", "6-0", "11-12", 8);
addNormEntry("wisc", "vc", "6-0", "13-14", 9);
addNormEntry("wisc", "vc", "6-0", "15-17", 10);
addNormEntry("wisc", "vc", "6-0", "18-19", 11);
addNormEntry("wisc", "vc", "6-0", "20-21", 12);
addNormEntry("wisc", "vc", "6-0", "22-24", 13);
addNormEntry("wisc", "vc", "6-0", "25-26", 14);
addNormEntry("wisc", "vc", "6-0", "27-29", 15);
addNormEntry("wisc", "vc", "6-0", "30-31", 16);
addNormEntry("wisc", "vc", "6-0", "32-34", 17);
addNormEntry("wisc", "vc", "6-0", "35-37", 18);
addNormEntry("wisc", "vc", "6-0", "38-68", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "6-4", "0-3", 1);
addNormEntry("wisc", "vc", "6-4", "4", 2);
addNormEntry("wisc", "vc", "6-4", "5", 3);
addNormEntry("wisc", "vc", "6-4", "6-7", 4);
addNormEntry("wisc", "vc", "6-4", "8", 5);
addNormEntry("wisc", "vc", "6-4", "9-10", 6);
addNormEntry("wisc", "vc", "6-4", "11-12", 7);
addNormEntry("wisc", "vc", "6-4", "13-14", 8);
addNormEntry("wisc", "vc", "6-4", "15-16", 9);
addNormEntry("wisc", "vc", "6-4", "17-18", 10);
addNormEntry("wisc", "vc", "6-4", "19-20", 11);
addNormEntry("wisc", "vc", "6-4", "21-23", 12);
addNormEntry("wisc", "vc", "6-4", "24-25", 13);
addNormEntry("wisc", "vc", "6-4", "26-27", 14);
addNormEntry("wisc", "vc", "6-4", "28-30", 15);
addNormEntry("wisc", "vc", "6-4", "31-32", 16);
addNormEntry("wisc", "vc", "6-4", "33-35", 17);
addNormEntry("wisc", "vc", "6-4", "36-38", 18);
addNormEntry("wisc", "vc", "6-4", "39-68", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "6-8", "0-4", 1);
addNormEntry("wisc", "vc", "6-8", "5", 2);
addNormEntry("wisc", "vc", "6-8", "6", 3);
addNormEntry("wisc", "vc", "6-8", "7-8", 4);
addNormEntry("wisc", "vc", "6-8", "9", 5);
addNormEntry("wisc", "vc", "6-8", "10-11", 6);
addNormEntry("wisc", "vc", "6-8", "12-13", 7);
addNormEntry("wisc", "vc", "6-8", "14-15", 8);
addNormEntry("wisc", "vc", "6-8", "16-17", 9);
addNormEntry("wisc", "vc", "6-8", "18-19", 10);
addNormEntry("wisc", "vc", "6-8", "20-21", 11);
addNormEntry("wisc", "vc", "6-8", "22-24", 12);
addNormEntry("wisc", "vc", "6-8", "25-26", 13);
addNormEntry("wisc", "vc", "6-8", "27-29", 14);
addNormEntry("wisc", "vc", "6-8", "30-31", 15);
addNormEntry("wisc", "vc", "6-8", "32-34", 16);
addNormEntry("wisc", "vc", "6-8", "35-36", 17);
addNormEntry("wisc", "vc", "6-8", "37-39", 18);
addNormEntry("wisc", "vc", "6-8", "40-68", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "7-0", "0-4", 1);
addNormEntry("wisc", "vc", "7-0", "5", 2);
addNormEntry("wisc", "vc", "7-0", "6-7", 3);
addNormEntry("wisc", "vc", "7-0", "8-9", 4);
addNormEntry("wisc", "vc", "7-0", "10", 5);
addNormEntry("wisc", "vc", "7-0", "11-12", 6);
addNormEntry("wisc", "vc", "7-0", "13-14", 7);
addNormEntry("wisc", "vc", "7-0", "15-16", 8);
addNormEntry("wisc", "vc", "7-0", "17-18", 9);
addNormEntry("wisc", "vc", "7-0", "19-20", 10);
addNormEntry("wisc", "vc", "7-0", "21-23", 11);
addNormEntry("wisc", "vc", "7-0", "24-25", 12);
addNormEntry("wisc", "vc", "7-0", "26-27", 13);
addNormEntry("wisc", "vc", "7-0", "28-30", 14);
addNormEntry("wisc", "vc", "7-0", "31-32", 15);
addNormEntry("wisc", "vc", "7-0", "33-35", 16);
addNormEntry("wisc", "vc", "7-0", "36-37", 17);
addNormEntry("wisc", "vc", "7-0", "38-40", 18);
addNormEntry("wisc", "vc", "7-0", "41-68", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "7-4", "0-5", 1);
addNormEntry("wisc", "vc", "7-4", "6", 2);
addNormEntry("wisc", "vc", "7-4", "7-8", 3);
addNormEntry("wisc", "vc", "7-4", "9", 4);
addNormEntry("wisc", "vc", "7-4", "10-11", 5);
addNormEntry("wisc", "vc", "7-4", "12-13", 6);
addNormEntry("wisc", "vc", "7-4", "14-15", 7);
addNormEntry("wisc", "vc", "7-4", "16-17", 8);
addNormEntry("wisc", "vc", "7-4", "18-19", 9);
addNormEntry("wisc", "vc", "7-4", "20-22", 10);
addNormEntry("wisc", "vc", "7-4", "23-24", 11);
addNormEntry("wisc", "vc", "7-4", "25-26", 12);
addNormEntry("wisc", "vc", "7-4", "27-28", 13);
addNormEntry("wisc", "vc", "7-4", "29-31", 14);
addNormEntry("wisc", "vc", "7-4", "32-33", 15);
addNormEntry("wisc", "vc", "7-4", "34-36", 16);
addNormEntry("wisc", "vc", "7-4", "37-38", 17);
addNormEntry("wisc", "vc", "7-4", "39-41", 18);
addNormEntry("wisc", "vc", "7-4", "42-68", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "7-8", "0-5", 1);
addNormEntry("wisc", "vc", "7-8", "6-7", 2);
addNormEntry("wisc", "vc", "7-8", "8", 3);
addNormEntry("wisc", "vc", "7-8", "9-10", 4);
addNormEntry("wisc", "vc", "7-8", "11-12", 5);
addNormEntry("wisc", "vc", "7-8", "13-14", 6);
addNormEntry("wisc", "vc", "7-8", "15-16", 7);
addNormEntry("wisc", "vc", "7-8", "17-18", 8);
addNormEntry("wisc", "vc", "7-8", "19-20", 9);
addNormEntry("wisc", "vc", "7-8", "21-23", 10);
addNormEntry("wisc", "vc", "7-8", "24-25", 11);
addNormEntry("wisc", "vc", "7-8", "26-27", 12);
addNormEntry("wisc", "vc", "7-8", "28-30", 13);
addNormEntry("wisc", "vc", "7-8", "31-32", 14);
addNormEntry("wisc", "vc", "7-8", "33-34", 15);
addNormEntry("wisc", "vc", "7-8", "35-37", 16);
addNormEntry("wisc", "vc", "7-8", "38-39", 17);
addNormEntry("wisc", "vc", "7-8", "40-42", 18);
addNormEntry("wisc", "vc", "7-8", "43-68", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "8-0", "0-5", 1);
addNormEntry("wisc", "vc", "8-0", "6-7", 2);
addNormEntry("wisc", "vc", "8-0", "8-9", 3);
addNormEntry("wisc", "vc", "8-0", "10-11", 4);
addNormEntry("wisc", "vc", "8-0", "12-13", 5);
addNormEntry("wisc", "vc", "8-0", "14-15", 6);
addNormEntry("wisc", "vc", "8-0", "16-17", 7);
addNormEntry("wisc", "vc", "8-0", "18-19", 8);
addNormEntry("wisc", "vc", "8-0", "20-21", 9);
addNormEntry("wisc", "vc", "8-0", "22-24", 10);
addNormEntry("wisc", "vc", "8-0", "25-26", 11);
addNormEntry("wisc", "vc", "8-0", "27-28", 12);
addNormEntry("wisc", "vc", "8-0", "29-31", 13);
addNormEntry("wisc", "vc", "8-0", "32-33", 14);
addNormEntry("wisc", "vc", "8-0", "34-35", 15);
addNormEntry("wisc", "vc", "8-0", "36-38", 16);
addNormEntry("wisc", "vc", "8-0", "39-40", 17);
addNormEntry("wisc", "vc", "8-0", "41-43", 18);
addNormEntry("wisc", "vc", "8-0", "44-68", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "8-4", "0-6", 1);
addNormEntry("wisc", "vc", "8-4", "7-8", 2);
addNormEntry("wisc", "vc", "8-4", "9-10", 3);
addNormEntry("wisc", "vc", "8-4", "11-12", 4);
addNormEntry("wisc", "vc", "8-4", "13-14", 5);
addNormEntry("wisc", "vc", "8-4", "15-16", 6);
addNormEntry("wisc", "vc", "8-4", "17-18", 7);
addNormEntry("wisc", "vc", "8-4", "19-20", 8);
addNormEntry("wisc", "vc", "8-4", "21-22", 9);
addNormEntry("wisc", "vc", "8-4", "23-25", 10);
addNormEntry("wisc", "vc", "8-4", "26-27", 11);
addNormEntry("wisc", "vc", "8-4", "28-29", 12);
addNormEntry("wisc", "vc", "8-4", "30-31", 13);
addNormEntry("wisc", "vc", "8-4", "32-34", 14);
addNormEntry("wisc", "vc", "8-4", "35-36", 15);
addNormEntry("wisc", "vc", "8-4", "37-39", 16);
addNormEntry("wisc", "vc", "8-4", "40-41", 17);
addNormEntry("wisc", "vc", "8-4", "42-44", 18);
addNormEntry("wisc", "vc", "8-4", "45-68", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "8-8", "0-6", 1);
addNormEntry("wisc", "vc", "8-8", "7-8", 2);
addNormEntry("wisc", "vc", "8-8", "9-10", 3);
addNormEntry("wisc", "vc", "8-8", "11-12", 4);
addNormEntry("wisc", "vc", "8-8", "13-14", 5);
addNormEntry("wisc", "vc", "8-8", "15-17", 6);
addNormEntry("wisc", "vc", "8-8", "18-19", 7);
addNormEntry("wisc", "vc", "8-8", "20-21", 8);
addNormEntry("wisc", "vc", "8-8", "22-23", 9);
addNormEntry("wisc", "vc", "8-8", "24-25", 10);
addNormEntry("wisc", "vc", "8-8", "26-28", 11);
addNormEntry("wisc", "vc", "8-8", "29-30", 12);
addNormEntry("wisc", "vc", "8-8", "31-32", 13);
addNormEntry("wisc", "vc", "8-8", "33-35", 14);
addNormEntry("wisc", "vc", "8-8", "36-37", 15);
addNormEntry("wisc", "vc", "8-8", "38-39", 16);
addNormEntry("wisc", "vc", "8-8", "40-42", 17);
addNormEntry("wisc", "vc", "8-8", "43-44", 18);
addNormEntry("wisc", "vc", "8-8", "45-68", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "9-0", "0-6", 1);
addNormEntry("wisc", "vc", "9-0", "7-9", 2);
addNormEntry("wisc", "vc", "9-0", "10-11", 3);
addNormEntry("wisc", "vc", "9-0", "12-13", 4);
addNormEntry("wisc", "vc", "9-0", "14-15", 5);
addNormEntry("wisc", "vc", "9-0", "16-17", 6);
addNormEntry("wisc", "vc", "9-0", "18-20", 7);
addNormEntry("wisc", "vc", "9-0", "21-22", 8);
addNormEntry("wisc", "vc", "9-0", "23-24", 9);
addNormEntry("wisc", "vc", "9-0", "25-26", 10);
addNormEntry("wisc", "vc", "9-0", "27-29", 11);
addNormEntry("wisc", "vc", "9-0", "30-31", 12);
addNormEntry("wisc", "vc", "9-0", "32-33", 13);
addNormEntry("wisc", "vc", "9-0", "34-36", 14);
addNormEntry("wisc", "vc", "9-0", "37-38", 15);
addNormEntry("wisc", "vc", "9-0", "39-40", 16);
addNormEntry("wisc", "vc", "9-0", "41-43", 17);
addNormEntry("wisc", "vc", "9-0", "44-45", 18);
addNormEntry("wisc", "vc", "9-0", "46-68", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "9-4", "0-7", 1);
addNormEntry("wisc", "vc", "9-4", "8-9", 2);
addNormEntry("wisc", "vc", "9-4", "10-11", 3);
addNormEntry("wisc", "vc", "9-4", "12-14", 4);
addNormEntry("wisc", "vc", "9-4", "15-16", 5);
addNormEntry("wisc", "vc", "9-4", "17-18", 6);
addNormEntry("wisc", "vc", "9-4", "19-20", 7);
addNormEntry("wisc", "vc", "9-4", "21-23", 8);
addNormEntry("wisc", "vc", "9-4", "24-25", 9);
addNormEntry("wisc", "vc", "9-4", "26-27", 10);
addNormEntry("wisc", "vc", "9-4", "28-30", 11);
addNormEntry("wisc", "vc", "9-4", "31-32", 12);
addNormEntry("wisc", "vc", "9-4", "33-34", 13);
addNormEntry("wisc", "vc", "9-4", "35-36", 14);
addNormEntry("wisc", "vc", "9-4", "37-39", 15);
addNormEntry("wisc", "vc", "9-4", "40-41", 16);
addNormEntry("wisc", "vc", "9-4", "42-43", 17);
addNormEntry("wisc", "vc", "9-4", "44-46", 18);
addNormEntry("wisc", "vc", "9-4", "47-68", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "9-8", "0-7", 1);
addNormEntry("wisc", "vc", "9-8", "8-9", 2);
addNormEntry("wisc", "vc", "9-8", "10-12", 3);
addNormEntry("wisc", "vc", "9-8", "13-14", 4);
addNormEntry("wisc", "vc", "9-8", "15-16", 5);
addNormEntry("wisc", "vc", "9-8", "17-19", 6);
addNormEntry("wisc", "vc", "9-8", "20-21", 7);
addNormEntry("wisc", "vc", "9-8", "22-23", 8);
addNormEntry("wisc", "vc", "9-8", "24-26", 9);
addNormEntry("wisc", "vc", "9-8", "27-28", 10);
addNormEntry("wisc", "vc", "9-8", "29-30", 11);
addNormEntry("wisc", "vc", "9-8", "31-33", 12);
addNormEntry("wisc", "vc", "9-8", "34-35", 13);
addNormEntry("wisc", "vc", "9-8", "36-37", 14);
addNormEntry("wisc", "vc", "9-8", "38-40", 15);
addNormEntry("wisc", "vc", "9-8", "41-42", 16);
addNormEntry("wisc", "vc", "9-8", "43-44", 17);
addNormEntry("wisc", "vc", "9-8", "45-46", 18);
addNormEntry("wisc", "vc", "9-8", "47-68", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "10-0", "0-8", 1);
addNormEntry("wisc", "vc", "10-0", "9-10", 2);
addNormEntry("wisc", "vc", "10-0", "11-12", 3);
addNormEntry("wisc", "vc", "10-0", "13-15", 4);
addNormEntry("wisc", "vc", "10-0", "16-17", 5);
addNormEntry("wisc", "vc", "10-0", "18-19", 6);
addNormEntry("wisc", "vc", "10-0", "20-22", 7);
addNormEntry("wisc", "vc", "10-0", "23-24", 8);
addNormEntry("wisc", "vc", "10-0", "25-26", 9);
addNormEntry("wisc", "vc", "10-0", "27-29", 10);
addNormEntry("wisc", "vc", "10-0", "30-31", 11);
addNormEntry("wisc", "vc", "10-0", "32-33", 12);
addNormEntry("wisc", "vc", "10-0", "34-36", 13);
addNormEntry("wisc", "vc", "10-0", "37-38", 14);
addNormEntry("wisc", "vc", "10-0", "39-40", 15);
addNormEntry("wisc", "vc", "10-0", "41-43", 16);
addNormEntry("wisc", "vc", "10-0", "44-45", 17);
addNormEntry("wisc", "vc", "10-0", "46-47", 18);
addNormEntry("wisc", "vc", "10-0", "48-68", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "10-4", "0-8", 1);
addNormEntry("wisc", "vc", "10-4", "9-10", 2);
addNormEntry("wisc", "vc", "10-4", "11-13", 3);
addNormEntry("wisc", "vc", "10-4", "14-15", 4);
addNormEntry("wisc", "vc", "10-4", "16-18", 5);
addNormEntry("wisc", "vc", "10-4", "19-20", 6);
addNormEntry("wisc", "vc", "10-4", "21-22", 7);
addNormEntry("wisc", "vc", "10-4", "23-25", 8);
addNormEntry("wisc", "vc", "10-4", "26-27", 9);
addNormEntry("wisc", "vc", "10-4", "28-30", 10);
addNormEntry("wisc", "vc", "10-4", "31-32", 11);
addNormEntry("wisc", "vc", "10-4", "33-34", 12);
addNormEntry("wisc", "vc", "10-4", "35-36", 13);
addNormEntry("wisc", "vc", "10-4", "37-39", 14);
addNormEntry("wisc", "vc", "10-4", "40-41", 15);
addNormEntry("wisc", "vc", "10-4", "42-43", 16);
addNormEntry("wisc", "vc", "10-4", "44-46", 17);
addNormEntry("wisc", "vc", "10-4", "47-48", 18);
addNormEntry("wisc", "vc", "10-4", "49-68", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "10-8", "0-8", 1);
addNormEntry("wisc", "vc", "10-8", "9-11", 2);
addNormEntry("wisc", "vc", "10-8", "12-13", 3);
addNormEntry("wisc", "vc", "10-8", "14-16", 4);
addNormEntry("wisc", "vc", "10-8", "17-18", 5);
addNormEntry("wisc", "vc", "10-8", "19-21", 6);
addNormEntry("wisc", "vc", "10-8", "22-23", 7);
addNormEntry("wisc", "vc", "10-8", "24-25", 8);
addNormEntry("wisc", "vc", "10-8", "26-28", 9);
addNormEntry("wisc", "vc", "10-8", "29-30", 10);
addNormEntry("wisc", "vc", "10-8", "31-33", 11);
addNormEntry("wisc", "vc", "10-8", "34-35", 12);
addNormEntry("wisc", "vc", "10-8", "36-37", 13);
addNormEntry("wisc", "vc", "10-8", "38-39", 14);
addNormEntry("wisc", "vc", "10-8", "40-42", 15);
addNormEntry("wisc", "vc", "10-8", "43-44", 16);
addNormEntry("wisc", "vc", "10-8", "45-46", 17);
addNormEntry("wisc", "vc", "10-8", "47-48", 18);
addNormEntry("wisc", "vc", "10-8", "49-68", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "11-0", "0-9", 1);
addNormEntry("wisc", "vc", "11-0", "10-11", 2);
addNormEntry("wisc", "vc", "11-0", "12-14", 3);
addNormEntry("wisc", "vc", "11-0", "15-16", 4);
addNormEntry("wisc", "vc", "11-0", "17-19", 5);
addNormEntry("wisc", "vc", "11-0", "20-21", 6);
addNormEntry("wisc", "vc", "11-0", "22-24", 7);
addNormEntry("wisc", "vc", "11-0", "25-26", 8);
addNormEntry("wisc", "vc", "11-0", "27-29", 9);
addNormEntry("wisc", "vc", "11-0", "30-31", 10);
addNormEntry("wisc", "vc", "11-0", "32-33", 11);
addNormEntry("wisc", "vc", "11-0", "34-36", 12);
addNormEntry("wisc", "vc", "11-0", "37-38", 13);
addNormEntry("wisc", "vc", "11-0", "39-40", 14);
addNormEntry("wisc", "vc", "11-0", "41-42", 15);
addNormEntry("wisc", "vc", "11-0", "43-45", 16);
addNormEntry("wisc", "vc", "11-0", "46-47", 17);
addNormEntry("wisc", "vc", "11-0", "48-49", 18);
addNormEntry("wisc", "vc", "11-0", "50-68", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "11-4", "0-9", 1);
addNormEntry("wisc", "vc", "11-4", "10-12", 2);
addNormEntry("wisc", "vc", "11-4", "13-14", 3);
addNormEntry("wisc", "vc", "11-4", "15-17", 4);
addNormEntry("wisc", "vc", "11-4", "18-19", 5);
addNormEntry("wisc", "vc", "11-4", "20-22", 6);
addNormEntry("wisc", "vc", "11-4", "23-24", 7);
addNormEntry("wisc", "vc", "11-4", "25-27", 8);
addNormEntry("wisc", "vc", "11-4", "28-29", 9);
addNormEntry("wisc", "vc", "11-4", "30-32", 10);
addNormEntry("wisc", "vc", "11-4", "33-34", 11);
addNormEntry("wisc", "vc", "11-4", "35-36", 12);
addNormEntry("wisc", "vc", "11-4", "37-39", 13);
addNormEntry("wisc", "vc", "11-4", "40-41", 14);
addNormEntry("wisc", "vc", "11-4", "42-43", 15);
addNormEntry("wisc", "vc", "11-4", "44-45", 16);
addNormEntry("wisc", "vc", "11-4", "46-48", 17);
addNormEntry("wisc", "vc", "11-4", "49-50", 18);
addNormEntry("wisc", "vc", "11-4", "51-68", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "11-8", "0-10", 1);
addNormEntry("wisc", "vc", "11-8", "11-12", 2);
addNormEntry("wisc", "vc", "11-8", "13-15", 3);
addNormEntry("wisc", "vc", "11-8", "16-17", 4);
addNormEntry("wisc", "vc", "11-8", "18-20", 5);
addNormEntry("wisc", "vc", "11-8", "21-22", 6);
addNormEntry("wisc", "vc", "11-8", "23-25", 7);
addNormEntry("wisc", "vc", "11-8", "26-27", 8);
addNormEntry("wisc", "vc", "11-8", "28-30", 9);
addNormEntry("wisc", "vc", "11-8", "31-32", 10);
addNormEntry("wisc", "vc", "11-8", "33-35", 11);
addNormEntry("wisc", "vc", "11-8", "36-37", 12);
addNormEntry("wisc", "vc", "11-8", "38-39", 13);
addNormEntry("wisc", "vc", "11-8", "40-42", 14);
addNormEntry("wisc", "vc", "11-8", "43-44", 15);
addNormEntry("wisc", "vc", "11-8", "45-46", 16);
addNormEntry("wisc", "vc", "11-8", "47-48", 17);
addNormEntry("wisc", "vc", "11-8", "49-51", 18);
addNormEntry("wisc", "vc", "11-8", "52-68", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "12-0", "0-10", 1);
addNormEntry("wisc", "vc", "12-0", "11-13", 2);
addNormEntry("wisc", "vc", "12-0", "14-15", 3);
addNormEntry("wisc", "vc", "12-0", "16-18", 4);
addNormEntry("wisc", "vc", "12-0", "19-20", 5);
addNormEntry("wisc", "vc", "12-0", "21-23", 6);
addNormEntry("wisc", "vc", "12-0", "24-25", 7);
addNormEntry("wisc", "vc", "12-0", "26-28", 8);
addNormEntry("wisc", "vc", "12-0", "29-30", 9);
addNormEntry("wisc", "vc", "12-0", "31-33", 10);
addNormEntry("wisc", "vc", "12-0", "34-35", 11);
addNormEntry("wisc", "vc", "12-0", "36-38", 12);
addNormEntry("wisc", "vc", "12-0", "39-40", 13);
addNormEntry("wisc", "vc", "12-0", "41-42", 14);
addNormEntry("wisc", "vc", "12-0", "43-45", 15);
addNormEntry("wisc", "vc", "12-0", "46-47", 16);
addNormEntry("wisc", "vc", "12-0", "48-49", 17);
addNormEntry("wisc", "vc", "12-0", "50-51", 18);
addNormEntry("wisc", "vc", "12-0", "52-68", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "12-4", "0-10", 1);
addNormEntry("wisc", "vc", "12-4", "11-13", 2);
addNormEntry("wisc", "vc", "12-4", "14-16", 3);
addNormEntry("wisc", "vc", "12-4", "17-18", 4);
addNormEntry("wisc", "vc", "12-4", "19-21", 5);
addNormEntry("wisc", "vc", "12-4", "22-23", 6);
addNormEntry("wisc", "vc", "12-4", "24-26", 7);
addNormEntry("wisc", "vc", "12-4", "27-28", 8);
addNormEntry("wisc", "vc", "12-4", "29-31", 9);
addNormEntry("wisc", "vc", "12-4", "32-33", 10);
addNormEntry("wisc", "vc", "12-4", "34-36", 11);
addNormEntry("wisc", "vc", "12-4", "37-38", 12);
addNormEntry("wisc", "vc", "12-4", "39-41", 13);
addNormEntry("wisc", "vc", "12-4", "42-43", 14);
addNormEntry("wisc", "vc", "12-4", "44-45", 15);
addNormEntry("wisc", "vc", "12-4", "46-48", 16);
addNormEntry("wisc", "vc", "12-4", "49-50", 17);
addNormEntry("wisc", "vc", "12-4", "51-52", 18);
addNormEntry("wisc", "vc", "12-4", "53-68", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "12-8", "0-11", 1);
addNormEntry("wisc", "vc", "12-8", "12-13", 2);
addNormEntry("wisc", "vc", "12-8", "14-16", 3);
addNormEntry("wisc", "vc", "12-8", "17-19", 4);
addNormEntry("wisc", "vc", "12-8", "20-21", 5);
addNormEntry("wisc", "vc", "12-8", "22-24", 6);
addNormEntry("wisc", "vc", "12-8", "25-26", 7);
addNormEntry("wisc", "vc", "12-8", "27-29", 8);
addNormEntry("wisc", "vc", "12-8", "30-31", 9);
addNormEntry("wisc", "vc", "12-8", "32-34", 10);
addNormEntry("wisc", "vc", "12-8", "35-36", 11);
addNormEntry("wisc", "vc", "12-8", "37-39", 12);
addNormEntry("wisc", "vc", "12-8", "40-41", 13);
addNormEntry("wisc", "vc", "12-8", "42-44", 14);
addNormEntry("wisc", "vc", "12-8", "45-46", 15);
addNormEntry("wisc", "vc", "12-8", "47-48", 16);
addNormEntry("wisc", "vc", "12-8", "49-50", 17);
addNormEntry("wisc", "vc", "12-8", "51-53", 18);
addNormEntry("wisc", "vc", "12-8", "54-68", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "13-0", "0-11", 1);
addNormEntry("wisc", "vc", "13-0", "12-14", 2);
addNormEntry("wisc", "vc", "13-0", "15-17", 3);
addNormEntry("wisc", "vc", "13-0", "18-19", 4);
addNormEntry("wisc", "vc", "13-0", "20-22", 5);
addNormEntry("wisc", "vc", "13-0", "23-24", 6);
addNormEntry("wisc", "vc", "13-0", "25-27", 7);
addNormEntry("wisc", "vc", "13-0", "28-29", 8);
addNormEntry("wisc", "vc", "13-0", "30-32", 9);
addNormEntry("wisc", "vc", "13-0", "33-34", 10);
addNormEntry("wisc", "vc", "13-0", "35-37", 11);
addNormEntry("wisc", "vc", "13-0", "38-39", 12);
addNormEntry("wisc", "vc", "13-0", "40-42", 13);
addNormEntry("wisc", "vc", "13-0", "43-44", 14);
addNormEntry("wisc", "vc", "13-0", "45-47", 15);
addNormEntry("wisc", "vc", "13-0", "48-49", 16);
addNormEntry("wisc", "vc", "13-0", "50-51", 17);
addNormEntry("wisc", "vc", "13-0", "52-53", 18);
addNormEntry("wisc", "vc", "13-0", "54-68", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "13-4", "0-12", 1);
addNormEntry("wisc", "vc", "13-4", "13-14", 2);
addNormEntry("wisc", "vc", "13-4", "15-17", 3);
addNormEntry("wisc", "vc", "13-4", "18-20", 4);
addNormEntry("wisc", "vc", "13-4", "21-22", 5);
addNormEntry("wisc", "vc", "13-4", "23-25", 6);
addNormEntry("wisc", "vc", "13-4", "26-27", 7);
addNormEntry("wisc", "vc", "13-4", "28-30", 8);
addNormEntry("wisc", "vc", "13-4", "31-32", 9);
addNormEntry("wisc", "vc", "13-4", "33-35", 10);
addNormEntry("wisc", "vc", "13-4", "36-37", 11);
addNormEntry("wisc", "vc", "13-4", "38-40", 12);
addNormEntry("wisc", "vc", "13-4", "41-42", 13);
addNormEntry("wisc", "vc", "13-4", "43-45", 14);
addNormEntry("wisc", "vc", "13-4", "46-47", 15);
addNormEntry("wisc", "vc", "13-4", "48-50", 16);
addNormEntry("wisc", "vc", "13-4", "51-52", 17);
addNormEntry("wisc", "vc", "13-4", "53-54", 18);
addNormEntry("wisc", "vc", "13-4", "55-68", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "13-8", "0-12", 1);
addNormEntry("wisc", "vc", "13-8", "13-15", 2);
addNormEntry("wisc", "vc", "13-8", "16-17", 3);
addNormEntry("wisc", "vc", "13-8", "18-20", 4);
addNormEntry("wisc", "vc", "13-8", "21-23", 5);
addNormEntry("wisc", "vc", "13-8", "24-25", 6);
addNormEntry("wisc", "vc", "13-8", "26-28", 7);
addNormEntry("wisc", "vc", "13-8", "29-30", 8);
addNormEntry("wisc", "vc", "13-8", "31-33", 9);
addNormEntry("wisc", "vc", "13-8", "34-35", 10);
addNormEntry("wisc", "vc", "13-8", "36-38", 11);
addNormEntry("wisc", "vc", "13-8", "39-40", 12);
addNormEntry("wisc", "vc", "13-8", "41-43", 13);
addNormEntry("wisc", "vc", "13-8", "44-45", 14);
addNormEntry("wisc", "vc", "13-8", "46-48", 15);
addNormEntry("wisc", "vc", "13-8", "49-50", 16);
addNormEntry("wisc", "vc", "13-8", "51-53", 17);
addNormEntry("wisc", "vc", "13-8", "54-55", 18);
addNormEntry("wisc", "vc", "13-8", "56-68", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "14-0", "0-12", 1);
addNormEntry("wisc", "vc", "14-0", "13-15", 2);
addNormEntry("wisc", "vc", "14-0", "16-18", 3);
addNormEntry("wisc", "vc", "14-0", "19-20", 4);
addNormEntry("wisc", "vc", "14-0", "21-23", 5);
addNormEntry("wisc", "vc", "14-0", "24-26", 6);
addNormEntry("wisc", "vc", "14-0", "27-28", 7);
addNormEntry("wisc", "vc", "14-0", "29-31", 8);
addNormEntry("wisc", "vc", "14-0", "32-33", 9);
addNormEntry("wisc", "vc", "14-0", "34-36", 10);
addNormEntry("wisc", "vc", "14-0", "37-38", 11);
addNormEntry("wisc", "vc", "14-0", "39-41", 12);
addNormEntry("wisc", "vc", "14-0", "42-43", 13);
addNormEntry("wisc", "vc", "14-0", "44-46", 14);
addNormEntry("wisc", "vc", "14-0", "47-48", 15);
addNormEntry("wisc", "vc", "14-0", "49-51", 16);
addNormEntry("wisc", "vc", "14-0", "52-53", 17);
addNormEntry("wisc", "vc", "14-0", "54-56", 18);
addNormEntry("wisc", "vc", "14-0", "57-68", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "14-4", "0-13", 1);
addNormEntry("wisc", "vc", "14-4", "14-15", 2);
addNormEntry("wisc", "vc", "14-4", "16-18", 3);
addNormEntry("wisc", "vc", "14-4", "19-21", 4);
addNormEntry("wisc", "vc", "14-4", "22-23", 5);
addNormEntry("wisc", "vc", "14-4", "24-26", 6);
addNormEntry("wisc", "vc", "14-4", "27-29", 7);
addNormEntry("wisc", "vc", "14-4", "30-31", 8);
addNormEntry("wisc", "vc", "14-4", "32-34", 9);
addNormEntry("wisc", "vc", "14-4", "35-36", 10);
addNormEntry("wisc", "vc", "14-4", "37-39", 11);
addNormEntry("wisc", "vc", "14-4", "40-41", 12);
addNormEntry("wisc", "vc", "14-4", "42-44", 13);
addNormEntry("wisc", "vc", "14-4", "45-46", 14);
addNormEntry("wisc", "vc", "14-4", "47-49", 15);
addNormEntry("wisc", "vc", "14-4", "50-51", 16);
addNormEntry("wisc", "vc", "14-4", "52-54", 17);
addNormEntry("wisc", "vc", "14-4", "55-56", 18);
addNormEntry("wisc", "vc", "14-4", "57-68", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "14-8", "0-13", 1);
addNormEntry("wisc", "vc", "14-8", "14-16", 2);
addNormEntry("wisc", "vc", "14-8", "17-18", 3);
addNormEntry("wisc", "vc", "14-8", "19-21", 4);
addNormEntry("wisc", "vc", "14-8", "22-24", 5);
addNormEntry("wisc", "vc", "14-8", "25-26", 6);
addNormEntry("wisc", "vc", "14-8", "27-29", 7);
addNormEntry("wisc", "vc", "14-8", "30-32", 8);
addNormEntry("wisc", "vc", "14-8", "33-34", 9);
addNormEntry("wisc", "vc", "14-8", "35-37", 10);
addNormEntry("wisc", "vc", "14-8", "38-39", 11);
addNormEntry("wisc", "vc", "14-8", "40-42", 12);
addNormEntry("wisc", "vc", "14-8", "43-44", 13);
addNormEntry("wisc", "vc", "14-8", "45-47", 14);
addNormEntry("wisc", "vc", "14-8", "48-49", 15);
addNormEntry("wisc", "vc", "14-8", "50-52", 16);
addNormEntry("wisc", "vc", "14-8", "53-54", 17);
addNormEntry("wisc", "vc", "14-8", "55-57", 18);
addNormEntry("wisc", "vc", "14-8", "58-68", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "15-0", "0-13", 1);
addNormEntry("wisc", "vc", "15-0", "14-16", 2);
addNormEntry("wisc", "vc", "15-0", "17-19", 3);
addNormEntry("wisc", "vc", "15-0", "20-21", 4);
addNormEntry("wisc", "vc", "15-0", "22-24", 5);
addNormEntry("wisc", "vc", "15-0", "25-27", 6);
addNormEntry("wisc", "vc", "15-0", "28-29", 7);
addNormEntry("wisc", "vc", "15-0", "30-32", 8);
addNormEntry("wisc", "vc", "15-0", "33-35", 9);
addNormEntry("wisc", "vc", "15-0", "36-37", 10);
addNormEntry("wisc", "vc", "15-0", "38-40", 11);
addNormEntry("wisc", "vc", "15-0", "41-42", 12);
addNormEntry("wisc", "vc", "15-0", "43-45", 13);
addNormEntry("wisc", "vc", "15-0", "46-47", 14);
addNormEntry("wisc", "vc", "15-0", "48-50", 15);
addNormEntry("wisc", "vc", "15-0", "51-52", 16);
addNormEntry("wisc", "vc", "15-0", "53-55", 17);
addNormEntry("wisc", "vc", "15-0", "56-57", 18);
addNormEntry("wisc", "vc", "15-0", "58-68", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "15-4", "0-14", 1);
addNormEntry("wisc", "vc", "15-4", "15-16", 2);
addNormEntry("wisc", "vc", "15-4", "17-19", 3);
addNormEntry("wisc", "vc", "15-4", "20-22", 4);
addNormEntry("wisc", "vc", "15-4", "23-24", 5);
addNormEntry("wisc", "vc", "15-4", "25-27", 6);
addNormEntry("wisc", "vc", "15-4", "28-30", 7);
addNormEntry("wisc", "vc", "15-4", "31-32", 8);
addNormEntry("wisc", "vc", "15-4", "33-35", 9);
addNormEntry("wisc", "vc", "15-4", "36-38", 10);
addNormEntry("wisc", "vc", "15-4", "39-40", 11);
addNormEntry("wisc", "vc", "15-4", "41-43", 12);
addNormEntry("wisc", "vc", "15-4", "44-45", 13);
addNormEntry("wisc", "vc", "15-4", "46-48", 14);
addNormEntry("wisc", "vc", "15-4", "49-50", 15);
addNormEntry("wisc", "vc", "15-4", "51-53", 16);
addNormEntry("wisc", "vc", "15-4", "54-55", 17);
addNormEntry("wisc", "vc", "15-4", "56-58", 18);
addNormEntry("wisc", "vc", "15-4", "59-68", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "15-8", "0-14", 1);
addNormEntry("wisc", "vc", "15-8", "15-16", 2);
addNormEntry("wisc", "vc", "15-8", "17-19", 3);
addNormEntry("wisc", "vc", "15-8", "20-22", 4);
addNormEntry("wisc", "vc", "15-8", "23-25", 5);
addNormEntry("wisc", "vc", "15-8", "26-27", 6);
addNormEntry("wisc", "vc", "15-8", "28-30", 7);
addNormEntry("wisc", "vc", "15-8", "31-33", 8);
addNormEntry("wisc", "vc", "15-8", "34-35", 9);
addNormEntry("wisc", "vc", "15-8", "36-38", 10);
addNormEntry("wisc", "vc", "15-8", "39-41", 11);
addNormEntry("wisc", "vc", "15-8", "42-43", 12);
addNormEntry("wisc", "vc", "15-8", "44-46", 13);
addNormEntry("wisc", "vc", "15-8", "47-48", 14);
addNormEntry("wisc", "vc", "15-8", "49-51", 15);
addNormEntry("wisc", "vc", "15-8", "52-53", 16);
addNormEntry("wisc", "vc", "15-8", "54-56", 17);
addNormEntry("wisc", "vc", "15-8", "57-58", 18);
addNormEntry("wisc", "vc", "15-8", "59-68", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Vocabulário)
addNormEntry("wisc", "vc", "16-0", "0-14", 1);
addNormEntry("wisc", "vc", "16-0", "15-16", 2);
addNormEntry("wisc", "vc", "16-0", "17-19", 3);
addNormEntry("wisc", "vc", "16-0", "20-22", 4);
addNormEntry("wisc", "vc", "16-0", "23-25", 5);
addNormEntry("wisc", "vc", "16-0", "26-28", 6);
addNormEntry("wisc", "vc", "16-0", "29-31", 7);
addNormEntry("wisc", "vc", "16-0", "32-33", 8);
addNormEntry("wisc", "vc", "16-0", "34-36", 9);
addNormEntry("wisc", "vc", "16-0", "37-39", 10);
addNormEntry("wisc", "vc", "16-0", "40-41", 11);
addNormEntry("wisc", "vc", "16-0", "42-44", 12);
addNormEntry("wisc", "vc", "16-0", "45-47", 13);
addNormEntry("wisc", "vc", "16-0", "48-49", 14);
addNormEntry("wisc", "vc", "16-0", "50-52", 15);
addNormEntry("wisc", "vc", "16-0", "53-54", 16);
addNormEntry("wisc", "vc", "16-0", "55-57", 17);
addNormEntry("wisc", "vc", "16-0", "58-59", 18);
addNormEntry("wisc", "vc", "16-0", "60-68", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Vocabulário)
addNormEntry("wisc", "vc", "16-4", "0-14", 1);
addNormEntry("wisc", "vc", "16-4", "15-16", 2);
addNormEntry("wisc", "vc", "16-4", "17-19", 3);
addNormEntry("wisc", "vc", "16-4", "20-22", 4);
addNormEntry("wisc", "vc", "16-4", "23-25", 5);
addNormEntry("wisc", "vc", "16-4", "26-28", 6);
addNormEntry("wisc", "vc", "16-4", "29-30", 7);
addNormEntry("wisc", "vc", "16-4", "31-33", 8);
addNormEntry("wisc", "vc", "16-4", "34-36", 9);
addNormEntry("wisc", "vc", "16-4", "37-39", 10);
addNormEntry("wisc", "vc", "16-4", "40-41", 11);
addNormEntry("wisc", "vc", "16-4", "42-44", 12);
addNormEntry("wisc", "vc", "16-4", "45-46", 13);
addNormEntry("wisc", "vc", "16-4", "47-49", 14);
addNormEntry("wisc", "vc", "16-4", "50-51", 15);
addNormEntry("wisc", "vc", "16-4", "52-54", 16);
addNormEntry("wisc", "vc", "16-4", "55-56", 17);
addNormEntry("wisc", "vc", "16-4", "57-59", 18);
addNormEntry("wisc", "vc", "16-4", "60-68", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Vocabulário)
addNormEntry("wisc", "vc", "16-8", "0-14", 1);
addNormEntry("wisc", "vc", "16-8", "15-16", 2);
addNormEntry("wisc", "vc", "16-8", "17-19", 3);
addNormEntry("wisc", "vc", "16-8", "20-22", 4);
addNormEntry("wisc", "vc", "16-8", "23-25", 5);
addNormEntry("wisc", "vc", "16-8", "26-28", 6);
addNormEntry("wisc", "vc", "16-8", "29-31", 7);
addNormEntry("wisc", "vc", "16-8", "32-33", 8);
addNormEntry("wisc", "vc", "16-8", "34-36", 9);
addNormEntry("wisc", "vc", "16-8", "37-39", 10);
addNormEntry("wisc", "vc", "16-8", "40-41", 11);
addNormEntry("wisc", "vc", "16-8", "42-44", 12);
addNormEntry("wisc", "vc", "16-8", "45-47", 13);
addNormEntry("wisc", "vc", "16-8", "48-49", 14);
addNormEntry("wisc", "vc", "16-8", "50-52", 15);
addNormEntry("wisc", "vc", "16-8", "53-54", 16);
addNormEntry("wisc", "vc", "16-8", "55-57", 17);
addNormEntry("wisc", "vc", "16-8", "58-59", 18);
addNormEntry("wisc", "vc", "16-8", "60-68", 19);

// --- Normas do Subteste Sequência de Números e Letras (SNL) ---

// FAIXA 6-0 — 6 anos (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "6-0", "-", 1);
addNormEntry("wisc", "snl", "6-0", "-", 2);
addNormEntry("wisc", "snl", "6-0", "-", 3);
addNormEntry("wisc", "snl", "6-0", "0", 4);
addNormEntry("wisc", "snl", "6-0", "-", 5);
addNormEntry("wisc", "snl", "6-0", "1", 6);
addNormEntry("wisc", "snl", "6-0", "2-3", 7);
addNormEntry("wisc", "snl", "6-0", "4", 8);
addNormEntry("wisc", "snl", "6-0", "5-6", 9);
addNormEntry("wisc", "snl", "6-0", "7", 10);
addNormEntry("wisc", "snl", "6-0", "8", 11);
addNormEntry("wisc", "snl", "6-0", "9-10", 12);
addNormEntry("wisc", "snl", "6-0", "11-12", 13);
addNormEntry("wisc", "snl", "6-0", "13-14", 14);
addNormEntry("wisc", "snl", "6-0", "15", 15);
addNormEntry("wisc", "snl", "6-0", "16", 16);
addNormEntry("wisc", "snl", "6-0", "17", 17);
addNormEntry("wisc", "snl", "6-0", "18", 18);
addNormEntry("wisc", "snl", "6-0", "19-30", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "6-4", "-", 1);
addNormEntry("wisc", "snl", "6-4", "-", 2);
addNormEntry("wisc", "snl", "6-4", "0", 3);
addNormEntry("wisc", "snl", "6-4", "-", 4);
addNormEntry("wisc", "snl", "6-4", "1", 5);
addNormEntry("wisc", "snl", "6-4", "2", 6);
addNormEntry("wisc", "snl", "6-4", "3-4", 7);
addNormEntry("wisc", "snl", "6-4", "5", 8);
addNormEntry("wisc", "snl", "6-4", "6-7", 9);
addNormEntry("wisc", "snl", "6-4", "8", 10);
addNormEntry("wisc", "snl", "6-4", "9-10", 11);
addNormEntry("wisc", "snl", "6-4", "11", 12);
addNormEntry("wisc", "snl", "6-4", "12", 13);
addNormEntry("wisc", "snl", "6-4", "13-14", 14);
addNormEntry("wisc", "snl", "6-4", "15", 15);
addNormEntry("wisc", "snl", "6-4", "16", 16);
addNormEntry("wisc", "snl", "6-4", "17-18", 17);
addNormEntry("wisc", "snl", "6-4", "19", 18);
addNormEntry("wisc", "snl", "6-4", "20-30", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "6-8", "-", 1);
addNormEntry("wisc", "snl", "6-8", "-", 2);
addNormEntry("wisc", "snl", "6-8", "0", 3);
addNormEntry("wisc", "snl", "6-8", "-", 4);
addNormEntry("wisc", "snl", "6-8", "1", 5);
addNormEntry("wisc", "snl", "6-8", "2-3", 6);
addNormEntry("wisc", "snl", "6-8", "4-5", 7);
addNormEntry("wisc", "snl", "6-8", "6-7", 8);
addNormEntry("wisc", "snl", "6-8", "8-9", 9);
addNormEntry("wisc", "snl", "6-8", "10", 10);
addNormEntry("wisc", "snl", "6-8", "-", 11);
addNormEntry("wisc", "snl", "6-8", "11", 12);
addNormEntry("wisc", "snl", "6-8", "12-13", 13);
addNormEntry("wisc", "snl", "6-8", "14", 14);
addNormEntry("wisc", "snl", "6-8", "15-16", 15);
addNormEntry("wisc", "snl", "6-8", "17", 16);
addNormEntry("wisc", "snl", "6-8", "18", 17);
addNormEntry("wisc", "snl", "6-8", "19-20", 18);
addNormEntry("wisc", "snl", "6-8", "21-30", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "7-0", "-", 1);
addNormEntry("wisc", "snl", "7-0", "0", 2);
addNormEntry("wisc", "snl", "7-0", "-", 3);
addNormEntry("wisc", "snl", "7-0", "1", 4);
addNormEntry("wisc", "snl", "7-0", "2-3", 5);
addNormEntry("wisc", "snl", "7-0", "4", 6);
addNormEntry("wisc", "snl", "7-0", "5-6", 7);
addNormEntry("wisc", "snl", "7-0", "7", 8);
addNormEntry("wisc", "snl", "7-0", "8-9", 9);
addNormEntry("wisc", "snl", "7-0", "10", 10);
addNormEntry("wisc", "snl", "7-0", "11", 11);
addNormEntry("wisc", "snl", "7-0", "12-13", 12);
addNormEntry("wisc", "snl", "7-0", "14", 13);
addNormEntry("wisc", "snl", "7-0", "15", 14);
addNormEntry("wisc", "snl", "7-0", "16-17", 15);
addNormEntry("wisc", "snl", "7-0", "18", 16);
addNormEntry("wisc", "snl", "7-0", "19", 17);
addNormEntry("wisc", "snl", "7-0", "20", 18);
addNormEntry("wisc", "snl", "7-0", "21-30", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "7-4", "0", 1);
addNormEntry("wisc", "snl", "7-4", "-", 2);
addNormEntry("wisc", "snl", "7-4", "1", 3);
addNormEntry("wisc", "snl", "7-4", "2", 4);
addNormEntry("wisc", "snl", "7-4", "3", 5);
addNormEntry("wisc", "snl", "7-4", "4-5", 6);
addNormEntry("wisc", "snl", "7-4", "6", 7);
addNormEntry("wisc", "snl", "7-4", "7-8", 8);
addNormEntry("wisc", "snl", "7-4", "9-10", 9);
addNormEntry("wisc", "snl", "7-4", "11", 10);
addNormEntry("wisc", "snl", "7-4", "12", 11);
addNormEntry("wisc", "snl", "7-4", "13-14", 12);
addNormEntry("wisc", "snl", "7-4", "15", 13);
addNormEntry("wisc", "snl", "7-4", "16", 14);
addNormEntry("wisc", "snl", "7-4", "17-18", 15);
addNormEntry("wisc", "snl", "7-4", "19", 16);
addNormEntry("wisc", "snl", "7-4", "20", 17);
addNormEntry("wisc", "snl", "7-4", "21", 18);
addNormEntry("wisc", "snl", "7-4", "22-30", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "7-8", "0", 1);
addNormEntry("wisc", "snl", "7-8", "-", 2);
addNormEntry("wisc", "snl", "7-8", "1", 3);
addNormEntry("wisc", "snl", "7-8", "2-3", 4);
addNormEntry("wisc", "snl", "7-8", "4", 5);
addNormEntry("wisc", "snl", "7-8", "5-6", 6);
addNormEntry("wisc", "snl", "7-8", "7", 7);
addNormEntry("wisc", "snl", "7-8", "8-9", 8);
addNormEntry("wisc", "snl", "7-8", "10", 9);
addNormEntry("wisc", "snl", "7-8", "11-12", 10);
addNormEntry("wisc", "snl", "7-8", "13", 11);
addNormEntry("wisc", "snl", "7-8", "14", 12);
addNormEntry("wisc", "snl", "7-8", "15-16", 13);
addNormEntry("wisc", "snl", "7-8", "17", 14);
addNormEntry("wisc", "snl", "7-8", "18", 15);
addNormEntry("wisc", "snl", "7-8", "19", 16);
addNormEntry("wisc", "snl", "7-8", "20", 17);
addNormEntry("wisc", "snl", "7-8", "21", 18);
addNormEntry("wisc", "snl", "7-8", "22-30", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "8-0", "0", 1);
addNormEntry("wisc", "snl", "8-0", "-", 2);
addNormEntry("wisc", "snl", "8-0", "1-2", 3);
addNormEntry("wisc", "snl", "8-0", "3-4", 4);
addNormEntry("wisc", "snl", "8-0", "5", 5);
addNormEntry("wisc", "snl", "8-0", "6-7", 6);
addNormEntry("wisc", "snl", "8-0", "8", 7);
addNormEntry("wisc", "snl", "8-0", "9-10", 8);
addNormEntry("wisc", "snl", "8-0", "11", 9);
addNormEntry("wisc", "snl", "8-0", "12", 10);
addNormEntry("wisc", "snl", "8-0", "13-14", 11);
addNormEntry("wisc", "snl", "8-0", "15", 12);
addNormEntry("wisc", "snl", "8-0", "16", 13);
addNormEntry("wisc", "snl", "8-0", "17-18", 14);
addNormEntry("wisc", "snl", "8-0", "19", 15);
addNormEntry("wisc", "snl", "8-0", "20", 16);
addNormEntry("wisc", "snl", "8-0", "21", 17);
addNormEntry("wisc", "snl", "8-0", "22", 18);
addNormEntry("wisc", "snl", "8-0", "23-30", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "8-4", "0", 1);
addNormEntry("wisc", "snl", "8-4", "1", 2);
addNormEntry("wisc", "snl", "8-4", "2", 3);
addNormEntry("wisc", "snl", "8-4", "3-4", 4);
addNormEntry("wisc", "snl", "8-4", "5-6", 5);
addNormEntry("wisc", "snl", "8-4", "7", 6);
addNormEntry("wisc", "snl", "8-4", "8-9", 7);
addNormEntry("wisc", "snl", "8-4", "10", 8);
addNormEntry("wisc", "snl", "8-4", "11-12", 9);
addNormEntry("wisc", "snl", "8-4", "13", 10);
addNormEntry("wisc", "snl", "8-4", "14", 11);
addNormEntry("wisc", "snl", "8-4", "15-16", 12);
addNormEntry("wisc", "snl", "8-4", "17", 13);
addNormEntry("wisc", "snl", "8-4", "18", 14);
addNormEntry("wisc", "snl", "8-4", "19", 15);
addNormEntry("wisc", "snl", "8-4", "20", 16);
addNormEntry("wisc", "snl", "8-4", "21", 17);
addNormEntry("wisc", "snl", "8-4", "22", 18);
addNormEntry("wisc", "snl", "8-4", "23-30", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "8-8", "0", 1);
addNormEntry("wisc", "snl", "8-8", "1", 2);
addNormEntry("wisc", "snl", "8-8", "2-3", 3);
addNormEntry("wisc", "snl", "8-8", "4-5", 4);
addNormEntry("wisc", "snl", "8-8", "6", 5);
addNormEntry("wisc", "snl", "8-8", "7-8", 6);
addNormEntry("wisc", "snl", "8-8", "9", 7);
addNormEntry("wisc", "snl", "8-8", "10-11", 8);
addNormEntry("wisc", "snl", "8-8", "12", 9);
addNormEntry("wisc", "snl", "8-8", "13-14", 10);
addNormEntry("wisc", "snl", "8-8", "15", 11);
addNormEntry("wisc", "snl", "8-8", "16", 12);
addNormEntry("wisc", "snl", "8-8", "17-18", 13);
addNormEntry("wisc", "snl", "8-8", "19", 14);
addNormEntry("wisc", "snl", "8-8", "20", 15);
addNormEntry("wisc", "snl", "8-8", "21", 16);
addNormEntry("wisc", "snl", "8-8", "22", 17);
addNormEntry("wisc", "snl", "8-8", "23", 18);
addNormEntry("wisc", "snl", "8-8", "24-30", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "9-0", "0", 1);
addNormEntry("wisc", "snl", "9-0", "1", 2);
addNormEntry("wisc", "snl", "9-0", "2-3", 3);
addNormEntry("wisc", "snl", "9-0", "4-5", 4);
addNormEntry("wisc", "snl", "9-0", "6-7", 5);
addNormEntry("wisc", "snl", "9-0", "8", 6);
addNormEntry("wisc", "snl", "9-0", "9-10", 7);
addNormEntry("wisc", "snl", "9-0", "11", 8);
addNormEntry("wisc", "snl", "9-0", "12-13", 9);
addNormEntry("wisc", "snl", "9-0", "14", 10);
addNormEntry("wisc", "snl", "9-0", "15-16", 11);
addNormEntry("wisc", "snl", "9-0", "17", 12);
addNormEntry("wisc", "snl", "9-0", "18", 13);
addNormEntry("wisc", "snl", "9-0", "19", 14);
addNormEntry("wisc", "snl", "9-0", "20", 15);
addNormEntry("wisc", "snl", "9-0", "21", 16);
addNormEntry("wisc", "snl", "9-0", "22", 17);
addNormEntry("wisc", "snl", "9-0", "23", 18);
addNormEntry("wisc", "snl", "9-0", "24-30", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "9-4", "0", 1);
addNormEntry("wisc", "snl", "9-4", "1-2", 2);
addNormEntry("wisc", "snl", "9-4", "3-4", 3);
addNormEntry("wisc", "snl", "9-4", "5-6", 4);
addNormEntry("wisc", "snl", "9-4", "7", 5);
addNormEntry("wisc", "snl", "9-4", "8-9", 6);
addNormEntry("wisc", "snl", "9-4", "10", 7);
addNormEntry("wisc", "snl", "9-4", "11-12", 8);
addNormEntry("wisc", "snl", "9-4", "13", 9);
addNormEntry("wisc", "snl", "9-4", "14-15", 10);
addNormEntry("wisc", "snl", "9-4", "16", 11);
addNormEntry("wisc", "snl", "9-4", "17", 12);
addNormEntry("wisc", "snl", "9-4", "18-19", 13);
addNormEntry("wisc", "snl", "9-4", "20", 14);
addNormEntry("wisc", "snl", "9-4", "21", 15);
addNormEntry("wisc", "snl", "9-4", "22", 16);
addNormEntry("wisc", "snl", "9-4", "23", 17);
addNormEntry("wisc", "snl", "9-4", "-", 18);
addNormEntry("wisc", "snl", "9-4", "24-30", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "9-8", "0", 1);
addNormEntry("wisc", "snl", "9-8", "1-2", 2);
addNormEntry("wisc", "snl", "9-8", "3-4", 3);
addNormEntry("wisc", "snl", "9-8", "5-6", 4);
addNormEntry("wisc", "snl", "9-8", "7-8", 5);
addNormEntry("wisc", "snl", "9-8", "9", 6);
addNormEntry("wisc", "snl", "9-8", "10-11", 7);
addNormEntry("wisc", "snl", "9-8", "12", 8);
addNormEntry("wisc", "snl", "9-8", "13-14", 9);
addNormEntry("wisc", "snl", "9-8", "15", 10);
addNormEntry("wisc", "snl", "9-8", "16", 11);
addNormEntry("wisc", "snl", "9-8", "17-18", 12);
addNormEntry("wisc", "snl", "9-8", "19", 13);
addNormEntry("wisc", "snl", "9-8", "20", 14);
addNormEntry("wisc", "snl", "9-8", "21", 15);
addNormEntry("wisc", "snl", "9-8", "22", 16);
addNormEntry("wisc", "snl", "9-8", "23", 17);
addNormEntry("wisc", "snl", "9-8", "-", 18);
addNormEntry("wisc", "snl", "9-8", "24-30", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "10-0", "0-1", 1);
addNormEntry("wisc", "snl", "10-0", "2-3", 2);
addNormEntry("wisc", "snl", "10-0", "4-5", 3);
addNormEntry("wisc", "snl", "10-0", "6", 4);
addNormEntry("wisc", "snl", "10-0", "7-8", 5);
addNormEntry("wisc", "snl", "10-0", "9-10", 6);
addNormEntry("wisc", "snl", "10-0", "11", 7);
addNormEntry("wisc", "snl", "10-0", "12-13", 8);
addNormEntry("wisc", "snl", "10-0", "14", 9);
addNormEntry("wisc", "snl", "10-0", "15-16", 10);
addNormEntry("wisc", "snl", "10-0", "17", 11);
addNormEntry("wisc", "snl", "10-0", "18", 12);
addNormEntry("wisc", "snl", "10-0", "19", 13);
addNormEntry("wisc", "snl", "10-0", "20", 14);
addNormEntry("wisc", "snl", "10-0", "21", 15);
addNormEntry("wisc", "snl", "10-0", "22", 16);
addNormEntry("wisc", "snl", "10-0", "23", 17);
addNormEntry("wisc", "snl", "10-0", "24", 18);
addNormEntry("wisc", "snl", "10-0", "25-30", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "10-4", "0-1", 1);
addNormEntry("wisc", "snl", "10-4", "2-3", 2);
addNormEntry("wisc", "snl", "10-4", "4-5", 3);
addNormEntry("wisc", "snl", "10-4", "6-7", 4);
addNormEntry("wisc", "snl", "10-4", "8", 5);
addNormEntry("wisc", "snl", "10-4", "9-10", 6);
addNormEntry("wisc", "snl", "10-4", "11-12", 7);
addNormEntry("wisc", "snl", "10-4", "13", 8);
addNormEntry("wisc", "snl", "10-4", "14-15", 9);
addNormEntry("wisc", "snl", "10-4", "16", 10);
addNormEntry("wisc", "snl", "10-4", "17", 11);
addNormEntry("wisc", "snl", "10-4", "18-19", 12);
addNormEntry("wisc", "snl", "10-4", "20", 13);
addNormEntry("wisc", "snl", "10-4", "21", 14);
addNormEntry("wisc", "snl", "10-4", "22", 15);
addNormEntry("wisc", "snl", "10-4", "23", 16);
addNormEntry("wisc", "snl", "10-4", "-", 17);
addNormEntry("wisc", "snl", "10-4", "24", 18);
addNormEntry("wisc", "snl", "10-4", "25-30", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "10-8", "0-1", 1);
addNormEntry("wisc", "snl", "10-8", "2-3", 2);
addNormEntry("wisc", "snl", "10-8", "4-5", 3);
addNormEntry("wisc", "snl", "10-8", "6-7", 4);
addNormEntry("wisc", "snl", "10-8", "8-9", 5);
addNormEntry("wisc", "snl", "10-8", "10", 6);
addNormEntry("wisc", "snl", "10-8", "11-12", 7);
addNormEntry("wisc", "snl", "10-8", "13", 8);
addNormEntry("wisc", "snl", "10-8", "14-15", 9);
addNormEntry("wisc", "snl", "10-8", "16", 10);
addNormEntry("wisc", "snl", "10-8", "17-18", 11);
addNormEntry("wisc", "snl", "10-8", "19", 12);
addNormEntry("wisc", "snl", "10-8", "20", 13);
addNormEntry("wisc", "snl", "10-8", "21", 14);
addNormEntry("wisc", "snl", "10-8", "22", 15);
addNormEntry("wisc", "snl", "10-8", "23", 16);
addNormEntry("wisc", "snl", "10-8", "-", 17);
addNormEntry("wisc", "snl", "10-8", "24", 18);
addNormEntry("wisc", "snl", "10-8", "25-30", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "11-0", "0-2", 1);
addNormEntry("wisc", "snl", "11-0", "3-4", 2);
addNormEntry("wisc", "snl", "11-0", "5", 3);
addNormEntry("wisc", "snl", "11-0", "6-7", 4);
addNormEntry("wisc", "snl", "11-0", "8-9", 5);
addNormEntry("wisc", "snl", "11-0", "10-11", 6);
addNormEntry("wisc", "snl", "11-0", "12", 7);
addNormEntry("wisc", "snl", "11-0", "13-14", 8);
addNormEntry("wisc", "snl", "11-0", "15", 9);
addNormEntry("wisc", "snl", "11-0", "16-17", 10);
addNormEntry("wisc", "snl", "11-0", "18", 11);
addNormEntry("wisc", "snl", "11-0", "19", 12);
addNormEntry("wisc", "snl", "11-0", "20", 13);
addNormEntry("wisc", "snl", "11-0", "21", 14);
addNormEntry("wisc", "snl", "11-0", "22", 15);
addNormEntry("wisc", "snl", "11-0", "23", 16);
addNormEntry("wisc", "snl", "11-0", "-", 17);
addNormEntry("wisc", "snl", "11-0", "24", 18);
addNormEntry("wisc", "snl", "11-0", "25-30", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "11-4", "0-2", 1);
addNormEntry("wisc", "snl", "11-4", "3-4", 2);
addNormEntry("wisc", "snl", "11-4", "5-6", 3);
addNormEntry("wisc", "snl", "11-4", "7-8", 4);
addNormEntry("wisc", "snl", "11-4", "9", 5);
addNormEntry("wisc", "snl", "11-4", "10-11", 6);
addNormEntry("wisc", "snl", "11-4", "12-13", 7);
addNormEntry("wisc", "snl", "11-4", "14", 8);
addNormEntry("wisc", "snl", "11-4", "15-16", 9);
addNormEntry("wisc", "snl", "11-4", "17", 10);
addNormEntry("wisc", "snl", "11-4", "18", 11);
addNormEntry("wisc", "snl", "11-4", "19", 12);
addNormEntry("wisc", "snl", "11-4", "20", 13);
addNormEntry("wisc", "snl", "11-4", "21-22", 14);
addNormEntry("wisc", "snl", "11-4", "-", 15);
addNormEntry("wisc", "snl", "11-4", "23", 16);
addNormEntry("wisc", "snl", "11-4", "-", 17);
addNormEntry("wisc", "snl", "11-4", "24", 18);
addNormEntry("wisc", "snl", "11-4", "25-30", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "11-8", "0-2", 1);
addNormEntry("wisc", "snl", "11-8", "3-4", 2);
addNormEntry("wisc", "snl", "11-8", "5-6", 3);
addNormEntry("wisc", "snl", "11-8", "7-8", 4);
addNormEntry("wisc", "snl", "11-8", "9-10", 5);
addNormEntry("wisc", "snl", "11-8", "11", 6);
addNormEntry("wisc", "snl", "11-8", "12-13", 7);
addNormEntry("wisc", "snl", "11-8", "14", 8);
addNormEntry("wisc", "snl", "11-8", "15-16", 9);
addNormEntry("wisc", "snl", "11-8", "17", 10);
addNormEntry("wisc", "snl", "11-8", "18", 11);
addNormEntry("wisc", "snl", "11-8", "19-20", 12);
addNormEntry("wisc", "snl", "11-8", "21", 13);
addNormEntry("wisc", "snl", "11-8", "22", 14);
addNormEntry("wisc", "snl", "11-8", "-", 15);
addNormEntry("wisc", "snl", "11-8", "23", 16);
addNormEntry("wisc", "snl", "11-8", "24", 17);
addNormEntry("wisc", "snl", "11-8", "25", 18);
addNormEntry("wisc", "snl", "11-8", "26-30", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "12-0", "0-2", 1);
addNormEntry("wisc", "snl", "12-0", "3-4", 2);
addNormEntry("wisc", "snl", "12-0", "5-6", 3);
addNormEntry("wisc", "snl", "12-0", "7-8", 4);
addNormEntry("wisc", "snl", "12-0", "9-10", 5);
addNormEntry("wisc", "snl", "12-0", "11-12", 6);
addNormEntry("wisc", "snl", "12-0", "13", 7);
addNormEntry("wisc", "snl", "12-0", "14-15", 8);
addNormEntry("wisc", "snl", "12-0", "16", 9);
addNormEntry("wisc", "snl", "12-0", "17", 10);
addNormEntry("wisc", "snl", "12-0", "18-19", 11);
addNormEntry("wisc", "snl", "12-0", "20", 12);
addNormEntry("wisc", "snl", "12-0", "21", 13);
addNormEntry("wisc", "snl", "12-0", "22", 14);
addNormEntry("wisc", "snl", "12-0", "-", 15);
addNormEntry("wisc", "snl", "12-0", "23", 16);
addNormEntry("wisc", "snl", "12-0", "24", 17);
addNormEntry("wisc", "snl", "12-0", "25", 18);
addNormEntry("wisc", "snl", "12-0", "26-30", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "12-4", "0-3", 1);
addNormEntry("wisc", "snl", "12-4", "4-5", 2);
addNormEntry("wisc", "snl", "12-4", "6-7", 3);
addNormEntry("wisc", "snl", "12-4", "8-9", 4);
addNormEntry("wisc", "snl", "12-4", "10", 5);
addNormEntry("wisc", "snl", "12-4", "11-12", 6);
addNormEntry("wisc", "snl", "12-4", "13", 7);
addNormEntry("wisc", "snl", "12-4", "14-15", 8);
addNormEntry("wisc", "snl", "12-4", "16", 9);
addNormEntry("wisc", "snl", "12-4", "17-18", 10);
addNormEntry("wisc", "snl", "12-4", "19", 11);
addNormEntry("wisc", "snl", "12-4", "20", 12);
addNormEntry("wisc", "snl", "12-4", "21", 13);
addNormEntry("wisc", "snl", "12-4", "22", 14);
addNormEntry("wisc", "snl", "12-4", "-", 15);
addNormEntry("wisc", "snl", "12-4", "23", 16);
addNormEntry("wisc", "snl", "12-4", "24", 17);
addNormEntry("wisc", "snl", "12-4", "25", 18);
addNormEntry("wisc", "snl", "12-4", "26-30", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "12-8", "0-3", 1);
addNormEntry("wisc", "snl", "12-8", "4-5", 2);
addNormEntry("wisc", "snl", "12-8", "6-7", 3);
addNormEntry("wisc", "snl", "12-8", "8-9", 4);
addNormEntry("wisc", "snl", "12-8", "10-11", 5);
addNormEntry("wisc", "snl", "12-8", "12", 6);
addNormEntry("wisc", "snl", "12-8", "13-14", 7);
addNormEntry("wisc", "snl", "12-8", "15", 8);
addNormEntry("wisc", "snl", "12-8", "16-17", 9);
addNormEntry("wisc", "snl", "12-8", "18", 10);
addNormEntry("wisc", "snl", "12-8", "19", 11);
addNormEntry("wisc", "snl", "12-8", "20", 12);
addNormEntry("wisc", "snl", "12-8", "21", 13);
addNormEntry("wisc", "snl", "12-8", "22", 14);
addNormEntry("wisc", "snl", "12-8", "-", 15);
addNormEntry("wisc", "snl", "12-8", "23", 16);
addNormEntry("wisc", "snl", "12-8", "24", 17);
addNormEntry("wisc", "snl", "12-8", "25", 18);
addNormEntry("wisc", "snl", "12-8", "26-30", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "13-0", "0-3", 1);
addNormEntry("wisc", "snl", "13-0", "4-5", 2);
addNormEntry("wisc", "snl", "13-0", "6-7", 3);
addNormEntry("wisc", "snl", "13-0", "8-9", 4);
addNormEntry("wisc", "snl", "13-0", "10-11", 5);
addNormEntry("wisc", "snl", "13-0", "12", 6);
addNormEntry("wisc", "snl", "13-0", "13-14", 7);
addNormEntry("wisc", "snl", "13-0", "15", 8);
addNormEntry("wisc", "snl", "13-0", "16-17", 9);
addNormEntry("wisc", "snl", "13-0", "18", 10);
addNormEntry("wisc", "snl", "13-0", "19", 11);
addNormEntry("wisc", "snl", "13-0", "20", 12);
addNormEntry("wisc", "snl", "13-0", "21", 13);
addNormEntry("wisc", "snl", "13-0", "22", 14);
addNormEntry("wisc", "snl", "13-0", "-", 15);
addNormEntry("wisc", "snl", "13-0", "23", 16);
addNormEntry("wisc", "snl", "13-0", "24", 17);
addNormEntry("wisc", "snl", "13-0", "25", 18);
addNormEntry("wisc", "snl", "13-0", "26-30", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "13-4", "0-4", 1);
addNormEntry("wisc", "snl", "13-4", "5-6", 2);
addNormEntry("wisc", "snl", "13-4", "7-8", 3);
addNormEntry("wisc", "snl", "13-4", "9-10", 4);
addNormEntry("wisc", "snl", "13-4", "11", 5);
addNormEntry("wisc", "snl", "13-4", "12-13", 6);
addNormEntry("wisc", "snl", "13-4", "14", 7);
addNormEntry("wisc", "snl", "13-4", "15-16", 8);
addNormEntry("wisc", "snl", "13-4", "17", 9);
addNormEntry("wisc", "snl", "13-4", "18", 10);
addNormEntry("wisc", "snl", "13-4", "19-20", 11);
addNormEntry("wisc", "snl", "13-4", "-", 12);
addNormEntry("wisc", "snl", "13-4", "21", 13);
addNormEntry("wisc", "snl", "13-4", "22", 14);
addNormEntry("wisc", "snl", "13-4", "-", 15);
addNormEntry("wisc", "snl", "13-4", "23", 16);
addNormEntry("wisc", "snl", "13-4", "24", 17);
addNormEntry("wisc", "snl", "13-4", "25", 18);
addNormEntry("wisc", "snl", "13-4", "26-30", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "13-8", "0-4", 1);
addNormEntry("wisc", "snl", "13-8", "5-6", 2);
addNormEntry("wisc", "snl", "13-8", "7-8", 3);
addNormEntry("wisc", "snl", "13-8", "9-10", 4);
addNormEntry("wisc", "snl", "13-8", "11", 5);
addNormEntry("wisc", "snl", "13-8", "12-13", 6);
addNormEntry("wisc", "snl", "13-8", "14", 7);
addNormEntry("wisc", "snl", "13-8", "15-16", 8);
addNormEntry("wisc", "snl", "13-8", "17", 9);
addNormEntry("wisc", "snl", "13-8", "18-19", 10);
addNormEntry("wisc", "snl", "13-8", "20", 11);
addNormEntry("wisc", "snl", "13-8", "-", 12);
addNormEntry("wisc", "snl", "13-8", "21", 13);
addNormEntry("wisc", "snl", "13-8", "22", 14);
addNormEntry("wisc", "snl", "13-8", "-", 15);
addNormEntry("wisc", "snl", "13-8", "23", 16);
addNormEntry("wisc", "snl", "13-8", "24", 17);
addNormEntry("wisc", "snl", "13-8", "25", 18);
addNormEntry("wisc", "snl", "13-8", "26-30", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "14-0", "0-4", 1);
addNormEntry("wisc", "snl", "14-0", "5-6", 2);
addNormEntry("wisc", "snl", "14-0", "7-8", 3);
addNormEntry("wisc", "snl", "14-0", "9-10", 4);
addNormEntry("wisc", "snl", "14-0", "11-12", 5);
addNormEntry("wisc", "snl", "14-0", "13", 6);
addNormEntry("wisc", "snl", "14-0", "14-15", 7);
addNormEntry("wisc", "snl", "14-0", "16", 8);
addNormEntry("wisc", "snl", "14-0", "17-18", 9);
addNormEntry("wisc", "snl", "14-0", "19", 10);
addNormEntry("wisc", "snl", "14-0", "20", 11);
addNormEntry("wisc", "snl", "14-0", "21", 12);
addNormEntry("wisc", "snl", "14-0", "-", 13);
addNormEntry("wisc", "snl", "14-0", "22", 14);
addNormEntry("wisc", "snl", "14-0", "-", 15);
addNormEntry("wisc", "snl", "14-0", "23", 16);
addNormEntry("wisc", "snl", "14-0", "24", 17);
addNormEntry("wisc", "snl", "14-0", "25", 18);
addNormEntry("wisc", "snl", "14-0", "26-30", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "14-4", "0-5", 1);
addNormEntry("wisc", "snl", "14-4", "6-7", 2);
addNormEntry("wisc", "snl", "14-4", "8-9", 3);
addNormEntry("wisc", "snl", "14-4", "10-11", 4);
addNormEntry("wisc", "snl", "14-4", "12", 5);
addNormEntry("wisc", "snl", "14-4", "13", 6);
addNormEntry("wisc", "snl", "14-4", "14-15", 7);
addNormEntry("wisc", "snl", "14-4", "16", 8);
addNormEntry("wisc", "snl", "14-4", "17-18", 9);
addNormEntry("wisc", "snl", "14-4", "19", 10);
addNormEntry("wisc", "snl", "14-4", "20", 11);
addNormEntry("wisc", "snl", "14-4", "21", 12);
addNormEntry("wisc", "snl", "14-4", "-", 13);
addNormEntry("wisc", "snl", "14-4", "22", 14);
addNormEntry("wisc", "snl", "14-4", "-", 15);
addNormEntry("wisc", "snl", "14-4", "23", 16);
addNormEntry("wisc", "snl", "14-4", "24", 17);
addNormEntry("wisc", "snl", "14-4", "25", 18);
addNormEntry("wisc", "snl", "14-4", "26-30", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "14-8", "0-5", 1);
addNormEntry("wisc", "snl", "14-8", "6-7", 2);
addNormEntry("wisc", "snl", "14-8", "8-9", 3);
addNormEntry("wisc", "snl", "14-8", "10-11", 4);
addNormEntry("wisc", "snl", "14-8", "12", 5);
addNormEntry("wisc", "snl", "14-8", "13-14", 6);
addNormEntry("wisc", "snl", "14-8", "15", 7);
addNormEntry("wisc", "snl", "14-8", "16", 8);
addNormEntry("wisc", "snl", "14-8", "17-18", 9);
addNormEntry("wisc", "snl", "14-8", "19", 10);
addNormEntry("wisc", "snl", "14-8", "20", 11);
addNormEntry("wisc", "snl", "14-8", "21", 12);
addNormEntry("wisc", "snl", "14-8", "22", 13);
addNormEntry("wisc", "snl", "14-8", "-", 14);
addNormEntry("wisc", "snl", "14-8", "23", 15);
addNormEntry("wisc", "snl", "14-8", "24", 16);
addNormEntry("wisc", "snl", "14-8", "25", 17);
addNormEntry("wisc", "snl", "14-8", "26", 18);
addNormEntry("wisc", "snl", "14-8", "27-30", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "15-0", "0-5", 1);
addNormEntry("wisc", "snl", "15-0", "6-7", 2);
addNormEntry("wisc", "snl", "15-0", "8-9", 3);
addNormEntry("wisc", "snl", "15-0", "10-11", 4);
addNormEntry("wisc", "snl", "15-0", "12-13", 5);
addNormEntry("wisc", "snl", "15-0", "14", 6);
addNormEntry("wisc", "snl", "15-0", "15", 7);
addNormEntry("wisc", "snl", "15-0", "16-17", 8);
addNormEntry("wisc", "snl", "15-0", "18", 9);
addNormEntry("wisc", "snl", "15-0", "19", 10);
addNormEntry("wisc", "snl", "15-0", "20", 11);
addNormEntry("wisc", "snl", "15-0", "21", 12);
addNormEntry("wisc", "snl", "15-0", "22", 13);
addNormEntry("wisc", "snl", "15-0", "-", 14);
addNormEntry("wisc", "snl", "15-0", "23", 15);
addNormEntry("wisc", "snl", "15-0", "24", 16);
addNormEntry("wisc", "snl", "15-0", "25", 17);
addNormEntry("wisc", "snl", "15-0", "26", 18);
addNormEntry("wisc", "snl", "15-0", "27-30", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "15-4", "0-6", 1);
addNormEntry("wisc", "snl", "15-4", "7-8", 2);
addNormEntry("wisc", "snl", "15-4", "9-10", 3);
addNormEntry("wisc", "snl", "15-4", "11-12", 4);
addNormEntry("wisc", "snl", "15-4", "13", 5);
addNormEntry("wisc", "snl", "15-4", "14", 6);
addNormEntry("wisc", "snl", "15-4", "15", 7);
addNormEntry("wisc", "snl", "15-4", "16-17", 8);
addNormEntry("wisc", "snl", "15-4", "18", 9);
addNormEntry("wisc", "snl", "15-4", "19-20", 10);
addNormEntry("wisc", "snl", "15-4", "-", 11);
addNormEntry("wisc", "snl", "15-4", "21", 12);
addNormEntry("wisc", "snl", "15-4", "22", 13);
addNormEntry("wisc", "snl", "15-4", "-", 14);
addNormEntry("wisc", "snl", "15-4", "23", 15);
addNormEntry("wisc", "snl", "15-4", "24", 16);
addNormEntry("wisc", "snl", "15-4", "25", 17);
addNormEntry("wisc", "snl", "15-4", "26", 18);
addNormEntry("wisc", "snl", "15-4", "27-30", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "15-8", "0-6", 1);
addNormEntry("wisc", "snl", "15-8", "7-8", 2);
addNormEntry("wisc", "snl", "15-8", "9-10", 3);
addNormEntry("wisc", "snl", "15-8", "11-12", 4);
addNormEntry("wisc", "snl", "15-8", "13", 5);
addNormEntry("wisc", "snl", "15-8", "14", 6);
addNormEntry("wisc", "snl", "15-8", "15-16", 7);
addNormEntry("wisc", "snl", "15-8", "17", 8);
addNormEntry("wisc", "snl", "15-8", "18-19", 9);
addNormEntry("wisc", "snl", "15-8", "20", 10);
addNormEntry("wisc", "snl", "15-8", "21", 11);
addNormEntry("wisc", "snl", "15-8", "-", 12);
addNormEntry("wisc", "snl", "15-8", "22", 13);
addNormEntry("wisc", "snl", "15-8", "-", 14);
addNormEntry("wisc", "snl", "15-8", "23", 15);
addNormEntry("wisc", "snl", "15-8", "24", 16);
addNormEntry("wisc", "snl", "15-8", "25", 17);
addNormEntry("wisc", "snl", "15-8", "26", 18);
addNormEntry("wisc", "snl", "15-8", "27-30", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "16-0", "0-6", 1);
addNormEntry("wisc", "snl", "16-0", "7-8", 2);
addNormEntry("wisc", "snl", "16-0", "9-10", 3);
addNormEntry("wisc", "snl", "16-0", "11-12", 4);
addNormEntry("wisc", "snl", "16-0", "13", 5);
addNormEntry("wisc", "snl", "16-0", "14", 6);
addNormEntry("wisc", "snl", "16-0", "15-16", 7);
addNormEntry("wisc", "snl", "16-0", "17", 8);
addNormEntry("wisc", "snl", "16-0", "18-19", 9);
addNormEntry("wisc", "snl", "16-0", "20", 10);
addNormEntry("wisc", "snl", "16-0", "21", 11);
addNormEntry("wisc", "snl", "16-0", "-", 12);
addNormEntry("wisc", "snl", "16-0", "22", 13);
addNormEntry("wisc", "snl", "16-0", "-", 14);
addNormEntry("wisc", "snl", "16-0", "23", 15);
addNormEntry("wisc", "snl", "16-0", "24", 16);
addNormEntry("wisc", "snl", "16-0", "25", 17);
addNormEntry("wisc", "snl", "16-0", "26", 18);
addNormEntry("wisc", "snl", "16-0", "27-30", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "16-4", "0-7", 1);
addNormEntry("wisc", "snl", "16-4", "8-9", 2);
addNormEntry("wisc", "snl", "16-4", "10-11", 3);
addNormEntry("wisc", "snl", "16-4", "12-13", 4);
addNormEntry("wisc", "snl", "16-4", "14", 5);
addNormEntry("wisc", "snl", "16-4", "15", 6);
addNormEntry("wisc", "snl", "16-4", "16", 7);
addNormEntry("wisc", "snl", "16-4", "17-18", 8);
addNormEntry("wisc", "snl", "16-4", "19", 9);
addNormEntry("wisc", "snl", "16-4", "20", 10);
addNormEntry("wisc", "snl", "16-4", "21", 11);
addNormEntry("wisc", "snl", "16-4", "22", 12);
addNormEntry("wisc", "snl", "16-4", "-", 13);
addNormEntry("wisc", "snl", "16-4", "-", 14);
addNormEntry("wisc", "snl", "16-4", "23", 15);
addNormEntry("wisc", "snl", "16-4", "24", 16);
addNormEntry("wisc", "snl", "16-4", "25", 17);
addNormEntry("wisc", "snl", "16-4", "26", 18);
addNormEntry("wisc", "snl", "16-4", "27-30", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Sequência de Números e Letras)
addNormEntry("wisc", "snl", "16-8", "0-7", 1);
addNormEntry("wisc", "snl", "16-8", "8-9", 2);
addNormEntry("wisc", "snl", "16-8", "10-11", 3);
addNormEntry("wisc", "snl", "16-8", "12-13", 4);
addNormEntry("wisc", "snl", "16-8", "14", 5);
addNormEntry("wisc", "snl", "16-8", "15-16", 6);
addNormEntry("wisc", "snl", "16-8", "17", 7);
addNormEntry("wisc", "snl", "16-8", "18", 8);
addNormEntry("wisc", "snl", "16-8", "19", 9);
addNormEntry("wisc", "snl", "16-8", "20", 10);
addNormEntry("wisc", "snl", "16-8", "21", 11);
addNormEntry("wisc", "snl", "16-8", "22", 12);
addNormEntry("wisc", "snl", "16-8", "-", 13);
addNormEntry("wisc", "snl", "16-8", "-", 14);
addNormEntry("wisc", "snl", "16-8", "23", 15);
addNormEntry("wisc", "snl", "16-8", "24", 16);
addNormEntry("wisc", "snl", "16-8", "25", 17);
addNormEntry("wisc", "snl", "16-8", "26", 18);
addNormEntry("wisc", "snl", "16-8", "27-30", 19);

// --- Normas do Subteste Raciocínio Matricial (RM) ---

// FAIXA 6-0 — 6 anos (Raciocínio Matricial)
addNormEntry("wisc", "rm", "6-0", "0", 1);
addNormEntry("wisc", "rm", "6-0", "-", 2);
addNormEntry("wisc", "rm", "6-0", "1", 3);
addNormEntry("wisc", "rm", "6-0", "2", 4);
addNormEntry("wisc", "rm", "6-0", "3", 5);
addNormEntry("wisc", "rm", "6-0", "-", 6);
addNormEntry("wisc", "rm", "6-0", "4", 7);
addNormEntry("wisc", "rm", "6-0", "5", 8);
addNormEntry("wisc", "rm", "6-0", "6-7", 9);
addNormEntry("wisc", "rm", "6-0", "8", 10);
addNormEntry("wisc", "rm", "6-0", "9-10", 11);
addNormEntry("wisc", "rm", "6-0", "11-12", 12);
addNormEntry("wisc", "rm", "6-0", "13-14", 13);
addNormEntry("wisc", "rm", "6-0", "15-16", 14);
addNormEntry("wisc", "rm", "6-0", "17-18", 15);
addNormEntry("wisc", "rm", "6-0", "19-20", 16);
addNormEntry("wisc", "rm", "6-0", "21-23", 17);
addNormEntry("wisc", "rm", "6-0", "24-26", 18);
addNormEntry("wisc", "rm", "6-0", "27-35", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "6-4", "0", 1);
addNormEntry("wisc", "rm", "6-4", "1", 2);
addNormEntry("wisc", "rm", "6-4", "2", 3);
addNormEntry("wisc", "rm", "6-4", "3", 4);
addNormEntry("wisc", "rm", "6-4", "-", 5);
addNormEntry("wisc", "rm", "6-4", "4", 6);
addNormEntry("wisc", "rm", "6-4", "5", 7);
addNormEntry("wisc", "rm", "6-4", "6", 8);
addNormEntry("wisc", "rm", "6-4", "7-8", 9);
addNormEntry("wisc", "rm", "6-4", "9", 10);
addNormEntry("wisc", "rm", "6-4", "10-11", 11);
addNormEntry("wisc", "rm", "6-4", "12-13", 12);
addNormEntry("wisc", "rm", "6-4", "14-15", 13);
addNormEntry("wisc", "rm", "6-4", "16-17", 14);
addNormEntry("wisc", "rm", "6-4", "18-19", 15);
addNormEntry("wisc", "rm", "6-4", "20-21", 16);
addNormEntry("wisc", "rm", "6-4", "22-24", 17);
addNormEntry("wisc", "rm", "6-4", "25-26", 18);
addNormEntry("wisc", "rm", "6-4", "27-35", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "6-8", "0", 1);
addNormEntry("wisc", "rm", "6-8", "1", 2);
addNormEntry("wisc", "rm", "6-8", "2", 3);
addNormEntry("wisc", "rm", "6-8", "3", 4);
addNormEntry("wisc", "rm", "6-8", "4", 5);
addNormEntry("wisc", "rm", "6-8", "5", 6);
addNormEntry("wisc", "rm", "6-8", "6", 7);
addNormEntry("wisc", "rm", "6-8", "7", 8);
addNormEntry("wisc", "rm", "6-8", "8", 9);
addNormEntry("wisc", "rm", "6-8", "9-10", 10);
addNormEntry("wisc", "rm", "6-8", "11-12", 11);
addNormEntry("wisc", "rm", "6-8", "13-14", 12);
addNormEntry("wisc", "rm", "6-8", "15-16", 13);
addNormEntry("wisc", "rm", "6-8", "17", 14);
addNormEntry("wisc", "rm", "6-8", "18-20", 15);
addNormEntry("wisc", "rm", "6-8", "21-22", 16);
addNormEntry("wisc", "rm", "6-8", "23-24", 17);
addNormEntry("wisc", "rm", "6-8", "25-27", 18);
addNormEntry("wisc", "rm", "6-8", "28-35", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "7-0", "0-1", 1);
addNormEntry("wisc", "rm", "7-0", "2", 2);
addNormEntry("wisc", "rm", "7-0", "3", 3);
addNormEntry("wisc", "rm", "7-0", "4", 4);
addNormEntry("wisc", "rm", "7-0", "5", 5);
addNormEntry("wisc", "rm", "7-0", "6", 6);
addNormEntry("wisc", "rm", "7-0", "7", 7);
addNormEntry("wisc", "rm", "7-0", "8", 8);
addNormEntry("wisc", "rm", "7-0", "9", 9);
addNormEntry("wisc", "rm", "7-0", "10-11", 10);
addNormEntry("wisc", "rm", "7-0", "12-13", 11);
addNormEntry("wisc", "rm", "7-0", "14-15", 12);
addNormEntry("wisc", "rm", "7-0", "16-17", 13);
addNormEntry("wisc", "rm", "7-0", "18", 14);
addNormEntry("wisc", "rm", "7-0", "19-20", 15);
addNormEntry("wisc", "rm", "7-0", "21-22", 16);
addNormEntry("wisc", "rm", "7-0", "23-25", 17);
addNormEntry("wisc", "rm", "7-0", "26-27", 18);
addNormEntry("wisc", "rm", "7-0", "28-35", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "7-4", "0-1", 1);
addNormEntry("wisc", "rm", "7-4", "2", 2);
addNormEntry("wisc", "rm", "7-4", "3", 3);
addNormEntry("wisc", "rm", "7-4", "4", 4);
addNormEntry("wisc", "rm", "7-4", "5", 5);
addNormEntry("wisc", "rm", "7-4", "6", 6);
addNormEntry("wisc", "rm", "7-4", "7", 7);
addNormEntry("wisc", "rm", "7-4", "8-9", 8);
addNormEntry("wisc", "rm", "7-4", "10", 9);
addNormEntry("wisc", "rm", "7-4", "11-12", 10);
addNormEntry("wisc", "rm", "7-4", "13-14", 11);
addNormEntry("wisc", "rm", "7-4", "15", 12);
addNormEntry("wisc", "rm", "7-4", "16-17", 13);
addNormEntry("wisc", "rm", "7-4", "18-19", 14);
addNormEntry("wisc", "rm", "7-4", "20-21", 15);
addNormEntry("wisc", "rm", "7-4", "22-23", 16);
addNormEntry("wisc", "rm", "7-4", "24-25", 17);
addNormEntry("wisc", "rm", "7-4", "26-28", 18);
addNormEntry("wisc", "rm", "7-4", "29-35", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "7-8", "0-2", 1);
addNormEntry("wisc", "rm", "7-8", "3", 2);
addNormEntry("wisc", "rm", "7-8", "4", 3);
addNormEntry("wisc", "rm", "7-8", "5", 4);
addNormEntry("wisc", "rm", "7-8", "6", 5);
addNormEntry("wisc", "rm", "7-8", "7", 6);
addNormEntry("wisc", "rm", "7-8", "8", 7);
addNormEntry("wisc", "rm", "7-8", "9-10", 8);
addNormEntry("wisc", "rm", "7-8", "11", 9);
addNormEntry("wisc", "rm", "7-8", "12-13", 10);
addNormEntry("wisc", "rm", "7-8", "14", 11);
addNormEntry("wisc", "rm", "7-8", "15-16", 12);
addNormEntry("wisc", "rm", "7-8", "17-18", 13);
addNormEntry("wisc", "rm", "7-8", "19-20", 14);
addNormEntry("wisc", "rm", "7-8", "21-22", 15);
addNormEntry("wisc", "rm", "7-8", "23-24", 16);
addNormEntry("wisc", "rm", "7-8", "25-26", 17);
addNormEntry("wisc", "rm", "7-8", "27-28", 18);
addNormEntry("wisc", "rm", "7-8", "29-35", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "8-0", "0-2", 1);
addNormEntry("wisc", "rm", "8-0", "3", 2);
addNormEntry("wisc", "rm", "8-0", "4", 3);
addNormEntry("wisc", "rm", "8-0", "5", 4);
addNormEntry("wisc", "rm", "8-0", "6", 5);
addNormEntry("wisc", "rm", "8-0", "7", 6);
addNormEntry("wisc", "rm", "8-0", "8-9", 7);
addNormEntry("wisc", "rm", "8-0", "10", 8);
addNormEntry("wisc", "rm", "8-0", "11-12", 9);
addNormEntry("wisc", "rm", "8-0", "13", 10);
addNormEntry("wisc", "rm", "8-0", "14-15", 11);
addNormEntry("wisc", "rm", "8-0", "16-17", 12);
addNormEntry("wisc", "rm", "8-0", "18-19", 13);
addNormEntry("wisc", "rm", "8-0", "20-21", 14);
addNormEntry("wisc", "rm", "8-0", "22", 15);
addNormEntry("wisc", "rm", "8-0", "23-24", 16);
addNormEntry("wisc", "rm", "8-0", "25-26", 17);
addNormEntry("wisc", "rm", "8-0", "27-29", 18);
addNormEntry("wisc", "rm", "8-0", "30-35", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "8-4", "0-2", 1);
addNormEntry("wisc", "rm", "8-4", "3", 2);
addNormEntry("wisc", "rm", "8-4", "4", 3);
addNormEntry("wisc", "rm", "8-4", "5-6", 4);
addNormEntry("wisc", "rm", "8-4", "7", 5);
addNormEntry("wisc", "rm", "8-4", "8", 6);
addNormEntry("wisc", "rm", "8-4", "9", 7);
addNormEntry("wisc", "rm", "8-4", "10-11", 8);
addNormEntry("wisc", "rm", "8-4", "12-13", 9);
addNormEntry("wisc", "rm", "8-4", "14", 10);
addNormEntry("wisc", "rm", "8-4", "15-16", 11);
addNormEntry("wisc", "rm", "8-4", "17-18", 12);
addNormEntry("wisc", "rm", "8-4", "19", 13);
addNormEntry("wisc", "rm", "8-4", "20-21", 14);
addNormEntry("wisc", "rm", "8-4", "22-23", 15);
addNormEntry("wisc", "rm", "8-4", "24-25", 16);
addNormEntry("wisc", "rm", "8-4", "26-27", 17);
addNormEntry("wisc", "rm", "8-4", "28-29", 18);
addNormEntry("wisc", "rm", "8-4", "30-35", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "8-8", "0-3", 1);
addNormEntry("wisc", "rm", "8-8", "4", 2);
addNormEntry("wisc", "rm", "8-8", "5", 3);
addNormEntry("wisc", "rm", "8-8", "6", 4);
addNormEntry("wisc", "rm", "8-8", "7", 5);
addNormEntry("wisc", "rm", "8-8", "8-9", 6);
addNormEntry("wisc", "rm", "8-8", "10", 7);
addNormEntry("wisc", "rm", "8-8", "11-12", 8);
addNormEntry("wisc", "rm", "8-8", "13", 9);
addNormEntry("wisc", "rm", "8-8", "14-15", 10);
addNormEntry("wisc", "rm", "8-8", "16-17", 11);
addNormEntry("wisc", "rm", "8-8", "18", 12);
addNormEntry("wisc", "rm", "8-8", "19-20", 13);
addNormEntry("wisc", "rm", "8-8", "21-22", 14);
addNormEntry("wisc", "rm", "8-8", "23-24", 15);
addNormEntry("wisc", "rm", "8-8", "25", 16);
addNormEntry("wisc", "rm", "8-8", "26-27", 17);
addNormEntry("wisc", "rm", "8-8", "28-29", 18);
addNormEntry("wisc", "rm", "8-8", "30-35", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "9-0", "0-3", 1);
addNormEntry("wisc", "rm", "9-0", "4", 2);
addNormEntry("wisc", "rm", "9-0", "5", 3);
addNormEntry("wisc", "rm", "9-0", "6", 4);
addNormEntry("wisc", "rm", "9-0", "7-8", 5);
addNormEntry("wisc", "rm", "9-0", "9", 6);
addNormEntry("wisc", "rm", "9-0", "10-11", 7);
addNormEntry("wisc", "rm", "9-0", "12", 8);
addNormEntry("wisc", "rm", "9-0", "13-14", 9);
addNormEntry("wisc", "rm", "9-0", "15-16", 10);
addNormEntry("wisc", "rm", "9-0", "17", 11);
addNormEntry("wisc", "rm", "9-0", "18-19", 12);
addNormEntry("wisc", "rm", "9-0", "20-21", 13);
addNormEntry("wisc", "rm", "9-0", "22", 14);
addNormEntry("wisc", "rm", "9-0", "23-24", 15);
addNormEntry("wisc", "rm", "9-0", "25-26", 16);
addNormEntry("wisc", "rm", "9-0", "27-28", 17);
addNormEntry("wisc", "rm", "9-0", "29-30", 18);
addNormEntry("wisc", "rm", "9-0", "31-35", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "9-4", "0-3", 1);
addNormEntry("wisc", "rm", "9-4", "4", 2);
addNormEntry("wisc", "rm", "9-4", "5", 3);
addNormEntry("wisc", "rm", "9-4", "6-7", 4);
addNormEntry("wisc", "rm", "9-4", "8", 5);
addNormEntry("wisc", "rm", "9-4", "9-10", 6);
addNormEntry("wisc", "rm", "9-4", "11", 7);
addNormEntry("wisc", "rm", "9-4", "12-13", 8);
addNormEntry("wisc", "rm", "9-4", "14-15", 9);
addNormEntry("wisc", "rm", "9-4", "16", 10);
addNormEntry("wisc", "rm", "9-4", "17-18", 11);
addNormEntry("wisc", "rm", "9-4", "19-20", 12);
addNormEntry("wisc", "rm", "9-4", "21", 13);
addNormEntry("wisc", "rm", "9-4", "22-23", 14);
addNormEntry("wisc", "rm", "9-4", "24-25", 15);
addNormEntry("wisc", "rm", "9-4", "26-27", 16);
addNormEntry("wisc", "rm", "9-4", "28", 17);
addNormEntry("wisc", "rm", "9-4", "29-30", 18);
addNormEntry("wisc", "rm", "9-4", "31-35", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "9-8", "0-3", 1);
addNormEntry("wisc", "rm", "9-8", "4", 2);
addNormEntry("wisc", "rm", "9-8", "5-6", 3);
addNormEntry("wisc", "rm", "9-8", "7", 4);
addNormEntry("wisc", "rm", "9-8", "8-9", 5);
addNormEntry("wisc", "rm", "9-8", "10", 6);
addNormEntry("wisc", "rm", "9-8", "11-12", 7);
addNormEntry("wisc", "rm", "9-8", "13-14", 8);
addNormEntry("wisc", "rm", "9-8", "15", 9);
addNormEntry("wisc", "rm", "9-8", "16-17", 10);
addNormEntry("wisc", "rm", "9-8", "18", 11);
addNormEntry("wisc", "rm", "9-8", "19-20", 12);
addNormEntry("wisc", "rm", "9-8", "21-22", 13);
addNormEntry("wisc", "rm", "9-8", "23-24", 14);
addNormEntry("wisc", "rm", "9-8", "25", 15);
addNormEntry("wisc", "rm", "9-8", "26-27", 16);
addNormEntry("wisc", "rm", "9-8", "28-29", 17);
addNormEntry("wisc", "rm", "9-8", "30-31", 18);
addNormEntry("wisc", "rm", "9-8", "32-35", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "10-0", "0-3", 1);
addNormEntry("wisc", "rm", "10-0", "4-5", 2);
addNormEntry("wisc", "rm", "10-0", "6", 3);
addNormEntry("wisc", "rm", "10-0", "7-8", 4);
addNormEntry("wisc", "rm", "10-0", "9", 5);
addNormEntry("wisc", "rm", "10-0", "10-11", 6);
addNormEntry("wisc", "rm", "10-0", "12-13", 7);
addNormEntry("wisc", "rm", "10-0", "14", 8);
addNormEntry("wisc", "rm", "10-0", "15-16", 9);
addNormEntry("wisc", "rm", "10-0", "17", 10);
addNormEntry("wisc", "rm", "10-0", "18-19", 11);
addNormEntry("wisc", "rm", "10-0", "20-21", 12);
addNormEntry("wisc", "rm", "10-0", "22", 13);
addNormEntry("wisc", "rm", "10-0", "23-24", 14);
addNormEntry("wisc", "rm", "10-0", "25-26", 15);
addNormEntry("wisc", "rm", "10-0", "27", 16);
addNormEntry("wisc", "rm", "10-0", "28-29", 17);
addNormEntry("wisc", "rm", "10-0", "30-31", 18);
addNormEntry("wisc", "rm", "10-0", "32-35", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "10-4", "0-3", 1);
addNormEntry("wisc", "rm", "10-4", "4-5", 2);
addNormEntry("wisc", "rm", "10-4", "6-7", 3);
addNormEntry("wisc", "rm", "10-4", "8", 4);
addNormEntry("wisc", "rm", "10-4", "9-10", 5);
addNormEntry("wisc", "rm", "10-4", "11", 6);
addNormEntry("wisc", "rm", "10-4", "12-13", 7);
addNormEntry("wisc", "rm", "10-4", "14-15", 8);
addNormEntry("wisc", "rm", "10-4", "16", 9);
addNormEntry("wisc", "rm", "10-4", "17-18", 10);
addNormEntry("wisc", "rm", "10-4", "19-20", 11);
addNormEntry("wisc", "rm", "10-4", "21", 12);
addNormEntry("wisc", "rm", "10-4", "22-23", 13);
addNormEntry("wisc", "rm", "10-4", "24-25", 14);
addNormEntry("wisc", "rm", "10-4", "26", 15);
addNormEntry("wisc", "rm", "10-4", "27-28", 16);
addNormEntry("wisc", "rm", "10-4", "29-30", 17);
addNormEntry("wisc", "rm", "10-4", "31", 18);
addNormEntry("wisc", "rm", "10-4", "32-35", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "10-8", "0-4", 1);
addNormEntry("wisc", "rm", "10-8", "5", 2);
addNormEntry("wisc", "rm", "10-8", "6-7", 3);
addNormEntry("wisc", "rm", "10-8", "8-9", 4);
addNormEntry("wisc", "rm", "10-8", "10", 5);
addNormEntry("wisc", "rm", "10-8", "11-12", 6);
addNormEntry("wisc", "rm", "10-8", "13-14", 7);
addNormEntry("wisc", "rm", "10-8", "15", 8);
addNormEntry("wisc", "rm", "10-8", "16-17", 9);
addNormEntry("wisc", "rm", "10-8", "18-19", 10);
addNormEntry("wisc", "rm", "10-8", "20", 11);
addNormEntry("wisc", "rm", "10-8", "21-22", 12);
addNormEntry("wisc", "rm", "10-8", "23-24", 13);
addNormEntry("wisc", "rm", "10-8", "25", 14);
addNormEntry("wisc", "rm", "10-8", "26-27", 15);
addNormEntry("wisc", "rm", "10-8", "28", 16);
addNormEntry("wisc", "rm", "10-8", "29-30", 17);
addNormEntry("wisc", "rm", "10-8", "31-32", 18);
addNormEntry("wisc", "rm", "10-8", "33-35", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "11-0", "0-4", 1);
addNormEntry("wisc", "rm", "11-0", "5-6", 2);
addNormEntry("wisc", "rm", "11-0", "7", 3);
addNormEntry("wisc", "rm", "11-0", "8-9", 4);
addNormEntry("wisc", "rm", "11-0", "10-11", 5);
addNormEntry("wisc", "rm", "11-0", "12", 6);
addNormEntry("wisc", "rm", "11-0", "13-14", 7);
addNormEntry("wisc", "rm", "11-0", "15-16", 8);
addNormEntry("wisc", "rm", "11-0", "17", 9);
addNormEntry("wisc", "rm", "11-0", "18-19", 10);
addNormEntry("wisc", "rm", "11-0", "20-21", 11);
addNormEntry("wisc", "rm", "11-0", "22", 12);
addNormEntry("wisc", "rm", "11-0", "23-24", 13);
addNormEntry("wisc", "rm", "11-0", "25-26", 14);
addNormEntry("wisc", "rm", "11-0", "27", 15);
addNormEntry("wisc", "rm", "11-0", "28-29", 16);
addNormEntry("wisc", "rm", "11-0", "30-31", 17);
addNormEntry("wisc", "rm", "11-0", "32", 18);
addNormEntry("wisc", "rm", "11-0", "33-35", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "11-4", "0-4", 1);
addNormEntry("wisc", "rm", "11-4", "5-6", 2);
addNormEntry("wisc", "rm", "11-4", "7-8", 3);
addNormEntry("wisc", "rm", "11-4", "9", 4);
addNormEntry("wisc", "rm", "11-4", "10-11", 5);
addNormEntry("wisc", "rm", "11-4", "12-13", 6);
addNormEntry("wisc", "rm", "11-4", "14-15", 7);
addNormEntry("wisc", "rm", "11-4", "16", 8);
addNormEntry("wisc", "rm", "11-4", "17-18", 9);
addNormEntry("wisc", "rm", "11-4", "19-20", 10);
addNormEntry("wisc", "rm", "11-4", "21", 11);
addNormEntry("wisc", "rm", "11-4", "22-23", 12);
addNormEntry("wisc", "rm", "11-4", "24-25", 13);
addNormEntry("wisc", "rm", "11-4", "26", 14);
addNormEntry("wisc", "rm", "11-4", "27-28", 15);
addNormEntry("wisc", "rm", "11-4", "29", 16);
addNormEntry("wisc", "rm", "11-4", "30-31", 17);
addNormEntry("wisc", "rm", "11-4", "32-33", 18);
addNormEntry("wisc", "rm", "11-4", "34-35", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "11-8", "0-4", 1);
addNormEntry("wisc", "rm", "11-8", "5-6", 2);
addNormEntry("wisc", "rm", "11-8", "7-8", 3);
addNormEntry("wisc", "rm", "11-8", "9-10", 4);
addNormEntry("wisc", "rm", "11-8", "11", 5);
addNormEntry("wisc", "rm", "11-8", "12-13", 6);
addNormEntry("wisc", "rm", "11-8", "14-15", 7);
addNormEntry("wisc", "rm", "11-8", "16-17", 8);
addNormEntry("wisc", "rm", "11-8", "18", 9);
addNormEntry("wisc", "rm", "11-8", "19-20", 10);
addNormEntry("wisc", "rm", "11-8", "21-22", 11);
addNormEntry("wisc", "rm", "11-8", "23", 12);
addNormEntry("wisc", "rm", "11-8", "24-25", 13);
addNormEntry("wisc", "rm", "11-8", "26-27", 14);
addNormEntry("wisc", "rm", "11-8", "28", 15);
addNormEntry("wisc", "rm", "11-8", "29-30", 16);
addNormEntry("wisc", "rm", "11-8", "31", 17);
addNormEntry("wisc", "rm", "11-8", "32-33", 18);
addNormEntry("wisc", "rm", "11-8", "34-35", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "12-0", "0-5", 1);
addNormEntry("wisc", "rm", "12-0", "6-7", 2);
addNormEntry("wisc", "rm", "12-0", "8", 3);
addNormEntry("wisc", "rm", "12-0", "9-10", 4);
addNormEntry("wisc", "rm", "12-0", "11-12", 5);
addNormEntry("wisc", "rm", "12-0", "13-14", 6);
addNormEntry("wisc", "rm", "12-0", "15", 7);
addNormEntry("wisc", "rm", "12-0", "16-17", 8);
addNormEntry("wisc", "rm", "12-0", "18-19", 9);
addNormEntry("wisc", "rm", "12-0", "20", 10);
addNormEntry("wisc", "rm", "12-0", "21-22", 11);
addNormEntry("wisc", "rm", "12-0", "23-24", 12);
addNormEntry("wisc", "rm", "12-0", "25", 13);
addNormEntry("wisc", "rm", "12-0", "26-27", 14);
addNormEntry("wisc", "rm", "12-0", "28-29", 15);
addNormEntry("wisc", "rm", "12-0", "30", 16);
addNormEntry("wisc", "rm", "12-0", "31-32", 17);
addNormEntry("wisc", "rm", "12-0", "33", 18);
addNormEntry("wisc", "rm", "12-0", "34-35", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "12-4", "0-5", 1);
addNormEntry("wisc", "rm", "12-4", "6-7", 2);
addNormEntry("wisc", "rm", "12-4", "8-9", 3);
addNormEntry("wisc", "rm", "12-4", "10", 4);
addNormEntry("wisc", "rm", "12-4", "11-12", 5);
addNormEntry("wisc", "rm", "12-4", "13-14", 6);
addNormEntry("wisc", "rm", "12-4", "15-16", 7);
addNormEntry("wisc", "rm", "12-4", "17", 8);
addNormEntry("wisc", "rm", "12-4", "18-19", 9);
addNormEntry("wisc", "rm", "12-4", "20-21", 10);
addNormEntry("wisc", "rm", "12-4", "22-23", 11);
addNormEntry("wisc", "rm", "12-4", "24", 12);
addNormEntry("wisc", "rm", "12-4", "25-26", 13);
addNormEntry("wisc", "rm", "12-4", "27", 14);
addNormEntry("wisc", "rm", "12-4", "28-29", 15);
addNormEntry("wisc", "rm", "12-4", "30-31", 16);
addNormEntry("wisc", "rm", "12-4", "32", 17);
addNormEntry("wisc", "rm", "12-4", "33-34", 18);
addNormEntry("wisc", "rm", "12-4", "35", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "12-8", "0-5", 1);
addNormEntry("wisc", "rm", "12-8", "6-7", 2);
addNormEntry("wisc", "rm", "12-8", "8-9", 3);
addNormEntry("wisc", "rm", "12-8", "10-11", 4);
addNormEntry("wisc", "rm", "12-8", "12-13", 5);
addNormEntry("wisc", "rm", "12-8", "14", 6);
addNormEntry("wisc", "rm", "12-8", "15-16", 7);
addNormEntry("wisc", "rm", "12-8", "17-18", 8);
addNormEntry("wisc", "rm", "12-8", "19-20", 9);
addNormEntry("wisc", "rm", "12-8", "21", 10);
addNormEntry("wisc", "rm", "12-8", "22-23", 11);
addNormEntry("wisc", "rm", "12-8", "24-25", 12);
addNormEntry("wisc", "rm", "12-8", "26", 13);
addNormEntry("wisc", "rm", "12-8", "27-28", 14);
addNormEntry("wisc", "rm", "12-8", "29-30", 15);
addNormEntry("wisc", "rm", "12-8", "31", 16);
addNormEntry("wisc", "rm", "12-8", "32-33", 17);
addNormEntry("wisc", "rm", "12-8", "34", 18);
addNormEntry("wisc", "rm", "12-8", "35", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "13-0", "0-6", 1);
addNormEntry("wisc", "rm", "13-0", "7", 2);
addNormEntry("wisc", "rm", "13-0", "8-9", 3);
addNormEntry("wisc", "rm", "13-0", "10-11", 4);
addNormEntry("wisc", "rm", "13-0", "12-13", 5);
addNormEntry("wisc", "rm", "13-0", "14-15", 6);
addNormEntry("wisc", "rm", "13-0", "16", 7);
addNormEntry("wisc", "rm", "13-0", "17-18", 8);
addNormEntry("wisc", "rm", "13-0", "19-20", 9);
addNormEntry("wisc", "rm", "13-0", "21-22", 10);
addNormEntry("wisc", "rm", "13-0", "23", 11);
addNormEntry("wisc", "rm", "13-0", "24-25", 12);
addNormEntry("wisc", "rm", "13-0", "26-27", 13);
addNormEntry("wisc", "rm", "13-0", "28", 14);
addNormEntry("wisc", "rm", "13-0", "29-30", 15);
addNormEntry("wisc", "rm", "13-0", "31-32", 16);
addNormEntry("wisc", "rm", "13-0", "33", 17);
addNormEntry("wisc", "rm", "13-0", "34", 18);
addNormEntry("wisc", "rm", "13-0", "35", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "13-4", "0-6", 1);
addNormEntry("wisc", "rm", "13-4", "7-8", 2);
addNormEntry("wisc", "rm", "13-4", "9-10", 3);
addNormEntry("wisc", "rm", "13-4", "11", 4);
addNormEntry("wisc", "rm", "13-4", "12-13", 5);
addNormEntry("wisc", "rm", "13-4", "14-15", 6);
addNormEntry("wisc", "rm", "13-4", "16-17", 7);
addNormEntry("wisc", "rm", "13-4", "18", 8);
addNormEntry("wisc", "rm", "13-4", "19-20", 9);
addNormEntry("wisc", "rm", "13-4", "21-22", 10);
addNormEntry("wisc", "rm", "13-4", "23-24", 11);
addNormEntry("wisc", "rm", "13-4", "25", 12);
addNormEntry("wisc", "rm", "13-4", "26-27", 13);
addNormEntry("wisc", "rm", "13-4", "28-29", 14);
addNormEntry("wisc", "rm", "13-4", "30", 15);
addNormEntry("wisc", "rm", "13-4", "31-32", 16);
addNormEntry("wisc", "rm", "13-4", "33", 17);
addNormEntry("wisc", "rm", "13-4", "34", 18);
addNormEntry("wisc", "rm", "13-4", "35", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "13-8", "0-6", 1);
addNormEntry("wisc", "rm", "13-8", "7-8", 2);
addNormEntry("wisc", "rm", "13-8", "9-10", 3);
addNormEntry("wisc", "rm", "13-8", "11-12", 4);
addNormEntry("wisc", "rm", "13-8", "13", 5);
addNormEntry("wisc", "rm", "13-8", "14-15", 6);
addNormEntry("wisc", "rm", "13-8", "16-17", 7);
addNormEntry("wisc", "rm", "13-8", "18-19", 8);
addNormEntry("wisc", "rm", "13-8", "20-21", 9);
addNormEntry("wisc", "rm", "13-8", "22", 10);
addNormEntry("wisc", "rm", "13-8", "23-24", 11);
addNormEntry("wisc", "rm", "13-8", "25-26", 12);
addNormEntry("wisc", "rm", "13-8", "27", 13);
addNormEntry("wisc", "rm", "13-8", "28-29", 14);
addNormEntry("wisc", "rm", "13-8", "30-31", 15);
addNormEntry("wisc", "rm", "13-8", "32", 16);
addNormEntry("wisc", "rm", "13-8", "33", 17);
addNormEntry("wisc", "rm", "13-8", "34", 18);
addNormEntry("wisc", "rm", "13-8", "35", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "14-0", "0-6", 1);
addNormEntry("wisc", "rm", "14-0", "7-8", 2);
addNormEntry("wisc", "rm", "14-0", "9-10", 3);
addNormEntry("wisc", "rm", "14-0", "11-12", 4);
addNormEntry("wisc", "rm", "14-0", "13-14", 5);
addNormEntry("wisc", "rm", "14-0", "15-16", 6);
addNormEntry("wisc", "rm", "14-0", "17", 7);
addNormEntry("wisc", "rm", "14-0", "18-19", 8);
addNormEntry("wisc", "rm", "14-0", "20-21", 9);
addNormEntry("wisc", "rm", "14-0", "22-23", 10);
addNormEntry("wisc", "rm", "14-0", "24", 11);
addNormEntry("wisc", "rm", "14-0", "25-26", 12);
addNormEntry("wisc", "rm", "14-0", "27-28", 13);
addNormEntry("wisc", "rm", "14-0", "29", 14);
addNormEntry("wisc", "rm", "14-0", "30-31", 15);
addNormEntry("wisc", "rm", "14-0", "32-33", 16);
addNormEntry("wisc", "rm", "14-0", "34", 17);
addNormEntry("wisc", "rm", "14-0", "-", 18);
addNormEntry("wisc", "rm", "14-0", "35", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "14-4", "0-6", 1);
addNormEntry("wisc", "rm", "14-4", "7-8", 2);
addNormEntry("wisc", "rm", "14-4", "9-10", 3);
addNormEntry("wisc", "rm", "14-4", "11-12", 4);
addNormEntry("wisc", "rm", "14-4", "13-14", 5);
addNormEntry("wisc", "rm", "14-4", "15-16", 6);
addNormEntry("wisc", "rm", "14-4", "17-18", 7);
addNormEntry("wisc", "rm", "14-4", "19", 8);
addNormEntry("wisc", "rm", "14-4", "20-21", 9);
addNormEntry("wisc", "rm", "14-4", "22-23", 10);
addNormEntry("wisc", "rm", "14-4", "24-25", 11);
addNormEntry("wisc", "rm", "14-4", "26", 12);
addNormEntry("wisc", "rm", "14-4", "27-28", 13);
addNormEntry("wisc", "rm", "14-4", "29-30", 14);
addNormEntry("wisc", "rm", "14-4", "31", 15);
addNormEntry("wisc", "rm", "14-4", "32-33", 16);
addNormEntry("wisc", "rm", "14-4", "34", 17);
addNormEntry("wisc", "rm", "14-4", "-", 18);
addNormEntry("wisc", "rm", "14-4", "35", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "14-8", "0-6", 1);
addNormEntry("wisc", "rm", "14-8", "7-8", 2);
addNormEntry("wisc", "rm", "14-8", "9-10", 3);
addNormEntry("wisc", "rm", "14-8", "11-12", 4);
addNormEntry("wisc", "rm", "14-8", "13-14", 5);
addNormEntry("wisc", "rm", "14-8", "15-16", 6);
addNormEntry("wisc", "rm", "14-8", "17-18", 7);
addNormEntry("wisc", "rm", "14-8", "19-20", 8);
addNormEntry("wisc", "rm", "14-8", "21", 9);
addNormEntry("wisc", "rm", "14-8", "22-23", 10);
addNormEntry("wisc", "rm", "14-8", "24-25", 11);
addNormEntry("wisc", "rm", "14-8", "26", 12);
addNormEntry("wisc", "rm", "14-8", "27-28", 13);
addNormEntry("wisc", "rm", "14-8", "29-30", 14);
addNormEntry("wisc", "rm", "14-8", "31-32", 15);
addNormEntry("wisc", "rm", "14-8", "33", 16);
addNormEntry("wisc", "rm", "14-8", "34", 17);
addNormEntry("wisc", "rm", "14-8", "-", 18);
addNormEntry("wisc", "rm", "14-8", "35", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "15-0", "0-6", 1);
addNormEntry("wisc", "rm", "15-0", "7-8", 2);
addNormEntry("wisc", "rm", "15-0", "9-10", 3);
addNormEntry("wisc", "rm", "15-0", "11-12", 4);
addNormEntry("wisc", "rm", "15-0", "13-14", 5);
addNormEntry("wisc", "rm", "15-0", "15-16", 6);
addNormEntry("wisc", "rm", "15-0", "17-18", 7);
addNormEntry("wisc", "rm", "15-0", "19-20", 8);
addNormEntry("wisc", "rm", "15-0", "21-22", 9);
addNormEntry("wisc", "rm", "15-0", "23", 10);
addNormEntry("wisc", "rm", "15-0", "24-25", 11);
addNormEntry("wisc", "rm", "15-0", "26-27", 12);
addNormEntry("wisc", "rm", "15-0", "28", 13);
addNormEntry("wisc", "rm", "15-0", "29-30", 14);
addNormEntry("wisc", "rm", "15-0", "31-32", 15);
addNormEntry("wisc", "rm", "15-0", "33", 16);
addNormEntry("wisc", "rm", "15-0", "34", 17);
addNormEntry("wisc", "rm", "15-0", "-", 18);
addNormEntry("wisc", "rm", "15-0", "35", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "15-4", "0-6", 1);
addNormEntry("wisc", "rm", "15-4", "7-8", 2);
addNormEntry("wisc", "rm", "15-4", "9-10", 3);
addNormEntry("wisc", "rm", "15-4", "11-12", 4);
addNormEntry("wisc", "rm", "15-4", "13-14", 5);
addNormEntry("wisc", "rm", "15-4", "15-16", 6);
addNormEntry("wisc", "rm", "15-4", "17-18", 7);
addNormEntry("wisc", "rm", "15-4", "19-20", 8);
addNormEntry("wisc", "rm", "15-4", "21-22", 9);
addNormEntry("wisc", "rm", "15-4", "23-24", 10);
addNormEntry("wisc", "rm", "15-4", "25-26", 11);
addNormEntry("wisc", "rm", "15-4", "27", 12);
addNormEntry("wisc", "rm", "15-4", "28-29", 13);
addNormEntry("wisc", "rm", "15-4", "30-31", 14);
addNormEntry("wisc", "rm", "15-4", "32", 15);
addNormEntry("wisc", "rm", "15-4", "33", 16);
addNormEntry("wisc", "rm", "15-4", "34", 17);
addNormEntry("wisc", "rm", "15-4", "-", 18);
addNormEntry("wisc", "rm", "15-4", "35", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "15-8", "0-6", 1);
addNormEntry("wisc", "rm", "15-8", "7-8", 2);
addNormEntry("wisc", "rm", "15-8", "9-10", 3);
addNormEntry("wisc", "rm", "15-8", "11-12", 4);
addNormEntry("wisc", "rm", "15-8", "13-14", 5);
addNormEntry("wisc", "rm", "15-8", "15-16", 6);
addNormEntry("wisc", "rm", "15-8", "17-18", 7);
addNormEntry("wisc", "rm", "15-8", "19-20", 8);
addNormEntry("wisc", "rm", "15-8", "21-22", 9);
addNormEntry("wisc", "rm", "15-8", "23-24", 10);
addNormEntry("wisc", "rm", "15-8", "25-26", 11);
addNormEntry("wisc", "rm", "15-8", "27", 12);
addNormEntry("wisc", "rm", "15-8", "28-29", 13);
addNormEntry("wisc", "rm", "15-8", "30-31", 14);
addNormEntry("wisc", "rm", "15-8", "32", 15);
addNormEntry("wisc", "rm", "15-8", "33", 16);
addNormEntry("wisc", "rm", "15-8", "34", 17);
addNormEntry("wisc", "rm", "15-8", "-", 18);
addNormEntry("wisc", "rm", "15-8", "35", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "16-0", "0-6", 1);
addNormEntry("wisc", "rm", "16-0", "7-8", 2);
addNormEntry("wisc", "rm", "16-0", "9-10", 3);
addNormEntry("wisc", "rm", "16-0", "11-12", 4);
addNormEntry("wisc", "rm", "16-0", "13-14", 5);
addNormEntry("wisc", "rm", "16-0", "15-16", 6);
addNormEntry("wisc", "rm", "16-0", "17-18", 7);
addNormEntry("wisc", "rm", "16-0", "19-20", 8);
addNormEntry("wisc", "rm", "16-0", "21-22", 9);
addNormEntry("wisc", "rm", "16-0", "23-24", 10);
addNormEntry("wisc", "rm", "16-0", "25-26", 11);
addNormEntry("wisc", "rm", "16-0", "27-28", 12);
addNormEntry("wisc", "rm", "16-0", "29", 13);
addNormEntry("wisc", "rm", "16-0", "30-31", 14);
addNormEntry("wisc", "rm", "16-0", "32", 15);
addNormEntry("wisc", "rm", "16-0", "33", 16);
addNormEntry("wisc", "rm", "16-0", "34", 17);
addNormEntry("wisc", "rm", "16-0", "-", 18);
addNormEntry("wisc", "rm", "16-0", "35", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Raciocínio Matricial)
addNormEntry("wisc", "rm", "16-4", "0-7", 1);
addNormEntry("wisc", "rm", "16-4", "8-9", 2);
addNormEntry("wisc", "rm", "16-4", "10-11", 3);
addNormEntry("wisc", "rm", "16-4", "12-13", 4);
addNormEntry("wisc", "rm", "16-4", "14-15", 5);
addNormEntry("wisc", "rm", "16-4", "16-17", 6);
addNormEntry("wisc", "rm", "16-4", "18-19", 7);
addNormEntry("wisc", "rm", "16-4", "20-21", 8);
addNormEntry("wisc", "rm", "16-4", "22-23", 9);
addNormEntry("wisc", "rm", "16-4", "24", 10);
addNormEntry("wisc", "rm", "16-4", "25-26", 11);
addNormEntry("wisc", "rm", "16-4", "27-28", 12);
addNormEntry("wisc", "rm", "16-4", "29", 13);
addNormEntry("wisc", "rm", "16-4", "30-31", 14);
addNormEntry("wisc", "rm", "16-4", "32", 15);
addNormEntry("wisc", "rm", "16-4", "33", 16);
addNormEntry("wisc", "rm", "16-4", "34", 17);
addNormEntry("wisc", "rm", "16-4", "-", 18);
addNormEntry("wisc", "rm", "16-4", "35", 19);

// --- Normas do Subteste Compreensão (CO) ---

// FAIXA 6-0 — 6 anos (Compreensão)
addNormEntry("wisc", "co", "6-0", "-", 1);
addNormEntry("wisc", "co", "6-0", "0", 2);
addNormEntry("wisc", "co", "6-0", "-", 3);
addNormEntry("wisc", "co", "6-0", "1", 4);
addNormEntry("wisc", "co", "6-0", "2", 5);
addNormEntry("wisc", "co", "6-0", "3", 6);
addNormEntry("wisc", "co", "6-0", "4-5", 7);
addNormEntry("wisc", "co", "6-0", "6", 8);
addNormEntry("wisc", "co", "6-0", "7-8", 9);
addNormEntry("wisc", "co", "6-0", "9", 10);
addNormEntry("wisc", "co", "6-0", "10-11", 11);
addNormEntry("wisc", "co", "6-0", "12-13", 12);
addNormEntry("wisc", "co", "6-0", "14-15", 13);
addNormEntry("wisc", "co", "6-0", "16", 14);
addNormEntry("wisc", "co", "6-0", "17-18", 15);
addNormEntry("wisc", "co", "6-0", "19-20", 16);
addNormEntry("wisc", "co", "6-0", "21-22", 17);
addNormEntry("wisc", "co", "6-0", "23-24", 18);
addNormEntry("wisc", "co", "6-0", "25-42", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "6-4", "0", 1);
addNormEntry("wisc", "co", "6-4", "-", 2);
addNormEntry("wisc", "co", "6-4", "1", 3);
addNormEntry("wisc", "co", "6-4", "2", 4);
addNormEntry("wisc", "co", "6-4", "3", 5);
addNormEntry("wisc", "co", "6-4", "4", 6);
addNormEntry("wisc", "co", "6-4", "5-6", 7);
addNormEntry("wisc", "co", "6-4", "7", 8);
addNormEntry("wisc", "co", "6-4", "8-9", 9);
addNormEntry("wisc", "co", "6-4", "10", 10);
addNormEntry("wisc", "co", "6-4", "11-12", 11);
addNormEntry("wisc", "co", "6-4", "13-14", 12);
addNormEntry("wisc", "co", "6-4", "15", 13);
addNormEntry("wisc", "co", "6-4", "16-17", 14);
addNormEntry("wisc", "co", "6-4", "18-19", 15);
addNormEntry("wisc", "co", "6-4", "20-21", 16);
addNormEntry("wisc", "co", "6-4", "22-23", 17);
addNormEntry("wisc", "co", "6-4", "24-25", 18);
addNormEntry("wisc", "co", "6-4", "26-42", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "6-8", "0", 1);
addNormEntry("wisc", "co", "6-8", "-", 2);
addNormEntry("wisc", "co", "6-8", "1", 3);
addNormEntry("wisc", "co", "6-8", "2", 4);
addNormEntry("wisc", "co", "6-8", "3-4", 5);
addNormEntry("wisc", "co", "6-8", "5", 6);
addNormEntry("wisc", "co", "6-8", "6", 7);
addNormEntry("wisc", "co", "6-8", "7-8", 8);
addNormEntry("wisc", "co", "6-8", "9-10", 9);
addNormEntry("wisc", "co", "6-8", "11", 10);
addNormEntry("wisc", "co", "6-8", "12-13", 11);
addNormEntry("wisc", "co", "6-8", "14", 12);
addNormEntry("wisc", "co", "6-8", "15-16", 13);
addNormEntry("wisc", "co", "6-8", "17-18", 14);
addNormEntry("wisc", "co", "6-8", "19-20", 15);
addNormEntry("wisc", "co", "6-8", "21-22", 16);
addNormEntry("wisc", "co", "6-8", "23", 17);
addNormEntry("wisc", "co", "6-8", "24-25", 18);
addNormEntry("wisc", "co", "6-8", "26-42", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "7-0", "0", 1);
addNormEntry("wisc", "co", "7-0", "-", 2);
addNormEntry("wisc", "co", "7-0", "1-2", 3);
addNormEntry("wisc", "co", "7-0", "3", 4);
addNormEntry("wisc", "co", "7-0", "4", 5);
addNormEntry("wisc", "co", "7-0", "5-6", 6);
addNormEntry("wisc", "co", "7-0", "7", 7);
addNormEntry("wisc", "co", "7-0", "8-9", 8);
addNormEntry("wisc", "co", "7-0", "10", 9);
addNormEntry("wisc", "co", "7-0", "11-12", 10);
addNormEntry("wisc", "co", "7-0", "13-14", 11);
addNormEntry("wisc", "co", "7-0", "15", 12);
addNormEntry("wisc", "co", "7-0", "16-17", 13);
addNormEntry("wisc", "co", "7-0", "18-19", 14);
addNormEntry("wisc", "co", "7-0", "20-21", 15);
addNormEntry("wisc", "co", "7-0", "22", 16);
addNormEntry("wisc", "co", "7-0", "23-24", 17);
addNormEntry("wisc", "co", "7-0", "25-26", 18);
addNormEntry("wisc", "co", "7-0", "27-42", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "7-4", "0", 1);
addNormEntry("wisc", "co", "7-4", "1", 2);
addNormEntry("wisc", "co", "7-4", "2", 3);
addNormEntry("wisc", "co", "7-4", "3-4", 4);
addNormEntry("wisc", "co", "7-4", "5", 5);
addNormEntry("wisc", "co", "7-4", "6", 6);
addNormEntry("wisc", "co", "7-4", "7-8", 7);
addNormEntry("wisc", "co", "7-4", "9-10", 8);
addNormEntry("wisc", "co", "7-4", "11", 9);
addNormEntry("wisc", "co", "7-4", "12-13", 10);
addNormEntry("wisc", "co", "7-4", "14", 11);
addNormEntry("wisc", "co", "7-4", "15-16", 12);
addNormEntry("wisc", "co", "7-4", "17-18", 13);
addNormEntry("wisc", "co", "7-4", "19-20", 14);
addNormEntry("wisc", "co", "7-4", "21", 15);
addNormEntry("wisc", "co", "7-4", "22-23", 16);
addNormEntry("wisc", "co", "7-4", "24-25", 17);
addNormEntry("wisc", "co", "7-4", "26-27", 18);
addNormEntry("wisc", "co", "7-4", "28-42", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "7-8", "0", 1);
addNormEntry("wisc", "co", "7-8", "1", 2);
addNormEntry("wisc", "co", "7-8", "2-3", 3);
addNormEntry("wisc", "co", "7-8", "4", 4);
addNormEntry("wisc", "co", "7-8", "5-6", 5);
addNormEntry("wisc", "co", "7-8", "7", 6);
addNormEntry("wisc", "co", "7-8", "8-9", 7);
addNormEntry("wisc", "co", "7-8", "10", 8);
addNormEntry("wisc", "co", "7-8", "11-12", 9);
addNormEntry("wisc", "co", "7-8", "13-14", 10);
addNormEntry("wisc", "co", "7-8", "15", 11);
addNormEntry("wisc", "co", "7-8", "16-17", 12);
addNormEntry("wisc", "co", "7-8", "18-19", 13);
addNormEntry("wisc", "co", "7-8", "20", 14);
addNormEntry("wisc", "co", "7-8", "21-22", 15);
addNormEntry("wisc", "co", "7-8", "23-24", 16);
addNormEntry("wisc", "co", "7-8", "25-26", 17);
addNormEntry("wisc", "co", "7-8", "27-28", 18);
addNormEntry("wisc", "co", "7-8", "29-42", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "8-0", "0", 1);
addNormEntry("wisc", "co", "8-0", "1-2", 2);
addNormEntry("wisc", "co", "8-0", "3", 3);
addNormEntry("wisc", "co", "8-0", "4-5", 4);
addNormEntry("wisc", "co", "8-0", "6", 5);
addNormEntry("wisc", "co", "8-0", "7-8", 6);
addNormEntry("wisc", "co", "8-0", "9", 7);
addNormEntry("wisc", "co", "8-0", "10-11", 8);
addNormEntry("wisc", "co", "8-0", "12-13", 9);
addNormEntry("wisc", "co", "8-0", "14", 10);
addNormEntry("wisc", "co", "8-0", "15-16", 11);
addNormEntry("wisc", "co", "8-0", "17-18", 12);
addNormEntry("wisc", "co", "8-0", "19-20", 13);
addNormEntry("wisc", "co", "8-0", "21", 14);
addNormEntry("wisc", "co", "8-0", "22-23", 15);
addNormEntry("wisc", "co", "8-0", "24-25", 16);
addNormEntry("wisc", "co", "8-0", "26-27", 17);
addNormEntry("wisc", "co", "8-0", "28", 18);
addNormEntry("wisc", "co", "8-0", "29-42", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "8-4", "0", 1);
addNormEntry("wisc", "co", "8-4", "1-2", 2);
addNormEntry("wisc", "co", "8-4", "3-4", 3);
addNormEntry("wisc", "co", "8-4", "5", 4);
addNormEntry("wisc", "co", "8-4", "6-7", 5);
addNormEntry("wisc", "co", "8-4", "8-9", 6);
addNormEntry("wisc", "co", "8-4", "10", 7);
addNormEntry("wisc", "co", "8-4", "11-12", 8);
addNormEntry("wisc", "co", "8-4", "13", 9);
addNormEntry("wisc", "co", "8-4", "14-15", 10);
addNormEntry("wisc", "co", "8-4", "16-17", 11);
addNormEntry("wisc", "co", "8-4", "18-19", 12);
addNormEntry("wisc", "co", "8-4", "20", 13);
addNormEntry("wisc", "co", "8-4", "21-22", 14);
addNormEntry("wisc", "co", "8-4", "23-24", 15);
addNormEntry("wisc", "co", "8-4", "25-26", 16);
addNormEntry("wisc", "co", "8-4", "27", 17);
addNormEntry("wisc", "co", "8-4", "28-29", 18);
addNormEntry("wisc", "co", "8-4", "30-42", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "8-8", "0-1", 1);
addNormEntry("wisc", "co", "8-8", "2-3", 2);
addNormEntry("wisc", "co", "8-8", "4", 3);
addNormEntry("wisc", "co", "8-8", "5-6", 4);
addNormEntry("wisc", "co", "8-8", "7-8", 5);
addNormEntry("wisc", "co", "8-8", "9", 6);
addNormEntry("wisc", "co", "8-8", "10-11", 7);
addNormEntry("wisc", "co", "8-8", "12-13", 8);
addNormEntry("wisc", "co", "8-8", "14", 9);
addNormEntry("wisc", "co", "8-8", "15-16", 10);
addNormEntry("wisc", "co", "8-8", "17-18", 11);
addNormEntry("wisc", "co", "8-8", "19", 12);
addNormEntry("wisc", "co", "8-8", "20-21", 13);
addNormEntry("wisc", "co", "8-8", "22-23", 14);
addNormEntry("wisc", "co", "8-8", "24-25", 15);
addNormEntry("wisc", "co", "8-8", "26", 16);
addNormEntry("wisc", "co", "8-8", "27-28", 17);
addNormEntry("wisc", "co", "8-8", "29-30", 18);
addNormEntry("wisc", "co", "8-8", "31-42", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "9-0", "0-1", 1);
addNormEntry("wisc", "co", "9-0", "2-3", 2);
addNormEntry("wisc", "co", "9-0", "4-5", 3);
addNormEntry("wisc", "co", "9-0", "6-7", 4);
addNormEntry("wisc", "co", "9-0", "8", 5);
addNormEntry("wisc", "co", "9-0", "9-10", 6);
addNormEntry("wisc", "co", "9-0", "11-12", 7);
addNormEntry("wisc", "co", "9-0", "13", 8);
addNormEntry("wisc", "co", "9-0", "14-15", 9);
addNormEntry("wisc", "co", "9-0", "16-17", 10);
addNormEntry("wisc", "co", "9-0", "18", 11);
addNormEntry("wisc", "co", "9-0", "19-20", 12);
addNormEntry("wisc", "co", "9-0", "21-22", 13);
addNormEntry("wisc", "co", "9-0", "23-24", 14);
addNormEntry("wisc", "co", "9-0", "25", 15);
addNormEntry("wisc", "co", "9-0", "26-27", 16);
addNormEntry("wisc", "co", "9-0", "28-29", 17);
addNormEntry("wisc", "co", "9-0", "30-31", 18);
addNormEntry("wisc", "co", "9-0", "32-42", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "9-4", "0-2", 1);
addNormEntry("wisc", "co", "9-4", "3-4", 2);
addNormEntry("wisc", "co", "9-4", "5-6", 3);
addNormEntry("wisc", "co", "9-4", "7", 4);
addNormEntry("wisc", "co", "9-4", "8-9", 5);
addNormEntry("wisc", "co", "9-4", "10-11", 6);
addNormEntry("wisc", "co", "9-4", "12", 7);
addNormEntry("wisc", "co", "9-4", "13-14", 8);
addNormEntry("wisc", "co", "9-4", "15-16", 9);
addNormEntry("wisc", "co", "9-4", "17", 10);
addNormEntry("wisc", "co", "9-4", "18-19", 11);
addNormEntry("wisc", "co", "9-4", "20-21", 12);
addNormEntry("wisc", "co", "9-4", "22-23", 13);
addNormEntry("wisc", "co", "9-4", "24", 14);
addNormEntry("wisc", "co", "9-4", "25-26", 15);
addNormEntry("wisc", "co", "9-4", "27-28", 16);
addNormEntry("wisc", "co", "9-4", "29-30", 17);
addNormEntry("wisc", "co", "9-4", "31-32", 18);
addNormEntry("wisc", "co", "9-4", "33-42", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "9-8", "0-2", 1);
addNormEntry("wisc", "co", "9-8", "3-4", 2);
addNormEntry("wisc", "co", "9-8", "5-6", 3);
addNormEntry("wisc", "co", "9-8", "7-8", 4);
addNormEntry("wisc", "co", "9-8", "9", 5);
addNormEntry("wisc", "co", "9-8", "10-11", 6);
addNormEntry("wisc", "co", "9-8", "12-13", 7);
addNormEntry("wisc", "co", "9-8", "14-15", 8);
addNormEntry("wisc", "co", "9-8", "16", 9);
addNormEntry("wisc", "co", "9-8", "17-18", 10);
addNormEntry("wisc", "co", "9-8", "19-20", 11);
addNormEntry("wisc", "co", "9-8", "21-22", 12);
addNormEntry("wisc", "co", "9-8", "23", 13);
addNormEntry("wisc", "co", "9-8", "24-25", 14);
addNormEntry("wisc", "co", "9-8", "26-27", 15);
addNormEntry("wisc", "co", "9-8", "28-29", 16);
addNormEntry("wisc", "co", "9-8", "30", 17);
addNormEntry("wisc", "co", "9-8", "31-32", 18);
addNormEntry("wisc", "co", "9-8", "33-42", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "10-0", "0-3", 1);
addNormEntry("wisc", "co", "10-0", "4-5", 2);
addNormEntry("wisc", "co", "10-0", "6-7", 3);
addNormEntry("wisc", "co", "10-0", "8", 4);
addNormEntry("wisc", "co", "10-0", "9-10", 5);
addNormEntry("wisc", "co", "10-0", "11-12", 6);
addNormEntry("wisc", "co", "10-0", "13", 7);
addNormEntry("wisc", "co", "10-0", "14-15", 8);
addNormEntry("wisc", "co", "10-0", "16-17", 9);
addNormEntry("wisc", "co", "10-0", "18-19", 10);
addNormEntry("wisc", "co", "10-0", "20", 11);
addNormEntry("wisc", "co", "10-0", "21-22", 12);
addNormEntry("wisc", "co", "10-0", "23-24", 13);
addNormEntry("wisc", "co", "10-0", "25-26", 14);
addNormEntry("wisc", "co", "10-0", "27-28", 15);
addNormEntry("wisc", "co", "10-0", "29", 16);
addNormEntry("wisc", "co", "10-0", "30-31", 17);
addNormEntry("wisc", "co", "10-0", "32-33", 18);
addNormEntry("wisc", "co", "10-0", "34-42", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "10-4", "0-3", 1);
addNormEntry("wisc", "co", "10-4", "4-5", 2);
addNormEntry("wisc", "co", "10-4", "6-7", 3);
addNormEntry("wisc", "co", "10-4", "8-9", 4);
addNormEntry("wisc", "co", "10-4", "10-11", 5);
addNormEntry("wisc", "co", "10-4", "12", 6);
addNormEntry("wisc", "co", "10-4", "13-14", 7);
addNormEntry("wisc", "co", "10-4", "15-16", 8);
addNormEntry("wisc", "co", "10-4", "17-18", 9);
addNormEntry("wisc", "co", "10-4", "19", 10);
addNormEntry("wisc", "co", "10-4", "20-21", 11);
addNormEntry("wisc", "co", "10-4", "22-23", 12);
addNormEntry("wisc", "co", "10-4", "24-25", 13);
addNormEntry("wisc", "co", "10-4", "26", 14);
addNormEntry("wisc", "co", "10-4", "27-28", 15);
addNormEntry("wisc", "co", "10-4", "29-30", 16);
addNormEntry("wisc", "co", "10-4", "31-32", 17);
addNormEntry("wisc", "co", "10-4", "33-34", 18);
addNormEntry("wisc", "co", "10-4", "35-42", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "10-8", "0-4", 1);
addNormEntry("wisc", "co", "10-8", "5-6", 2);
addNormEntry("wisc", "co", "10-8", "7-8", 3);
addNormEntry("wisc", "co", "10-8", "9", 4);
addNormEntry("wisc", "co", "10-8", "10-11", 5);
addNormEntry("wisc", "co", "10-8", "12-13", 6);
addNormEntry("wisc", "co", "10-8", "14-15", 7);
addNormEntry("wisc", "co", "10-8", "16", 8);
addNormEntry("wisc", "co", "10-8", "17-18", 9);
addNormEntry("wisc", "co", "10-8", "19-20", 10);
addNormEntry("wisc", "co", "10-8", "21-22", 11);
addNormEntry("wisc", "co", "10-8", "23-24", 12);
addNormEntry("wisc", "co", "10-8", "25", 13);
addNormEntry("wisc", "co", "10-8", "26-27", 14);
addNormEntry("wisc", "co", "10-8", "28-29", 15);
addNormEntry("wisc", "co", "10-8", "30-31", 16);
addNormEntry("wisc", "co", "10-8", "32-33", 17);
addNormEntry("wisc", "co", "10-8", "34", 18);
addNormEntry("wisc", "co", "10-8", "35-42", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "11-0", "0-4", 1);
addNormEntry("wisc", "co", "11-0", "5-6", 2);
addNormEntry("wisc", "co", "11-0", "7-8", 3);
addNormEntry("wisc", "co", "11-0", "9-10", 4);
addNormEntry("wisc", "co", "11-0", "11-12", 5);
addNormEntry("wisc", "co", "11-0", "13", 6);
addNormEntry("wisc", "co", "11-0", "14-15", 7);
addNormEntry("wisc", "co", "11-0", "16-17", 8);
addNormEntry("wisc", "co", "11-0", "18-19", 9);
addNormEntry("wisc", "co", "11-0", "20-21", 10);
addNormEntry("wisc", "co", "11-0", "22", 11);
addNormEntry("wisc", "co", "11-0", "23-24", 12);
addNormEntry("wisc", "co", "11-0", "25-26", 13);
addNormEntry("wisc", "co", "11-0", "27-28", 14);
addNormEntry("wisc", "co", "11-0", "29-30", 15);
addNormEntry("wisc", "co", "11-0", "31", 16);
addNormEntry("wisc", "co", "11-0", "32-33", 17);
addNormEntry("wisc", "co", "11-0", "34-35", 18);
addNormEntry("wisc", "co", "11-0", "36-42", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "11-4", "0-5", 1);
addNormEntry("wisc", "co", "11-4", "6-7", 2);
addNormEntry("wisc", "co", "11-4", "8-9", 3);
addNormEntry("wisc", "co", "11-4", "10", 4);
addNormEntry("wisc", "co", "11-4", "11-12", 5);
addNormEntry("wisc", "co", "11-4", "13-14", 6);
addNormEntry("wisc", "co", "11-4", "15-16", 7);
addNormEntry("wisc", "co", "11-4", "17-18", 8);
addNormEntry("wisc", "co", "11-4", "19", 9);
addNormEntry("wisc", "co", "11-4", "20-21", 10);
addNormEntry("wisc", "co", "11-4", "22-23", 11);
addNormEntry("wisc", "co", "11-4", "24-25", 12);
addNormEntry("wisc", "co", "11-4", "26-27", 13);
addNormEntry("wisc", "co", "11-4", "28", 14);
addNormEntry("wisc", "co", "11-4", "29-30", 15);
addNormEntry("wisc", "co", "11-4", "31-32", 16);
addNormEntry("wisc", "co", "11-4", "33-34", 17);
addNormEntry("wisc", "co", "11-4", "35-36", 18);
addNormEntry("wisc", "co", "11-4", "37-42", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "11-8", "0-5", 1);
addNormEntry("wisc", "co", "11-8", "6-7", 2);
addNormEntry("wisc", "co", "11-8", "8-9", 3);
addNormEntry("wisc", "co", "11-8", "10-11", 4);
addNormEntry("wisc", "co", "11-8", "12-13", 5);
addNormEntry("wisc", "co", "11-8", "14", 6);
addNormEntry("wisc", "co", "11-8", "15-16", 7);
addNormEntry("wisc", "co", "11-8", "17-18", 8);
addNormEntry("wisc", "co", "11-8", "19-20", 9);
addNormEntry("wisc", "co", "11-8", "21-22", 10);
addNormEntry("wisc", "co", "11-8", "23-24", 11);
addNormEntry("wisc", "co", "11-8", "25", 12);
addNormEntry("wisc", "co", "11-8", "26-27", 13);
addNormEntry("wisc", "co", "11-8", "28-29", 14);
addNormEntry("wisc", "co", "11-8", "30-31", 15);
addNormEntry("wisc", "co", "11-8", "32-33", 16);
addNormEntry("wisc", "co", "11-8", "34-35", 17);
addNormEntry("wisc", "co", "11-8", "36", 18);
addNormEntry("wisc", "co", "11-8", "37-42", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "12-0", "0-6", 1);
addNormEntry("wisc", "co", "12-0", "7-8", 2);
addNormEntry("wisc", "co", "12-0", "9", 3);
addNormEntry("wisc", "co", "12-0", "10-11", 4);
addNormEntry("wisc", "co", "12-0", "12-13", 5);
addNormEntry("wisc", "co", "12-0", "14-15", 6);
addNormEntry("wisc", "co", "12-0", "16-17", 7);
addNormEntry("wisc", "co", "12-0", "18-19", 8);
addNormEntry("wisc", "co", "12-0", "20", 9);
addNormEntry("wisc", "co", "12-0", "21-22", 10);
addNormEntry("wisc", "co", "12-0", "23-24", 11);
addNormEntry("wisc", "co", "12-0", "25-26", 12);
addNormEntry("wisc", "co", "12-0", "27-28", 13);
addNormEntry("wisc", "co", "12-0", "29-30", 14);
addNormEntry("wisc", "co", "12-0", "31-32", 15);
addNormEntry("wisc", "co", "12-0", "33", 16);
addNormEntry("wisc", "co", "12-0", "34-35", 17);
addNormEntry("wisc", "co", "12-0", "36-37", 18);
addNormEntry("wisc", "co", "12-0", "38-42", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "12-4", "0-6", 1);
addNormEntry("wisc", "co", "12-4", "7-8", 2);
addNormEntry("wisc", "co", "12-4", "9-10", 3);
addNormEntry("wisc", "co", "12-4", "11-12", 4);
addNormEntry("wisc", "co", "12-4", "13-14", 5);
addNormEntry("wisc", "co", "12-4", "15", 6);
addNormEntry("wisc", "co", "12-4", "16-17", 7);
addNormEntry("wisc", "co", "12-4", "18-19", 8);
addNormEntry("wisc", "co", "12-4", "20-21", 9);
addNormEntry("wisc", "co", "12-4", "22-23", 10);
addNormEntry("wisc", "co", "12-4", "24-25", 11);
addNormEntry("wisc", "co", "12-4", "26-27", 12);
addNormEntry("wisc", "co", "12-4", "28", 13);
addNormEntry("wisc", "co", "12-4", "29-30", 14);
addNormEntry("wisc", "co", "12-4", "31-32", 15);
addNormEntry("wisc", "co", "12-4", "33-34", 16);
addNormEntry("wisc", "co", "12-4", "35-36", 17);
addNormEntry("wisc", "co", "12-4", "37-38", 18);
addNormEntry("wisc", "co", "12-4", "39-42", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "12-8", "0-6", 1);
addNormEntry("wisc", "co", "12-8", "7-8", 2);
addNormEntry("wisc", "co", "12-8", "9-10", 3);
addNormEntry("wisc", "co", "12-8", "11-12", 4);
addNormEntry("wisc", "co", "12-8", "13-14", 5);
addNormEntry("wisc", "co", "12-8", "15-16", 6);
addNormEntry("wisc", "co", "12-8", "17-18", 7);
addNormEntry("wisc", "co", "12-8", "19-20", 8);
addNormEntry("wisc", "co", "12-8", "21-22", 9);
addNormEntry("wisc", "co", "12-8", "23", 10);
addNormEntry("wisc", "co", "12-8", "24-25", 11);
addNormEntry("wisc", "co", "12-8", "26-27", 12);
addNormEntry("wisc", "co", "12-8", "28-29", 13);
addNormEntry("wisc", "co", "12-8", "30-31", 14);
addNormEntry("wisc", "co", "12-8", "32-33", 15);
addNormEntry("wisc", "co", "12-8", "34", 16);
addNormEntry("wisc", "co", "12-8", "35-36", 17);
addNormEntry("wisc", "co", "12-8", "37-38", 18);
addNormEntry("wisc", "co", "12-8", "39-42", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "13-0", "0-6", 1);
addNormEntry("wisc", "co", "13-0", "7-8", 2);
addNormEntry("wisc", "co", "13-0", "9-10", 3);
addNormEntry("wisc", "co", "13-0", "11-12", 4);
addNormEntry("wisc", "co", "13-0", "13-14", 5);
addNormEntry("wisc", "co", "13-0", "15-16", 6);
addNormEntry("wisc", "co", "13-0", "17-18", 7);
addNormEntry("wisc", "co", "13-0", "19-20", 8);
addNormEntry("wisc", "co", "13-0", "21-22", 9);
addNormEntry("wisc", "co", "13-0", "23-24", 10);
addNormEntry("wisc", "co", "13-0", "25-26", 11);
addNormEntry("wisc", "co", "13-0", "27-28", 12);
addNormEntry("wisc", "co", "13-0", "29", 13);
addNormEntry("wisc", "co", "13-0", "30-31", 14);
addNormEntry("wisc", "co", "13-0", "32-33", 15);
addNormEntry("wisc", "co", "13-0", "34-35", 16);
addNormEntry("wisc", "co", "13-0", "36-37", 17);
addNormEntry("wisc", "co", "13-0", "38-39", 18);
addNormEntry("wisc", "co", "13-0", "40-42", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "13-4", "0-7", 1);
addNormEntry("wisc", "co", "13-4", "8-9", 2);
addNormEntry("wisc", "co", "13-4", "10-11", 3);
addNormEntry("wisc", "co", "13-4", "12-13", 4);
addNormEntry("wisc", "co", "13-4", "14-15", 5);
addNormEntry("wisc", "co", "13-4", "16-17", 6);
addNormEntry("wisc", "co", "13-4", "18-19", 7);
addNormEntry("wisc", "co", "13-4", "20-21", 8);
addNormEntry("wisc", "co", "13-4", "22", 9);
addNormEntry("wisc", "co", "13-4", "23-24", 10);
addNormEntry("wisc", "co", "13-4", "25-26", 11);
addNormEntry("wisc", "co", "13-4", "27-28", 12);
addNormEntry("wisc", "co", "13-4", "29-30", 13);
addNormEntry("wisc", "co", "13-4", "31-32", 14);
addNormEntry("wisc", "co", "13-4", "33-34", 15);
addNormEntry("wisc", "co", "13-4", "35", 16);
addNormEntry("wisc", "co", "13-4", "36-37", 17);
addNormEntry("wisc", "co", "13-4", "38-39", 18);
addNormEntry("wisc", "co", "13-4", "40-42", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "13-8", "0-7", 1);
addNormEntry("wisc", "co", "13-8", "8-9", 2);
addNormEntry("wisc", "co", "13-8", "10-11", 3);
addNormEntry("wisc", "co", "13-8", "12-13", 4);
addNormEntry("wisc", "co", "13-8", "14-15", 5);
addNormEntry("wisc", "co", "13-8", "16-17", 6);
addNormEntry("wisc", "co", "13-8", "18-19", 7);
addNormEntry("wisc", "co", "13-8", "20-21", 8);
addNormEntry("wisc", "co", "13-8", "22-23", 9);
addNormEntry("wisc", "co", "13-8", "24-25", 10);
addNormEntry("wisc", "co", "13-8", "26-27", 11);
addNormEntry("wisc", "co", "13-8", "28-29", 12);
addNormEntry("wisc", "co", "13-8", "30", 13);
addNormEntry("wisc", "co", "13-8", "31-32", 14);
addNormEntry("wisc", "co", "13-8", "33-34", 15);
addNormEntry("wisc", "co", "13-8", "35-36", 16);
addNormEntry("wisc", "co", "13-8", "37-38", 17);
addNormEntry("wisc", "co", "13-8", "39", 18);
addNormEntry("wisc", "co", "13-8", "40-42", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "14-0", "0-7", 1);
addNormEntry("wisc", "co", "14-0", "8-9", 2);
addNormEntry("wisc", "co", "14-0", "10-11", 3);
addNormEntry("wisc", "co", "14-0", "12-13", 4);
addNormEntry("wisc", "co", "14-0", "14-15", 5);
addNormEntry("wisc", "co", "14-0", "16-17", 6);
addNormEntry("wisc", "co", "14-0", "18-19", 7);
addNormEntry("wisc", "co", "14-0", "20-21", 8);
addNormEntry("wisc", "co", "14-0", "22-23", 9);
addNormEntry("wisc", "co", "14-0", "24-25", 10);
addNormEntry("wisc", "co", "14-0", "26-27", 11);
addNormEntry("wisc", "co", "14-0", "28-29", 12);
addNormEntry("wisc", "co", "14-0", "30-31", 13);
addNormEntry("wisc", "co", "14-0", "32-33", 14);
addNormEntry("wisc", "co", "14-0", "34-35", 15);
addNormEntry("wisc", "co", "14-0", "36", 16);
addNormEntry("wisc", "co", "14-0", "37-38", 17);
addNormEntry("wisc", "co", "14-0", "39-40", 18);
addNormEntry("wisc", "co", "14-0", "41-42", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "14-4", "0-7", 1);
addNormEntry("wisc", "co", "14-4", "8-9", 2);
addNormEntry("wisc", "co", "14-4", "10-11", 3);
addNormEntry("wisc", "co", "14-4", "12-14", 4);
addNormEntry("wisc", "co", "14-4", "15-16", 5);
addNormEntry("wisc", "co", "14-4", "17-18", 6);
addNormEntry("wisc", "co", "14-4", "19-20", 7);
addNormEntry("wisc", "co", "14-4", "21-22", 8);
addNormEntry("wisc", "co", "14-4", "23-24", 9);
addNormEntry("wisc", "co", "14-4", "25-26", 10);
addNormEntry("wisc", "co", "14-4", "27-28", 11);
addNormEntry("wisc", "co", "14-4", "29-30", 12);
addNormEntry("wisc", "co", "14-4", "31", 13);
addNormEntry("wisc", "co", "14-4", "32-33", 14);
addNormEntry("wisc", "co", "14-4", "34-35", 15);
addNormEntry("wisc", "co", "14-4", "36-37", 16);
addNormEntry("wisc", "co", "14-4", "38", 17);
addNormEntry("wisc", "co", "14-4", "39-40", 18);
addNormEntry("wisc", "co", "14-4", "41-42", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "14-8", "0-7", 1);
addNormEntry("wisc", "co", "14-8", "8-9", 2);
addNormEntry("wisc", "co", "14-8", "10-12", 3);
addNormEntry("wisc", "co", "14-8", "13-14", 4);
addNormEntry("wisc", "co", "14-8", "15-16", 5);
addNormEntry("wisc", "co", "14-8", "17-18", 6);
addNormEntry("wisc", "co", "14-8", "19-20", 7);
addNormEntry("wisc", "co", "14-8", "21-22", 8);
addNormEntry("wisc", "co", "14-8", "23-24", 9);
addNormEntry("wisc", "co", "14-8", "25-26", 10);
addNormEntry("wisc", "co", "14-8", "27-28", 11);
addNormEntry("wisc", "co", "14-8", "29-30", 12);
addNormEntry("wisc", "co", "14-8", "31-32", 13);
addNormEntry("wisc", "co", "14-8", "33-34", 14);
addNormEntry("wisc", "co", "14-8", "35", 15);
addNormEntry("wisc", "co", "14-8", "36-37", 16);
addNormEntry("wisc", "co", "14-8", "38-39", 17);
addNormEntry("wisc", "co", "14-8", "40", 18);
addNormEntry("wisc", "co", "14-8", "41-42", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "15-0", "0-8", 1);
addNormEntry("wisc", "co", "15-0", "9-10", 2);
addNormEntry("wisc", "co", "15-0", "11-12", 3);
addNormEntry("wisc", "co", "15-0", "13-14", 4);
addNormEntry("wisc", "co", "15-0", "15-16", 5);
addNormEntry("wisc", "co", "15-0", "17-18", 6);
addNormEntry("wisc", "co", "15-0", "19-21", 7);
addNormEntry("wisc", "co", "15-0", "22-23", 8);
addNormEntry("wisc", "co", "15-0", "24-25", 9);
addNormEntry("wisc", "co", "15-0", "26-27", 10);
addNormEntry("wisc", "co", "15-0", "28-29", 11);
addNormEntry("wisc", "co", "15-0", "30", 12);
addNormEntry("wisc", "co", "15-0", "31-32", 13);
addNormEntry("wisc", "co", "15-0", "33-34", 14);
addNormEntry("wisc", "co", "15-0", "35-36", 15);
addNormEntry("wisc", "co", "15-0", "37", 16);
addNormEntry("wisc", "co", "15-0", "38-39", 17);
addNormEntry("wisc", "co", "15-0", "40", 18);
addNormEntry("wisc", "co", "15-0", "41-42", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "15-4", "0-8", 1);
addNormEntry("wisc", "co", "15-4", "9-10", 2);
addNormEntry("wisc", "co", "15-4", "11-12", 3);
addNormEntry("wisc", "co", "15-4", "13-14", 4);
addNormEntry("wisc", "co", "15-4", "15-16", 5);
addNormEntry("wisc", "co", "15-4", "17-19", 6);
addNormEntry("wisc", "co", "15-4", "20-21", 7);
addNormEntry("wisc", "co", "15-4", "22-23", 8);
addNormEntry("wisc", "co", "15-4", "24-25", 9);
addNormEntry("wisc", "co", "15-4", "26-27", 10);
addNormEntry("wisc", "co", "15-4", "28-29", 11);
addNormEntry("wisc", "co", "15-4", "30-31", 12);
addNormEntry("wisc", "co", "15-4", "32-33", 13);
addNormEntry("wisc", "co", "15-4", "34", 14);
addNormEntry("wisc", "co", "15-4", "35-36", 15);
addNormEntry("wisc", "co", "15-4", "37-38", 16);
addNormEntry("wisc", "co", "15-4", "39", 17);
addNormEntry("wisc", "co", "15-4", "40", 18);
addNormEntry("wisc", "co", "15-4", "41-42", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "15-8", "0-8", 1);
addNormEntry("wisc", "co", "15-8", "9-10", 2);
addNormEntry("wisc", "co", "15-8", "11-12", 3);
addNormEntry("wisc", "co", "15-8", "13-14", 4);
addNormEntry("wisc", "co", "15-8", "15-17", 5);
addNormEntry("wisc", "co", "15-8", "18-19", 6);
addNormEntry("wisc", "co", "15-8", "20-21", 7);
addNormEntry("wisc", "co", "15-8", "22-23", 8);
addNormEntry("wisc", "co", "15-8", "24-25", 9);
addNormEntry("wisc", "co", "15-8", "26-28", 10);
addNormEntry("wisc", "co", "15-8", "29", 11);
addNormEntry("wisc", "co", "15-8", "30-31", 12);
addNormEntry("wisc", "co", "15-8", "32-33", 13);
addNormEntry("wisc", "co", "15-8", "34-35", 14);
addNormEntry("wisc", "co", "15-8", "36", 15);
addNormEntry("wisc", "co", "15-8", "37-38", 16);
addNormEntry("wisc", "co", "15-8", "39", 17);
addNormEntry("wisc", "co", "15-8", "40", 18);
addNormEntry("wisc", "co", "15-8", "41-42", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Compreensão)
addNormEntry("wisc", "co", "16-0", "0-8", 1);
addNormEntry("wisc", "co", "16-0", "9-10", 2);
addNormEntry("wisc", "co", "16-0", "11-12", 3);
addNormEntry("wisc", "co", "16-0", "13-15", 4);
addNormEntry("wisc", "co", "16-0", "16-17", 5);
addNormEntry("wisc", "co", "16-0", "18-19", 6);
addNormEntry("wisc", "co", "16-0", "20-21", 7);
addNormEntry("wisc", "co", "16-0", "22-24", 8);
addNormEntry("wisc", "co", "16-0", "25-26", 9);
addNormEntry("wisc", "co", "16-0", "27-28", 10);
addNormEntry("wisc", "co", "16-0", "29-30", 11);
addNormEntry("wisc", "co", "16-0", "31-32", 12);
addNormEntry("wisc", "co", "16-0", "33", 13);
addNormEntry("wisc", "co", "16-0", "34-35", 14);
addNormEntry("wisc", "co", "16-0", "36-37", 15);
addNormEntry("wisc", "co", "16-0", "38", 16);
addNormEntry("wisc", "co", "16-0", "39", 17);
addNormEntry("wisc", "co", "16-0", "40", 18);
addNormEntry("wisc", "co", "16-0", "41-42", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Compreensão)
addNormEntry("wisc", "co", "16-4", "0-8", 1);
addNormEntry("wisc", "co", "16-4", "9-10", 2);
addNormEntry("wisc", "co", "16-4", "11-12", 3);
addNormEntry("wisc", "co", "16-4", "13-15", 4);
addNormEntry("wisc", "co", "16-4", "16-17", 5);
addNormEntry("wisc", "co", "16-4", "18-19", 6);
addNormEntry("wisc", "co", "16-4", "20-22", 7);
addNormEntry("wisc", "co", "16-4", "23-24", 8);
addNormEntry("wisc", "co", "16-4", "25-26", 9);
addNormEntry("wisc", "co", "16-4", "27-28", 10);
addNormEntry("wisc", "co", "16-4", "29-30", 11);
addNormEntry("wisc", "co", "16-4", "31-32", 12);
addNormEntry("wisc", "co", "16-4", "33-34", 13);
addNormEntry("wisc", "co", "16-4", "35", 14);
addNormEntry("wisc", "co", "16-4", "36-37", 15);
addNormEntry("wisc", "co", "16-4", "38", 16);
addNormEntry("wisc", "co", "16-4", "39", 17);
addNormEntry("wisc", "co", "16-4", "40", 18);
addNormEntry("wisc", "co", "16-4", "41-42", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Compreensão)
addNormEntry("wisc", "co", "16-8", "0-8", 1);
addNormEntry("wisc", "co", "16-8", "9-10", 2);
addNormEntry("wisc", "co", "16-8", "11-12", 3);
addNormEntry("wisc", "co", "16-8", "13-15", 4);
addNormEntry("wisc", "co", "16-8", "16-17", 5);
addNormEntry("wisc", "co", "16-8", "18-20", 6);
addNormEntry("wisc", "co", "16-8", "21-22", 7);
addNormEntry("wisc", "co", "16-8", "23-24", 8);
addNormEntry("wisc", "co", "16-8", "25-27", 9);
addNormEntry("wisc", "co", "16-8", "28-29", 10);
addNormEntry("wisc", "co", "16-8", "30-31", 11);
addNormEntry("wisc", "co", "16-8", "32", 12);
addNormEntry("wisc", "co", "16-8", "33-34", 13);
addNormEntry("wisc", "co", "16-8", "35-36", 14);
addNormEntry("wisc", "co", "16-8", "37", 15);
addNormEntry("wisc", "co", "16-8", "38", 16);
addNormEntry("wisc", "co", "16-8", "39", 17);
addNormEntry("wisc", "co", "16-8", "40", 18);
addNormEntry("wisc", "co", "16-8", "41-42", 19);

// --- Normas do Subteste Procurar Símbolos (PS) ---

// FAIXA 6-0 — 6 anos (Procurar Símbolos)
addNormEntry("wisc", "ps", "6-0", "-", 1);
addNormEntry("wisc", "ps", "6-0", "0", 2);
addNormEntry("wisc", "ps", "6-0", "-", 3);
addNormEntry("wisc", "ps", "6-0", "1", 4);
addNormEntry("wisc", "ps", "6-0", "2-3", 5);
addNormEntry("wisc", "ps", "6-0", "4-5", 6);
addNormEntry("wisc", "ps", "6-0", "6-7", 7);
addNormEntry("wisc", "ps", "6-0", "8-9", 8);
addNormEntry("wisc", "ps", "6-0", "10-12", 9);
addNormEntry("wisc", "ps", "6-0", "13-14", 10);
addNormEntry("wisc", "ps", "6-0", "15-16", 11);
addNormEntry("wisc", "ps", "6-0", "17-19", 12);
addNormEntry("wisc", "ps", "6-0", "20-21", 13);
addNormEntry("wisc", "ps", "6-0", "22-23", 14);
addNormEntry("wisc", "ps", "6-0", "24-26", 15);
addNormEntry("wisc", "ps", "6-0", "27-28", 16);
addNormEntry("wisc", "ps", "6-0", "29-31", 17);
addNormEntry("wisc", "ps", "6-0", "32-34", 18);
addNormEntry("wisc", "ps", "6-0", "35-45", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "6-4", "0", 1);
addNormEntry("wisc", "ps", "6-4", "-", 2);
addNormEntry("wisc", "ps", "6-4", "1", 3);
addNormEntry("wisc", "ps", "6-4", "2", 4);
addNormEntry("wisc", "ps", "6-4", "3-4", 5);
addNormEntry("wisc", "ps", "6-4", "5-6", 6);
addNormEntry("wisc", "ps", "6-4", "7-8", 7);
addNormEntry("wisc", "ps", "6-4", "9-11", 8);
addNormEntry("wisc", "ps", "6-4", "12-14", 9);
addNormEntry("wisc", "ps", "6-4", "15", 10);
addNormEntry("wisc", "ps", "6-4", "16-18", 11);
addNormEntry("wisc", "ps", "6-4", "19-21", 12);
addNormEntry("wisc", "ps", "6-4", "22-23", 13);
addNormEntry("wisc", "ps", "6-4", "24-25", 14);
addNormEntry("wisc", "ps", "6-4", "26-28", 15);
addNormEntry("wisc", "ps", "6-4", "29-30", 16);
addNormEntry("wisc", "ps", "6-4", "31-33", 17);
addNormEntry("wisc", "ps", "6-4", "34-36", 18);
addNormEntry("wisc", "ps", "6-4", "37-45", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "6-8", "0", 1);
addNormEntry("wisc", "ps", "6-8", "-", 2);
addNormEntry("wisc", "ps", "6-8", "1", 3);
addNormEntry("wisc", "ps", "6-8", "2-3", 4);
addNormEntry("wisc", "ps", "6-8", "4-5", 5);
addNormEntry("wisc", "ps", "6-8", "6-8", 6);
addNormEntry("wisc", "ps", "6-8", "9-10", 7);
addNormEntry("wisc", "ps", "6-8", "11-13", 8);
addNormEntry("wisc", "ps", "6-8", "14-15", 9);
addNormEntry("wisc", "ps", "6-8", "16-17", 10);
addNormEntry("wisc", "ps", "6-8", "18-20", 11);
addNormEntry("wisc", "ps", "6-8", "21-22", 12);
addNormEntry("wisc", "ps", "6-8", "23-25", 13);
addNormEntry("wisc", "ps", "6-8", "26-27", 14);
addNormEntry("wisc", "ps", "6-8", "28-30", 15);
addNormEntry("wisc", "ps", "6-8", "31-32", 16);
addNormEntry("wisc", "ps", "6-8", "33-35", 17);
addNormEntry("wisc", "ps", "6-8", "36-38", 18);
addNormEntry("wisc", "ps", "6-8", "39-45", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "7-0", "0", 1);
addNormEntry("wisc", "ps", "7-0", "1", 2);
addNormEntry("wisc", "ps", "7-0", "2", 3);
addNormEntry("wisc", "ps", "7-0", "3-4", 4);
addNormEntry("wisc", "ps", "7-0", "5-7", 5);
addNormEntry("wisc", "ps", "7-0", "8-9", 6);
addNormEntry("wisc", "ps", "7-0", "10-12", 7);
addNormEntry("wisc", "ps", "7-0", "13-14", 8);
addNormEntry("wisc", "ps", "7-0", "15-17", 9);
addNormEntry("wisc", "ps", "7-0", "18-19", 10);
addNormEntry("wisc", "ps", "7-0", "20-22", 11);
addNormEntry("wisc", "ps", "7-0", "23-24", 12);
addNormEntry("wisc", "ps", "7-0", "25-27", 13);
addNormEntry("wisc", "ps", "7-0", "28-29", 14);
addNormEntry("wisc", "ps", "7-0", "30-32", 15);
addNormEntry("wisc", "ps", "7-0", "33-34", 16);
addNormEntry("wisc", "ps", "7-0", "35-37", 17);
addNormEntry("wisc", "ps", "7-0", "38-40", 18);
addNormEntry("wisc", "ps", "7-0", "41-45", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "7-4", "0", 1);
addNormEntry("wisc", "ps", "7-4", "1", 2);
addNormEntry("wisc", "ps", "7-4", "2-3", 3);
addNormEntry("wisc", "ps", "7-4", "4-5", 4);
addNormEntry("wisc", "ps", "7-4", "6-8", 5);
addNormEntry("wisc", "ps", "7-4", "9-11", 6);
addNormEntry("wisc", "ps", "7-4", "12-13", 7);
addNormEntry("wisc", "ps", "7-4", "14-16", 8);
addNormEntry("wisc", "ps", "7-4", "17-18", 9);
addNormEntry("wisc", "ps", "7-4", "19-21", 10);
addNormEntry("wisc", "ps", "7-4", "22-24", 11);
addNormEntry("wisc", "ps", "7-4", "25-26", 12);
addNormEntry("wisc", "ps", "7-4", "27-29", 13);
addNormEntry("wisc", "ps", "7-4", "30-31", 14);
addNormEntry("wisc", "ps", "7-4", "32-34", 15);
addNormEntry("wisc", "ps", "7-4", "35-36", 16);
addNormEntry("wisc", "ps", "7-4", "37-39", 17);
addNormEntry("wisc", "ps", "7-4", "40-42", 18);
addNormEntry("wisc", "ps", "7-4", "43-45", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "7-8", "0", 1);
addNormEntry("wisc", "ps", "7-8", "1-2", 2);
addNormEntry("wisc", "ps", "7-8", "3-4", 3);
addNormEntry("wisc", "ps", "7-8", "5-6", 4);
addNormEntry("wisc", "ps", "7-8", "7-9", 5);
addNormEntry("wisc", "ps", "7-8", "10-12", 6);
addNormEntry("wisc", "ps", "7-8", "13-15", 7);
addNormEntry("wisc", "ps", "7-8", "16-17", 8);
addNormEntry("wisc", "ps", "7-8", "18-20", 9);
addNormEntry("wisc", "ps", "7-8", "21-23", 10);
addNormEntry("wisc", "ps", "7-8", "24-26", 11);
addNormEntry("wisc", "ps", "7-8", "27-28", 12);
addNormEntry("wisc", "ps", "7-8", "29-31", 13);
addNormEntry("wisc", "ps", "7-8", "32-33", 14);
addNormEntry("wisc", "ps", "7-8", "34-36", 15);
addNormEntry("wisc", "ps", "7-8", "37-38", 16);
addNormEntry("wisc", "ps", "7-8", "39-41", 17);
addNormEntry("wisc", "ps", "7-8", "42-44", 18);
addNormEntry("wisc", "ps", "7-8", "45", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "8-0", "0", 1);
addNormEntry("wisc", "ps", "8-0", "1", 2);
addNormEntry("wisc", "ps", "8-0", "2", 3);
addNormEntry("wisc", "ps", "8-0", "3-4", 4);
addNormEntry("wisc", "ps", "8-0", "5", 5);
addNormEntry("wisc", "ps", "8-0", "6-7", 6);
addNormEntry("wisc", "ps", "8-0", "8-9", 7);
addNormEntry("wisc", "ps", "8-0", "10-11", 8);
addNormEntry("wisc", "ps", "8-0", "12-13", 9);
addNormEntry("wisc", "ps", "8-0", "14-15", 10);
addNormEntry("wisc", "ps", "8-0", "16-17", 11);
addNormEntry("wisc", "ps", "8-0", "18-19", 12);
addNormEntry("wisc", "ps", "8-0", "20-22", 13);
addNormEntry("wisc", "ps", "8-0", "23-24", 14);
addNormEntry("wisc", "ps", "8-0", "25-27", 15);
addNormEntry("wisc", "ps", "8-0", "28-29", 16);
addNormEntry("wisc", "ps", "8-0", "30-32", 17);
addNormEntry("wisc", "ps", "8-0", "33-34", 18);
addNormEntry("wisc", "ps", "8-0", "35-60", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "8-4", "0", 1);
addNormEntry("wisc", "ps", "8-4", "1", 2);
addNormEntry("wisc", "ps", "8-4", "2-3", 3);
addNormEntry("wisc", "ps", "8-4", "4-5", 4);
addNormEntry("wisc", "ps", "8-4", "6", 5);
addNormEntry("wisc", "ps", "8-4", "7-8", 6);
addNormEntry("wisc", "ps", "8-4", "9-10", 7);
addNormEntry("wisc", "ps", "8-4", "11-12", 8);
addNormEntry("wisc", "ps", "8-4", "13-14", 9);
addNormEntry("wisc", "ps", "8-4", "15-16", 10);
addNormEntry("wisc", "ps", "8-4", "17-18", 11);
addNormEntry("wisc", "ps", "8-4", "19-20", 12);
addNormEntry("wisc", "ps", "8-4", "21-23", 13);
addNormEntry("wisc", "ps", "8-4", "24-25", 14);
addNormEntry("wisc", "ps", "8-4", "26-27", 15);
addNormEntry("wisc", "ps", "8-4", "28-30", 16);
addNormEntry("wisc", "ps", "8-4", "31-33", 17);
addNormEntry("wisc", "ps", "8-4", "34-35", 18);
addNormEntry("wisc", "ps", "8-4", "36-60", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "8-8", "0", 1);
addNormEntry("wisc", "ps", "8-8", "1-2", 2);
addNormEntry("wisc", "ps", "8-8", "3", 3);
addNormEntry("wisc", "ps", "8-8", "4-5", 4);
addNormEntry("wisc", "ps", "8-8", "6-7", 5);
addNormEntry("wisc", "ps", "8-8", "8-9", 6);
addNormEntry("wisc", "ps", "8-8", "10-11", 7);
addNormEntry("wisc", "ps", "8-8", "12-13", 8);
addNormEntry("wisc", "ps", "8-8", "14-15", 9);
addNormEntry("wisc", "ps", "8-8", "16-17", 10);
addNormEntry("wisc", "ps", "8-8", "18-19", 11);
addNormEntry("wisc", "ps", "8-8", "20-21", 12);
addNormEntry("wisc", "ps", "8-8", "22-24", 13);
addNormEntry("wisc", "ps", "8-8", "25-26", 14);
addNormEntry("wisc", "ps", "8-8", "27-28", 15);
addNormEntry("wisc", "ps", "8-8", "29-31", 16);
addNormEntry("wisc", "ps", "8-8", "32-33", 17);
addNormEntry("wisc", "ps", "8-8", "34-35", 18);
addNormEntry("wisc", "ps", "8-8", "36-60", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "9-0", "0", 1);
addNormEntry("wisc", "ps", "9-0", "1-2", 2);
addNormEntry("wisc", "ps", "9-0", "3-4", 3);
addNormEntry("wisc", "ps", "9-0", "5-6", 4);
addNormEntry("wisc", "ps", "9-0", "7-8", 5);
addNormEntry("wisc", "ps", "9-0", "9-10", 6);
addNormEntry("wisc", "ps", "9-0", "11-12", 7);
addNormEntry("wisc", "ps", "9-0", "13-14", 8);
addNormEntry("wisc", "ps", "9-0", "15-16", 9);
addNormEntry("wisc", "ps", "9-0", "17-18", 10);
addNormEntry("wisc", "ps", "9-0", "19-20", 11);
addNormEntry("wisc", "ps", "9-0", "21-22", 12);
addNormEntry("wisc", "ps", "9-0", "23-24", 13);
addNormEntry("wisc", "ps", "9-0", "25-27", 14);
addNormEntry("wisc", "ps", "9-0", "28-29", 15);
addNormEntry("wisc", "ps", "9-0", "30-31", 16);
addNormEntry("wisc", "ps", "9-0", "32-34", 17);
addNormEntry("wisc", "ps", "9-0", "35-36", 18);
addNormEntry("wisc", "ps", "9-0", "37-60", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "9-4", "0", 1);
addNormEntry("wisc", "ps", "9-4", "1-2", 2);
addNormEntry("wisc", "ps", "9-4", "3-4", 3);
addNormEntry("wisc", "ps", "9-4", "5-6", 4);
addNormEntry("wisc", "ps", "9-4", "7-8", 5);
addNormEntry("wisc", "ps", "9-4", "9-10", 6);
addNormEntry("wisc", "ps", "9-4", "11-12", 7);
addNormEntry("wisc", "ps", "9-4", "13-14", 8);
addNormEntry("wisc", "ps", "9-4", "15-16", 9);
addNormEntry("wisc", "ps", "9-4", "17-18", 10);
addNormEntry("wisc", "ps", "9-4", "19-20", 11);
addNormEntry("wisc", "ps", "9-4", "21-23", 12);
addNormEntry("wisc", "ps", "9-4", "24-25", 13);
addNormEntry("wisc", "ps", "9-4", "26-27", 14);
addNormEntry("wisc", "ps", "9-4", "28-29", 15);
addNormEntry("wisc", "ps", "9-4", "30-32", 16);
addNormEntry("wisc", "ps", "9-4", "33-34", 17);
addNormEntry("wisc", "ps", "9-4", "35-36", 18);
addNormEntry("wisc", "ps", "9-4", "37-60", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "9-8", "0-1", 1);
addNormEntry("wisc", "ps", "9-8", "2-3", 2);
addNormEntry("wisc", "ps", "9-8", "4-5", 3);
addNormEntry("wisc", "ps", "9-8", "6-7", 4);
addNormEntry("wisc", "ps", "9-8", "8-9", 5);
addNormEntry("wisc", "ps", "9-8", "10-11", 6);
addNormEntry("wisc", "ps", "9-8", "12-13", 7);
addNormEntry("wisc", "ps", "9-8", "14-15", 8);
addNormEntry("wisc", "ps", "9-8", "16-17", 9);
addNormEntry("wisc", "ps", "9-8", "18-19", 10);
addNormEntry("wisc", "ps", "9-8", "20-21", 11);
addNormEntry("wisc", "ps", "9-8", "22-23", 12);
addNormEntry("wisc", "ps", "9-8", "24-25", 13);
addNormEntry("wisc", "ps", "9-8", "26-28", 14);
addNormEntry("wisc", "ps", "9-8", "29-30", 15);
addNormEntry("wisc", "ps", "9-8", "31-32", 16);
addNormEntry("wisc", "ps", "9-8", "33-34", 17);
addNormEntry("wisc", "ps", "9-8", "35-37", 18);
addNormEntry("wisc", "ps", "9-8", "38-60", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "10-0", "0-1", 1);
addNormEntry("wisc", "ps", "10-0", "2-3", 2);
addNormEntry("wisc", "ps", "10-0", "4-5", 3);
addNormEntry("wisc", "ps", "10-0", "6-7", 4);
addNormEntry("wisc", "ps", "10-0", "8-9", 5);
addNormEntry("wisc", "ps", "10-0", "10-11", 6);
addNormEntry("wisc", "ps", "10-0", "12-13", 7);
addNormEntry("wisc", "ps", "10-0", "14-15", 8);
addNormEntry("wisc", "ps", "10-0", "16-17", 9);
addNormEntry("wisc", "ps", "10-0", "18-19", 10);
addNormEntry("wisc", "ps", "10-0", "20-21", 11);
addNormEntry("wisc", "ps", "10-0", "22-24", 12);
addNormEntry("wisc", "ps", "10-0", "25-26", 13);
addNormEntry("wisc", "ps", "10-0", "27-28", 14);
addNormEntry("wisc", "ps", "10-0", "29-30", 15);
addNormEntry("wisc", "ps", "10-0", "31-32", 16);
addNormEntry("wisc", "ps", "10-0", "33-35", 17);
addNormEntry("wisc", "ps", "10-0", "36-37", 18);
addNormEntry("wisc", "ps", "10-0", "38-60", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "10-4", "0-1", 1);
addNormEntry("wisc", "ps", "10-4", "2-3", 2);
addNormEntry("wisc", "ps", "10-4", "4-5", 3);
addNormEntry("wisc", "ps", "10-4", "6-7", 4);
addNormEntry("wisc", "ps", "10-4", "8-9", 5);
addNormEntry("wisc", "ps", "10-4", "10-11", 6);
addNormEntry("wisc", "ps", "10-4", "12-14", 7);
addNormEntry("wisc", "ps", "10-4", "15-16", 8);
addNormEntry("wisc", "ps", "10-4", "17-18", 9);
addNormEntry("wisc", "ps", "10-4", "19-20", 10);
addNormEntry("wisc", "ps", "10-4", "21-22", 11);
addNormEntry("wisc", "ps", "10-4", "23-24", 12);
addNormEntry("wisc", "ps", "10-4", "25-26", 13);
addNormEntry("wisc", "ps", "10-4", "27-28", 14);
addNormEntry("wisc", "ps", "10-4", "29-31", 15);
addNormEntry("wisc", "ps", "10-4", "32-33", 16);
addNormEntry("wisc", "ps", "10-4", "34-35", 17);
addNormEntry("wisc", "ps", "10-4", "36-37", 18);
addNormEntry("wisc", "ps", "10-4", "38-60", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "10-8", "0-1", 1);
addNormEntry("wisc", "ps", "10-8", "2-3", 2);
addNormEntry("wisc", "ps", "10-8", "4-5", 3);
addNormEntry("wisc", "ps", "10-8", "6-8", 4);
addNormEntry("wisc", "ps", "10-8", "9-10", 5);
addNormEntry("wisc", "ps", "10-8", "11-12", 6);
addNormEntry("wisc", "ps", "10-8", "13-14", 7);
addNormEntry("wisc", "ps", "10-8", "15-16", 8);
addNormEntry("wisc", "ps", "10-8", "17-18", 9);
addNormEntry("wisc", "ps", "10-8", "19-20", 10);
addNormEntry("wisc", "ps", "10-8", "21-22", 11);
addNormEntry("wisc", "ps", "10-8", "23-25", 12);
addNormEntry("wisc", "ps", "10-8", "26-27", 13);
addNormEntry("wisc", "ps", "10-8", "28-29", 14);
addNormEntry("wisc", "ps", "10-8", "30-31", 15);
addNormEntry("wisc", "ps", "10-8", "32-33", 16);
addNormEntry("wisc", "ps", "10-8", "34-35", 17);
addNormEntry("wisc", "ps", "10-8", "36-38", 18);
addNormEntry("wisc", "ps", "10-8", "39-60", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "11-0", "0-1", 1);
addNormEntry("wisc", "ps", "11-0", "2-3", 2);
addNormEntry("wisc", "ps", "11-0", "4-5", 3);
addNormEntry("wisc", "ps", "11-0", "6-8", 4);
addNormEntry("wisc", "ps", "11-0", "9-10", 5);
addNormEntry("wisc", "ps", "11-0", "11-12", 6);
addNormEntry("wisc", "ps", "11-0", "13-14", 7);
addNormEntry("wisc", "ps", "11-0", "15-16", 8);
addNormEntry("wisc", "ps", "11-0", "17-19", 9);
addNormEntry("wisc", "ps", "11-0", "20-21", 10);
addNormEntry("wisc", "ps", "11-0", "22-23", 11);
addNormEntry("wisc", "ps", "11-0", "24-25", 12);
addNormEntry("wisc", "ps", "11-0", "26-27", 13);
addNormEntry("wisc", "ps", "11-0", "28-29", 14);
addNormEntry("wisc", "ps", "11-0", "30-31", 15);
addNormEntry("wisc", "ps", "11-0", "32-34", 16);
addNormEntry("wisc", "ps", "11-0", "35-36", 17);
addNormEntry("wisc", "ps", "11-0", "37-38", 18);
addNormEntry("wisc", "ps", "11-0", "39-60", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "11-4", "0-1", 1);
addNormEntry("wisc", "ps", "11-4", "2-3", 2);
addNormEntry("wisc", "ps", "11-4", "4-5", 3);
addNormEntry("wisc", "ps", "11-4", "6-8", 4);
addNormEntry("wisc", "ps", "11-4", "9-10", 5);
addNormEntry("wisc", "ps", "11-4", "11-13", 6);
addNormEntry("wisc", "ps", "11-4", "14-15", 7);
addNormEntry("wisc", "ps", "11-4", "16-17", 8);
addNormEntry("wisc", "ps", "11-4", "18-19", 9);
addNormEntry("wisc", "ps", "11-4", "20-22", 10);
addNormEntry("wisc", "ps", "11-4", "23-24", 11);
addNormEntry("wisc", "ps", "11-4", "25-26", 12);
addNormEntry("wisc", "ps", "11-4", "27-28", 13);
addNormEntry("wisc", "ps", "11-4", "29-30", 14);
addNormEntry("wisc", "ps", "11-4", "31-32", 15);
addNormEntry("wisc", "ps", "11-4", "33-34", 16);
addNormEntry("wisc", "ps", "11-4", "35-36", 17);
addNormEntry("wisc", "ps", "11-4", "37-39", 18);
addNormEntry("wisc", "ps", "11-4", "40-60", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "11-8", "0-2", 1);
addNormEntry("wisc", "ps", "11-8", "3-4", 2);
addNormEntry("wisc", "ps", "11-8", "5-6", 3);
addNormEntry("wisc", "ps", "11-8", "7-9", 4);
addNormEntry("wisc", "ps", "11-8", "10-11", 5);
addNormEntry("wisc", "ps", "11-8", "12-13", 6);
addNormEntry("wisc", "ps", "11-8", "14-15", 7);
addNormEntry("wisc", "ps", "11-8", "16-18", 8);
addNormEntry("wisc", "ps", "11-8", "19-20", 9);
addNormEntry("wisc", "ps", "11-8", "21-22", 10);
addNormEntry("wisc", "ps", "11-8", "23-24", 11);
addNormEntry("wisc", "ps", "11-8", "25-27", 12);
addNormEntry("wisc", "ps", "11-8", "28-29", 13);
addNormEntry("wisc", "ps", "11-8", "30-31", 14);
addNormEntry("wisc", "ps", "11-8", "32-33", 15);
addNormEntry("wisc", "ps", "11-8", "34-35", 16);
addNormEntry("wisc", "ps", "11-8", "36-37", 17);
addNormEntry("wisc", "ps", "11-8", "38-39", 18);
addNormEntry("wisc", "ps", "11-8", "40-60", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "12-0", "0-2", 1);
addNormEntry("wisc", "ps", "12-0", "3-4", 2);
addNormEntry("wisc", "ps", "12-0", "5-6", 3);
addNormEntry("wisc", "ps", "12-0", "7-9", 4);
addNormEntry("wisc", "ps", "12-0", "10-11", 5);
addNormEntry("wisc", "ps", "12-0", "12-13", 6);
addNormEntry("wisc", "ps", "12-0", "14-16", 7);
addNormEntry("wisc", "ps", "12-0", "17-18", 8);
addNormEntry("wisc", "ps", "12-0", "19-21", 9);
addNormEntry("wisc", "ps", "12-0", "22-23", 10);
addNormEntry("wisc", "ps", "12-0", "24-25", 11);
addNormEntry("wisc", "ps", "12-0", "26-27", 12);
addNormEntry("wisc", "ps", "12-0", "28-29", 13);
addNormEntry("wisc", "ps", "12-0", "30-31", 14);
addNormEntry("wisc", "ps", "12-0", "32-33", 15);
addNormEntry("wisc", "ps", "12-0", "34-35", 16);
addNormEntry("wisc", "ps", "12-0", "36-37", 17);
addNormEntry("wisc", "ps", "12-0", "38-40", 18);
addNormEntry("wisc", "ps", "12-0", "41-60", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "12-4", "0-2", 1);
addNormEntry("wisc", "ps", "12-4", "3-4", 2);
addNormEntry("wisc", "ps", "12-4", "5-6", 3);
addNormEntry("wisc", "ps", "12-4", "7-9", 4);
addNormEntry("wisc", "ps", "12-4", "10-11", 5);
addNormEntry("wisc", "ps", "12-4", "12-14", 6);
addNormEntry("wisc", "ps", "12-4", "15-16", 7);
addNormEntry("wisc", "ps", "12-4", "17-19", 8);
addNormEntry("wisc", "ps", "12-4", "20-21", 9);
addNormEntry("wisc", "ps", "12-4", "22-23", 10);
addNormEntry("wisc", "ps", "12-4", "24-26", 11);
addNormEntry("wisc", "ps", "12-4", "27-28", 12);
addNormEntry("wisc", "ps", "12-4", "29-30", 13);
addNormEntry("wisc", "ps", "12-4", "31-32", 14);
addNormEntry("wisc", "ps", "12-4", "33-34", 15);
addNormEntry("wisc", "ps", "12-4", "35-36", 16);
addNormEntry("wisc", "ps", "12-4", "37-38", 17);
addNormEntry("wisc", "ps", "12-4", "39-40", 18);
addNormEntry("wisc", "ps", "12-4", "41-60", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "12-8", "0-3", 1);
addNormEntry("wisc", "ps", "12-8", "4-5", 2);
addNormEntry("wisc", "ps", "12-8", "6-7", 3);
addNormEntry("wisc", "ps", "12-8", "8-10", 4);
addNormEntry("wisc", "ps", "12-8", "11-12", 5);
addNormEntry("wisc", "ps", "12-8", "13-14", 6);
addNormEntry("wisc", "ps", "12-8", "15-17", 7);
addNormEntry("wisc", "ps", "12-8", "18-19", 8);
addNormEntry("wisc", "ps", "12-8", "20-22", 9);
addNormEntry("wisc", "ps", "12-8", "23-24", 10);
addNormEntry("wisc", "ps", "12-8", "25-26", 11);
addNormEntry("wisc", "ps", "12-8", "27-29", 12);
addNormEntry("wisc", "ps", "12-8", "30-31", 13);
addNormEntry("wisc", "ps", "12-8", "32-33", 14);
addNormEntry("wisc", "ps", "12-8", "34-35", 15);
addNormEntry("wisc", "ps", "12-8", "36-37", 16);
addNormEntry("wisc", "ps", "12-8", "38-39", 17);
addNormEntry("wisc", "ps", "12-8", "40-41", 18);
addNormEntry("wisc", "ps", "12-8", "42-60", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "13-0", "0-3", 1);
addNormEntry("wisc", "ps", "13-0", "4-5", 2);
addNormEntry("wisc", "ps", "13-0", "6-7", 3);
addNormEntry("wisc", "ps", "13-0", "8-10", 4);
addNormEntry("wisc", "ps", "13-0", "11-12", 5);
addNormEntry("wisc", "ps", "13-0", "13-15", 6);
addNormEntry("wisc", "ps", "13-0", "16-17", 7);
addNormEntry("wisc", "ps", "13-0", "18-20", 8);
addNormEntry("wisc", "ps", "13-0", "21-22", 9);
addNormEntry("wisc", "ps", "13-0", "23-25", 10);
addNormEntry("wisc", "ps", "13-0", "26-27", 11);
addNormEntry("wisc", "ps", "13-0", "28-29", 12);
addNormEntry("wisc", "ps", "13-0", "30-31", 13);
addNormEntry("wisc", "ps", "13-0", "32-34", 14);
addNormEntry("wisc", "ps", "13-0", "35", 15);
addNormEntry("wisc", "ps", "13-0", "36-37", 16);
addNormEntry("wisc", "ps", "13-0", "38-39", 17);
addNormEntry("wisc", "ps", "13-0", "40-42", 18);
addNormEntry("wisc", "ps", "13-0", "43-60", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "13-4", "0-3", 1);
addNormEntry("wisc", "ps", "13-4", "4-5", 2);
addNormEntry("wisc", "ps", "13-4", "6-7", 3);
addNormEntry("wisc", "ps", "13-4", "8-10", 4);
addNormEntry("wisc", "ps", "13-4", "11-12", 5);
addNormEntry("wisc", "ps", "13-4", "13-15", 6);
addNormEntry("wisc", "ps", "13-4", "16-18", 7);
addNormEntry("wisc", "ps", "13-4", "19-20", 8);
addNormEntry("wisc", "ps", "13-4", "21-23", 9);
addNormEntry("wisc", "ps", "13-4", "24-25", 10);
addNormEntry("wisc", "ps", "13-4", "26-28", 11);
addNormEntry("wisc", "ps", "13-4", "29-30", 12);
addNormEntry("wisc", "ps", "13-4", "31-32", 13);
addNormEntry("wisc", "ps", "13-4", "33-34", 14);
addNormEntry("wisc", "ps", "13-4", "35-36", 15);
addNormEntry("wisc", "ps", "13-4", "37-38", 16);
addNormEntry("wisc", "ps", "13-4", "39-40", 17);
addNormEntry("wisc", "ps", "13-4", "41-43", 18);
addNormEntry("wisc", "ps", "13-4", "44-60", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "13-8", "0-4", 1);
addNormEntry("wisc", "ps", "13-8", "5-6", 2);
addNormEntry("wisc", "ps", "13-8", "7-8", 3);
addNormEntry("wisc", "ps", "13-8", "9-11", 4);
addNormEntry("wisc", "ps", "13-8", "12-13", 5);
addNormEntry("wisc", "ps", "13-8", "14-16", 6);
addNormEntry("wisc", "ps", "13-8", "17-18", 7);
addNormEntry("wisc", "ps", "13-8", "19-21", 8);
addNormEntry("wisc", "ps", "13-8", "22-24", 9);
addNormEntry("wisc", "ps", "13-8", "25-26", 10);
addNormEntry("wisc", "ps", "13-8", "27-29", 11);
addNormEntry("wisc", "ps", "13-8", "30-31", 12);
addNormEntry("wisc", "ps", "13-8", "32-33", 13);
addNormEntry("wisc", "ps", "13-8", "34-35", 14);
addNormEntry("wisc", "ps", "13-8", "36-37", 15);
addNormEntry("wisc", "ps", "13-8", "38-39", 16);
addNormEntry("wisc", "ps", "13-8", "40-41", 17);
addNormEntry("wisc", "ps", "13-8", "42-44", 18);
addNormEntry("wisc", "ps", "13-8", "45-60", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "14-0", "0-4", 1);
addNormEntry("wisc", "ps", "14-0", "5-6", 2);
addNormEntry("wisc", "ps", "14-0", "7-8", 3);
addNormEntry("wisc", "ps", "14-0", "9-11", 4);
addNormEntry("wisc", "ps", "14-0", "12-13", 5);
addNormEntry("wisc", "ps", "14-0", "14-16", 6);
addNormEntry("wisc", "ps", "14-0", "17-19", 7);
addNormEntry("wisc", "ps", "14-0", "20-22", 8);
addNormEntry("wisc", "ps", "14-0", "23-24", 9);
addNormEntry("wisc", "ps", "14-0", "25-27", 10);
addNormEntry("wisc", "ps", "14-0", "28-29", 11);
addNormEntry("wisc", "ps", "14-0", "30-32", 12);
addNormEntry("wisc", "ps", "14-0", "33-34", 13);
addNormEntry("wisc", "ps", "14-0", "35-36", 14);
addNormEntry("wisc", "ps", "14-0", "37-38", 15);
addNormEntry("wisc", "ps", "14-0", "39-40", 16);
addNormEntry("wisc", "ps", "14-0", "41-42", 17);
addNormEntry("wisc", "ps", "14-0", "43-45", 18);
addNormEntry("wisc", "ps", "14-0", "46-60", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "14-4", "0-4", 1);
addNormEntry("wisc", "ps", "14-4", "5-6", 2);
addNormEntry("wisc", "ps", "14-4", "7-8", 3);
addNormEntry("wisc", "ps", "14-4", "9-11", 4);
addNormEntry("wisc", "ps", "14-4", "12-13", 5);
addNormEntry("wisc", "ps", "14-4", "14-16", 6);
addNormEntry("wisc", "ps", "14-4", "17-19", 7);
addNormEntry("wisc", "ps", "14-4", "20-22", 8);
addNormEntry("wisc", "ps", "14-4", "23-25", 9);
addNormEntry("wisc", "ps", "14-4", "26-28", 10);
addNormEntry("wisc", "ps", "14-4", "29-30", 11);
addNormEntry("wisc", "ps", "14-4", "31-33", 12);
addNormEntry("wisc", "ps", "14-4", "34-35", 13);
addNormEntry("wisc", "ps", "14-4", "36-37", 14);
addNormEntry("wisc", "ps", "14-4", "38-39", 15);
addNormEntry("wisc", "ps", "14-4", "40-41", 16);
addNormEntry("wisc", "ps", "14-4", "42-43", 17);
addNormEntry("wisc", "ps", "14-4", "44-46", 18);
addNormEntry("wisc", "ps", "14-4", "47-60", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "14-8", "0-5", 1);
addNormEntry("wisc", "ps", "14-8", "6-7", 2);
addNormEntry("wisc", "ps", "14-8", "8-9", 3);
addNormEntry("wisc", "ps", "14-8", "10-12", 4);
addNormEntry("wisc", "ps", "14-8", "13-14", 5);
addNormEntry("wisc", "ps", "14-8", "15-17", 6);
addNormEntry("wisc", "ps", "14-8", "18-20", 7);
addNormEntry("wisc", "ps", "14-8", "21-23", 8);
addNormEntry("wisc", "ps", "14-8", "24-26", 9);
addNormEntry("wisc", "ps", "14-8", "27-28", 10);
addNormEntry("wisc", "ps", "14-8", "29-31", 11);
addNormEntry("wisc", "ps", "14-8", "32-33", 12);
addNormEntry("wisc", "ps", "14-8", "34-35", 13);
addNormEntry("wisc", "ps", "14-8", "36-38", 14);
addNormEntry("wisc", "ps", "14-8", "39-40", 15);
addNormEntry("wisc", "ps", "14-8", "41-42", 16);
addNormEntry("wisc", "ps", "14-8", "43-44", 17);
addNormEntry("wisc", "ps", "14-8", "45-47", 18);
addNormEntry("wisc", "ps", "14-8", "48-60", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "15-0", "0-5", 1);
addNormEntry("wisc", "ps", "15-0", "6-7", 2);
addNormEntry("wisc", "ps", "15-0", "8-9", 3);
addNormEntry("wisc", "ps", "15-0", "10-12", 4);
addNormEntry("wisc", "ps", "15-0", "13-14", 5);
addNormEntry("wisc", "ps", "15-0", "15-17", 6);
addNormEntry("wisc", "ps", "15-0", "18-20", 7);
addNormEntry("wisc", "ps", "15-0", "21-23", 8);
addNormEntry("wisc", "ps", "15-0", "24-26", 9);
addNormEntry("wisc", "ps", "15-0", "27-29", 10);
addNormEntry("wisc", "ps", "15-0", "30-31", 11);
addNormEntry("wisc", "ps", "15-0", "32-34", 12);
addNormEntry("wisc", "ps", "15-0", "35-36", 13);
addNormEntry("wisc", "ps", "15-0", "37-39", 14);
addNormEntry("wisc", "ps", "15-0", "40-41", 15);
addNormEntry("wisc", "ps", "15-0", "42-43", 16);
addNormEntry("wisc", "ps", "15-0", "44-45", 17);
addNormEntry("wisc", "ps", "15-0", "46-47", 18);
addNormEntry("wisc", "ps", "15-0", "48-60", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "15-4", "0-5", 1);
addNormEntry("wisc", "ps", "15-4", "6-7", 2);
addNormEntry("wisc", "ps", "15-4", "8-9", 3);
addNormEntry("wisc", "ps", "15-4", "10-12", 4);
addNormEntry("wisc", "ps", "15-4", "13-14", 5);
addNormEntry("wisc", "ps", "15-4", "15-17", 6);
addNormEntry("wisc", "ps", "15-4", "18-20", 7);
addNormEntry("wisc", "ps", "15-4", "21-23", 8);
addNormEntry("wisc", "ps", "15-4", "24-26", 9);
addNormEntry("wisc", "ps", "15-4", "27-29", 10);
addNormEntry("wisc", "ps", "15-4", "30-32", 11);
addNormEntry("wisc", "ps", "15-4", "33-35", 12);
addNormEntry("wisc", "ps", "15-4", "36-37", 13);
addNormEntry("wisc", "ps", "15-4", "38-39", 14);
addNormEntry("wisc", "ps", "15-4", "40-41", 15);
addNormEntry("wisc", "ps", "15-4", "42-43", 16);
addNormEntry("wisc", "ps", "15-4", "44-45", 17);
addNormEntry("wisc", "ps", "15-4", "46-48", 18);
addNormEntry("wisc", "ps", "15-4", "49-60", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "15-8", "0-6", 1);
addNormEntry("wisc", "ps", "15-8", "7-8", 2);
addNormEntry("wisc", "ps", "15-8", "9-10", 3);
addNormEntry("wisc", "ps", "15-8", "11-13", 4);
addNormEntry("wisc", "ps", "15-8", "14-15", 5);
addNormEntry("wisc", "ps", "15-8", "16-18", 6);
addNormEntry("wisc", "ps", "15-8", "19-21", 7);
addNormEntry("wisc", "ps", "15-8", "22-24", 8);
addNormEntry("wisc", "ps", "15-8", "25-27", 9);
addNormEntry("wisc", "ps", "15-8", "28-30", 10);
addNormEntry("wisc", "ps", "15-8", "31-33", 11);
addNormEntry("wisc", "ps", "15-8", "34-35", 12);
addNormEntry("wisc", "ps", "15-8", "36-37", 13);
addNormEntry("wisc", "ps", "15-8", "38-40", 14);
addNormEntry("wisc", "ps", "15-8", "41-42", 15);
addNormEntry("wisc", "ps", "15-8", "43-44", 16);
addNormEntry("wisc", "ps", "15-8", "45-46", 17);
addNormEntry("wisc", "ps", "15-8", "47-48", 18);
addNormEntry("wisc", "ps", "15-8", "49-60", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "16-0", "0-6", 1);
addNormEntry("wisc", "ps", "16-0", "7-8", 2);
addNormEntry("wisc", "ps", "16-0", "9-10", 3);
addNormEntry("wisc", "ps", "16-0", "11-13", 4);
addNormEntry("wisc", "ps", "16-0", "14-15", 5);
addNormEntry("wisc", "ps", "16-0", "16-18", 6);
addNormEntry("wisc", "ps", "16-0", "19-21", 7);
addNormEntry("wisc", "ps", "16-0", "22-24", 8);
addNormEntry("wisc", "ps", "16-0", "25-27", 9);
addNormEntry("wisc", "ps", "16-0", "28-30", 10);
addNormEntry("wisc", "ps", "16-0", "31-33", 11);
addNormEntry("wisc", "ps", "16-0", "34-36", 12);
addNormEntry("wisc", "ps", "16-0", "37-38", 13);
addNormEntry("wisc", "ps", "16-0", "39-40", 14);
addNormEntry("wisc", "ps", "16-0", "41-42", 15);
addNormEntry("wisc", "ps", "16-0", "43-44", 16);
addNormEntry("wisc", "ps", "16-0", "45-46", 17);
addNormEntry("wisc", "ps", "16-0", "47-49", 18);
addNormEntry("wisc", "ps", "16-0", "50-60", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Procurar Símbolos)
addNormEntry("wisc", "ps", "16-4", "0-6", 1);
addNormEntry("wisc", "ps", "16-4", "7-8", 2);
addNormEntry("wisc", "ps", "16-4", "9-10", 3);
addNormEntry("wisc", "ps", "16-4", "11-13", 4);
addNormEntry("wisc", "ps", "16-4", "14-15", 5);
addNormEntry("wisc", "ps", "16-4", "16-18", 6);
addNormEntry("wisc", "ps", "16-4", "19-21", 7);
addNormEntry("wisc", "ps", "16-4", "22-24", 8);
addNormEntry("wisc", "ps", "16-4", "25-27", 9);
addNormEntry("wisc", "ps", "16-4", "28-30", 10);
addNormEntry("wisc", "ps", "16-4", "31-33", 11);
addNormEntry("wisc", "ps", "16-4", "34-36", 12);
addNormEntry("wisc", "ps", "16-4", "37-38", 13);
addNormEntry("wisc", "ps", "16-4", "39-40", 14);
addNormEntry("wisc", "ps", "16-4", "41-42", 15);
addNormEntry("wisc", "ps", "16-4", "43-44", 16);
addNormEntry("wisc", "ps", "16-4", "45-46", 17);
addNormEntry("wisc", "ps", "16-4", "47-49", 18);
addNormEntry("wisc", "ps", "16-4", "50-60", 19);

// --- Normas do Subteste Completar Figuras (CF) ---

// FAIXA 6-0 — 6 anos (Completar Figuras)
addNormEntry("wisc", "cf", "6-0", "0", 1);
addNormEntry("wisc", "cf", "6-0", "-", 2);
addNormEntry("wisc", "cf", "6-0", "-", 3);
addNormEntry("wisc", "cf", "6-0", "1", 4);
addNormEntry("wisc", "cf", "6-0", "2-3", 5);
addNormEntry("wisc", "cf", "6-0", "4-5", 6);
addNormEntry("wisc", "cf", "6-0", "6", 7);
addNormEntry("wisc", "cf", "6-0", "7-8", 8);
addNormEntry("wisc", "cf", "6-0", "9-10", 9);
addNormEntry("wisc", "cf", "6-0", "11-12", 10);
addNormEntry("wisc", "cf", "6-0", "13-15", 11);
addNormEntry("wisc", "cf", "6-0", "16-17", 12);
addNormEntry("wisc", "cf", "6-0", "18-19", 13);
addNormEntry("wisc", "cf", "6-0", "20-21", 14);
addNormEntry("wisc", "cf", "6-0", "22-24", 15);
addNormEntry("wisc", "cf", "6-0", "25-26", 16);
addNormEntry("wisc", "cf", "6-0", "27-28", 17);
addNormEntry("wisc", "cf", "6-0", "29-31", 18);
addNormEntry("wisc", "cf", "6-0", "32-38", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "6-4", "0", 1);
addNormEntry("wisc", "cf", "6-4", "-", 2);
addNormEntry("wisc", "cf", "6-4", "1", 3);
addNormEntry("wisc", "cf", "6-4", "2", 4);
addNormEntry("wisc", "cf", "6-4", "3-4", 5);
addNormEntry("wisc", "cf", "6-4", "5-6", 6);
addNormEntry("wisc", "cf", "6-4", "7-8", 7);
addNormEntry("wisc", "cf", "6-4", "9-10", 8);
addNormEntry("wisc", "cf", "6-4", "11-12", 9);
addNormEntry("wisc", "cf", "6-4", "13", 10);
addNormEntry("wisc", "cf", "6-4", "14-15", 11);
addNormEntry("wisc", "cf", "6-4", "16-17", 12);
addNormEntry("wisc", "cf", "6-4", "18-20", 13);
addNormEntry("wisc", "cf", "6-4", "21-23", 14);
addNormEntry("wisc", "cf", "6-4", "24-25", 15);
addNormEntry("wisc", "cf", "6-4", "26-27", 16);
addNormEntry("wisc", "cf", "6-4", "28-29", 17);
addNormEntry("wisc", "cf", "6-4", "30-31", 18);
addNormEntry("wisc", "cf", "6-4", "32-38", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "6-8", "0", 1);
addNormEntry("wisc", "cf", "6-8", "1", 2);
addNormEntry("wisc", "cf", "6-8", "2", 3);
addNormEntry("wisc", "cf", "6-8", "3", 4);
addNormEntry("wisc", "cf", "6-8", "4-5", 5);
addNormEntry("wisc", "cf", "6-8", "6-7", 6);
addNormEntry("wisc", "cf", "6-8", "8-9", 7);
addNormEntry("wisc", "cf", "6-8", "10-11", 8);
addNormEntry("wisc", "cf", "6-8", "12-13", 9);
addNormEntry("wisc", "cf", "6-8", "14-15", 10);
addNormEntry("wisc", "cf", "6-8", "16-17", 11);
addNormEntry("wisc", "cf", "6-8", "18-19", 12);
addNormEntry("wisc", "cf", "6-8", "20-21", 13);
addNormEntry("wisc", "cf", "6-8", "22-23", 14);
addNormEntry("wisc", "cf", "6-8", "24-25", 15);
addNormEntry("wisc", "cf", "6-8", "26-27", 16);
addNormEntry("wisc", "cf", "6-8", "28-30", 17);
addNormEntry("wisc", "cf", "6-8", "31-32", 18);
addNormEntry("wisc", "cf", "6-8", "33-38", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "7-0", "0", 1);
addNormEntry("wisc", "cf", "7-0", "1", 2);
addNormEntry("wisc", "cf", "7-0", "2", 3);
addNormEntry("wisc", "cf", "7-0", "3-4", 4);
addNormEntry("wisc", "cf", "7-0", "5-6", 5);
addNormEntry("wisc", "cf", "7-0", "7-8", 6);
addNormEntry("wisc", "cf", "7-0", "9-10", 7);
addNormEntry("wisc", "cf", "7-0", "11-12", 8);
addNormEntry("wisc", "cf", "7-0", "13-14", 9);
addNormEntry("wisc", "cf", "7-0", "15-16", 10);
addNormEntry("wisc", "cf", "7-0", "17-18", 11);
addNormEntry("wisc", "cf", "7-0", "19-20", 12);
addNormEntry("wisc", "cf", "7-0", "21-22", 13);
addNormEntry("wisc", "cf", "7-0", "23-24", 14);
addNormEntry("wisc", "cf", "7-0", "25-26", 15);
addNormEntry("wisc", "cf", "7-0", "27-28", 16);
addNormEntry("wisc", "cf", "7-0", "29-30", 17);
addNormEntry("wisc", "cf", "7-0", "31-32", 18);
addNormEntry("wisc", "cf", "7-0", "33-38", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "7-4", "0", 1);
addNormEntry("wisc", "cf", "7-4", "1", 2);
addNormEntry("wisc", "cf", "7-4", "2-3", 3);
addNormEntry("wisc", "cf", "7-4", "4-5", 4);
addNormEntry("wisc", "cf", "7-4", "6-7", 5);
addNormEntry("wisc", "cf", "7-4", "8-9", 6);
addNormEntry("wisc", "cf", "7-4", "10-11", 7);
addNormEntry("wisc", "cf", "7-4", "12-13", 8);
addNormEntry("wisc", "cf", "7-4", "14-15", 9);
addNormEntry("wisc", "cf", "7-4", "16-17", 10);
addNormEntry("wisc", "cf", "7-4", "18-19", 11);
addNormEntry("wisc", "cf", "7-4", "20-21", 12);
addNormEntry("wisc", "cf", "7-4", "22-23", 13);
addNormEntry("wisc", "cf", "7-4", "24-25", 14);
addNormEntry("wisc", "cf", "7-4", "26-27", 15);
addNormEntry("wisc", "cf", "7-4", "28-29", 16);
addNormEntry("wisc", "cf", "7-4", "30-31", 17);
addNormEntry("wisc", "cf", "7-4", "32-33", 18);
addNormEntry("wisc", "cf", "7-4", "34-38", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "7-8", "0", 1);
addNormEntry("wisc", "cf", "7-8", "1-2", 2);
addNormEntry("wisc", "cf", "7-8", "3-4", 3);
addNormEntry("wisc", "cf", "7-8", "5-6", 4);
addNormEntry("wisc", "cf", "7-8", "7-8", 5);
addNormEntry("wisc", "cf", "7-8", "9-10", 6);
addNormEntry("wisc", "cf", "7-8", "11-12", 7);
addNormEntry("wisc", "cf", "7-8", "13-14", 8);
addNormEntry("wisc", "cf", "7-8", "15-16", 9);
addNormEntry("wisc", "cf", "7-8", "17-18", 10);
addNormEntry("wisc", "cf", "7-8", "19-20", 11);
addNormEntry("wisc", "cf", "7-8", "21", 12);
addNormEntry("wisc", "cf", "7-8", "22-23", 13);
addNormEntry("wisc", "cf", "7-8", "24-25", 14);
addNormEntry("wisc", "cf", "7-8", "26-27", 15);
addNormEntry("wisc", "cf", "7-8", "28-29", 16);
addNormEntry("wisc", "cf", "7-8", "30-31", 17);
addNormEntry("wisc", "cf", "7-8", "32-33", 18);
addNormEntry("wisc", "cf", "7-8", "34-38", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "8-0", "0-1", 1);
addNormEntry("wisc", "cf", "8-0", "2-3", 2);
addNormEntry("wisc", "cf", "8-0", "4-5", 3);
addNormEntry("wisc", "cf", "8-0", "6-7", 4);
addNormEntry("wisc", "cf", "8-0", "8-9", 5);
addNormEntry("wisc", "cf", "8-0", "10-11", 6);
addNormEntry("wisc", "cf", "8-0", "12-13", 7);
addNormEntry("wisc", "cf", "8-0", "14-15", 8);
addNormEntry("wisc", "cf", "8-0", "16", 9);
addNormEntry("wisc", "cf", "8-0", "17-18", 10);
addNormEntry("wisc", "cf", "8-0", "19-20", 11);
addNormEntry("wisc", "cf", "8-0", "21-22", 12);
addNormEntry("wisc", "cf", "8-0", "23-24", 13);
addNormEntry("wisc", "cf", "8-0", "25-26", 14);
addNormEntry("wisc", "cf", "8-0", "27-28", 15);
addNormEntry("wisc", "cf", "8-0", "29-30", 16);
addNormEntry("wisc", "cf", "8-0", "31-32", 17);
addNormEntry("wisc", "cf", "8-0", "33-34", 18);
addNormEntry("wisc", "cf", "8-0", "35-38", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "8-4", "0-1", 1);
addNormEntry("wisc", "cf", "8-4", "2-3", 2);
addNormEntry("wisc", "cf", "8-4", "4-5", 3);
addNormEntry("wisc", "cf", "8-4", "6-7", 4);
addNormEntry("wisc", "cf", "8-4", "8-9", 5);
addNormEntry("wisc", "cf", "8-4", "10-11", 6);
addNormEntry("wisc", "cf", "8-4", "12-13", 7);
addNormEntry("wisc", "cf", "8-4", "14-15", 8);
addNormEntry("wisc", "cf", "8-4", "16-17", 9);
addNormEntry("wisc", "cf", "8-4", "18-19", 10);
addNormEntry("wisc", "cf", "8-4", "20-21", 11);
addNormEntry("wisc", "cf", "8-4", "22-23", 12);
addNormEntry("wisc", "cf", "8-4", "24-25", 13);
addNormEntry("wisc", "cf", "8-4", "26-27", 14);
addNormEntry("wisc", "cf", "8-4", "28-29", 15);
addNormEntry("wisc", "cf", "8-4", "30", 16);
addNormEntry("wisc", "cf", "8-4", "31-32", 17);
addNormEntry("wisc", "cf", "8-4", "33-34", 18);
addNormEntry("wisc", "cf", "8-4", "35-38", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "8-8", "0-2", 1);
addNormEntry("wisc", "cf", "8-8", "3-4", 2);
addNormEntry("wisc", "cf", "8-8", "5-6", 3);
addNormEntry("wisc", "cf", "8-8", "7-8", 4);
addNormEntry("wisc", "cf", "8-8", "9-10", 5);
addNormEntry("wisc", "cf", "8-8", "11-12", 6);
addNormEntry("wisc", "cf", "8-8", "13-14", 7);
addNormEntry("wisc", "cf", "8-8", "15-16", 8);
addNormEntry("wisc", "cf", "8-8", "17-18", 9);
addNormEntry("wisc", "cf", "8-8", "19-20", 10);
addNormEntry("wisc", "cf", "8-8", "21-22", 11);
addNormEntry("wisc", "cf", "8-8", "23-24", 12);
addNormEntry("wisc", "cf", "8-8", "25", 13);
addNormEntry("wisc", "cf", "8-8", "26-27", 14);
addNormEntry("wisc", "cf", "8-8", "28-29", 15);
addNormEntry("wisc", "cf", "8-8", "30-31", 16);
addNormEntry("wisc", "cf", "8-8", "32-33", 17);
addNormEntry("wisc", "cf", "8-8", "34", 18);
addNormEntry("wisc", "cf", "8-8", "35-38", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "9-0", "0-3", 1);
addNormEntry("wisc", "cf", "9-0", "4-5", 2);
addNormEntry("wisc", "cf", "9-0", "6-7", 3);
addNormEntry("wisc", "cf", "9-0", "8-9", 4);
addNormEntry("wisc", "cf", "9-0", "10-11", 5);
addNormEntry("wisc", "cf", "9-0", "12-13", 6);
addNormEntry("wisc", "cf", "9-0", "14-15", 7);
addNormEntry("wisc", "cf", "9-0", "16-17", 8);
addNormEntry("wisc", "cf", "9-0", "18-19", 9);
addNormEntry("wisc", "cf", "9-0", "20-21", 10);
addNormEntry("wisc", "cf", "9-0", "22", 11);
addNormEntry("wisc", "cf", "9-0", "23-24", 12);
addNormEntry("wisc", "cf", "9-0", "25-26", 13);
addNormEntry("wisc", "cf", "9-0", "27-28", 14);
addNormEntry("wisc", "cf", "9-0", "29-30", 15);
addNormEntry("wisc", "cf", "9-0", "31", 16);
addNormEntry("wisc", "cf", "9-0", "32-33", 17);
addNormEntry("wisc", "cf", "9-0", "34-35", 18);
addNormEntry("wisc", "cf", "9-0", "36-38", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "9-4", "0-3", 1);
addNormEntry("wisc", "cf", "9-4", "4-5", 2);
addNormEntry("wisc", "cf", "9-4", "6-7", 3);
addNormEntry("wisc", "cf", "9-4", "8-9", 4);
addNormEntry("wisc", "cf", "9-4", "10-11", 5);
addNormEntry("wisc", "cf", "9-4", "12-13", 6);
addNormEntry("wisc", "cf", "9-4", "14-15", 7);
addNormEntry("wisc", "cf", "9-4", "16-17", 8);
addNormEntry("wisc", "cf", "9-4", "18-19", 9);
addNormEntry("wisc", "cf", "9-4", "20-21", 10);
addNormEntry("wisc", "cf", "9-4", "22-23", 11);
addNormEntry("wisc", "cf", "9-4", "24-25", 12);
addNormEntry("wisc", "cf", "9-4", "26-27", 13);
addNormEntry("wisc", "cf", "9-4", "28", 14);
addNormEntry("wisc", "cf", "9-4", "29-30", 15);
addNormEntry("wisc", "cf", "9-4", "31-32", 16);
addNormEntry("wisc", "cf", "9-4", "33", 17);
addNormEntry("wisc", "cf", "9-4", "34-35", 18);
addNormEntry("wisc", "cf", "9-4", "36-38", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "9-8", "0-4", 1);
addNormEntry("wisc", "cf", "9-8", "5-6", 2);
addNormEntry("wisc", "cf", "9-8", "7-8", 3);
addNormEntry("wisc", "cf", "9-8", "9-10", 4);
addNormEntry("wisc", "cf", "9-8", "11-12", 5);
addNormEntry("wisc", "cf", "9-8", "13-14", 6);
addNormEntry("wisc", "cf", "9-8", "15-16", 7);
addNormEntry("wisc", "cf", "9-8", "17-18", 8);
addNormEntry("wisc", "cf", "9-8", "19-20", 9);
addNormEntry("wisc", "cf", "9-8", "21-22", 10);
addNormEntry("wisc", "cf", "9-8", "23-24", 11);
addNormEntry("wisc", "cf", "9-8", "25", 12);
addNormEntry("wisc", "cf", "9-8", "26-27", 13);
addNormEntry("wisc", "cf", "9-8", "28-29", 14);
addNormEntry("wisc", "cf", "9-8", "30", 15);
addNormEntry("wisc", "cf", "9-8", "31-32", 16);
addNormEntry("wisc", "cf", "9-8", "33-34", 17);
addNormEntry("wisc", "cf", "9-8", "35", 18);
addNormEntry("wisc", "cf", "9-8", "36-38", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "10-0", "0-4", 1);
addNormEntry("wisc", "cf", "10-0", "5-6", 2);
addNormEntry("wisc", "cf", "10-0", "7-9", 3);
addNormEntry("wisc", "cf", "10-0", "10-11", 4);
addNormEntry("wisc", "cf", "10-0", "12-13", 5);
addNormEntry("wisc", "cf", "10-0", "14-15", 6);
addNormEntry("wisc", "cf", "10-0", "16-17", 7);
addNormEntry("wisc", "cf", "10-0", "18-19", 8);
addNormEntry("wisc", "cf", "10-0", "20", 9);
addNormEntry("wisc", "cf", "10-0", "21-22", 10);
addNormEntry("wisc", "cf", "10-0", "23-24", 11);
addNormEntry("wisc", "cf", "10-0", "25-26", 12);
addNormEntry("wisc", "cf", "10-0", "27-28", 13);
addNormEntry("wisc", "cf", "10-0", "29", 14);
addNormEntry("wisc", "cf", "10-0", "30-31", 15);
addNormEntry("wisc", "cf", "10-0", "32", 16);
addNormEntry("wisc", "cf", "10-0", "33-34", 17);
addNormEntry("wisc", "cf", "10-0", "35", 18);
addNormEntry("wisc", "cf", "10-0", "36-38", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "10-4", "0-5", 1);
addNormEntry("wisc", "cf", "10-4", "6-7", 2);
addNormEntry("wisc", "cf", "10-4", "8-9", 3);
addNormEntry("wisc", "cf", "10-4", "10-11", 4);
addNormEntry("wisc", "cf", "10-4", "12-13", 5);
addNormEntry("wisc", "cf", "10-4", "14-15", 6);
addNormEntry("wisc", "cf", "10-4", "16-17", 7);
addNormEntry("wisc", "cf", "10-4", "18-19", 8);
addNormEntry("wisc", "cf", "10-4", "20-21", 9);
addNormEntry("wisc", "cf", "10-4", "22-23", 10);
addNormEntry("wisc", "cf", "10-4", "24-25", 11);
addNormEntry("wisc", "cf", "10-4", "26", 12);
addNormEntry("wisc", "cf", "10-4", "27-28", 13);
addNormEntry("wisc", "cf", "10-4", "29-30", 14);
addNormEntry("wisc", "cf", "10-4", "31", 15);
addNormEntry("wisc", "cf", "10-4", "32-33", 16);
addNormEntry("wisc", "cf", "10-4", "34", 17);
addNormEntry("wisc", "cf", "10-4", "35-36", 18);
addNormEntry("wisc", "cf", "10-4", "37-38", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "10-8", "0-5", 1);
addNormEntry("wisc", "cf", "10-8", "6-8", 2);
addNormEntry("wisc", "cf", "10-8", "9-10", 3);
addNormEntry("wisc", "cf", "10-8", "11-12", 4);
addNormEntry("wisc", "cf", "10-8", "13-14", 5);
addNormEntry("wisc", "cf", "10-8", "15-16", 6);
addNormEntry("wisc", "cf", "10-8", "17-18", 7);
addNormEntry("wisc", "cf", "10-8", "19-20", 8);
addNormEntry("wisc", "cf", "10-8", "21", 9);
addNormEntry("wisc", "cf", "10-8", "22-23", 10);
addNormEntry("wisc", "cf", "10-8", "24-25", 11);
addNormEntry("wisc", "cf", "10-8", "26-27", 12);
addNormEntry("wisc", "cf", "10-8", "28", 13);
addNormEntry("wisc", "cf", "10-8", "29-30", 14);
addNormEntry("wisc", "cf", "10-8", "31-32", 15);
addNormEntry("wisc", "cf", "10-8", "33", 16);
addNormEntry("wisc", "cf", "10-8", "34-35", 17);
addNormEntry("wisc", "cf", "10-8", "36", 18);
addNormEntry("wisc", "cf", "10-8", "37-38", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "11-0", "0-6", 1);
addNormEntry("wisc", "cf", "11-0", "7-8", 2);
addNormEntry("wisc", "cf", "11-0", "9-10", 3);
addNormEntry("wisc", "cf", "11-0", "11-12", 4);
addNormEntry("wisc", "cf", "11-0", "13-14", 5);
addNormEntry("wisc", "cf", "11-0", "15-16", 6);
addNormEntry("wisc", "cf", "11-0", "17-18", 7);
addNormEntry("wisc", "cf", "11-0", "19-20", 8);
addNormEntry("wisc", "cf", "11-0", "21-22", 9);
addNormEntry("wisc", "cf", "11-0", "23-24", 10);
addNormEntry("wisc", "cf", "11-0", "25-26", 11);
addNormEntry("wisc", "cf", "11-0", "27", 12);
addNormEntry("wisc", "cf", "11-0", "28-29", 13);
addNormEntry("wisc", "cf", "11-0", "30", 14);
addNormEntry("wisc", "cf", "11-0", "31-32", 15);
addNormEntry("wisc", "cf", "11-0", "33", 16);
addNormEntry("wisc", "cf", "11-0", "34-35", 17);
addNormEntry("wisc", "cf", "11-0", "36", 18);
addNormEntry("wisc", "cf", "11-0", "37-38", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "11-4", "0-6", 1);
addNormEntry("wisc", "cf", "11-4", "7-9", 2);
addNormEntry("wisc", "cf", "11-4", "10-11", 3);
addNormEntry("wisc", "cf", "11-4", "12-13", 4);
addNormEntry("wisc", "cf", "11-4", "14-15", 5);
addNormEntry("wisc", "cf", "11-4", "16-17", 6);
addNormEntry("wisc", "cf", "11-4", "18-19", 7);
addNormEntry("wisc", "cf", "11-4", "20-21", 8);
addNormEntry("wisc", "cf", "11-4", "22", 9);
addNormEntry("wisc", "cf", "11-4", "23-24", 10);
addNormEntry("wisc", "cf", "11-4", "25-26", 11);
addNormEntry("wisc", "cf", "11-4", "27-28", 12);
addNormEntry("wisc", "cf", "11-4", "29", 13);
addNormEntry("wisc", "cf", "11-4", "30-31", 14);
addNormEntry("wisc", "cf", "11-4", "32", 15);
addNormEntry("wisc", "cf", "11-4", "33-34", 16);
addNormEntry("wisc", "cf", "11-4", "35", 17);
addNormEntry("wisc", "cf", "11-4", "36", 18);
addNormEntry("wisc", "cf", "11-4", "37-38", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "11-8", "0-7", 1);
addNormEntry("wisc", "cf", "11-8", "8-9", 2);
addNormEntry("wisc", "cf", "11-8", "10-11", 3);
addNormEntry("wisc", "cf", "11-8", "12-13", 4);
addNormEntry("wisc", "cf", "11-8", "14-15", 5);
addNormEntry("wisc", "cf", "11-8", "16-17", 6);
addNormEntry("wisc", "cf", "11-8", "18-19", 7);
addNormEntry("wisc", "cf", "11-8", "20-21", 8);
addNormEntry("wisc", "cf", "11-8", "22-23", 9);
addNormEntry("wisc", "cf", "11-8", "24-25", 10);
addNormEntry("wisc", "cf", "11-8", "26", 11);
addNormEntry("wisc", "cf", "11-8", "27-28", 12);
addNormEntry("wisc", "cf", "11-8", "29-30", 13);
addNormEntry("wisc", "cf", "11-8", "31", 14);
addNormEntry("wisc", "cf", "11-8", "32-33", 15);
addNormEntry("wisc", "cf", "11-8", "34", 16);
addNormEntry("wisc", "cf", "11-8", "35", 17);
addNormEntry("wisc", "cf", "11-8", "36", 18);
addNormEntry("wisc", "cf", "11-8", "37-38", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "12-0", "0-7", 1);
addNormEntry("wisc", "cf", "12-0", "8-9", 2);
addNormEntry("wisc", "cf", "12-0", "10-11", 3);
addNormEntry("wisc", "cf", "12-0", "12-14", 4);
addNormEntry("wisc", "cf", "12-0", "15-16", 5);
addNormEntry("wisc", "cf", "12-0", "17-18", 6);
addNormEntry("wisc", "cf", "12-0", "19", 7);
addNormEntry("wisc", "cf", "12-0", "20-21", 8);
addNormEntry("wisc", "cf", "12-0", "22-23", 9);
addNormEntry("wisc", "cf", "12-0", "24-25", 10);
addNormEntry("wisc", "cf", "12-0", "26-27", 11);
addNormEntry("wisc", "cf", "12-0", "28", 12);
addNormEntry("wisc", "cf", "12-0", "29-30", 13);
addNormEntry("wisc", "cf", "12-0", "31-32", 14);
addNormEntry("wisc", "cf", "12-0", "33", 15);
addNormEntry("wisc", "cf", "12-0", "34", 16);
addNormEntry("wisc", "cf", "12-0", "35", 17);
addNormEntry("wisc", "cf", "12-0", "36", 18);
addNormEntry("wisc", "cf", "12-0", "37-38", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "12-4", "0-8", 1);
addNormEntry("wisc", "cf", "12-4", "9-10", 2);
addNormEntry("wisc", "cf", "12-4", "11-12", 3);
addNormEntry("wisc", "cf", "12-4", "13-14", 4);
addNormEntry("wisc", "cf", "12-4", "15-16", 5);
addNormEntry("wisc", "cf", "12-4", "17-18", 6);
addNormEntry("wisc", "cf", "12-4", "19-20", 7);
addNormEntry("wisc", "cf", "12-4", "21-22", 8);
addNormEntry("wisc", "cf", "12-4", "23-24", 9);
addNormEntry("wisc", "cf", "12-4", "25", 10);
addNormEntry("wisc", "cf", "12-4", "26-27", 11);
addNormEntry("wisc", "cf", "12-4", "28-29", 12);
addNormEntry("wisc", "cf", "12-4", "30", 13);
addNormEntry("wisc", "cf", "12-4", "31-32", 14);
addNormEntry("wisc", "cf", "12-4", "33", 15);
addNormEntry("wisc", "cf", "12-4", "34-35", 16);
addNormEntry("wisc", "cf", "12-4", "36", 17);
addNormEntry("wisc", "cf", "12-4", "37", 18);
addNormEntry("wisc", "cf", "12-4", "38", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "12-8", "0-8", 1);
addNormEntry("wisc", "cf", "12-8", "9-10", 2);
addNormEntry("wisc", "cf", "12-8", "11-12", 3);
addNormEntry("wisc", "cf", "12-8", "13-14", 4);
addNormEntry("wisc", "cf", "12-8", "15-16", 5);
addNormEntry("wisc", "cf", "12-8", "17-18", 6);
addNormEntry("wisc", "cf", "12-8", "19-20", 7);
addNormEntry("wisc", "cf", "12-8", "21-22", 8);
addNormEntry("wisc", "cf", "12-8", "23-24", 9);
addNormEntry("wisc", "cf", "12-8", "25-26", 10);
addNormEntry("wisc", "cf", "12-8", "27-28", 11);
addNormEntry("wisc", "cf", "12-8", "29", 12);
addNormEntry("wisc", "cf", "12-8", "30-31", 13);
addNormEntry("wisc", "cf", "12-8", "32", 14);
addNormEntry("wisc", "cf", "12-8", "33", 15);
addNormEntry("wisc", "cf", "12-8", "34-35", 16);
addNormEntry("wisc", "cf", "12-8", "36", 17);
addNormEntry("wisc", "cf", "12-8", "37", 18);
addNormEntry("wisc", "cf", "12-8", "38", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "13-0", "0-8", 1);
addNormEntry("wisc", "cf", "13-0", "9-10", 2);
addNormEntry("wisc", "cf", "13-0", "11-13", 3);
addNormEntry("wisc", "cf", "13-0", "14-15", 4);
addNormEntry("wisc", "cf", "13-0", "16-17", 5);
addNormEntry("wisc", "cf", "13-0", "18-19", 6);
addNormEntry("wisc", "cf", "13-0", "20-21", 7);
addNormEntry("wisc", "cf", "13-0", "22-23", 8);
addNormEntry("wisc", "cf", "13-0", "24", 9);
addNormEntry("wisc", "cf", "13-0", "25-26", 10);
addNormEntry("wisc", "cf", "13-0", "27-28", 11);
addNormEntry("wisc", "cf", "13-0", "29", 12);
addNormEntry("wisc", "cf", "13-0", "30-31", 13);
addNormEntry("wisc", "cf", "13-0", "32", 14);
addNormEntry("wisc", "cf", "13-0", "33-34", 15);
addNormEntry("wisc", "cf", "13-0", "35", 16);
addNormEntry("wisc", "cf", "13-0", "36", 17);
addNormEntry("wisc", "cf", "13-0", "37", 18);
addNormEntry("wisc", "cf", "13-0", "38", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "13-4", "0-8", 1);
addNormEntry("wisc", "cf", "13-4", "9-11", 2);
addNormEntry("wisc", "cf", "13-4", "12-13", 3);
addNormEntry("wisc", "cf", "13-4", "14-15", 4);
addNormEntry("wisc", "cf", "13-4", "16-17", 5);
addNormEntry("wisc", "cf", "13-4", "18-19", 6);
addNormEntry("wisc", "cf", "13-4", "20-21", 7);
addNormEntry("wisc", "cf", "13-4", "22-23", 8);
addNormEntry("wisc", "cf", "13-4", "24-25", 9);
addNormEntry("wisc", "cf", "13-4", "26-27", 10);
addNormEntry("wisc", "cf", "13-4", "28", 11);
addNormEntry("wisc", "cf", "13-4", "29-30", 12);
addNormEntry("wisc", "cf", "13-4", "31", 13);
addNormEntry("wisc", "cf", "13-4", "32-33", 14);
addNormEntry("wisc", "cf", "13-4", "34", 15);
addNormEntry("wisc", "cf", "13-4", "35", 16);
addNormEntry("wisc", "cf", "13-4", "36", 17);
addNormEntry("wisc", "cf", "13-4", "37", 18);
addNormEntry("wisc", "cf", "13-4", "38", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "13-8", "0-9", 1);
addNormEntry("wisc", "cf", "13-8", "10-11", 2);
addNormEntry("wisc", "cf", "13-8", "12-13", 3);
addNormEntry("wisc", "cf", "13-8", "14-15", 4);
addNormEntry("wisc", "cf", "13-8", "16-17", 5);
addNormEntry("wisc", "cf", "13-8", "18-19", 6);
addNormEntry("wisc", "cf", "13-8", "20-21", 7);
addNormEntry("wisc", "cf", "13-8", "22-23", 8);
addNormEntry("wisc", "cf", "13-8", "24-25", 9);
addNormEntry("wisc", "cf", "13-8", "26-27", 10);
addNormEntry("wisc", "cf", "13-8", "28-29", 11);
addNormEntry("wisc", "cf", "13-8", "30", 12);
addNormEntry("wisc", "cf", "13-8", "31-32", 13);
addNormEntry("wisc", "cf", "13-8", "33", 14);
addNormEntry("wisc", "cf", "13-8", "34", 15);
addNormEntry("wisc", "cf", "13-8", "35", 16);
addNormEntry("wisc", "cf", "13-8", "36", 17);
addNormEntry("wisc", "cf", "13-8", "37", 18);
addNormEntry("wisc", "cf", "13-8", "38", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "14-0", "0-9", 1);
addNormEntry("wisc", "cf", "14-0", "10-11", 2);
addNormEntry("wisc", "cf", "14-0", "12-14", 3);
addNormEntry("wisc", "cf", "14-0", "15-16", 4);
addNormEntry("wisc", "cf", "14-0", "17-18", 5);
addNormEntry("wisc", "cf", "14-0", "19-20", 6);
addNormEntry("wisc", "cf", "14-0", "21-22", 7);
addNormEntry("wisc", "cf", "14-0", "23-24", 8);
addNormEntry("wisc", "cf", "14-0", "25-26", 9);
addNormEntry("wisc", "cf", "14-0", "27", 10);
addNormEntry("wisc", "cf", "14-0", "28-29", 11);
addNormEntry("wisc", "cf", "14-0", "30", 12);
addNormEntry("wisc", "cf", "14-0", "31-32", 13);
addNormEntry("wisc", "cf", "14-0", "33", 14);
addNormEntry("wisc", "cf", "14-0", "34-35", 15);
addNormEntry("wisc", "cf", "14-0", "36", 16);
addNormEntry("wisc", "cf", "14-0", "-", 17);
addNormEntry("wisc", "cf", "14-0", "37", 18);
addNormEntry("wisc", "cf", "14-0", "38", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "14-4", "0-9", 1);
addNormEntry("wisc", "cf", "14-4", "10-12", 2);
addNormEntry("wisc", "cf", "14-4", "13-14", 3);
addNormEntry("wisc", "cf", "14-4", "15-16", 4);
addNormEntry("wisc", "cf", "14-4", "17-18", 5);
addNormEntry("wisc", "cf", "14-4", "19-20", 6);
addNormEntry("wisc", "cf", "14-4", "21-22", 7);
addNormEntry("wisc", "cf", "14-4", "23-24", 8);
addNormEntry("wisc", "cf", "14-4", "25-26", 9);
addNormEntry("wisc", "cf", "14-4", "27-28", 10);
addNormEntry("wisc", "cf", "14-4", "29", 11);
addNormEntry("wisc", "cf", "14-4", "30-31", 12);
addNormEntry("wisc", "cf", "14-4", "32", 13);
addNormEntry("wisc", "cf", "14-4", "33-34", 14);
addNormEntry("wisc", "cf", "14-4", "35", 15);
addNormEntry("wisc", "cf", "14-4", "36", 16);
addNormEntry("wisc", "cf", "14-4", "-", 17);
addNormEntry("wisc", "cf", "14-4", "37", 18);
addNormEntry("wisc", "cf", "14-4", "38", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "14-8", "0-9", 1);
addNormEntry("wisc", "cf", "14-8", "10-12", 2);
addNormEntry("wisc", "cf", "14-8", "13-14", 3);
addNormEntry("wisc", "cf", "14-8", "15-16", 4);
addNormEntry("wisc", "cf", "14-8", "17-18", 5);
addNormEntry("wisc", "cf", "14-8", "19-20", 6);
addNormEntry("wisc", "cf", "14-8", "21-22", 7);
addNormEntry("wisc", "cf", "14-8", "23-24", 8);
addNormEntry("wisc", "cf", "14-8", "25-26", 9);
addNormEntry("wisc", "cf", "14-8", "27-28", 10);
addNormEntry("wisc", "cf", "14-8", "29", 11);
addNormEntry("wisc", "cf", "14-8", "30-31", 12);
addNormEntry("wisc", "cf", "14-8", "32", 13);
addNormEntry("wisc", "cf", "14-8", "33-34", 14);
addNormEntry("wisc", "cf", "14-8", "35", 15);
addNormEntry("wisc", "cf", "14-8", "36", 16);
addNormEntry("wisc", "cf", "14-8", "-", 17);
addNormEntry("wisc", "cf", "14-8", "37", 18);
addNormEntry("wisc", "cf", "14-8", "38", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "15-0", "0-9", 1);
addNormEntry("wisc", "cf", "15-0", "10-12", 2);
addNormEntry("wisc", "cf", "15-0", "13-14", 3);
addNormEntry("wisc", "cf", "15-0", "15-17", 4);
addNormEntry("wisc", "cf", "15-0", "18-19", 5);
addNormEntry("wisc", "cf", "15-0", "20-21", 6);
addNormEntry("wisc", "cf", "15-0", "22-23", 7);
addNormEntry("wisc", "cf", "15-0", "24-25", 8);
addNormEntry("wisc", "cf", "15-0", "25-27", 9);
addNormEntry("wisc", "cf", "15-0", "28", 10);
addNormEntry("wisc", "cf", "15-0", "29-30", 11);
addNormEntry("wisc", "cf", "15-0", "31", 12);
addNormEntry("wisc", "cf", "15-0", "32", 13);
addNormEntry("wisc", "cf", "15-0", "33-34", 14);
addNormEntry("wisc", "cf", "15-0", "35", 15);
addNormEntry("wisc", "cf", "15-0", "36", 16);
addNormEntry("wisc", "cf", "15-0", "-", 17);
addNormEntry("wisc", "cf", "15-0", "37", 18);
addNormEntry("wisc", "cf", "15-0", "38", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "15-4", "0-10", 1);
addNormEntry("wisc", "cf", "15-4", "11-13", 2);
addNormEntry("wisc", "cf", "15-4", "14-15", 3);
addNormEntry("wisc", "cf", "15-4", "16-17", 4);
addNormEntry("wisc", "cf", "15-4", "18-19", 5);
addNormEntry("wisc", "cf", "15-4", "20-21", 6);
addNormEntry("wisc", "cf", "15-4", "22-23", 7);
addNormEntry("wisc", "cf", "15-4", "24-25", 8);
addNormEntry("wisc", "cf", "15-4", "26-27", 9);
addNormEntry("wisc", "cf", "15-4", "28-29", 10);
addNormEntry("wisc", "cf", "15-4", "30", 11);
addNormEntry("wisc", "cf", "15-4", "31", 12);
addNormEntry("wisc", "cf", "15-4", "32-33", 13);
addNormEntry("wisc", "cf", "15-4", "34", 14);
addNormEntry("wisc", "cf", "15-4", "35", 15);
addNormEntry("wisc", "cf", "15-4", "36", 16);
addNormEntry("wisc", "cf", "15-4", "-", 17);
addNormEntry("wisc", "cf", "15-4", "37", 18);
addNormEntry("wisc", "cf", "15-4", "38", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "15-8", "0-10", 1);
addNormEntry("wisc", "cf", "15-8", "11-13", 2);
addNormEntry("wisc", "cf", "15-8", "14-15", 3);
addNormEntry("wisc", "cf", "15-8", "16-17", 4);
addNormEntry("wisc", "cf", "15-8", "18-19", 5);
addNormEntry("wisc", "cf", "15-8", "20-21", 6);
addNormEntry("wisc", "cf", "15-8", "22-23", 7);
addNormEntry("wisc", "cf", "15-8", "24-25", 8);
addNormEntry("wisc", "cf", "15-8", "26-27", 9);
addNormEntry("wisc", "cf", "15-8", "28-29", 10);
addNormEntry("wisc", "cf", "15-8", "30", 11);
addNormEntry("wisc", "cf", "15-8", "31-32", 12);
addNormEntry("wisc", "cf", "15-8", "33", 13);
addNormEntry("wisc", "cf", "15-8", "34", 14);
addNormEntry("wisc", "cf", "15-8", "35", 15);
addNormEntry("wisc", "cf", "15-8", "36", 16);
addNormEntry("wisc", "cf", "15-8", "37", 17);
addNormEntry("wisc", "cf", "15-8", "-", 18);
addNormEntry("wisc", "cf", "15-8", "38", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Completar Figuras)
addNormEntry("wisc", "cf", "16-0", "0-10", 1);
addNormEntry("wisc", "cf", "16-0", "11-13", 2);
addNormEntry("wisc", "cf", "16-0", "14-15", 3);
addNormEntry("wisc", "cf", "16-0", "16-17", 4);
addNormEntry("wisc", "cf", "16-0", "18-20", 5);
addNormEntry("wisc", "cf", "16-0", "21", 6);
addNormEntry("wisc", "cf", "16-0", "22-23", 7);
addNormEntry("wisc", "cf", "16-0", "24-26", 8);
addNormEntry("wisc", "cf", "16-0", "27-28", 9);
addNormEntry("wisc", "cf", "16-0", "29", 10);
addNormEntry("wisc", "cf", "16-0", "30-31", 11);
addNormEntry("wisc", "cf", "16-0", "32", 12);
addNormEntry("wisc", "cf", "16-0", "33", 13);
addNormEntry("wisc", "cf", "16-0", "34", 14);
addNormEntry("wisc", "cf", "16-0", "35", 15);
addNormEntry("wisc", "cf", "16-0", "36", 16);
addNormEntry("wisc", "cf", "16-0", "37", 17);
addNormEntry("wisc", "cf", "16-0", "-", 18);
addNormEntry("wisc", "cf", "16-0", "38", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Completar Figuras)
addNormEntry("wisc", "cf", "16-4", "0-11", 1);
addNormEntry("wisc", "cf", "16-4", "12-14", 2);
addNormEntry("wisc", "cf", "16-4", "15-16", 3);
addNormEntry("wisc", "cf", "16-4", "17-18", 4);
addNormEntry("wisc", "cf", "16-4", "19-20", 5);
addNormEntry("wisc", "cf", "16-4", "21-22", 6);
addNormEntry("wisc", "cf", "16-4", "23-24", 7);
addNormEntry("wisc", "cf", "16-4", "25-26", 8);
addNormEntry("wisc", "cf", "16-4", "27-28", 9);
addNormEntry("wisc", "cf", "16-4", "29-30", 10);
addNormEntry("wisc", "cf", "16-4", "31", 11);
addNormEntry("wisc", "cf", "16-4", "32", 12);
addNormEntry("wisc", "cf", "16-4", "33", 13);
addNormEntry("wisc", "cf", "16-4", "34", 14);
addNormEntry("wisc", "cf", "16-4", "35", 15);
addNormEntry("wisc", "cf", "16-4", "36", 16);
addNormEntry("wisc", "cf", "16-4", "37", 17);
addNormEntry("wisc", "cf", "16-4", "-", 18);
addNormEntry("wisc", "cf", "16-4", "38", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Completar Figuras)
addNormEntry("wisc", "cf", "16-8", "0-11", 1);
addNormEntry("wisc", "cf", "16-8", "12-14", 2);
addNormEntry("wisc", "cf", "16-8", "15-16", 3);
addNormEntry("wisc", "cf", "16-8", "17-18", 4);
addNormEntry("wisc", "cf", "16-8", "19-20", 5);
addNormEntry("wisc", "cf", "16-8", "21-22", 6);
addNormEntry("wisc", "cf", "16-8", "23-24", 7);
addNormEntry("wisc", "cf", "16-8", "25-26", 8);
addNormEntry("wisc", "cf", "16-8", "27-28", 9);
addNormEntry("wisc", "cf", "16-8", "29-30", 10);
addNormEntry("wisc", "cf", "16-8", "31", 11);
addNormEntry("wisc", "cf", "16-8", "32", 12);
addNormEntry("wisc", "cf", "16-8", "33", 13);
addNormEntry("wisc", "cf", "16-8", "34", 14);
addNormEntry("wisc", "cf", "16-8", "35", 15);
addNormEntry("wisc", "cf", "16-8", "36", 16);
addNormEntry("wisc", "cf", "16-8", "37", 17);
addNormEntry("wisc", "cf", "16-8", "-", 18);
addNormEntry("wisc", "cf", "16-8", "38", 19);

// --- Normas do Subteste Cancelamento (CA) ---

// FAIXA 6-0 — 6 anos (Cancelamento)
addNormEntry("wisc", "ca", "6-0", "0-2", 1);
addNormEntry("wisc", "ca", "6-0", "3-5", 2);
addNormEntry("wisc", "ca", "6-0", "6-9", 3);
addNormEntry("wisc", "ca", "6-0", "10-13", 4);
addNormEntry("wisc", "ca", "6-0", "14-17", 5);
addNormEntry("wisc", "ca", "6-0", "18-22", 6);
addNormEntry("wisc", "ca", "6-0", "23-27", 7);
addNormEntry("wisc", "ca", "6-0", "28-32", 8);
addNormEntry("wisc", "ca", "6-0", "33-37", 9);
addNormEntry("wisc", "ca", "6-0", "38-43", 10);
addNormEntry("wisc", "ca", "6-0", "44-48", 11);
addNormEntry("wisc", "ca", "6-0", "49-54", 12);
addNormEntry("wisc", "ca", "6-0", "55-60", 13);
addNormEntry("wisc", "ca", "6-0", "61-67", 14);
addNormEntry("wisc", "ca", "6-0", "68-73", 15);
addNormEntry("wisc", "ca", "6-0", "74-79", 16);
addNormEntry("wisc", "ca", "6-0", "80-86", 17);
addNormEntry("wisc", "ca", "6-0", "87-93", 18);
addNormEntry("wisc", "ca", "6-0", "94-136", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "6-4", "0-5", 1);
addNormEntry("wisc", "ca", "6-4", "6-8", 2);
addNormEntry("wisc", "ca", "6-4", "9-11", 3);
addNormEntry("wisc", "ca", "6-4", "12-16", 4);
addNormEntry("wisc", "ca", "6-4", "17-20", 5);
addNormEntry("wisc", "ca", "6-4", "21-25", 6);
addNormEntry("wisc", "ca", "6-4", "26-30", 7);
addNormEntry("wisc", "ca", "6-4", "31-35", 8);
addNormEntry("wisc", "ca", "6-4", "36-40", 9);
addNormEntry("wisc", "ca", "6-4", "41-46", 10);
addNormEntry("wisc", "ca", "6-4", "47-51", 11);
addNormEntry("wisc", "ca", "6-4", "52-57", 12);
addNormEntry("wisc", "ca", "6-4", "58-64", 13);
addNormEntry("wisc", "ca", "6-4", "65-70", 14);
addNormEntry("wisc", "ca", "6-4", "71-76", 15);
addNormEntry("wisc", "ca", "6-4", "77-83", 16);
addNormEntry("wisc", "ca", "6-4", "84-89", 17);
addNormEntry("wisc", "ca", "6-4", "90-96", 18);
addNormEntry("wisc", "ca", "6-4", "97-136", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "6-8", "0-7", 1);
addNormEntry("wisc", "ca", "6-8", "8-10", 2);
addNormEntry("wisc", "ca", "6-8", "11-14", 3);
addNormEntry("wisc", "ca", "6-8", "15-18", 4);
addNormEntry("wisc", "ca", "6-8", "19-23", 5);
addNormEntry("wisc", "ca", "6-8", "24-27", 6);
addNormEntry("wisc", "ca", "6-8", "28-32", 7);
addNormEntry("wisc", "ca", "6-8", "33-37", 8);
addNormEntry("wisc", "ca", "6-8", "38-43", 9);
addNormEntry("wisc", "ca", "6-8", "44-49", 10);
addNormEntry("wisc", "ca", "6-8", "50-54", 11);
addNormEntry("wisc", "ca", "6-8", "55-60", 12);
addNormEntry("wisc", "ca", "6-8", "61-67", 13);
addNormEntry("wisc", "ca", "6-8", "68-73", 14);
addNormEntry("wisc", "ca", "6-8", "74-79", 15);
addNormEntry("wisc", "ca", "6-8", "80-86", 16);
addNormEntry("wisc", "ca", "6-8", "87-92", 17);
addNormEntry("wisc", "ca", "6-8", "93-99", 18);
addNormEntry("wisc", "ca", "6-8", "100-136", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "7-0", "0-9", 1);
addNormEntry("wisc", "ca", "7-0", "10-13", 2);
addNormEntry("wisc", "ca", "7-0", "14-16", 3);
addNormEntry("wisc", "ca", "7-0", "17-21", 4);
addNormEntry("wisc", "ca", "7-0", "22-25", 5);
addNormEntry("wisc", "ca", "7-0", "26-30", 6);
addNormEntry("wisc", "ca", "7-0", "31-35", 7);
addNormEntry("wisc", "ca", "7-0", "36-40", 8);
addNormEntry("wisc", "ca", "7-0", "41-46", 9);
addNormEntry("wisc", "ca", "7-0", "47-51", 10);
addNormEntry("wisc", "ca", "7-0", "52-57", 11);
addNormEntry("wisc", "ca", "7-0", "58-63", 12);
addNormEntry("wisc", "ca", "7-0", "64-69", 13);
addNormEntry("wisc", "ca", "7-0", "70-76", 14);
addNormEntry("wisc", "ca", "7-0", "77-82", 15);
addNormEntry("wisc", "ca", "7-0", "83-89", 16);
addNormEntry("wisc", "ca", "7-0", "90-95", 17);
addNormEntry("wisc", "ca", "7-0", "96-102", 18);
addNormEntry("wisc", "ca", "7-0", "103-136", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "7-4", "0-11", 1);
addNormEntry("wisc", "ca", "7-4", "12-15", 2);
addNormEntry("wisc", "ca", "7-4", "16-18", 3);
addNormEntry("wisc", "ca", "7-4", "19-23", 4);
addNormEntry("wisc", "ca", "7-4", "24-27", 5);
addNormEntry("wisc", "ca", "7-4", "28-32", 6);
addNormEntry("wisc", "ca", "7-4", "33-37", 7);
addNormEntry("wisc", "ca", "7-4", "38-43", 8);
addNormEntry("wisc", "ca", "7-4", "44-48", 9);
addNormEntry("wisc", "ca", "7-4", "49-54", 10);
addNormEntry("wisc", "ca", "7-4", "55-60", 11);
addNormEntry("wisc", "ca", "7-4", "61-66", 12);
addNormEntry("wisc", "ca", "7-4", "67-72", 13);
addNormEntry("wisc", "ca", "7-4", "73-78", 14);
addNormEntry("wisc", "ca", "7-4", "79-85", 15);
addNormEntry("wisc", "ca", "7-4", "86-91", 16);
addNormEntry("wisc", "ca", "7-4", "92-98", 17);
addNormEntry("wisc", "ca", "7-4", "99-105", 18);
addNormEntry("wisc", "ca", "7-4", "106-136", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "7-8", "0-13", 1);
addNormEntry("wisc", "ca", "7-8", "14-17", 2);
addNormEntry("wisc", "ca", "7-8", "18-21", 3);
addNormEntry("wisc", "ca", "7-8", "22-25", 4);
addNormEntry("wisc", "ca", "7-8", "26-30", 5);
addNormEntry("wisc", "ca", "7-8", "31-35", 6);
addNormEntry("wisc", "ca", "7-8", "36-40", 7);
addNormEntry("wisc", "ca", "7-8", "41-45", 8);
addNormEntry("wisc", "ca", "7-8", "46-51", 9);
addNormEntry("wisc", "ca", "7-8", "52-56", 10);
addNormEntry("wisc", "ca", "7-8", "57-62", 11);
addNormEntry("wisc", "ca", "7-8", "63-68", 12);
addNormEntry("wisc", "ca", "7-8", "69-75", 13);
addNormEntry("wisc", "ca", "7-8", "76-81", 14);
addNormEntry("wisc", "ca", "7-8", "82-88", 15);
addNormEntry("wisc", "ca", "7-8", "89-94", 16);
addNormEntry("wisc", "ca", "7-8", "95-101", 17);
addNormEntry("wisc", "ca", "7-8", "102-108", 18);
addNormEntry("wisc", "ca", "7-8", "109-136", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "8-0", "0-15", 1);
addNormEntry("wisc", "ca", "8-0", "16-18", 2);
addNormEntry("wisc", "ca", "8-0", "19-23", 3);
addNormEntry("wisc", "ca", "8-0", "24-27", 4);
addNormEntry("wisc", "ca", "8-0", "28-32", 5);
addNormEntry("wisc", "ca", "8-0", "33-37", 6);
addNormEntry("wisc", "ca", "8-0", "38-42", 7);
addNormEntry("wisc", "ca", "8-0", "43-47", 8);
addNormEntry("wisc", "ca", "8-0", "48-53", 9);
addNormEntry("wisc", "ca", "8-0", "54-59", 10);
addNormEntry("wisc", "ca", "8-0", "60-65", 11);
addNormEntry("wisc", "ca", "8-0", "66-71", 12);
addNormEntry("wisc", "ca", "8-0", "72-77", 13);
addNormEntry("wisc", "ca", "8-0", "78-84", 14);
addNormEntry("wisc", "ca", "8-0", "85-90", 15);
addNormEntry("wisc", "ca", "8-0", "91-97", 16);
addNormEntry("wisc", "ca", "8-0", "98-104", 17);
addNormEntry("wisc", "ca", "8-0", "105-111", 18);
addNormEntry("wisc", "ca", "8-0", "112-136", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "8-4", "0-16", 1);
addNormEntry("wisc", "ca", "8-4", "17-20", 2);
addNormEntry("wisc", "ca", "8-4", "21-24", 3);
addNormEntry("wisc", "ca", "8-4", "25-29", 4);
addNormEntry("wisc", "ca", "8-4", "30-34", 5);
addNormEntry("wisc", "ca", "8-4", "35-39", 6);
addNormEntry("wisc", "ca", "8-4", "40-44", 7);
addNormEntry("wisc", "ca", "8-4", "45-50", 8);
addNormEntry("wisc", "ca", "8-4", "51-55", 9);
addNormEntry("wisc", "ca", "8-4", "56-61", 10);
addNormEntry("wisc", "ca", "8-4", "62-67", 11);
addNormEntry("wisc", "ca", "8-4", "68-73", 12);
addNormEntry("wisc", "ca", "8-4", "74-80", 13);
addNormEntry("wisc", "ca", "8-4", "81-86", 14);
addNormEntry("wisc", "ca", "8-4", "87-93", 15);
addNormEntry("wisc", "ca", "8-4", "94-99", 16);
addNormEntry("wisc", "ca", "8-4", "100-106", 17);
addNormEntry("wisc", "ca", "8-4", "107-113", 18);
addNormEntry("wisc", "ca", "8-4", "114-136", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "8-8", "0-18", 1);
addNormEntry("wisc", "ca", "8-8", "19-22", 2);
addNormEntry("wisc", "ca", "8-8", "23-26", 3);
addNormEntry("wisc", "ca", "8-8", "27-31", 4);
addNormEntry("wisc", "ca", "8-8", "32-36", 5);
addNormEntry("wisc", "ca", "8-8", "37-41", 6);
addNormEntry("wisc", "ca", "8-8", "42-46", 7);
addNormEntry("wisc", "ca", "8-8", "47-52", 8);
addNormEntry("wisc", "ca", "8-8", "53-57", 9);
addNormEntry("wisc", "ca", "8-8", "58-63", 10);
addNormEntry("wisc", "ca", "8-8", "64-69", 11);
addNormEntry("wisc", "ca", "8-8", "70-76", 12);
addNormEntry("wisc", "ca", "8-8", "77-82", 13);
addNormEntry("wisc", "ca", "8-8", "83-88", 14);
addNormEntry("wisc", "ca", "8-8", "89-95", 15);
addNormEntry("wisc", "ca", "8-8", "96-102", 16);
addNormEntry("wisc", "ca", "8-8", "103-108", 17);
addNormEntry("wisc", "ca", "8-8", "109-115", 18);
addNormEntry("wisc", "ca", "8-8", "116-136", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "9-0", "0-19", 1);
addNormEntry("wisc", "ca", "9-0", "20-23", 2);
addNormEntry("wisc", "ca", "9-0", "24-28", 3);
addNormEntry("wisc", "ca", "9-0", "29-33", 4);
addNormEntry("wisc", "ca", "9-0", "34-38", 5);
addNormEntry("wisc", "ca", "9-0", "39-43", 6);
addNormEntry("wisc", "ca", "9-0", "44-48", 7);
addNormEntry("wisc", "ca", "9-0", "49-54", 8);
addNormEntry("wisc", "ca", "9-0", "55-60", 9);
addNormEntry("wisc", "ca", "9-0", "61-66", 10);
addNormEntry("wisc", "ca", "9-0", "67-72", 11);
addNormEntry("wisc", "ca", "9-0", "73-78", 12);
addNormEntry("wisc", "ca", "9-0", "79-84", 13);
addNormEntry("wisc", "ca", "9-0", "85-91", 14);
addNormEntry("wisc", "ca", "9-0", "92-97", 15);
addNormEntry("wisc", "ca", "9-0", "98-104", 16);
addNormEntry("wisc", "ca", "9-0", "105-111", 17);
addNormEntry("wisc", "ca", "9-0", "112-118", 18);
addNormEntry("wisc", "ca", "9-0", "119-136", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "9-4", "0-20", 1);
addNormEntry("wisc", "ca", "9-4", "21-25", 2);
addNormEntry("wisc", "ca", "9-4", "26-29", 3);
addNormEntry("wisc", "ca", "9-4", "30-34", 4);
addNormEntry("wisc", "ca", "9-4", "35-39", 5);
addNormEntry("wisc", "ca", "9-4", "40-45", 6);
addNormEntry("wisc", "ca", "9-4", "46-50", 7);
addNormEntry("wisc", "ca", "9-4", "51-56", 8);
addNormEntry("wisc", "ca", "9-4", "57-62", 9);
addNormEntry("wisc", "ca", "9-4", "63-68", 10);
addNormEntry("wisc", "ca", "9-4", "69-74", 11);
addNormEntry("wisc", "ca", "9-4", "75-80", 12);
addNormEntry("wisc", "ca", "9-4", "81-86", 13);
addNormEntry("wisc", "ca", "9-4", "87-93", 14);
addNormEntry("wisc", "ca", "9-4", "94-100", 15);
addNormEntry("wisc", "ca", "9-4", "101-106", 16);
addNormEntry("wisc", "ca", "9-4", "107-113", 17);
addNormEntry("wisc", "ca", "9-4", "114-120", 18);
addNormEntry("wisc", "ca", "9-4", "121-136", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "9-8", "0-21", 1);
addNormEntry("wisc", "ca", "9-8", "22-26", 2);
addNormEntry("wisc", "ca", "9-8", "27-31", 3);
addNormEntry("wisc", "ca", "9-8", "32-36", 4);
addNormEntry("wisc", "ca", "9-8", "37-41", 5);
addNormEntry("wisc", "ca", "9-8", "42-47", 6);
addNormEntry("wisc", "ca", "9-8", "48-52", 7);
addNormEntry("wisc", "ca", "9-8", "53-58", 8);
addNormEntry("wisc", "ca", "9-8", "59-64", 9);
addNormEntry("wisc", "ca", "9-8", "65-70", 10);
addNormEntry("wisc", "ca", "9-8", "71-76", 11);
addNormEntry("wisc", "ca", "9-8", "77-82", 12);
addNormEntry("wisc", "ca", "9-8", "83-89", 13);
addNormEntry("wisc", "ca", "9-8", "90-95", 14);
addNormEntry("wisc", "ca", "9-8", "96-102", 15);
addNormEntry("wisc", "ca", "9-8", "103-108", 16);
addNormEntry("wisc", "ca", "9-8", "109-115", 17);
addNormEntry("wisc", "ca", "9-8", "116-122", 18);
addNormEntry("wisc", "ca", "9-8", "123-136", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "10-0", "0-22", 1);
addNormEntry("wisc", "ca", "10-0", "23-27", 2);
addNormEntry("wisc", "ca", "10-0", "28-32", 3);
addNormEntry("wisc", "ca", "10-0", "33-37", 4);
addNormEntry("wisc", "ca", "10-0", "38-43", 5);
addNormEntry("wisc", "ca", "10-0", "44-48", 6);
addNormEntry("wisc", "ca", "10-0", "49-54", 7);
addNormEntry("wisc", "ca", "10-0", "55-60", 8);
addNormEntry("wisc", "ca", "10-0", "61-66", 9);
addNormEntry("wisc", "ca", "10-0", "67-72", 10);
addNormEntry("wisc", "ca", "10-0", "73-78", 11);
addNormEntry("wisc", "ca", "10-0", "79-84", 12);
addNormEntry("wisc", "ca", "10-0", "85-91", 13);
addNormEntry("wisc", "ca", "10-0", "92-97", 14);
addNormEntry("wisc", "ca", "10-0", "98-104", 15);
addNormEntry("wisc", "ca", "10-0", "105-110", 16);
addNormEntry("wisc", "ca", "10-0", "111-117", 17);
addNormEntry("wisc", "ca", "10-0", "118-124", 18);
addNormEntry("wisc", "ca", "10-0", "125-136", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "10-4", "0-23", 1);
addNormEntry("wisc", "ca", "10-4", "24-28", 2);
addNormEntry("wisc", "ca", "10-4", "29-34", 3);
addNormEntry("wisc", "ca", "10-4", "35-39", 4);
addNormEntry("wisc", "ca", "10-4", "40-44", 5);
addNormEntry("wisc", "ca", "10-4", "45-50", 6);
addNormEntry("wisc", "ca", "10-4", "51-56", 7);
addNormEntry("wisc", "ca", "10-4", "57-62", 8);
addNormEntry("wisc", "ca", "10-4", "63-68", 9);
addNormEntry("wisc", "ca", "10-4", "69-74", 10);
addNormEntry("wisc", "ca", "10-4", "75-80", 11);
addNormEntry("wisc", "ca", "10-4", "81-86", 12);
addNormEntry("wisc", "ca", "10-4", "87-93", 13);
addNormEntry("wisc", "ca", "10-4", "94-99", 14);
addNormEntry("wisc", "ca", "10-4", "100-106", 15);
addNormEntry("wisc", "ca", "10-4", "107-112", 16);
addNormEntry("wisc", "ca", "10-4", "113-119", 17);
addNormEntry("wisc", "ca", "10-4", "120-126", 18);
addNormEntry("wisc", "ca", "10-4", "127-136", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "10-8", "0-24", 1);
addNormEntry("wisc", "ca", "10-8", "25-29", 2);
addNormEntry("wisc", "ca", "10-8", "30-35", 3);
addNormEntry("wisc", "ca", "10-8", "36-40", 4);
addNormEntry("wisc", "ca", "10-8", "41-46", 5);
addNormEntry("wisc", "ca", "10-8", "47-52", 6);
addNormEntry("wisc", "ca", "10-8", "53-57", 7);
addNormEntry("wisc", "ca", "10-8", "58-63", 8);
addNormEntry("wisc", "ca", "10-8", "64-69", 9);
addNormEntry("wisc", "ca", "10-8", "70-76", 10);
addNormEntry("wisc", "ca", "10-8", "77-82", 11);
addNormEntry("wisc", "ca", "10-8", "83-88", 12);
addNormEntry("wisc", "ca", "10-8", "89-95", 13);
addNormEntry("wisc", "ca", "10-8", "96-101", 14);
addNormEntry("wisc", "ca", "10-8", "102-108", 15);
addNormEntry("wisc", "ca", "10-8", "109-114", 16);
addNormEntry("wisc", "ca", "10-8", "115-121", 17);
addNormEntry("wisc", "ca", "10-8", "122-128", 18);
addNormEntry("wisc", "ca", "10-8", "129-136", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "11-0", "0-25", 1);
addNormEntry("wisc", "ca", "11-0", "26-30", 2);
addNormEntry("wisc", "ca", "11-0", "31-36", 3);
addNormEntry("wisc", "ca", "11-0", "37-42", 4);
addNormEntry("wisc", "ca", "11-0", "43-47", 5);
addNormEntry("wisc", "ca", "11-0", "48-53", 6);
addNormEntry("wisc", "ca", "11-0", "54-59", 7);
addNormEntry("wisc", "ca", "11-0", "60-65", 8);
addNormEntry("wisc", "ca", "11-0", "66-71", 9);
addNormEntry("wisc", "ca", "11-0", "72-78", 10);
addNormEntry("wisc", "ca", "11-0", "79-84", 11);
addNormEntry("wisc", "ca", "11-0", "85-90", 12);
addNormEntry("wisc", "ca", "11-0", "91-97", 13);
addNormEntry("wisc", "ca", "11-0", "98-103", 14);
addNormEntry("wisc", "ca", "11-0", "104-110", 15);
addNormEntry("wisc", "ca", "11-0", "111-116", 16);
addNormEntry("wisc", "ca", "11-0", "117-123", 17);
addNormEntry("wisc", "ca", "11-0", "124-130", 18);
addNormEntry("wisc", "ca", "11-0", "131-136", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "11-4", "0-26", 1);
addNormEntry("wisc", "ca", "11-4", "27-31", 2);
addNormEntry("wisc", "ca", "11-4", "32-37", 3);
addNormEntry("wisc", "ca", "11-4", "38-43", 4);
addNormEntry("wisc", "ca", "11-4", "44-49", 5);
addNormEntry("wisc", "ca", "11-4", "50-55", 6);
addNormEntry("wisc", "ca", "11-4", "56-61", 7);
addNormEntry("wisc", "ca", "11-4", "62-67", 8);
addNormEntry("wisc", "ca", "11-4", "68-73", 9);
addNormEntry("wisc", "ca", "11-4", "74-79", 10);
addNormEntry("wisc", "ca", "11-4", "80-86", 11);
addNormEntry("wisc", "ca", "11-4", "87-92", 12);
addNormEntry("wisc", "ca", "11-4", "93-98", 13);
addNormEntry("wisc", "ca", "11-4", "99-105", 14);
addNormEntry("wisc", "ca", "11-4", "106-111", 15);
addNormEntry("wisc", "ca", "11-4", "112-118", 16);
addNormEntry("wisc", "ca", "11-4", "119-125", 17);
addNormEntry("wisc", "ca", "11-4", "126-131", 18);
addNormEntry("wisc", "ca", "11-4", "132-136", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "11-8", "0-26", 1);
addNormEntry("wisc", "ca", "11-8", "27-32", 2);
addNormEntry("wisc", "ca", "11-8", "33-38", 3);
addNormEntry("wisc", "ca", "11-8", "39-44", 4);
addNormEntry("wisc", "ca", "11-8", "45-50", 5);
addNormEntry("wisc", "ca", "11-8", "51-56", 6);
addNormEntry("wisc", "ca", "11-8", "57-62", 7);
addNormEntry("wisc", "ca", "11-8", "63-69", 8);
addNormEntry("wisc", "ca", "11-8", "70-75", 9);
addNormEntry("wisc", "ca", "11-8", "76-81", 10);
addNormEntry("wisc", "ca", "11-8", "82-87", 11);
addNormEntry("wisc", "ca", "11-8", "88-94", 12);
addNormEntry("wisc", "ca", "11-8", "95-100", 13);
addNormEntry("wisc", "ca", "11-8", "101-107", 14);
addNormEntry("wisc", "ca", "11-8", "108-113", 15);
addNormEntry("wisc", "ca", "11-8", "114-120", 16);
addNormEntry("wisc", "ca", "11-8", "121-126", 17);
addNormEntry("wisc", "ca", "11-8", "127-132", 18);
addNormEntry("wisc", "ca", "11-8", "133-136", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "12-0", "0-27", 1);
addNormEntry("wisc", "ca", "12-0", "28-33", 2);
addNormEntry("wisc", "ca", "12-0", "34-39", 3);
addNormEntry("wisc", "ca", "12-0", "40-45", 4);
addNormEntry("wisc", "ca", "12-0", "46-52", 5);
addNormEntry("wisc", "ca", "12-0", "53-58", 6);
addNormEntry("wisc", "ca", "12-0", "59-64", 7);
addNormEntry("wisc", "ca", "12-0", "65-70", 8);
addNormEntry("wisc", "ca", "12-0", "71-77", 9);
addNormEntry("wisc", "ca", "12-0", "78-83", 10);
addNormEntry("wisc", "ca", "12-0", "84-89", 11);
addNormEntry("wisc", "ca", "12-0", "90-96", 12);
addNormEntry("wisc", "ca", "12-0", "97-102", 13);
addNormEntry("wisc", "ca", "12-0", "103-109", 14);
addNormEntry("wisc", "ca", "12-0", "110-115", 15);
addNormEntry("wisc", "ca", "12-0", "116-121", 16);
addNormEntry("wisc", "ca", "12-0", "122-128", 17);
addNormEntry("wisc", "ca", "12-0", "129-133", 18);
addNormEntry("wisc", "ca", "12-0", "134-136", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "12-4", "0-28", 1);
addNormEntry("wisc", "ca", "12-4", "29-34", 2);
addNormEntry("wisc", "ca", "12-4", "35-40", 3);
addNormEntry("wisc", "ca", "12-4", "41-46", 4);
addNormEntry("wisc", "ca", "12-4", "47-53", 5);
addNormEntry("wisc", "ca", "12-4", "54-59", 6);
addNormEntry("wisc", "ca", "12-4", "60-65", 7);
addNormEntry("wisc", "ca", "12-4", "66-72", 8);
addNormEntry("wisc", "ca", "12-4", "73-78", 9);
addNormEntry("wisc", "ca", "12-4", "79-85", 10);
addNormEntry("wisc", "ca", "12-4", "86-91", 11);
addNormEntry("wisc", "ca", "12-4", "92-97", 12);
addNormEntry("wisc", "ca", "12-4", "98-104", 13);
addNormEntry("wisc", "ca", "12-4", "105-110", 14);
addNormEntry("wisc", "ca", "12-4", "111-117", 15);
addNormEntry("wisc", "ca", "12-4", "118-123", 16);
addNormEntry("wisc", "ca", "12-4", "124-129", 17);
addNormEntry("wisc", "ca", "12-4", "130-134", 18);
addNormEntry("wisc", "ca", "12-4", "135-136", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "12-8", "0-28", 1);
addNormEntry("wisc", "ca", "12-8", "29-35", 2);
addNormEntry("wisc", "ca", "12-8", "36-41", 3);
addNormEntry("wisc", "ca", "12-8", "42-48", 4);
addNormEntry("wisc", "ca", "12-8", "49-54", 5);
addNormEntry("wisc", "ca", "12-8", "55-60", 6);
addNormEntry("wisc", "ca", "12-8", "61-67", 7);
addNormEntry("wisc", "ca", "12-8", "68-73", 8);
addNormEntry("wisc", "ca", "12-8", "74-80", 9);
addNormEntry("wisc", "ca", "12-8", "81-86", 10);
addNormEntry("wisc", "ca", "12-8", "87-93", 11);
addNormEntry("wisc", "ca", "12-8", "94-99", 12);
addNormEntry("wisc", "ca", "12-8", "100-106", 13);
addNormEntry("wisc", "ca", "12-8", "107-112", 14);
addNormEntry("wisc", "ca", "12-8", "113-118", 15);
addNormEntry("wisc", "ca", "12-8", "119-125", 16);
addNormEntry("wisc", "ca", "12-8", "126-131", 17);
addNormEntry("wisc", "ca", "12-8", "132-134", 18);
addNormEntry("wisc", "ca", "12-8", "135-136", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "13-0", "0-29", 1);
addNormEntry("wisc", "ca", "13-0", "30-35", 2);
addNormEntry("wisc", "ca", "13-0", "36-42", 3);
addNormEntry("wisc", "ca", "13-0", "43-49", 4);
addNormEntry("wisc", "ca", "13-0", "50-55", 5);
addNormEntry("wisc", "ca", "13-0", "56-62", 6);
addNormEntry("wisc", "ca", "13-0", "63-68", 7);
addNormEntry("wisc", "ca", "13-0", "69-75", 8);
addNormEntry("wisc", "ca", "13-0", "76-81", 9);
addNormEntry("wisc", "ca", "13-0", "82-88", 10);
addNormEntry("wisc", "ca", "13-0", "89-94", 11);
addNormEntry("wisc", "ca", "13-0", "95-101", 12);
addNormEntry("wisc", "ca", "13-0", "102-107", 13);
addNormEntry("wisc", "ca", "13-0", "108-114", 14);
addNormEntry("wisc", "ca", "13-0", "115-120", 15);
addNormEntry("wisc", "ca", "13-0", "121-126", 16);
addNormEntry("wisc", "ca", "13-0", "127-132", 17);
addNormEntry("wisc", "ca", "13-0", "133-134", 18);
addNormEntry("wisc", "ca", "13-0", "135-136", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "13-4", "0-29", 1);
addNormEntry("wisc", "ca", "13-4", "30-36", 2);
addNormEntry("wisc", "ca", "13-4", "37-43", 3);
addNormEntry("wisc", "ca", "13-4", "44-49", 4);
addNormEntry("wisc", "ca", "13-4", "50-56", 5);
addNormEntry("wisc", "ca", "13-4", "57-63", 6);
addNormEntry("wisc", "ca", "13-4", "64-70", 7);
addNormEntry("wisc", "ca", "13-4", "71-76", 8);
addNormEntry("wisc", "ca", "13-4", "77-83", 9);
addNormEntry("wisc", "ca", "13-4", "84-89", 10);
addNormEntry("wisc", "ca", "13-4", "90-96", 11);
addNormEntry("wisc", "ca", "13-4", "97-102", 12);
addNormEntry("wisc", "ca", "13-4", "103-109", 13);
addNormEntry("wisc", "ca", "13-4", "110-115", 14);
addNormEntry("wisc", "ca", "13-4", "116-122", 15);
addNormEntry("wisc", "ca", "13-4", "123-127", 16);
addNormEntry("wisc", "ca", "13-4", "128-132", 17);
addNormEntry("wisc", "ca", "13-4", "133-135", 18);
addNormEntry("wisc", "ca", "13-4", "136", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "13-8", "0-29", 1);
addNormEntry("wisc", "ca", "13-8", "30-36", 2);
addNormEntry("wisc", "ca", "13-8", "37-43", 3);
addNormEntry("wisc", "ca", "13-8", "44-50", 4);
addNormEntry("wisc", "ca", "13-8", "51-57", 5);
addNormEntry("wisc", "ca", "13-8", "58-64", 6);
addNormEntry("wisc", "ca", "13-8", "65-71", 7);
addNormEntry("wisc", "ca", "13-8", "72-78", 8);
addNormEntry("wisc", "ca", "13-8", "79-84", 9);
addNormEntry("wisc", "ca", "13-8", "85-91", 10);
addNormEntry("wisc", "ca", "13-8", "92-98", 11);
addNormEntry("wisc", "ca", "13-8", "99-104", 12);
addNormEntry("wisc", "ca", "13-8", "105-110", 13);
addNormEntry("wisc", "ca", "13-8", "111-117", 14);
addNormEntry("wisc", "ca", "13-8", "118-123", 15);
addNormEntry("wisc", "ca", "13-8", "124-129", 16);
addNormEntry("wisc", "ca", "13-8", "130-133", 17);
addNormEntry("wisc", "ca", "13-8", "134-135", 18);
addNormEntry("wisc", "ca", "13-8", "136", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "14-0", "0-30", 1);
addNormEntry("wisc", "ca", "14-0", "31-37", 2);
addNormEntry("wisc", "ca", "14-0", "38-44", 3);
addNormEntry("wisc", "ca", "14-0", "45-51", 4);
addNormEntry("wisc", "ca", "14-0", "52-58", 5);
addNormEntry("wisc", "ca", "14-0", "59-65", 6);
addNormEntry("wisc", "ca", "14-0", "66-72", 7);
addNormEntry("wisc", "ca", "14-0", "73-79", 8);
addNormEntry("wisc", "ca", "14-0", "80-86", 9);
addNormEntry("wisc", "ca", "14-0", "87-93", 10);
addNormEntry("wisc", "ca", "14-0", "94-99", 11);
addNormEntry("wisc", "ca", "14-0", "100-106", 12);
addNormEntry("wisc", "ca", "14-0", "107-112", 13);
addNormEntry("wisc", "ca", "14-0", "113-118", 14);
addNormEntry("wisc", "ca", "14-0", "119-124", 15);
addNormEntry("wisc", "ca", "14-0", "125-130", 16);
addNormEntry("wisc", "ca", "14-0", "131-133", 17);
addNormEntry("wisc", "ca", "14-0", "134-135", 18);
addNormEntry("wisc", "ca", "14-0", "136", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "14-4", "0-30", 1);
addNormEntry("wisc", "ca", "14-4", "31-37", 2);
addNormEntry("wisc", "ca", "14-4", "38-45", 3);
addNormEntry("wisc", "ca", "14-4", "46-52", 4);
addNormEntry("wisc", "ca", "14-4", "53-59", 5);
addNormEntry("wisc", "ca", "14-4", "60-66", 6);
addNormEntry("wisc", "ca", "14-4", "67-74", 7);
addNormEntry("wisc", "ca", "14-4", "75-80", 8);
addNormEntry("wisc", "ca", "14-4", "81-87", 9);
addNormEntry("wisc", "ca", "14-4", "88-94", 10);
addNormEntry("wisc", "ca", "14-4", "95-101", 11);
addNormEntry("wisc", "ca", "14-4", "102-107", 12);
addNormEntry("wisc", "ca", "14-4", "108-113", 13);
addNormEntry("wisc", "ca", "14-4", "114-120", 14);
addNormEntry("wisc", "ca", "14-4", "121-126", 15);
addNormEntry("wisc", "ca", "14-4", "127-130", 16);
addNormEntry("wisc", "ca", "14-4", "131-133", 17);
addNormEntry("wisc", "ca", "14-4", "134-135", 18);
addNormEntry("wisc", "ca", "14-4", "136", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "14-8", "0-30", 1);
addNormEntry("wisc", "ca", "14-8", "31-38", 2);
addNormEntry("wisc", "ca", "14-8", "39-45", 3);
addNormEntry("wisc", "ca", "14-8", "46-53", 4);
addNormEntry("wisc", "ca", "14-8", "54-60", 5);
addNormEntry("wisc", "ca", "14-8", "61-67", 6);
addNormEntry("wisc", "ca", "14-8", "68-75", 7);
addNormEntry("wisc", "ca", "14-8", "76-82", 8);
addNormEntry("wisc", "ca", "14-8", "83-89", 9);
addNormEntry("wisc", "ca", "14-8", "90-95", 10);
addNormEntry("wisc", "ca", "14-8", "96-102", 11);
addNormEntry("wisc", "ca", "14-8", "103-108", 12);
addNormEntry("wisc", "ca", "14-8", "109-115", 13);
addNormEntry("wisc", "ca", "14-8", "116-121", 14);
addNormEntry("wisc", "ca", "14-8", "122-127", 15);
addNormEntry("wisc", "ca", "14-8", "128-131", 16);
addNormEntry("wisc", "ca", "14-8", "132-133", 17);
addNormEntry("wisc", "ca", "14-8", "134-135", 18);
addNormEntry("wisc", "ca", "14-8", "136", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "15-0", "0-31", 1);
addNormEntry("wisc", "ca", "15-0", "32-39", 2);
addNormEntry("wisc", "ca", "15-0", "40-46", 3);
addNormEntry("wisc", "ca", "15-0", "47-53", 4);
addNormEntry("wisc", "ca", "15-0", "54-61", 5);
addNormEntry("wisc", "ca", "15-0", "62-68", 6);
addNormEntry("wisc", "ca", "15-0", "69-76", 7);
addNormEntry("wisc", "ca", "15-0", "77-83", 8);
addNormEntry("wisc", "ca", "15-0", "84-90", 9);
addNormEntry("wisc", "ca", "15-0", "91-97", 10);
addNormEntry("wisc", "ca", "15-0", "98-103", 11);
addNormEntry("wisc", "ca", "15-0", "104-110", 12);
addNormEntry("wisc", "ca", "15-0", "111-116", 13);
addNormEntry("wisc", "ca", "15-0", "117-122", 14);
addNormEntry("wisc", "ca", "15-0", "123-128", 15);
addNormEntry("wisc", "ca", "15-0", "129-132", 16);
addNormEntry("wisc", "ca", "15-0", "133-134", 17);
addNormEntry("wisc", "ca", "15-0", "135", 18);
addNormEntry("wisc", "ca", "15-0", "136", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "15-4", "0-31", 1);
addNormEntry("wisc", "ca", "15-4", "32-39", 2);
addNormEntry("wisc", "ca", "15-4", "40-46", 3);
addNormEntry("wisc", "ca", "15-4", "47-54", 4);
addNormEntry("wisc", "ca", "15-4", "55-62", 5);
addNormEntry("wisc", "ca", "15-4", "63-69", 6);
addNormEntry("wisc", "ca", "15-4", "70-77", 7);
addNormEntry("wisc", "ca", "15-4", "78-84", 8);
addNormEntry("wisc", "ca", "15-4", "85-91", 9);
addNormEntry("wisc", "ca", "15-4", "92-98", 10);
addNormEntry("wisc", "ca", "15-4", "99-105", 11);
addNormEntry("wisc", "ca", "15-4", "106-111", 12);
addNormEntry("wisc", "ca", "15-4", "112-117", 13);
addNormEntry("wisc", "ca", "15-4", "118-123", 14);
addNormEntry("wisc", "ca", "15-4", "124-129", 15);
addNormEntry("wisc", "ca", "15-4", "130-132", 16);
addNormEntry("wisc", "ca", "15-4", "133-134", 17);
addNormEntry("wisc", "ca", "15-4", "135", 18);
addNormEntry("wisc", "ca", "15-4", "136", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "15-8", "0-31", 1);
addNormEntry("wisc", "ca", "15-8", "32-39", 2);
addNormEntry("wisc", "ca", "15-8", "40-46", 3);
addNormEntry("wisc", "ca", "15-8", "47-54", 4);
addNormEntry("wisc", "ca", "15-8", "55-62", 5);
addNormEntry("wisc", "ca", "15-8", "63-70", 6);
addNormEntry("wisc", "ca", "15-8", "71-77", 7);
addNormEntry("wisc", "ca", "15-8", "78-85", 8);
addNormEntry("wisc", "ca", "15-8", "86-92", 9);
addNormEntry("wisc", "ca", "15-8", "93-99", 10);
addNormEntry("wisc", "ca", "15-8", "100-106", 11);
addNormEntry("wisc", "ca", "15-8", "107-112", 12);
addNormEntry("wisc", "ca", "15-8", "113-118", 13);
addNormEntry("wisc", "ca", "15-8", "119-124", 14);
addNormEntry("wisc", "ca", "15-8", "125-129", 15);
addNormEntry("wisc", "ca", "15-8", "130-132", 16);
addNormEntry("wisc", "ca", "15-8", "133-134", 17);
addNormEntry("wisc", "ca", "15-8", "135", 18);
addNormEntry("wisc", "ca", "15-8", "136", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Cancelamento)
addNormEntry("wisc", "ca", "16-0", "0-32", 1);
addNormEntry("wisc", "ca", "16-0", "33-40", 2);
addNormEntry("wisc", "ca", "16-0", "41-47", 3);
addNormEntry("wisc", "ca", "16-0", "48-55", 4);
addNormEntry("wisc", "ca", "16-0", "56-63", 5);
addNormEntry("wisc", "ca", "16-0", "64-71", 6);
addNormEntry("wisc", "ca", "16-0", "72-78", 7);
addNormEntry("wisc", "ca", "16-0", "79-86", 8);
addNormEntry("wisc", "ca", "16-0", "87-93", 9);
addNormEntry("wisc", "ca", "16-0", "94-100", 10);
addNormEntry("wisc", "ca", "16-0", "101-107", 11);
addNormEntry("wisc", "ca", "16-0", "108-113", 12);
addNormEntry("wisc", "ca", "16-0", "114-119", 13);
addNormEntry("wisc", "ca", "16-0", "120-125", 14);
addNormEntry("wisc", "ca", "16-0", "126-130", 15);
addNormEntry("wisc", "ca", "16-0", "131-133", 16);
addNormEntry("wisc", "ca", "16-0", "134-135", 17);
addNormEntry("wisc", "ca", "16-0", "136", 18);
addNormEntry("wisc", "ca", "16-0", "-", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Cancelamento)
addNormEntry("wisc", "ca", "16-4", "0-32", 1);
addNormEntry("wisc", "ca", "16-4", "33-40", 2);
addNormEntry("wisc", "ca", "16-4", "41-47", 3);
addNormEntry("wisc", "ca", "16-4", "48-55", 4);
addNormEntry("wisc", "ca", "16-4", "56-63", 5);
addNormEntry("wisc", "ca", "16-4", "64-71", 6);
addNormEntry("wisc", "ca", "16-4", "72-79", 7);
addNormEntry("wisc", "ca", "16-4", "80-87", 8);
addNormEntry("wisc", "ca", "16-4", "88-94", 9);
addNormEntry("wisc", "ca", "16-4", "95-101", 10);
addNormEntry("wisc", "ca", "16-4", "102-108", 11);
addNormEntry("wisc", "ca", "16-4", "109-114", 12);
addNormEntry("wisc", "ca", "16-4", "115-120", 13);
addNormEntry("wisc", "ca", "16-4", "121-126", 14);
addNormEntry("wisc", "ca", "16-4", "127-130", 15);
addNormEntry("wisc", "ca", "16-4", "131-133", 16);
addNormEntry("wisc", "ca", "16-4", "134-135", 17);
addNormEntry("wisc", "ca", "16-4", "136", 18);
addNormEntry("wisc", "ca", "16-4", "-", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Cancelamento)
addNormEntry("wisc", "ca", "16-8", "0-33", 1);
addNormEntry("wisc", "ca", "16-8", "34-41", 2);
addNormEntry("wisc", "ca", "16-8", "42-48", 3);
addNormEntry("wisc", "ca", "16-8", "49-56", 4);
addNormEntry("wisc", "ca", "16-8", "57-64", 5);
addNormEntry("wisc", "ca", "16-8", "65-72", 6);
addNormEntry("wisc", "ca", "16-8", "73-80", 7);
addNormEntry("wisc", "ca", "16-8", "81-88", 8);
addNormEntry("wisc", "ca", "16-8", "89-95", 9);
addNormEntry("wisc", "ca", "16-8", "96-102", 10);
addNormEntry("wisc", "ca", "16-8", "103-109", 11);
addNormEntry("wisc", "ca", "16-8", "110-115", 12);
addNormEntry("wisc", "ca", "16-8", "116-121", 13);
addNormEntry("wisc", "ca", "16-8", "122-127", 14);
addNormEntry("wisc", "ca", "16-8", "128-131", 15);
addNormEntry("wisc", "ca", "16-8", "132-134", 16);
addNormEntry("wisc", "ca", "16-8", "135", 17);
addNormEntry("wisc", "ca", "16-8", "136", 18);
addNormEntry("wisc", "ca", "16-8", "-", 19);

// --- Normas do Subteste Informação (IN) ---

// FAIXA 6-0 — 6 anos (Informação)
addNormEntry("wisc", "in", "6-0", "0-2", 1);
addNormEntry("wisc", "in", "6-0", "3", 2);
addNormEntry("wisc", "in", "6-0", "4", 3);
addNormEntry("wisc", "in", "6-0", "5", 4);
addNormEntry("wisc", "in", "6-0", "-", 5);
addNormEntry("wisc", "in", "6-0", "6", 6);
addNormEntry("wisc", "in", "6-0", "-", 7);
addNormEntry("wisc", "in", "6-0", "-", 8);
addNormEntry("wisc", "in", "6-0", "7", 9);
addNormEntry("wisc", "in", "6-0", "8", 10);
addNormEntry("wisc", "in", "6-0", "-", 11);
addNormEntry("wisc", "in", "6-0", "9", 12);
addNormEntry("wisc", "in", "6-0", "10", 13);
addNormEntry("wisc", "in", "6-0", "11", 14);
addNormEntry("wisc", "in", "6-0", "-", 15);
addNormEntry("wisc", "in", "6-0", "12", 16);
addNormEntry("wisc", "in", "6-0", "13", 17);
addNormEntry("wisc", "in", "6-0", "14", 18);
addNormEntry("wisc", "in", "6-0", "15-33", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "6-4", "0-2", 1);
addNormEntry("wisc", "in", "6-4", "3", 2);
addNormEntry("wisc", "in", "6-4", "4", 3);
addNormEntry("wisc", "in", "6-4", "5", 4);
addNormEntry("wisc", "in", "6-4", "-", 5);
addNormEntry("wisc", "in", "6-4", "6", 6);
addNormEntry("wisc", "in", "6-4", "-", 7);
addNormEntry("wisc", "in", "6-4", "7", 8);
addNormEntry("wisc", "in", "6-4", "8", 9);
addNormEntry("wisc", "in", "6-4", "-", 10);
addNormEntry("wisc", "in", "6-4", "9", 11);
addNormEntry("wisc", "in", "6-4", "10", 12);
addNormEntry("wisc", "in", "6-4", "11", 13);
addNormEntry("wisc", "in", "6-4", "-", 14);
addNormEntry("wisc", "in", "6-4", "12", 15);
addNormEntry("wisc", "in", "6-4", "13", 16);
addNormEntry("wisc", "in", "6-4", "14", 17);
addNormEntry("wisc", "in", "6-4", "15", 18);
addNormEntry("wisc", "in", "6-4", "16-33", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "6-8", "0-2", 1);
addNormEntry("wisc", "in", "6-8", "3", 2);
addNormEntry("wisc", "in", "6-8", "4", 3);
addNormEntry("wisc", "in", "6-8", "5", 4);
addNormEntry("wisc", "in", "6-8", "-", 5);
addNormEntry("wisc", "in", "6-8", "6", 6);
addNormEntry("wisc", "in", "6-8", "7", 7);
addNormEntry("wisc", "in", "6-8", "-", 8);
addNormEntry("wisc", "in", "6-8", "8", 9);
addNormEntry("wisc", "in", "6-8", "9", 10);
addNormEntry("wisc", "in", "6-8", "10", 11);
addNormEntry("wisc", "in", "6-8", "11", 12);
addNormEntry("wisc", "in", "6-8", "-", 13);
addNormEntry("wisc", "in", "6-8", "12", 14);
addNormEntry("wisc", "in", "6-8", "13", 15);
addNormEntry("wisc", "in", "6-8", "14", 16);
addNormEntry("wisc", "in", "6-8", "15", 17);
addNormEntry("wisc", "in", "6-8", "16", 18);
addNormEntry("wisc", "in", "6-8", "17-33", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "7-0", "0-2", 1);
addNormEntry("wisc", "in", "7-0", "3", 2);
addNormEntry("wisc", "in", "7-0", "4", 3);
addNormEntry("wisc", "in", "7-0", "5", 4);
addNormEntry("wisc", "in", "7-0", "6", 5);
addNormEntry("wisc", "in", "7-0", "-", 6);
addNormEntry("wisc", "in", "7-0", "7", 7);
addNormEntry("wisc", "in", "7-0", "8", 8);
addNormEntry("wisc", "in", "7-0", "9", 9);
addNormEntry("wisc", "in", "7-0", "-", 10);
addNormEntry("wisc", "in", "7-0", "10", 11);
addNormEntry("wisc", "in", "7-0", "11", 12);
addNormEntry("wisc", "in", "7-0", "12", 13);
addNormEntry("wisc", "in", "7-0", "13", 14);
addNormEntry("wisc", "in", "7-0", "14", 15);
addNormEntry("wisc", "in", "7-0", "15", 16);
addNormEntry("wisc", "in", "7-0", "16", 17);
addNormEntry("wisc", "in", "7-0", "17", 18);
addNormEntry("wisc", "in", "7-0", "18-33", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "7-4", "0-3", 1);
addNormEntry("wisc", "in", "7-4", "4", 2);
addNormEntry("wisc", "in", "7-4", "5", 3);
addNormEntry("wisc", "in", "7-4", "6", 4);
addNormEntry("wisc", "in", "7-4", "-", 5);
addNormEntry("wisc", "in", "7-4", "7", 6);
addNormEntry("wisc", "in", "7-4", "8", 7);
addNormEntry("wisc", "in", "7-4", "-", 8);
addNormEntry("wisc", "in", "7-4", "9", 9);
addNormEntry("wisc", "in", "7-4", "10", 10);
addNormEntry("wisc", "in", "7-4", "11", 11);
addNormEntry("wisc", "in", "7-4", "12", 12);
addNormEntry("wisc", "in", "7-4", "13", 13);
addNormEntry("wisc", "in", "7-4", "14", 14);
addNormEntry("wisc", "in", "7-4", "15", 15);
addNormEntry("wisc", "in", "7-4", "16", 16);
addNormEntry("wisc", "in", "7-4", "17", 17);
addNormEntry("wisc", "in", "7-4", "18", 18);
addNormEntry("wisc", "in", "7-4", "19-33", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "7-8", "0-3", 1);
addNormEntry("wisc", "in", "7-8", "4", 2);
addNormEntry("wisc", "in", "7-8", "5", 3);
addNormEntry("wisc", "in", "7-8", "6", 4);
addNormEntry("wisc", "in", "7-8", "7", 5);
addNormEntry("wisc", "in", "7-8", "-", 6);
addNormEntry("wisc", "in", "7-8", "8", 7);
addNormEntry("wisc", "in", "7-8", "9", 8);
addNormEntry("wisc", "in", "7-8", "10", 9);
addNormEntry("wisc", "in", "7-8", "11", 10);
addNormEntry("wisc", "in", "7-8", "12", 11);
addNormEntry("wisc", "in", "7-8", "13", 12);
addNormEntry("wisc", "in", "7-8", "14", 13);
addNormEntry("wisc", "in", "7-8", "15", 14);
addNormEntry("wisc", "in", "7-8", "16", 15);
addNormEntry("wisc", "in", "7-8", "17", 16);
addNormEntry("wisc", "in", "7-8", "18", 17);
addNormEntry("wisc", "in", "7-8", "19", 18);
addNormEntry("wisc", "in", "7-8", "20-33", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "8-0", "0-3", 1);
addNormEntry("wisc", "in", "8-0", "4", 2);
addNormEntry("wisc", "in", "8-0", "5", 3);
addNormEntry("wisc", "in", "8-0", "6", 4);
addNormEntry("wisc", "in", "8-0", "7", 5);
addNormEntry("wisc", "in", "8-0", "8", 6);
addNormEntry("wisc", "in", "8-0", "9", 7);
addNormEntry("wisc", "in", "8-0", "-", 8);
addNormEntry("wisc", "in", "8-0", "10", 9);
addNormEntry("wisc", "in", "8-0", "11", 10);
addNormEntry("wisc", "in", "8-0", "12", 11);
addNormEntry("wisc", "in", "8-0", "13", 12);
addNormEntry("wisc", "in", "8-0", "14", 13);
addNormEntry("wisc", "in", "8-0", "15", 14);
addNormEntry("wisc", "in", "8-0", "16", 15);
addNormEntry("wisc", "in", "8-0", "17", 16);
addNormEntry("wisc", "in", "8-0", "18-19", 17);
addNormEntry("wisc", "in", "8-0", "20", 18);
addNormEntry("wisc", "in", "8-0", "21-33", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "8-4", "0-4", 1);
addNormEntry("wisc", "in", "8-4", "5", 2);
addNormEntry("wisc", "in", "8-4", "6", 3);
addNormEntry("wisc", "in", "8-4", "7", 4);
addNormEntry("wisc", "in", "8-4", "-", 5);
addNormEntry("wisc", "in", "8-4", "8", 6);
addNormEntry("wisc", "in", "8-4", "9", 7);
addNormEntry("wisc", "in", "8-4", "10", 8);
addNormEntry("wisc", "in", "8-4", "11", 9);
addNormEntry("wisc", "in", "8-4", "12", 10);
addNormEntry("wisc", "in", "8-4", "13", 11);
addNormEntry("wisc", "in", "8-4", "14", 12);
addNormEntry("wisc", "in", "8-4", "15", 13);
addNormEntry("wisc", "in", "8-4", "16", 14);
addNormEntry("wisc", "in", "8-4", "17", 15);
addNormEntry("wisc", "in", "8-4", "18", 16);
addNormEntry("wisc", "in", "8-4", "19", 17);
addNormEntry("wisc", "in", "8-4", "20", 18);
addNormEntry("wisc", "in", "8-4", "21-33", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "8-8", "0-4", 1);
addNormEntry("wisc", "in", "8-8", "5", 2);
addNormEntry("wisc", "in", "8-8", "6", 3);
addNormEntry("wisc", "in", "8-8", "7", 4);
addNormEntry("wisc", "in", "8-8", "8", 5);
addNormEntry("wisc", "in", "8-8", "9", 6);
addNormEntry("wisc", "in", "8-8", "-", 7);
addNormEntry("wisc", "in", "8-8", "10", 8);
addNormEntry("wisc", "in", "8-8", "11", 9);
addNormEntry("wisc", "in", "8-8", "12", 10);
addNormEntry("wisc", "in", "8-8", "13", 11);
addNormEntry("wisc", "in", "8-8", "14", 12);
addNormEntry("wisc", "in", "8-8", "15", 13);
addNormEntry("wisc", "in", "8-8", "16", 14);
addNormEntry("wisc", "in", "8-8", "17-18", 15);
addNormEntry("wisc", "in", "8-8", "19", 16);
addNormEntry("wisc", "in", "8-8", "20", 17);
addNormEntry("wisc", "in", "8-8", "21", 18);
addNormEntry("wisc", "in", "8-8", "22-33", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "9-0", "0-5", 1);
addNormEntry("wisc", "in", "9-0", "6", 2);
addNormEntry("wisc", "in", "9-0", "7", 3);
addNormEntry("wisc", "in", "9-0", "8", 4);
addNormEntry("wisc", "in", "9-0", "-", 5);
addNormEntry("wisc", "in", "9-0", "9", 6);
addNormEntry("wisc", "in", "9-0", "10", 7);
addNormEntry("wisc", "in", "9-0", "11", 8);
addNormEntry("wisc", "in", "9-0", "12", 9);
addNormEntry("wisc", "in", "9-0", "13", 10);
addNormEntry("wisc", "in", "9-0", "14", 11);
addNormEntry("wisc", "in", "9-0", "15", 12);
addNormEntry("wisc", "in", "9-0", "16", 13);
addNormEntry("wisc", "in", "9-0", "17", 14);
addNormEntry("wisc", "in", "9-0", "18", 15);
addNormEntry("wisc", "in", "9-0", "19", 16);
addNormEntry("wisc", "in", "9-0", "20-21", 17);
addNormEntry("wisc", "in", "9-0", "22", 18);
addNormEntry("wisc", "in", "9-0", "23-33", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "9-4", "0-5", 1);
addNormEntry("wisc", "in", "9-4", "6", 2);
addNormEntry("wisc", "in", "9-4", "7", 3);
addNormEntry("wisc", "in", "9-4", "8", 4);
addNormEntry("wisc", "in", "9-4", "9", 5);
addNormEntry("wisc", "in", "9-4", "10", 6);
addNormEntry("wisc", "in", "9-4", "-", 7);
addNormEntry("wisc", "in", "9-4", "11", 8);
addNormEntry("wisc", "in", "9-4", "12", 9);
addNormEntry("wisc", "in", "9-4", "13", 10);
addNormEntry("wisc", "in", "9-4", "14", 11);
addNormEntry("wisc", "in", "9-4", "15", 12);
addNormEntry("wisc", "in", "9-4", "16-17", 13);
addNormEntry("wisc", "in", "9-4", "18", 14);
addNormEntry("wisc", "in", "9-4", "19", 15);
addNormEntry("wisc", "in", "9-4", "20", 16);
addNormEntry("wisc", "in", "9-4", "21", 17);
addNormEntry("wisc", "in", "9-4", "22", 18);
addNormEntry("wisc", "in", "9-4", "23-33", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "9-8", "0-5", 1);
addNormEntry("wisc", "in", "9-8", "6", 2);
addNormEntry("wisc", "in", "9-8", "7", 3);
addNormEntry("wisc", "in", "9-8", "8", 4);
addNormEntry("wisc", "in", "9-8", "9", 5);
addNormEntry("wisc", "in", "9-8", "10", 6);
addNormEntry("wisc", "in", "9-8", "11", 7);
addNormEntry("wisc", "in", "9-8", "12", 8);
addNormEntry("wisc", "in", "9-8", "13", 9);
addNormEntry("wisc", "in", "9-8", "14", 10);
addNormEntry("wisc", "in", "9-8", "15", 11);
addNormEntry("wisc", "in", "9-8", "16", 12);
addNormEntry("wisc", "in", "9-8", "17", 13);
addNormEntry("wisc", "in", "9-8", "18", 14);
addNormEntry("wisc", "in", "9-8", "19", 15);
addNormEntry("wisc", "in", "9-8", "20", 16);
addNormEntry("wisc", "in", "9-8", "21-22", 17);
addNormEntry("wisc", "in", "9-8", "23", 18);
addNormEntry("wisc", "in", "9-8", "24-33", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "10-0", "0-6", 1);
addNormEntry("wisc", "in", "10-0", "7", 2);
addNormEntry("wisc", "in", "10-0", "8", 3);
addNormEntry("wisc", "in", "10-0", "9", 4);
addNormEntry("wisc", "in", "10-0", "10", 5);
addNormEntry("wisc", "in", "10-0", "-", 6);
addNormEntry("wisc", "in", "10-0", "11", 7);
addNormEntry("wisc", "in", "10-0", "12", 8);
addNormEntry("wisc", "in", "10-0", "13", 9);
addNormEntry("wisc", "in", "10-0", "14", 10);
addNormEntry("wisc", "in", "10-0", "15", 11);
addNormEntry("wisc", "in", "10-0", "16", 12);
addNormEntry("wisc", "in", "10-0", "17-18", 13);
addNormEntry("wisc", "in", "10-0", "19", 14);
addNormEntry("wisc", "in", "10-0", "20", 15);
addNormEntry("wisc", "in", "10-0", "21", 16);
addNormEntry("wisc", "in", "10-0", "22", 17);
addNormEntry("wisc", "in", "10-0", "23-24", 18);
addNormEntry("wisc", "in", "10-0", "25-33", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "10-4", "0-6", 1);
addNormEntry("wisc", "in", "10-4", "7", 2);
addNormEntry("wisc", "in", "10-4", "8", 3);
addNormEntry("wisc", "in", "10-4", "9", 4);
addNormEntry("wisc", "in", "10-4", "10", 5);
addNormEntry("wisc", "in", "10-4", "11", 6);
addNormEntry("wisc", "in", "10-4", "12", 7);
addNormEntry("wisc", "in", "10-4", "13", 8);
addNormEntry("wisc", "in", "10-4", "14", 9);
addNormEntry("wisc", "in", "10-4", "15", 10);
addNormEntry("wisc", "in", "10-4", "16", 11);
addNormEntry("wisc", "in", "10-4", "17", 12);
addNormEntry("wisc", "in", "10-4", "18", 13);
addNormEntry("wisc", "in", "10-4", "19", 14);
addNormEntry("wisc", "in", "10-4", "20", 15);
addNormEntry("wisc", "in", "10-4", "21-22", 16);
addNormEntry("wisc", "in", "10-4", "23", 17);
addNormEntry("wisc", "in", "10-4", "24", 18);
addNormEntry("wisc", "in", "10-4", "25-33", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "10-8", "0-6", 1);
addNormEntry("wisc", "in", "10-8", "7", 2);
addNormEntry("wisc", "in", "10-8", "8", 3);
addNormEntry("wisc", "in", "10-8", "9", 4);
addNormEntry("wisc", "in", "10-8", "10", 5);
addNormEntry("wisc", "in", "10-8", "11", 6);
addNormEntry("wisc", "in", "10-8", "12", 7);
addNormEntry("wisc", "in", "10-8", "13", 8);
addNormEntry("wisc", "in", "10-8", "14", 9);
addNormEntry("wisc", "in", "10-8", "15", 10);
addNormEntry("wisc", "in", "10-8", "16", 11);
addNormEntry("wisc", "in", "10-8", "17", 12);
addNormEntry("wisc", "in", "10-8", "18-19", 13);
addNormEntry("wisc", "in", "10-8", "20", 14);
addNormEntry("wisc", "in", "10-8", "21", 15);
addNormEntry("wisc", "in", "10-8", "22", 16);
addNormEntry("wisc", "in", "10-8", "23", 17);
addNormEntry("wisc", "in", "10-8", "24-25", 18);
addNormEntry("wisc", "in", "10-8", "26-33", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "11-0", "0-7", 1);
addNormEntry("wisc", "in", "11-0", "8", 2);
addNormEntry("wisc", "in", "11-0", "9", 3);
addNormEntry("wisc", "in", "11-0", "10", 4);
addNormEntry("wisc", "in", "11-0", "11", 5);
addNormEntry("wisc", "in", "11-0", "12", 6);
addNormEntry("wisc", "in", "11-0", "13", 7);
addNormEntry("wisc", "in", "11-0", "14", 8);
addNormEntry("wisc", "in", "11-0", "15", 9);
addNormEntry("wisc", "in", "11-0", "16", 10);
addNormEntry("wisc", "in", "11-0", "17", 11);
addNormEntry("wisc", "in", "11-0", "18", 12);
addNormEntry("wisc", "in", "11-0", "19", 13);
addNormEntry("wisc", "in", "11-0", "20", 14);
addNormEntry("wisc", "in", "11-0", "21", 15);
addNormEntry("wisc", "in", "11-0", "22-23", 16);
addNormEntry("wisc", "in", "11-0", "24", 17);
addNormEntry("wisc", "in", "11-0", "25", 18);
addNormEntry("wisc", "in", "11-0", "26-33", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "11-4", "0-7", 1);
addNormEntry("wisc", "in", "11-4", "8", 2);
addNormEntry("wisc", "in", "11-4", "9", 3);
addNormEntry("wisc", "in", "11-4", "10", 4);
addNormEntry("wisc", "in", "11-4", "11", 5);
addNormEntry("wisc", "in", "11-4", "12", 6);
addNormEntry("wisc", "in", "11-4", "13", 7);
addNormEntry("wisc", "in", "11-4", "14", 8);
addNormEntry("wisc", "in", "11-4", "15", 9);
addNormEntry("wisc", "in", "11-4", "16", 10);
addNormEntry("wisc", "in", "11-4", "17", 11);
addNormEntry("wisc", "in", "11-4", "18", 12);
addNormEntry("wisc", "in", "11-4", "19-20", 13);
addNormEntry("wisc", "in", "11-4", "21", 14);
addNormEntry("wisc", "in", "11-4", "22", 15);
addNormEntry("wisc", "in", "11-4", "23", 16);
addNormEntry("wisc", "in", "11-4", "24-25", 17);
addNormEntry("wisc", "in", "11-4", "26", 18);
addNormEntry("wisc", "in", "11-4", "27-33", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "11-8", "0-7", 1);
addNormEntry("wisc", "in", "11-8", "8", 2);
addNormEntry("wisc", "in", "11-8", "9", 3);
addNormEntry("wisc", "in", "11-8", "10", 4);
addNormEntry("wisc", "in", "11-8", "11", 5);
addNormEntry("wisc", "in", "11-8", "12", 6);
addNormEntry("wisc", "in", "11-8", "13", 7);
addNormEntry("wisc", "in", "11-8", "14", 8);
addNormEntry("wisc", "in", "11-8", "15", 9);
addNormEntry("wisc", "in", "11-8", "16", 10);
addNormEntry("wisc", "in", "11-8", "17-18", 11);
addNormEntry("wisc", "in", "11-8", "19", 12);
addNormEntry("wisc", "in", "11-8", "20", 13);
addNormEntry("wisc", "in", "11-8", "21", 14);
addNormEntry("wisc", "in", "11-8", "22-23", 15);
addNormEntry("wisc", "in", "11-8", "24", 16);
addNormEntry("wisc", "in", "11-8", "25", 17);
addNormEntry("wisc", "in", "11-8", "26-27", 18);
addNormEntry("wisc", "in", "11-8", "28-33", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "12-0", "0-8", 1);
addNormEntry("wisc", "in", "12-0", "9", 2);
addNormEntry("wisc", "in", "12-0", "10", 3);
addNormEntry("wisc", "in", "12-0", "11", 4);
addNormEntry("wisc", "in", "12-0", "12", 5);
addNormEntry("wisc", "in", "12-0", "13", 6);
addNormEntry("wisc", "in", "12-0", "14", 7);
addNormEntry("wisc", "in", "12-0", "15", 8);
addNormEntry("wisc", "in", "12-0", "16", 9);
addNormEntry("wisc", "in", "12-0", "17", 10);
addNormEntry("wisc", "in", "12-0", "18", 11);
addNormEntry("wisc", "in", "12-0", "19", 12);
addNormEntry("wisc", "in", "12-0", "20", 13);
addNormEntry("wisc", "in", "12-0", "21-22", 14);
addNormEntry("wisc", "in", "12-0", "23", 15);
addNormEntry("wisc", "in", "12-0", "24", 16);
addNormEntry("wisc", "in", "12-0", "25-26", 17);
addNormEntry("wisc", "in", "12-0", "27", 18);
addNormEntry("wisc", "in", "12-0", "28-33", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "12-4", "0-8", 1);
addNormEntry("wisc", "in", "12-4", "9", 2);
addNormEntry("wisc", "in", "12-4", "10", 3);
addNormEntry("wisc", "in", "12-4", "11", 4);
addNormEntry("wisc", "in", "12-4", "12", 5);
addNormEntry("wisc", "in", "12-4", "13", 6);
addNormEntry("wisc", "in", "12-4", "14", 7);
addNormEntry("wisc", "in", "12-4", "15", 8);
addNormEntry("wisc", "in", "12-4", "16", 9);
addNormEntry("wisc", "in", "12-4", "17", 10);
addNormEntry("wisc", "in", "12-4", "18", 11);
addNormEntry("wisc", "in", "12-4", "19-20", 12);
addNormEntry("wisc", "in", "12-4", "21", 13);
addNormEntry("wisc", "in", "12-4", "22", 14);
addNormEntry("wisc", "in", "12-4", "23-24", 15);
addNormEntry("wisc", "in", "12-4", "25", 16);
addNormEntry("wisc", "in", "12-4", "26", 17);
addNormEntry("wisc", "in", "12-4", "27-28", 18);
addNormEntry("wisc", "in", "12-4", "29-33", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "12-8", "0-8", 1);
addNormEntry("wisc", "in", "12-8", "9", 2);
addNormEntry("wisc", "in", "12-8", "10", 3);
addNormEntry("wisc", "in", "12-8", "11", 4);
addNormEntry("wisc", "in", "12-8", "12", 5);
addNormEntry("wisc", "in", "12-8", "13", 6);
addNormEntry("wisc", "in", "12-8", "14", 7);
addNormEntry("wisc", "in", "12-8", "15", 8);
addNormEntry("wisc", "in", "12-8", "16", 9);
addNormEntry("wisc", "in", "12-8", "17-18", 10);
addNormEntry("wisc", "in", "12-8", "19", 11);
addNormEntry("wisc", "in", "12-8", "20", 12);
addNormEntry("wisc", "in", "12-8", "21", 13);
addNormEntry("wisc", "in", "12-8", "22-23", 14);
addNormEntry("wisc", "in", "12-8", "24", 15);
addNormEntry("wisc", "in", "12-8", "25", 16);
addNormEntry("wisc", "in", "12-8", "26-27", 17);
addNormEntry("wisc", "in", "12-8", "28", 18);
addNormEntry("wisc", "in", "12-8", "29-33", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "13-0", "0-9", 1);
addNormEntry("wisc", "in", "13-0", "10", 2);
addNormEntry("wisc", "in", "13-0", "11", 3);
addNormEntry("wisc", "in", "13-0", "12", 4);
addNormEntry("wisc", "in", "13-0", "13", 5);
addNormEntry("wisc", "in", "13-0", "14", 6);
addNormEntry("wisc", "in", "13-0", "15", 7);
addNormEntry("wisc", "in", "13-0", "16", 8);
addNormEntry("wisc", "in", "13-0", "17", 9);
addNormEntry("wisc", "in", "13-0", "18", 10);
addNormEntry("wisc", "in", "13-0", "19", 11);
addNormEntry("wisc", "in", "13-0", "20-21", 12);
addNormEntry("wisc", "in", "13-0", "22", 13);
addNormEntry("wisc", "in", "13-0", "23", 14);
addNormEntry("wisc", "in", "13-0", "24-25", 15);
addNormEntry("wisc", "in", "13-0", "26", 16);
addNormEntry("wisc", "in", "13-0", "27", 17);
addNormEntry("wisc", "in", "13-0", "28-29", 18);
addNormEntry("wisc", "in", "13-0", "30-33", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "13-4", "0-9", 1);
addNormEntry("wisc", "in", "13-4", "10", 2);
addNormEntry("wisc", "in", "13-4", "11", 3);
addNormEntry("wisc", "in", "13-4", "12", 4);
addNormEntry("wisc", "in", "13-4", "13", 5);
addNormEntry("wisc", "in", "13-4", "14", 6);
addNormEntry("wisc", "in", "13-4", "15", 7);
addNormEntry("wisc", "in", "13-4", "16", 8);
addNormEntry("wisc", "in", "13-4", "17", 9);
addNormEntry("wisc", "in", "13-4", "18", 10);
addNormEntry("wisc", "in", "13-4", "19-20", 11);
addNormEntry("wisc", "in", "13-4", "21", 12);
addNormEntry("wisc", "in", "13-4", "22", 13);
addNormEntry("wisc", "in", "13-4", "23-24", 14);
addNormEntry("wisc", "in", "13-4", "25", 15);
addNormEntry("wisc", "in", "13-4", "26", 16);
addNormEntry("wisc", "in", "13-4", "27-28", 17);
addNormEntry("wisc", "in", "13-4", "29", 18);
addNormEntry("wisc", "in", "13-4", "30-33", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "13-8", "0-9", 1);
addNormEntry("wisc", "in", "13-8", "10", 2);
addNormEntry("wisc", "in", "13-8", "11", 3);
addNormEntry("wisc", "in", "13-8", "12", 4);
addNormEntry("wisc", "in", "13-8", "13", 5);
addNormEntry("wisc", "in", "13-8", "14", 6);
addNormEntry("wisc", "in", "13-8", "15", 7);
addNormEntry("wisc", "in", "13-8", "16", 8);
addNormEntry("wisc", "in", "13-8", "17", 9);
addNormEntry("wisc", "in", "13-8", "18-19", 10);
addNormEntry("wisc", "in", "13-8", "20", 11);
addNormEntry("wisc", "in", "13-8", "21", 12);
addNormEntry("wisc", "in", "13-8", "22-23", 13);
addNormEntry("wisc", "in", "13-8", "24", 14);
addNormEntry("wisc", "in", "13-8", "25", 15);
addNormEntry("wisc", "in", "13-8", "26-27", 16);
addNormEntry("wisc", "in", "13-8", "28", 17);
addNormEntry("wisc", "in", "13-8", "29-30", 18);
addNormEntry("wisc", "in", "13-8", "31-33", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "14-0", "0-9", 1);
addNormEntry("wisc", "in", "14-0", "10", 2);
addNormEntry("wisc", "in", "14-0", "11", 3);
addNormEntry("wisc", "in", "14-0", "12", 4);
addNormEntry("wisc", "in", "14-0", "13", 5);
addNormEntry("wisc", "in", "14-0", "14", 6);
addNormEntry("wisc", "in", "14-0", "15", 7);
addNormEntry("wisc", "in", "14-0", "16-17", 8);
addNormEntry("wisc", "in", "14-0", "18", 9);
addNormEntry("wisc", "in", "14-0", "19", 10);
addNormEntry("wisc", "in", "14-0", "20", 11);
addNormEntry("wisc", "in", "14-0", "21-22", 12);
addNormEntry("wisc", "in", "14-0", "23", 13);
addNormEntry("wisc", "in", "14-0", "24-25", 14);
addNormEntry("wisc", "in", "14-0", "26", 15);
addNormEntry("wisc", "in", "14-0", "27", 16);
addNormEntry("wisc", "in", "14-0", "28-29", 17);
addNormEntry("wisc", "in", "14-0", "30-31", 18);
addNormEntry("wisc", "in", "14-0", "32-33", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "14-4", "0-9", 1);
addNormEntry("wisc", "in", "14-4", "10", 2);
addNormEntry("wisc", "in", "14-4", "11", 3);
addNormEntry("wisc", "in", "14-4", "12", 4);
addNormEntry("wisc", "in", "14-4", "13", 5);
addNormEntry("wisc", "in", "14-4", "14", 6);
addNormEntry("wisc", "in", "14-4", "15-16", 7);
addNormEntry("wisc", "in", "14-4", "17", 8);
addNormEntry("wisc", "in", "14-4", "18", 9);
addNormEntry("wisc", "in", "14-4", "19", 10);
addNormEntry("wisc", "in", "14-4", "20-21", 11);
addNormEntry("wisc", "in", "14-4", "22", 12);
addNormEntry("wisc", "in", "14-4", "23-24", 13);
addNormEntry("wisc", "in", "14-4", "25", 14);
addNormEntry("wisc", "in", "14-4", "26", 15);
addNormEntry("wisc", "in", "14-4", "27-28", 16);
addNormEntry("wisc", "in", "14-4", "29", 17);
addNormEntry("wisc", "in", "14-4", "30-31", 18);
addNormEntry("wisc", "in", "14-4", "32-33", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "14-8", "0-9", 1);
addNormEntry("wisc", "in", "14-8", "10", 2);
addNormEntry("wisc", "in", "14-8", "11", 3);
addNormEntry("wisc", "in", "14-8", "12", 4);
addNormEntry("wisc", "in", "14-8", "13-14", 5);
addNormEntry("wisc", "in", "14-8", "15", 6);
addNormEntry("wisc", "in", "14-8", "16", 7);
addNormEntry("wisc", "in", "14-8", "17", 8);
addNormEntry("wisc", "in", "14-8", "18", 9);
addNormEntry("wisc", "in", "14-8", "19-20", 10);
addNormEntry("wisc", "in", "14-8", "21", 11);
addNormEntry("wisc", "in", "14-8", "22", 12);
addNormEntry("wisc", "in", "14-8", "23-24", 13);
addNormEntry("wisc", "in", "14-8", "25", 14);
addNormEntry("wisc", "in", "14-8", "26-27", 15);
addNormEntry("wisc", "in", "14-8", "28", 16);
addNormEntry("wisc", "in", "14-8", "29-30", 17);
addNormEntry("wisc", "in", "14-8", "31", 18);
addNormEntry("wisc", "in", "14-8", "32-33", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "15-0", "0-9", 1);
addNormEntry("wisc", "in", "15-0", "10", 2);
addNormEntry("wisc", "in", "15-0", "11", 3);
addNormEntry("wisc", "in", "15-0", "12-13", 4);
addNormEntry("wisc", "in", "15-0", "14", 5);
addNormEntry("wisc", "in", "15-0", "15", 6);
addNormEntry("wisc", "in", "15-0", "16", 7);
addNormEntry("wisc", "in", "15-0", "17-18", 8);
addNormEntry("wisc", "in", "15-0", "19", 9);
addNormEntry("wisc", "in", "15-0", "20", 10);
addNormEntry("wisc", "in", "15-0", "21-22", 11);
addNormEntry("wisc", "in", "15-0", "23", 12);
addNormEntry("wisc", "in", "15-0", "24-25", 13);
addNormEntry("wisc", "in", "15-0", "26", 14);
addNormEntry("wisc", "in", "15-0", "27-28", 15);
addNormEntry("wisc", "in", "15-0", "29", 16);
addNormEntry("wisc", "in", "15-0", "30-31", 17);
addNormEntry("wisc", "in", "15-0", "32", 18);
addNormEntry("wisc", "in", "15-0", "33", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "15-4", "0-9", 1);
addNormEntry("wisc", "in", "15-4", "10", 2);
addNormEntry("wisc", "in", "15-4", "11", 3);
addNormEntry("wisc", "in", "15-4", "12-13", 4);
addNormEntry("wisc", "in", "15-4", "14", 5);
addNormEntry("wisc", "in", "15-4", "15", 6);
addNormEntry("wisc", "in", "15-4", "16-17", 7);
addNormEntry("wisc", "in", "15-4", "18", 8);
addNormEntry("wisc", "in", "15-4", "19-20", 9);
addNormEntry("wisc", "in", "15-4", "21", 10);
addNormEntry("wisc", "in", "15-4", "22", 11);
addNormEntry("wisc", "in", "15-4", "23-24", 12);
addNormEntry("wisc", "in", "15-4", "25", 13);
addNormEntry("wisc", "in", "15-4", "26-27", 14);
addNormEntry("wisc", "in", "15-4", "28", 15);
addNormEntry("wisc", "in", "15-4", "29-30", 16);
addNormEntry("wisc", "in", "15-4", "31", 17);
addNormEntry("wisc", "in", "15-4", "32", 18);
addNormEntry("wisc", "in", "15-4", "33", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "15-8", "0-9", 1);
addNormEntry("wisc", "in", "15-8", "10", 2);
addNormEntry("wisc", "in", "15-8", "11", 3);
addNormEntry("wisc", "in", "15-8", "12-13", 4);
addNormEntry("wisc", "in", "15-8", "14", 5);
addNormEntry("wisc", "in", "15-8", "15-16", 6);
addNormEntry("wisc", "in", "15-8", "17", 7);
addNormEntry("wisc", "in", "15-8", "18", 8);
addNormEntry("wisc", "in", "15-8", "19-20", 9);
addNormEntry("wisc", "in", "15-8", "21", 10);
addNormEntry("wisc", "in", "15-8", "22-23", 11);
addNormEntry("wisc", "in", "15-8", "24", 12);
addNormEntry("wisc", "in", "15-8", "25-26", 13);
addNormEntry("wisc", "in", "15-8", "27", 14);
addNormEntry("wisc", "in", "15-8", "28-29", 15);
addNormEntry("wisc", "in", "15-8", "30", 16);
addNormEntry("wisc", "in", "15-8", "31", 17);
addNormEntry("wisc", "in", "15-8", "32", 18);
addNormEntry("wisc", "in", "15-8", "33", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Informação)
addNormEntry("wisc", "in", "16-0", "0-9", 1);
addNormEntry("wisc", "in", "16-0", "10", 2);
addNormEntry("wisc", "in", "16-0", "11", 3);
addNormEntry("wisc", "in", "16-0", "12-13", 4);
addNormEntry("wisc", "in", "16-0", "14", 5);
addNormEntry("wisc", "in", "16-0", "15-16", 6);
addNormEntry("wisc", "in", "16-0", "17", 7);
addNormEntry("wisc", "in", "16-0", "18-19", 8);
addNormEntry("wisc", "in", "16-0", "20", 9);
addNormEntry("wisc", "in", "16-0", "21", 10);
addNormEntry("wisc", "in", "16-0", "22-23", 11);
addNormEntry("wisc", "in", "16-0", "24", 12);
addNormEntry("wisc", "in", "16-0", "25-26", 13);
addNormEntry("wisc", "in", "16-0", "27", 14);
addNormEntry("wisc", "in", "16-0", "28-29", 15);
addNormEntry("wisc", "in", "16-0", "30", 16);
addNormEntry("wisc", "in", "16-0", "31", 17);
addNormEntry("wisc", "in", "16-0", "32", 18);
addNormEntry("wisc", "in", "16-0", "33", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Informação)
addNormEntry("wisc", "in", "16-4", "0-9", 1);
addNormEntry("wisc", "in", "16-4", "10", 2);
addNormEntry("wisc", "in", "16-4", "11", 3);
addNormEntry("wisc", "in", "16-4", "12-13", 4);
addNormEntry("wisc", "in", "16-4", "14", 5);
addNormEntry("wisc", "in", "16-4", "15-16", 6);
addNormEntry("wisc", "in", "16-4", "17", 7);
addNormEntry("wisc", "in", "16-4", "18-19", 8);
addNormEntry("wisc", "in", "16-4", "20", 9);
addNormEntry("wisc", "in", "16-4", "21", 10);
addNormEntry("wisc", "in", "16-4", "22-23", 11);
addNormEntry("wisc", "in", "16-4", "24", 12);
addNormEntry("wisc", "in", "16-4", "25-26", 13);
addNormEntry("wisc", "in", "16-4", "27", 14);
addNormEntry("wisc", "in", "16-4", "28-29", 15);
addNormEntry("wisc", "in", "16-4", "30", 16);
addNormEntry("wisc", "in", "16-4", "31", 17);
addNormEntry("wisc", "in", "16-4", "32", 18);
addNormEntry("wisc", "in", "16-4", "33", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Informação)
addNormEntry("wisc", "in", "16-8", "0-9", 1);
addNormEntry("wisc", "in", "16-8", "10", 2);
addNormEntry("wisc", "in", "16-8", "11", 3);
addNormEntry("wisc", "in", "16-8", "12-13", 4);
addNormEntry("wisc", "in", "16-8", "14", 5);
addNormEntry("wisc", "in", "16-8", "15-16", 6);
addNormEntry("wisc", "in", "16-8", "17", 7);
addNormEntry("wisc", "in", "16-8", "18-19", 8);
addNormEntry("wisc", "in", "16-8", "20", 9);
addNormEntry("wisc", "in", "16-8", "21", 10);
addNormEntry("wisc", "in", "16-8", "22-23", 11);
addNormEntry("wisc", "in", "16-8", "24", 12);
addNormEntry("wisc", "in", "16-8", "25-26", 13);
addNormEntry("wisc", "in", "16-8", "27", 14);
addNormEntry("wisc", "in", "16-8", "28-29", 15);
addNormEntry("wisc", "in", "16-8", "30", 16);
addNormEntry("wisc", "in", "16-8", "31", 17);
addNormEntry("wisc", "in", "16-8", "32", 18);
addNormEntry("wisc", "in", "16-8", "33", 19);

// --- Normas do Subteste Aritmética (AR) ---

// FAIXA 6-0 — 6 anos (Aritmética)
addNormEntry("wisc", "ar", "6-0", "-", 1);
addNormEntry("wisc", "ar", "6-0", "0", 2);
addNormEntry("wisc", "ar", "6-0", "-", 3);
addNormEntry("wisc", "ar", "6-0", "1", 4);
addNormEntry("wisc", "ar", "6-0", "2", 5);
addNormEntry("wisc", "ar", "6-0", "3", 6);
addNormEntry("wisc", "ar", "6-0", "4", 7);
addNormEntry("wisc", "ar", "6-0", "5-6", 8);
addNormEntry("wisc", "ar", "6-0", "7", 9);
addNormEntry("wisc", "ar", "6-0", "8", 10);
addNormEntry("wisc", "ar", "6-0", "9", 11);
addNormEntry("wisc", "ar", "6-0", "10-11", 12);
addNormEntry("wisc", "ar", "6-0", "12-13", 13);
addNormEntry("wisc", "ar", "6-0", "14", 14);
addNormEntry("wisc", "ar", "6-0", "15", 15);
addNormEntry("wisc", "ar", "6-0", "16", 16);
addNormEntry("wisc", "ar", "6-0", "17", 17);
addNormEntry("wisc", "ar", "6-0", "18-19", 18);
addNormEntry("wisc", "ar", "6-0", "20-34", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "6-4", "0", 1);
addNormEntry("wisc", "ar", "6-4", "-", 2);
addNormEntry("wisc", "ar", "6-4", "1", 3);
addNormEntry("wisc", "ar", "6-4", "2", 4);
addNormEntry("wisc", "ar", "6-4", "3-4", 5);
addNormEntry("wisc", "ar", "6-4", "5", 6);
addNormEntry("wisc", "ar", "6-4", "6", 7);
addNormEntry("wisc", "ar", "6-4", "7", 8);
addNormEntry("wisc", "ar", "6-4", "8-9", 9);
addNormEntry("wisc", "ar", "6-4", "10", 10);
addNormEntry("wisc", "ar", "6-4", "11", 11);
addNormEntry("wisc", "ar", "6-4", "12-13", 12);
addNormEntry("wisc", "ar", "6-4", "14", 13);
addNormEntry("wisc", "ar", "6-4", "15", 14);
addNormEntry("wisc", "ar", "6-4", "16-17", 15);
addNormEntry("wisc", "ar", "6-4", "18", 16);
addNormEntry("wisc", "ar", "6-4", "19", 17);
addNormEntry("wisc", "ar", "6-4", "20-21", 18);
addNormEntry("wisc", "ar", "6-4", "22-34", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "6-8", "0", 1);
addNormEntry("wisc", "ar", "6-8", "1", 2);
addNormEntry("wisc", "ar", "6-8", "2", 3);
addNormEntry("wisc", "ar", "6-8", "3-4", 4);
addNormEntry("wisc", "ar", "6-8", "5", 5);
addNormEntry("wisc", "ar", "6-8", "6", 6);
addNormEntry("wisc", "ar", "6-8", "7-8", 7);
addNormEntry("wisc", "ar", "6-8", "9", 8);
addNormEntry("wisc", "ar", "6-8", "10", 9);
addNormEntry("wisc", "ar", "6-8", "11-12", 10);
addNormEntry("wisc", "ar", "6-8", "13", 11);
addNormEntry("wisc", "ar", "6-8", "14", 12);
addNormEntry("wisc", "ar", "6-8", "15-16", 13);
addNormEntry("wisc", "ar", "6-8", "17", 14);
addNormEntry("wisc", "ar", "6-8", "18", 15);
addNormEntry("wisc", "ar", "6-8", "19", 16);
addNormEntry("wisc", "ar", "6-8", "20-21", 17);
addNormEntry("wisc", "ar", "6-8", "22", 18);
addNormEntry("wisc", "ar", "6-8", "23-34", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "7-0", "0-1", 1);
addNormEntry("wisc", "ar", "7-0", "2-3", 2);
addNormEntry("wisc", "ar", "7-0", "4", 3);
addNormEntry("wisc", "ar", "7-0", "5", 4);
addNormEntry("wisc", "ar", "7-0", "6-7", 5);
addNormEntry("wisc", "ar", "7-0", "8", 6);
addNormEntry("wisc", "ar", "7-0", "9", 7);
addNormEntry("wisc", "ar", "7-0", "10-11", 8);
addNormEntry("wisc", "ar", "7-0", "12", 9);
addNormEntry("wisc", "ar", "7-0", "13", 10);
addNormEntry("wisc", "ar", "7-0", "14", 11);
addNormEntry("wisc", "ar", "7-0", "15-16", 12);
addNormEntry("wisc", "ar", "7-0", "17", 13);
addNormEntry("wisc", "ar", "7-0", "18", 14);
addNormEntry("wisc", "ar", "7-0", "19-20", 15);
addNormEntry("wisc", "ar", "7-0", "21", 16);
addNormEntry("wisc", "ar", "7-0", "22", 17);
addNormEntry("wisc", "ar", "7-0", "23", 18);
addNormEntry("wisc", "ar", "7-0", "24-34", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "7-4", "0-2", 1);
addNormEntry("wisc", "ar", "7-4", "3-4", 2);
addNormEntry("wisc", "ar", "7-4", "5", 3);
addNormEntry("wisc", "ar", "7-4", "6", 4);
addNormEntry("wisc", "ar", "7-4", "7-8", 5);
addNormEntry("wisc", "ar", "7-4", "9", 6);
addNormEntry("wisc", "ar", "7-4", "10-11", 7);
addNormEntry("wisc", "ar", "7-4", "12", 8);
addNormEntry("wisc", "ar", "7-4", "13", 9);
addNormEntry("wisc", "ar", "7-4", "14", 10);
addNormEntry("wisc", "ar", "7-4", "15-16", 11);
addNormEntry("wisc", "ar", "7-4", "17", 12);
addNormEntry("wisc", "ar", "7-4", "18", 13);
addNormEntry("wisc", "ar", "7-4", "19-20", 14);
addNormEntry("wisc", "ar", "7-4", "21", 15);
addNormEntry("wisc", "ar", "7-4", "22", 16);
addNormEntry("wisc", "ar", "7-4", "23", 17);
addNormEntry("wisc", "ar", "7-4", "24-25", 18);
addNormEntry("wisc", "ar", "7-4", "26-34", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "7-8", "0-4", 1);
addNormEntry("wisc", "ar", "7-8", "5", 2);
addNormEntry("wisc", "ar", "7-8", "6", 3);
addNormEntry("wisc", "ar", "7-8", "7-8", 4);
addNormEntry("wisc", "ar", "7-8", "9", 5);
addNormEntry("wisc", "ar", "7-8", "10", 6);
addNormEntry("wisc", "ar", "7-8", "11-12", 7);
addNormEntry("wisc", "ar", "7-8", "13", 8);
addNormEntry("wisc", "ar", "7-8", "14", 9);
addNormEntry("wisc", "ar", "7-8", "15-16", 10);
addNormEntry("wisc", "ar", "7-8", "17", 11);
addNormEntry("wisc", "ar", "7-8", "18", 12);
addNormEntry("wisc", "ar", "7-8", "19-20", 13);
addNormEntry("wisc", "ar", "7-8", "21", 14);
addNormEntry("wisc", "ar", "7-8", "22", 15);
addNormEntry("wisc", "ar", "7-8", "23", 16);
addNormEntry("wisc", "ar", "7-8", "24-25", 17);
addNormEntry("wisc", "ar", "7-8", "26", 18);
addNormEntry("wisc", "ar", "7-8", "27-34", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "8-0", "0-4", 1);
addNormEntry("wisc", "ar", "8-0", "5-6", 2);
addNormEntry("wisc", "ar", "8-0", "7", 3);
addNormEntry("wisc", "ar", "8-0", "8-9", 4);
addNormEntry("wisc", "ar", "8-0", "10", 5);
addNormEntry("wisc", "ar", "8-0", "11", 6);
addNormEntry("wisc", "ar", "8-0", "12-13", 7);
addNormEntry("wisc", "ar", "8-0", "14", 8);
addNormEntry("wisc", "ar", "8-0", "15", 9);
addNormEntry("wisc", "ar", "8-0", "16-17", 10);
addNormEntry("wisc", "ar", "8-0", "18", 11);
addNormEntry("wisc", "ar", "8-0", "19", 12);
addNormEntry("wisc", "ar", "8-0", "20-21", 13);
addNormEntry("wisc", "ar", "8-0", "22", 14);
addNormEntry("wisc", "ar", "8-0", "23", 15);
addNormEntry("wisc", "ar", "8-0", "24", 16);
addNormEntry("wisc", "ar", "8-0", "25-26", 17);
addNormEntry("wisc", "ar", "8-0", "27", 18);
addNormEntry("wisc", "ar", "8-0", "28-34", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "8-4", "0-5", 1);
addNormEntry("wisc", "ar", "8-4", "6-7", 2);
addNormEntry("wisc", "ar", "8-4", "8", 3);
addNormEntry("wisc", "ar", "8-4", "9-10", 4);
addNormEntry("wisc", "ar", "8-4", "11", 5);
addNormEntry("wisc", "ar", "8-4", "12", 6);
addNormEntry("wisc", "ar", "8-4", "13-14", 7);
addNormEntry("wisc", "ar", "8-4", "15", 8);
addNormEntry("wisc", "ar", "8-4", "16", 9);
addNormEntry("wisc", "ar", "8-4", "17-18", 10);
addNormEntry("wisc", "ar", "8-4", "19", 11);
addNormEntry("wisc", "ar", "8-4", "20", 12);
addNormEntry("wisc", "ar", "8-4", "21", 13);
addNormEntry("wisc", "ar", "8-4", "22-23", 14);
addNormEntry("wisc", "ar", "8-4", "24", 15);
addNormEntry("wisc", "ar", "8-4", "25", 16);
addNormEntry("wisc", "ar", "8-4", "26", 17);
addNormEntry("wisc", "ar", "8-4", "27-28", 18);
addNormEntry("wisc", "ar", "8-4", "29-34", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "8-8", "0-6", 1);
addNormEntry("wisc", "ar", "8-8", "7-8", 2);
addNormEntry("wisc", "ar", "8-8", "9", 3);
addNormEntry("wisc", "ar", "8-8", "10", 4);
addNormEntry("wisc", "ar", "8-8", "11-12", 5);
addNormEntry("wisc", "ar", "8-8", "13", 6);
addNormEntry("wisc", "ar", "8-8", "14", 7);
addNormEntry("wisc", "ar", "8-8", "15-16", 8);
addNormEntry("wisc", "ar", "8-8", "17", 9);
addNormEntry("wisc", "ar", "8-8", "18", 10);
addNormEntry("wisc", "ar", "8-8", "19-20", 11);
addNormEntry("wisc", "ar", "8-8", "21", 12);
addNormEntry("wisc", "ar", "8-8", "22", 13);
addNormEntry("wisc", "ar", "8-8", "23-24", 14);
addNormEntry("wisc", "ar", "8-8", "25", 15);
addNormEntry("wisc", "ar", "8-8", "26", 16);
addNormEntry("wisc", "ar", "8-8", "27", 17);
addNormEntry("wisc", "ar", "8-8", "28", 18);
addNormEntry("wisc", "ar", "8-8", "29-34", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "9-0", "0-7", 1);
addNormEntry("wisc", "ar", "9-0", "8", 2);
addNormEntry("wisc", "ar", "9-0", "9-10", 3);
addNormEntry("wisc", "ar", "9-0", "11", 4);
addNormEntry("wisc", "ar", "9-0", "12", 5);
addNormEntry("wisc", "ar", "9-0", "13-14", 6);
addNormEntry("wisc", "ar", "9-0", "15", 7);
addNormEntry("wisc", "ar", "9-0", "16-17", 8);
addNormEntry("wisc", "ar", "9-0", "18", 9);
addNormEntry("wisc", "ar", "9-0", "19", 10);
addNormEntry("wisc", "ar", "9-0", "20-21", 11);
addNormEntry("wisc", "ar", "9-0", "22", 12);
addNormEntry("wisc", "ar", "9-0", "23", 13);
addNormEntry("wisc", "ar", "9-0", "24", 14);
addNormEntry("wisc", "ar", "9-0", "25", 15);
addNormEntry("wisc", "ar", "9-0", "26-27", 16);
addNormEntry("wisc", "ar", "9-0", "28", 17);
addNormEntry("wisc", "ar", "9-0", "29", 18);
addNormEntry("wisc", "ar", "9-0", "30-34", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "9-4", "0-7", 1);
addNormEntry("wisc", "ar", "9-4", "8-9", 2);
addNormEntry("wisc", "ar", "9-4", "10", 3);
addNormEntry("wisc", "ar", "9-4", "11-12", 4);
addNormEntry("wisc", "ar", "9-4", "13", 5);
addNormEntry("wisc", "ar", "9-4", "14", 6);
addNormEntry("wisc", "ar", "9-4", "15-16", 7);
addNormEntry("wisc", "ar", "9-4", "17", 8);
addNormEntry("wisc", "ar", "9-4", "18-19", 9);
addNormEntry("wisc", "ar", "9-4", "20", 10);
addNormEntry("wisc", "ar", "9-4", "21", 11);
addNormEntry("wisc", "ar", "9-4", "22", 12);
addNormEntry("wisc", "ar", "9-4", "23-24", 13);
addNormEntry("wisc", "ar", "9-4", "25", 14);
addNormEntry("wisc", "ar", "9-4", "26", 15);
addNormEntry("wisc", "ar", "9-4", "27", 16);
addNormEntry("wisc", "ar", "9-4", "28", 17);
addNormEntry("wisc", "ar", "9-4", "29-30", 18);
addNormEntry("wisc", "ar", "9-4", "31-34", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "9-8", "0-8", 1);
addNormEntry("wisc", "ar", "9-8", "9", 2);
addNormEntry("wisc", "ar", "9-8", "10-11", 3);
addNormEntry("wisc", "ar", "9-8", "12", 4);
addNormEntry("wisc", "ar", "9-8", "13-14", 5);
addNormEntry("wisc", "ar", "9-8", "15", 6);
addNormEntry("wisc", "ar", "9-8", "16", 7);
addNormEntry("wisc", "ar", "9-8", "17-18", 8);
addNormEntry("wisc", "ar", "9-8", "19", 9);
addNormEntry("wisc", "ar", "9-8", "20-21", 10);
addNormEntry("wisc", "ar", "9-8", "22", 11);
addNormEntry("wisc", "ar", "9-8", "23", 12);
addNormEntry("wisc", "ar", "9-8", "24", 13);
addNormEntry("wisc", "ar", "9-8", "25-26", 14);
addNormEntry("wisc", "ar", "9-8", "27", 15);
addNormEntry("wisc", "ar", "9-8", "28", 16);
addNormEntry("wisc", "ar", "9-8", "29", 17);
addNormEntry("wisc", "ar", "9-8", "30", 18);
addNormEntry("wisc", "ar", "9-8", "31-34", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "10-0", "0-8", 1);
addNormEntry("wisc", "ar", "10-0", "9-10", 2);
addNormEntry("wisc", "ar", "10-0", "11", 3);
addNormEntry("wisc", "ar", "10-0", "12-13", 4);
addNormEntry("wisc", "ar", "10-0", "14", 5);
addNormEntry("wisc", "ar", "10-0", "15-16", 6);
addNormEntry("wisc", "ar", "10-0", "17", 7);
addNormEntry("wisc", "ar", "10-0", "18", 8);
addNormEntry("wisc", "ar", "10-0", "19-20", 9);
addNormEntry("wisc", "ar", "10-0", "21", 10);
addNormEntry("wisc", "ar", "10-0", "22", 11);
addNormEntry("wisc", "ar", "10-0", "23-24", 12);
addNormEntry("wisc", "ar", "10-0", "25", 13);
addNormEntry("wisc", "ar", "10-0", "26", 14);
addNormEntry("wisc", "ar", "10-0", "27", 15);
addNormEntry("wisc", "ar", "10-0", "28", 16);
addNormEntry("wisc", "ar", "10-0", "29", 17);
addNormEntry("wisc", "ar", "10-0", "30", 18);
addNormEntry("wisc", "ar", "10-0", "31-34", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "10-4", "0-9", 1);
addNormEntry("wisc", "ar", "10-4", "10", 2);
addNormEntry("wisc", "ar", "10-4", "11-12", 3);
addNormEntry("wisc", "ar", "10-4", "13", 4);
addNormEntry("wisc", "ar", "10-4", "14-15", 5);
addNormEntry("wisc", "ar", "10-4", "16", 6);
addNormEntry("wisc", "ar", "10-4", "17", 7);
addNormEntry("wisc", "ar", "10-4", "18-19", 8);
addNormEntry("wisc", "ar", "10-4", "20", 9);
addNormEntry("wisc", "ar", "10-4", "21-22", 10);
addNormEntry("wisc", "ar", "10-4", "23", 11);
addNormEntry("wisc", "ar", "10-4", "24", 12);
addNormEntry("wisc", "ar", "10-4", "25", 13);
addNormEntry("wisc", "ar", "10-4", "26-27", 14);
addNormEntry("wisc", "ar", "10-4", "28", 15);
addNormEntry("wisc", "ar", "10-4", "29", 16);
addNormEntry("wisc", "ar", "10-4", "30", 17);
addNormEntry("wisc", "ar", "10-4", "31", 18);
addNormEntry("wisc", "ar", "10-4", "32-34", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "10-8", "0-9", 1);
addNormEntry("wisc", "ar", "10-8", "10-11", 2);
addNormEntry("wisc", "ar", "10-8", "12", 3);
addNormEntry("wisc", "ar", "10-8", "13-14", 4);
addNormEntry("wisc", "ar", "10-8", "15", 5);
addNormEntry("wisc", "ar", "10-8", "16", 6);
addNormEntry("wisc", "ar", "10-8", "17-18", 7);
addNormEntry("wisc", "ar", "10-8", "19", 8);
addNormEntry("wisc", "ar", "10-8", "20-21", 9);
addNormEntry("wisc", "ar", "10-8", "22", 10);
addNormEntry("wisc", "ar", "10-8", "23", 11);
addNormEntry("wisc", "ar", "10-8", "24-25", 12);
addNormEntry("wisc", "ar", "10-8", "26", 13);
addNormEntry("wisc", "ar", "10-8", "27", 14);
addNormEntry("wisc", "ar", "10-8", "28", 15);
addNormEntry("wisc", "ar", "10-8", "29", 16);
addNormEntry("wisc", "ar", "10-8", "30", 17);
addNormEntry("wisc", "ar", "10-8", "31", 18);
addNormEntry("wisc", "ar", "10-8", "32-34", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "11-0", "0-9", 1);
addNormEntry("wisc", "ar", "11-0", "10-11", 2);
addNormEntry("wisc", "ar", "11-0", "12", 3);
addNormEntry("wisc", "ar", "11-0", "13-14", 4);
addNormEntry("wisc", "ar", "11-0", "15", 5);
addNormEntry("wisc", "ar", "11-0", "16-17", 6);
addNormEntry("wisc", "ar", "11-0", "18", 7);
addNormEntry("wisc", "ar", "11-0", "19-20", 8);
addNormEntry("wisc", "ar", "11-0", "21", 9);
addNormEntry("wisc", "ar", "11-0", "22", 10);
addNormEntry("wisc", "ar", "11-0", "23-24", 11);
addNormEntry("wisc", "ar", "11-0", "25", 12);
addNormEntry("wisc", "ar", "11-0", "26", 13);
addNormEntry("wisc", "ar", "11-0", "27", 14);
addNormEntry("wisc", "ar", "11-0", "28", 15);
addNormEntry("wisc", "ar", "11-0", "29", 16);
addNormEntry("wisc", "ar", "11-0", "30", 17);
addNormEntry("wisc", "ar", "11-0", "31", 18);
addNormEntry("wisc", "ar", "11-0", "32-34", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "11-4", "0-10", 1);
addNormEntry("wisc", "ar", "11-4", "11", 2);
addNormEntry("wisc", "ar", "11-4", "12-13", 3);
addNormEntry("wisc", "ar", "11-4", "14", 4);
addNormEntry("wisc", "ar", "11-4", "15-16", 5);
addNormEntry("wisc", "ar", "11-4", "17", 6);
addNormEntry("wisc", "ar", "11-4", "18-19", 7);
addNormEntry("wisc", "ar", "11-4", "20", 8);
addNormEntry("wisc", "ar", "11-4", "21", 9);
addNormEntry("wisc", "ar", "11-4", "22-23", 10);
addNormEntry("wisc", "ar", "11-4", "24", 11);
addNormEntry("wisc", "ar", "11-4", "25", 12);
addNormEntry("wisc", "ar", "11-4", "26-27", 13);
addNormEntry("wisc", "ar", "11-4", "28", 14);
addNormEntry("wisc", "ar", "11-4", "29", 15);
addNormEntry("wisc", "ar", "11-4", "30", 16);
addNormEntry("wisc", "ar", "11-4", "31", 17);
addNormEntry("wisc", "ar", "11-4", "32", 18);
addNormEntry("wisc", "ar", "11-4", "33-34", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "11-8", "0-10", 1);
addNormEntry("wisc", "ar", "11-8", "11", 2);
addNormEntry("wisc", "ar", "11-8", "12-13", 3);
addNormEntry("wisc", "ar", "11-8", "14-15", 4);
addNormEntry("wisc", "ar", "11-8", "16", 5);
addNormEntry("wisc", "ar", "11-8", "17-18", 6);
addNormEntry("wisc", "ar", "11-8", "19", 7);
addNormEntry("wisc", "ar", "11-8", "20", 8);
addNormEntry("wisc", "ar", "11-8", "21-22", 9);
addNormEntry("wisc", "ar", "11-8", "23", 10);
addNormEntry("wisc", "ar", "11-8", "24", 11);
addNormEntry("wisc", "ar", "11-8", "25-26", 12);
addNormEntry("wisc", "ar", "11-8", "27", 13);
addNormEntry("wisc", "ar", "11-8", "28", 14);
addNormEntry("wisc", "ar", "11-8", "29", 15);
addNormEntry("wisc", "ar", "11-8", "30", 16);
addNormEntry("wisc", "ar", "11-8", "31", 17);
addNormEntry("wisc", "ar", "11-8", "32", 18);
addNormEntry("wisc", "ar", "11-8", "33-34", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "12-0", "0-10", 1);
addNormEntry("wisc", "ar", "12-0", "11-12", 2);
addNormEntry("wisc", "ar", "12-0", "13", 3);
addNormEntry("wisc", "ar", "12-0", "14-15", 4);
addNormEntry("wisc", "ar", "12-0", "16", 5);
addNormEntry("wisc", "ar", "12-0", "17-18", 6);
addNormEntry("wisc", "ar", "12-0", "19", 7);
addNormEntry("wisc", "ar", "12-0", "20-21", 8);
addNormEntry("wisc", "ar", "12-0", "22", 9);
addNormEntry("wisc", "ar", "12-0", "23", 10);
addNormEntry("wisc", "ar", "12-0", "24-25", 11);
addNormEntry("wisc", "ar", "12-0", "26", 12);
addNormEntry("wisc", "ar", "12-0", "27", 13);
addNormEntry("wisc", "ar", "12-0", "28", 14);
addNormEntry("wisc", "ar", "12-0", "29", 15);
addNormEntry("wisc", "ar", "12-0", "30", 16);
addNormEntry("wisc", "ar", "12-0", "31", 17);
addNormEntry("wisc", "ar", "12-0", "32", 18);
addNormEntry("wisc", "ar", "12-0", "33-34", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "12-4", "0-10", 1);
addNormEntry("wisc", "ar", "12-4", "11-12", 2);
addNormEntry("wisc", "ar", "12-4", "13-14", 3);
addNormEntry("wisc", "ar", "12-4", "15", 4);
addNormEntry("wisc", "ar", "12-4", "16-17", 5);
addNormEntry("wisc", "ar", "12-4", "18", 6);
addNormEntry("wisc", "ar", "12-4", "19-20", 7);
addNormEntry("wisc", "ar", "12-4", "21", 8);
addNormEntry("wisc", "ar", "12-4", "22", 9);
addNormEntry("wisc", "ar", "12-4", "23-24", 10);
addNormEntry("wisc", "ar", "12-4", "25", 11);
addNormEntry("wisc", "ar", "12-4", "26", 12);
addNormEntry("wisc", "ar", "12-4", "27", 13);
addNormEntry("wisc", "ar", "12-4", "28-29", 14);
addNormEntry("wisc", "ar", "12-4", "30", 15);
addNormEntry("wisc", "ar", "12-4", "31", 16);
addNormEntry("wisc", "ar", "12-4", "-", 17);
addNormEntry("wisc", "ar", "12-4", "32", 18);
addNormEntry("wisc", "ar", "12-4", "33-34", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "12-8", "0-10", 1);
addNormEntry("wisc", "ar", "12-8", "11-12", 2);
addNormEntry("wisc", "ar", "12-8", "13-14", 3);
addNormEntry("wisc", "ar", "12-8", "15", 4);
addNormEntry("wisc", "ar", "12-8", "16-17", 5);
addNormEntry("wisc", "ar", "12-8", "18", 6);
addNormEntry("wisc", "ar", "12-8", "19-20", 7);
addNormEntry("wisc", "ar", "12-8", "21", 8);
addNormEntry("wisc", "ar", "12-8", "22-23", 9);
addNormEntry("wisc", "ar", "12-8", "24", 10);
addNormEntry("wisc", "ar", "12-8", "25", 11);
addNormEntry("wisc", "ar", "12-8", "26-27", 12);
addNormEntry("wisc", "ar", "12-8", "28", 13);
addNormEntry("wisc", "ar", "12-8", "29", 14);
addNormEntry("wisc", "ar", "12-8", "30", 15);
addNormEntry("wisc", "ar", "12-8", "31", 16);
addNormEntry("wisc", "ar", "12-8", "32", 17);
addNormEntry("wisc", "ar", "12-8", "-", 18);
addNormEntry("wisc", "ar", "12-8", "33-34", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "13-0", "0-11", 1);
addNormEntry("wisc", "ar", "13-0", "12", 2);
addNormEntry("wisc", "ar", "13-0", "13-14", 3);
addNormEntry("wisc", "ar", "13-0", "15-16", 4);
addNormEntry("wisc", "ar", "13-0", "17", 5);
addNormEntry("wisc", "ar", "13-0", "18-19", 6);
addNormEntry("wisc", "ar", "13-0", "20", 7);
addNormEntry("wisc", "ar", "13-0", "21-22", 8);
addNormEntry("wisc", "ar", "13-0", "23", 9);
addNormEntry("wisc", "ar", "13-0", "24", 10);
addNormEntry("wisc", "ar", "13-0", "25-26", 11);
addNormEntry("wisc", "ar", "13-0", "27", 12);
addNormEntry("wisc", "ar", "13-0", "28", 13);
addNormEntry("wisc", "ar", "13-0", "29", 14);
addNormEntry("wisc", "ar", "13-0", "30", 15);
addNormEntry("wisc", "ar", "13-0", "31", 16);
addNormEntry("wisc", "ar", "13-0", "32", 17);
addNormEntry("wisc", "ar", "13-0", "-", 18);
addNormEntry("wisc", "ar", "13-0", "33-34", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "13-4", "0-11", 1);
addNormEntry("wisc", "ar", "13-4", "12-13", 2);
addNormEntry("wisc", "ar", "13-4", "14", 3);
addNormEntry("wisc", "ar", "13-4", "15-16", 4);
addNormEntry("wisc", "ar", "13-4", "17", 5);
addNormEntry("wisc", "ar", "13-4", "18-19", 6);
addNormEntry("wisc", "ar", "13-4", "20", 7);
addNormEntry("wisc", "ar", "13-4", "21-22", 8);
addNormEntry("wisc", "ar", "13-4", "23", 9);
addNormEntry("wisc", "ar", "13-4", "24-25", 10);
addNormEntry("wisc", "ar", "13-4", "26", 11);
addNormEntry("wisc", "ar", "13-4", "27", 12);
addNormEntry("wisc", "ar", "13-4", "28", 13);
addNormEntry("wisc", "ar", "13-4", "29", 14);
addNormEntry("wisc", "ar", "13-4", "30", 15);
addNormEntry("wisc", "ar", "13-4", "31", 16);
addNormEntry("wisc", "ar", "13-4", "32", 17);
addNormEntry("wisc", "ar", "13-4", "-", 18);
addNormEntry("wisc", "ar", "13-4", "33-34", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "13-8", "0-11", 1);
addNormEntry("wisc", "ar", "13-8", "12-13", 2);
addNormEntry("wisc", "ar", "13-8", "14-15", 3);
addNormEntry("wisc", "ar", "13-8", "16-17", 4);
addNormEntry("wisc", "ar", "13-8", "18", 5);
addNormEntry("wisc", "ar", "13-8", "19-20", 6);
addNormEntry("wisc", "ar", "13-8", "21", 7);
addNormEntry("wisc", "ar", "13-8", "22-23", 8);
addNormEntry("wisc", "ar", "13-8", "24", 9);
addNormEntry("wisc", "ar", "13-8", "25-26", 10);
addNormEntry("wisc", "ar", "13-8", "27", 11);
addNormEntry("wisc", "ar", "13-8", "28", 12);
addNormEntry("wisc", "ar", "13-8", "29", 13);
addNormEntry("wisc", "ar", "13-8", "30", 14);
addNormEntry("wisc", "ar", "13-8", "31", 15);
addNormEntry("wisc", "ar", "13-8", "32", 16);
addNormEntry("wisc", "ar", "13-8", "33", 17);
addNormEntry("wisc", "ar", "13-8", "34", 18);
addNormEntry("wisc", "ar", "13-8", "35", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "14-0", "0-11", 1);
addNormEntry("wisc", "ar", "14-0", "12-13", 2);
addNormEntry("wisc", "ar", "14-0", "14-15", 3);
addNormEntry("wisc", "ar", "14-0", "16", 4);
addNormEntry("wisc", "ar", "14-0", "17-18", 5);
addNormEntry("wisc", "ar", "14-0", "19", 6);
addNormEntry("wisc", "ar", "14-0", "20-21", 7);
addNormEntry("wisc", "ar", "14-0", "22", 8);
addNormEntry("wisc", "ar", "14-0", "23-24", 9);
addNormEntry("wisc", "ar", "14-0", "25", 10);
addNormEntry("wisc", "ar", "14-0", "26-27", 11);
addNormEntry("wisc", "ar", "14-0", "28", 12);
addNormEntry("wisc", "ar", "14-0", "29", 13);
addNormEntry("wisc", "ar", "14-0", "30", 14);
addNormEntry("wisc", "ar", "14-0", "31", 15);
addNormEntry("wisc", "ar", "14-0", "32", 16);
addNormEntry("wisc", "ar", "14-0", "-", 17);
addNormEntry("wisc", "ar", "14-0", "33", 18);
addNormEntry("wisc", "ar", "14-0", "34", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "14-4", "0-11", 1);
addNormEntry("wisc", "ar", "14-4", "12-13", 2);
addNormEntry("wisc", "ar", "14-4", "14-15", 3);
addNormEntry("wisc", "ar", "14-4", "16", 4);
addNormEntry("wisc", "ar", "14-4", "17-18", 5);
addNormEntry("wisc", "ar", "14-4", "19", 6);
addNormEntry("wisc", "ar", "14-4", "20-21", 7);
addNormEntry("wisc", "ar", "14-4", "22", 8);
addNormEntry("wisc", "ar", "14-4", "23-24", 9);
addNormEntry("wisc", "ar", "14-4", "25", 10);
addNormEntry("wisc", "ar", "14-4", "26-27", 11);
addNormEntry("wisc", "ar", "14-4", "28", 12);
addNormEntry("wisc", "ar", "14-4", "29", 13);
addNormEntry("wisc", "ar", "14-4", "30", 14);
addNormEntry("wisc", "ar", "14-4", "31", 15);
addNormEntry("wisc", "ar", "14-4", "32", 16);
addNormEntry("wisc", "ar", "14-4", "-", 17);
addNormEntry("wisc", "ar", "14-4", "33", 18);
addNormEntry("wisc", "ar", "14-4", "34", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "14-8", "0-11", 1);
addNormEntry("wisc", "ar", "14-8", "12-13", 2);
addNormEntry("wisc", "ar", "14-8", "14-15", 3);
addNormEntry("wisc", "ar", "14-8", "16-17", 4);
addNormEntry("wisc", "ar", "14-8", "18", 5);
addNormEntry("wisc", "ar", "14-8", "19-20", 6);
addNormEntry("wisc", "ar", "14-8", "21-22", 7);
addNormEntry("wisc", "ar", "14-8", "23", 8);
addNormEntry("wisc", "ar", "14-8", "24-25", 9);
addNormEntry("wisc", "ar", "14-8", "26", 10);
addNormEntry("wisc", "ar", "14-8", "27", 11);
addNormEntry("wisc", "ar", "14-8", "28", 12);
addNormEntry("wisc", "ar", "14-8", "29", 13);
addNormEntry("wisc", "ar", "14-8", "30-31", 14);
addNormEntry("wisc", "ar", "14-8", "32", 15);
addNormEntry("wisc", "ar", "14-8", "-", 16);
addNormEntry("wisc", "ar", "14-8", "33", 17);
addNormEntry("wisc", "ar", "14-8", "-", 18);
addNormEntry("wisc", "ar", "14-8", "34", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "15-0", "0-11", 1);
addNormEntry("wisc", "ar", "15-0", "12-13", 2);
addNormEntry("wisc", "ar", "15-0", "14-15", 3);
addNormEntry("wisc", "ar", "15-0", "16-17", 4);
addNormEntry("wisc", "ar", "15-0", "18-19", 5);
addNormEntry("wisc", "ar", "15-0", "20", 6);
addNormEntry("wisc", "ar", "15-0", "21-22", 7);
addNormEntry("wisc", "ar", "15-0", "23", 8);
addNormEntry("wisc", "ar", "15-0", "24-25", 9);
addNormEntry("wisc", "ar", "15-0", "26", 10);
addNormEntry("wisc", "ar", "15-0", "27", 11);
addNormEntry("wisc", "ar", "15-0", "28-29", 12);
addNormEntry("wisc", "ar", "15-0", "30", 13);
addNormEntry("wisc", "ar", "15-0", "31", 14);
addNormEntry("wisc", "ar", "15-0", "32", 15);
addNormEntry("wisc", "ar", "15-0", "-", 16);
addNormEntry("wisc", "ar", "15-0", "33", 17);
addNormEntry("wisc", "ar", "15-0", "-", 18);
addNormEntry("wisc", "ar", "15-0", "34", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "15-4", "0-11", 1);
addNormEntry("wisc", "ar", "15-4", "12-13", 2);
addNormEntry("wisc", "ar", "15-4", "14-15", 3);
addNormEntry("wisc", "ar", "15-4", "16-17", 4);
addNormEntry("wisc", "ar", "15-4", "18-19", 5);
addNormEntry("wisc", "ar", "15-4", "20", 6);
addNormEntry("wisc", "ar", "15-4", "21-22", 7);
addNormEntry("wisc", "ar", "15-4", "23", 8);
addNormEntry("wisc", "ar", "15-4", "24-25", 9);
addNormEntry("wisc", "ar", "15-4", "26", 10);
addNormEntry("wisc", "ar", "15-4", "27", 11);
addNormEntry("wisc", "ar", "15-4", "28-29", 12);
addNormEntry("wisc", "ar", "15-4", "30", 13);
addNormEntry("wisc", "ar", "15-4", "31", 14);
addNormEntry("wisc", "ar", "15-4", "32", 15);
addNormEntry("wisc", "ar", "15-4", "-", 16);
addNormEntry("wisc", "ar", "15-4", "33", 17);
addNormEntry("wisc", "ar", "15-4", "-", 18);
addNormEntry("wisc", "ar", "15-4", "34", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "15-8", "0-11", 1);
addNormEntry("wisc", "ar", "15-8", "12-13", 2);
addNormEntry("wisc", "ar", "15-8", "14-15", 3);
addNormEntry("wisc", "ar", "15-8", "16-17", 4);
addNormEntry("wisc", "ar", "15-8", "18-19", 5);
addNormEntry("wisc", "ar", "15-8", "20", 6);
addNormEntry("wisc", "ar", "15-8", "21-22", 7);
addNormEntry("wisc", "ar", "15-8", "23-24", 8);
addNormEntry("wisc", "ar", "15-8", "25", 9);
addNormEntry("wisc", "ar", "15-8", "26-27", 10);
addNormEntry("wisc", "ar", "15-8", "28", 11);
addNormEntry("wisc", "ar", "15-8", "29", 12);
addNormEntry("wisc", "ar", "15-8", "30", 13);
addNormEntry("wisc", "ar", "15-8", "31", 14);
addNormEntry("wisc", "ar", "15-8", "32", 15);
addNormEntry("wisc", "ar", "15-8", "-", 16);
addNormEntry("wisc", "ar", "15-8", "33", 17);
addNormEntry("wisc", "ar", "15-8", "-", 18);
addNormEntry("wisc", "ar", "15-8", "34", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Aritmética)
addNormEntry("wisc", "ar", "16-0", "0-11", 1);
addNormEntry("wisc", "ar", "16-0", "12-13", 2);
addNormEntry("wisc", "ar", "16-0", "14-15", 3);
addNormEntry("wisc", "ar", "16-0", "16-17", 4);
addNormEntry("wisc", "ar", "16-0", "18-19", 5);
addNormEntry("wisc", "ar", "16-0", "20", 6);
addNormEntry("wisc", "ar", "16-0", "21-22", 7);
addNormEntry("wisc", "ar", "16-0", "23", 8);
addNormEntry("wisc", "ar", "16-0", "24-25", 9);
addNormEntry("wisc", "ar", "16-0", "26", 10);
addNormEntry("wisc", "ar", "16-0", "27", 11);
addNormEntry("wisc", "ar", "16-0", "28-29", 12);
addNormEntry("wisc", "ar", "16-0", "30", 13);
addNormEntry("wisc", "ar", "16-0", "31", 14);
addNormEntry("wisc", "ar", "16-0", "32", 15);
addNormEntry("wisc", "ar", "16-0", "-", 16);
addNormEntry("wisc", "ar", "16-0", "33", 17);
addNormEntry("wisc", "ar", "16-0", "-", 18);
addNormEntry("wisc", "ar", "16-0", "34", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Aritmética)
addNormEntry("wisc", "ar", "16-4", "0-11", 1);
addNormEntry("wisc", "ar", "16-4", "12-13", 2);
addNormEntry("wisc", "ar", "16-4", "14-15", 3);
addNormEntry("wisc", "ar", "16-4", "16-17", 4);
addNormEntry("wisc", "ar", "16-4", "18-19", 5);
addNormEntry("wisc", "ar", "16-4", "20", 6);
addNormEntry("wisc", "ar", "16-4", "21-22", 7);
addNormEntry("wisc", "ar", "16-4", "23-24", 8);
addNormEntry("wisc", "ar", "16-4", "25", 9);
addNormEntry("wisc", "ar", "16-4", "26-27", 10);
addNormEntry("wisc", "ar", "16-4", "28", 11);
addNormEntry("wisc", "ar", "16-4", "29", 12);
addNormEntry("wisc", "ar", "16-4", "30", 13);
addNormEntry("wisc", "ar", "16-4", "31", 14);
addNormEntry("wisc", "ar", "16-4", "32", 15);
addNormEntry("wisc", "ar", "16-4", "-", 16);
addNormEntry("wisc", "ar", "16-4", "33", 17);
addNormEntry("wisc", "ar", "16-4", "-", 18);
addNormEntry("wisc", "ar", "16-4", "34", 19);

// FAIXA 16-8 — 16 anos e 8 a 11 meses (Aritmética)
addNormEntry("wisc", "ar", "16-8", "0-11", 1);
addNormEntry("wisc", "ar", "16-8", "12-13", 2);
addNormEntry("wisc", "ar", "16-8", "14-15", 3);
addNormEntry("wisc", "ar", "16-8", "16-17", 4);
addNormEntry("wisc", "ar", "16-8", "18-19", 5);
addNormEntry("wisc", "ar", "16-8", "20", 6);
addNormEntry("wisc", "ar", "16-8", "21-22", 7);
addNormEntry("wisc", "ar", "16-8", "23", 8);
addNormEntry("wisc", "ar", "16-8", "24-25", 9);
addNormEntry("wisc", "ar", "16-8", "26", 10);
addNormEntry("wisc", "ar", "16-8", "27", 11);
addNormEntry("wisc", "ar", "16-8", "28-29", 12);
addNormEntry("wisc", "ar", "16-8", "30", 13);
addNormEntry("wisc", "ar", "16-8", "31", 14);
addNormEntry("wisc", "ar", "16-8", "32", 15);
addNormEntry("wisc", "ar", "16-8", "-", 16);
addNormEntry("wisc", "ar", "16-8", "33", 17);
addNormEntry("wisc", "ar", "16-8", "-", 18);
addNormEntry("wisc", "ar", "16-8", "34", 19);

// --- Normas do Subteste Raciocínio com Pistas (RP) ---

// FAIXA 6-0 — 6 anos (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "6-0", "-", 1);
addNormEntry("wisc", "rp", "6-0", "0", 2);
addNormEntry("wisc", "rp", "6-0", "-", 3);
addNormEntry("wisc", "rp", "6-0", "1", 4);
addNormEntry("wisc", "rp", "6-0", "2", 5);
addNormEntry("wisc", "rp", "6-0", "3", 6);
addNormEntry("wisc", "rp", "6-0", "4", 7);
addNormEntry("wisc", "rp", "6-0", "5", 8);
addNormEntry("wisc", "rp", "6-0", "6", 9);
addNormEntry("wisc", "rp", "6-0", "7", 10);
addNormEntry("wisc", "rp", "6-0", "8", 11);
addNormEntry("wisc", "rp", "6-0", "9", 12);
addNormEntry("wisc", "rp", "6-0", "10", 13);
addNormEntry("wisc", "rp", "6-0", "11", 14);
addNormEntry("wisc", "rp", "6-0", "-", 15);
addNormEntry("wisc", "rp", "6-0", "12", 16);
addNormEntry("wisc", "rp", "6-0", "13", 17);
addNormEntry("wisc", "rp", "6-0", "-", 18);
addNormEntry("wisc", "rp", "6-0", "14-24", 19);

// FAIXA 6-4 — 6 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "6-4", "-", 1);
addNormEntry("wisc", "rp", "6-4", "0", 2);
addNormEntry("wisc", "rp", "6-4", "1", 3);
addNormEntry("wisc", "rp", "6-4", "2", 4);
addNormEntry("wisc", "rp", "6-4", "3", 5);
addNormEntry("wisc", "rp", "6-4", "4", 6);
addNormEntry("wisc", "rp", "6-4", "5", 7);
addNormEntry("wisc", "rp", "6-4", "6", 8);
addNormEntry("wisc", "rp", "6-4", "7", 9);
addNormEntry("wisc", "rp", "6-4", "8", 10);
addNormEntry("wisc", "rp", "6-4", "9", 11);
addNormEntry("wisc", "rp", "6-4", "-", 12);
addNormEntry("wisc", "rp", "6-4", "10", 13);
addNormEntry("wisc", "rp", "6-4", "11", 14);
addNormEntry("wisc", "rp", "6-4", "12", 15);
addNormEntry("wisc", "rp", "6-4", "-", 16);
addNormEntry("wisc", "rp", "6-4", "13", 17);
addNormEntry("wisc", "rp", "6-4", "14", 18);
addNormEntry("wisc", "rp", "6-4", "15-24", 19);

// FAIXA 6-8 — 6 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "6-8", "-", 1);
addNormEntry("wisc", "rp", "6-8", "0", 2);
addNormEntry("wisc", "rp", "6-8", "1", 3);
addNormEntry("wisc", "rp", "6-8", "2", 4);
addNormEntry("wisc", "rp", "6-8", "3", 5);
addNormEntry("wisc", "rp", "6-8", "4", 6);
addNormEntry("wisc", "rp", "6-8", "5", 7);
addNormEntry("wisc", "rp", "6-8", "6", 8);
addNormEntry("wisc", "rp", "6-8", "7", 9);
addNormEntry("wisc", "rp", "6-8", "8", 10);
addNormEntry("wisc", "rp", "6-8", "9", 11);
addNormEntry("wisc", "rp", "6-8", "10", 12);
addNormEntry("wisc", "rp", "6-8", "11", 13);
addNormEntry("wisc", "rp", "6-8", "-", 14);
addNormEntry("wisc", "rp", "6-8", "12", 15);
addNormEntry("wisc", "rp", "6-8", "13", 16);
addNormEntry("wisc", "rp", "6-8", "14", 17);
addNormEntry("wisc", "rp", "6-8", "-", 18);
addNormEntry("wisc", "rp", "6-8", "15-24", 19);

// FAIXA 7-0 — 7 anos a 7 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "7-0", "0", 1);
addNormEntry("wisc", "rp", "7-0", "1", 2);
addNormEntry("wisc", "rp", "7-0", "2", 3);
addNormEntry("wisc", "rp", "7-0", "3", 4);
addNormEntry("wisc", "rp", "7-0", "4", 5);
addNormEntry("wisc", "rp", "7-0", "5", 6);
addNormEntry("wisc", "rp", "7-0", "6", 7);
addNormEntry("wisc", "rp", "7-0", "7", 8);
addNormEntry("wisc", "rp", "7-0", "8", 9);
addNormEntry("wisc", "rp", "7-0", "9", 10);
addNormEntry("wisc", "rp", "7-0", "-", 11);
addNormEntry("wisc", "rp", "7-0", "10", 12);
addNormEntry("wisc", "rp", "7-0", "11", 13);
addNormEntry("wisc", "rp", "7-0", "12", 14);
addNormEntry("wisc", "rp", "7-0", "13", 15);
addNormEntry("wisc", "rp", "7-0", "-", 16);
addNormEntry("wisc", "rp", "7-0", "14", 17);
addNormEntry("wisc", "rp", "7-0", "15", 18);
addNormEntry("wisc", "rp", "7-0", "16-24", 19);

// FAIXA 7-4 — 7 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "7-4", "0", 1);
addNormEntry("wisc", "rp", "7-4", "1", 2);
addNormEntry("wisc", "rp", "7-4", "2", 3);
addNormEntry("wisc", "rp", "7-4", "3", 4);
addNormEntry("wisc", "rp", "7-4", "4", 5);
addNormEntry("wisc", "rp", "7-4", "5", 6);
addNormEntry("wisc", "rp", "7-4", "6", 7);
addNormEntry("wisc", "rp", "7-4", "7", 8);
addNormEntry("wisc", "rp", "7-4", "8", 9);
addNormEntry("wisc", "rp", "7-4", "9", 10);
addNormEntry("wisc", "rp", "7-4", "10", 11);
addNormEntry("wisc", "rp", "7-4", "11", 12);
addNormEntry("wisc", "rp", "7-4", "-", 13);
addNormEntry("wisc", "rp", "7-4", "12", 14);
addNormEntry("wisc", "rp", "7-4", "13", 15);
addNormEntry("wisc", "rp", "7-4", "14", 16);
addNormEntry("wisc", "rp", "7-4", "-", 17);
addNormEntry("wisc", "rp", "7-4", "15", 18);
addNormEntry("wisc", "rp", "7-4", "16-24", 19);

// FAIXA 7-8 — 7 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "7-8", "0", 1);
addNormEntry("wisc", "rp", "7-8", "1", 2);
addNormEntry("wisc", "rp", "7-8", "2", 3);
addNormEntry("wisc", "rp", "7-8", "3", 4);
addNormEntry("wisc", "rp", "7-8", "4", 5);
addNormEntry("wisc", "rp", "7-8", "5", 6);
addNormEntry("wisc", "rp", "7-8", "6", 7);
addNormEntry("wisc", "rp", "7-8", "7", 8);
addNormEntry("wisc", "rp", "7-8", "8", 9);
addNormEntry("wisc", "rp", "7-8", "9", 10);
addNormEntry("wisc", "rp", "7-8", "10", 11);
addNormEntry("wisc", "rp", "7-8", "11", 12);
addNormEntry("wisc", "rp", "7-8", "12", 13);
addNormEntry("wisc", "rp", "7-8", "13", 14);
addNormEntry("wisc", "rp", "7-8", "-", 15);
addNormEntry("wisc", "rp", "7-8", "14", 16);
addNormEntry("wisc", "rp", "7-8", "15", 17);
addNormEntry("wisc", "rp", "7-8", "-", 18);
addNormEntry("wisc", "rp", "7-8", "16-24", 19);

// FAIXA 8-0 — 8 anos a 8 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "8-0", "0-1", 1);
addNormEntry("wisc", "rp", "8-0", "2", 2);
addNormEntry("wisc", "rp", "8-0", "3", 3);
addNormEntry("wisc", "rp", "8-0", "4", 4);
addNormEntry("wisc", "rp", "8-0", "5", 5);
addNormEntry("wisc", "rp", "8-0", "6", 6);
addNormEntry("wisc", "rp", "8-0", "7", 7);
addNormEntry("wisc", "rp", "8-0", "8", 8);
addNormEntry("wisc", "rp", "8-0", "9", 9);
addNormEntry("wisc", "rp", "8-0", "10", 10);
addNormEntry("wisc", "rp", "8-0", "11", 11);
addNormEntry("wisc", "rp", "8-0", "-", 12);
addNormEntry("wisc", "rp", "8-0", "12", 13);
addNormEntry("wisc", "rp", "8-0", "13", 14);
addNormEntry("wisc", "rp", "8-0", "14", 15);
addNormEntry("wisc", "rp", "8-0", "15", 16);
addNormEntry("wisc", "rp", "8-0", "-", 17);
addNormEntry("wisc", "rp", "8-0", "16", 18);
addNormEntry("wisc", "rp", "8-0", "17-24", 19);

// FAIXA 8-4 — 8 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "8-4", "0-1", 1);
addNormEntry("wisc", "rp", "8-4", "2", 2);
addNormEntry("wisc", "rp", "8-4", "3", 3);
addNormEntry("wisc", "rp", "8-4", "4", 4);
addNormEntry("wisc", "rp", "8-4", "5", 5);
addNormEntry("wisc", "rp", "8-4", "6", 6);
addNormEntry("wisc", "rp", "8-4", "7", 7);
addNormEntry("wisc", "rp", "8-4", "8", 8);
addNormEntry("wisc", "rp", "8-4", "9", 9);
addNormEntry("wisc", "rp", "8-4", "10", 10);
addNormEntry("wisc", "rp", "8-4", "11", 11);
addNormEntry("wisc", "rp", "8-4", "12", 12);
addNormEntry("wisc", "rp", "8-4", "13", 13);
addNormEntry("wisc", "rp", "8-4", "-", 14);
addNormEntry("wisc", "rp", "8-4", "14", 15);
addNormEntry("wisc", "rp", "8-4", "15", 16);
addNormEntry("wisc", "rp", "8-4", "16", 17);
addNormEntry("wisc", "rp", "8-4", "-", 18);
addNormEntry("wisc", "rp", "8-4", "17-24", 19);

// FAIXA 8-8 — 8 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "8-8", "0-1", 1);
addNormEntry("wisc", "rp", "8-8", "2", 2);
addNormEntry("wisc", "rp", "8-8", "3", 3);
addNormEntry("wisc", "rp", "8-8", "4", 4);
addNormEntry("wisc", "rp", "8-8", "5", 5);
addNormEntry("wisc", "rp", "8-8", "6-7", 6);
addNormEntry("wisc", "rp", "8-8", "8", 7);
addNormEntry("wisc", "rp", "8-8", "-", 8);
addNormEntry("wisc", "rp", "8-8", "9", 9);
addNormEntry("wisc", "rp", "8-8", "10", 10);
addNormEntry("wisc", "rp", "8-8", "11", 11);
addNormEntry("wisc", "rp", "8-8", "12", 12);
addNormEntry("wisc", "rp", "8-8", "13", 13);
addNormEntry("wisc", "rp", "8-8", "14", 14);
addNormEntry("wisc", "rp", "8-8", "15", 15);
addNormEntry("wisc", "rp", "8-8", "-", 16);
addNormEntry("wisc", "rp", "8-8", "16", 17);
addNormEntry("wisc", "rp", "8-8", "17", 18);
addNormEntry("wisc", "rp", "8-8", "18-24", 19);

// FAIXA 9-0 — 9 anos a 9 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "9-0", "0-1", 1);
addNormEntry("wisc", "rp", "9-0", "2-3", 2);
addNormEntry("wisc", "rp", "9-0", "4", 3);
addNormEntry("wisc", "rp", "9-0", "5", 4);
addNormEntry("wisc", "rp", "9-0", "6", 5);
addNormEntry("wisc", "rp", "9-0", "7", 6);
addNormEntry("wisc", "rp", "9-0", "8", 7);
addNormEntry("wisc", "rp", "9-0", "9", 8);
addNormEntry("wisc", "rp", "9-0", "10", 9);
addNormEntry("wisc", "rp", "9-0", "11", 10);
addNormEntry("wisc", "rp", "9-0", "12", 11);
addNormEntry("wisc", "rp", "9-0", "13", 12);
addNormEntry("wisc", "rp", "9-0", "-", 13);
addNormEntry("wisc", "rp", "9-0", "14", 14);
addNormEntry("wisc", "rp", "9-0", "15", 15);
addNormEntry("wisc", "rp", "9-0", "16", 16);
addNormEntry("wisc", "rp", "9-0", "-", 17);
addNormEntry("wisc", "rp", "9-0", "17", 18);
addNormEntry("wisc", "rp", "9-0", "18-24", 19);

// FAIXA 9-4 — 9 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "9-4", "0-2", 1);
addNormEntry("wisc", "rp", "9-4", "3", 2);
addNormEntry("wisc", "rp", "9-4", "4", 3);
addNormEntry("wisc", "rp", "9-4", "5", 4);
addNormEntry("wisc", "rp", "9-4", "6", 5);
addNormEntry("wisc", "rp", "9-4", "7", 6);
addNormEntry("wisc", "rp", "9-4", "8", 7);
addNormEntry("wisc", "rp", "9-4", "9", 8);
addNormEntry("wisc", "rp", "9-4", "10", 9);
addNormEntry("wisc", "rp", "9-4", "11", 10);
addNormEntry("wisc", "rp", "9-4", "12", 11);
addNormEntry("wisc", "rp", "9-4", "13", 12);
addNormEntry("wisc", "rp", "9-4", "14", 13);
addNormEntry("wisc", "rp", "9-4", "15", 14);
addNormEntry("wisc", "rp", "9-4", "16", 15);
addNormEntry("wisc", "rp", "9-4", "-", 16);
addNormEntry("wisc", "rp", "9-4", "17", 17);
addNormEntry("wisc", "rp", "9-4", "18", 18);
addNormEntry("wisc", "rp", "9-4", "19-24", 19);

// FAIXA 9-8 — 9 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "9-8", "0-2", 1);
addNormEntry("wisc", "rp", "9-8", "3", 2);
addNormEntry("wisc", "rp", "9-8", "4", 3);
addNormEntry("wisc", "rp", "9-8", "5", 4);
addNormEntry("wisc", "rp", "9-8", "6", 5);
addNormEntry("wisc", "rp", "9-8", "7", 6);
addNormEntry("wisc", "rp", "9-8", "8", 7);
addNormEntry("wisc", "rp", "9-8", "9", 8);
addNormEntry("wisc", "rp", "9-8", "10", 9);
addNormEntry("wisc", "rp", "9-8", "11", 10);
addNormEntry("wisc", "rp", "9-8", "12", 11);
addNormEntry("wisc", "rp", "9-8", "13", 12);
addNormEntry("wisc", "rp", "9-8", "14", 13);
addNormEntry("wisc", "rp", "9-8", "15", 14);
addNormEntry("wisc", "rp", "9-8", "16", 15);
addNormEntry("wisc", "rp", "9-8", "-", 16);
addNormEntry("wisc", "rp", "9-8", "17", 17);
addNormEntry("wisc", "rp", "9-8", "18", 18);
addNormEntry("wisc", "rp", "9-8", "19-24", 19);

// FAIXA 10-0 — 10 anos a 10 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "10-0", "0-2", 1);
addNormEntry("wisc", "rp", "10-0", "3-4", 2);
addNormEntry("wisc", "rp", "10-0", "5", 3);
addNormEntry("wisc", "rp", "10-0", "6", 4);
addNormEntry("wisc", "rp", "10-0", "7", 5);
addNormEntry("wisc", "rp", "10-0", "8", 6);
addNormEntry("wisc", "rp", "10-0", "9", 7);
addNormEntry("wisc", "rp", "10-0", "10", 8);
addNormEntry("wisc", "rp", "10-0", "11", 9);
addNormEntry("wisc", "rp", "10-0", "12", 10);
addNormEntry("wisc", "rp", "10-0", "13", 11);
addNormEntry("wisc", "rp", "10-0", "14", 12);
addNormEntry("wisc", "rp", "10-0", "-", 13);
addNormEntry("wisc", "rp", "10-0", "15", 14);
addNormEntry("wisc", "rp", "10-0", "16", 15);
addNormEntry("wisc", "rp", "10-0", "17", 16);
addNormEntry("wisc", "rp", "10-0", "18", 17);
addNormEntry("wisc", "rp", "10-0", "-", 18);
addNormEntry("wisc", "rp", "10-0", "19-24", 19);

// FAIXA 10-4 — 10 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "10-4", "0-3", 1);
addNormEntry("wisc", "rp", "10-4", "4", 2);
addNormEntry("wisc", "rp", "10-4", "5", 3);
addNormEntry("wisc", "rp", "10-4", "6", 4);
addNormEntry("wisc", "rp", "10-4", "7", 5);
addNormEntry("wisc", "rp", "10-4", "8", 6);
addNormEntry("wisc", "rp", "10-4", "9", 7);
addNormEntry("wisc", "rp", "10-4", "10", 8);
addNormEntry("wisc", "rp", "10-4", "11", 9);
addNormEntry("wisc", "rp", "10-4", "12", 10);
addNormEntry("wisc", "rp", "10-4", "13", 11);
addNormEntry("wisc", "rp", "10-4", "14", 12);
addNormEntry("wisc", "rp", "10-4", "15", 13);
addNormEntry("wisc", "rp", "10-4", "16", 14);
addNormEntry("wisc", "rp", "10-4", "-", 15);
addNormEntry("wisc", "rp", "10-4", "17", 16);
addNormEntry("wisc", "rp", "10-4", "18", 17);
addNormEntry("wisc", "rp", "10-4", "19", 18);
addNormEntry("wisc", "rp", "10-4", "20-24", 19);

// FAIXA 10-8 — 10 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "10-8", "0-3", 1);
addNormEntry("wisc", "rp", "10-8", "4", 2);
addNormEntry("wisc", "rp", "10-8", "5", 3);
addNormEntry("wisc", "rp", "10-8", "6", 4);
addNormEntry("wisc", "rp", "10-8", "7", 5);
addNormEntry("wisc", "rp", "10-8", "8", 6);
addNormEntry("wisc", "rp", "10-8", "9", 7);
addNormEntry("wisc", "rp", "10-8", "10", 8);
addNormEntry("wisc", "rp", "10-8", "11", 9);
addNormEntry("wisc", "rp", "10-8", "12", 10);
addNormEntry("wisc", "rp", "10-8", "13", 11);
addNormEntry("wisc", "rp", "10-8", "14", 12);
addNormEntry("wisc", "rp", "10-8", "15", 13);
addNormEntry("wisc", "rp", "10-8", "16", 14);
addNormEntry("wisc", "rp", "10-8", "17", 15);
addNormEntry("wisc", "rp", "10-8", "-", 16);
addNormEntry("wisc", "rp", "10-8", "18", 17);
addNormEntry("wisc", "rp", "10-8", "19", 18);
addNormEntry("wisc", "rp", "10-8", "20-24", 19);

// FAIXA 11-0 — 11 anos a 11 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "11-0", "0-3", 1);
addNormEntry("wisc", "rp", "11-0", "4", 2);
addNormEntry("wisc", "rp", "11-0", "5", 3);
addNormEntry("wisc", "rp", "11-0", "6-7", 4);
addNormEntry("wisc", "rp", "11-0", "8", 5);
addNormEntry("wisc", "rp", "11-0", "9", 6);
addNormEntry("wisc", "rp", "11-0", "10", 7);
addNormEntry("wisc", "rp", "11-0", "11", 8);
addNormEntry("wisc", "rp", "11-0", "12", 9);
addNormEntry("wisc", "rp", "11-0", "13", 10);
addNormEntry("wisc", "rp", "11-0", "14", 11);
addNormEntry("wisc", "rp", "11-0", "-", 12);
addNormEntry("wisc", "rp", "11-0", "15", 13);
addNormEntry("wisc", "rp", "11-0", "16", 14);
addNormEntry("wisc", "rp", "11-0", "17", 15);
addNormEntry("wisc", "rp", "11-0", "18", 16);
addNormEntry("wisc", "rp", "11-0", "19", 17);
addNormEntry("wisc", "rp", "11-0", "-", 18);
addNormEntry("wisc", "rp", "11-0", "20-24", 19);

// FAIXA 11-4 — 11 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "11-4", "0-3", 1);
addNormEntry("wisc", "rp", "11-4", "4-5", 2);
addNormEntry("wisc", "rp", "11-4", "6", 3);
addNormEntry("wisc", "rp", "11-4", "7", 4);
addNormEntry("wisc", "rp", "11-4", "8", 5);
addNormEntry("wisc", "rp", "11-4", "9", 6);
addNormEntry("wisc", "rp", "11-4", "10", 7);
addNormEntry("wisc", "rp", "11-4", "11", 8);
addNormEntry("wisc", "rp", "11-4", "12", 9);
addNormEntry("wisc", "rp", "11-4", "13", 10);
addNormEntry("wisc", "rp", "11-4", "14", 11);
addNormEntry("wisc", "rp", "11-4", "15", 12);
addNormEntry("wisc", "rp", "11-4", "16", 13);
addNormEntry("wisc", "rp", "11-4", "17", 14);
addNormEntry("wisc", "rp", "11-4", "-", 15);
addNormEntry("wisc", "rp", "11-4", "18", 16);
addNormEntry("wisc", "rp", "11-4", "19", 17);
addNormEntry("wisc", "rp", "11-4", "-", 18);
addNormEntry("wisc", "rp", "11-4", "20-24", 19);

// FAIXA 11-8 — 11 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "11-8", "0-4", 1);
addNormEntry("wisc", "rp", "11-8", "5", 2);
addNormEntry("wisc", "rp", "11-8", "6", 3);
addNormEntry("wisc", "rp", "11-8", "7", 4);
addNormEntry("wisc", "rp", "11-8", "8", 5);
addNormEntry("wisc", "rp", "11-8", "9", 6);
addNormEntry("wisc", "rp", "11-8", "10", 7);
addNormEntry("wisc", "rp", "11-8", "11", 8);
addNormEntry("wisc", "rp", "11-8", "12", 9);
addNormEntry("wisc", "rp", "11-8", "13", 10);
addNormEntry("wisc", "rp", "11-8", "14", 11);
addNormEntry("wisc", "rp", "11-8", "15", 12);
addNormEntry("wisc", "rp", "11-8", "16", 13);
addNormEntry("wisc", "rp", "11-8", "17", 14);
addNormEntry("wisc", "rp", "11-8", "18", 15);
addNormEntry("wisc", "rp", "11-8", "-", 16);
addNormEntry("wisc", "rp", "11-8", "19", 17);
addNormEntry("wisc", "rp", "11-8", "20", 18);
addNormEntry("wisc", "rp", "11-8", "21-24", 19);

// FAIXA 12-0 — 12 anos a 12 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "12-0", "0-4", 1);
addNormEntry("wisc", "rp", "12-0", "5", 2);
addNormEntry("wisc", "rp", "12-0", "6", 3);
addNormEntry("wisc", "rp", "12-0", "7", 4);
addNormEntry("wisc", "rp", "12-0", "8", 5);
addNormEntry("wisc", "rp", "12-0", "9", 6);
addNormEntry("wisc", "rp", "12-0", "10", 7);
addNormEntry("wisc", "rp", "12-0", "11", 8);
addNormEntry("wisc", "rp", "12-0", "12", 9);
addNormEntry("wisc", "rp", "12-0", "13", 10);
addNormEntry("wisc", "rp", "12-0", "14", 11);
addNormEntry("wisc", "rp", "12-0", "15", 12);
addNormEntry("wisc", "rp", "12-0", "16", 13);
addNormEntry("wisc", "rp", "12-0", "17", 14);
addNormEntry("wisc", "rp", "12-0", "18", 15);
addNormEntry("wisc", "rp", "12-0", "19", 16);
addNormEntry("wisc", "rp", "12-0", "-", 17);
addNormEntry("wisc", "rp", "12-0", "20", 18);
addNormEntry("wisc", "rp", "12-0", "21-24", 19);

// FAIXA 12-4 — 12 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "12-4", "0-4", 1);
addNormEntry("wisc", "rp", "12-4", "5", 2);
addNormEntry("wisc", "rp", "12-4", "6", 3);
addNormEntry("wisc", "rp", "12-4", "7", 4);
addNormEntry("wisc", "rp", "12-4", "8-9", 5);
addNormEntry("wisc", "rp", "12-4", "10", 6);
addNormEntry("wisc", "rp", "12-4", "11", 7);
addNormEntry("wisc", "rp", "12-4", "12", 8);
addNormEntry("wisc", "rp", "12-4", "13", 9);
addNormEntry("wisc", "rp", "12-4", "14", 10);
addNormEntry("wisc", "rp", "12-4", "15", 11);
addNormEntry("wisc", "rp", "12-4", "16", 12);
addNormEntry("wisc", "rp", "12-4", "-", 13);
addNormEntry("wisc", "rp", "12-4", "17", 14);
addNormEntry("wisc", "rp", "12-4", "18", 15);
addNormEntry("wisc", "rp", "12-4", "19", 16);
addNormEntry("wisc", "rp", "12-4", "20", 17);
addNormEntry("wisc", "rp", "12-4", "-", 18);
addNormEntry("wisc", "rp", "12-4", "21-24", 19);

// FAIXA 12-8 — 12 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "12-8", "0-4", 1);
addNormEntry("wisc", "rp", "12-8", "5", 2);
addNormEntry("wisc", "rp", "12-8", "6-7", 3);
addNormEntry("wisc", "rp", "12-8", "8", 4);
addNormEntry("wisc", "rp", "12-8", "9", 5);
addNormEntry("wisc", "rp", "12-8", "10", 6);
addNormEntry("wisc", "rp", "12-8", "11", 7);
addNormEntry("wisc", "rp", "12-8", "12", 8);
addNormEntry("wisc", "rp", "12-8", "13", 9);
addNormEntry("wisc", "rp", "12-8", "14", 10);
addNormEntry("wisc", "rp", "12-8", "15", 11);
addNormEntry("wisc", "rp", "12-8", "16", 12);
addNormEntry("wisc", "rp", "12-8", "17", 13);
addNormEntry("wisc", "rp", "12-8", "18", 14);
addNormEntry("wisc", "rp", "12-8", "-", 15);
addNormEntry("wisc", "rp", "12-8", "19", 16);
addNormEntry("wisc", "rp", "12-8", "20", 17);
addNormEntry("wisc", "rp", "12-8", "21", 18);
addNormEntry("wisc", "rp", "12-8", "22-24", 19);

// FAIXA 13-0 — 13 anos a 13 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "13-0", "0-4", 1);
addNormEntry("wisc", "rp", "13-0", "5-6", 2);
addNormEntry("wisc", "rp", "13-0", "7", 3);
addNormEntry("wisc", "rp", "13-0", "8", 4);
addNormEntry("wisc", "rp", "13-0", "9", 5);
addNormEntry("wisc", "rp", "13-0", "10", 6);
addNormEntry("wisc", "rp", "13-0", "11", 7);
addNormEntry("wisc", "rp", "13-0", "12", 8);
addNormEntry("wisc", "rp", "13-0", "13", 9);
addNormEntry("wisc", "rp", "13-0", "14", 10);
addNormEntry("wisc", "rp", "13-0", "15", 11);
addNormEntry("wisc", "rp", "13-0", "16", 12);
addNormEntry("wisc", "rp", "13-0", "17", 13);
addNormEntry("wisc", "rp", "13-0", "18", 14);
addNormEntry("wisc", "rp", "13-0", "19", 15);
addNormEntry("wisc", "rp", "13-0", "-", 16);
addNormEntry("wisc", "rp", "13-0", "20", 17);
addNormEntry("wisc", "rp", "13-0", "21", 18);
addNormEntry("wisc", "rp", "13-0", "22-24", 19);

// FAIXA 13-4 — 13 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "13-4", "0-5", 1);
addNormEntry("wisc", "rp", "13-4", "6", 2);
addNormEntry("wisc", "rp", "13-4", "7", 3);
addNormEntry("wisc", "rp", "13-4", "8", 4);
addNormEntry("wisc", "rp", "13-4", "9", 5);
addNormEntry("wisc", "rp", "13-4", "10", 6);
addNormEntry("wisc", "rp", "13-4", "11-12", 7);
addNormEntry("wisc", "rp", "13-4", "13", 8);
addNormEntry("wisc", "rp", "13-4", "14", 9);
addNormEntry("wisc", "rp", "13-4", "15", 10);
addNormEntry("wisc", "rp", "13-4", "16", 11);
addNormEntry("wisc", "rp", "13-4", "17", 12);
addNormEntry("wisc", "rp", "13-4", "-", 13);
addNormEntry("wisc", "rp", "13-4", "18", 14);
addNormEntry("wisc", "rp", "13-4", "19", 15);
addNormEntry("wisc", "rp", "13-4", "20", 16);
addNormEntry("wisc", "rp", "13-4", "21", 17);
addNormEntry("wisc", "rp", "13-4", "-", 18);
addNormEntry("wisc", "rp", "13-4", "22-24", 19);

// FAIXA 13-8 — 13 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "13-8", "0-5", 1);
addNormEntry("wisc", "rp", "13-8", "6", 2);
addNormEntry("wisc", "rp", "13-8", "7", 3);
addNormEntry("wisc", "rp", "13-8", "8", 4);
addNormEntry("wisc", "rp", "13-8", "9-10", 5);
addNormEntry("wisc", "rp", "13-8", "11", 6);
addNormEntry("wisc", "rp", "13-8", "12", 7);
addNormEntry("wisc", "rp", "13-8", "13", 8);
addNormEntry("wisc", "rp", "13-8", "14", 9);
addNormEntry("wisc", "rp", "13-8", "15", 10);
addNormEntry("wisc", "rp", "13-8", "16", 11);
addNormEntry("wisc", "rp", "13-8", "17", 12);
addNormEntry("wisc", "rp", "13-8", "18", 13);
addNormEntry("wisc", "rp", "13-8", "19", 14);
addNormEntry("wisc", "rp", "13-8", "-", 15);
addNormEntry("wisc", "rp", "13-8", "20", 16);
addNormEntry("wisc", "rp", "13-8", "21", 17);
addNormEntry("wisc", "rp", "13-8", "22", 18);
addNormEntry("wisc", "rp", "13-8", "23-24", 19);

// FAIXA 14-0 — 14 anos a 14 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "14-0", "0-5", 1);
addNormEntry("wisc", "rp", "14-0", "6", 2);
addNormEntry("wisc", "rp", "14-0", "7", 3);
addNormEntry("wisc", "rp", "14-0", "8-9", 4);
addNormEntry("wisc", "rp", "14-0", "10", 5);
addNormEntry("wisc", "rp", "14-0", "11", 6);
addNormEntry("wisc", "rp", "14-0", "12", 7);
addNormEntry("wisc", "rp", "14-0", "13", 8);
addNormEntry("wisc", "rp", "14-0", "14", 9);
addNormEntry("wisc", "rp", "14-0", "15", 10);
addNormEntry("wisc", "rp", "14-0", "16", 11);
addNormEntry("wisc", "rp", "14-0", "17", 12);
addNormEntry("wisc", "rp", "14-0", "18", 13);
addNormEntry("wisc", "rp", "14-0", "19", 14);
addNormEntry("wisc", "rp", "14-0", "20", 15);
addNormEntry("wisc", "rp", "14-0", "-", 16);
addNormEntry("wisc", "rp", "14-0", "21", 17);
addNormEntry("wisc", "rp", "14-0", "22", 18);
addNormEntry("wisc", "rp", "14-0", "23-24", 19);

// FAIXA 14-4 — 14 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "14-4", "0-5", 1);
addNormEntry("wisc", "rp", "14-4", "6", 2);
addNormEntry("wisc", "rp", "14-4", "7-8", 3);
addNormEntry("wisc", "rp", "14-4", "9", 4);
addNormEntry("wisc", "rp", "14-4", "10", 5);
addNormEntry("wisc", "rp", "14-4", "11", 6);
addNormEntry("wisc", "rp", "14-4", "12", 7);
addNormEntry("wisc", "rp", "14-4", "13", 8);
addNormEntry("wisc", "rp", "14-4", "14", 9);
addNormEntry("wisc", "rp", "14-4", "15", 10);
addNormEntry("wisc", "rp", "14-4", "16", 11);
addNormEntry("wisc", "rp", "14-4", "17", 12);
addNormEntry("wisc", "rp", "14-4", "18", 13);
addNormEntry("wisc", "rp", "14-4", "19", 14);
addNormEntry("wisc", "rp", "14-4", "20", 15);
addNormEntry("wisc", "rp", "14-4", "21", 16);
addNormEntry("wisc", "rp", "14-4", "-", 17);
addNormEntry("wisc", "rp", "14-4", "22", 18);
addNormEntry("wisc", "rp", "14-4", "23-24", 19);

// FAIXA 14-8 — 14 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "14-8", "0-5", 1);
addNormEntry("wisc", "rp", "14-8", "6-7", 2);
addNormEntry("wisc", "rp", "14-8", "8", 3);
addNormEntry("wisc", "rp", "14-8", "9", 4);
addNormEntry("wisc", "rp", "14-8", "10", 5);
addNormEntry("wisc", "rp", "14-8", "11", 6);
addNormEntry("wisc", "rp", "14-8", "12", 7);
addNormEntry("wisc", "rp", "14-8", "13", 8);
addNormEntry("wisc", "rp", "14-8", "14", 9);
addNormEntry("wisc", "rp", "14-8", "15", 10);
addNormEntry("wisc", "rp", "14-8", "16", 11);
addNormEntry("wisc", "rp", "14-8", "17", 12);
addNormEntry("wisc", "rp", "14-8", "18", 13);
addNormEntry("wisc", "rp", "14-8", "19", 14);
addNormEntry("wisc", "rp", "14-8", "20", 15);
addNormEntry("wisc", "rp", "14-8", "21", 16);
addNormEntry("wisc", "rp", "14-8", "22", 17);
addNormEntry("wisc", "rp", "14-8", "-", 18);
addNormEntry("wisc", "rp", "14-8", "23-24", 19);

// FAIXA 15-0 — 15 anos a 15 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "15-0", "0-6", 1);
addNormEntry("wisc", "rp", "15-0", "7", 2);
addNormEntry("wisc", "rp", "15-0", "8", 3);
addNormEntry("wisc", "rp", "15-0", "9", 4);
addNormEntry("wisc", "rp", "15-0", "10", 5);
addNormEntry("wisc", "rp", "15-0", "11", 6);
addNormEntry("wisc", "rp", "15-0", "12", 7);
addNormEntry("wisc", "rp", "15-0", "13", 8);
addNormEntry("wisc", "rp", "15-0", "14", 9);
addNormEntry("wisc", "rp", "15-0", "15-16", 10);
addNormEntry("wisc", "rp", "15-0", "17", 11);
addNormEntry("wisc", "rp", "15-0", "-", 12);
addNormEntry("wisc", "rp", "15-0", "18", 13);
addNormEntry("wisc", "rp", "15-0", "19", 14);
addNormEntry("wisc", "rp", "15-0", "20", 15);
addNormEntry("wisc", "rp", "15-0", "21", 16);
addNormEntry("wisc", "rp", "15-0", "22", 17);
addNormEntry("wisc", "rp", "15-0", "-", 18);
addNormEntry("wisc", "rp", "15-0", "23-24", 19);

// FAIXA 15-4 — 15 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "15-4", "0-6", 1);
addNormEntry("wisc", "rp", "15-4", "7", 2);
addNormEntry("wisc", "rp", "15-4", "8", 3);
addNormEntry("wisc", "rp", "15-4", "9", 4);
addNormEntry("wisc", "rp", "15-4", "10", 5);
addNormEntry("wisc", "rp", "15-4", "11", 6);
addNormEntry("wisc", "rp", "15-4", "12-13", 7);
addNormEntry("wisc", "rp", "15-4", "14", 8);
addNormEntry("wisc", "rp", "15-4", "15", 9);
addNormEntry("wisc", "rp", "15-4", "16", 10);
addNormEntry("wisc", "rp", "15-4", "17", 11);
addNormEntry("wisc", "rp", "15-4", "18", 12);
addNormEntry("wisc", "rp", "15-4", "19", 13);
addNormEntry("wisc", "rp", "15-4", "-", 14);
addNormEntry("wisc", "rp", "15-4", "20", 15);
addNormEntry("wisc", "rp", "15-4", "21", 16);
addNormEntry("wisc", "rp", "15-4", "22", 17);
addNormEntry("wisc", "rp", "15-4", "23", 18);
addNormEntry("wisc", "rp", "15-4", "24", 19);

// FAIXA 15-8 — 15 anos e 8 a 11 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "15-8", "0-6", 1);
addNormEntry("wisc", "rp", "15-8", "7", 2);
addNormEntry("wisc", "rp", "15-8", "8", 3);
addNormEntry("wisc", "rp", "15-8", "9", 4);
addNormEntry("wisc", "rp", "15-8", "10", 5);
addNormEntry("wisc", "rp", "15-8", "11-12", 6);
addNormEntry("wisc", "rp", "15-8", "13", 7);
addNormEntry("wisc", "rp", "15-8", "14", 8);
addNormEntry("wisc", "rp", "15-8", "15", 9);
addNormEntry("wisc", "rp", "15-8", "16", 10);
addNormEntry("wisc", "rp", "15-8", "17", 11);
addNormEntry("wisc", "rp", "15-8", "18", 12);
addNormEntry("wisc", "rp", "15-8", "19", 13);
addNormEntry("wisc", "rp", "15-8", "20", 14);
addNormEntry("wisc", "rp", "15-8", "21", 15);
addNormEntry("wisc", "rp", "15-8", "-", 16);
addNormEntry("wisc", "rp", "15-8", "22", 17);
addNormEntry("wisc", "rp", "15-8", "23", 18);
addNormEntry("wisc", "rp", "15-8", "24", 19);

// FAIXA 16-0 — 16 anos a 16 anos e 3 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "16-0", "0-6", 1);
addNormEntry("wisc", "rp", "16-0", "7", 2);
addNormEntry("wisc", "rp", "16-0", "8", 3);
addNormEntry("wisc", "rp", "16-0", "9", 4);
addNormEntry("wisc", "rp", "16-0", "10-11", 5);
addNormEntry("wisc", "rp", "16-0", "12", 6);
addNormEntry("wisc", "rp", "16-0", "13", 7);
addNormEntry("wisc", "rp", "16-0", "14", 8);
addNormEntry("wisc", "rp", "16-0", "15", 9);
addNormEntry("wisc", "rp", "16-0", "16", 10);
addNormEntry("wisc", "rp", "16-0", "17", 11);
addNormEntry("wisc", "rp", "16-0", "18", 12);
addNormEntry("wisc", "rp", "16-0", "19", 13);
addNormEntry("wisc", "rp", "16-0", "20", 14);
addNormEntry("wisc", "rp", "16-0", "21", 15);
addNormEntry("wisc", "rp", "16-0", "-", 16);
addNormEntry("wisc", "rp", "16-0", "22", 17);
addNormEntry("wisc", "rp", "16-0", "23", 18);
addNormEntry("wisc", "rp", "16-0", "24", 19);

// FAIXA 16-4 — 16 anos e 4 a 7 meses (Raciocínio com Pistas)
addNormEntry("wisc", "rp", "16-4", "0-6", 1);
addNormEntry("wisc", "rp", "16-4", "7", 2);
addNormEntry("wisc", "rp", "16-4", "8", 3);
addNormEntry("wisc", "rp", "16-4", "9", 4);
addNormEntry("wisc", "rp", "16-4", "10-11", 5);
addNormEntry("wisc", "rp", "16-4", "12", 6);
addNormEntry("wisc", "rp", "16-4", "13", 7);
addNormEntry("wisc", "rp", "16-4", "14", 8);
addNormEntry("wisc", "rp", "16-4", "15", 9);
addNormEntry("wisc", "rp", "16-4", "16", 10);
addNormEntry("wisc", "rp", "16-4", "17", 11);
addNormEntry("wisc", "rp", "16-4", "18", 12);
addNormEntry("wisc", "rp", "16-4", "19", 13);
addNormEntry("wisc", "rp", "16-4", "20", 14);
addNormEntry("wisc", "rp", "16-4", "21", 15);
addNormEntry("wisc", "rp", "16-4", "22", 16);
addNormEntry("wisc", "rp", "16-4", "-", 17);
addNormEntry("wisc", "rp", "16-4", "23", 18);
addNormEntry("wisc", "rp", "16-4", "24", 19);

//======================================================================//
//   3. CÁLCULO DE IDADE E CHAVE DE FAIXA ETÁRIA (CORRIGIDO)
//   OBJETIVO: Calcular a idade cronológica do avaliado e determinar a
//             chave da faixa etária para consultar as tabelas.
//======================================================================//
/**
 * Calcula idade detalhada e chave de faixa etária.
 * Retorna também a contagem de 'dias'.
 * Validação aprimorada da chave de faixa etária.
 */
function calculateAgeDetails(dobString, testDateString) {
    const dob = new Date(dobString + 'T00:00:00');
    const testDate = new Date(testDateString + 'T00:00:00');

    // Validação explícita das datas
    if (isNaN(dob.getTime()) || isNaN(testDate.getTime()) || dob > testDate) {
        return null;
    }

    let years = testDate.getFullYear() - dob.getFullYear();
    let months = testDate.getMonth() - dob.getMonth();
    let days = testDate.getDate() - dob.getDate();

    // Ajusta meses e anos se o cálculo de dias/meses for negativo
    if (days < 0) {
        months--;
        // O dia 0 do mês seguinte é o último dia do mês atual.
        days += new Date(testDate.getFullYear(), testDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Faixas de 4 meses: 0-3, 4-7, 8-11
    const faixa = months <= 3 ? 0 : months <= 7 ? 4 : 8;
    const key = `${years}-${faixa}`;

    // Validação da idade e existência da chave na tabela de normas
    const isAgeValidForWISC = years >= 6 && years <= 16;
    const ageRangeKeyExistsInNorms = typeof NORMS_DATA !== 'undefined' && NORMS_DATA?.wisc?.sm?.[key];

    if (!isAgeValidForWISC || !ageRangeKeyExistsInNorms) {
        return { years, months, days, ageRangeKey: null };
    }

    return { years, months, days, ageRangeKey: key };
}

//======================================================================//
//   4. CONVERSÃO DE PONTO BRUTO PARA PONTO PONDERADO (VALIDADO)
//   OBJETIVO: Buscar na estrutura NORMS_DATA e encontrar o ponto
//             ponderado (1-19) correspondente a um ponto bruto.
//======================================================================//
/**
 * Busca o ponto ponderado correspondente ao ponto bruto.
 * Lógica de piso e teto revisada.
 */
function getScaledScore(scaleType, subtestId, ageRangeKey, rawScore) {
    if (rawScore === null || isNaN(rawScore) || !ageRangeKey) {
        return null;
    }

    const ageNorms = typeof NORMS_DATA !== 'undefined' ? NORMS_DATA?.[scaleType]?.[subtestId]?.[ageRangeKey] : undefined;

    if (!ageNorms || ageNorms.length === 0) {
        return null; 
    }

    // Busca direta
    for (const norm of ageNorms) {
        if (norm.rawMin !== null && norm.rawMax !== null && rawScore >= norm.rawMin && rawScore <= norm.rawMax) {
            return norm.scaled;
        }
    }

    // Piso e teto
    const validNorms = ageNorms.filter(n => n.rawMin !== null && n.rawMax !== null);
    if (validNorms.length === 0) return null;

    const minRawScore = Math.min(...validNorms.map(n => n.rawMin));
    const maxRawScore = Math.max(...validNorms.map(n => n.rawMax));
    
    if (rawScore < minRawScore) return 1;
    if (rawScore > maxRawScore) return 19;

    // Caso raro: gap na tabela
    return null;
}

//======================================================================//
//   5. CLASSIFICAÇÃO QUALITATIVA DO PONTO PONDERADO (VALIDADO)
//   OBJETIVO: Retornar a classificação textual para um ponto ponderado.
//======================================================================//
/**
 * Retorna classificação textual para ponto ponderado.
 * Faixas revisadas e ordem de verificação correta.
 */
function getClassification(scaledScore) {
    const score = Number(scaledScore);

    if (scaledScore === null || isNaN(score)) {
        return '--';
    }

    if (score >= 16) return 'Muito Superior';
    if (score >= 14) return 'Superior';
    if (score >= 12) return 'Médio Superior';
    if (score >= 8)  return 'Médio';
    if (score >= 6)  return 'Médio Inferior';
    if (score >= 4)  return 'Inferior';
    return 'Muito Inferior';
}

function getCompositeScoreClassification(Score) {
    const score = Number(Score);
    if (Score === null || isNaN(score)) {
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