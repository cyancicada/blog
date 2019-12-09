package logic

import (
	"blog/common"
	"blog/models"
)

type (
	IndexLogic struct {
		articleModel models.ArticleModel
		columnModel  models.ColumnModel
		bannerModel  models.BannerModel
	}
	IndexRequest struct {
	}
	IndexResponse struct {
		Column        []*ColumnIndexView   `json:"column"`
		Banner        []*BannerIndexView   `json:"banner"`
		BannerRight   []*BannerRightView   `json:"bannerRight"`
		NewestArticle []*NewestArticleView `json:"newestArticle"`
		Ranks         []*SimpleArticleView `json:"ranks"`
		ForYou        []*SimpleArticleView `json:"forYou"`
	}
	SimpleArticleView struct {
		Id    int    `json:"id"`
		Title string `json:"title"`
	}
	ColumnIndexView struct {
		Id   int    `json:"id"`
		Name string `json:"name"`
		Link string `json:"link"`
	}
	ColumnArticleRequest struct {
		Page     int `json:"page"`
		PageSize int `json:"pageSize"`
		ColumnId int `json:"columnId"`
	}
	NewestArticleView struct {
		Image      string `json:"image"`
		Title      string `json:"title"`
		Intro      string `json:"intro"`
		ColumnName string `json:"columnName"`
		ViewNum    int    `json:"viewNum"`
		Id         int    `json:"id"`
		LikesNum   int    `json:"likesNum"`
		CreateTime string `json:"createTime"`
	}
	BannerRightView struct {
		Id         int    `json:"id"`
		ColumnName string `json:"columnName"`
		Image      string `json:"image"`
		Title      string `json:"title"`
	}
	BannerIndexView struct {
		Image string `json:"image"`
		Title string `json:"title"`
		Link  string `json:"link"`
	}
	ColumnArticleResponse struct {
		Articles *models.Paginator    `json:"articles"`
		Column   []*ColumnIndexView   `json:"column"`
		Ranks    []*SimpleArticleView `json:"ranks"`
		ForYou   []*SimpleArticleView `json:"forYou"`
	}
)

func NewIndexLogic(
	articleModel models.ArticleModel,
	columnModel models.ColumnModel,
	bannerModel models.BannerModel,
) IndexLogic {

	return IndexLogic{
		articleModel: articleModel,
		columnModel:  columnModel,
		bannerModel:  bannerModel,
	}
}

func (l *IndexLogic) Index(r *IndexRequest) (*IndexResponse, error) {

	res := &IndexResponse{
		Column:        make([]*ColumnIndexView, 0),
		Banner:        make([]*BannerIndexView, 0),
		BannerRight:   make([]*BannerRightView, 0),
		NewestArticle: make([]*NewestArticleView, 0),
		Ranks:         make([]*SimpleArticleView, 0),
		ForYou:        make([]*SimpleArticleView, 0),
	}
	banners, err := l.bannerModel.AllByStatus(DelStatus)
	if nil != err {
		return nil, err
	}
	for _, b := range banners {
		res.Banner = append(res.Banner, &BannerIndexView{
			Image: LocalImgHost + b.Image,
			Title: b.Title,
			Link:  b.Link,
		})
	}
	banners = nil;
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

	if len(columns) > 1 {
		columnFirst := columns[0]
		bRight, err := l.articleModel.FindByColumnIdAndLimit(columnFirst.Id, 2)
		if nil != err {
			return nil, err
		}
		for _, br := range bRight {
			res.BannerRight = append(res.BannerRight, &BannerRightView{
				Image:      LocalImgHost + br.Image,
				Id:         br.Id,
				ColumnName: columnMap[br.ColumnId],

				Title: br.Title,
			})
		}
	}
	newestArticle, err := l.articleModel.FindByLimit(50)
	if nil != err {
		return nil, err
	}
	for _, a := range newestArticle {
		res.NewestArticle = append(res.NewestArticle, &NewestArticleView{
			Image:      LocalImgHost + a.Image,
			Title:      a.Title,
			ColumnName: columnMap[a.ColumnId],
			CreateTime: a.CreateTime.Format(timeFormat),
			LikesNum:   a.LikesNum,
			ViewNum:    a.ViewNum,
			Id:         a.Id,
			Intro:      common.TrimHtml(a.Content, 100),
		})
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
	return res, nil
}

func (l *IndexLogic) ColumnArticle(r *ColumnArticleRequest) (*ColumnArticleResponse, error) {
	res := &ColumnArticleResponse{
		Column: make([]*ColumnIndexView, 0),
		Ranks:  make([]*SimpleArticleView, 0),
		ForYou: make([]*SimpleArticleView, 0),
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
	page, err := l.articleModel.FindByColumnId(r.ColumnId, r.Page, r.PageSize, DelStatus)
	articleViews := make([]*NewestArticleView, 0)
	for _, a := range *page.Model.(*[]*models.Article) {
		articleViews = append(articleViews, &NewestArticleView{
			Image:      LocalImgHost + a.Image,
			Title:      a.Title,
			ColumnName: columnMap[a.ColumnId],
			CreateTime: a.CreateTime.Format(timeFormat),
			LikesNum:   a.LikesNum,
			ViewNum:    a.ViewNum,
			Id:         a.Id,
			Intro:      common.TrimHtml(a.Content, 100),
		})
	}
	page.Model = nil
	page.Model = articleViews
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
	res.Articles = page
	return res, nil
}
