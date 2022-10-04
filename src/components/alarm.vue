<template>

<div @click="alarmUit" v-if="alarm">
<div class="overlay"></div>
<div class='alarm'>
{{alarm.titel}}
{{alarm.eindtijd}}

</div>



</div>






</template>
<script>
import store from '../store/store';


export default{
data(){
return{}

},
computed:{

alarm(){

return this.$store.getters["events/alarm"]


},
alarmUit(){
store.dispatch("events/alarm",false)



}



}





}



</script>

<style scoped>
.overlay{

position:absolute;

left:0;
right:0;
top: 0;
bottom:0;

margin: auto auto;
height:100%;
width:100%;
background-color: white;
opacity: 0.7;




}

.alarm{
    left:0;
    position:absolute;
    z-index:200;
right:0;
top: 0;
bottom:0;
height: 30%;
margin:auto auto;
width:40%;
background-color: white;




}






</style>