# companies-service
Este es un microservicio de TypeDocuments para DBGERH_Talent



# Estructura de las carpetas
TypeDocuments
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetTypeDocumentsById.js
│   │       └── GetTypeDocumentss.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── TypeDocuments.js
│   │   │
│   │   └── repositories/
│   │       └── TypeDocumentsRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── TypeDocumentsEntity.js
│   │           │
│   │           └── repositories/
│   │               └── TypeDocumentsRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── TypeDocumentsController.js
│   │
│   │
│   └── router.js
│
├── README.md
