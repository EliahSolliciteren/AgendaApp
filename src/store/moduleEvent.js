import store from "./store";

const state={
    event:[],   
   alarm:false,
   
       
       
       
   
       
   
   }

   const actions={
    nieuwEvent({commit}, payload){
       // console.log(payload)
        const id=payload.id
    const dag=payload.dag
    const titel=payload.titel
    const uurGedeelte=parseInt(payload.uur.substring(0,2))*3600*1000
    const minutengedeelte=parseInt(payload.uur.substring(3,5))*60*1000
    //console.log(uurGedeelte, minutengedeelte)
    const eindTijd=parseInt(dag)+parseInt(uurGedeelte)+parseInt(minutengedeelte)
    //console.log('eindtijd '+ eindTijd)
        const event={titel:titel,eindTijd:eindTijd, id:id} 
        
        commit('NIEUWEVENT',event)
    
    
    },
   
    eventVerwijderen({commit}, payload){
        commit('EVENTVERWIJDEREN', payload)
    },

    lopendevent({commit}, payload){
    const id=payload.id
    const eindTijd=payload.eindTijd
    const titel=payload.titel
//console.log(eindTijd)
//console.log(Date.now())
   setTimeout(()=>{
    commit('ALARM', payload )
       store.dispatch('events/eventVerwijderen', id )}
    ,eindTijd-Date.now())




    
 
    
    
    },
    alarm({commit}, payload){

commit('ALARM',payload)
   }}
   const mutations={
    NIEUWEVENT(state,payload){
    //console.log(payload)
 
    state.event.push(payload)
       //console.log(state.event)
    store.dispatch('events/lopendevent',payload)
    
    
    },
EVENTVERWIJDEREN(state,id){
const index= state.event.findIndex(ev=>ev.id==id)
state.event.splice(index,1)

},
ALARM(state,idTitelEindTijd){
state.alarm=idTitelEindTijd



}


}//dag is hier niet van belang
const getters={
events: (state)=>{return state.event},
alarm: (state)=>{return state.alarm},
tijdsValidatie: (state)=>{return state.tijdsValidatie}
}

const eventModule = {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
    
    
    
    };
    
     export default eventModule