<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe>
        <el-table-column label="#" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <!--<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>-->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
          <!--<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>-->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById()"></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = true">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="30%" @close="editDialogClosed">
      <el-form :model="editModel" :rules="editFormRules" ref="editModel" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editModel.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editModel.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editModel.mobile"></el-input>
        </el-form-item>
      </el-form>
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addDialogVisible: false,
        editModel:{
          username:'',
          email: '',
          mobile: '',
        },
        addForm: {
          username:'',
          password: '',
          email: '',
          mobile: ''
        },
        userlist: [
          {
          username:'admin',
          email: 'ades@qq.com',
          mobile: '18564857428',
          role_name: '超级管理员',
          mg_state: 'true'
        },
          {
          username: 'linken',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色2',
          mg_state: 'false'
        },
          {
          username: 'fulanke',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色3',
          mg_state: 'true'
        },
          {
          username: 'fulanke',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色4',
          mg_state: 'false'
        },
          {
          username: 'fulanke',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色5',
          mg_state: 'true'
        }
        ],
        queryInfo: {
          query: '',
          //当前页
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize:3
        },
        userlist: [
          {
          username: 'admin',
          email: 'ades@qq.com',
          mobile: '18564857428',
          role_name: '超级管理员',
          mg_state: 'true'
        },
          {
          username: 'linken',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色2',
          mg_state: 'false'
        },
          {
          username: 'fulanke',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色3',
          mg_state: 'true'
        },
          {
          username: 'fulanke',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色4',
          mg_state: 'false'
        },
          {
          username: 'fulanke',
          email: 'asdf@qq.com',
          mobile: '18524898562',
          role_name: '测试角色5',
          mg_state: 'true'
        }],
        total: 5,
        editDialogVisible: false,
        //添加用户的表单数据
        addFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名的长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 11, message: '密码长度在 6 到 11 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
        },
        editFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名的长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/,
              message: '手机号格式不正确',trigger: 'blur'}
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
              message: '邮箱格式不正确',trigger: 'blur'}
          ]
        }
      }
    },
    created() {

    },
    methods: {
      addDialogClosed(){
        this.$refs.addFormRef.resetFilelds()
      },
      //展示编辑用户的对话框
      showEditDialog(){
        this.editDialogVisible=true
      },
      editDialogClosed(){
        this.$refs.editModel.resetFields()
      },
      /*async showEditDialog(id){
        //console.log(id)
        const {data: res}= await this.$http.get('userlist/'+id)
        if(res.meta.status!=200){
          return this.$message.error(('查询用户信息失败'))
        }
        this.editForm=res.data
        this.editDialogVisible=true
      },*/
      /*async getUserList(){
        const  {data:res}=await this.$http.get('userlist',{
          params: this.queryInfo
        })
        if(res.meta.status !== 200){
          return this.$.error('获取用户列表失败')
        }
        this.userlist=res.data.userSelect
        this.total=res.data.total
        console.log(res)
        console.log(userlist)
      },*/

      handleSizeChange(newSize){
        //console.log(newSize)
        this.queryInfo.pagesize=newSize
        console.log(this.queryInfo.pagesize)

      },
      handleCurrentChange(newPage){
        console.log(newPage)
      },
      editUserInfo(){
        this.$refs.editModel.validate(valid=>{
          console.log(valid)
          //发起修改用户信息的数据请求
          /*if (!valid) return
          //发起修改用户信息的数据请求
          const {data: res}=await this.$http.put('users/'+this.editModel.id,{
            email:this.editModel.email,
            mobile: this.editModel.mobile
          })
          if (res.meta.status!==200){
            return this.$message.error('用户信息更新失败!')
          }
          //关闭对话框
          this.editDialogVisible=false
          //刷新数据列表
          this.getUserList()
          //提示成功
          this.$message.success('更新用户信息成功')*/
        })
      },
      async removeUserById(){
        const confirmResult=await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);
        //如果用户确认删除，则返回值为字符串confirm
        //如果用户确认取消删除，则返回值为字符串cancel
        //console.log(confirmResult)
        if (confirmResult!=='confirm'){
          return this.$message.info('已取消删除')
        }else {
          return this.$message.success('删除用户信息成功')
        }
        /*const {data: res}=await  this.$http.delete('userlist/'+id)
        if(res.meta.status!==200){
          return this.$message.error('删除用户信息失败')
        }
        this.$message.success('删除用户信息成功')
        this.getUserList()*/
      }
    },

  }
</script>

<style lang="less" scoped>

</style>
