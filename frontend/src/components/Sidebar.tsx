import React from 'react';
import './Sidebar.css';
import { 
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonMenu 
} from '@ionic/react';
import { 
  homeOutline, 
  peopleOutline, 
  helpCircleOutline, 
  podiumOutline, 
  chatbubbleOutline, 
  mailOutline, 
  bookOutline, 
  hardwareChipOutline 
} from 'ionicons/icons';

const Sidebar: React.FC = () => {
  return (
    <IonMenu contentId="main-content" type="overlay" className='sidebar-content'>
      <IonContent className='container'>
        <IonList>
          <IonItem lines='none' className="center-item" routerLink={`/`} button>
            <IonIcon icon={homeOutline} />
            <IonLabel>Feed</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/alumniconnect`} button>
            <IonIcon icon={peopleOutline} />
            <IonLabel>Alumni</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/ask`} button>
            <IonIcon icon={helpCircleOutline} />
            <IonLabel>Ask</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/problems`} button>
            <IonIcon icon={podiumOutline} />
            <IonLabel>Problems</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/communities`} button>
            <IonIcon icon={chatbubbleOutline} />
            <IonLabel>Communities</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/inbox`} button>
            <IonIcon icon={mailOutline} />
            <IonLabel>Inbox</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/resources`} button>
            <IonIcon icon={bookOutline} />
            <IonLabel>Resources</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/aiinterview`} button>
            <IonIcon icon={hardwareChipOutline} />
            <IonLabel>AI Interview</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;
