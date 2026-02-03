
// =============================================================================
// HELPDESK & SUPPORT TICKET SERVICE (DB CONNECTED)
// =============================================================================

import { prisma } from '@/lib/db/prisma';
import type {
    SupportTicket,
    TicketMessage,
    CreateTicketRequest,
    UpdateTicketRequest,
    TicketFilters,
    TicketStats,
    TicketStatus,
    TicketPriority,
    TicketCategory
} from '@/types/support';

// Generate unique ticket number
async function generateTicketNumber(): Promise<string> {
    const count = await prisma.supportTicket.count();
    const year = new Date().getFullYear();
    // Start from 1000 + count
    return `TKT-${year}-${String(1000 + count + 1).padStart(4, '0')}`;
}

// =============================================================================
// TICKET SERVICE FUNCTIONS
// =============================================================================

/**
 * Get all tickets with optional filters
 */
export async function getTickets(filters?: TicketFilters): Promise<SupportTicket[]> {
    const where: any = {};

    if (filters) {
        if (filters.status) {
            where.status = Array.isArray(filters.status) ? { in: filters.status } : filters.status;
        }
        if (filters.priority) {
            where.priority = Array.isArray(filters.priority) ? { in: filters.priority } : filters.priority;
        }
        if (filters.category) {
            where.category = Array.isArray(filters.category) ? { in: filters.category } : filters.category;
        }
        if (filters.assignedToId) {
            where.assignedToId = filters.assignedToId;
        }
        if (filters.userId) {
            where.userId = filters.userId;
        }
        if (filters.search) {
            where.OR = [
                { subject: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
                { ticketNumber: { contains: filters.search, mode: 'insensitive' } }
            ];
        }
    }

    const tickets = await prisma.supportTicket.findMany({
        where,
        include: {
            user: {
                select: { name: true, email: true }
            },
            assignedTo: {
                select: { name: true }
            }
        },
        orderBy: [
            // Critical first, then by date
            { priority: 'asc' }, // This might need strict enum ordering, for now relying on DB
            { createdAt: 'desc' }
        ]
    });

    // Map DB result to frontend type if needed, or rely on compatibility
    // The Schema matches well, so manual mapping is minimal
    return tickets as unknown as SupportTicket[];
}

/**
 * Get a single ticket by ID
 */
export async function getTicketById(ticketId: string): Promise<SupportTicket | null> {
    const ticket = await prisma.supportTicket.findUnique({
        where: { id: ticketId },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    return ticket as unknown as SupportTicket | null;
}

/**
 * Get tickets for a specific user
 */
export async function getUserTickets(userId: string): Promise<SupportTicket[]> {
    return getTickets({ userId });
}

/**
 * Create a new support ticket
 */
export async function createTicket(
    userId: string,
    userName: string,
    userEmail: string,
    request: CreateTicketRequest
): Promise<SupportTicket> {
    const ticketNumber = await generateTicketNumber();

    const ticket = await prisma.supportTicket.create({
        data: {
            ticketNumber,
            userId,
            userName,
            userEmail,
            subject: request.subject,
            description: request.description,
            category: request.category,
            priority: request.priority || 'medium',
            status: 'open',
            source: request.source || 'user',
            nanduContext: request.nanduContext || undefined,
            messages: {
                create: {
                    senderId: userId,
                    senderType: request.source === 'nandu' ? 'nandu' : 'user',
                    senderName: userName,
                    message: request.description,
                    isInternal: false
                }
            }
        }
    });

    console.log(`🎫 Support ticket created: ${ticket.ticketNumber} - ${ticket.subject}`);
    return ticket as unknown as SupportTicket;
}

/**
 * Update a ticket (for support team)
 */
export async function updateTicket(
    ticketId: string,
    updates: UpdateTicketRequest,
    updatedBy?: string
): Promise<SupportTicket | null> {

    const data: any = { ...updates };

    if (updates.status === 'resolved') {
        data.resolvedAt = new Date();
        // data.resolvedById = updatedBy; // Schema might not have resolvedById, check schema
    }
    if (updates.status === 'closed') {
        data.closedAt = new Date();
    }
    if (updates.assignedToId) {
        // Fetch assignee name logic could go here, or just save ID
    }

    try {
        const ticket = await prisma.supportTicket.update({
            where: { id: ticketId },
            data
        });
        return ticket as unknown as SupportTicket;
    } catch (e) {
        console.error("Failed to update ticket", e);
        return null;
    }
}

/**
 * Add a message to a ticket
 */
export async function addTicketMessage(
    ticketId: string,
    senderId: string,
    senderName: string,
    senderType: 'user' | 'support' | 'system' | 'nandu',
    message: string,
    isInternal: boolean = false
): Promise<TicketMessage | null> {

    // Create the message
    const newMessage = await prisma.supportMessage.create({
        data: {
            ticketId,
            senderId,
            senderType,
            senderName,
            message,
            isInternal
        }
    });

    // Update ticket status logic
    let newStatus: TicketStatus | undefined;

    const currentTicket = await prisma.supportTicket.findUnique({
        where: { id: ticketId },
        select: { status: true, firstResponseAt: true }
    });

    if (currentTicket) {
        if (senderType === 'support') {
            if (currentTicket.status === 'waiting_on_support' || currentTicket.status === 'open') {
                newStatus = 'waiting_on_customer';
            }
            // Update first response time
            if (!currentTicket.firstResponseAt) {
                await prisma.supportTicket.update({
                    where: { id: ticketId },
                    data: { firstResponseAt: new Date() }
                });
            }
        } else if (senderType === 'user') {
            if (currentTicket.status === 'waiting_on_customer') {
                newStatus = 'waiting_on_support';
            }
        }
    }

    if (newStatus) {
        await prisma.supportTicket.update({
            where: { id: ticketId },
            data: { status: newStatus }
        });
    }

    return newMessage as unknown as TicketMessage;
}

/**
 * Get ticket messages
 */
export async function getTicketMessages(ticketId: string, includeInternal: boolean = false): Promise<TicketMessage[]> {
    const where: any = { ticketId };
    if (!includeInternal) {
        where.isInternal = false;
    }

    const messages = await prisma.supportMessage.findMany({
        where,
        orderBy: { createdAt: 'asc' }
    });

    return messages as unknown as TicketMessage[];
}

/**
 * Get ticket statistics for dashboard
 */
export async function getTicketStats(): Promise<TicketStats> {
    const [
        total,
        open,
        inProgress,
        waitingOnCustomer,
        waitingOnSupport,
        resolved,
        closed
    ] = await Promise.all([
        prisma.supportTicket.count(),
        prisma.supportTicket.count({ where: { status: 'open' } }),
        prisma.supportTicket.count({ where: { status: 'in_progress' } }),
        prisma.supportTicket.count({ where: { status: 'waiting_on_customer' } }),
        prisma.supportTicket.count({ where: { status: 'waiting_on_support' } }),
        prisma.supportTicket.count({ where: { status: 'resolved' } }),
        prisma.supportTicket.count({ where: { status: 'closed' } }),
    ]);

    // SLA stats calc (simplified)
    const slaBreaches = await prisma.supportTicket.count({ where: { slaBreached: true } });
    const slaBreachRate = total > 0 ? (slaBreaches / total) * 100 : 0;

    return {
        total,
        open,
        inProgress,
        waitingOnCustomer,
        waitingOnSupport,
        resolved,
        closed,
        avgResolutionTime: 0, // Complex calc, skipping for MVP
        slaBreachRate: Math.round(slaBreachRate * 10) / 10
    };
}

/**
 * Assign a ticket to a support team member
 */
export async function assignTicket(ticketId: string, assigneeId: string, assigneeName: string): Promise<SupportTicket | null> {
    try {
        const ticket = await prisma.supportTicket.update({
            where: { id: ticketId },
            data: {
                assignedToId: assigneeId,
                assignedToName: assigneeName,
                status: 'in_progress'
            }
        });

        // Add system message
        await addTicketMessage(
            ticketId,
            assigneeId, // Technically system, but needs a valid User ID... using assignee or system user
            'System',
            'system',
            `Ticket assigned to ${assigneeName}`,
            true
        );

        return ticket as unknown as SupportTicket;
    } catch (error) {
        console.error("Assign Error", error);
        return null;
    }
}

/**
 * Create ticket from Nandu escalation
 */
export async function createTicketFromNandu(
    userId: string,
    userName: string,
    userEmail: string,
    subject: string,
    description: string,
    conversationContext: any,
    category: TicketCategory = 'general'
): Promise<SupportTicket> {
    return createTicket(userId, userName, userEmail, {
        subject,
        description,
        category,
        priority: 'medium',
        source: 'nandu',
        nanduContext: conversationContext,
    });
}

/**
 * Get support team members (for assignment)
 */
export async function getSupportTeamMembers(): Promise<{ id: string; name: string; email: string; activeTickets: number }[]> {
    // Determine support users by role or organization
    // Assuming role 'admin' or specific 'support' role if exists
    // For now, grabbing all admins
    const supportUsers = await prisma.user.findMany({
        where: { role: { in: ['admin', 'owner', 'superadmin', 'editor'] } as any }, // Adjust roles as per Schema
        take: 10
    });

    return supportUsers.map(u => ({
        id: u.id,
        name: u.name || 'Support Agent',
        email: u.email,
        activeTickets: 0 // Would need complex query to calc real-time
    }));
}
