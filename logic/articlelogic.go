package logic

import (
	"blog/models"
)

type (
	ArticleLogic struct {
		articleModel models.ArticleModel
		columnModel  models.ColumnModel
	}
	ArticleAddRequest struct {
		Id       int    `json:"id,optional"`
		ColumnId int    `json:"columnId"`
		Content  string `json:"content"`
		Image    string `json:"image"`
		ForYou   bool   `json:"forYou"`
		Title    string `json:"title"`
	}
	ArticleIdRequest struct {
		Id int `json:"id"`
	}
	ArticleListRequest struct {
		Page     int `json:"page"`
		PageSize int `json:"page_size"`
	}
	ArticleListResponse *models.Paginator

	ArticleView struct {
		Id         int    `json:"id,optional"`
		ColumnId   int    `json:"column_id"`
		ColumnName string `json:"columnName"`
		Content    string `json:"content"`
		Title      string `json:"title"`
		CreateTime string `json:"createTime"`
		ForYou     bool   `json:"forYou"`
	}
	ArticleResponse struct {
		Id        int    `json:"id,optional"`
		ColumnId  int    `json:"column_id"`
		Title     string `json:"title"`
		Content   string `json:"content"`
		Image     string `json:"image"`
		ImagePath string `json:"imagePath"`
		ForYou    bool   `json:"forYou"`
	}
)

func NewArticleLogic(
	articleModel models.ArticleModel,
	columnModel models.ColumnModel,
) ArticleLogic {

	return ArticleLogic{
		articleModel: articleModel,
		columnModel:  columnModel,
	}
}

func (l *ArticleLogic) Add(r *ArticleAddRequest) error {

	if err := l.articleModel.Add(&models.Article{
		Title:      r.Title,
		ColumnId:   r.ColumnId,
		Content:    r.Content,
		Image:      r.Image,
		ForYou:     r.ForYou,
		DeleteTime: 0,
	}); nil != err {
		return err
	}
	return nil
}

func (l *ArticleLogic) ArticleAddOrUpdate(r *ArticleAddRequest) error {
	if r.Id > 0 {
		return l.UpdateById(r)

	}
	return l.Add(r)

}
func (l *ArticleLogic) UpdateById(r *ArticleAddRequest) error {

	if err := l.articleModel.UpdateById(&models.Article{
		Title:    r.Title,
		Content:  r.Content,
		ColumnId: r.ColumnId,
		Image:    r.Image,
		ForYou:   r.ForYou,
		Id:       r.Id,
	}); nil != err {
		return err
	}
	return nil
}
func (l *ArticleLogic) Delete(r *ArticleIdRequest) error {

	if err := l.articleModel.Delete(&models.Article{Id: r.Id}); nil != err {
		return err
	}
	return nil
}
func (l *ArticleLogic) Find(r *ArticleIdRequest) (*ArticleResponse, error) {
	c, err := l.articleModel.FindById(r.Id)
	if nil != err {
		return nil, err
	}
	return &ArticleResponse{
		Id: c.Id, Title: c.Title, ColumnId: c.ColumnId,
		Content: c.Content, Image: LocalImgHost + c.Image, ImagePath: c.Image,
	}, nil
}
func (l *ArticleLogic) List(r *ArticleListRequest) (*models.Paginator, error) {
	res, err := l.articleModel.AllByStatus(r.Page, r.PageSize, DelStatus)
	if nil != err {
		return nil, err
	}
	articleView := make([]*ArticleView, 0)
	columnIds := make([]interface{}, 0)
	for _, d := range *res.Model.(*[]*models.Article) {
		columnIds = append(columnIds, d.ColumnId)
		articleView = append(articleView, &ArticleView{
			Id:         d.Id,
			Content:    d.Content,
			Title:      d.Title,
			ColumnId:   d.ColumnId,
			CreateTime: d.CreateTime.Format(timeFormat),
		})
	}
	if len(columnIds) > 0 {
		columns, err := l.columnModel.FindByIds(columnIds)
		if nil != err {
			return nil, err
		}
		columnMap := make(map[int]string)
		for _, c := range columns {
			columnMap[c.Id] = c.Name
		}
		for _, a := range articleView {
			a.ColumnName = columnMap[a.ColumnId]
		}
	}
	res.Model = nil
	res.Model = articleView
	articleView = nil
	return res, nil
}
