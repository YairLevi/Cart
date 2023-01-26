import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Dropdown from '../components/Dropdown/Dropdown';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Dropdown />
      </IonContent>
    </IonPage>
  );
};

export default Home;
