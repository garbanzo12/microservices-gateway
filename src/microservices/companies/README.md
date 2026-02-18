# companies-service
Este es un microservicio de companies para DBGERH_Talent


# Estructura de las carpetas
COMPANIES
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetCompanies.js
│   │       └── GetCompanyById.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Company.js
│   │   │
│   │   └── repositories/
│   │       └── CompanyRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── CompanyEntity.js
│   │           │
│   │           └── repositories/
│   │              └── CompanyRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── CompanyController.js
│   │
│   │
│   └── router.js
│
├── README.md
