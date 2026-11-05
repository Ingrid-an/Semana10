# ☕ API REST de Cafetería — Semana 10

**Asignatura:** Desarrollo de Aplicaciones Web (IS093A) · Unidad II — Desarrollo Web Fullstack
**Tema:** Backend con Node.js + Express + MySQL — API RESTful (CRUD).
**Autora:** Ingrid Ivette Andrade Egoavil

API REST que gestiona un catálogo de **bebidas de cafetería** con los cuatro
verbos HTTP (GET, POST, PUT, DELETE), conectada a MySQL mediante un *pool* de
conexiones con `mysql2/promise`.

---

## Estructura del proyecto (arquitectura MVC)

```
api-cafeteria/
├── package.json            dependencias y scripts
├── .env.example            plantilla de variables de entorno
├── .gitignore              excluye node_modules y .env
├── database.sql            script para crear la BD db_lab10 y la tabla
├── pruebas.rest            peticiones de prueba (extensión REST Client)
└── src/
    ├── index.js            servidor Express (middlewares + arranque)
    ├── config/
    │   └── db.js           pool de conexiones a MySQL
    ├── controllers/
    │   └── bebidasController.js   lógica CRUD (los 4 verbos)
    └── routes/
        └── bebidasRoutes.js       define las rutas del recurso
```

---

## Requisitos

- **Node.js ≥ 20.x** y npm
- **MySQL** corriendo (XAMPP/Laragon)

---

## Instalación y ejecución (paso a paso)

**1. Instalar dependencias:**
```bash
npm install
```

**2. Crear la base de datos:** abre **phpMyAdmin** (XAMPP) → pestaña SQL → pega y
ejecuta el contenido de `database.sql`. Esto crea `db_lab10`, la tabla `bebidas`
y 5 registros de ejemplo.

**3. Configurar las credenciales:** copia `.env.example` como `.env` y ajusta tus
datos (en XAMPP por defecto el usuario es `root` y la contraseña está vacía):
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=db_lab10
```

**4. Arrancar el servidor:**
```bash
npm start
```
Verás: `🚀 Servidor corriendo en http://localhost:3000` y `✅ Conectado a MySQL`.

---

## Endpoints de la API

| Verbo | Ruta | Descripción | Éxito | Error |
|---|---|---|---|---|
| GET | `/api/bebidas` | Lista todas las bebidas | 200 | 500 |
| GET | `/api/bebidas/:id` | Obtiene una bebida por ID | 200 | 404 / 500 |
| POST | `/api/bebidas` | Crea una bebida | 201 | 400 / 500 |
| PUT | `/api/bebidas/:id` | Actualiza una bebida | 200 | 400 / 404 / 500 |
| DELETE | `/api/bebidas/:id` | Elimina una bebida | 200 | 404 / 500 |

### Ejemplo de body (POST / PUT)
```json
{
  "nombre": "Latte Caramelo",
  "tamano": "grande",
  "precio": 9.50,
  "disponible": true
}
```

---

## Buenas prácticas aplicadas

- **Pool de conexiones** (`mysql2/promise`) en lugar de una conexión única.
- **Prepared statements** (`?`) en todas las queries → previenen **inyección SQL**.
- **Variables de entorno** (`dotenv`): las credenciales no están en el código y
  `.env` está en `.gitignore` (no se sube a GitHub).
- **Manejo de errores** con `try/catch` y códigos HTTP correctos (200, 201, 400,
  404, 500).
- **Respuestas siempre en JSON** (`Content-Type: application/json`).

---

## Cómo probar (Postman / Thunder Client / REST Client)

El archivo `pruebas.rest` trae las 9 peticiones listas. Con la extensión
**REST Client** de VS Code, haz clic en "Send Request" sobre cada bloque.
También puedes importarlas a Postman o Thunder Client.

Casos a capturar para la evidencia: respuestas **200/201** (éxito) y **404/400/500**
(error), con sus Status Codes.
