import React from "react";
import "./AdminSidebar.css";
import {
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenu,
} from "@ionic/react";
import {
  homeOutline,
  documentTextOutline,
  barChartOutline,
  calendarOutline,
  cloudUploadOutline,
  helpCircleOutline,
} from "ionicons/icons";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <IonIcon icon={homeOutline} />
      </button>
      <IonMenu menuId="admin-menu" contentId="main-content" type="overlay">
        <IonContent>
          <IonList>
            <IonItem routerLink={`/admin/home`} button>
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem routerLink={`/admin-releaseForm`} button>
              <IonIcon icon={documentTextOutline} slot="start" />
              <IonLabel>Release Form</IonLabel>
            </IonItem>
            <IonItem routerLink={`/admin/statistics`} button>
              <IonIcon icon={barChartOutline} slot="start" />
              <IonLabel>Statistics</IonLabel>
            </IonItem>
            <IonItem routerLink={`/admin/companies`} button>
              <IonIcon icon={calendarOutline} slot="start" />
              <IonLabel>Schedule</IonLabel>
            </IonItem>
            <IonItem routerLink={`/admin/resources`} button>
              <IonIcon icon={cloudUploadOutline} slot="start" />
              <IonLabel>Resources</IonLabel>
            </IonItem>
            <IonItem routerLink={`/admin/feedback`} button>
              <IonIcon icon={helpCircleOutline} slot="start" />
              <IonLabel>Feedback</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </div>
  );
};

export default AdminSidebar;
