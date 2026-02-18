# companies-service
Este es un microservicio de Oficces para DBGERH_Talent


# Estructura de las carpetas
Oficces
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetOfficesById.js
│   │       └── GetOffices.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Oficces.js
│   │   │
│   │   └── repositories/
│   │       └── OficcesRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── OficcesEntity.js
│   │           │
│   │           └── repositories/
│   │               └── OficcesRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── OficcesController.js
│   │
│   │
│   └── router.js
│
├── README.md

