import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>College Placement Portal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <section className='hero'>
          <div className='hero-content'>
            <h1>Welcome to the college placement portal</h1>
            <p>Prepare to fulfill your DREAMS!</p>
            <IonButton expand="block" color="secondary"href='/companies'>
              Companies
            </IonButton>
          <IonButton expand='block' color='secondary' href='/placement-prep'>
            Start your placement prep
          </IonButton>
          </div>
        </section>

        
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
