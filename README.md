# 📝 留言板

一个简单的在线留言板，使用 Vercel + Supabase 免费搭建。

## 技术栈

- **前端**：纯 HTML / CSS / JavaScript
- **部署**：Vercel（免费）
- **数据库**：Supabase PostgreSQL（免费）

## 快速开始

### 1. 创建 Supabase 项目

1. 打开 https://supabase.com 并用 GitHub 登录
2. 点击 **New project**
3. 填写项目名 `guestbook`，设置密码，选择 Free 套餐
4. 创建完成后，进入 **SQL Editor**，运行：

```sql
CREATE TABLE messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '匿名',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "允许匿名读" ON messages FOR SELECT USING (true);
CREATE POLICY "允许匿名写" ON messages FOR INSERT WITH CHECK (true);
```

5. 进入 **Project Settings → API**，复制 URL 和 anon public key

### 2. 配置前端

打开 `index.html`，找到开头的 `SUPABASE_URL` 和 `SUPABASE_KEY`，替换成你自己的值。

### 3. 部署到 Vercel

1. 将本项目推送到 GitHub
2. 打开 https://vercel.com 并用 GitHub 登录
3. 点击 **Add New → Project**，选择本仓库
4. Framework Preset 选择 **Other**
5. 点击 **Deploy**，等待完成即可访问！

## 在线演示

部署后你会得到一个 `https://xxx.vercel.app` 的域名，随时随地访问。
