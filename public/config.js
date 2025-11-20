// Configuración del Test Vocacional - Universidad Libre Familibre

const TestConfig = {
    // Colores de la universidad y programa
    colors: {
        libre: {
            red: '#DC2626',
            black: '#1F2937',
            white: '#FFFFFF'
        },
        familibre: {
            lightBlue: '#87CEEB',
            darkBlue: '#1E3A8A'
        }
    },
    
    // Descripciones detalladas de cada área
    areaDescriptions: {
        'ciencias_tecnologia': 'Te atrae el mundo de las ciencias exactas, la tecnología y la innovación. Disfrutas resolviendo problemas complejos y trabajando con datos.',
        'arte_creatividad': 'Tienes una mente creativa y te gusta expresarte a través del arte, el diseño y la creación de contenido visual o audiovisual.',
        'salud_bienestar': 'Te motiva ayudar a otros y contribuir al bienestar físico y mental de las personas a través de la atención sanitaria.',
        'social_educacion': 'Te interesa el trabajo con comunidades, la educación y el desarrollo social. Disfrutas enseñando y ayudando a otros a crecer.',
        'negocios_administracion': 'Tienes habilidades para los negocios, la gestión de recursos y el emprendimiento. Te gusta liderar y tomar decisiones estratégicas.',
        'comunicacion_humanidades': 'Te fascina la comunicación, el lenguaje, la investigación y las relaciones humanas. Disfrutas escribiendo y comunicando ideas.',
        'naturaleza_ambiente': 'Te conectas con la naturaleza y te preocupa el medio ambiente. Disfrutas trabajando al aire libre y en conservación.',
        'oficios_manual': 'Prefieres el trabajo práctico con las manos, crear y reparar objetos tangibles. Te gusta ver resultados concretos de tu trabajo.',
        'servicios_atencion': 'Te gusta interactuar con personas y brindar excelente servicio. Disfrutas creando experiencias positivas para otros.',
        'digital_multimedia': 'Te atrae el mundo digital, el diseño de interfaces y la gestión de datos. Combinas creatividad con tecnología.',
        'investigacion': 'Eres curioso por naturaleza y te gusta formular preguntas, investigar y llegar a conclusiones basadas en evidencia.',
        'habilidades_transversales': 'Tienes facilidad para trabajar en equipo, liderar grupos y coordinar proyectos. Eres un conector natural entre personas.'
    },
    
    // Enlaces útiles de la universidad
    links: {
        admisiones: 'https://www.unilibrebarranquilla.edu.co/admisiones',
        programas: 'https://www.unilibrebarranquilla.edu.co/programas',
        bienestar: 'https://www.unilibrebarranquilla.edu.co/bienestar',
        contacto: 'https://www.unilibrebarranquilla.edu.co/contacto'
    },
    
    // Información de contacto
    contact: {
        phone: '+57 (5) 385-8700',
        email: 'info@unilibrebarranquilla.edu.co',
        address: 'Km. 7 Antigua vía Puerto Colombia, Barranquilla, Atlántico'
    },
    
    // Configuración del test
    test: {
        minScore: 1,
        maxScore: 5,
        passingScore: 3.0,
        topAreasToShow: 3
    },
    
    // API Configuration (cambiar por tu URL de Vercel)
    api: {
        baseUrl: 'https://tu-proyecto.vercel.app',
        endpoints: {
            register: '/api/register',
            saveResults: '/api/results'
        }
    }
};

// Funciones auxiliares
const TestUtils = {
    // Formatear puntaje
    formatScore: (score) => {
        return Number(score).toFixed(1);
    },
    
    // Obtener color según puntaje
    getScoreColor: (score) => {
        if (score >= 4.5) return 'text-green-600';
        if (score >= 4.0) return 'text-blue-600'; 
        if (score >= 3.5) return 'text-yellow-600';
        if (score >= 3.0) return 'text-orange-600';
        return 'text-red-600';
    },
    
    // Obtener color de fondo
    getScoreBackgroundColor: (score) => {
        if (score >= 4.5) return 'bg-green-500';
        if (score >= 4.0) return 'bg-blue-500';
        if (score >= 3.5) return 'bg-yellow-500'; 
        if (score >= 3.0) return 'bg-orange-500';
        return 'bg-red-500';
    },
    
    // Mensaje motivacional
    getMotivationalMessage: (topScore) => {
        if (topScore >= 4.5) {
            return '¡Excelente! Tienes una fuerte afinidad con estas áreas. ¡Es momento de explorar estas carreras!';
        } else if (topScore >= 4.0) {
            return '¡Muy bien! Muestras un gran interés en estas áreas. Te recomendamos investigar más sobre estas carreras.';
        } else if (topScore >= 3.5) {
            return 'Buen resultado. Hay áreas que despiertan tu interés. Te sugerimos explorar más opciones.';
        } else if (topScore >= 3.0) {
            return 'Resultado moderado. Podrías considerar explorar más áreas para encontrar tu verdadera vocación.';
        } else {
            return 'Te recomendamos reflexionar más sobre tus intereses o repetir el test cuando tengas más claridad.';
        }
    },
    
    // Validar email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Formatear fecha
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestConfig, TestUtils };
}