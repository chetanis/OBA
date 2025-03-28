// seed.js
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Données de l'utilisateur admin
  const username = 'employe';
  const password = '12345678';
  const role = 'employe';

  // Hacher le mot de passe
  const hashedPassword = await hash(password, 10);

  // Créer l'utilisateur admin
  const adminUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });

  console.log('Admin user created:', adminUser);

  // Vérifier si le client avec ID 1 existe
  const client = await prisma.client.findUnique({
    where: { id: 1 },
  });

  if (!client) {
    console.error("Client avec l'ID 1 non trouvé.");
    return;
  }

  // Ajouter deux employés pour le client ID 1
  const employes = await prisma.employe.createMany({
    data: [
      {
        nom: 'Employe 1',
        fonction: 'Développeur',
        clientId: 1,
      },
      {
        nom: 'Employe 2',
        fonction: 'Designer',
        clientId: 1,
      },
    ],
  });

  console.log('Deux employés ajoutés pour le client ID 1:', employes);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
