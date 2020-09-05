<template>
  <div class="admin-panel">
    <div class="main-box">
       <h1>Card Generator Admin Panel</h1>
      <MenuVue :menuList="menuList" />
    </div>
  </div>
</template>


<script>
import MenuVue from './Menu.vue'
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  data(){
    return{
      menuList:[{name:'Manage Banks',route:'/banks'},{name:'Bank Ads',route:'/bankads'},{name:'Other Ads',route:'/otherads'}]
    }
  },
  components:{
    MenuVue:MenuVue
  }
}
</script>


<style scoped lang="scss">
.admin-panel{
  display: flex;
  justify-content: center;
}
.main-box{
  padding: 1rem;
}
</style>
