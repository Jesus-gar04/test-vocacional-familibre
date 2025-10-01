// API endpoint para registrar usuarios del test vocacional
// Este archivo va en la carpeta api/register.js

const { MongoClient } = require('mongodb');

// URI de conexión a MongoDB (se configura en variables de entorno de Vercel)
const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    // Reutilizar conexión si ya existe
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    // Crear nueva conexión
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db('Project 0'); // Nombre de la base de datos
    
    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Método no permitido',
            message: 'Solo se permite el método POST'
        });
    }

    try {
        // Conectar a la base de datos
        const { db } = await connectToDatabase();
        const collection = db.collection('registros');

        // Obtener datos del request
        const { nombre, identificacion, telefono, correo } = req.body;

        // Validar datos requeridos
        if (!nombre || !identificacion || !telefono || !correo) {
            return res.status(400).json({
                error: 'Datos incompletos',
                message: 'Todos los campos son obligatorios'
            });
        }

        // Preparar documento para insertar
        const documento = {
            nombre,
            identificacion,
            telefono,
            correo,
            fechaRegistro: new Date(),
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        };

        // Insertar en la base de datos
        const result = await collection.insertOne(documento);

        // Responder con éxito
        return res.status(200).json({
            success: true,
            message: 'Registro guardado exitosamente',
            id: result.insertedId
        });

    } catch (error) {
        console.error('Error al guardar registro:', error);
        
        return res.status(500).json({
            error: 'Error del servidor',
            message: 'No se pudo guardar el registro. Por favor intenta nuevamente.'
        });
    }
};