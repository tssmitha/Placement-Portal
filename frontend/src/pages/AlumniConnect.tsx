import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import AlumniData from "../data/alumnidata";
import position from "../assets/position.png";
import boy_img from "../assets/boy.png";
import building from "../assets/building.png";
import women from "../assets/women.png";
import graduate from "../assets/graduate.png";
import "./alumni.css";
import { trophyOutline, trophySharp } from "ionicons/icons";

interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  company: string;
  position: string;
}

const Alumniconnect: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonItem lines="none">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <h3>Alumni Connect</h3>
        </IonItem>

        <IonGrid>
          <IonRow>
            {AlumniData.map((alumnus: Alumni) => (
              <IonCol size="12" size-md="6" size-lg="4" key={alumnus.id}>
                <IonCard>
                  {/* <IonImg src={boy_img} className="alumni-img" /> */}
                  <IonImg
                    src={alumnus.gender === "male" ? boy_img : women}
                    className="alumni-img"
                  />
                  <IonCardContent className="alumni-content">
                    <IonItem lines="none">
                      <IonLabel className="alumni-name">
                        {alumnus.name}
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonIcon icon={trophySharp} slot="start" />
                      <IonLabel>
                        Graduation Year: {alumnus.graduationYear}
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none" className="icon-label-row">
                      <IonImg src={building} className="position-img" />
                      <IonLabel>Company: {alumnus.company}</IonLabel>
                    </IonItem>
                    <IonItem lines="none" className="icon-label-row">
                      <IonImg src={position} className="position-img" />
                      <IonLabel>Position: {alumnus.position}</IonLabel>
                    </IonItem>
                    <IonItem
                      lines="none"
                      button
                      onClick={() => window.open(alumnus.connectLink, "_blank")}
                    >
                      <IonLabel>Connect</IonLabel>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Alumniconnect;
