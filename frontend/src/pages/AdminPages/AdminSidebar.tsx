import React, {useState} from 'react';
import './AdminSidebar.css';
import { IonContent , IonList , IonItem , IonIcon , IonLabel , IonMenu ,IonHeader , IonToolbar , IonTitle ,IonButtons} from '@ionic/react';
import { menuController} from '@ionic/core';
import {homeOutline , documentTextOutline , barChartOutline , menuOutline , calendarOutline , cloudUploadOutline , helpCircleOutline} from 'ionicons/icons';
import Hamburger from 'hamburger-react';

const AdminSidebar : React.FC = () =>  {
    const [isOpen, setOpen] = useState(false);
    // const handleMenuToggle = async () => {
    //     const isMenuOpen = await menuController.isOpen('admin-menu');
    //     console.log('Toggle icon clicked!');
    //     // const isOpen = await menuController.isOpen('admin-menu');
    //     if (isMenuOpen) {
    //         await menuController.close('admin-menu');
    //     } else {
    //         await menuController.open('admin-menu');
    //     }
    // };

    const handleMenuToggle = async () => {
        try {
          if (isOpen) {
            console.log("open");
            await menuController.close('admin-menu'); // Close menu
          } else {
            await menuController.open('admin-menu'); // Open menu
          }
          setOpen(!isOpen); // Update state
        } catch (error) {
          console.error('Menu toggle failed:', error);
        }
      };
      

    // const handleMenuToggle = () => {
    //     console.log('Toggle icon clicked!');
    //     alert('Toggle icon clicked!');
    // };
    
    return(
        <>
        <IonMenu menuId = "admin-menu" contentId = "main-content" type = "overlay">
            <IonHeader>
                <IonToolbar>
                <Hamburger toggled={isOpen} toggle={handleMenuToggle}/>    
                    <IonTitle>Admin Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem routerLink={`/admin/home`} button>
                        <IonIcon icon={homeOutline} slot='start' />
                        <IonLabel>Home</IonLabel>
                    </IonItem>
                    <IonItem routerLink={`/admin-releaseForm`} button>
                        <IonIcon icon={documentTextOutline} slot='start' />
                        <IonLabel>Release Form</IonLabel>
                    </IonItem>
                    <IonItem routerLink={`/admin/statistics`} button>
                        <IonIcon icon={barChartOutline} slot='start' />
                        <IonLabel>Statistics</IonLabel>
                    </IonItem>
                    <IonItem routerLink={`/admin/companies`} button>
                        <IonIcon icon={calendarOutline} slot='start' />
                        <IonLabel>Schedule</IonLabel>
                    </IonItem>
                    <IonItem routerLink={`/admin/resources`} button>
                        <IonIcon icon={cloudUploadOutline} slot='start' />
                        <IonLabel>Resources</IonLabel>
                    </IonItem>
                    <IonItem routerLink={`/admin/feedback`} button>
                        <IonIcon icon={helpCircleOutline} slot='start' />
                        <IonLabel>Feedback</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>


        </> 
    );
};

export default AdminSidebar;