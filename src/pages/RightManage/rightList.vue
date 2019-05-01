<template>
  <div class="right-list">

		<!-- 搜索框  字段待定-->
		<el-form ref="queryData" :model="queryData" label-width="70px" size="mini" >
			<el-row  :gutter="10">
				<el-col :span='6' >
					<el-form-item label="名称">
						<el-input  
							v-model="queryData.authName"
							placeholder="权限名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span='6' >
					<el-form-item label="路径">
 						<el-input  
							v-model="queryData.authName"
							placeholder="权限名称"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8" align="right">
					<el-form-item>
						<el-button 
							type="primary" 
							:disabled="btnDisabled" 
							@click="handleSearch">查 找</el-button>
						<el-button type="warning" 
								plain 
								:disabled="btnDisabled">清 除</el-button>
						</el-form-item>
				</el-col>
			</el-row>
		</el-form> 
		<!-- <hr> -->

 		<el-table
      :data="dataList"
      highlight-current-row
      style="width: 100%">
			<!-- 展开行 -->
			<el-table-column type="expand">
				<template slot-scope="props">
					 <el-table
					 	:data="props.row.children">
						<el-table-column
							property="authName"
							label="权限名称"
							min-width="120">
						</el-table-column>
					 	<el-table-column
							property="path"
							label="权限路径"
							min-width="120">
						</el-table-column>
					 <el-table-column
							property="level"						
							min-width="120">
						</el-table-column>
					 </el-table>
				</template>
			</el-table-column>

      <el-table-column
        type="index"
        min-width="50">
      </el-table-column>
      <el-table-column
        property="authName"
        label="权限名称"
        min-width="120">
      </el-table-column>
      <el-table-column
        property="path"
        label="路径"
        min-width="120">
      </el-table-column>
      <el-table-column
				min-width="120"
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
			pageSize: 10,
      total: 0,      
      pagenum: 1, // 当前页码数默认1，推算offset起始位置
      btnDisabled: false,
      loading: false, 
      queryData: {
        authName: '',
        level: ''
      },
 
			dataList:[
				{
					authName: '名称1',
					path: '/',
					level: 1,
					children: [
						{
							authName: '名称3',
							path: '/',
							level: 1,
						},
					 {
							authName: '名称4',
							path: '/',
							level: 1,
						},
						
					]
				},{
					authName: '名称2',
					path: '/',
					level: 1,
				}
			]
    }
	},
	created () {

	}, 
	methods: {
		handleSearch () {

		}
	}
}
</script>

<style>

</style>
