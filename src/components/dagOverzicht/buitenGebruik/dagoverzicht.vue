<template>
 <div id="body" @click="muisklik">
<br>
<div  ref="NotitieKnop"></div>
 


<div v-if="eventScherm" id="eventscherm">
       <div @click="sluiten" class="sluiten">sluiten</div>
<form id="eventForm"> 

<div  class='eventFlex'>
     <label for='titel'> Geef een naam aan de herinnering</label><br>
<input v-model="eventForm.titel" id=titel name="titel" /> <br>
<label for="details">datails</label><br>
<textarea v-model="eventForm.details" id="details">
</textarea>
<br>
<label  for="alarmknop"> Alarm opzetten?</label><br>
<input id='alarmknop' v-model="eventForm.alarmknop" type="checkbox" /><br>
<input v-if="eventForm.alarmknop" type="dateTime-local" v-model="eventForm.alarmDatum" /><br>
<button @click="eventOpslaan">Opslaan</button>
</div>


</form>

</div>
<div @click="herinneringMaken"> Nieuwe Herinnering</div>
   
</div> 
<div v-if="eventScherm" class="overlay"></div>   
</template>
<script>

export default{

data(){
return{
  DOM:[],
    notitieTeller:0,
    eventScherm:false,
eventForm:{
    titel:'',
    details:'',
    alarmknop:'',
    alarmDatum:''



}
}


},
computed:{
notitieEvent(){return this.$store.getters['kalender/notitie']},
params(){return this.$route.params.dag}


},

watch:{
notitieEvent(oud,nieuw){this.notitie()}

},


methods:{
notitie(){
  console.log(this.$store.getters['kalender/notitie'].dag)
  if ( this.$store.getters['kalender/notitie'].event==true&&  this.$store.getters['kalender/notitie'].dag==this.$route.params.dag){  
  const nieuweNotitie = document.createElement("textarea");

nieuweNotitie.placeholder= "Wat zou je bij vandaag willen noteren?"
if (this.notitieTeller%4==0){nieuweNotitie.classList.add("geel")}
nieuweNotitie.classList.add("notitie")
this.notitieTeller++
const id= 'notitienr'+this.notitieTeller
nieuweNotitie.id=id
const left=17+this.notitieTeller%4*15+'vw'
if (this.notitieTeller>3){
const top=10+(Math.floor(this.notitieTeller/3))*16+'vw'
nieuweNotitie.style.top=top
}
console.log(left)
nieuweNotitie.style.left=left

nieuweNotitie.setAttribute("rows", "10")
nieuweNotitie.setAttribute("cols", "20")

  // console.log(nieuweNotitie)
this.$refs.NotitieKnop.appendChild(nieuweNotitie)
var possitie = nieuweNotitie.getBoundingClientRect();
this.DOM.push(nieuweNotitie); console.log(this.DOM[0])//console.log(rect.top, rect.right, rect.bottom, rect.left)
this.$store.dispatch('kalender/notitie', {event:false,dag:''})
  }

},
muisklik(event){
 console.log(this.$refs.element)
}
  /*  
console.log(event/*event.pageX, event.pageY, event.target.id)
const target=event.target.id
const coordinaten=document.getElementById(target).getBoundingClientRect()
console.log(coordinaten)
*/
//this.doel=target
/*
const tag=event.tagName
if (tag=='textarea'){this.doel=event.target.id}
if (this.doel){
var c=document.getElementById(this.doel).getBoundingClientRect()

console.log('textarea locatie'+ c)*/
},

herinneringMaken()
{
this.eventScherm=true


},
eventform(event){
    event.preventDefault()
    console.log(this.eventForm)


},
sluiten()
{this.eventScherm=false},
eventOpslaan(){
this.$store.dispatch("moduleKalender/eventMaken")


}



}










</script>

<style>
.geel{
background-color: greenyellow;
}
#body{
min-height: 100%;
min-width: 100%;

}
.notitie{
position:absolute;


}
#eventscherm{
position: absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;
left:10;
height:30%;
width:20%;
margin:auto;
border:black solid;
z-index:10;
background-color: lightcyan;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;

}
.sluiten{

margin: top 0%;
padding-top: 0;
width:45px


}
#evenForm{
height:100%;
width:100%;


}
  







.overlay{

min-width:100%;
min-height:100%;
background-color: white;
opacity: 0.4;
position: absolute;
z-index:9;
left:0;
right:0;
margin: auto;
top:0;
bottom:0;
}

</style>

/*
drag(event) {
  event.dataTransfer.setData("text", event.target.id);
 
},
allowDrop(event) {
  event.preventDefault();
},

drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
},

*/