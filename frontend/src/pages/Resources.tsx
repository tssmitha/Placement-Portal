//import './Resources.css';
import {
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from '@ionic/react';
  import React from 'react';
  
  const Resources: React.FC = () => {
    const topics = [
      { name: 'Operating Systems', link: 'https://drive.google.com/file/d/15RCMDeMmaEjdhYScsNQ_o8glCPMwUTTv/view?usp=drive_link' },
      { name: 'Software Engineering', link: 'https://in.docworkspace.com/d/sIPO937zLAc6P4rsG' },
      { name: 'Computer Networks', link: 'https://drive.google.com/file/d/1vI3OphFEEHMrwvJmaCkqR-ejCo00TNwu/view?usp=drive_link' },
      { name: 'OOP Concepts', link: 'https://drive.google.com/file/d/1YEcvwtr4mzNGLG58Eit8nIX39pEUy2xX/view?usp=drive_link' },
      { name: 'DBMS', link: 'https://drive.google.com/file/d/1SKf84MeB_Ukn_4g140eKoWF2pGiX9qp7/view?usp=drive_link' },
      { name: 'Programming Languages', link: 'https://drive.google.com/file/d/18huCt-qC6rBml7dMcRx23Em-cZhsvC9F/view?usp=drive_link' },
      { name: 'SQL', link: 'https://drive.google.com/file/d/10lcS2hVC-aEQff5NZqMFQ_zG5GyoBrXQ/view?usp=drive_link' },
      { name: 'HR Questions', link: 'https://drive.google.com/file/d/1nb9re3ne5ro9fnPV9ZyAeA8Rp9fB6Tdw/view?usp=drive_link' },
    ];
  
    const navigateToLink = (link: string) => {
      window.open(link, '_blank'); // Opens the link in a new tab
    };
  
    return (
      <IonPage>
      <IonContent className="ion-padding resources-content">
    {topics.map((topic, index) => (
      <IonCard key={index} onClick={() => navigateToLink(topic.link)}>
        <IonCardContent>
          {topic.name}
        </IonCardContent>
      </IonCard>
    ))}
  </IonContent></IonPage>
  
    );
  };
  
  export default Resources;