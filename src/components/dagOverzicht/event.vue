<template>
<div class="event">

<div class="titel" >
{{titel}} </div>
<div>{{tijdstip}}</div>

</div>



</template>

<script>


export default{
data(){
return{
    titel:this.event.titel,
    tijdstip:this.event.tijdstip
}





},

props: ['event'],

computed:{
tijdstip(){
    let datum=new Date(this.event.eindTijd)
   datum= datum.toString().split('GMT')[0]
return datum

}


}








}




</script>

<style scoped>


.event{

border:solid black;
padding:10%;


}



</style>