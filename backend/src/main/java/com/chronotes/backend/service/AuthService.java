package com.chronotes.backend.service;

import com.chronotes.backend.dto.auth.AuthResponse;
import com.chronotes.backend.dto.auth.LoginRequest;
import com.chronotes.backend.dto.auth.RegisterRequest;

/**
 * 认证服务接口
 */
public interface AuthService {
    /**
     * 用户登录
     */
    AuthResponse login(LoginRequest request);

    /**
     * 用户注册
     */
    AuthResponse register(RegisterRequest request);

    /**
     * 发送验证码
     */
    void sendVerificationCode(String email);

    /**
     * 验证验证码
     */
    boolean verifyCode(String email, String code);
}
