const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('Familibre');
    
    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

module.exports = async (req, res) => {
    // CORS - DEBE IR PRIMERO
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Método no permitido',
            message: 'Solo se permite el método POST'
        });
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('registros');

        const { nombre, identificacion, telefono, correo } = req.body;

        if (!nombre || !identificacion || !telefono || !correo) {
            return res.status(400).json({
                error: 'Datos incompletos',
                message: 'Todos los campos son obligatorios'
            });
        }

        const documento = {
            nombre,
            identificacion,
            telefono,
            correo,
            fechaRegistro: new Date(),
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        };

        const result = await collection.insertOne(documento);

        return res.status(200).json({
            success: true,
            message: 'Registro guardado exitosamente',
            id: result.insertedId
        });

    } catch (error) {
        console.error('Error al guardar registro:', error);
        
        return res.status(500).json({
            error: 'Error del servidor',
            message: error.message
        });
    }
};