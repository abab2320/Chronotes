package com.chronotes.backend.service.impl;

import com.chronotes.backend.dto.auth.AuthResponse;
import com.chronotes.backend.dto.auth.LoginRequest;
import com.chronotes.backend.dto.auth.RegisterRequest;
import com.chronotes.backend.entity.User;
import com.chronotes.backend.exception.BusinessException;
import com.chronotes.backend.mapper.UserMapper;
import com.chronotes.backend.security.JwtUtils;
import com.chronotes.backend.service.AuthService;
import com.chronotes.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * 认证服务实现
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;
    private final StringRedisTemplate redisTemplate;

    private static final String VERIFY_CODE_PREFIX = "verify_code:";
    private static final int CODE_LENGTH = 6;
    private static final long CODE_EXPIRE_TIME = 5; // 5分钟

    @Override
    public AuthResponse login(LoginRequest request) {
        // 查询用户
        User user = userMapper.findByEmail(request.getEmail());
        if (user == null) {
            throw new BusinessException(4001, "用户不存在");
        }

        // 验证密码
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException(4002, "密码错误");
        }

        // 检查账号状态
        if (user.getStatus() != 1) {
            throw new BusinessException(4003, "账号已被禁用");
        }

        // 生成 Token
        String token = jwtUtils.generateToken(user.getEmail());

        log.info("用户登录成功: {}", user.getEmail());
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setBio(user.getBio());
        return response;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        // 检查邮箱是否已注册
        User existUser = userMapper.findByEmail(request.getEmail());
        if (existUser != null) {
            throw new BusinessException(4004, "该邮箱已被注册");
        }

        // 验证验证码
        if (!verifyCode(request.getEmail(), request.getVerifyCode())) {
            throw new BusinessException(4005, "验证码错误或已过期");
        }

        // 创建用户
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getEmail().split("@")[0]); // 默认用户名为邮箱前缀
        user.setStatus(1);
        user.setCreateTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());

        // 保存到数据库
        int result = userMapper.insert(user);
        if (result == 0) {
            throw new BusinessException("注册失败，请稍后重试");
        }

        // 删除已使用的验证码
        redisTemplate.delete(VERIFY_CODE_PREFIX + request.getEmail());

        // 生成 Token
        String token = jwtUtils.generateToken(user.getEmail());

        log.info("用户注册成功: {}", user.getEmail());
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setBio(user.getBio());
        return response;
    }

    @Override
    public void sendVerificationCode(String email) {
        // 检查邮箱是否已注册
        User existUser = userMapper.findByEmail(email);
        if (existUser != null) {
            throw new BusinessException(4004, "该邮箱已被注册");
        }

        // 生成6位随机验证码
        String code = generateCode();

        // 存储到 Redis，5分钟过期
        String key = VERIFY_CODE_PREFIX + email;
        redisTemplate.opsForValue().set(key, code, CODE_EXPIRE_TIME, TimeUnit.MINUTES);

        // 发送邮件
        emailService.sendVerificationCode(email, code);

        log.info("验证码已发送至邮箱: {}", email);
    }

    @Override
    public boolean verifyCode(String email, String code) {
        String key = VERIFY_CODE_PREFIX + email;
        String storedCode = redisTemplate.opsForValue().get(key);
        return code.equals(storedCode);
    }

    /**
     * 生成随机验证码
     */
    private String generateCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}
