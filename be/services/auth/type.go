package auth

type LoginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResp struct {
	AccessToken string `json:"accessToken"`
}

type MeResp struct {
	Id    int64  `json:"id"`
	Email string `json:"email"`
}
