import React from 'react';
import './Sidebar.css';
import { IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenu, IonHeader, IonToolbar, IonTitle, IonAccordion, IonAccordionGroup } from '@ionic/react';
import { homeOutline, peopleOutline, helpCircleOutline, podiumOutline, chatbubbleOutline, mailOutline, bookOutline, buildOutline, paperPlaneOutline, paperPlane } from 'ionicons/icons';
// import ExploreContainer from './../../../../working_dir/Placement-Portal/frontend/src/components/ExploreContainer';


const Sidebar: React.FC = () => {
  return (
    <IonMenu contentId="main-content" type="overlay" className='sidebar-content'>
      
      <IonContent className='container' >
        <IonList>
          <IonItem lines='none' className="center-item" routerLink={`/`} button>
            <IonIcon icon={homeOutline}  />
            <IonLabel>Feed</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/alumniconnect`} button>
            <IonIcon icon={peopleOutline}  />
            <IonLabel>Alumni</IonLabel>
          </IonItem>

          <IonItem lines='none' className="center-item" routerLink={`/companies`} button>
            <IonIcon icon={buildOutline}  />
            <IonLabel>companies</IonLabel>
          </IonItem>
          <IonItem lines='none' className="center-item" routerLink={`/problems`} button>
            <IonIcon icon={podiumOutline} />
            <IonLabel>Problems</IonLabel>
          </IonItem>
        
          <IonItem lines='none' className="center-item" routerLink={`/inbox`} button>
            <IonIcon icon={mailOutline}  />
            <IonLabel>Inbox</IonLabel>
          </IonItem>
          <IonItem lines='none' className="center-item" routerLink={`/resources`} button>
            <IonIcon icon={bookOutline} />
            <IonLabel>Resources</IonLabel>
          </IonItem>
          <IonItem lines='none' className="center-item" routerLink={`/ats-score`} button>
            <IonIcon icon={paperPlaneOutline} />
            <IonLabel>ATS - Score</IonLabel>
          </IonItem>
      

      
      
      
            </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;