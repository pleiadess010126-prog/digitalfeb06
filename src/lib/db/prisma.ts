import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Debug logging
function logDebug(msg: string) {
    if (typeof window === 'undefined') {
        console.error('[Prisma]', msg);
    }
}

logDebug('--- NEW INIT SEQUENCE (FINAL ADAPTER) ---');
logDebug('Initializing Prisma Client...');
logDebug('DB URL Found: ' + !!process.env.DATABASE_URL);

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set.');
}

try {
    // Basic setup for Neon Serverless
    if (typeof window === 'undefined') {
        neonConfig.webSocketConstructor = ws;
    }

    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);

    logDebug('Using Neon Serverless adapter');

    prisma = global.prisma || new PrismaClient({
        adapter,
        datasources: {
            db: { url: connectionString }
        },
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

    logDebug('Client created successfully with adapter and explicit URL');
} catch (error) {
    logDebug('FATAL: ' + error);
    // Fallback to standard client if adapter fails (though it likely won't help if the error is engine-related)
    logDebug('Attempting fallback to standard PrismaClient...');
    try {
        prisma = global.prisma || new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        });
    } catch (fallbackError) {
        logDebug('Standard fallback also failed: ' + fallbackError);
        throw error;
    }
}

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

// Simple test to verify connection
if (process.env.NODE_ENV === 'development') {
    prisma.$connect()
        .then(() => logDebug('$connect() SUCCESS'))
        .catch((err) => logDebug('$connect() FAILED: ' + err));
}

export { prisma };
export default prisma;
