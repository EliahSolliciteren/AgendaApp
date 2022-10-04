import { createRouter, createWebHistory } from 'vue-router'
import weekoverzicht from '/src/components/weekOverzicht/weekoverzicht.vue'
import weeknummer from '/src/components/weekOverzicht/weeknummer.vue'
import welkom from '/src/components/welkom.vue'
import dagoverzicht from '/src/components/dagOverzicht/dagoverzicht.vue'
import dagnummer from '/src/components/dagOverzicht/dagnummer.vue'
import maandnummer from '/src/components/maandOverzicht/maandnummer.vue'
import maandoverzicht from '/src/components/maandOverzicht/maandoverzicht.vue'
import linkenvoordag from '/src/components/dagOverzicht/rechts.vue'
import tijdsloten from '/src/components/TijdSloten/tijdsloten.vue'
import naarMorgen from '/src/components/dagOverzicht/rechterhoek.vue'
import naarGisteren from '/src/components/dagOverzicht/linkerhoek.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'welkom',
      component: welkom,
    
    },
    {

      path: '/dag/:dag',
      name: 'dagoverzicht',
      components:{default:dagoverzicht,
      bovenaanMidden:dagnummer,
      rechts:linkenvoordag,
      rechtsBoven:naarMorgen,
      linksBoven:naarGisteren
    } 




    },


    {

      path: '/week/:week',
      name: 'weekoverzicht',
      components:{default:weekoverzicht,
      bovenaanMidden:weeknummer} 




    },
    {
    path: '/maand/:maand',
      name: 'maandoverzicht',
      components:{default:maandoverzicht,
      bovenaanMidden:maandnummer} 
},
{

path: '/dag/:dag/tijdsloten',
name: 'tijdsloten',
components:{default:tijdsloten,
bovenaanMidden: dagnummer}
},
 


]})


export default router
