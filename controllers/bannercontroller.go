package controllers

import (
	"blog/common"
	"blog/logic"
	"encoding/json"
	"github.com/astaxie/beego/validation"
	"regexp"
)

type (
	BannerController struct {
		BaseController
		bannerLogic logic.BannerLogic
	}
)

func NewBannerController(bannerLogic logic.BannerLogic) *BannerController {
	return &BannerController{
		bannerLogic: bannerLogic,
	}
}

func (c *BannerController) List() {
	data, err := c.bannerLogic.List()
	common.HttpResponse(c.Ctx, data, err)
}

func (c *BannerController) Delete() {
	r := new(logic.BannerIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
	}
	err := c.bannerLogic.Delete(r)
	common.HttpResponse(c.Ctx, nil, err)
}

func (c *BannerController) Info() {
	r := new(logic.BannerIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
	}
	one,err := c.bannerLogic.Find(r)
	common.HttpResponse(c.Ctx, one, err)
}

func (c *BannerController) Post() {
	r := new(logic.BannerAddRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
	}
	valid := new(validation.Validation)
	valid.Required(r.Title, "title").Message("Banner名称不能为空")
	valid.Required(r.Link, "link").Message("Banner链接不能为空")
	valid.Match(r.Link, regexp.MustCompile(`^http.*`), "link").Message("Banner链接必须http开头")

	valid.Required(r.Image, "image").Message("Banner图不能为空")
	if valid.HasErrors() {
		for _, e := range valid.Errors {
			common.HttpResponse(c.Ctx,
				nil,
				common.NewBaseError(common.ErrFromValid, e.Message))
			return
		}
	}
	err := c.bannerLogic.BannerAddOrUpdate(r)
	common.HttpResponse(c.Ctx, nil, err)
}
