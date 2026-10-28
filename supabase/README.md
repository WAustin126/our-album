# 后台（Supabase）· 5 分钟准备

后台是这个地址，不放在导航里，也不会被搜索引擎收录：

```
https://waustin126.github.io/our-album/admin.html
```

需要你先在自己的 Supabase 账号里建一个免费项目，然后把两个「公开」参数给我。

## 1. 建项目

打开 https://supabase.com/dashboard → **New project**

- Name：随便，比如 `our-album`
- Database Password：随便设一个（不用给我，记住即可）
- Region：**Singapore** 或 **Tokyo**（离得近，打开快）

等 2 分钟左右，项目初始化完成。

## 2. 建表 + 权限（两段 SQL）

左侧 **SQL Editor** → **New query**，依次执行：

1. 打开仓库里的 `supabase/schema.sql`，**把最上面那行的 `__OWNER_EMAIL__` 改成你自己的邮箱**，整段粘贴执行。
2. 再新建一个 query，粘贴 `supabase/seed.sql` 执行（把现有的 14 张照片、时间轴、信、3 首歌先灌进去）。

## 3. 建管理员账号

左侧 **Authentication → Users → Add user**

- Email：**必须和第 2 步填的邮箱完全一致**
- Password：你自己设，登录后台用
- 勾选 **Auto Confirm User**（不然收不到确认邮件）

然后到 **Authentication → Sign In / Providers → Email**，把 **Allow new users to sign up** 关掉——这样只有你能登录。

## 4. 把两个参数发我

**Project Settings → API**，复制给我：

- **Project URL**：`https://xxxx.supabase.co`
- **anon public** key：`eyJhbGciOi...`（很长一串）

这两个是公开信息（本来就会打包进前端），不是密码，可以放心发。**不要发 `service_role` key**，那个是万能钥匙。

收到后我会：填进配置 → 推上去 → 用你的账号登录验证一遍（密码你自己在浏览器里输，我不需要知道）→ 把后台地址和用法给你。

## 后台能改什么

| 标签 | 内容 |
|---|---|
| 站点 | 品牌名、页面标题、在一起开始时间、礼物密码、信的标题与署名 |
| 照片 | 拖拽上传（自动压到长边 1600px）、标题、一句话、拍摄日期、排序、删除 |
| 时间轴 | 每条卡片的日期、标题、正文、排序 |
| 信 | 一段一段写，最后一段可标成署名（手写体） |
| 音乐 | 上传 mp3、歌名、歌手、歌词（`00:12 这一句`）、是否播放、排序 |

改完**立刻生效**，访客刷新就能看到；没有「发布」这一步。

## 权限模型

- 游客：只能读（数据库行级策略 `read_all`），前端里没有任何写入口。
- 你：登录后能写；写权限在数据库里按邮箱校验（`is_owner()`），即使别人拿到 anon key 也写不进去。
- 图片和音乐放在 Storage 的 `album` 桶：公开可读，只有你能上传/删除。
