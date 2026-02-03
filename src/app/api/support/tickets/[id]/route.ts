// Single Ticket API - GET, PATCH
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/support/tickets/[id] - Get single ticket with messages
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const ticket = await prisma.supportTicket.findUnique({
            where: { id },
            include: {
                user: {
                    select: { name: true, email: true, avatar: true }
                },
                assignedTo: {
                    select: { name: true, email: true }
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        sender: {
                            select: { name: true, avatar: true }
                        }
                    }
                }
            }
        });

        if (!ticket) {
            return NextResponse.json(
                { error: 'Ticket not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ ticket });
    } catch (error: any) {
        console.error('Error fetching ticket:', error);
        return NextResponse.json(
            { error: 'Failed to fetch ticket', details: error.message },
            { status: 500 }
        );
    }
}

// PATCH /api/support/tickets/[id] - Update ticket
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const {
            status,
            priority,
            assignedToId,
            assignedToName,
            resolution,
            feedback,
            rating
        } = body;

        const data: any = {};

        if (status) {
            data.status = status;
            if (status === 'resolved') {
                data.resolvedAt = new Date();
            }
            if (status === 'closed') {
                data.closedAt = new Date();
            }
        }
        if (priority) data.priority = priority;
        if (assignedToId) {
            data.assignedToId = assignedToId;
            data.assignedToName = assignedToName;
            if (!data.status) data.status = 'in_progress';
        }
        if (resolution) data.resolution = resolution;
        if (feedback) data.feedback = feedback;
        if (rating) data.rating = rating;

        const ticket = await prisma.supportTicket.update({
            where: { id },
            data,
            include: {
                user: {
                    select: { name: true, email: true }
                },
                assignedTo: {
                    select: { name: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            ticket
        });
    } catch (error: any) {
        console.error('Error updating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to update ticket', details: error.message },
            { status: 500 }
        );
    }
}
