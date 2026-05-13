export interface Payment {
    id: number;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    amount: number;
    customerName: string;
    status: string;
    riskScore?: number;
    rejectionReason?: string;
    createdAt?: string;
    updatedAt?: string;
  }