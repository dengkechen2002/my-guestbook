-- 在 Supabase SQL Editor 中运行此脚本

-- 创建留言表
CREATE TABLE messages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '匿名',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 开启行级安全
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取留言
CREATE POLICY "允许匿名读" ON messages FOR SELECT USING (true);

-- 允许所有人写入留言
CREATE POLICY "允许匿名写" ON messages FOR INSERT WITH CHECK (true);

-- 给 created_at 加索引，排序更快
CREATE INDEX idx_messages_created_at ON messages (created_at DESC);
