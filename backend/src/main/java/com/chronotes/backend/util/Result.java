package com.chronotes.backend.util;

import lombok.Data;

/**
 * 统一响应结果
 */
@Data
public class Result<T> {
    /**
     * 状态码：0-成功，其他-失败
     */
    private Integer code;

    /**
     * 消息
     */
    private String message;

    /**
     * 数据
     */
    private T data;

    public Result() {
    }

    public Result(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 成功响应（无数据）
     */
    public static <T> Result<T> success() {
        return new Result<>(0, "success", null);
    }

    /**
     * 成功响应（有数据）
     */
    public static <T> Result<T> success(T data) {
        return new Result<>(0, "success", data);
    }

    /**
     * 成功响应（自定义消息）
     */
    public static <T> Result<T> success(String message, T data) {
        return new Result<>(0, message, data);
    }

    /**
     * 失败响应
     */
    public static <T> Result<T> error(Integer code, String message) {
        return new Result<>(code, message, null);
    }

    /**
     * 失败响应（默认错误码）
     */
    public static <T> Result<T> error(String message) {
        return new Result<>(-1, message, null);
    }
}
