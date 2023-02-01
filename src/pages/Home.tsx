import React from "react";
import { IonButton, IonContent, IonFooter, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Dropdown from '../components/Dropdown/Dropdown';
import './Home.scss';
import Greeting from "../components/Greeting/Greeting";
import image from '../assets/image.jpg'

const Home: React.FC = () => {
  return (
    <IonPage>
      <div className={"home-layout"}>
        <Greeting/>
      </div>
    </IonPage>
  );
};

export default Home;
