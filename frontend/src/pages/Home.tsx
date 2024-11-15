import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonSplitPane,IonToolbar,IonTitle} from '@ionic/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
    document.body.classList.toggle('light-theme', isDarkMode);
  };

  return (
    <IonPage>
      {/* Split pane layout for Sidebar and main content */}
      <IonSplitPane contentId="main-content">
       

        {/* Main content with Navbar */}
        <IonPage id="main-content">
          {/* <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> */}

          <IonContent fullscreen>
            {/* <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Home</IonTitle>
              </IonToolbar>
            </IonHeader>
            <ExploreContainer /> */}
            <h1>hello</h1>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;