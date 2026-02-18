# LookUpdDetails-service
Este es un microservicio de LookUpdDetails para DBGERH_Talent





# Estructura de las carpetas
LookUpdDetails
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetLookupDetails.js
│   │       └── GetLookupDetailsById.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── LookupDetail.js
│   │   │
│   │   └── repositories/
│   │       └── LookupDetailsRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── LookupDetailsEntity.js
│   │           │
│   │           └── repositories/
│   │               └── LookupDetailRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── LookupDetailsController.js
│   │
│   │
│   └── router.js
│
├── README.md
