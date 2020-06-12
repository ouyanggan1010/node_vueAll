module.exports = app => {
  const router = require("express").Router({
    //将路由参数合并到子路由也可访问
    mergeParams: true
  });

  //引用数据库模型
  //第一种，有路径的
  const Category = require("../../models/Category");
  const Article = require("../../models/Article");
  const Hero = require("../../models/Hero");
  //第二种直接通过数据库来取模型，不用写路径；但测试报错
  //const mongoose = require("mongoose");
  //const Article = mongoose.model("Article");

  //---------------录入新闻资讯数据的测试路由
  router.get("/news/init", async (req, res) => {
    //找到新闻分类的id
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    //通过新闻分类，找到它下面的所有子分类
    const cats = await Category.find()
      .where({ parent: parent })
      .lean();
    const newsTitles = [
      "王者音乐课：五岳山河志",
      "【虎牙大腿杯S3】玩法升级，火热开战！",
      "体验服爆料丨全新玩法万镜觉醒，爽快翻5倍！",
      "新皮肤爆料丨白蛇再临西子湖畔，只为赴你千年之约！",
      "新星元部件爆料丨渐变马尾&amp;白金战服！伽罗换装出击~",
      "【英雄修炼】活动问题修复及优化补偿方案公告",
      "3月11日全服不停机更新公告",
      "3月10日全服不停机更新公告",
      "【已修复】英雄修炼活动页面显示异常说明",
      "3月10日体验服停机更新公告",
      "白色情人节【玫瑰芬芳，纸短情长】活动公告",
      "白色情人节 浪漫好礼来袭",
      "峡谷女神节 福利大集结",
      "【稷下修学游】活动公告",
      "伽罗星元上新 多重福利来袭",
      "王者荣耀国际巡回赛（KPLGT）2020年春季赛开赛时间公告",
      "2020年KPL春季赛大名单公布",
      "2020年KPL春季赛“云开赛”在即 全新视觉与六大城市主场来袭！",
      "高校联赛女神挑战赛周末开赛啦！来看高颜值组合强强联手",
      "你和那个TA会是峡谷校园最佳CP吗？高校联赛白色情人节开启CP大作战！"
    ];
    const newsList = newsTitles.map(title => {
      //将数组打乱slice(0)：获取新的数组，不引用原数组；
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        title,
        categories: randomCats.slice(0, 2)
      };
    });
    //往文章的数据库添加数据
    //deleteMany({})以任意条件取删除数据，清空所有数据
    await Article.deleteMany({});
    //insertMany(newsList)往数据库插入数据
    await Article.insertMany(newsList);

    res.send(newsList);
  });

  //-----------------------获取新闻资讯的接口
  router.get("/news/list", async (req, res) => {
    //---这种方式不能定义数据的条数
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // }).populate({
    //   path: "children",
    //   populate: {
    //     path: "newsList"
    //   }
    // });
    //---聚合查询
    const parent = await Category.findOne({
      name: "新闻分类"
    });
    //aggregate聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      {
        $addFields: {
          newsList: {
            $slice: ["$newsList", 5]
          }
        }
      }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate("categories")
        .limit(5)
        .lean()
    });
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });

  //---------------录入英雄数据的测试路由
  router.get('/heroes/init',async(req,res)=>{
    await Hero.deleteMany({});
    const rawData = [{"name":"热门","heroes":[{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"}]},{"name":"战士","heroes":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"曹操","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"杨戬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"狂铁","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"李信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"曜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"},{"name":"马超","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"}]},{"name":"法师","heroes":[]},{"name":"坦克","heroes":[]},{"name":"刺客","heroes":[]},{"name":"射手","heroes":[]},{"name":"辅助","heroes":[]}]
    for(let cat of rawData){
      if(cat.name == '热门'){
        //跳过本次循环
        continue;
      }
      //当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name:cat.name
      })
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category];
        return hero;
      });
      //录入英雄
      await Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  })

  //-----------------------获取英雄列表的接口
  router.get("/heroes/list", async (req, res) => {
    //---聚合查询
    const parent = await Category.findOne({
      name: "英雄分类"
    });
    //aggregate聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "heroes",
          localField: "_id",
          foreignField: "categories",
          as: "heroList"
        }
      }
    ]);
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      heroList: await Hero.find()
        .where({
          categories: { $in: subCats }
        })
        .limit(10)
        .lean()
    });
    res.send(cats);
  });

  //-----------------------获取文章详情接口
  router.get('/articles/:id',async(req,res)=>{
    const model = await Article.findById(req.params.id).lean();
    model.related = await Article.find()
      .where({
        categories: { $in: model.categories }
      })
      .limit(2);
    res.send(model);
  });

  //-----------------------获取英雄详情接口
  router.get('/heroes/:id',async(req,res)=>{
    const model = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero').lean();
    res.send(model);
  })

  app.use("/web/api", router);
};
