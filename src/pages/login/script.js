export default {
	name: 'login',
	data() {
		return {
			loginForm: {
				username: '',
				password: ''
			},
			// 表单验证规则
			loginFormRules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
		}
	},
	methods: {
		handleLogin (login_Form) {
			// 如果表单校验成功在发送this.$http请求。valid:表单校验的结果
			// this.$refs[login_Form].validate((valid) => {
			// 	// valid 是通过了验证。
			// 	if (!valid) {
			// 		this.$message({
			// 			message: '用户名或密码错误',
			// 			type: 'warning'
			// 		})
			// 		return
			// 	}
			// 	// 发送this.$http 把loginForm传过去
			// 	this.$http.post('/login', this.loginForm)
			// 		.then( res => {						
			// 			const { data, meta } = res.data
			// 			const { msg, status } = meta
			// 			if (status === 200) {
			// 				// 登录成功 记录localStorage
			// 				window.localStorage.setItem('token', data.token)
			// 				// 跳转路径到首页
			// 				this.$router.push('/')
			// 				// 提示成功
			// 				this.$message({
			// 					message: '登录成功',
			// 					type: 'success'
			// 				})
			// 				// 如果登录失败给出提示
			// 			} else if (status === 400) {
			// 				this.$message.error(msg)
			// 			}

			// 		})

			// })

		},
		resetForm (login_Form) {
			// this.$refs[login_Form].resetFields()
		}
	}
}
