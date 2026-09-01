# 🚀 NoSQL Mini-API

Eine kleine REST-API zur Verwaltung von Nutzern. Das Projekt wurde mit Node.js,
Express, MongoDB und Mongoose entwickelt. Die API bietet alle grundlegenden
CRUD-Operationen: Nutzer erstellen, lesen, aktualisieren und loeschen.

## 🛠️ Technologien

- Node.js
- Express
- MongoDB Atlas
- Mongoose

## ⚙️ Installation und Start

1. Repository klonen und in den Projektordner wechseln:

   ```bash
   git clone https://github.com/YanaKhariebova/NoSQL-Mini-API-gruppen-projekt
   cd NoSQL-Mini-API-gruppen-projekt
   ```

2. Abhaengigkeiten installieren:

   ```bash
   npm install
   ```

3. Im Hauptverzeichnis eine `.env`-Datei erstellen:

   ```env
   PORT=3000
   MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
   ```

4. Server starten:

   ```bash
   npm start
   ```

Nach erfolgreichem Start ist die API standardmaessig unter
`http://localhost:3000` erreichbar.

> 🔐 Die echte `.env`-Datei darf nicht auf GitHub hochgeladen werden, da sie
> Zugangsdaten enthaelt.

## 👤 Datenmodell

Ein Nutzer hat folgende Felder:

| Feld        | Typ     | Pflichtfeld | Regeln                                 |
| ----------- | ------- | ----------- | -------------------------------------- |
| `name`      | String  | Ja          | 2 bis 50 Zeichen                       |
| `email`     | String  | Ja          | Gueltige und eindeutige E-Mail-Adresse |
| `age`       | Number  | Ja          | Zwischen 1 und 120                     |
| `isActive`  | Boolean | Nein        | Standardwert: `true`                   |
| `createdAt` | Date    | Automatisch | Erstellungszeitpunkt                   |
| `updatedAt` | Date    | Automatisch | Letzte Aktualisierung                  |

## 🔗 API-Endpunkte

Basis-URL: `http://localhost:3000`

| Methode  | Endpunkt     | Beschreibung                                |
| -------- | ------------ | ------------------------------------------- |
| `POST`   | `/users`     | Neuen Nutzer erstellen                      |
| `GET`    | `/users`     | Alle Nutzer abrufen                         |
| `GET`    | `/users/:id` | Einen Nutzer anhand seiner ID abrufen       |
| `PATCH`  | `/users/:id` | Einzelne Felder eines Nutzers aktualisieren |
| `DELETE` | `/users/:id` | Einen Nutzer loeschen                       |

In Postman muss bei Anfragen mit Body unter **Body -> raw -> JSON** ausgewaehlt
werden. `:id` wird in der URL durch eine echte MongoDB-ID ersetzt.

### ➕ Nutzer erstellen

```http
POST /users
Content-Type: application/json
```

Beispielanfrage:

```json
{
  "name": "Anna Becker",
  "email": "anna.becker@example.com",
  "age": 25
}
```

Erfolgreiche Antwort (`201 Created`):

```json
{
  "_id": "68b12abc3456789012345678",
  "name": "Anna Becker",
  "email": "anna.becker@example.com",
  "age": 25,
  "isActive": true,
  "createdAt": "2026-09-01T09:00:00.000Z",
  "updatedAt": "2026-09-01T09:00:00.000Z",
  "__v": 0
}
```

### 📋 Alle Nutzer abrufen

```http
GET /users
```

Erfolgreiche Antwort (`200 OK`):

```json
[
  {
    "_id": "68b12abc3456789012345678",
    "name": "Anna Becker",
    "email": "anna.becker@example.com",
    "age": 25,
    "isActive": true,
    "createdAt": "2026-09-01T09:00:00.000Z",
    "updatedAt": "2026-09-01T09:00:00.000Z",
    "__v": 0
  }
]
```

### 🔍 Einzelnen Nutzer abrufen

```http
GET /users/68b12abc3456789012345678
```

Erfolgreiche Antwort (`200 OK`):

```json
{
  "_id": "68b12abc3456789012345678",
  "name": "Anna Becker",
  "email": "anna.becker@example.com",
  "age": 25,
  "isActive": true,
  "createdAt": "2026-09-01T09:00:00.000Z",
  "updatedAt": "2026-09-01T09:00:00.000Z",
  "__v": 0
}
```

Wenn kein Nutzer mit dieser ID existiert (`404 Not Found`):

```json
{
  "message": "User not found"
}
```

### ✏️ Nutzer aktualisieren

Mit `PATCH` muessen nur die Felder gesendet werden, die geaendert werden sollen.

```http
PATCH /users/68b12abc3456789012345678
Content-Type: application/json
```

Beispielanfrage:

```json
{
  "age": 26,
  "isActive": false
}
```

Erfolgreiche Antwort (`200 OK`):

```json
{
  "_id": "68b12abc3456789012345678",
  "name": "Anna Becker",
  "email": "anna.becker@example.com",
  "age": 26,
  "isActive": false,
  "createdAt": "2026-09-01T09:00:00.000Z",
  "updatedAt": "2026-09-01T09:10:00.000Z",
  "__v": 0
}
```

### 🗑️ Nutzer loeschen

```http
DELETE /users/68b12abc3456789012345678
```

Erfolgreiche Antwort (`200 OK`):

```json
{
  "message": "User deleted successfully",
  "user": {
    "_id": "68b12abc3456789012345678",
    "name": "Anna Becker",
    "email": "anna.becker@example.com",
    "age": 26,
    "isActive": false,
    "createdAt": "2026-09-01T09:00:00.000Z",
    "updatedAt": "2026-09-01T09:10:00.000Z",
    "__v": 0
  }
}
```

## ⚠️ Fehlerbehandlung

Unbekannte Endpunkte werden mit dem Status `404 Not Found` beantwortet. Beispiel
fuer `GET /unknown`:

```json
{
  "success": false,
  "message": "Route GET /unknown wurde nicht gefunden"
}
```

Fehler aus Controllern und Datenbankoperationen werden an einen zentralen
Error-Handler weitergegeben und als JSON beantwortet.

## 📁 Projektstruktur

```text
src/
|-- controllers/
|   `-- userController.js
|-- database/
|   `-- connectDB.js
|-- middlewares/
|   |-- errorHandler.js
|   `-- notFound.js
|-- models/
|   `-- User.js
|-- routes/
|   `-- userRoutes.js
`-- server.js
```

## 🤝 Teammitglieder

- Yana Khariebova
- Szymon Malinowski
- Vladislav Nedbailo
