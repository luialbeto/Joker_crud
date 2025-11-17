// src/types/index.d.ts
export interface Letter {
  id: string;
  recipientName: string;
  address: string;
  trackingNumber: string;
  sentDate: string;
  status: 'created' | 'in_transit' | 'delivered' | 'returned';
  notes?: string;
}