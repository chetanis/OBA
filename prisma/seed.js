/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('../src/app/lib/actions/client');

const prisma = new PrismaClient();

async function main() {

    const clientData = {
        nom: 'Dar Etahadi',
        nrc: '16/00 4862311',
        nif: '196616010024249',
        ai: '16128033303',
        adresse: 'Cooperative AMA VILLA N° 01 Bir Khadem Alger',
        plaquePrix: 100,
        filmPrix: 50,
        telephone: [
            { number: '1234567890' },
        ],
        employes: [
            { nom: 'moh l3sas', telephone: [{ number: '0987654321' }] },
        ],
    };

    createClient(clientData);
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });