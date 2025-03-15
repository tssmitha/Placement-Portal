import React from 'react';
import { IonButtons, IonIcon, IonTitle } from '@ionic/react';
import { menuOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import './AdminTaskbar.css';

const AdminTaskbar: React.FC = () => {
  return (
    <div className="admin-taskbar">
      <IonButtons slot="start">
        <IonIcon icon={menuOutline} size="large" />
      </IonButtons>
      <IonTitle>Admin Dashboard</IonTitle>
      <IonButtons slot="end">
        <IonIcon icon={personCircleOutline} size="large" />
        <IonIcon icon={logOutOutline} size="large" />
      </IonButtons>
    </div>
  );
};

export default AdminTaskbar;
