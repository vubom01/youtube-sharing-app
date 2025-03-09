FROM golang:1.24-bullseye as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY ./ ./
RUN make install-tools
RUN go build -o bin/server cmd/server/main.go
RUN go build -o bin/migrate cmd/migrate/main.go

FROM ubuntu:20.04
WORKDIR /app/bin/
RUN apt-get update && apt-get install -y ca-certificates
COPY --from=builder /app/bin/ /app/bin/
COPY .env .env
COPY migration migration
EXPOSE 8000
CMD ["/bin/sh", "-c", "sleep 10 && ./migrate up && ./server"]
