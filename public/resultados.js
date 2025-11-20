// resultados.js - Mostrar resultados y generar PDF

const careers = {
    'ciencias_tecnologia': ['Ingeniería Industrial', 'Ingeniería de Sistemas'],
    'arte_creatividad': ['Consulta Bienestar Universitario'],
    'salud_bienestar': ['Medicina', 'Fisioterapia', 'Bacteriología', 'Microbiología', 'Instrumentación Quirúrgica'],
    'social_educacion': ['Consulta página web Universidad Libre'],
    'negocios_administracion': ['Administración de Negocios Internacionales', 'Contaduría Pública'],
    'comunicacion_humanidades': ['Derecho', 'Turismo'],
    'naturaleza_ambiente': ['Consultar admisiones'],
    'oficios_manual': ['Programas técnicos disponibles'],
    'servicios_atencion': ['Turismo', 'Administración de Negocios'],
    'digital_multimedia': ['Ingeniería de Sistemas'],
    'investigacion': ['Medicina', 'Derecho', 'Ingenierías'],
    'habilidades_transversales': ['Administración de Negocios', 'Derecho']
};

document.addEventListener('DOMContentLoaded', () => {
    // Verificar que hay resultados
    const results = JSON.parse(sessionStorage.getItem('testResults') || '{}');
    if (!results.areaScores) {
        window.location.href = 'index.html';
        return;
    }

    // Mostrar resultados
    displayResults(results);

    // Configurar botón de descarga
    document.getElementById('download-pdf-btn').addEventListener('click', () => {
        downloadPDF(results);
    });

    // Descargar automáticamente al cargar la página
    setTimeout(() => {
        downloadPDF(results);
    }, 1000);
});

function displayResults(results) {
    const areaScores = results.areaScores;
    
    // Ordenar y obtener top 3
    const sortedAreas = Object.entries(areaScores)
        .sort(([,a], [,b]) => b.average - a.average)
        .slice(0, 3);

    displayChart(areaScores);
    displayTopAreas(sortedAreas);
}

function displayChart(areaScores) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    const labels = Object.values(areaScores).map(area => area.name);
    const data = Object.values(areaScores).map(area => area.average.toFixed(1));
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tu Perfil',
                data: data,
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                borderColor: 'rgba(220, 38, 38, 1)',
                pointBackgroundColor: 'rgba(30, 58, 138, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220, 38, 38, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function displayTopAreas(topAreas) {
    const cardsContainer = document.getElementById('top-areas-cards');
    cardsContainer.innerHTML = '';

    topAreas.forEach(([areaKey, areaData], index) => {
        const areaCareers = careers[areaKey] || ['Consultar con admisiones'];
        
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-uniform bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl';
        
        cardDiv.innerHTML = `
            <div class="p-6 flex flex-col h-full">
                <div class="text-center mb-4">
                    <div class="w-16 h-16 bg-libre-red rounded-full flex items-center justify-center mx-auto mb-3">
                        <span class="text-white font-bold text-2xl">${index + 1}</span>
                    </div>
                    <h3 class="text-xl font-bold text-libre-black mb-2">${areaData.name}</h3>
                    <div class="text-4xl font-bold text-familibre-dark mb-4">${areaData.average.toFixed(1)}/5</div>
                </div>
                
                <div class="bg-gradient-to-br from-familibre-dark to-libre-red rounded-xl p-4 flex-grow">
                    <h4 class="font-bold text-white mb-3 text-center">Carreras Disponibles</h4>
                    <div class="space-y-2">
                        ${areaCareers.map(career => `
                            <div class="bg-white bg-opacity-20 rounded-lg p-2 text-sm font-medium text-white text-center">
                                ${career}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        cardsContainer.appendChild(cardDiv);
    });
}

function downloadPDF(results) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const userData = results.userData;
    const areaScores = results.areaScores;
    
    // Título
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38);
    doc.text('Test Vocacional', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138);
    doc.text('Universidad Libre - Programa Familibre', 105, 30, { align: 'center' });
    
    // Línea separadora
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Información del usuario
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Información del Estudiante:', 20, 45);
    
    doc.setFontSize(10);
    doc.text(`Nombre: ${userData.nombre}`, 25, 53);
    doc.text(`Identificación: ${userData.identificacion}`, 25, 60);
    doc.text(`Teléfono: ${userData.telefono}`, 25, 67);
    doc.text(`Correo: ${userData.correo}`, 25, 74);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}`, 25, 81);
    
    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(20, 88, 190, 88);
    
    // Resultados
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text('Tus Áreas de Mayor Interés', 20, 98);
    
    // Ordenar áreas
    const sortedAreas = Object.entries(areaScores)
        .sort(([,a], [,b]) => b.average - a.average)
        .slice(0, 3);
    
    let yPos = 110;
    
    sortedAreas.forEach(([areaKey, areaData], index) => {
        // Verificar si necesitamos nueva página
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Número y nombre del área
        doc.setFontSize(14);
        doc.setTextColor(30, 58, 138);
        doc.text(`${index + 1}. ${areaData.name}`, 25, yPos);
        
        // Puntaje
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Puntaje: ${areaData.average.toFixed(1)}/5.0`, 25, yPos + 8);
        
        // Barra de progreso visual
        const barWidth = 160;
        const barHeight = 6;
        const fillWidth = (areaData.average / 5) * barWidth;
        
        // Fondo de la barra
        doc.setFillColor(230, 230, 230);
        doc.rect(25, yPos + 12, barWidth, barHeight, 'F');
        
        // Relleno de la barra
        doc.setFillColor(220, 38, 38);
        doc.rect(25, yPos + 12, fillWidth, barHeight, 'F');
        
        // Carreras disponibles
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Carreras disponibles en Universidad Libre:', 25, yPos + 25);
        
        const areaCareers = careers[areaKey] || ['Consultar con admisiones'];
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        
        areaCareers.forEach((career, i) => {
            if (yPos + 32 + (i * 6) > 280) {
                doc.addPage();
                yPos = 20 - (32 + (i * 6));
            }
            doc.text(`• ${career}`, 30, yPos + 32 + (i * 6));
        });
        
        yPos += 50 + (areaCareers.length * 6);
    });
    
    // Recomendaciones
    if (yPos > 230) {
        doc.addPage();
        yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 38);
    doc.text('Próximos Pasos', 20, yPos);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const recommendations = [
        '1. Investiga más sobre las carreras que mejor se adaptan a tu perfil',
        '2. Visita el campus de Universidad Libre para conocer las instalaciones',
        '3. Habla con estudiantes actuales de estas carreras',
        '4. Consulta con el departamento de admisiones para más información',
        '5. Considera tus metas a largo plazo al tomar tu decisión'
    ];
    
    recommendations.forEach((rec, i) => {
        doc.text(rec, 25, yPos + 10 + (i * 8));
    });
    
    // Información de contacto
    yPos += 10 + (recommendations.length * 8) + 10;
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('Contacto Universidad Libre', 20, yPos);
    
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text('Teléfono: +57 (5) 385-8700', 25, yPos + 8);
    doc.text('Email: info@unilibrebarranquilla.edu.co', 25, yPos + 14);
    doc.text('Dirección: Km. 7 Antigua vía Puerto Colombia, Barranquilla', 25, yPos + 20);
    
    // Pie de página en todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
            `Universidad Libre - Programa Familibre | Página ${i} de ${pageCount}`, 
            105, 
            285, 
            { align: 'center' }
        );
    }
    
    // Generar nombre del archivo
    const fileName = `Test-Vocacional-${userData.nombre.replace(/\s+/g, '-')}-${new Date().getTime()}.pdf`;
    
    // Guardar PDF
    doc.save(fileName);
    
    // También guardar en servidor si tienes API
    saveResultsToServer(results, fileName);
}

function saveResultsToServer(results, fileName) {
    // Cambiar por tu URL de Vercel cuando esté lista
    const apiUrl = 'https://tu-proyecto.vercel.app/api/results';
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...results,
            pdfFileName: fileName
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log('Resultados guardados en servidor:', result);
    })
    .catch(error => {
        console.error('Error al guardar resultados:', error);
    });
}