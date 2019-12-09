package models

import (
	"github.com/astaxie/beego/orm"
	"time"
)

type (
	Column struct {
		Id         int       `orm:"column(id)"`
		Name       string    `orm:"column(name)"`
		Type       string    `orm:"column(type)"`
		Link       string    `orm:"column(link)"`
		CreateTime time.Time `orm:"column(create_time)"`
		UpdateTime time.Time `orm:"column(update_time)"`
	}
	ColumnModel struct {
	}
)

func NewColumnModel() ColumnModel {
	return ColumnModel{}
}
func (m *ColumnModel) Add(column *Column) error {
	if _, err := orm.NewOrm().Insert(column); nil != err {
		return err
	}
	return nil
}
func (m *ColumnModel) UpdateById(column *Column) error {
	if _, err := orm.NewOrm().Update(column); nil != err {
		return err
	}
	return nil
}
func (m *ColumnModel) Delete(column *Column) error {
	if _, err := orm.NewOrm().Delete(column); nil != err {
		return err
	}
	return nil
}
func (m *ColumnModel) FindById(id int) (*Column, error) {
	c := new(Column)
	if err := orm.NewOrm().Raw("SELECT * FROM "+m.TableName()+" WHERE id = ?", id).QueryRow(c);
		nil != err {
		return nil, err
	}
	return c, nil
}

func (m *ColumnModel) All() ([]*Column, error) {
	cs := make([]*Column, 0)
	if _, err := orm.NewOrm().Raw("SELECT * FROM " + m.TableName()+" ORDER BY id ASC").QueryRows(&cs); nil != err {

		return nil, err
	}
	return cs, nil
}
func (m *ColumnModel) FindByIds(ids []interface{}) ([]*Column, error) {
	cs := make([]*Column, 0)
	//qs.Filter("profile__age__in", 18, 20) // WHERE profile.age IN (18, 20)
	if _, err := orm.NewOrm().QueryTable(new(Column)).Filter("id__in",ids...).All(&cs);nil != err{
		return nil, err
	}
	return cs, nil
}
func (m *ColumnModel) TableName() string {
	return "`column`"
}
func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Column))
}
