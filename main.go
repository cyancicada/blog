package main

import (
	_ "blog/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	beego.Run()
}

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.Debug = true
	orm.NewLog(beego.BeeLogger)
	orm.RegisterDataBase("default", "mysql", beego.AppConfig.String("mysql"))
}
