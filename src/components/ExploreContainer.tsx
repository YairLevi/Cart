import './ExploreContainer.css';
import { IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown/Dropdown';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {

  const history = useHistory();

  return (
    <div className="container">
      <Dropdown />
      <strong>Ready to create an app? yes.</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
