<template>
  <div>
    <button type="button" class="btn btn-success" @click="changeLocale">中文/EN</button>
    <el-date-picker v-model="time" type="date" placeholder="data"></el-date-picker>

    <!-- <p>{{$t("main.name")}}</p> -->
    <p>{{$t('message.hello')}}</p>
    <p>{{$t('test1.main.name')}}</p>

    <p>========slot1===</p>

    <!-- 普通slot 调用如果使用父组件的东西需要参数过去
    有多个slot的时候建议定义name="slotName" 调用的时候在父组件中 template 上声明 v-slot:slotName,
    如果slot就一个时候，v-slot可以放在组件中，不用再template中包裹了
     -->
    <!-- <testSlotComponents  :user="user">
      <template v-slot:topSlot>
        {{user.name}}
      </template>      
       <template v-slot:bottomSlot="user2">
        {{user2.age}}
      </template>      
    </testSlotComponents> -->

    <div>
      <testSlotComponents :todoList='todoList'>
        <template v-slot:todo="{ todo }">
          {{ todo.name }}
        </template>
      </testSlotComponents>
    </div>
  </div>
</template>

<script>
// 测试slot 用法
import testSlotComponents from "@/components/myTestComponent";

export default {
  data() {
    return {
      time: "",
      // user: {
      //   name: 'rose',
      //   age: 12
      // },
      todoList: [
        {
          id: 1,
          name: 'todo1'
        },
         {
          id: 2,
          name: 'todo2'
        },
        {
          id: 3,
          name: 'todo3'
        }
      ]
    };
  },
  mounted() {
    this.$message({
      message: this.$t("message.hello"), // js中调用this.$t('')
      type: "success"
    });
  },
  methods: {
    changeLocale() {
      this.$i18n.locale == "zh"
        ? (this.$i18n.locale = "en")
        : (this.$i18n.locale = "zh");
    }
  },
  components: {
    testSlotComponents
  }
};
</script>

<style>
</style>

