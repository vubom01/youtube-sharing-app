migrate-up:
	go run cmd/migrate/main.go up

migrate-down-1:
	go run cmd/migrate/main.go down 1

# make migrate name=create_table_example
migrate:
	echo \# make migrate name="$(name)"
	go run cmd/migrate/main.go create $(name)

go-gen:
	find . -name \*_mocks.go -type f -delete
	find . -name \*_wrapper.go -type f -delete
	go generate ./...

test:
	go test -count=1 -p 1 -covermode=count -coverprofile tc-coverage.cov ./...

run:
	go run cmd/server/main.go
