export interface Letter {
  id: string;
  recipientName: string;
  address: string;
  trackingNumber: string; // Unique
  sentDate: string; // ISO date
  status: 'created' | 'in_transit' | 'delivered' | 'returned';
  notes?: string;
}