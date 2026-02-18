# companies-service
Este es un microservicio de EmployeeContracts para DBGERH_Talent






# Estructura de las carpetas
EMPLOYEECONTRACTS-MICROSERVICE
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GeteContractById.js
│   │       └── GeteContracts.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── EmployeeContract.js
│   │   │
│   │   └── repositories/
│   │       └── eContractRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── EmployeeContractEntity.js
│   │           │
│   │           └── repositories/
│   │               └── eContractRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── eContractController.js
│   │
│   │
│   └── router.js
│
├── README.md
