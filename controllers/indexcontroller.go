package controllers

import (
	"blog/common"
	"blog/logic"
	"encoding/json"
)

type (
	IndexController struct {
		BaseController
		indexLogic logic.IndexLogic
	}
)

func NewIndexController(
	indexLogic logic.IndexLogic,
) *IndexController {
	return &IndexController{
		indexLogic: indexLogic,
	}
}

func (c *IndexController) Get() {
	data,err := c.indexLogic.Index(new(logic.IndexRequest))
	common.HttpResponse(c.Ctx, data, err)
}
func (c *IndexController) ColumnArticle() {
	r  := new(logic.ColumnArticleRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); nil != err {
		common.HttpResponse(c.Ctx, nil, err)
		return
	}
	data,err := c.indexLogic.ColumnArticle(r)
	common.HttpResponse(c.Ctx, data, err)
}
