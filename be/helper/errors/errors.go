package errors

import (
	"errors"
	"fmt"
)

type domainError struct {
	httpCode int
	code     int
	message  string
}

func (e domainError) Error() string {
	return fmt.Sprintf("code: %d, message: %s", e.code, e.message)
}

// New creates a new error
func New(code int, httpCode int, message string) error {
	if code >= 600 || code <= 200 {
		panic("code must between 200 and 600")
	}
	return domainError{
		httpCode: httpCode,
		code:     code,
		message:  message,
	}
}

// WithMessage return a common error with custom message
func WithMessage(err error, msg string) error {
	var domainNewErr domainError
	errors.As(err, &domainNewErr)
	domainNewErr.message = msg
	return domainNewErr
}

// GetHTTPCode get http code from error
func GetHTTPCode(err error) int {
	var domainErr domainError
	errors.As(err, &domainErr)
	return domainErr.httpCode
}

// GetCode get business code from error
func GetCode(err error) int {
	var domainErr domainError
	errors.As(err, &domainErr)
	return domainErr.code
}

// GetMessage get message from error
func GetMessage(err error) string {
	var domainErr domainError
	errors.As(err, &domainErr)
	return domainErr.message
}
