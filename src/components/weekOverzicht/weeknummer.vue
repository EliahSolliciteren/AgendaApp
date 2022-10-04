<template>

<div>19 tot 25 september</div>
<div>Week {{weeknummer}} van het jaar 2022. </div>  
    
</template>
<script>

export default{

data(){
return{
date:new Date()


}


},
computed:{
weeknummer(){
const maand=this.date.getMonth()
const dag = this.date.getDate()
let feb=(maand>2)?0:2
let weeknummer = Math.floor((maand*30.5+dag-feb)/7)
return weeknummer




}

//hoe werkt forceupdate?






}





}




</script>