import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { list, home, bag  } from 'ionicons/icons';

import Home from './pages/Home';
import Lists from './pages/Lists';
import Products from "./pages/Products";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';

import './theme/general.scss'

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home}/>
          <Route path="/lists" component={Lists}/>
          <Route path="/products" component={Products} />
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab={"home"} href="/home">
            <IonIcon icon={home}/>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab={"lists"}  href="/lists">
            <IonIcon icon={bag} />
            <IonLabel>My Lists</IonLabel>
          </IonTabButton>
          <IonTabButton tab={"products"}  href="/products">
            <IonIcon icon={list} />
            <IonLabel>Products</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
