# 📝 留言板

一个简单的在线留言板，完全免费搭建。

## 技术栈

- **前端**：纯 HTML / CSS / JavaScript
- **API**：Vercel Serverless Functions (Node.js)
- **存储**：GitHub Gist
- **部署**：Vercel

## 在线访问

部署后访问 Vercel 分配的域名即可使用。

## 本地开发

```bash
# 安装 Vercel CLI
npm install -g vercel

# 本地运行
vercel dev
```

## 项目结构

```
my-guestbook/
├── api/
│   └── messages.js    ← 留言 API（读写 GitHub Gist）
├── index.html         ← 前端页面
├── vercel.json        ← Vercel 配置
└── README.md
```
