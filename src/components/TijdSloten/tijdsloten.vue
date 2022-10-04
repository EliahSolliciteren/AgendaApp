<template>
<ul class="tijdsloten">
<li v-for="uur in uren">
    {{uur}}
</li>
</ul>
   
   {{notitie}} 
</template>
<script>

export default{

data(){
return{



    
}


},
computed:{
uren(){
   let uren=[]
    for (var i=0,j=0;j<24 ;i=i+15){
         
if (i==60){i=0, j++}
if (j==24){break}


if (i==0){i='00'}

let uur=j+':'+i
uren.push(uur)
if (i=='00'){i=0}

    }
return uren

},
notitie(){return this.$store.state.kalender[this.$route.params.dag]}


}


}

</script>

<style>
.tijdsloten{
list-style:none




}




</style>