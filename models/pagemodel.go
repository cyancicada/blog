package models

import (
	"github.com/astaxie/beego/orm"
	"math"
)

type (
	/**
	dataSource 数据源
	modelList 数据数组  &[]*Model
	page int 当前分页
	*/
	Paginator struct {
		Page       int           `json:"page"`
		PageSize   int           `json:"pageSize"`
		Total      int           `json:"count"`
		TotalPage  int           `json:"totalPage"`
		More       bool          `json:"more"`
		Model      interface{}   `json:"list"`
		CountSql   string        `json:"_"`
		SelectSql  string        `json:"_"`
		Params     []interface{} `json:"_"`
		DataSource orm.Ormer     `json:"-"`
	}
	CountView struct {
		Total int `db:"total" json:"total"`
	}
)

func (p *Paginator) Paginate() (*Paginator, error) {
	count := new(CountView)
	err := p.DataSource.Raw(p.CountSql, p.Params...).QueryRow(count)
	if nil != err {
		return nil, err
	}
	p.Total = count.Total
	if p.PageSize == 0 {
		p.PageSize = 20
	}
	if p.Page <= 0 {
		p.Page = 1
	}
	s := (p.Page - 1) * p.PageSize
	p.SelectSql += " LIMIT ?,?"
	p.Params = append(p.Params, s, p.PageSize)

	if _, err = p.DataSource.Raw(p.SelectSql, p.Params...).QueryRows(p.Model); nil != err {
		return nil, err
	}
	p.More = true
	p.TotalPage = int(math.Ceil(float64(p.Total) / float64(p.PageSize)))
	if p.Page >= p.TotalPage {
		p.More = false
	}
	return p, err
}
