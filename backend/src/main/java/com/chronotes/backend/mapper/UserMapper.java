package com.chronotes.backend.mapper;

import com.chronotes.backend.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 用户 Mapper 接口
 */
@Mapper
public interface UserMapper {
    /**
     * 根据邮箱查询用户
     */
    User findByEmail(@Param("email") String email);

    /**
     * 插入新用户
     */
    int insert(User user);

    /**
     * 根据ID查询用户
     */
    User findById(@Param("id") Long id);

    /**
     * 更新用户信息
     */
    int update(User user);
}
