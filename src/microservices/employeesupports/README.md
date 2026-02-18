# EmployeeSupports-service
Este es un microservicio de EmployeeSupports para DBGERH_Talent



# Estructura de las carpetas
EMPLOYEESUPPORTS-MICROSERVICE
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetEmployeeSupports.js
│   │       └── GetEmployeeSupportsById.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── EmployeeSupport.js
│   │   │
│   │   └── repositories/
│   │       └── EmployeeSupportRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── EmployeeSupportsEntity.js
│   │           │
│   │           └── repositories/
│   │               └── EmployeeSupportRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── EmployeeSupportsController.js
│   │
│   │
│   └── router.js
│
├── README.md

