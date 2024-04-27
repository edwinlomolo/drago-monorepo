package repositories

import "fmt"

func toKM(distance float64) string {
	if distance >= 1000 {
		return fmt.Sprintf("%.fKM", distance/1000)
	}

	return fmt.Sprintf("%.fM", distance)
}
