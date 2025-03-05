package integration

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	"github.com/youtubeSharing/helper/migration"
	"log"
	"os"
	"path"
	"sync"

	// for integration test, must not be imported in any main.go
	_ "github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

// TestCase ...
type TestCase struct {
	DB *sqlx.DB
}

var initOnce sync.Once

var globalDB *sqlx.DB

// NewTestCase ...
func NewTestCase() *TestCase {

	initOnce.Do(func() {
		rootDir := findRootDir()
		err := godotenv.Load(rootDir + "/.env")
		if err != nil {
			log.Fatalf("Error loading env: %s", err.Error())
		}

		migration.MigrateUpForTesting(rootDir, os.Getenv("MYSQL_TEST"))

		db, _ := sqlx.Connect("mysql", os.Getenv("MYSQL_TEST"))

		globalDB = db
	})

	t := &TestCase{
		DB: globalDB,
	}
	return t
}

// Truncate tables before testing
func (t *TestCase) Truncate(tables ...string) {
	for _, table := range tables {
		t.DB.MustExec(fmt.Sprintf("TRUNCATE %s", table))
	}
}

func findRootDir() string {
	workdir, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	directory := workdir
	for {
		files, err := os.ReadDir(directory)
		if err != nil {
			panic(err)
		}
		for _, file := range files {
			if file.IsDir() {
				continue
			}
			if file.Name() == "go.mod" {
				return directory
			}
		}
		directory = path.Dir(directory)
	}
}
