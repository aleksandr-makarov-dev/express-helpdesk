export interface TicketDetailsResponse {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: string;
}
