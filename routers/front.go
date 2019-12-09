package routers

import (
	"blog/controllers"
	"blog/logic"
	"blog/models"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
)

func init() {
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
		AllowCredentials: true,
	}))
	columnModel := models.NewColumnModel()
	bannerModel := models.NewBannerModel()
	articleModel := models.NewArticleModel()

	indexLogic := logic.NewIndexLogic(articleModel,columnModel,bannerModel)
	articleInfoLogic := logic.NewArticleInfoLogic(articleModel,columnModel,bannerModel)

	adminRouter := beego.NewNamespace(
		"/api",
		beego.NSNamespace("/index", beego.NSRouter("/", controllers.NewIndexController(indexLogic))),
		beego.NSNamespace("/index", beego.NSRouter("/column", controllers.NewIndexController(indexLogic),"post:ColumnArticle")),


		beego.NSNamespace("/article", beego.NSRouter("/", controllers.NewArticleInfoController(articleInfoLogic))),
		beego.NSNamespace("/article", beego.NSRouter("/like", controllers.NewArticleInfoController(articleInfoLogic),"post:Like")),
		beego.NSNamespace("/article", beego.NSRouter("/like", controllers.NewArticleInfoController(articleInfoLogic),"delete:DeleteLike")),


	)
	beego.AddNamespace(adminRouter)
}
