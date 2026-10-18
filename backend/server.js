
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Carpeta donde se guardan las fotografías
const carpetaFotos = path.join(__dirname, 'uploads');
fs.mkdirSync(carpetaFotos, { recursive: true });

// Configuración de seguridad
const HTTPS_ACTIVO = process.env.HTTPS_ACTIVO === 'true';

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: {
    policy: 'cross-origin'
  },
  crossOriginEmbedderPolicy: false,
  strictTransportSecurity: HTTPS_ACTIVO
    ? {
        maxAge: 31536000,
        includeSubDomains: false,
        preload: false
      }
    : false
}));

// Configuración CORS
const origenFrontend = process.env.FRONTEND_ORIGIN;

app.use(cors(
  origenFrontend ? { origin: origenFrontend } : {}
));

app.use(express.json());

// Servir las fotografías
app.use('/uploads', express.static(carpetaFotos));

// Conexión a la nueva instancia de MariaDB
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'galeria_fotos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Configuración para subir fotografías
const almacenamiento = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, carpetaFotos);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const nombre =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

    callback(null, nombre);
  }
});

const subir = multer({
  storage: almacenamiento,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Solo se permiten archivos de imagen.'));
    }
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Galería de Fotos funcionando'
  });
});

// Consultar fotografías
app.get('/api/fotos', async (req, res) => {
  try {
    const [fotos] = await pool.query(`
      SELECT id, titulo, descripcion, ruta, tipo, fecha_subida
      FROM fotos
      ORDER BY id DESC
    `);

    res.json(
      fotos.map(foto => ({
        ...foto,
        url: `http://localhost:${PORT}${foto.ruta}`
      }))
    );
  } catch (error) {
    console.error('Error al consultar fotografías:', error.message);

    res.status(500).json({
      mensaje: 'Error al consultar las fotografías.'
    });
  }
});

// Subir una fotografía
app.post('/api/fotos', (req, res) => {
  subir.single('imagen')(req, res, async error => {
    if (error) {
      console.error('Error al subir fotografía:', error.message);

      return res.status(400).json({
        mensaje: error.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        mensaje: 'No se recibió ninguna imagen.'
      });
    }

    try {
      const { titulo, descripcion, tipo } = req.body;
      const ruta = `/uploads/${req.file.filename}`;

      const tituloFinal = titulo || req.file.originalname;
      const descripcionFinal = descripcion || '';
      const tipoFinal = tipo || 'Otro';

      const [resultado] = await pool.query(
        `INSERT INTO fotos (titulo, descripcion, ruta, tipo)
         VALUES (?, ?, ?, ?)`,
        [tituloFinal, descripcionFinal, ruta, tipoFinal]
      );

      res.status(201).json({
        id: resultado.insertId,
        titulo: tituloFinal,
        descripcion: descripcionFinal,
        ruta,
        tipo: tipoFinal,
        fecha_subida: new Date(),
        url: `http://localhost:${PORT}${ruta}`
      });
    } catch (errorBD) {
      console.error(
        'Error al guardar fotografía:',
        errorBD.message
      );

      // Eliminar el archivo si no pudo guardarse el registro
      fs.unlink(req.file.path, () => {});

      res.status(500).json({
        mensaje:
          'No fue posible guardar la fotografía en la base de datos.'
      });
    }
  });
});

// Manejo general de errores
app.use((error, req, res, next) => {
  console.error('Error en la API:', error.message);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    mensaje: 'Ocurrió un error interno en el servidor.'
  });
});

// Iniciar el servidor después de comprobar MySQL
async function iniciarServidor() {
  let conexion;

  try {
    conexion = await pool.getConnection();
    await conexion.ping();

    console.log('Conexión a MySQL establecida correctamente.');
  } catch (error) {
    console.error(
      'No fue posible conectar con MySQL:',
      error.message
    );

    await pool.end();
    process.exitCode = 1;
    return;
  } finally {
    if (conexion) {
      conexion.release();
    }
  }

  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Carpeta de imágenes: ${carpetaFotos}`);
  });
}

iniciarServidor();
