package common

type (
	baseError struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	}
)

func NewBaseError(code int, message string) *baseError {

	return &baseError{
		Code: code, Message: message,
	}
}

func (e *baseError) Error() string {
	return e.Message
}
