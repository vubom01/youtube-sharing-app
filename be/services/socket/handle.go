package socket

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/youtubeSharing/helper/jwt"
	"log"
	"net/http"
	"sync"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	Subprotocols: []string{"access-token"},
}

var (
	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan []byte)
	mutex     = sync.Mutex{}
)

func HandleWebSocket(c *gin.Context) {
	token := c.GetHeader("Sec-WebSocket-Protocol")
	_, _, err := jwt.ValidateToken(token)
	if err != nil {
		log.Println("WebSocket connect failed: no permission", token)
		c.Abort()
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, http.Header{
		"Sec-WebSocket-Protocol": {token},
	})
	if err != nil {
		log.Println("WebSocket upgrade failed:", err)
		return
	}
	defer func(conn *websocket.Conn) {
		err := conn.Close()
		if err != nil {
			log.Println("WebSocket close failed:", err)
			return
		}
	}(conn)

	log.Println("New WebSocket connection established")

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			mutex.Lock()
			delete(clients, conn)
			mutex.Unlock()
			break
		}
		log.Printf("Received: %s\n", msg)

		broadcast <- msg
	}
}

func Broadcaster() {
	for {
		msg := <-broadcast
		mutex.Lock()
		for conn := range clients {
			err := conn.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Println("Write error:", err)
				err := conn.Close()
				if err != nil {
					log.Println("WebSocket upgrade failed:", err)
					return
				}
				delete(clients, conn)
			}
		}
		mutex.Unlock()
	}
}
