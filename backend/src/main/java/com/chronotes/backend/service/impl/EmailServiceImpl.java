package com.chronotes.backend.service.impl;

import com.chronotes.backend.exception.BusinessException;
import com.chronotes.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * 邮件服务实现
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendVerificationCode(String toEmail, String code) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Chronotes 注册验证码");
            message.setText("您的验证码是：" + code + "\n\n验证码5分钟内有效，请勿泄露给他人。\n\n如非本人操作，请忽略此邮件。");

            mailSender.send(message);
            log.info("验证码邮件发送成功: {}", toEmail);
        } catch (Exception e) {
            log.error("验证码邮件发送失败: {}", e.getMessage());
            throw new BusinessException("邮件发送失败，请稍后重试");
        }
    }
}
