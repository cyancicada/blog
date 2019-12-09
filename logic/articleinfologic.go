package logic

import (
	"blog/common"
	"blog/models"
)

type (
	ArticleInfoLogic struct {
		articleModel models.ArticleModel
		columnModel  models.ColumnModel
		bannerModel  models.BannerModel
	}
	ArticleInfoResponse struct {
		Column  []*ColumnIndexView   `json:"column"`
		Ranks   []*SimpleArticleView `json:"ranks"`
		ForYou  []*SimpleArticleView `json:"forYou"`
		Article *ArticleInfoView     `json:"article"`
	}
	ArticleInfoView struct {
		Id         int    `json:"id"`
		Title      string `json:"title"`
		Content    string `json:"content"`
		Image      string `json:"image"`
		ColumnName string `json:"columnName"`
		ViewNum    int    `json:"viewNum"`
		LikesNum   int    `json:"likesNum"`
		ColumnId   int    `json:"columnId"`
		Intro      string `json:"intro"`
		CreateTime string `json:"createTime"`
	}
)

func NewArticleInfoLogic(
	articleModel models.ArticleModel,
	columnModel models.ColumnModel,
	bannerModel models.BannerModel,
) ArticleInfoLogic {

	return ArticleInfoLogic{
		articleModel: articleModel,
		columnModel:  columnModel,
		bannerModel:  bannerModel,
	}
}
func (l *ArticleInfoLogic) Like(r *ArticleIdRequest) error {
	if err := l.articleModel.LikeById(r.Id, true); nil != err {
		return err
	}
	return nil
}
func (l *ArticleInfoLogic) DeleteLike(r *ArticleIdRequest) error {
	if err := l.articleModel.LikeById(r.Id, false); nil != err {
		return err
	}
	return nil
}
func (l *ArticleInfoLogic) Detail(r *ArticleIdRequest) (*ArticleInfoResponse, error) {
	res := &ArticleInfoResponse{
		Ranks:  make([]*SimpleArticleView, 0),
		ForYou: make([]*SimpleArticleView, 0),
		Column: make([]*ColumnIndexView, 0),
	}
	columns, err := l.columnModel.All()
	if nil != err {
		return nil, err
	}
	columnMap := make(map[int]string)
	for _, c := range columns {
		res.Column = append(res.Column, &ColumnIndexView{
			Name: c.Name,
			Link: c.Link,
			Id:   c.Id,
		})
		columnMap[c.Id] = c.Name
	}
	viewRank, err := l.articleModel.FindRank(10)
	if nil != err {
		return nil, err
	}
	for _, r := range viewRank {
		res.Ranks = append(res.Ranks, &SimpleArticleView{
			Id: r.Id, Title: r.Title,
		})
	}

	forYous, err := l.articleModel.FindForYou(10)
	if nil != err {
		return nil, err
	}
	for _, fy := range forYous {
		res.ForYou = append(res.ForYou, &SimpleArticleView{
			Id: fy.Id, Title: fy.Title,
		})
	}
	one, err := l.articleModel.FindById(r.Id)
	if nil != err {
		return nil, err
	}
	res.Article = &ArticleInfoView{
		Id: one.Id, Title: one.Title, ColumnName: columnMap[one.ColumnId],
		Content: one.Content, ViewNum: one.ViewNum, Intro: common.TrimHtml(one.Content, 100),
		LikesNum: one.LikesNum, CreateTime: one.CreateTime.Format(timeFormat),
	}
	l.articleModel.IncrViewNumById(r.Id)
	return res, nil
}
