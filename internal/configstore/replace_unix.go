//go:build !windows

package configstore

import "os"

func replaceFile(source, target string) error {
	return os.Rename(source, target)
}
