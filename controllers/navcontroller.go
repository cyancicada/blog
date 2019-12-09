package controllers

import (
	"blog/common"
	"blog/logic"
	"encoding/json"
	"github.com/astaxie/beego/validation"
)

type (
	NavController struct {
		BaseController
		columnLogic logic.ColumnLogic
	}
)

var (
	ErrorPost     = common.NewBaseError(20001, "参数错误")
	ErrorNotFound = common.NewBaseError(20002, "没有找到相关记录")
)

func NewNavController(columnLogic logic.ColumnLogic) *NavController {
	return &NavController{
		columnLogic: columnLogic,
	}
}
func (c *NavController) Get() {

	data, err := c.columnLogic.List()
	common.HttpResponse(c.Ctx, data, err)
}
func (c *NavController) Post() {
	r := new(logic.ColumnAddRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); err != nil {
		common.HttpResponse(c.Ctx, nil, ErrorPost)
	}
	valid := new(validation.Validation)
	valid.Required(r.Name, "name").Message("栏目名称不能为空")
	valid.Required(r.Link, "link").Message("栏目链接不能为空")
	if valid.HasErrors() {
		for _, e := range valid.Errors {
			common.HttpResponse(c.Ctx,
				nil,
				common.NewBaseError(common.ErrFromValid, e.Message))
			return
		}
	}
	common.HttpResponse(c.Ctx, nil, c.columnLogic.ColumnAddOrUpdate(r))
}

func (c *NavController) Delete() {
	r := new(logic.ColumnIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); err != nil {
		common.HttpResponse(c.Ctx, nil, ErrorPost)
	}
	common.HttpResponse(c.Ctx, nil, c.columnLogic.Delete(r))
}

func (c *NavController) Info() {
	r := new(logic.ColumnIdRequest)
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, r); err != nil {
		common.HttpResponse(c.Ctx, nil, ErrorPost)
	}
	res, err := c.columnLogic.Find(r)

	common.HttpResponse(c.Ctx, res, err)
}
