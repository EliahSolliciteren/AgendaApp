<template>

<div class="centreren">
    <router-link class="link" @click="dagNaarState" :to="{name:'dagoverzicht',params: {'dag': dag}}">{{dagVanDeMaand}} {{MaandInNederlands}}</router-link>
   </div> 
    
    
    
    
    
    </template>
    <script>
    export default{
    data(){
    return{
        dagVanDeMaand:''
    }
    },
    computed:{
        vandaag(){ return this.$route.params.dag},
        dag(){
        const datum=new Date(parseInt(this.vandaag))
        const jaar=datum.getFullYear()
        const maand=datum.getMonth()
        const dag = ((datum.getDate()-1))
        let BeginVanDeDag=new Date(jaar, maand, dag)
        this.dagVanDeMaand=dag //oops 0
       let BeginVanDeDag2=BeginVanDeDag.setHours(0,0,0,0)
             this.maand=maand

      // console.log(jaar + ' ' + maand + ' '+ dag)  
   
        return BeginVanDeDag2
    },//Methode globaal te definiëren
    MaandInNederlands(){
let maand=''
    switch(this.maand){
        case(0):
        maand='januari'
        break
        case(1):
        maand='februari'
        break;
        case(2):
        maand='maart'
        break;
        case(3):
        maand='april'
        break;
        case(4):
        maand='mei'
        break;
        case(5):
        maand='juni'
        break;
        case(6):
        maand='juli';
        break;
        case(7):
        maand='augustus';
        break;
        case(8):
        maand='september';
        case(9):
        maand='oktober';
        break;
        case(10):
        maand='november';
        break;
        case(11):
        maand='december'
        break;
        
      }return maand}
    
    
    },
    methods:{
dagNaarState(){
this.$store.dispatch('kalender/huidigeDagInstellen', this.dag)
this.$store.dispatch('kalender/tijdsValidatie','' )



}}}

    
    
    
    
    </script>
    <style scoped>
    .link{
    color: white;
    text-decoration: none;
    font-size: x-large;
    }

    .link:hover{

color: rgb(149, 243, 252);


} 
    .centreren{
display: flex;
justify-content: center;
align-items: center;
height: 100%;


    }
    
    </style>
    