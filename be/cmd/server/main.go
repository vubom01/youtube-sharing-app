package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	"github.com/youtubeSharing/connectors/mysql"
	"github.com/youtubeSharing/services/auth"
	"github.com/youtubeSharing/services/posts"
	"github.com/youtubeSharing/services/youtube"
	"log"
	"net/http"
	"os"
)

func initRouter() *gin.Engine {
	gin.SetMode(os.Getenv("GIN_MODE"))
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}))
	router.GET("/ws", handleWebSocket)
	authHandler := auth.NewHandler()
	postsHandler := posts.NewHandler()
	youtubeHandler := youtube.NewHandler()
	router.POST("/api/v1/login", authHandler.Login)
	router.GET("/api/v1/posts", postsHandler.List)
	router.GET("/api/v1/youtube", youtubeHandler.Detail)

	authInterceptor := auth.NewInterceptor()
	router.Use(authInterceptor.Authentication())

	router.GET("/api/v1/me", authHandler.Me)

	router.POST("/api/v1/posts", postsHandler.CreatePost)
	return router
}

// @title User API documentation
// @BasePath /
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading env: %s", err.Error())
	}

	err = mysql.Connect()
	if err != nil {
		log.Fatalf("Error connecting to mysql: %s", err.Error())
	}

	router := initRouter()
	err = router.Run()
	if err != nil {
		log.Fatalf("Error starting server: %s", err.Error())
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade failed:", err)
		return
	}
	defer conn.Close()

	log.Println("New WebSocket connection established")

	for {
		// Read message from client
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("WebSocket read error:", err)
			break
		}
		log.Printf("Received: %s\n", msg)

		// Echo message back to client
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println("WebSocket write error:", err)
			break
		}
	}
}
