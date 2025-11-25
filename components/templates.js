/**
 * templates.js
 *
 * Contém as funções que geram os blocos de HTML para as
 * diferentes páginas e componentes da aplicação.
 */

//======================================================================//
//   FUNÇÃO: createSubtestItem
//   OBJETIVO: Gera o bloco HTML para um item de subteste individual no
//             formulário. Inclui campos para ponto bruto, ponto
//             ponderado e classificação.
//======================================================================//
function createSubtestItem(id, label, isOptional = false) {
    const optionalClass = isOptional ? 'optional' : '';
    return `
        <div class="subtest-item">
            <div class="form-group ${optionalClass}">
                <label for="wisc-${id}">${label}</label>
                <input
                    type="number"
                    id="wisc-${id}"
                    class="raw-score-input"
                    data-subtest="${id}"
                    min="0"
                    step="1"
                    aria-label="Ponto bruto para ${label}"
                >
            </div>
            <div class="result-group">
                <div class="form-group">
                    <label for="wisc-${id}-scaled">P. Pond.</label>
                    <input type="text" id="wisc-${id}-scaled" class="scaled-score-output" readonly aria-label="Ponto ponderado calculado para ${label}">
                </div>
                <div class="form-group">
                    <label for="wisc-${id}-classif">Classif.</label>
                    <span id="wisc-${id}-classif" class="classification-output" aria-live="polite" aria-label="Classificação do ponto ponderado para ${label}">--</span>
                </div>
            </div>
        </div>
    `;
}

//======================================================================//
//   FUNÇÃO: getWiscHtml
//   OBJETIVO: Gera o HTML completo para a página de correção do WISC-V.
//             Constrói a estrutura principal: cabeçalho, dados do
//             avaliado, grade de subtestes e tabela de resultados.
//======================================================================//
function getWiscHtml() {
    return `
        <div class="correction-page" id="wisc-page">
            <header class="correction-header">
                <h2>Correção do WISC-V</h2>
                <p>Preencha os dados e os pontos brutos para calcular automaticamente.</p>
            </header>

            <section class="patient-data">
                <h3><i class="fas fa-user-circle" aria-hidden="true"></i> 1. Dados do Avaliado</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="wisc-name">Nome:</label>
                        <input type="text" id="wisc-name" data-field="patient-name" aria-label="Nome do avaliado">
                    </div>
                    <div class="form-group">
                        <label for="wisc-dob">Nascimento:</label>
                        <input type="date" id="wisc-dob" class="dob-input date-field" data-field="dob" aria-label="Data de nascimento do avaliado">
                    </div>
                    <div class="form-group">
                        <label for="wisc-test-date">Avaliação:</label>
                        <input type="date" id="wisc-test-date" class="test-date-input date-field" data-field="test-date" aria-label="Data da avaliação">
                    </div>
                    <div class="form-group age-result">
                        <label>Idade:</label>
                        <span class="age-output" aria-live="polite" aria-label="Idade do avaliado no momento da avaliação">--</span>
                    </div>
                </div>
            </section>

            <section class="raw-scores">
                <h3><i class="fas fa-list-ol" aria-hidden="true"></i> 2. Pontos Brutos e Ponderados</h3>
                <div class="subtests-grid-full">

                    <div class="subtest-group">
                        <h4>Índice de Compreensão Verbal (ICV)</h4>
                        ${createSubtestItem('sm', 'Semelhanças (SM)')}
                        ${createSubtestItem('vc', 'Vocabulário (VC)')}
                        ${createSubtestItem('co', 'Compreensão (CO)')}
                        ${createSubtestItem('in', 'Informação (IN)', true)}
                        ${createSubtestItem('rp', 'Raciocínio com Palavras (RP)', true)}
                    </div>

                    <div class="subtest-group">
                        <h4>Índice de Organização Perceptual (IOP)</h4>
                        ${createSubtestItem('cb', 'Cubos (CB)')}
                        ${createSubtestItem('cn', 'Conceitos Figurativos (CN)')}
                        ${createSubtestItem('rm', 'Raciocínio Matricial (RM)')}
                        ${createSubtestItem('cf', 'Completar Figuras (CF)', true)}
                    </div>

                    <div class="subtest-group">
                        <h4>Índice de Memória Operacional (IMO)</h4>
                        ${createSubtestItem('dg', 'Dígitos (DG)')}
                        ${createSubtestItem('snl', 'Sequência de Números e Letras (SNL)')}
                        ${createSubtestItem('ar', 'Aritmética (AR)', true)}
                    </div>

                    <div class="subtest-group">
                        <h4>Índice de Velocidade de Processamento (IVP)</h4>
                        ${createSubtestItem('cd', 'Código (CD)')}
                        ${createSubtestItem('ps', 'Procurar Símbolos (PS)')}
                        ${createSubtestItem('ca', 'Cancelamento (CA)', true)}
                    </div>

                </div>
            </section>

            <section class="results-section">
                <h3><i class="fas fa-check-circle" aria-hidden="true"></i> 3. Finalizar e Resultados</h3>

                <div class="summary-results-table-container">
                    <table class="summary-results-table">
                        <caption>Resultados dos Índices Principais do WISC-V</caption>
                        <thead>
                            <tr>
                                <th scope="col">Escala</th>
                                <th scope="col">Soma dos Pontos Ponderados</th>
                                <th scope="col">Pontos Compostos</th>
                                <th scope="col">Rank Percentil</th>
                                <th scope="col">Intervalo de Confiança (95%)</th>
                                <th scope="col">Classificação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-scale="icv">
                                <th scope="row">Índice de Compreensão Verbal (ICV)</th>
                                <td class="sum-scaled-score">--</td>
                                <td class="composite-score">--</td>
                                <td class="percentile-rank">--</td>
                                <td class="confidence-interval">--</td>
                                <td class="composite-classification">--</td>
                            </tr>
                            <tr data-scale="iop">
                                <th scope="row">Índice de Organização Perceptual (IOP)</th>
                                <td class="sum-scaled-score">--</td>
                                <td class="composite-score">--</td>
                                <td class="percentile-rank">--</td>
                                <td class="confidence-interval">--</td>
                                <td class="composite-classification">--</td>
                            </tr>
                            <tr data-scale="imo">
                                <th scope="row">Índice de Memória Operacional (IMO)</th>
                                <td class="sum-scaled-score">--</td>
                                <td class="composite-score">--</td>
                                <td class="percentile-rank">--</td>
                                <td class="confidence-interval">--</td>
                                <td class="composite-classification">--</td>
                            </tr>
                            <tr data-scale="ivp">
                                <th scope="row">Índice de Velocidade de Processamento (IVP)</th>
                                <td class="sum-scaled-score">--</td>
                                <td class="composite-score">--</td>
                                <td class="percentile-rank">--</td>
                                <td class="confidence-interval">--</td>
                                <td class="composite-classification">--</td>
                            </tr>
                            <tr data-scale="qit" class="total-score-row">
                                <th scope="row">Quociente de Inteligência Total (QIT)</th>
                                <td class="sum-scaled-score">--</td>
                                <td class="composite-score">--</td>
                                <td class="percentile-rank">--</td>
                                <td class="confidence-interval">--</td>
                                <td class="composite-classification">--</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="save-test-button" data-test="wisc" aria-label="Salvar resultados do teste WISC-V">Salvar Teste</button>
            </section>
        </div>
    `;
}

//======================================================================//
//   FUNÇÃO: getWaisHtml
//   OBJETIVO: Placeholder para a página de correção do WAIS-III.
//======================================================================//
function getWaisHtml() {
    return `
        <div class="correction-page">
            <h2>WAIS-III - Em Desenvolvimento</h2>
            <p>Esta página ainda está em construção. Volte em breve!</p>
        </div>
    `;
}

//======================================================================//
//   FUNÇÃO: getWasiHtml
//   OBJETIVO: Placeholder para a página de correção do WASI.
//======================================================================//
function getWasiHtml() {
    return `
        <div class="correction-page">
            <h2>WASI - Em Desenvolvimento</h2>
            <p>Esta página ainda está em construção. Volte em breve!</p>
        </div>
    `;
}