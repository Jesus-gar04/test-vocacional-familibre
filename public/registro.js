// registro.js - Manejo del formulario de registro

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-registration');
    
    submitBtn.addEventListener('click', submitRegistration);

    // Permitir envío con Enter
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitRegistration();
            }
        });
    });
});

function submitRegistration() {
    const nombre = document.getElementById('nombre').value.trim();
    const identificacion = document.getElementById('identificacion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    // Validar campos
    if (!nombre || !identificacion || !telefono || !correo) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Validar email
    if (!validateEmail(correo)) {
        alert('Por favor ingresa un correo electrónico válido');
        return;
    }

    // Validar teléfono (números y mínimo 7 dígitos)
    if (!/^\d{7,}$/.test(telefono.replace(/[\s-]/g, ''))) {
        alert('Por favor ingresa un número de teléfono válido (mínimo 7 dígitos)');
        return;
    }

    // Guardar datos del usuario
    const userData = {
        nombre,
        identificacion,
        telefono,
        correo,
        fecha: new Date().toISOString()
    };

    // Guardar en sessionStorage
    sessionStorage.setItem('userData', JSON.stringify(userData));

    // Enviar a la base de datos
    saveToDatabase(userData);

    // Redirigir a página de selección
    window.location.href = 'seleccion.html';
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function saveToDatabase(data) {
    // Cambiar por tu URL de Vercel cuando esté lista
    const apiUrl = 'https://tu-proyecto.vercel.app/api/register';
    
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