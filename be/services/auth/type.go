package auth

type SignupReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type BaseRes struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

var SuccessMessage = "Success"
var ErrInternal = "Internal error"
