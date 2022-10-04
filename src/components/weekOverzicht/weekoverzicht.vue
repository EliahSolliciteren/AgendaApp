<template>
<div class="weekWrapper">

<div class="dagWrapper" v-for="dag in dagen" :key="dag">
<dagoverzicht  :class="[dag , 'dag']" :dag=dag>  </dagoverzicht>
</div>

</div>





</template>
<script>
import dagoverzicht from './dagoverzicht.vue'
export default{

data(){
return{
    dagen:['maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag','zondag']

}


},
components:{dagoverzicht}




}



</script>

<style scoped>
*{
}


.weekWrapper{

display:grid;
grid-template-areas: 
"maandag dinsdag"
"woensdag donderdag"
"vrijdag zaterdag"
"zondag achtergrond" ;
min-height:100%;
margin-top: 1%;
column-gap: 5%;
margin-left: 5% ;
margin-right: 5% ;
}
.dag{
    height:77%;
    width: 80%;
}

.maandag{
grid-area: maandag;


}
.dinsdag{
grid-area: dinsdag;

}
.woensdag{
grid-area: woensdag;

}
.donderdag{
grid-area: donderdag;

}
.vrijdag{
grid-area: vrijdag;

}
.zaterdag{
grid-area: zaterdag;

}
.zondag{
grid-area: zondag;

}
#achtergrond{
grid-area: achtergrond;
}
</style>