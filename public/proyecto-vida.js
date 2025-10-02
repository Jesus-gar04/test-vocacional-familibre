// Proyecto de Vida - Universidad Libre Familibre

const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
let currentStage = 1;
let currentQuestionIndex = 0;
const responses = {
    etapa1: {},
    etapa2: {},
    etapa3: {},
    etapa4: {}
};

const questions = {
    etapa1: [
        {
            dimension: 'Dimensión Física',
            pregunta: '¿Con qué frecuencia realizas actividad física durante la semana?',
            opciones: ['Nunca', '1 vez por semana', '2 a 3 veces por semana', '4 a 5 veces por semana', 'Todos los días']
        },
        {
            dimension: 'Dimensión Emocional',
            pregunta: '¿Qué tan capaz te consideras de manejar el estrés o las emociones intensas?',
            opciones: ['Muy incapaz', 'Poco capaz', 'Medianamente capaz', 'Capaz', 'Muy capaz']
        },
        {
            dimension: 'Dimensión Cognitiva',
            pregunta: '¿Con qué frecuencia dedicas tiempo a aprender algo nuevo o fortalecer tu conocimiento?',
            opciones: ['Nunca', 'Una vez al mes', 'Una vez a la semana', 'Todos los días']
        },
        {
            dimension: 'Dimensión Social',
            pregunta: '¿Qué tan satisfecho te sientes con la calidad de tus relaciones (familia, amigos, compañeros)?',
            opciones: ['Muy insatisfecho', 'Insatisfecho', 'Neutral', 'Satisfecho', 'Muy satisfecho']
        },
        {
            dimension: 'Dimensión Espiritual',
            pregunta: '¿Qué tanto sentido o propósito sientes en tu vida actualmente?',
            opciones: ['Ninguno', 'Poco', 'Moderado', 'Mucho', 'Pleno']
        }
    ],
    etapa2: [
        {
            dimension: 'Dimensión Física',
            pregunta: '¿Con qué frecuencia sientes que tu estado físico (cansancio, falta de energía, salud) limita tu capacidad para superar obstáculos?',
            opciones: ['Siempre', 'Casi siempre', 'A veces', 'Rara vez', 'Nunca']
        },
        {
            dimension: 'Dimensión Emocional',
            pregunta: '¿Qué tan preparado te consideras para manejar emociones negativas (miedo, tristeza, frustración) frente a una barrera?',
            opciones: ['Nada preparado', 'Poco preparado', 'Medianamente preparado', 'Preparado', 'Muy preparado']
        }
    ],
    etapa3: [
        {
            dimension: 'Dimensión Física',
            pregunta: '¿Qué tan realista consideras que son tus metas en relación con tu energía, salud y capacidades físicas?',
            opciones: ['Nada realistas', 'Poco realistas', 'Medianamente realistas', 'Realistas', 'Muy realistas']
        },
        {
            dimension: 'Dimensión Emocional',
            pregunta: '¿Qué tanto incluyes estrategias de autorregulación emocional (ej. manejo de estrés, autocontrol) en tu plan personal?',
            opciones: ['Nunca', 'Rara vez', 'A veces', 'Frecuentemente', 'Siempre']
        },
        {
            dimension: 'Dimensión Cognitiva',
            pregunta: '¿En qué medida tu plan incluye metas claras y estructuradas bajo el método SMART?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        },
        {
            dimension: 'Dimensión Social',
            pregunta: '¿Qué tanto contemplas el apoyo de tu red social (familia, amigos, compañeros, mentores) en el logro de tus metas?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        },
        {
            dimension: 'Dimensión Espiritual',
            pregunta: '¿Qué tanto tus metas reflejan tus valores, principios o propósito de vida?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        }
    ],
    etapa4: [
        {
            dimension: 'Dimensión Física',
            pregunta: '¿Qué tanto consideras que tus hábitos físicos actuales reflejan un cambio positivo después de este proceso?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        },
        {
            dimension: 'Dimensión Emocional',
            pregunta: '¿En qué medida tu obra de arte refleja el crecimiento en la forma en que gestionas tus emociones?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        },
        {
            dimension: 'Dimensión Cognitiva',
            pregunta: '¿Qué tanto sientes que integraste nuevos aprendizajes y conocimientos en tu identidad personal durante este proyecto?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        },
        {
            dimension: 'Dimensión Social',
            pregunta: '¿Qué tanto impacto positivo crees que dejarás en tu familia, amigos o comunidad gracias a lo aprendido?',
            opciones: ['Ninguno', 'Poco', 'Moderado', 'Mucho', 'Pleno']
        },
        {
            dimension: 'Dimensión Espiritual',
            pregunta: '¿Qué tanto sientes que tu propósito de vida y valores se ven reflejados en la huella que quieres dejar?',
            opciones: ['Nada', 'Poco', 'Moderadamente', 'Mucho', 'Totalmente']
        }
    ]
};

function init() {
    showQuestion(1, 0);
}

function showQuestion(stage, questionIndex) {
    const etapaKey = `etapa${stage}`;
    const questionsArray = questions[etapaKey];
    const question = questionsArray[questionIndex];
    const container = document.getElementById(`questions-${etapaKey}`);
    
    container.innerHTML = `
        <div class="mb-6">
            <h4 class="text-lg font-bold text-familibre-dark mb-3">${question.dimension}</h4>
            <p class="text-gray-700 mb-4">${question.pregunta}</p>
            
            <div class="space-y-3">
                ${question.opciones.map((opcion, index) => `
                    <label class="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-libre-red hover:bg-red-50 cursor-pointer transition-all ${
                        responses[etapaKey][questionIndex] === index ? 'border-libre-red bg-red-50' : ''
                    }">
                        <input 
                            type="radio" 
                            name="q${stage}-${questionIndex}" 
                            value="${index}"
                            ${responses[etapaKey][questionIndex] === index ? 'checked' : ''}
                            onchange="saveResponse(${stage}, ${questionIndex}, ${index})"
                            class="w-5 h-5 text-libre-red focus:ring-libre-red"
                        >
                        <span class="ml-3 text-gray-700">${opcion}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    updateProgress(stage, questionIndex, questionsArray.length);
}

function saveResponse(stage, questionIndex, value) {
    const etapaKey = `etapa${stage}`;
    responses[etapaKey][questionIndex] = value;
}

function updateProgress(stage, questionIndex, total) {
    const progress = ((questionIndex + 1) / total) * 100;
    document.getElementById(`progress-${stage}`).style.width = `${progress}%`;
    document.getElementById(`q${stage}-num`).textContent = questionIndex + 1;
}

function nextQuestion(stage) {
    const etapaKey = `etapa${stage}`;
    const questionsArray = questions[etapaKey];
    
    if (responses[etapaKey][currentQuestionIndex] === undefined) {
        alert('Por favor selecciona una opción antes de continuar');
        return;
    }
    
    if (currentQuestionIndex < questionsArray.length - 1) {
        currentQuestionIndex++;
        showQuestion(stage, currentQuestionIndex);
    } else {
        if (stage < 4) {
            document.getElementById(`etapa-${stage}`).classList.add('hidden');
            document.getElementById(`etapa-${stage + 1}`).classList.remove('hidden');
            currentQuestionIndex = 0;
            showQuestion(stage + 1, 0);
        }
    }
}

function prevStage(stage) {
    document.getElementById(`etapa-${stage}`).classList.add('hidden');
    document.getElementById(`etapa-${stage - 1}`).classList.remove('hidden');
    const prevEtapaKey = `etapa${stage - 1}`;
    currentQuestionIndex = questions[prevEtapaKey].length - 1;
    showQuestion(stage - 1, currentQuestionIndex);
}

function submitProyecto() {
    if (responses.etapa4[currentQuestionIndex] === undefined) {
        alert('Por favor selecciona una opción antes de finalizar');
        return;
    }
    
    saveToDatabase();
    
    document.getElementById('etapa-4').classList.add('hidden');
    document.getElementById('resultados').classList.remove('hidden');
}

function saveToDatabase() {
    const data = {
        nombre: userData.nombre,
        correo: userData.correo,
        respuestas: responses,
        fecha: new Date().toISOString()
    };
    
    fetch('https://test-vocacional-familibrev2.vercel.app/api/proyecto-vida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log('Proyecto guardado:', result))
    .catch(error => console.error('Error:', error));
}

function downloadProyectoPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Logo y encabezado
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('MI PROYECTO DE VIDA', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Universidad Libre - Programa Familibre', 105, 30, { align: 'center' });
    
    // Información personal
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Nombre: ${userData.nombre}`, 20, 55);
    doc.text(`Correo: ${userData.correo}`, 20, 65);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 20, 75);
    
    // Línea separadora
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(20, 85, 190, 85);
    
    let yPos = 95;
    
    // Etapas
    Object.keys(responses).forEach((etapaKey, etapaIndex) => {
        const etapaNum = etapaIndex + 1;
        const etapaTitles = [
            'CONOZCO LAS DIMENSIONES DEL SER HUMANO',
            'IDENTIFICO MIS BARRERAS',
            'CONSTRUYO MI PLAN',
            'MI OBRA DE ARTE - DEJANDO HUELLAS'
        ];
        
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(16);
        doc.setTextColor(220, 38, 38);
        doc.text(`Etapa ${etapaNum}: ${etapaTitles[etapaIndex]}`, 20, yPos);
        yPos += 10;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        questions[etapaKey].forEach((q, qIndex) => {
            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFont(undefined, 'bold');
            doc.text(`${q.dimension}:`, 25, yPos);
            yPos += 6;
            
            doc.setFont(undefined, 'normal');
            const lines = doc.splitTextToSize(q.pregunta, 160);
            doc.text(lines, 25, yPos);
            yPos += lines.length * 6;
            
            const respuesta = q.opciones[responses[etapaKey][qIndex]];
            doc.setTextColor(30, 58, 138);
            doc.text(`Respuesta: ${respuesta}`, 25, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 10;
        });
        
        yPos += 5;
    });
    
    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Universidad Libre - Programa Familibre', 105, 285, { align: 'center' });
        doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    }
    
    doc.save(`Proyecto-de-Vida-${userData.nombre.replace(/\s+/g, '-')}.pdf`);
}

document.addEventListener('DOMContentLoaded', init);