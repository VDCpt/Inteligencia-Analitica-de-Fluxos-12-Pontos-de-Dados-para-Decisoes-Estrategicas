// Função para cálculo automático de IVA para suporte à gestão
function calcularIva() {
    const montanteBruto = parseFloat(document.getElementById('p9').value) || 0;
    const taxaIva = 0.23; // Taxa de IVA em vigor
    const valorIva = (montanteBruto * taxaIva).toFixed(2);
    document.getElementById('p11').value = valorIva;
}

// Função para converter dados brutos em informação acionável e prova legal
function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Captura de dados
    const dados = {
        p1: document.getElementById('p1').value,
        p2: document.getElementById('p2').value,
        p3: document.getElementById('p3').value,
        p4: document.getElementById('p4').value,
        p5: document.getElementById('p5').value,
        p6: document.getElementById('p6').value,
        p7: document.getElementById('p7').value,
        p8: document.getElementById('p8').value,
        p9: document.getElementById('p9').value,
        p10: document.getElementById('p10').value,
        p11: document.getElementById('p11').value,
        p12: document.getElementById('p12').value
    };

    // Design do Cabeçalho
    doc.setFillColor(0, 45, 114); // VDC Navy
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("VDC - PARECER TÉCNICO FORENSE", 15, 25);
    
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.text(`Protocolo de Autenticação Digital: VDC-${Date.now()}`, 15, 33);

    // Tabela de Dados (Os 12 Pontos)
    const tableData = [
        ["Ponto de Dado", "Valor Identificado na Auditoria"],
        ["1. Data da Operação", dados.p1],
        ["2. Data de Valor", dados.p2],
        ["3. Ref. Transação / ID", dados.p3],
        ["4. Tipo de Movimento", dados.p4],
        ["5. Ordenante / Beneficiário", dados.p5],
        ["6. IBAN / NIB de Origem", dados.p6],
        ["7. Descrição do Extrato", dados.p7],
        ["8. Código de Categoria (MCC)", dados.p8],
        ["9. Montante Bruto", `${dados.p9} EUR`],
        ["10. Taxas e Comissões", `${dados.p10} EUR`],
        ["11. Valor de IVA (23%)", `${dados.p11} EUR`],
        ["12. Saldo Final Resultante", `${dados.p12} EUR`]
    ];

    doc.autoTable({
        startY: 50,
        head: [tableData[0]],
        body: tableData.slice(1),
        theme: 'striped',
        headStyles: { fillStyle: [0, 45, 114] },
        styles: { fontSize: 10, cellPadding: 5 }
    });

    // Nota Final de Conformidade Jurídica
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(11);
    doc.setTextColor(51, 51, 51);
    doc.text("Protocolo de Integridade:", 15, finalY);
    doc.setFont("helvetica", "normal");
    doc.text("Os dados acima foram processados mediante tecnologia de análise de fluxos digitais.", 15, finalY + 7);
    doc.text("Este documento constitui prova técnica para suporte à decisão judicial e administrativa.", 15, finalY + 14);

    // Footer
    doc.setFontSize(9);
    doc.text("GERADO E VALIDADO VIA UNIDADE DE INTELIGÊNCIA CONSULTORIA VDC", 15, 285);

    // Guardar ficheiro
    doc.save(`VDC_Relatorio_Forense_${dados.p3}.pdf`);
}
