package models

import (
	"github.com/astaxie/beego/orm"
	"time"
)

type (
	//id           int(11)       (NULL)              NO      PRI     (NULL)             auto_increment               select,insert,update,references
	//title        varchar(255)  utf8mb4_general_ci  YES                                                             select,insert,update,references
	//content      text          utf8mb4_general_ci  YES             (NULL)                                          select,insert,update,references
	//view_num     int(11)       (NULL)              YES             0                                               select,insert,update,references
	//likes_num    int(11)       (NULL)              YES             0                                               select,insert,update,references
	//status       int(11)       (NULL)              YES             0                                               select,insert,update,references  0=>未上架，1=>上架，2=>删除
	//column_id    int(11)       (NULL)              YES             (NULL)                                          select,insert,update,references
	//delete_time  int(11)       (NULL)              YES             (NULL)                                          select,insert,update,references
	//create_time  timestamp     (NULL)              NO              CURRENT_TIMESTAMP                               select,insert,update,references
	//update_time  timestamp     (NULL)              NO              CURRENT_TIMESTAMP  on update CURRENT_TIMESTAMP  select,insert,update,references
	Article struct {
		Id         int       `orm:"column(id)"`
		Title      string    `orm:"column(title)"`
		Content    string    `orm:"column(content)"`
		Image      string    `orm:"column(image)"`
		Status     int       `orm:"column(status)"`
		ViewNum    int       `orm:"column(view_num)"`
		LikesNum   int       `orm:"column(likes_num)"`
		ColumnId   int       `orm:"column(column_id)"`
		ForYou     bool      `orm:"column(for_you)"`
		DeleteTime int       `orm:"column(delete_time)"`
		CreateTime time.Time `orm:"column(create_time)"`
		UpdateTime time.Time `orm:"column(update_time)"`
	}
	ArticleModel struct {
		Article
	}
)

func NewArticleModel() ArticleModel {
	return ArticleModel{}
}
func (m *ArticleModel) Add(b *Article) error {
	if _, err := orm.NewOrm().Insert(b); nil != err {
		return err
	}
	return nil
}
func (m *ArticleModel) UpdateById(b *Article) error {
	if _, err := orm.NewOrm().Update(b); nil != err {
		return err
	}
	return nil
}
func (m *ArticleModel) LikeById(id int, add bool) error {
	qs := "UPDATE " + m.TableName() + " SET `likes_num` = `likes_num` + 1 WHERE id = ?"
	if !add {
		qs = "UPDATE " + m.TableName() + " SET `likes_num` = `likes_num` - 1 WHERE id = ?"
	}
	if _, err := orm.NewOrm().Raw(qs, id).Exec(); nil != err {
		return err
	}
	return nil
}
func (m *ArticleModel) IncrViewNumById(id int) error {
	qs := "UPDATE " + m.TableName() + " SET `view_num` = `view_num` + 1 WHERE id = ?"
	if _, err := orm.NewOrm().Raw(qs, id).Exec(); nil != err {
		return err
	}
	return nil
}
func (m *ArticleModel) Delete(b *Article) error {
	if _, err := orm.NewOrm().Delete(b); nil != err {
		return err
	}
	return nil
}
func (m *ArticleModel) FindById(id int) (*Article, error) {
	c := new(Article)
	if err := orm.NewOrm().Raw("SELECT * FROM "+m.TableName()+" WHERE id = ?", id).QueryRow(c);
		nil != err {
		return nil, err
	}
	return c, nil
}

func (m *ArticleModel) FindByColumnIdAndLimit(columnId, limit int) ([]*Article, error) {
	cs := make([]*Article, 0)
	if _, err := orm.NewOrm().
		Raw("SELECT * FROM "+m.TableName()+" WHERE column_id = ?  ORDER BY create_time DESC LIMIT 0,?", columnId, limit).
		QueryRows(&cs);
		nil != err {
		return nil, err
	}
	return cs, nil
}

func (m *ArticleModel) FindRank(limit int) ([]*Article, error) {
	cs := make([]*Article, 0)
	if _, err := orm.NewOrm().
		Raw("SELECT * FROM "+m.TableName()+"  ORDER BY view_num DESC LIMIT 0,?", limit).
		QueryRows(&cs);
		nil != err {
		return nil, err
	}
	return cs, nil
}
func (m *ArticleModel) FindForYou(limit int) ([]*Article, error) {
	cs := make([]*Article, 0)
	if _, err := orm.NewOrm().
		Raw("SELECT * FROM "+m.TableName()+" WHERE for_you = ? ORDER BY create_time DESC LIMIT 0,?", 1, limit).
		QueryRows(&cs);
		nil != err {
		return nil, err
	}
	return cs, nil
}

func (m *ArticleModel) FindByLimit(limit int) ([]*Article, error) {
	cs := make([]*Article, 0)
	if _, err := orm.NewOrm().
		Raw("SELECT * FROM "+m.TableName()+"  ORDER BY create_time DESC LIMIT 0,?", limit).
		QueryRows(&cs);
		nil != err {
		return nil, err
	}
	return cs, nil
}

func (m *ArticleModel) AllByStatus(page, pageSize, status int) (*Paginator, error) {
	cs := make([]*Article, 0)
	countSql := "SELECT COUNT(*) as total FROM " + m.TableName() + " WHERE status != ?"
	selectSql := "SELECT *  FROM " + m.TableName() + " WHERE status != ? ORDER BY create_time DESC"
	param := make([]interface{}, 0)
	param = append(param, status)
	p := &Paginator{
		CountSql:   countSql,
		SelectSql:  selectSql,
		DataSource: orm.NewOrm(),
		Model:      &cs,
		Params:     param,
		Page:       page,
		PageSize:   pageSize,
	}
	return p.Paginate()
}
func (m *ArticleModel) FindByColumnId(columnId, page, pageSize, status int) (*Paginator, error) {
	cs := make([]*Article, 0)
	countSql := "SELECT COUNT(*) as total FROM " + m.TableName() + " WHERE status != ? AND column_id = ?"
	selectSql := "SELECT *  FROM " + m.TableName() + " WHERE status != ? AND column_id = ?  ORDER BY create_time DESC"
	param := make([]interface{}, 0)
	param = append(param, status, columnId)
	p := &Paginator{
		CountSql:   countSql,
		SelectSql:  selectSql,
		DataSource: orm.NewOrm(),
		Model:      &cs,
		Params:     param,
		Page:       page,
		PageSize:   pageSize,
	}
	return p.Paginate()
}
func (m *Article) TableName() string {
	return "articles"
}
func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Article))
}
