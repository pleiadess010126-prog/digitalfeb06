// Ticket Messages API - GET and POST
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/support/tickets/[id]/messages - Get messages for a ticket
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id: ticketId } = await params;
        const { searchParams } = new URL(request.url);
        const includeInternal = searchParams.get('includeInternal') === 'true';

        const where: any = { ticketId };
        if (!includeInternal) {
            where.isInternal = false;
        }

        const messages = await prisma.supportMessage.findMany({
            where,
            orderBy: { createdAt: 'asc' },
            include: {
                sender: {
                    select: { name: true, avatar: true }
                }
            }
        });

        return NextResponse.json({ messages });
    } catch (error: any) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/support/tickets/[id]/messages - Add message to ticket
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const { id: ticketId } = await params;
        const body = await request.json();

        const {
            senderId,
            senderName,
            senderType = 'user',
            message,
            isInternal = false
        } = body;

        if (!senderId || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: senderId, message' },
                { status: 400 }
            );
        }

        // Create the message
        const newMessage = await prisma.supportMessage.create({
            data: {
                ticketId,
                senderId,
                senderType,
                senderName: senderName || 'User',
                message,
                isInternal
            },
            include: {
                sender: {
                    select: { name: true, avatar: true }
                }
            }
        });

        // Update ticket status based on sender
        const ticket = await prisma.supportTicket.findUnique({
            where: { id: ticketId },
            select: { status: true, firstResponseAt: true }
        });

        if (ticket) {
            const updates: any = {};

            if (senderType === 'support') {
                if (ticket.status === 'waiting_on_support' || ticket.status === 'open') {
                    updates.status = 'waiting_on_customer';
                }
                if (!ticket.firstResponseAt) {
                    updates.firstResponseAt = new Date();
                }
            } else if (senderType === 'user') {
                if (ticket.status === 'waiting_on_customer') {
                    updates.status = 'waiting_on_support';
                }
            }

            if (Object.keys(updates).length > 0) {
                await prisma.supportTicket.update({
                    where: { id: ticketId },
                    data: updates
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: newMessage
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error adding message:', error);
        return NextResponse.json(
            { error: 'Failed to add message', details: error.message },
            { status: 500 }
        );
    }
}
