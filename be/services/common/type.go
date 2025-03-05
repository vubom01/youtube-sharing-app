package common

type BaseRes struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type PaginationReq struct {
	Page     int64 `json:"page"`
	PageSize int64 `json:"pageSize"`
}
