import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Dropdown from "../components/Dropdown/Dropdown";

const Lists: React.FC = () => {
  const categories = [
    {
      name: "Dairy",
      products: ["Milk", 'Cheese']
    },
    {
      name: "Meats",
      products: ['Rib-eye', 'Stake']
    },
    {
      name: "Vegetables",
      products: [],
    }
  ]

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={"header"}>
          <p>Lists</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Lists;