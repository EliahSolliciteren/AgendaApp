<template>

<div class="center">
<router-link @click="dagNaarState" class="link" :to="{name:'dagoverzicht',params: {'dag': dag}}"> {{dagVanMaand}} {{MaandInNederlands}} </router-link>
</div>





</template>
<script>


export default{
data(){
return{
  dagVanMaand:''
}
},
computed:{
    vandaag(){ return this.$route.params.dag},
    dag(){
    const datum=new Date(parseInt(this.vandaag))
    const jaar=datum.getFullYear()
    const maand=datum.getMonth()
    const dag = ((datum.getDate()+1))
    this.dagVanMaand=dag
    let BeginVanDeDag=new Date(jaar, maand, dag)
 console.log(BeginVanDeDag)
   let BeginVanDeDag2=BeginVanDeDag.setHours(0,0,0,0)
    console.log(jaar + ' ' + maand + ' '+ dag)  
this.maand=maand
    return BeginVanDeDag2
},
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
      }

return maand
}},
methods:{
dagNaarState(){
this.$store.dispatch('kalender/huidigeDagInstellen', this.dag)
this.$store.dispatch('kalender/tijdsValidatie','' )


}



}

}



</script>
<style scoped>
.center{
text-align: center;
height: 100%;
display:flex;
align-items: center;
justify-content: center;
}
.link{
color: white;
font-size: x-large;
text-decoration: none;

}
.link:hover{

color: rgb(149, 243, 252);


}

</style>
