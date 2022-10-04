<template>
 <div id="body" @input="input" @mouseup="mouseup">
<div id="test" ref="NotitieKnop"></div>

{{notitieTeller}}















</div>






</template>
<script>

export default{

data(){
return{
  DOM:[],
  notitieTeller:0  //niet de store maar het huidige aantal notities




}








},
computed:{
notitieEvent(){return this.$store.getters['kalender/notitie']},
dag(){return this.$route.params.dag},


},


watch:{
notitieEvent(oud,nieuw){this.notitie()}
 
},


methods:{
notitie(){
  console.log(this.$store.getters['kalender/notitie'].dag)
  if ( this.$store.getters['kalender/notitie'].event==true&&  this.$store.getters['kalender/notitie'].dag==this.$route.params.dag){  
  const nieuweNotitie = document.createElement("div");
  const id='div'+this.notitieTeller
  nieuweNotitie.id= id
if (this.notitieTeller%4==0){
  nieuweNotitie.innerHTML='<div class=divnotitie :key="nr'+this.notitieTeller+'" ><textarea id="nr'+(this.notitieTeller)+'" ref="ref'+(this.notitieTeller+1)+'" rows=10 cols=20 class="geel" value=" " placeholder="Wat zou je bij vandaag willen noteren?"></textarea> </div>'


}else{
  nieuweNotitie.innerHTML='<div class="divnotitie" ref="nr'+(this.notitieTeller)+'" ><textarea id="nr'+(this.notitieTeller)+'" rows=10 cols=20 value=" " placeholder="Wat zou je bij vandaag willen noteren?"></textarea> </div>'

}this.notitieTeller++
const innerHTML=nieuweNotitie.innerHTML

/*const left=17+this.notitieTeller%4*15+'vw'
if (this.notitieTeller>3){
const top=10+(Math.floor(this.notitieTeller/3))*16+'vw'
nieuweNotitie.style.top=top
}
console.log(left)
nieuweNotitie.style.left=left
*/


  // console.log(nieuweNotitie)
this.$refs.NotitieKnop.appendChild(nieuweNotitie)
const possitie = nieuweNotitie.getBoundingClientRect();
//this.DOM.push(nieuweNotitie); 
console.log(possitie)
const notitie={id:id ,innerHTML:innerHTML,possitie:possitie}
this.DOM.push(notitie)
//console.log(notitie)
console.log(this.DOM)
this.$store.dispatch('kalender/bewaarNotitie', {info:notitie, dag:this.dag})
this.$store.dispatch('kalender/notitie', {event:false,dag:''})
  }

},
bestaandeNotitie(notitie){
let $vm=this
console.log(notitie.value)
  const nieuweNotitie = document.createElement("div");
nieuweNotitie.id='div'+this.notitieTeller;
this.notitieTeller++
nieuweNotitie.innerHTML=notitie.innerHTML;
//console.log(document.getElementById('test'))
$vm.$refs.NotitieKnop.appendChild(nieuweNotitie)
if(notitie.hasOwnProperty('value')){
  const resultString = nieuweNotitie.id.match(/\d/)
  const textareaId='nr'+resultString
  document.getElementById(textareaId).value=notitie.value


}

$vm.DOM.push(nieuweNotitie)
},

input(event){
 const tekst=event.target.value
 const id=event.target.id
 console.log(id)
this.DOM.forEach((n,i)=>{if (n.innerHTML.includes(id)){console.log(this.DOM[i])}})
const resultString = id.match(/\d/)
const id2 = 'div'+resultString
this.$store.dispatch('kalender/nieuweTekst', {dag:this.dag, id:id2, info:{value:tekst}})


},
mouseup(event){
  console.log(event.target.id)
},

hallo(){

  alert(1)


}




},
mounted(){
  let $vm=this
let params =$vm.$route.params.dag
const notities=$vm.$store.state.kalender[params]/*.rootState.kalender.$vm.$route.params.dag*/
console.log(notities)
if (notities){
notities.forEach(n=>console.log($vm.bestaandeNotitie(n)))
}//console.log(dag)




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
display:flex;
flex-wrap: wrap;
flex-basis:4
/*grid-template-columns: repeat(auto-fit, 20rem);
grid-template-rows: repeat(auto-fit, 20rem);*/

}

.divnotitie{
margin-top:7%;
margin-bottom: 7%;



}
.notitie{
position:relative;


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
  
texarea{



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