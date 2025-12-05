package com.chronotes.backend.controller;

import com.chronotes.backend.dto.auth.AuthResponse;
import com.chronotes.backend.dto.auth.LoginRequest;
import com.chronotes.backend.dto.auth.RegisterRequest;
import com.chronotes.backend.dto.auth.SendCodeRequest;
import com.chronotes.backend.service.AuthService;
import com.chronotes.backend.util.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器
 */
@Tag(name = "认证管理", description = "用户登录、注册相关接口")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 用户登录
     */
    @Operation(summary = "用户登录", description = "通过邮箱和密码登录")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "登录成功", content = @Content(schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "400", description = "请求参数错误"),
            @ApiResponse(responseCode = "401", description = "认证失败")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "登录请求体",
            required = true,
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginRequest.class), examples = @ExampleObject(value = "{\"email\":\"user@example.com\",\"password\":\"password123\"}"))
        )
    @PostMapping("/login")
    public Result<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return Result.success(response);
    }

    /**
     * 用户注册
     */
    @Operation(summary = "用户注册", description = "通过邮箱、验证码和密码注册")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "注册成功", content = @Content(schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "400", description = "请求参数错误或验证码不正确"),
            @ApiResponse(responseCode = "409", description = "邮箱已存在")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "注册请求体",
            required = true,
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = RegisterRequest.class), examples = @ExampleObject(value = "{\"email\":\"user@example.com\",\"verifyCode\":\"123456\",\"password\":\"password123\"}"))
        )
    @PostMapping("/register")
    public Result<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return Result.success(response);
    }

    /**
     * 发送验证码
     */
    @Operation(summary = "发送验证码", description = "向指定邮箱发送注册验证码")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "验证码发送成功"),
            @ApiResponse(responseCode = "400", description = "请求参数错误")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "发送验证码请求体",
            required = true,
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = SendCodeRequest.class), examples = @ExampleObject(value = "{\"email\":\"user@example.com\"}"))
        )
    @PostMapping("/send-code")
    public Result<Void> sendCode(@Valid @RequestBody SendCodeRequest request) {
        authService.sendVerificationCode(request.getEmail());
        return Result.success("验证码已发送，请查收邮件", null);
    }
}
