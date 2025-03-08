import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Populando o banco de dados...');

  // Criar senha hash para os usuários
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedUserPassword = await bcrypt.hash('user123', 10);

  // Criar usuário admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedAdminPassword,
      name: 'Admin Master',
      role: 'admin',
    },
  });

  // Criar planos (Basic e Premium)
  const basicPlan = await prisma.plan.upsert({
    where: { name: 'Basic' },
    update: {},
    create: {
      name: 'Basic',
      description: 'Plano básico de assinatura',
      price: 9.99,
    },
  });

  const premiumPlan = await prisma.plan.upsert({
    where: { name: 'Premium' },
    update: {},
    create: {
      name: 'Premium',
      description: 'Plano premium com benefícios extras',
      price: 19.99,
    },
  });

  // Criar usuários comuns com planos
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: hashedUserPassword,
      name: 'User One',
      role: 'user',
      subscriptions: {
        create: {
          planId: basicPlan.id,
          status: 'ACTIVE',
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: hashedUserPassword,
      name: 'User Two',
      role: 'user',
      subscriptions: {
        create: {
          planId: premiumPlan.id,
          status: 'ACTIVE',
        },
      },
    },
  });

  console.log(' Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
