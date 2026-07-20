package configstore

import (
	"fmt"
	"os"
)

func replaceFile(source, target string) error {
	displaced := target + ".kdae-panel-old"
	_ = os.Remove(displaced)
	targetExists := true
	if err := os.Rename(target, displaced); err != nil {
		if !os.IsNotExist(err) {
			return err
		}
		targetExists = false
	}
	if err := os.Rename(source, target); err != nil {
		if targetExists {
			if restoreErr := os.Rename(displaced, target); restoreErr != nil {
				return fmt.Errorf("%w；恢复被替换文件失败: %v", err, restoreErr)
			}
		}
		return err
	}
	if targetExists {
		_ = os.Remove(displaced)
	}
	return nil
}
