<style scoped>
.paddingtop24 {
  padding-top: 24px
}
</style>

<template>
  <div class="stuMag">
    <Card>
      <get-root></get-root>
    </Card>
    <Card style="margin-top:24px">
      <h2><Icon type="md-cloud-upload" /> 导入教师表至数据库</h2>
      <p>将 Excel 表格的数据导入到系统中</p>
      <Divider />
      <Alert type="warning" show-icon>
        注意！这很重要.
        <template slot="desc">
          请按照下面这张图片的格式来编辑您的教师数据表格（每列顺序可变但字段名要与图片中保持一致）。
        </template>
      </Alert>
      <p style="text-align: center;">
        <img src="../../assets/teaTable.jpeg" width="600px">
      </p>
      <Upload
        :multiple=false
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击 或 拖动文件到此来上传</p>
        </div>
      </Upload>
    </Card>
    <Card style="margin-top:24px">
      <h2><Icon type="md-trash" /> 清空教师表</h2>
      <p>将教师表中的数据清空</p>
      <Divider />
      <Alert type="warning" show-icon>
        注意！这很重要.
        <template slot="desc">
          点击此按钮后，您的操作将不可逆。请务必小心！
        </template>
      </Alert>
      <Button type="error" long large>清空</Button>
    </Card>
  </div>
</template>

<script>
export default {
  
}
</script>