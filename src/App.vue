
<template>
<div id="grid">
<div id="linksBoven"><RouterView name="linksBoven"></RouterView> </div>
<div id="boven"><RouterView name="bovenaanMidden"></RouterView></div>
<div id="rechtsBoven"><RouterView name="rechtsBoven"></RouterView> </div>
<div id="navigatie"></div>
<div id="center">

<RouterView></RouterView>
</div>
<div id="rechterdeel"><RouterView name="rechts"></RouterView> </div>
<div id="linksOnder"></div>
<div id="footer"></div>
<div id="rechtsOnder"></div>
</div>

</template>

<script>


export default{

data(){

return{}



},
computed:{
events(){return this.$store.getters["events/event"]}

},
mounted(){
 const $vm=this

const events=$vm.$store.getters["events/events"]
events.forEach(event=>{$vm.$store.dispatch('events/lopendevent',event)})
},

beforeUnmount(){

window.scrollTo(0,0)


}

}








</script>

<style scoped>
#grid{

display:grid;
grid-template-areas: 
"linksBoven boven rechtsBoven"
"navigatie centrum rechterdeel"
"linksOnder footer rechtsOnder";
grid-template-columns:1fr 5fr 1fr;
grid-template-rows: 1fr 5fr 1fr;
min-height:100vh;

width:100vw
}

#linksBoven{
grid-area: linksBoven;
background-color: darkblue;
}
#boven{
grid-area: boven;
background-color: rgb(249, 165, 249);
min-height: 10vh;
}
#rechtsBoven{
grid-area: rechtsBoven;
background-color: darkblue;
}
#navigatie{
grid-area: navigatie;
background-color: rgb(28, 239, 46);
}
#centrum{
grid-area: centrum;
background-color: rgb(3, 235, 239);
overflow-y:visible ;
min-height: 80vh;
}
#rechterdeel{
grid-area: rechterdeel;
background-color: rgb(239, 3, 3);

}
#linksOnder{
grid-area: linksOnder;
background-color: rgb(195, 1, 179);
}
#footer{

  grid-area: footer;
background-color: rgb(249, 125, 10);

}
#rechtsOnder{

grid-area: rechtsOnder;
background-color: rgb(249, 249, 10);

}

#footer{

grid-area: footer;
background-color: rgb(249, 249, 10);
min-height:10vw;
max-height: 10vw;

}


</style>
