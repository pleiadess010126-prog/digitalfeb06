// Simple Prisma connection test
import { PrismaClient } from '@prisma/client';

async function test() {
    console.log('Creating PrismaClient...');
    try {
        const prisma = new PrismaClient({
            log: ['error'],
        });
        console.log('PrismaClient created!');

        console.log('Testing connection...');
        const count = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('Connection successful!', count);

        await prisma.$disconnect();
        console.log('Disconnected.');
    } catch (error: any) {
        console.error('ERROR:', error.message);
        console.error('Full error:', error);
    }
}

test();
