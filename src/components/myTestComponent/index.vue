<template>
<div class="wrp">
  <!-- <div>名字:
    <slot></slot>
  </div> -->

  <ul>
    <li v-for="(todo,i) in todoList" :key='i'>
      <slot name="todo" :todo="todo">{{todo.name}}</slot>
    </li>
  </ul>
</div>     
</template>

<script>
export default {
  name: 'testSlot',
  props:['user', 'todoList'],
  created () {
    console.log('user', this.user);
    
  }
}
</script>

<style>

</style>
