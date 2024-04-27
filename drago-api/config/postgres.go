package config

type postgres struct {
	Driver        string
	Uri           string
	MigrateTables bool
	MigrationFile string
}
