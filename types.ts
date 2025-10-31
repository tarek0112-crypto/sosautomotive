import type React from 'react';

// FIX: Removed circular import from './types' that caused declaration conflicts.
export type Language = 'English' | 'Français';
export type Currency = 'USD' | 'EUR' | 'MAD';

export interface CompanyProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  ice: string;
  rc: string;
  idf: string;
  logoUrl: string;
}

export interface AppSettings {
  language: Language;
  currency: Currency;
  companyProfile: CompanyProfile;
  revenueTarget?: number;
  newCustomersTarget?: number;
  revenueGaugeColor?: string;
  customersGaugeColor?: string;
}

export interface StatCardData {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBgColor: string;
  isCurrency?: boolean;
  onClick?: () => void;
}

export interface RevenueData {
  name: string;
  revenue: number;
}

export type JobStatus = 'Scheduled' | 'In Progress' | 'Awaiting Parts' | 'Ready for Pickup' | 'Completed' | 'Paid' | 'Delivered' | 'Pending';

export interface JobLineItem {
    id: string;
    type: 'Part' | 'Labor';
    description: string;
    quantity: number;
    unitPrice: number;
    inventoryItemId?: string; // Link to InventoryItem
}

// Comprehensive Job type, now a full Work Order
export interface Job {
    id: string;
    customerId: string; // Link to Customer
    vehiclePlateNumber: string; // Link to specific vehicle
    technician: string;
    status: JobStatus;
    date: string; // The date and time the job was created or scheduled for (ISO 8601 format)
    lineItems: JobLineItem[];
    subtotal: number;
    tax: number;
    totalAmount: number;
    description: string; // The original customer complaint/request
}


export interface StockAlert {
  name: string;
  stock: number;
  min: number;
  category: string;
}

export interface InventoryItem {
    id: string;
    type: 'Part' | 'Service';
    name: string;
    description?: string;
    sku?: string;
    category: string;
    stock?: number;
    minStock?: number;
    costPrice: number;
    sellingPrice: number;
    supplier?: string;
    dateAdded?: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Supplier {
    id: string;
    name: string;
    contact: string;
    phone: string;
    email: string;
    address?: string;
}

export interface Vehicle {
    make: string;
    model: string;
    year: number;
    vin: string;
    plateNumber: string;
    color?: string;
    engineType?: string;
}

export interface Customer {
    id: string;
    name: string;
    type: 'Individual' | 'Professional';
    iceNumber?: string;
    phone: string;
    email: string;
    address?: string;
    vehicles: Vehicle[];
    dateAdded: string;
    internalNotes?: string;
}

export interface InvoiceLineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface Invoice {
    id: string;
    customerId: string; // Link to Customer
    customerName: string;
    date: string;
    dueDate: string;
    lineItems: InvoiceLineItem[];
    subtotal: number;
    tax: number;
    totalAmount: number;
    status: 'Paid' | 'Due' | 'Overdue';
    jobId?: string; // Link back to the original job
}

export type ExpenseCategory = 'Rent' | 'Utilities' | 'Salaries' | 'Parts Purchase' | 'Marketing' | 'Other';
export type PaymentMethod = 'Credit Card' | 'Bank Transfer' | 'Cash';
export type RecurringPeriod = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface Expense {
    id: string;
    date: string;
    category: ExpenseCategory;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    isRecurring?: boolean;
    recurringPeriod?: RecurringPeriod;
    receiptUrl?: string;
}

export interface Technician {
    id: string;
    name: string;
    func?: string;
    phone?: string;
    jobType?: 'Full Time' | 'Internship';
    dateAdded?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Technician';
}

export interface Notification {
    id: string;
    type: 'success' | 'error';
    message: string;
}

// FIX: Define AppState here to centralize types and resolve import errors.
export interface AppState {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: User | null;
    customers: Customer[];
    inventory: InventoryItem[];
    jobs: Job[];
    invoices: Invoice[];
    expenses: Expense[];
    categories: Category[];
    suppliers: Supplier[];
    technicians: Technician[];
    settings: AppSettings;
    notifications: Notification[];
}

// --- ACTIONS ---

export type Action =
    | { type: 'INITIALIZE_STATE'; payload: Omit<AppState, 'isInitialized' | 'notifications' | 'isAuthenticated' | 'user'> }
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'UPSERT_CUSTOMER'; payload: Customer }
    | { type: 'REMOVE_CUSTOMER'; payload: string }
    | { type: 'UPSERT_INVENTORY_ITEM'; payload: InventoryItem }
    | { type: 'REMOVE_INVENTORY_ITEM'; payload: string }
    | { type: 'UPSERT_JOB'; payload: Job }
    | { type: 'REMOVE_JOB'; payload: string }
    | { type: 'UPSERT_INVOICE'; payload: Invoice }
    | { type: 'REMOVE_INVOICE'; payload: string }
    | { type: 'UPSERT_EXPENSE'; payload: Expense }
    | { type: 'REMOVE_EXPENSE'; payload: string }
    | { type: 'UPSERT_CATEGORY'; payload: Category }
    | { type: 'REMOVE_CATEGORY'; payload: string }
    | { type: 'UPSERT_SUPPLIER'; payload: Supplier }
    | { type: 'REMOVE_SUPPLIER'; payload: string }
    | { type: 'UPSERT_TECHNICIAN'; payload: Technician }
    | { type: 'REMOVE_TECHNICIAN'; payload: string }
    | { type: 'UPDATE_SETTINGS'; payload: AppSettings }
    | { type: 'REFRESH_INVENTORY'; payload: InventoryItem[] }
    | { type: 'ADD_NOTIFICATION'; payload: Notification }
    | { type: 'REMOVE_NOTIFICATION'; payload: string };