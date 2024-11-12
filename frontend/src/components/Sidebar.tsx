import React from 'react';
import './Sidebar.css';
import { IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenu, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { homeOutline, peopleOutline, helpCircleOutline, podiumOutline, chatbubbleOutline, mailOutline, bookOutline } from 'ionicons/icons';


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
          <IonItem routerLink={`/`} button>
            <IonIcon icon={homeOutline} slot="start" />
            <IonLabel>Feed</IonLabel>
          </IonItem>
          <IonItem routerLink={`/alumniconnect`} button>
            <IonIcon icon={peopleOutline} slot="start" />
            <IonLabel>Alumni</IonLabel>
          </IonItem>
          <IonItem routerLink={`/ask`} button>
            <IonIcon icon={helpCircleOutline} slot="start" />
            <IonLabel>Ask</IonLabel>
          </IonItem>
          <IonItem routerLink={`/problems`} button>
            <IonIcon icon={podiumOutline} slot="start" />
            <IonLabel>Problems</IonLabel>
          </IonItem>
          <IonItem routerLink={`/communities`} button>
            <IonIcon icon={chatbubbleOutline} slot="start" />
            <IonLabel>Communities</IonLabel>
          </IonItem>
          <IonItem  routerLink={`/inbox`} button>
            <IonIcon icon={mailOutline} slot="start" />
            <IonLabel>Inbox</IonLabel>
          </IonItem>
          <IonItem  routerLink={`/resources`} button>
            <IonIcon icon={bookOutline} slot="start" />
            <IonLabel>Resources</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;
