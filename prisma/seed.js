// seed.js
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs'; // Utilisation de bcryptjs

const prisma = new PrismaClient();

async function main() {
  // Données de l'utilisateur admin
  const username = 'admin';
  const password = '12345678'; // Mot de passe en clair
  const role = 'admin';

  // Hacher le mot de passe avec bcryptjs
  const hashedPassword = await hash(password, 10); // 10 est le coût du hachage

  // Créer l'utilisateur admin
  const adminUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword, // Mot de passe haché
      role,
    },
  });

  console.log('Admin user created:', adminUser);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });