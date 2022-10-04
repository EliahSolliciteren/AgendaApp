import axios from "axios";
import store from "./store";


const state={
 event:[],
 huidigeDag:'' , //Die had ik vroeger hier moeten zetten.
 verwijderd:[],
 omvangsObject:''

    
    
    

    

}
const actions={

huidigeDagInstellen({commit}, payload){
    commit('HUIDIGEDAGINSTELLEN',payload) 
},

updateNotitie({commit}, payload){

  commit('UPDATENOTITIE',payload) 



} ,
nieuweNotitie({commit}, dag){
if ((store.state.kalender.verwijderd).filter(e=>e.dag==dag).length>0)
{
//console.log((store.state.kalender.verwijderd).filter(e=>e.dag==dag))
const sorteren1=(store.state.kalender.verwijderd).filter(e=>e.dag==dag)
const sorteren2= JSON.parse(JSON.stringify(sorteren1))
const sorteren3=sorteren2.map(e=>e.id=(e.id).match( /\d+/g ) )
//console.log(sorteren3)
const sorteren4=[]
sorteren3.forEach(e=>sorteren4.push(parseInt(e[0])))
sorteren4.sort((a,b) => a-b)
//console.log(sorteren4[0])
const id= 'notitie'+sorteren4[0]
commit('UPDATENOTITIE', {id:id,dag:dag,info:{uur:'00:00', titel:'',tekst:'',positie:''}})
commit('OPENEN',{id:id, dag:dag} )


}else{
    //reactie op een nieuw notitieEvent
commit('NIEUWENOTITIE', dag)}
},

sluiten({commit}, payload){
commit('SLUITEN',payload)
const id=payload.id
const dag=payload.dag
commit('UPDATENOTITIE',{id:id,dag:dag,info:{tekst:'',titel:'',uur:'00:00'}})

},

nieuweTekst({commit}, payload){
//console.log(payload)
commit('NIEUWETEKST', payload)




},
dag({commit}, payload){
    commit('DAG',payload)
},

positie({commit}, payload){
    commit('POSITIE',payload)
//console.log(payload)

},
tijdsValidatie({commit}, payload){
    commit('TIJDSVALIDATIE',payload) 


},
omvangsObject({commit}, hetObject){
    commit('OMVANGSOBJECT',hetObject) 
},





}








const mutations={
//dag zal gedurende de hele app als een ogenblik dienen
HUIDIGEDAGINSTELLEN(state,payload){
state.huidigeDag=payload



},   



UPDATENOTITIE(state,payload){


        const dag=payload.dag
const id=payload.id
const info=payload.info
const uur=info.uur
const titel=info.titel
const tekst=info.tekst


const index= state[dag].findIndex(n=>n.id==id)
state[dag][index].titel=titel
state[dag][index].uur=uur
state[dag][index].tekst=tekst
//console.log(state[dag][index].titel)






    },
//[] notatie voor props verplicht
    NIEUWENOTITIE(state,dag){
if(!state.hasOwnProperty(dag))
{state[dag]=[]
}
const id= 'notitie'+ state[dag].length
//console.log(state[dag])
        state[dag].push({id:id,titel:'',tekst:'',uur:'00:00',positie:''})
//console.log(state.notitie)




    },

    NIEUWETEKST(state,payload){
const dag=payload.dag
const id=payload.id
const value=payload.info.value
var index=state[dag].findIndex(e=>e.id==id)
state[dag][index]['value']=value

    },
SLUITEN(state,payload){

const dag=payload.dag
const id=payload.id
//console.log(id, store.state.kalender.omvangsObject, dag)
let omvangsObject=store.state.kalender.omvangsObject
if(omvangsObject.hasOwnProperty(dag)&&omvangsObject[dag].hasOwnProperty(id))
{omvangsObject[dag][id].breedteVerrandering=0
    omvangsObject[dag][id].hoogteVerrandering=0 

}



state.verwijderd.push({dag:dag,id:id})

},



OPENEN(state,payload){//{} niet nodig bij 1 parameter
const id= payload.id
const dag=payload.dag
 const index= state.verwijderd.findIndex(e=>e.dag==dag&&e.id==id)
state.verwijderd.splice(index,1)


},

DAG(state,dag){
state.dag=dag
},
POSITIE(state,payload){
const id=payload.id
//console.log(payload)
const dag=payload.dag
const positie=payload.positie
const index = state[dag].findIndex(notitie=>notitie.id==id)
try{
state[dag][index].positie=positie
//console.log(state[dag][index].positie)
//console.log(state[dag][index])
}
catch(error){}
},
TIJDSVALIDATIE(state,payload){
state.tijdsValidatie=payload

},
OMVANGSOBJECT(state,omvangsObject){
    state.omvangsObject=omvangsObject
    //console.log(state.omvangsObject)
    },

}
const getters={
notitie: (state)=>{return state},
tijdsValidatie: (state)=>{return state.tijdsValidatie},
verwijderd:(state)=>{return state.verwijderd},
omvangsObject:(state)=>{return state.omvangsObject}
}



const weekoverzicht = {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
    
    
    
    };
    
     export default weekoverzicht