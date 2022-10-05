<template >
 <div class="body" ref="body" @dragstart="test" @dragend="test2" @mousedown="HoogteEnBreedte1" @mouseup="HoogteEnBreedte2">




<div draggable="true" :key='Object.keys(notitie)[0]' ref="notitieArray" v-for="notitie,index in notities" >

<notitie ref="notitie"  @sluiten="resetPossitie()"  :index="index" :notitie="notitie"  :id="'nr'+ index"   :style="opmaakLijst(index)" > </notitie>

</div>


{{de_state}}





<alarm></alarm>

</div>

<div class="tijdsvalidatie" v-if='tijdsValidatie'>{{tijdsValidatie.boodschap}}</div>





</template>
<script>
 




import notitie from './notitie.vue'
import alarm from '/src/components/alarm.vue'
export default{

data(){
return{
breedtebody:'',
hoogtebody:'',
xpositiebody:'',
ypositiebody:'',
//notitieTeller:0
validatieTop:'',
validatieLeft:'',
validatieWidth:'',
breedte:'',
verplaatsen:true,
breedteStart:0,
hoogteStart:0,



verplaatst:{},
possitieObject:{},
omvangsObject:{}
}


//<div class="tijdsvalidatie" v-if="tijdsValidatie">{{tijdsValidatie}}</div>

//
}, //:style="{width:breedte, height:hoogte, top:(ypositie*0.75+ypositie*0.7*(index+(index+1)%2) ) +'px', left:((xpositie + xpositie*2*(index%2) )+ 'px'), position:'absolute'}" :id="'nr'+ index">
components:{notitie,alarm},
computed:{

dag(){return this.$route.params.dag},

notities(){return this.$store.getters['kalender/notitie'][this.dag]},
verwijderd(){
  return this.$store.getters['kalender/verwijderd'] },
tijdsValidatie(){let tijdsvalidatie=this.$store.getters['kalender/tijdsValidatie'] 
  if (tijdsvalidatie.dag==this.dag){
  return tijdsvalidatie }
  else{return ''}},
omvangsObjectStore(){
 // console.log(this.$store.getters['kalender/omvangsObject'])
 /*console.log(this.$store.getters['kalender/omvangsObject'][this.dag])*/

return this.$store.getters['kalender/omvangsObject']||{}},
possitieObjectStore(){
  return this.$store.getters['kalender/possitieObject']||{}},







// dimensies van het body
breedte(){return parseInt(this.breedtebody)*1/3 + 'px'},
hoogte(){return this.ypositiebody}, //width returnde 0 en volgens grid top=15% height
ypositie(){return this.ypositiebody*13/10},
xpositie(){return this.xpositiebody*13/12 },
de_state(){return this.$store.state.kalender},






},

    
  











methods:{
  HoogteEnBreedte1(e){

this.breedteStart=e.srcElement.style.width
this.hoogteStart=e.srcElement.style.height


}, //dagZoeker en alarm nog doen.
HoogteEnBreedte2(e){
const id='notitie'+e.target.id.match( /\d+/g )    
let breedteEinde =e.srcElement.style.width
let hoogteEinde =e.srcElement.style.height
//console.log(hoogteEinde,breedteEinde)
const breedteVerrandering=breedteEinde-this.breedteStart
const hoogteVerrandering=hoogteEinde-this.hoogteStart
//console.log(breedteVerrandering, hoogteVerrandering) //DOMrect index 0, geen eenheden
//this.breedteStart=0;
//this.hoogteStart=0

if(!this.omvangsObject.hasOwnProperty(this.dag)){
this.omvangsObject[this.dag]={}
}
if(!this.omvangsObject[this.dag].hasOwnProperty(id)){
this.omvangsObject[this.dag][id]={}
this.omvangsObject[this.dag][id].breedteVerrandering=breedteVerrandering
this.omvangsObject[this.dag][id].hoogteVerrandering=hoogteVerrandering

}else{
this.omvangsObject[this.dag][id].breedteVerrandering=this.omvangsObject[this.dag][id].breedteVerrandering+breedteVerrandering
this.omvangsObject[this.dag][id].hoogteVerrandering=this.omvangsObject[this.dag][id].hoogteVerrandering+hoogteVerrandering

}

this.$store.dispatch('kalender/omvangsObject',this.omvangsObject)

console.log(this.omvangsObject)


},



  test(e){
  //console.log(e)//muis aan het begin van het slepen
const dragstartX=e.clientX
const dragstartY=e.clientY
const id='notitie'+ e.target.childNodes[0].id.match( /\d+/g )

const verplaatst={id:id,dragstartX:dragstartX,dragstartY:dragstartY}
this.verplaatst=verplaatst // opslagplaats voor de toestand voor verplaatsen
},
test2(e){
  const dragstopX=e.clientX
const dragstopY=e.clientY // muis op het einde
const id='notitie'+ e.target.childNodes[0].id.match( /\d+/g )

const start=this.verplaatst
this.verplaatst=''
const stop={id:id,dragstopX:dragstopX,dragstopY:dragstopY}
const x_richting=start.dragstartX-stop.dragstopX
const y_richting=start.dragstartY-stop.dragstopY



if (!this.possitieObject.hasOwnProperty(this.dag))
{this.possitieObject[this.dag]={}
//console.log(this.possitieObject)
}



if(!(this.possitieObject[this.dag].hasOwnProperty(id))){
  this.possitieObject[this.dag][id]={xverplaatsing:x_richting,yverplaatsing:y_richting}
 
}
else{
  //console.log(this.possitieObject[this.dag][id])
  this.possitieObject[this.dag][id].xverplaatsing=this.possitieObject[this.dag][id].xverplaatsing+x_richting
  this.possitieObject[this.dag][id].yverplaatsing=this.possitieObject[this.dag][id].yverplaatsing+y_richting

}
//console.log(this.possitieObject) //Spelling!!
this.$store.dispatch('kalender/possitieObject', this.possitieObject)
},

opmaakLijst(index){
let style={}
const id= 'notitie'+index



const possitieObject=this.possitieObjectStore
//console.log(possitieObject[this.dag].hasOwnProperty(id))
const omvangsObject=this.omvangsObject
//console.log(Object.keys(omvangsObject[this.dag]))

if (!omvangsObject.hasOwnProperty(this.dag)){
omvangsObject[this.dag]={}
}
if (!omvangsObject[this.dag].hasOwnProperty(id)){
omvangsObject[this.dag][id]={}
omvangsObject[this.dag][id].breedteVerrandering=0
omvangsObject[this.dag][id].hoogteVerrandering=0

}
if (!possitieObject.hasOwnProperty(this.dag)){
possitieObject[this.dag]={}
}
if (!possitieObject[this.dag].hasOwnProperty(id)){

possitieObject[this.dag][id]={}
possitieObject[this.dag][id].xverplaatsing=0
possitieObject[this.dag][id].yverplaatsing=0

}
style.position='absolute'
const hoogte=this.ypositiebody*13/10




style.width=this.breedtebody/3+omvangsObject[this.dag][id].breedteVerrandering  +'px'
style.height=(hoogte+omvangsObject[this.dag][id].hoogteVerrandering)+'px'
//console.log(omvangsObject[this.dag][id].breedteVerrandering)



  style.top=(this.ypositie*0.75+this.ypositie*0.7*(index+(index+1)%2)-possitieObject[this.dag][id].yverplaatsing)      +'px'


  

  style.left=((this.xpositie + this.xpositie*2*(index%2))-possitieObject[this.dag][id].xverplaatsing) + 'px'
//console.log(style)



return style
},

tijdsvalidatieMethod(validatieboodschap){

  if(validatieboodschap.dag==this.dag){
  //const id=  'nr'+(validatieboodschap.id)
//const index=validatieboodschap.id.match( /\d+/g )
const eindValidatie=validatieboodschap 
//Je kan de rechterbovenhoek zoeken en een animatie plaatsen
  // Te doen corrigeren voor slechte datums
this.validatieLeft=(parseFloat(validatieboodschap.locatie.left.slice(0,-2)+200/*+(4*parseFloat(validatieboodschap.locatie.width.slice(0,-2)))*/)+'px'
) ;this.validatieTop=(parseFloat(validatieboodschap.locatie.top.slice(0,-2)))-35+'px';
this.validatieWidth=validatieboodschap.locatie.width;
//console.log('top:'+this.validatieTop,'left:'+ this.validatieLeft,'width'+ this.validatieWidth)



//geen succes
//let boodschap=document.createElement('div')
  //boodschap.innerText=validatieboodschap.boodschap
//document.getElementById(id).appendChild(boodschap)
 }else return null
}
,
resetPossitie(){  
const teVerwijderen=this.verwijderd

let gezocht=teVerwijderen[teVerwijderen.length-1]

if (gezocht.dag==this.dag){

if(this.possitieObject.hasOwnProperty(this.dag)&&(this.possitieObject[this.dag].hasOwnProperty(gezocht.id)))
{this.possitieObject[this.dag][gezocht.id].xverplaatsing=0
  this.possitieObject[this.dag][gezocht.id].yverplaatsing=0
}






}
}




},
watch:{ //werkte niet voor verwijder vandaar de emitter
tijdsValidatie: function(nieuw, oud){
  this.tijdsvalidatieMethod(nieuw)


}


}

,
mounted(){

  const $vm=this  

  
$vm.$store.dispatch('kalender/huidigeDagInstellen',$vm.dag)

$vm.breedtebody=document.getElementsByClassName('body')[0].getClientRects()[0].width

$vm.hoogtebody=document.getElementsByClassName('body')[0].clientHeight

$vm.xpositiebody=document.getElementsByClassName('body')[0].getClientRects()[0].x 

$vm.ypositiebody=document.getElementsByClassName('body')[0].getClientRects()[0].y
//console.log($vm.ypositiebody)





},
created(){

window.scrollTo(0,0)
//setTimeout(function() {window.scrollTo(0, 0);},1)

}

}


























</script>

<style scoped>


.body{
min-height: 100%;
min-width: 100%;


background-color: rgb(198, 253, 249);
overflow: auto;
/*grid-template-columns: repeat(auto-fit, 20rem);
grid-template-rows: repeat(auto-fit, 20rem);*/

}
.tijdsvalidatie{

position: absolute;
top:v-bind(validatieTop);
left:v-bind(validatieLeft);
width:v-bind(validatieWidth)

}







.notitie{
position:absolute;
width:v-bind(breedte);
height: v-bind(hoogte);
left:v-bind(xpositie);
top:v-bind(ypositie);
resize:both;
}


  








</style>

