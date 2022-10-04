<template>
    
<div class="geheelN" v-if="!verwijderd" ref='kader' @input="updateNotitie" @mousedown="HoogteEnBreedte1" @mouseup="HoogteEnBreedte2">
    <button class="timerKnop" v-if="!uur"  @mouseover="uur=true" >uur</button>
<input v-model="notitieuur" class="timerdisplay" v-if="uur"   @blur="muistimer"  /> 
<input   v-model="titel" placeholder="Geef mij een titel" class="titel" />         

<div   class="tekst" @keyup="doeOpmaak" ref='tekst' contenteditable='true'  data-placeholder="Wat zou je willen onthouden?" >



{{tekst}}
</div>

<div class="opmaak">
<button class="herinneringknop" @click="nieuwEvent">alarm instellen</button>
<button class="sluiten" @click="sluiten(id)">Sluiten</button>
<button class="lijst" @click="lijstToevoegen" >lijstje</button>
<button disabled class="maakVet" @click="startOpmaak" >B</button>
</div>

</div>

</template>

<script>

import store from '../../store/store'










export default{
data(){
return{
dag:this.$route.params.dag,
uur:false,
titel:this.notitie.titel,
notitieuur:this.notitie.uur||'00:00',
id:'notitie'+this.index,
tekst:this.notitie.tekst,
tijdsvalidatie:'',
opmaak:false,
verwijderd:false,
teBewerkenVoor:'',
breedteStart:0,
hoogteStart:0,
omvangsObject:{}




}


},
props:['index','notitie']
,
computed:{


kleur(){
if (this.index%4==0){return 'yellowgreen'}
else if (this.index%4==1){return 'rgb(63, 249, 242)'}
else if (this.index%4==2){return 'rgb(240, 15, 15)'}
else return 'lightgreen'
},
verwijderd(){const index=this.$store.getters["kalender/verwijderd"].findIndex(n=>n.dag==this.dag && n.id==('notitie'+this.index))
if (index>-1) {
return true}
else return false
}


},


methods:{


startOpmaak(){
    this.opmaak=!this.opmaak
  this.teBewerkenVoor=this.$refs.tekst.innerText 

},

    doeOpmaak(){
   
let teBewerkenVoor=this.teBewerkenVoor //altijd

     
        if (this.opmaak==true){
          let teBewerkenNa=this.$refs.tekst.innerText

let teBewerkenVoorArray=teBewerkenVoor.split('')
let teBewerkenNaArray=teBewerkenNa.split('')
console.log(teBewerkenVoorArray)
console.log(teBewerkenNaArray)
for (let i=0;teBewerkenVoorArray.length;i++){
 for (let j=0;teBewerkenNaArray.length;j++){
  if(i>j){continue}
  if (teBewerkenVoorArray[i]!=teBewerkenNaArray[j] )
 
  
 {console.log(teBewerkenNaArray[j], j)
  const midden='<b>'+teBewerkenNaArray[j]+'</b>'  
  const deel1=teBewerkenNaArray.slice(0,j-1).join('')
    const deel2=teBewerkenNaArray.slice(j+1,10000).join('')
  console.log(deel1)  
  console.log(deel2) 
 const totaal= deel1+midden+deel2
 console.log(totaal)
 this.$refs.tekst.innerHTML=totaal
 this.teBewerkenVoor=totaal //haal de tags eruit
    return false }
   
    }   }

     
}
    //this.$refs.tekst.innerHTML=teBewerkenTekst  
        }


,

    lijstToevoegen(){

        //console.log(this.$refs.tekst.innerHTML)
let teBewerkenTekst=this.$refs.tekst.innerHTML
teBewerkenTekst=teBewerkenTekst+'<ul><li>'
    this.$refs.tekst.innerHTML=teBewerkenTekst  


    },


window()
{var x=window.getSelection().toString()
    var y =document.activeElement
console.log(x, y)//selectionStart
var z = document.getElementsByClassName('test')[0].textContent
console.log(z)
},
sluiten(event){
    //this.verwijderd=true; //
 //const id='notitie'+ this.index
this.$store.dispatch('kalender/sluiten',{id:this.id,dag:this.dag})
this.$store.dispatch('kalender/positie',{id:this.id,dag:this.dag, positie:''})
this.$emit('sluiten') //id niet meer bereikbaar

},
muistimer(){ 
   
  
setTimeout(()=>{this.uur=false},500)


},
nieuwEvent(event){
  
    this.$store.dispatch('kalender/tijdsValidatie','')

    const uur= parseInt(this.notitieuur.substring(0,2))*3600*1000
const minuten=parseInt(this.notitieuur.substring(3,5))*60*1000
const uur1=this.notitieuur.substring(0,2)
const minuten1=(this.notitieuur.substring(3,5))

const eindTijd=parseInt(this.dag)+uur+minuten
//Ik hoop dat je je alarm niet op middernacht wilde zetten.
if(this.notitieuur.length==4){
this.notitieuur='0'+this.notitieuur

}
 if(uur1>23||minuten1>60||uur1<0||minuten1<0||this.notitieuur.charAt(2)!=':'){
    this.tijdsvalidatie='Gelieve een uur te geven van het formaat uu:mm'
this.$store.dispatch('kalender/tijdsValidatie',{boodschap:this.tijdsvalidatie, id:this.id, dag:this.dag, locatie:this.$refs.kader.style})
}
else if (this.notitieuur=='00:00'){
 

this.tijdsvalidatie='In de rechterbovenhoek van de notitie kan je het uur van de herinnering ingeven'
this.$store.dispatch('kalender/tijdsValidatie',{boodschap:this.tijdsvalidatie, id:this.id, dag:this.dag, locatie:this.$refs.kader.style})

}  

else if(eindTijd<new Date()){
    
    this.tijdsvalidatie='Je kan geen herinnering instellen voor een ogenblik in het verleden'
    this.$store.dispatch('kalender/tijdsValidatie',{boodschap:this.tijdsvalidatie, id:this.id, dag:this.dag, locatie:this.$refs.kader.style})
  
}else{}

if (!this.$store.getters['kalender/tijdsValidatie']){

const tekst=this.$refs.tekst.innerHTML

this.$store.dispatch('events/nieuwEvent',{dag:this.dag,uur:this.notitieuur,id:this.id,tekst:tekst, titel:this.titel})
this.$store.dispatch('kalender/tijdsValidatie',{boodschap:'Je vind je alarm terug in de rechter zijbalk', id:this.id, dag:this.dag, locatie:this.$refs.kader.style})



}
setTimeout(()=>{
    this.$store.dispatch('kalender/tijdsValidatie','')


},4000)


},
updateNotitie(event){
    const tekst=this.$refs.tekst.innerHTML
    this.$store.dispatch('kalender/updateNotitie',{dag:this.dag,id:this.id, info:{uur:this.notitieuur,titel:this.titel,tekst:tekst, event:true}})
},

 //hooks altijd met haken, computed zonder

HoogteEnBreedte1(){

this.breedteStart=this.$refs.kader.getClientRects()[0].width
this.hoogteStart=this.$refs.kader.getClientRects()[0].height


}, //dagZoeker en alarm nog doen.
HoogteEnBreedte2(){
    
let breedteEinde =this.$refs.kader.getClientRects()[0].width
let hoogteEinde =this.$refs.kader.getClientRects()[0].height
//console.log(hoogteEinde,breedteEinde)
const breedteVerrandering=breedteEinde-this.breedteStart
const hoogteVerrandering=hoogteEinde-this.hoogteStart
//console.log(breedteVerrandering, hoogteVerrandering) //DOMrect index 0, geen eenheden
this.breedteStart=0;
this.hoogteStart=0

if(!this.omvangsObject.hasOwnProperty(this.dag)){
this.omvangsObject[this.dag]={}
}
if(!this.omvangsObject[this.dag].hasOwnProperty(this.id)){
this.omvangsObject[this.dag][this.id]={}
this.omvangsObject[this.dag][this.id].breedteVerrandering=breedteVerrandering
this.omvangsObject[this.dag][this.id].hoogteVerrandering=hoogteVerrandering

}else{
this.omvangsObject[this.dag][this.id].breedteVerrandering=this.omvangsObject[this.dag][this.id].breedteVerrandering+breedteVerrandering
this.omvangsObject[this.dag][this.id].hoogteVerrandering=this.omvangsObject[this.dag][this.id].hoogteVerrandering+hoogteVerrandering

}

store.dispatch('kalender/omvangsObject',this.omvangsObject)





}
},






beforeUnmount(){

 //Dit is in theorie niet meer nodig
    const $vm=this
   let  dimensie=$vm.$refs.kader.getClientRects()
$vm.$store.dispatch('kalender/positie', {positie:dimensie,id:$vm.id, dag:$vm.dag} )



}}




</script>

<style scoped>
.geheelN{
border:1px black solid;
display:flex;
flex-direction:column;
width:100%;
height: 100%;
padding-top:4vh;
margin-left: 5vw;
background-color: v-bind(kleur) ;
overflow: hidden;
resize:both;

} 
.tijdsvalidatie{
  
 position:absolute ;
    color: rgb(235, 8, 8);
}/*resize werkt niet zonder overflow hidden*/
.sluiten{

position: absolute;
top:0;
margin:auto 0;
bottom: 0;
right:0;
margin-right: 10%;
width: 15%;
height: 60%;
}

.herinneringknop{
    
margin:auto 0 ;
bottom: 0;
top:0;
margin-left:5%;
position:absolute;
left:0;
height:70%;
min-width:fit-content;
max-width: 30%;

}
.timerKnop{
position: absolute;
display:block;
top:0;
right:0;
margin:0 auto;
bottom: 0;
font-size:1.1rem;
margin-right: 2%;

width: 10%;
height: 10%;
border:none;
background-color: transparent;

}
.timerdisplay{
    position: absolute;
display:block;
top:0;
right:0;
margin:0 0;
bottom: 0;
font-size:1.1rem;
padding:0;
margin-right:1%;
width: 13%;
height: 10%;
border:none ;
background-color: transparent;
    }
.titel{
    width:80%;
    height: 10%;
    border: 0ch;
    margin-top: 0%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.1rem;
    display: block;
background-color: blanchedalmond;
color: green;
}
.lijst{

position:absolute;
left:0;
right:0;
margin: auto auto;
top:0;
bottom:0;
height: 60%;
width:20%


}
ul{

margin-top: 0px;
border:0px;
}
li{border:0px}
input{border:0px}
textarea{

    border: none;
}

.tekst:empty:before{
/*resize: both;*/
content: attr(data-placeholder);
top: 15%;
position: absolute;
margin-left: 1%;

}
.tekst:focus{
outline: 0ch;

}
/*inline block is iets voor buttons*/
.opmaak{

background-color: rgb(252, 3, 244);
width: 100%;
min-height: 14%;
position: absolute;

opacity: 0;
bottom: 0%;  /*negatief voor onder element*/
}
/*meer over willen weten*/
.geheelN:hover .opmaak{
transition: opacity 0.6s;
opacity: 1;
}


.bold{

font-weight: bold;


}











</style>