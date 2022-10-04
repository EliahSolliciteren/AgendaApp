<template>
<router-link :to="{name:'dagoverzicht',params: {'dag': dag}}">Dagoverzicht</router-link>

<hr>
</template>
<script>
//<router-link disabled :to="{name:'weekoverzicht',params: {'week': week}}">Weekoverzicht</router-link>
//<router-link disabled :to="{name:'maandoverzicht',params: {'maand': maand}}">Maandoverzicht</router-link>

export default{



data(){
return{





}


},

computed:{
dag(){
    const datum=new Date()
    const jaar=datum.getFullYear()
    const maand=datum.getMonth()
    const dag = datum.getDate()
    let BeginVanDeDag=new Date(jaar, maand, dag)
 console.log(BeginVanDeDag)
   let BeginVanDeDag2=BeginVanDeDag.setHours(0,0,0,0)
    console.log(jaar + ' ' + maand + ' '+ dag)  
return BeginVanDeDag2
},

maand(){
const datum= new Date()
const jaar=datum.getFullYear()
    const maand=datum.getMonth()
    const dag = datum.getDate()
let BeginVanDeMaand=new Date(jaar,maand, 1)
console.log(BeginVanDeMaand)
const BeginVanDeMaand2=BeginVanDeMaand.setHours(0,0,0,0)
//let local=BeginVanDeMaand.toString()
return BeginVanDeMaand2
},

week(){
  const datum= new Date()
const jaar=datum.getFullYear()
    const maand=datum.getMonth()
    const dag = datum.getDate()
    console.log(dag)
    let datum2=new Date(jaar,maand, dag)
const weekdag= datum2.getDay()
console.log(weekdag)
    const datum3=datum2.setHours(0,0,0,0)
   const datum4=datum3-24*3600*1000*(weekdag-1)

return datum4
},


nu(){
    const tijdelijk=new Date()  
      console.log(tijdelijk)

    const nu= new Date().getTime()
return nu

} 









}}

</script> 