<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Complaint;
use App\Models\User;

class ComplaintAssigned extends Mailable
{
    use Queueable, SerializesModels;

    public $complaint;
    public $assignedAgent;

    /**
     * Create a new message instance.
     */
    public function __construct(Complaint $complaint, User $assignedAgent)
    {
        $this->complaint = $complaint;
        $this->assignedAgent = $assignedAgent;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Complaint Assigned to Agent - ' . $this->complaint->complaint_id,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.complaint-assigned',
            with: [
                'complaint' => $this->complaint,
                'userName' => $this->complaint->fullName,
                'complaintId' => $this->complaint->complaint_id,
                'title' => $this->complaint->title,
                'assignedAgentName' => $this->assignedAgent->name,
                'assignedAgentRole' => $this->assignedAgent->role,
                'assignedDate' => now()->format('F j, Y \a\t g:i A'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
