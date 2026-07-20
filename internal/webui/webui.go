package webui

import (
	"embed"
	"io/fs"
	"net/http"
	"path"
	"strings"
)

//go:embed dist
var assets embed.FS

func Handler() http.Handler {
	dist, err := fs.Sub(assets, "dist")
	if err != nil {
		panic(err)
	}
	files := http.FileServer(http.FS(dist))

	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		requestedPath := strings.TrimPrefix(path.Clean(request.URL.Path), "/")
		if requestedPath != "." && requestedPath != "" {
			if _, err := fs.Stat(dist, requestedPath); err == nil {
				files.ServeHTTP(writer, request)
				return
			}
		}

		request.URL.Path = "/"
		files.ServeHTTP(writer, request)
	})
}
