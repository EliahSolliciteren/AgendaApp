<template>
<button class='knop' @click="this.$store.dispatch('kalender/nieuweNotitie',dag)">notitie toevoegen</button>
<div class="center">
  <ul class="eventsList" >
<li  v-for="event in events">
<event class="event" :event="event"> </event>
</li>

</ul>
</div>



</template>
<script>
import event from './event.vue'
export default{

data(){
return{}


},
computed:{
dag(){ return this.$route.params.dag},
events(){return this.$store.getters["events/events"]}

}
,components : {event}

}
//<router-link :to="{name:'tijdsloten',params:{'dag':$route.params.dag}}"> tijdssloten overzicht</router-link>

</script>

<style scoped>
ul{
list-style:none;
list-style-position: outside;
margin-right: 20%;
display: flex;
/*align-items: center;*/
flex-direction: column;
justify-content: center;
}

ul li{

margin-top:2vh;
margin-bottom: 2vh;
text-align: center;


}

.knop{
  width: 80%;
  border: none;
  background-color: rgb(242, 246, 7);
  margin-top: 5%;
  margin-left: 7.5%;
  text-align: center;
  height: 10%;


}
.knop:hover{

color:rgb(255, 140, 0)


}
/*.center{

display: flex;
width:100%;
justify-content: center;
flex-direction: column;*/


/*}*/







</style>