export enum NotificationType {
    FUNDING_ALERT = 'FUNDING_ALERT',
    NEW_MATCH = 'NEW_MATCH',
    OUTREACH_REPLY = 'OUTREACH_REPLY',
    SYSTEM = 'SYSTEM'
}

export interface AppNotification {
    userId: string;
    type: NotificationType;
    title: string;
    body: string;
    read: boolean;
    createdAt: Date;
}

export class NotificationDispatcher {
    dispatch(notification: AppNotification): void {
        console.log(`[Notification Dispatcher] Sending in-app notification to ${notification.userId}: ${notification.title}`);
        // Real-time delivery logic (e.g., via WebSocket) would be implemented here
    }
}

export interface EmailPayload {
    to: string;
    subject: string;
    htmlBody: string;
}

export const EmailPayloadBuilder = {
    buildFundingAlert: (recipientEmail: string, companyName: string, amount: number): EmailPayload => ({
        to: recipientEmail,
        subject: `${companyName} just raised new funding!`,
        htmlBody: `<h1>Funding Alert</h1><p>${companyName} has raised $${amount.toLocaleString()}. Check out their profile!</p>`
    }),

    buildNewMatch: (recipientEmail: string, matchName: string): EmailPayload => ({
        to: recipientEmail,
        subject: `New Connection Match: ${matchName}`,
        htmlBody: `<h1>New Match!</h1><p>You have a strong match with ${matchName}. Log in to view details.</p>`
    }),

    buildOutreachReply: (recipientEmail: string, senderName: string, snippet: string): EmailPayload => ({
        to: recipientEmail,
        subject: `New reply from ${senderName}`,
        htmlBody: `<h1>Outreach Reply</h1><p>${senderName} replied:</p><blockquote>${snippet}</blockquote>`
    })
};
