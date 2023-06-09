$(function () {
  const layer = layui.layer
  const form = layui.form
  // 验证
  $(function () {
    form.verify({
      nickname: function (value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
  })
  // 初始化用户基本信息
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        // console.log(res);
        // 表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }
  // 重置表单数据
  $("#btnReset").on('click', function (e) {
    e.preventDefault();
    // initUserInfo()
    // $("layui-form").attr("value","")
    $("[name=nickname]").val("")
    $("[name=email]").val("")

  })
  // 更新表单信息
  $(".layui-form").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改用户信息失败')
        }
        layer.msg('修改用户信息成功')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }

    })
  })
})