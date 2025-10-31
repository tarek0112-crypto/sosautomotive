

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import Settings from './components/Settings';
import Jobs from './components/Jobs';
import Invoices from './components/Invoices';
import Expenses from './components/Expenses';
import Reports from './components/Reports';
import CustomerDetail from './components/CustomerDetail';
import InvoiceDetail from './components/InvoiceDetail';
import ViewJobModal from './components/ViewJobModal';
import type { Job } from './types';
import { useAppContext } from './store/AppContext';
import ToastContainer from './components/ToastContainer';
import Login from './components/Login';


type NavigationState = {
    initialFilter?: string;
    initialTab?: string;
    initialSubTab?: string;
}

const App: React.FC = () => {
  const { state, t, fetchInitialData } = useAppContext();
  const { customers, jobs, invoices, isInitialized, isAuthenticated } = state;
  
  useEffect(() => {
    if (!isInitialized) {
        fetchInitialData();
    }
  }, [isInitialized, fetchInitialData]);

  // UI State remains in App.tsx
  const [activePage, setActivePage] = useState('Dashboard');
  const [viewingCustomerId, setViewingCustomerId] = useState<string | null>(null);
  const [viewingInvoiceId, setViewingInvoiceId] = useState<string | null>(null);
  const [jobToView, setJobToView] = useState<Job | null>(null);
  const [isViewJobModalOpen, setIsViewJobModalOpen] = useState(false);
  const [navigationState, setNavigationState] = useState<NavigationState | null>(null);

  // Navigation handlers
  const handleViewCustomer = (customerId: string) => {
    setViewingInvoiceId(null);
    setViewingCustomerId(customerId);
    setActivePage('Customers');
  };
  
  const handleBackToCustomers = () => {
    setViewingCustomerId(null);
  };

  const handleViewInvoice = (invoiceId: string) => {
    setViewingCustomerId(null);
    setViewingInvoiceId(invoiceId);
    setActivePage('Invoices');
  };
  
  const handleBackToInvoices = () => {
    setViewingInvoiceId(null);
  };

  const handleViewJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setJobToView(job);
      setIsViewJobModalOpen(true);
    }
  };
  
  const handleSetActivePage = (page: string) => {
    setViewingCustomerId(null);
    setViewingInvoiceId(null);
    setNavigationState(null);
    setActivePage(page);
  }

  const handleNavigate = (page: string, state?: NavigationState) => {
    setNavigationState(state || null);
    setActivePage(page);
  };

  if (!isInitialized) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            <div className="flex items-center space-x-3">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium text-gray-700">Loading Application...</span>
            </div>
        </div>
    );
  }

  if (!isAuthenticated) {
      return (
          <>
            <ToastContainer />
            <Login />
          </>
      );
  }

  const renderContent = () => {
    if (activePage === 'Customers' && viewingCustomerId) {
        const customer = customers.find(c => c.id === viewingCustomerId);
        if (customer) {
            return <CustomerDetail 
                customer={customer}
                onBack={handleBackToCustomers}
            />
        }
    }
    
    if (activePage === 'Invoices' && viewingInvoiceId) {
        const invoice = invoices.find(i => i.id === viewingInvoiceId);
        const customer = customers.find(c => c.id === invoice?.customerId);
        if (invoice && customer) {
            return <InvoiceDetail 
                invoice={invoice}
                customer={customer}
                onBack={handleBackToInvoices}
            />
        }
    }

    switch(activePage) {
      case 'Dashboard':
        return <Dashboard onNavigate={handleNavigate} onViewJob={handleViewJob} />;
      case 'Customers':
        return <Customers onViewCustomer={handleViewCustomer} />;
      case 'Jobs':
        return <Jobs 
            onViewJob={handleViewJob}
            initialFilter={navigationState?.initialFilter}
        />;
      case 'Inventory':
        return <Inventory />;
      case 'Invoices':
        return <Invoices onViewInvoice={handleViewInvoice} />;
      case 'Expenses':
        return <Expenses />;
      case 'Reports':
        return <Reports 
            initialTab={navigationState?.initialTab}
            initialSubTab={navigationState?.initialSubTab}
        />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} onViewJob={handleViewJob} />;
    }
  };

  const getHeaderTitle = () => {
      if (activePage === 'Customers' && viewingCustomerId) return 'customers.customerDetail';
      if (activePage === 'Invoices' && viewingInvoiceId) return 'invoices.invoiceDetail';
      return activePage.toLowerCase();
  }

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen bg-gray-100 font-sans no-print">
        <Sidebar activePage={activePage} setActivePage={handleSetActivePage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={t(getHeaderTitle())} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
       <ViewJobModal
          isOpen={isViewJobModalOpen}
          onClose={() => setIsViewJobModalOpen(false)}
          job={jobToView}
          customers={customers}
      />
    </>
  );
};

export default App;