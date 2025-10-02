// Test Vocacional - Universidad Libre Familibre
class VocationalTest {
    constructor() {
        this.currentQuestion = 0;
        this.responses = {};
        this.userData = {};
        this.questions = this.initializeQuestions();
        this.areas = this.initializeAreas();
        this.careers = this.initializeCareers();
        this.allQuestions = this.generateAllQuestions();
        
        this.initializeEventListeners();
    }

    initializeQuestions() {
        return {
            'ciencias_tecnologia': [
                'Resolver problemas matemáticos y trabajar con números',
                'Diseñar y construir prototipos o dispositivos',
                'Programar aplicaciones, páginas web o scripts',
                'Realizar experimentos y analizar datos científicos',
                'Trabajar con equipos y maquinaria (mantenimiento/operación)',
                'Investigar e innovar en soluciones tecnológicas'
            ],
            'arte_creatividad': [
                'Dibujar, ilustrar o diseñar gráficos',
                'Crear y editar contenido audiovisual (video/foto)',
                'Componer o tocar música',
                'Escribir textos creativos (relatos, guiones)',
                'Diseñar moda, productos estéticos o espacios'
            ],
            'salud_bienestar': [
                'Cuidar y acompañar a personas en salud (asistencia/enfermería)',
                'Trabajar en prevención y promoción de salud',
                'Investigar o aplicar conocimientos en biología/salud',
                'Orientar sobre nutrición, deporte o bienestar físico'
            ],
            'social_educacion': [
                'Trabajar con comunidades y proyectos sociales',
                'Enseñar, planear y dar clases',
                'Orientar y acompañar procesos psicosociales (psicología/trabajo social)',
                'Organizar y coordinar actividades culturales o educativas'
            ],
            'negocios_administracion': [
                'Crear y gestionar un emprendimiento o negocio',
                'Gestionar recursos, finanzas y contabilidad',
                'Planificar proyectos y coordinar equipos',
                'Investigar mercados y trabajar en ventas/comercial'
            ],
            'comunicacion_humanidades': [
                'Investigar y redactar (periodismo, investigación, docencia)',
                'Hablar en público, hacer presentaciones y relaciones públicas',
                'Trabajar con idiomas (traducción, interpretación, docencia de idiomas)'
            ],
            'naturaleza_ambiente': [
                'Trabajar al aire libre: agricultura, jardinería, conservación',
                'Investigar y proponer soluciones ambientales'
            ],
            'oficios_manual': [
                'Trabajar con las manos: carpintería, electricidad, mecánica ligera',
                'Reparar, fabricar o mantener equipos y objetos'
            ],
            'servicios_atencion': [
                'Atender al público y ofrecer servicio (restauración, hotelería, retail)',
                'Diseñar experiencias y servicio al cliente (UX de servicios)'
            ],
            'digital_multimedia': [
                'Diseñar interfaces y experiencia de usuario (UX/UI)',
                'Analizar y gestionar datos digitales (analítica, BI)'
            ],
            'investigacion': [
                'Formular preguntas, recopilar evidencia y sacar conclusiones'
            ],
            'habilidades_transversales': [
                'Trabajar en equipo, liderar y coordinar (habilidades blandas)'
            ]
        };
    }

    initializeAreas() {
        return {
            'ciencias_tecnologia': 'Ciencias y Tecnología',
            'arte_creatividad': 'Arte y Creatividad',
            'salud_bienestar': 'Salud y Bienestar',
            'social_educacion': 'Social / Educación',
            'negocios_administracion': 'Negocios / Administración',
            'comunicacion_humanidades': 'Comunicación y Humanidades',
            'naturaleza_ambiente': 'Naturaleza y Medio Ambiente',
            'oficios_manual': 'Oficios y Trabajo Manual',
            'servicios_atencion': 'Servicios y Atención',
            'digital_multimedia': 'Digital / Multimedia',
            'investigacion': 'Investigación',
            'habilidades_transversales': 'Habilidades Transversales'
        };
    }

    initializeCareers() {
        return {
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
    }

    generateAllQuestions() {
        const allQ = [];
        Object.keys(this.questions).forEach(area => {
            this.questions[area].forEach(question => {
                allQ.push({ area, question });
            });
        });
        return allQ;
    }

    initializeEventListeners() {
        // Registro
        document.getElementById('submit-registration').addEventListener('click', () => this.submitRegistration());

        // Selección de módulos
        document.getElementById('proyecto-vida-btn').addEventListener('click', () => {
            alert('Mi Proyecto de Vida - Próximamente disponible');
        });
        document.getElementById('exploracion-btn').addEventListener('click', () => this.startTest());

        // Navegación del test
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());

        // Resultados
        document.getElementById('restart-btn').addEventListener('click', () => this.restartTest());
        document.getElementById('download-pdf-btn').addEventListener('click', () => this.downloadPDF());
    }

    submitRegistration() {
        const nombre = document.getElementById('nombre').value.trim();
        const identificacion = document.getElementById('identificacion').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('correo').value.trim();

        if (!nombre || !identificacion || !telefono || !correo) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Validar email
        if (!this.validateEmail(correo)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }

        // Guardar datos del usuario
        this.userData = {
            nombre,
            identificacion,
            telefono,
            correo,
            fecha: new Date().toISOString()
        };

        // Enviar a la base de datos
        this.saveToDatabase(this.userData);

        // Mostrar pantalla de selección
        document.getElementById('registration-section').classList.add('hidden');
        document.getElementById('selection-section').classList.remove('hidden');
        document.getElementById('user-name').textContent = nombre;
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    saveToDatabase(data) {
        // Aquí se envía a tu API de Vercel
        const apiUrl = 'https://test-vocacional-familibrev2.vercel.app/api/register'; // Cambiar por tu URL
        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Datos guardados exitosamente:', result);
        })
        .catch(error => {
            console.error('Error al guardar datos:', error);
            // Continuar con el test aunque falle el guardado
        });
    }

    startTest() {
        document.getElementById('selection-section').classList.add('hidden');
        document.getElementById('test-section').classList.remove('hidden');
        this.showCurrentQuestion();
    }

    showCurrentQuestion() {
        const container = document.getElementById('question-container');
        const q = this.allQuestions[this.currentQuestion];
        
        container.innerHTML = `
            <div class="text-center mb-8">
                <h4 class="text-2xl font-bold text-libre-black mb-4">${q.question}</h4>
                <p class="text-gray-600">¿Qué tan interesado/a estás en esta actividad?</p>
            </div>
            
            <div class="flex gap-3 justify-center flex-wrap">
                ${[1,2,3,4,5].map(rating => `
                    <button 
                        onclick="test.setResponse(${rating})" 
                        class="rating-btn flex flex-col items-center p-4 rounded-xl border-2 transition-all min-w-[100px] ${
                            this.responses[this.currentQuestion] === rating 
                                ? 'bg-libre-red text-white border-libre-red scale-105' 
                                : 'bg-gray-50 border-gray-300 hover:border-libre-red hover:bg-red-50'
                        }">
                        <span class="text-2xl font-bold mb-1">${rating}</span>
                        <span class="text-xs text-center">${this.getRatingText(rating)}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Actualizar barra de progreso
        const progress = ((this.currentQuestion + 1) / this.allQuestions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = 
            `Pregunta ${this.currentQuestion + 1} de ${this.allQuestions.length}`;

        // Actualizar botones
        document.getElementById('prev-btn').classList.toggle('hidden', this.currentQuestion === 0);
        
        const nextBtn = document.getElementById('next-btn');
        if (this.currentQuestion === this.allQuestions.length - 1) {
            nextBtn.textContent = 'Ver Resultados';
        } else {
            nextBtn.textContent = 'Siguiente';
        }
    }

    getRatingText(rating) {
        const texts = {
            1: 'Nada',
            2: 'Poco',
            3: 'Neutral',
            4: 'Interesado',
            5: 'Muy'
        };
        return texts[rating];
    }

    setResponse(value) {
        this.responses[this.currentQuestion] = value;
        this.showCurrentQuestion();
    }

    nextQuestion() {
        if (!this.responses[this.currentQuestion]) {
            alert('Por favor selecciona una opción antes de continuar');
            return;
        }

        if (this.currentQuestion < this.allQuestions.length - 1) {
            this.currentQuestion++;
            this.showCurrentQuestion();
        } else {
            this.calculateResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showCurrentQuestion();
        }
    }

    calculateResults() {
        const areaScores = {};
        
        // Inicializar contadores
        Object.keys(this.questions).forEach(area => {
            areaScores[area] = {
                total: 0,
                count: 0,
                name: this.areas[area]
            };
        });

        // Calcular puntajes
        this.allQuestions.forEach((q, index) => {
            if (this.responses[index]) {
                areaScores[q.area].total += this.responses[index];
                areaScores[q.area].count += 1;
            }
        });

        // Calcular promedios
        Object.keys(areaScores).forEach(area => {
            areaScores[area].average = areaScores[area].total / areaScores[area].count;
        });

        // Ordenar y obtener top 3
        const sortedAreas = Object.entries(areaScores)
            .sort(([,a], [,b]) => b.average - a.average)
            .slice(0, 3);

        this.showResults(areaScores, sortedAreas);
    }

    showResults(areaScores, topAreas) {
        document.getElementById('test-section').classList.add('hidden');
        document.getElementById('results-section').classList.remove('hidden');

        this.displayChart(areaScores);
        this.displayTopAreas(topAreas);
    }

    displayChart(areaScores) {
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

    displayTopAreas(topAreas) {
        const cardsContainer = document.getElementById('top-areas-cards');
        cardsContainer.innerHTML = '';

        topAreas.forEach(([areaKey, areaData], index) => {
            const careers = this.careers[areaKey] || ['Consultar con admisiones'];
            
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
                            ${careers.map(career => `
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

    downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // ===========================
    // 🎨 Portada con título
    // ===========================
    doc.setFillColor(220, 38, 38); // rojo
    doc.rect(0, 0, 210, 40, "F"); 

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text('Test Vocacional', 105, 25, { align: 'center' });

    doc.setFontSize(14);
    doc.text('Universidad Libre - Programa Familibre', 105, 35, { align: 'center' });

    // ===========================
    // 🧑 Datos del usuario
    // ===========================
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138);
    doc.text("Datos del Estudiante", 20, 55);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 60, 180, 40, 3, 3, "F");

    doc.text(`Nombre: ${this.userData.nombre}`, 20, 70);
    doc.text(`Identificación: ${this.userData.identificacion}`, 20, 78);
    doc.text(`Teléfono: ${this.userData.telefono}`, 20, 86);
    doc.text(`Correo: ${this.userData.correo}`, 20, 94);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 150, 94);

    // ===========================
    // 📊 Resultados
    // ===========================
    const areaScores = {};
    Object.keys(this.questions).forEach(area => {
        areaScores[area] = { total: 0, count: 0, name: this.areas[area] };
    });

    this.allQuestions.forEach((q, index) => {
        if (this.responses[index]) {
            areaScores[q.area].total += this.responses[index];
            areaScores[q.area].count += 1;
        }
    });

    Object.keys(areaScores).forEach(area => {
        areaScores[area].average = areaScores[area].total / areaScores[area].count;
    });

    const sortedAreas = Object.entries(areaScores)
        .sort(([,a], [,b]) => b.average - a.average)
        .slice(0, 3);

    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text("Tus Áreas de Interés", 20, 120);

    // ===========================
    // 🗂 Tabla con las áreas
    // ===========================
    const tableData = sortedAreas.map(([areaKey, areaData], index) => [
        index + 1,
        areaData.name,
        `${areaData.average.toFixed(1)}/5`,
        (this.careers[areaKey] || []).join(", ")
    ]);

    doc.autoTable({
        startY: 130,
        head: [['#', 'Área', 'Puntaje', 'Carreras sugeridas']],
        body: tableData,
        styles: { fontSize: 10, cellPadding: 4 },
        headStyles: { fillColor: [220, 38, 38], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // ===========================
    // 📌 Pie de página
    // ===========================
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(120);
        doc.text(
            `Universidad Libre - Programa Familibre | Página ${i} de ${pageCount}`,
            105,
            290,
            { align: "center" }
        );
    }

    // Guardar PDF
    doc.save(`Test-Vocacional-${this.userData.nombre.replace(/\s+/g, '-')}.pdf`);
}


    restartTest() {
        this.currentQuestion = 0;
        this.responses = {};
        this.userData = {};
        
        document.getElementById('results-section').classList.add('hidden');
        document.getElementById('registration-section').classList.remove('hidden');
        
        // Limpiar formulario
        document.getElementById('nombre').value = '';
        document.getElementById('identificacion').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('correo').value = '';
    }
}

// Inicializar el test cuando el DOM esté listo
let test;
document.addEventListener('DOMContentLoaded', () => {
    test = new VocationalTest();
});