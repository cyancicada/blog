package models

import (
	"github.com/astaxie/beego/orm"
	"time"
)

type (
	Banner struct {
		Id         int       `orm:"column(id)"`
		Title      string    `orm:"column(title)"`
		Status     int       `orm:"column(status)"`
		Link       string    `orm:"column(link)"`
		Image      string    `orm:"column(image)"`
		CreateTime time.Time `orm:"column(create_time)"`
		UpdateTime time.Time `orm:"column(update_time)"`
	}
	BannerModel struct {
	}
)

func NewBannerModel() BannerModel {
	return BannerModel{}
}
func (m *BannerModel) Add(b *Banner) error {
	if _, err := orm.NewOrm().Insert(b); nil != err {
		return err
	}
	return nil
}
func (m *BannerModel) UpdateById(b *Banner) error {
	if _, err := orm.NewOrm().Update(b); nil != err {
		return err
	}
	return nil
}
func (m *BannerModel) Delete(b *Banner) error {
	if _, err := orm.NewOrm().Delete(b); nil != err {
		return err
	}
	return nil
}
func (m *BannerModel) FindById(id int) (*Banner, error) {
	c := new(Banner)
	if err := orm.NewOrm().Raw("SELECT * FROM "+m.TableName()+" WHERE id = ?", id).QueryRow(c);
		nil != err {
		return nil, err
	}
	return c, nil
}

func (m *BannerModel) AllByStatus(status int) ([]*Banner, error) {
	cs := make([]*Banner, 0)
	if _, err := orm.NewOrm().Raw("SELECT * FROM "+m.TableName()+" WHERE status != ?", status).QueryRows(&cs); nil != err {

		return nil, err
	}
	return cs, nil
}
func (m *BannerModel) TableName() string {
	return "`banner`"
}
func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Banner))
}
