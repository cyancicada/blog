package controllers

import (
	"blog/common"
	"blog/logic"
	"encoding/json"
)

type (
	ArticleInfoController struct {
		BaseController
		articleInfoLogic logic.ArticleInfoLogic
	}
)

func NewArticleInfoController(
	articleInfoLogic logic.ArticleInfoLogic,
) *ArticleInfoController {
	return &ArticleInfoController{
		articleInfoLogic: articleInfoLogic,
	}
}

func (c *ArticleInfoController) Post() {
	r := new(logic.ArticleIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
		return
	}
	data, err := c.articleInfoLogic.Detail(r)
	common.HttpResponse(c.Ctx, data, err)
}

func (c *ArticleInfoController) Like() {
	r := new(logic.ArticleIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
		return
	}
	err := c.articleInfoLogic.Like(r)
	common.HttpResponse(c.Ctx, nil, err)
}

func (c *ArticleInfoController) DeleteLike() {
	r := new(logic.ArticleIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
		return
	}
	err := c.articleInfoLogic.DeleteLike(r)
	common.HttpResponse(c.Ctx, nil, err)
}
