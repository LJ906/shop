<template>
    <div>
        <input type="text" v-model="inpValue" @change="hanldeChange">
        <span >
            <slot name="slot1" :user="user"></slot>
        </span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            inpValue: '',
            user: {
                name: '张三',
                age: 12
            }
        }
    }, 
    methods: {
        hanldeChange () {
            this.$emit('handleInputChange', this.inpValue)
        }
    }
}
</script>

<style>

</style>
