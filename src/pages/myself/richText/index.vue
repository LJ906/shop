<template>
  <div>
    <quill-editor v-model="content"
    class="qill"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
      <!-- <div id="toolbar" slot="toolbar"> -->

    </quill-editor>

  </div>
</template>

<script>
export default {
    data () {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
          // toolbar: '#toolbar'
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
        console.log('content', this.content);
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
        console.log('content', this.content);
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
        console.log('content', this.content);
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
        console.log('content', this.content);
        
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
}
</script>

<style scoped>
  .qill {
    width: 400px;
  }
</style>
