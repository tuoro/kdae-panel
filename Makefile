.PHONY: dev build test fmt web-install web-build clean

BINARY := bin/kdae-panel

dev:
	go run ./cmd/kdae-panel

build: web-build
	go build -trimpath -ldflags "-s -w" -o $(BINARY) ./cmd/kdae-panel

test:
	go test ./...

fmt:
	gofmt -w cmd internal

web-install:
	cd web && npm ci

web-build:
	cd web && npm run build

clean:
	go clean
	rm -rf bin web/dist internal/webui/dist/assets

