<template>
    <div>
        <Slot1 @handleInputChange="handleInputChange">
            <template v-slot:slot1="slotProps">
                这是slot1, 传递的信息为： {{slotProps.user.name}}
            </template>
        </Slot1>

        <p>=========线下面是 自己实现双向绑定====</p>
        下面的phoneInfo 是v-model绑定的， 但是只能绑定一个字段， 如果需要绑定多个字段
        可以.sync 的方法 
        <br><br>
        <PersonalInfo v-model="phoneInfo" :zip-code.sync="zipCode" /> 
        <PersonalInfo 
            :phone-info="phoneInfo" 
            :zip-code="zipCode" 
            @change="val => (phoneInfo = val)" 
            @update:zipCode="val => (zipCode = val)" 
        /> 
             phoneInfo： {{ phoneInfo }} 
        <br /> 
            zipCode： {{ zipCode }} 



        <br>
        <br>
        <p>========自定义指令====</p>
        <CustomerDirective ></CustomerDirective>
    </div>
</template>

<script>
import Slot1 from './component/slot1';

import PersonalInfo from './component/model1'; // 模拟双向数据绑定
import CustomerDirective from './component/customerDirective'; // 模拟双向数据绑定

export default {
    data () {
        return {
            phoneInfo: {
                phone: '',
                areaCode: '+86'
            },
            zipCode: ''
        }
    },
    components: {
        Slot1,
        PersonalInfo,
        CustomerDirective,
    },
    methods: {
        handleInputChange (inputValue) {
            console.log(inputValue);
            console.log(this.handleInputChange)
        }
    }
}
</script>

<style>

</style>
