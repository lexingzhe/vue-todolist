<template>
  <div id="app">
    <h1>todos</h1>
    <div id="main">
      <div class="text">
        <input type="checkbox" class="todoAll" :class="{active:todoAll}" v-model="todoAll">
        <label for="pushVal"></label>
        <input type="text" placeholder="请输入信息" class="pushVal" v-model="todoVal" @keyup.enter="add" id="pushVal">
      </div>
      <ul>
        <li v-for="(item,index) in newTodos" :class="{completed:item.completed}">
          <input type="checkbox" v-model="item.completed">
          <span>{{ item.text }}</span>
          <button @click="del(index)">x</button>
        </li>
      </ul>
      <div>
        <!--绑定事件，点击时全选；在methods里定义一个函数active-->
        <button @click="active('All')">All</button>
        <!--点击时选择被选中的（划横线的）-->
        <button @click="active('Active')">Active</button>
        <!--点击时选择没有被选中的-->
        <button @click="active('Completed')">Completed</button>
      </div>
    </div>
  </div>
</template>

<script>

import { Fetch, Save } from '@/tools/localStorage';
export default {
  name: 'App',
  data(){
      return {
        todoVal:'',
        todos:Fetch(),
        newTodos:[]
      }
  },
  created(){
      this.active(location.hash.replace(/#\/?/,''));
      window.addEventListener('hashchange', ()=> {
      this.active(location.hash.replace(/#\/?/,''));
    })
  },
  methods:{
      add(){
          this.todos.push({
            text:this.todoVal,
            completed:false
          })
        Save(this.todos);
        this.active();
        this.todoVal="";
      },
     del(todoIndex){
       this.todos = this.todos.filter((item,index)=>todoIndex != index);
       Save(this.todos);
    },
     active(name){
        if(name == 'Completed'){
            this.newTodos = this.todos.filter(item=>item.completed);
        }else if(name == 'Active'){
            this.newTodos = this.todos.filter(item=>!item.completed);
        }else{
          this.newTodos = this.todos;
        }
        window.location.hash = name?name:'All';
     }
  },
  computed:{
      todoAll:{
          get(){
              return this.todos.length && this.todos.every(item=>item.completed)
          },
          set(val){
              this.todos.forEach(item=>item.completed=val)
          }
      }
  },
  watch:{
      todos:{
        handler: function (val, oldVal) {
            Save(this.todos);
            this.active(location.hash.replace(/#\/?/,''));
        },
        deep: true
      }
  }
}
</script>

<style>
  body{
    background: #F0F0F0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;

  width: 400px;
  margin: 60px auto;
  padding-bottom: 10px;
}
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  #app h1{
    text-align: center;
  }
  #main{
    padding-top: 10px;
    width: 400px;
    /*margin: 60px auto;*/
    padding-bottom: 10px;
    background: #ffffff;
  }
  .todoAll{

  }
  .todoAll:after{
    content: '';
    display: block;
    width: 20px;
    height:20px;
    background: url("../static/img/radio.jpg") no-repeat -26px 0 white;
    /*border: 10px solid #ffffff;*/
    /*border-bottom-color: #ccc;*/
    border-radius: 100%;
    position: relative;
    left: -3px;
    top: -2px;
   }
  .pushVal{
    border:1px solid #cccccc;
    height: 20px;
    width: 80%;
  }
   li{
     border-bottom: 1px dashed #ccc;
     padding: 10px 0;
     margin-bottom: 3px; ;
   }
  .completed span{
    text-decoration: line-through;
    color: #ccc;
  }
  .active:after{
    background: url("../static/img/radio.jpg") no-repeat  white;
  }
  .pushVal{
    border:none;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 14px;
  }
  .text{
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;

  }
</style>
