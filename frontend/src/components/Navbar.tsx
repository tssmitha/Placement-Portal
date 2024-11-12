import React from 'react';
import './Navbar.css';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { notificationsOutline, sunnyOutline, moonOutline } from 'ionicons/icons';


interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <IonHeader>
      <IonToolbar color={isDarkMode ? "dark" : "light"}>
        <IonTitle>Placement-Portal</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={toggleDarkMode}>
            <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} />
          </IonButton>
          <IonButton>
            <IonIcon icon={notificationsOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
