import React from 'react';
import './Sidebar.css';
import { IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenu, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { homeOutline, peopleOutline, helpCircleOutline, podiumOutline, chatbubbleOutline, mailOutline } from 'ionicons/icons';

const Sidebar: React.FC = () => {
  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Placement-Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button>
            <IonIcon icon={homeOutline} slot="start" />
            <IonLabel>Feed</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={peopleOutline} slot="start" />
            <IonLabel>Alumni</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Ask</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={podiumOutline} slot="start" />
            <IonLabel>Problems</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={chatbubbleOutline} slot="start" />
            <IonLabel>Communities</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={mailOutline} slot="start" />
            <IonLabel>Inbox</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;
