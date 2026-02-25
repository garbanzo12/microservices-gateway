import { CecoNameRepositoryImpl } from './src/microservices/CecoName/src/infrastructure/database/typeorm/repositories/CecoNameRepositoryImpl.js';

const repo = new CecoNameRepositoryImpl();

async function test() {
  try {
    const nuevo = await repo.Create({
      Cecocode: "CC-TEST-999",
      Name: "Centro de Prueba desde cero",
      State: true,
      CreatedBy: 3
    });

    console.log('🎉 ÉXITO - Registro creado:', nuevo);
  } catch (err) {
    console.error('❌ Falló el test:', err.message);
  }
}

test();