# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

v0.3
我们一共有三种角色 用户，员工，admin

我先展示首页，
Protect router 功能如果不登陆是不能进入到 order/admin/employee-order 页面的

然后展示三种登陆，和 user 的 email 找回密码功能（yanbo），
然后 user 和 employee 的 myprofile（mengxuan）
然后后端验证 token 的功能（mengxuan）

4000000360000006
然后首页下单，下单页下单，
和 order detail（lingjie)

然后 user 的 myorder(olivia)
如果 user 去接单页面，会自动重定向到下单

然后 employee 接单，
employee 的 myorder(olivia)
因为 employee 的 myprofile 功能逻辑跟 user 一样，我们就不再讲了
如果 employee 去 order 页面，会自动重定向到接单页面

然后去 admin，介绍四个页面，还有删除一个 employee 账户

# 登陆

1. 可以自由转换作为用户登录，或者作为 employee 登录
2. 登录的时候会有不同的报错，分为：账号密码不匹配报错，邮箱没注册报错等
3. 登陆时，会根据不同的身份，在 local storage 富裕不同的权限，分别为，user,employee,admin
4. 在首页可以展示一下右边的快捷切换登录注册

# 注册

1. 可以自由转换作为用户注册，或者作为 employee 注册
2. 注册时，报错信息也是齐全的
3. 注册时，根据用户的不同身份，发送到后台不同的接口
4. 注册后立刻跳转到登录页面

# 忘记密码

1. 忘记密码后，跳转到忘记密码页面，用户可以输入自己的账号，等待收到验证码
2. 用户可以进入到自己的邮箱，查看验证码
3. 点击邮箱中的链接，进入到下一页，然后使用验证码修改密码
4. 密码修改后自动跳转会首页

# Navbar

1. 不同身份 navbar 展示不一样，左侧 icon 点击去到不同身份的首页，还有 protect router，不登陆不能进入首页之外的页面
2. 首页 navbar 下滑自动显示，其他页面固定在顶部
3. 如果没登陆，点击 navbar 的 booking 也会弹出登陆
4. mobile 移动端样式

# 首页

1. 可以选择房间数，type 和 postcode 不是必填。然后 booking 跳转到 order 页面
2. 如果没登陆，点击 booking 会弹出登陆
3. 如果下滑，也可以从 navbar 进入下单页面,右下角有返回顶部按钮
4. Back to the top
5. mobile 移动端样式

# Order

1. 如果是 employee 或者 admin 不能进入这个页面，会 history push 到他们自己的首页
2. 右侧确认栏会随着浏览器下滑 自动下滑（sticky）
3. 选中 regular 后可以添加删除 extra/选中 end 后，全部 extra 会选中并且不能取消
4. 如果支付成功，可以 post order，卡号无效或者支付不成功，不会 post，但可以重新填正确的信息
5. 如果某项必填没有写，会有提示
6. mobile 移动端样式

# Order Confirm

1. 下单成功后可以点击 view order 看刚才的订单，如果还没被接单，可以 cancel

# employee 接单大厅

# My order

1. user 和 employee 的 total orders（包括正在进行和已经完成的订单） 和 completed orders（已经完成的订单）的数目会根据实际订单的状态进行自动更新

# Order details

1. 根据订单的状态展示出不同的按钮.
   (1)For employee :"confirmed" -> "accept"
   "in-progress"-> "finish",
   (2)For user: "confirmed" -> "cancel"
   (3)For admin: "in-progress"-> "cancel" AND "finish" admin 可以进行 cancel，然后订单状态会从”in-progress“变成“confirmed“,
   相关的 employee 的信息会删除，其他的 employee 可以在用户大厅重新接单。admin”可以也有权利可以结束订单
2. 在 employee 接完订单之后，只有在现在的时间大于 start time 的时候，employee 才能结束订单，其他时候是结束不了的。结束了订单之后会把当前时间展示到
   end time 里。

# My profile

1. user 和 employee 可以更新他们的个人信息，跟新完会 pop up 更新成功对话框
2. order history 可以看到历史订单
3. 支持 mobile 移动端样式

# Admin Dashboard

# Admin Order 左侧

# Admin Customers

# Admin Staffs

# Footer
