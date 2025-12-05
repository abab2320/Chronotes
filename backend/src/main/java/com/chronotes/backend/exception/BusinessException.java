package com.chronotes.backend.exception;

import lombok.Getter;

/**
 * 自定义业务异常
 */
@Getter
public class BusinessException extends RuntimeException {
    private final Integer code;

    public BusinessException(String message) {
        super(message);
        this.code = -1;
    }

    public BusinessException(Integer code, String message) {
        super(message);
        this.code = code;
    }
}
