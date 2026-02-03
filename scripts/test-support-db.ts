// Test Support API connection
import { prisma } from '../src/lib/db/prisma';

async function testSupportTicket() {
    console.log('Testing Support Ticket Database...\n');

    try {
        // Test count
        console.log('1. Counting support tickets...');
        const count = await prisma.supportTicket.count();
        console.log(`   ✅ Found ${count} tickets`);

        // Test query
        console.log('2. Testing ticket query...');
        const tickets = await prisma.supportTicket.findMany({ take: 5 });
        console.log(`   ✅ Query successful, returned ${tickets.length} tickets`);

        console.log('\n✅ Support Ticket API should work now!');
    } catch (error: any) {
        console.error('\n❌ Error:', error.message);
        if (error.code) console.error('   Code:', error.code);
        if (error.meta) console.error('   Meta:', error.meta);
    } finally {
        await prisma.$disconnect();
    }
}

testSupportTicket();
