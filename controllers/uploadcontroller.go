package controllers

import (
	"blog/common"
	"blog/logic"
	"github.com/astaxie/beego"
	"github.com/xormplus/xorm"
	"path/filepath"
	"os"
)

type (
	UploadController struct {
		BaseController
	}
	UploadResponse struct {
		Src       string `json:"src"`
		ImagePath string `json:"imagePath"`
	}
)

func NewUploadController() *UploadController {
	return new(UploadController)
}

func (c *UploadController) Post() {
	file, header, err := c.GetFile("file")
	defer file.Close()
	ext := filepath.Ext(header.Filename)
	uploadPath := beego.AppConfig.String("uploaddir")
	fileName := xorm.NewShortUUID().String() + ext
	// 判断目录是否存在，不存在就创建
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		os.Mkdir(uploadPath, os.ModePerm)
	}
	newFileName := beego.AppConfig.String("uploaddir") + fileName
	err = c.SaveToFile("file", newFileName)
	common.HttpResponse(c.Ctx,
		&UploadResponse{Src: logic.LocalImgHost + fileName, ImagePath: fileName},
		err)
}
