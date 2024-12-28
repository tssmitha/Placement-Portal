import React,  { ReactNode } from 'react';
import { useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle } from '@ionic/react';
import { menuOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import AdminSidebar from './AdminSidebar'; // Import the existing sidebar
import './AdminTaskbar.css'; // Custom CSS for layout and styling

interface AdminTaskbarProps {
    children: ReactNode; // This allows passing any content as children
  }

  const AdminTaskbar: React.FC<AdminTaskbarProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle Sidebar Toggle
  const handleSidebarToggle = async () => {
    if (isSidebarOpen) {
      await menuController.close('admin-menu');
    } else {
      await menuController.open('admin-menu');
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-taskbar-layout">
      {/* Sidebar Component */}
      {/* <AdminSidebar /> */}

      {/* Taskbar (Top Bar) */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon icon={menuOutline} size="large" onClick={handleSidebarToggle} />
          </IonButtons>
          <IonTitle>Admin Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={personCircleOutline} size="large" style={{ cursor: 'pointer', marginRight: '10px' }} />
            <IonIcon icon={logOutOutline} size="large" style={{ cursor: 'pointer' }} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Main Content Area */}
      <div id="main-content">
        {children}
      </div>
    </div>
  );
};

export default AdminTaskbar;
