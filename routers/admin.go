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


	columnLogic := logic.NewColumnLogic(columnModel)
	bannerLogic := logic.NewBannerLogic(bannerModel)
	articleLgoic := logic.NewArticleLogic(articleModel,columnModel)

	adminRouter := beego.NewNamespace(
		"/admin",
		beego.NSNamespace("/nav", beego.NSRouter("/list", controllers.NewNavController(columnLogic))),

		beego.NSNamespace("/nav", beego.NSRouter("/", controllers.NewNavController(columnLogic))),
		///admin/nav/info
		beego.NSNamespace("/nav", beego.NSRouter("/info", controllers.NewNavController(columnLogic), "post:Info")),
		//banner
		beego.NSNamespace("/banner", beego.NSRouter("/list", controllers.NewBannerController(bannerLogic), "post:List")),
		beego.NSNamespace("/banner", beego.NSRouter("/", controllers.NewBannerController(bannerLogic))),
		beego.NSNamespace("/banner", beego.NSRouter("/info", controllers.NewBannerController(bannerLogic), "post:Info")),


		beego.NSNamespace("/article", beego.NSRouter("/list", controllers.NewArticleController(articleLgoic), "post:List")),
		beego.NSNamespace("/article", beego.NSRouter("", controllers.NewArticleController(articleLgoic))),
		beego.NSNamespace("/article", beego.NSRouter("/info", controllers.NewArticleController(articleLgoic),"post:Info")),


	beego.NSNamespace("/upload", beego.NSRouter("/", controllers.NewUploadController())),
	)
	beego.AddNamespace(adminRouter)
}
