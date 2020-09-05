<template>
     <div class="content">
         <div v-for="item in menuList" :key="item.name" >
             <router-link :to="item.route" tag="div" class= "item">{{item.name||item.route ||item}}</router-link>
             
             </div>
       </div>
</template>
<script>
export default {
    props:['menuList'],
  
}
</script>
<style lang="scss" scoped>
.content{
    margin:2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item{
    min-width:20rem;
    color:teal;
    border:3px solid black;
    font-size: 1.5rem;
    text-align: center;
    padding:1rem;
    margin:1rem;
    &:hover{
        background: rgb(154, 231, 231);
        color:black;
    }
}
</style>