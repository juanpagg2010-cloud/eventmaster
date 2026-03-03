🎉 EventMaster

Gestión de Eventos y Reservas
Reto: Dev Senior Code – JavaScript MEAN Mastery
Autor: Juan Pablo

📌 Descripción

EventMaster es una aplicación web desarrollada para una agencia de eventos que necesita organizar sus actividades y controlar el cupo de asistentes.

La plataforma permite:

📋 Registrar eventos

👥 Controlar el número máximo de asistentes

➕ Inscribir personas a un evento

🗑️ Eliminar eventos

🔎 Filtrar eventos por tipo (Taller, Conferencia, Networking)

🛠️ Stack Tecnológico
🔹 Backend

Node.js

Express.js

MongoDB

Mongoose

dotenv

🔹 Frontend

JavaScript Vanilla

HTML5

CSS3 (Flexbox / Grid)

🗂️ Arquitectura del Proyecto

El backend está organizado siguiendo buenas prácticas:

backend/
│
├── models/
│   └── Evento.js
│
├── controllers/
│   └── eventosController.js
│
├── routes/
│   └── eventosRoutes.js
│
├── middleware/
│   └── errorHandler.js
│
├── server.js
└── .env

Separación obligatoria:

/models

/routes

/controllers
