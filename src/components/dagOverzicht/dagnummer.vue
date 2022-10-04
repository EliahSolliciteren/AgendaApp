
<template>
<div class="flex">
<div class="flex2">  </div>
  <div class="dag"> {{dagVanHetJaar}}</div> 
<div></div>
 </div>  
    
</template>
<script>

export default{

data(){
return{
  dag:this.$route.params.dag,
  error:''
}},
computed:{
 
dagVanHetJaar(){
    let datum0= new Date(parseInt(this.dag))
    let datumArray=[]
    datumArray.push(datum0)
    let array2 = datumArray[0].toString()
    this.error=array2
   let datum=array2.split(' ')
   let nummer=(datum[2])
    let dag=''
    switch(datum[0]){
        case('Mon'):
        dag='maandag'
        break
        case('Tue'):
        dag='dinsdag'
        break;
        case('Wed'):
        dag='woensdag'
        break;
        case('Thu'):
        dag='donderdag'
        break;
        case('Fri'):
        dag='vrijdag'
        break;
        case('Sat'):
        dag='zaterdag'
        break;
        case('Sun'):
        dag='zondag';
        break;


    }
    let maand=''
    switch(datum[1]){
        case('Jan'):
        maand='januari'
        break
        case('Feb'):
        maand='februari'
        break;
        case('Mar'):
        maand='maart'
        break;
        case('Apr'):
        maand='april'
        break;
        case('May'):
        maand='mei'
        break;
        case('Jun'):
        maand='juni'
        break;
        case('Jul'):
        maand='juli';
        break;
        case('Aug'):
        maand='augustus';
        break;
        case('Sep'):
        maand='september';
        case('Oct'):
        maand='oktober';
        break;
        case('Nov'):
        maand='november';
        break;
        case('Dec'):
        maand='december'
        break;


    }
return  dag + ' '+ nummer + ' ' + maand




}
},
mounted(){
    
this.$watch(
()=>this.$route.params.dag,(nieuw,oud)=>{this.dag=nieuw}
)

}
,


props:['']


}

</script>
<style scoped>
.flex{
display:flex;
justify-content: center;
align-items: center;
flex-direction: row;
height: 100%;
width:100%;
font-size:1.6rem
}
.dag{


align-self: center;


}



</style>
