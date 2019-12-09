package logic

import (
	"blog/models"
)

type (
	ColumnLogic struct {
		columnModel models.ColumnModel
	}
	ColumnAddRequest struct {
		Id   int    `json:"id,optional"`
		Name string `json:"name"`
		Link string `json:"link"`
		Type string `json:"type"`
	}
	ColumnIdRequest struct {
		Id int `json:"id"`
	}
	ColumnAddResponse []*ColumnView

	ColumnView struct {
		Id         int    `json:"id"`
		Name       string `json:"name"`
		Link       string `json:"link"`
		CreateTime string `json:"createTime"`
	}
	ColumnOneResponse struct {
		Id   int    `json:"id"`
		Name string `json:"name"`
		Link string `json:"link"`
	}
)

const (
	timeFormat string = "2006-01-02 15:04:05"
)

func NewColumnLogic(columnModel models.ColumnModel) ColumnLogic {

	return ColumnLogic{
		columnModel: columnModel,
	}
}

func (l *ColumnLogic) Add(r *ColumnAddRequest) error {

	if err := l.columnModel.Add(&models.Column{
		Name: r.Name,
		Link: r.Link,
	}); nil != err {
		return err
	}
	return nil
}

func (l *ColumnLogic) ColumnAddOrUpdate(r *ColumnAddRequest) error {
	if r.Id > 0 {
		return l.UpdateById(r)

	}
	return l.Add(r)

}
func (l *ColumnLogic) UpdateById(r *ColumnAddRequest) error {

	if err := l.columnModel.UpdateById(&models.Column{
		Name: r.Name,
		Link: r.Link,
		Id:   r.Id,
	}); nil != err {
		return err
	}
	return nil
}
func (l *ColumnLogic) Delete(r *ColumnIdRequest) error {

	if err := l.columnModel.Delete(&models.Column{Id: r.Id}); nil != err {
		return err
	}
	return nil
}
func (l *ColumnLogic) Find(r *ColumnIdRequest) (*ColumnOneResponse, error) {
	c, err := l.columnModel.FindById(r.Id)
	if nil != err {
		return nil, err
	}
	return &ColumnOneResponse{
		Id: c.Id, Link: c.Link, Name: c.Name,
	}, nil
}
func (l *ColumnLogic) List() (*ColumnAddResponse, error) {

	data, err := l.columnModel.All()
	if nil != err {
		return nil, err
	}
	var response ColumnAddResponse
	for _, d := range data {
		response = append(response, &ColumnView{
			Id: d.Id, Link: d.Link, Name: d.Name, CreateTime: d.CreateTime.Format(timeFormat),
		})
	}
	return &response, nil
}
