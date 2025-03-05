package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	"github.com/youtubeSharing/helper/migration"
	"log"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading env: %s", err.Error())
		return
	}
	cmd := migration.MigrateCommand(os.Getenv("MYSQL"))
	err = cmd.Execute()
	if err != nil {
		fmt.Println("ERROR:", err)
	}
}
