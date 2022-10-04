import { createStore } from 'vuex';
import kalender from './moduleKalender' 
import events from './moduleEvent'
//import Klant from './moduleKlant'
import persistedStateVuex from "persisted-state-vuex";

export default createStore({

modules:{
kalender,
events

},
    
plugins: [persistedStateVuex.init],
    
    })
