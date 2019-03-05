<template>
  <div>
<button type="button" class="btn btn-success" @click="changeLocale">中文/EN</button> 
    <el-date-picker
      v-model="time"
      type="date"
      placeholder="data">
    </el-date-picker>

    <!-- <p>{{$t("main.name")}}</p> -->
    <p>{{$t('message.hello')}}</p>
    <p>{{$t('test1.main.name')}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: ''
    };
  },
  mounted() {
    this.$message({
      message: this.$t('message.hello'), // js中调用this.$t('')
      type: "success" 
    });
  },
  methods: {
    changeLocale () {
      this.$i18n.locale == 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh' 
    }
  }
};
</script>

<style>
</style>

