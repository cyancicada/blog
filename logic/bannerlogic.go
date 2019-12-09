package logic

import (
	"blog/models"
	"github.com/astaxie/beego"
)

type (
	BannerLogic struct {
		bannerModel models.BannerModel
	}
	BannerAddRequest struct {
		Id     int    `json:"id,optional"`
		Title  string `json:"title"`
		Link   string `json:"link"`
		Image  string `json:"image"`
		Status int    `json:"status,optional"`
	}
	BannerIdRequest struct {
		Id int `json:"id"`
	}
	BannerListResponse []*BannerView

	BannerView struct {
		Id         int    `json:"id,optional"`
		Title      string `json:"title"`
		Link       string `json:"link"`
		Status     string `json:"status"`
		Image      string `json:"image"`
		CreateTime string `json:"createTime"`
	}
	BannerOneResponse struct {
		Id        int    `json:"id,optional"`
		Title     string `json:"title"`
		Link      string `json:"link"`
		Image     string `json:"image"`
		ImagePath string `json:"imagePath"`
		Status    int    `json:"status,optional"`
	}
)

const (
	DelStatus     = 2
	ShelfStatus   = 1
	DefaultStatus = 0
)

var (
	StatusMap = map[int]string{
		DefaultStatus: "未显示",
		ShelfStatus:   "显示",
		DelStatus:     "删除",
	}
	LocalImgHost = beego.AppConfig.String("localImageHost")+beego.AppConfig.String("uploaddir")
)

func NewBannerLogic(bannerModel models.BannerModel) BannerLogic {

	return BannerLogic{
		bannerModel: bannerModel,
	}
}

func (l *BannerLogic) Add(r *BannerAddRequest) error {

	if err := l.bannerModel.Add(&models.Banner{
		Title: r.Title,
		Link:  r.Link,
		Image: r.Image,
	}); nil != err {
		return err
	}
	return nil
}

func (l *BannerLogic) BannerAddOrUpdate(r *BannerAddRequest) error {
	if r.Id > 0 {
		return l.UpdateById(r)

	}
	return l.Add(r)

}
func (l *BannerLogic) UpdateById(r *BannerAddRequest) error {

	if err := l.bannerModel.UpdateById(&models.Banner{
		Title: r.Title,
		Link:  r.Link,
		Id:    r.Id,
		Image: r.Image,
	}); nil != err {
		return err
	}
	return nil
}
func (l *BannerLogic) Delete(r *BannerIdRequest) error {

	if err := l.bannerModel.Delete(&models.Banner{Id: r.Id}); nil != err {
		return err
	}
	return nil
}
func (l *BannerLogic) Find(r *BannerIdRequest) (*BannerOneResponse, error) {
	c, err := l.bannerModel.FindById(r.Id)
	if nil != err {
		return nil, err
	}
	return &BannerOneResponse{
		Id: c.Id, Link: c.Link, Title: c.Title, Image: LocalImgHost + c.Image,ImagePath:c.Image,
	}, nil
}
func (l *BannerLogic) List() (*BannerListResponse, error) {

	data, err := l.bannerModel.AllByStatus(DelStatus)
	if nil != err {
		return nil, err
	}
	var response BannerListResponse
	for _, d := range data {
		response = append(response, &BannerView{
			Id:         d.Id,
			Link:       d.Link,
			Title:      d.Title,
			Image:      LocalImgHost + d.Image,
			Status:     StatusMap[d.Status],
			CreateTime: d.CreateTime.Format(timeFormat),
		})
	}
	return &response, nil
}
