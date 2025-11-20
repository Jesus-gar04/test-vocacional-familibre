// test.js - Lógica del test vocacional

class VocationalTest {
    constructor() {
        this.currentQuestion = 0;
        this.responses = {};
        this.userData = {};
        this.questions = this.initializeQuestions();
        this.areas = this.initializeAreas();
        this.allQuestions = this.generateAllQuestions();
        
        this.init();
    }

    init() {
        // Verificar que hay datos de usuario
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        if (!userData.nombre) {
            window.location.href = 'index.html';
            return;
        }
        this.userData = userData;

        // Inicializar event listeners
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());

        // Mostrar primera pregunta
        this.showCurrentQuestion();
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

    generateAllQuestions() {
        const allQ = [];
        Object.keys(this.questions).forEach(area => {
            this.questions[area].forEach(question => {
                allQ.push({ area, question });
            });
        });
        return allQ;
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

        // Guardar resultados completos
        const results = {
            userData: this.userData,
            responses: this.responses,
            areaScores: areaScores,
            fecha: new Date().toISOString()
        };

        sessionStorage.setItem('testResults', JSON.stringify(results));

        // Redirigir a resultados
        window.location.href = 'resultados.html';
    }
}

// Inicializar el test
let test;
document.addEventListener('DOMContentLoaded', () => {
    test = new VocationalTest();
});