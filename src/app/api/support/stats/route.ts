// Support Stats API - Dashboard statistics
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET /api/support/stats - Get ticket statistics
export async function GET(request: NextRequest) {
    try {
        const [
            total,
            open,
            inProgress,
            waitingOnCustomer,
            waitingOnSupport,
            resolved,
            closed,
            slaBreaches
        ] = await Promise.all([
            prisma.supportTicket.count(),
            prisma.supportTicket.count({ where: { status: 'open' } }),
            prisma.supportTicket.count({ where: { status: 'in_progress' } }),
            prisma.supportTicket.count({ where: { status: 'waiting_on_customer' } }),
            prisma.supportTicket.count({ where: { status: 'waiting_on_support' } }),
            prisma.supportTicket.count({ where: { status: 'resolved' } }),
            prisma.supportTicket.count({ where: { status: 'closed' } }),
            prisma.supportTicket.count({ where: { slaBreached: true } }),
        ]);

        // Recent tickets (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentTickets = await prisma.supportTicket.count({
            where: {
                createdAt: { gte: sevenDaysAgo }
            }
        });

        // Priority breakdown
        const [critical, high, medium, low] = await Promise.all([
            prisma.supportTicket.count({ where: { priority: 'critical', status: { not: 'closed' } } }),
            prisma.supportTicket.count({ where: { priority: 'high', status: { not: 'closed' } } }),
            prisma.supportTicket.count({ where: { priority: 'medium', status: { not: 'closed' } } }),
            prisma.supportTicket.count({ where: { priority: 'low', status: { not: 'closed' } } }),
        ]);

        const slaBreachRate = total > 0 ? Math.round((slaBreaches / total) * 100 * 10) / 10 : 0;

        const stats = {
            total,
            open,
            inProgress,
            waitingOnCustomer,
            waitingOnSupport,
            resolved,
            closed,
            recentTickets,
            slaBreaches,
            slaBreachRate,
            priorityBreakdown: {
                critical,
                high,
                medium,
                low
            },
            avgResolutionTime: 0 // TODO: Calculate from resolved tickets
        };

        return NextResponse.json(stats);
    } catch (error: any) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats', details: error.message },
            { status: 500 }
        );
    }
}
