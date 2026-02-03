
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });



async function main() {
    console.log('🚀 Checking DB Connection...');
    console.log('CWD:', process.cwd());
    console.log('DATABASE_URL Value:', process.env.DATABASE_URL ? (process.env.DATABASE_URL.substring(0, 10) + '...') : 'UNDEFINED');

    // Dynamic import to ensure env is loaded first
    const { prisma } = await import('../src/lib/db/prisma');

    try {
        const user = await prisma.user.findFirst();
        console.log('✅ Connection Success!');
        console.log('👤 Found User ID:', user?.id || 'No users yet');

        // Creating a test ticket to verify full cycle
        if (user) {
            console.log('Creating test ticket...');
            const ticket = await prisma.supportTicket.create({
                data: {
                    ticketNumber: 'TEST-' + Date.now(),
                    userId: user.id,
                    userEmail: user.email,
                    subject: 'Connectivity Test',
                    description: 'Testing DB connection from verified script',
                    status: 'closed', // Open and close immediately
                }
            });
            console.log('✅ Ticket Created:', ticket.id);
        }

    } catch (e: any) {
        console.error('❌ DB Error:', e);
        console.error('Message:', e.message);
    }
}

main();
