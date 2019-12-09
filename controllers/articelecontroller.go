package controllers

import (
	"blog/common"
	"blog/logic"
	"encoding/json"
	"github.com/astaxie/beego/validation"
)

type (
	ArticleController struct {
		BaseController
		articleLogic logic.ArticleLogic
	}
)

func NewArticleController(
	articleLogic logic.ArticleLogic,
) *ArticleController {
	return &ArticleController{
		articleLogic: articleLogic,
	}
}

func (c *ArticleController) List() {
	p, _ := c.GetInt("page")
	ps, _ := c.GetInt("limit")
	r := &logic.ArticleListRequest{Page: p, PageSize: ps}
	data, err := c.articleLogic.List(r)

	common.HttpPageResponse(c.Ctx, data.Total, data.Model, err)
}

func (c *ArticleController) Delete() {
	r := new(logic.ArticleIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
	}
	err := c.articleLogic.Delete(r)
	common.HttpResponse(c.Ctx, nil, err)
}

func (c *ArticleController) Info() {
	r := new(logic.ArticleIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
	}
	one, err := c.articleLogic.Find(r)
	common.HttpResponse(c.Ctx, one, err)
}

func (c *ArticleController) Post() {
	r := new(logic.ArticleAddRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
	}
	valid := new(validation.Validation)
	valid.Required(r.Title, "title").Message("文章标题名称不能为空")
	valid.Required(r.ColumnId, "columnId").Message("请选择栏目")
	valid.Required(r.Content, "content").Message("文章内容不能空")
	if valid.HasErrors() {
		for _, e := range valid.Errors {
			common.HttpResponse(c.Ctx,
				nil,
				common.NewBaseError(common.ErrFromValid, e.Message))
			return
		}
	}
	err := c.articleLogic.ArticleAddOrUpdate(r)
	common.HttpResponse(c.Ctx, nil, err)
}
