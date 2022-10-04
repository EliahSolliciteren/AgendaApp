<template>
   
   <div id="dagflex">
<div class="deDag">{{dag}}</div>
  <textarea v-model="notitie"  @input="tekstopslaan"></textarea>
    </div>
    
    
    
    
    
    
    </template>
    <script>
   
    export default{
    
    data(){
    return{
        notitie:''
    }},
    methods:{
tekstopslaan(){
this.$store.dispatch('kalender/bewaartekst',{wanneer:1,wat:this.notitie})



}


    },
    
    
    
props:{'dag':String}
    
    
    
    
    }
    
    
    
    </script>

    <style scoped>
textarea{

/*background-image: url('/src/assets/afbeeldingen/lijntjes.png');*/
width: 100%;
min-height: 90%;
max-height: 90%;
resize:none
}

#dagflex{
display:flex;
flex-direction:column;
justify-content: center;
max-width:90%;
min-width:90%;
min-height: 80%;
background-color: bisque;

}
.deDag{font-style: oblique;
font-size: larger;
text-align: center;
min-height: 20%;

}

    </style>