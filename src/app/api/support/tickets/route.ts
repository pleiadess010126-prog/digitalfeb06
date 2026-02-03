// Support Tickets API - GET (list) and POST (create)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// Generate unique ticket number
async function generateTicketNumber(): Promise<string> {
    const count = await prisma.supportTicket.count();
    const year = new Date().getFullYear();
    return `TKT-${year}-${String(1000 + count + 1).padStart(4, '0')}`;
}

// GET /api/support/tickets - List tickets
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: any = {};

        if (userId) {
            where.userId = userId;
        }
        if (status) {
            where.status = status;
        }
        if (priority) {
            where.priority = priority;
        }

        const tickets = await prisma.supportTicket.findMany({
            where,
            take: limit,
            orderBy: [
                { priority: 'asc' },
                { createdAt: 'desc' }
            ],
            include: {
                user: {
                    select: { name: true, email: true }
                },
                assignedTo: {
                    select: { name: true }
                },
                _count: {
                    select: { messages: true }
                }
            }
        });

        return NextResponse.json({
            tickets,
            total: tickets.length
        });
    } catch (error: any) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tickets', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/support/tickets - Create new ticket
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            userId,
            userEmail,
            userName,
            subject,
            description,
            category = 'general',
            priority = 'medium',
            source = 'user',
            nanduContext
        } = body;

        if (!userId || !userEmail || !subject || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: userId, userEmail, subject, description' },
                { status: 400 }
            );
        }

        const ticketNumber = await generateTicketNumber();

        const ticket = await prisma.supportTicket.create({
            data: {
                ticketNumber,
                userId,
                userEmail,
                userName: userName || 'User',
                subject,
                description,
                category,
                priority,
                status: 'open',
                source,
                nanduContext: nanduContext || undefined,
                messages: {
                    create: {
                        senderId: userId,
                        senderType: source === 'nandu' ? 'nandu' : 'user',
                        senderName: userName || 'User',
                        message: description,
                        isInternal: false
                    }
                }
            },
            include: {
                messages: true
            }
        });

        console.log(`🎫 Ticket created: ${ticket.ticketNumber} - ${ticket.subject}`);

        return NextResponse.json({
            success: true,
            ticket
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to create ticket', details: error.message },
            { status: 500 }
        );
    }
}
