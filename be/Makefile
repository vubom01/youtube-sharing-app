migrate-up:
	go run cmd/migrate/main.go up

migrate-down-1:
	go run cmd/migrate/main.go down 1

# make migrate name=create_table_example
migrate:
	echo \# make migrate name="$(name)"
	go run cmd/migrate/main.go create $(name)

run:
	go run cmd/server/main.go
