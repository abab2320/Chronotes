-- 创建数据库
CREATE DATABASE IF NOT EXISTS chronotes DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE chronotes;

-- 创建用户表
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `email` VARCHAR(100) NOT NULL COMMENT '邮箱',
    `password` VARCHAR(255) NOT NULL COMMENT '密码',
    `username` VARCHAR(50) DEFAULT NULL COMMENT '用户名',
    `avatar_url` VARCHAR(500) DEFAULT NULL COMMENT '头像URL',
    `bio` VARCHAR(200) DEFAULT NULL COMMENT '个人简介',
    `status` TINYINT(1) DEFAULT 1 COMMENT '状态:0-禁用,1-启用',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_email` (`email`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
