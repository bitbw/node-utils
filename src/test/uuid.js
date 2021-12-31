/*
 * @Description:  根据数组生成带 uuid sql 预计 
 * @Autor: Bowen
 * @Date: 2021-11-29 17:05:20
 * @LastEditors: Bowen
 * @LastEditTime: 2021-12-31 16:59:01
 */


const { v4: uuid } = require("uuid");

const { DateFormat, oneDay, oneHours } = require("../utils/date");
const dateFormat = DateFormat();
let directoryListsOrgin = [
  [
    {
      tag: "视频",
      tagType: "video",
      title: "简介",
      progress: 10,
      vid: "h3310llutmb",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "高可靠性",
      progress: 100,
      vid: "f3310kz6u85",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "精选高品质部件",
      progress: 0,
      vid: "i3310q456k5",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "高安全性",
      progress: 0,
      vid: "v3310ckl2i9",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "产品核心优势",
      progress: 0,
      vid: "f3310vldg9b",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "企业级优选平台",
      progress: 0,
      vid: "c3310xec5gp",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "云原生支持",
      progress: 0,
      vid: "n3310t30h5k",
    },
    {
      tag: "文章",
      tagType: "PDF",
      title: "浪潮K1 Power K8880G2产品介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/%E6%B5%AA%E6%BD%AEK1%20Power%20K8880G2%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8DV1.00.20210629.pdf",
    },
  ],
  [
    {
      tag: "视频",
      tagType: "video",
      title: "处理器简介",
      progress: 0,
      vid: "t3310hzcvgh",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "全新微架构",
      progress: 0,
      vid: "o3310c3m08f",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "全新IO",
      progress: 0,
      vid: "e33107gic3k",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "全新CAPI",
      progress: 0,
      vid: "o3310vtejlk",
    },
    {
      tag: "视频",
      tagType: "video",
      title: "性能优势总结",
      progress: 0,
      vid: "p3310702v84",
    },
    {
      tag: "文章",
      tagType: "PDF",
      title: "POWER9处理器介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/2.POWER9%E5%A4%84%E7%90%86%E5%99%A8%E4%BB%8B%E7%BB%8D.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "高可用和容灾解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power解决方案-高可用V1.00.20210706.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "数据库解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power解决方案-数据库V1.01.20210707.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "云和虚拟化解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power解决方案-云和虚拟化V1.03.20210712.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "交通场景解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-交通v1.00.20210729.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "金融非核心应用解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-金融非核心应用v1.01.20210730.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "金融核心应用解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-金融核心应用v1.02.20210730.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "能源场景解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-能源v1.02.20210805.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "企业场景解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-企业v1.01.20210813.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "政府场景解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-政府v1.02.20210805.pdf",
    },
  ],
  [
    {
      tag: "文章",
      tagType: "PDF",
      title: "医疗场景解决方案介绍",
      progress: 0,
      downloadUrl:
        "https://bitbw.top/public/pdf/浪潮K1 Power行业解决方案-医疗v1.00.20210729.pdf",
    },
  ],
];
const courses = [
  {
    // 全部播放完毕
    allPlayed: true,
    imageUrl: "https://bitbw.top/public/K8880G2介绍.png",
    subTitle: "浪潮K1 Power K8880G2产品介绍",
    title: "浪潮K1 Power K8880G2产品介绍",
    lable: "产品介绍",
    category: "产品介绍",
    content: "浪潮K1 Power K8880G2产品介绍",
    lecturer: "贾广胤",
    releaseTime: "2021年11月3日",
    introduction:
      "课程分为7个小节：从产品简介、系统高可靠性、精选高品质部件、系统高安全性、产品核心优势、为企业级应用优选平台及云原生支持等特点介绍K1 Power K8880G2产品。",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/Power9处理器介绍封面图.png",
    subTitle: "POWER9处理器介绍",
    title: "POWER9处理器介绍",
    lable: "产品介绍",
    category: "产品介绍",
    content: "POWER9处理器介绍",
    lecturer: "贾广胤",
    releaseTime: "2021年11月3日",
    introduction:
      "课程分为5个小节：从处理器简介、全新微架构、全新IO、全新CAPI、性能优势总结等几个方面介绍了POWER9处理器的亮点、优势",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/img/1高可用.jpg",
    title: "高可用和容灾解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "冯健",
    releaseTime: "2021年11月3日",
    introduction:
      "数字化转型中保障业务连续性所面临的挑战日益凸显，浪潮K1 Power可提供完整的高可用与容灾解决方案，帮助企业构建安全可靠的关键应用高可用和容灾体系。",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/img/2数据库.jpg",
    title: "数据库解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "李松青，荆德才",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power产品是商业集中式数据库的最佳平台，国产数据库的首选平台，开源/分布式数据库的优选平台。文档系统介绍了K1 Power在各类数据库场景的优势和布局，为客户在平台选择提供参考方案",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/img/3云和虚拟化.jpg",
    title: "云和虚拟化解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "姚鹏飞",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 POWER服务器生而为云，可根据客户业务需求提供弹性资源调度、虚拟化资源池、核心私有云、混合云、行业云等多种多级别云和虚拟化解决方案，承载核心高价值数据",
  },
  {
    // 全部播放完毕
    allPlayed: true,
    imageUrl: "https://bitbw.top/public/img/4交通.jpg",
    title: "交通场景解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "荆德才",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power与国内负责运输的主流软件开发商提供完整的核心应用解决方案，提供安全、可靠、高效的关键基础架构平台，原生支持云部署方式，可轻松从现有数据库平滑迁移，最小化业务升级改造的风险",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/img/5金融非核心.jpg",
    title: "金融非核心应用解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "姚鹏飞，冯玥",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power在金融行业与ISV合作伙伴打造多种金融非核心应用解决方案，提供稳定可靠、安全高效的硬件基础架构平台",
  },
  {
    // 全部播放完毕
    allPlayed: true,
    imageUrl: "https://bitbw.top/public/img/6金融.jpg",
    title: "金融核心应用解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "姚鹏飞，齐松涛",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power在金融行业与ISV合作伙伴打造多种金融核心应用解决方案，提供稳定可靠、安全高效的业务平台",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/img/7能源.jpg",
    title: "能源场景解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "姚鹏飞",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power在能源行业与ISV合作伙伴打造一体化解决方案，为客户提供从计算、存储、数据库、操作系统至应用层一体化全国产方案",
  },
  {
    // 全部播放完毕
    allPlayed: true,
    imageUrl: "https://bitbw.top/public/img/8企业.jpg",
    title: "企业场景解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "郭卯新",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power为企业客户提供高效、稳定、安全、易于管理的ERP、MES等解决方案，支撑企业系统高效稳定运行。",
  },
  {
    // 全部播放完毕
    allPlayed: true,
    imageUrl: "https://bitbw.top/public/img/9政府.jpg",
    title: "政府场景解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "董奇",
    releaseTime: "2021年11月3日",
    introduction:
      "浪潮K1 Power为税务、社保、医保等业务提供安全、可靠、高效的关键基础架构平台，原生支持云部署方式，可轻松从现有数据库平滑迁移，最小化业务升级改造的风险",
  },
  {
    // 全部播放完毕
    allPlayed: false,
    imageUrl: "https://bitbw.top/public/img/10医疗.jpg",
    title: "医疗场景解决方案介绍",
    lable: "解决方案",
    category: "解决方案",
    lecturer: "王刚，苏宁",
    releaseTime: "2021年11月3日",
    introduction:
      "文档用于讲解浪潮K1 Power在医疗行业的相关解决方案，主要包括HIS、PACS系统",
  },
];

// 具体课时
function genDirectoryList(directoryListsOrgin, course_uuids) {
  const str =
    "INSERT INTO `t_training_course_section` (`uuid`, `course_uuid`, `title`, `sequence`, `timespan`, `score`, `type`, `source`, `source2`) VALUES ";
  const values = [];
  for (const [dindex, directoryList] of directoryListsOrgin.entries()) {
    const course_uuid = course_uuids[dindex];
    for (const [index, item] of directoryList.entries()) {
      values.push(
        `('${uuid()}','${course_uuid}','${item.title}','${
          index + 1
        }','00:23:45', '2.1', '${item.tagType == "video" ? 1 : 2}','${
          item.tagType == "video" ? item.vid : item.downloadUrl
        }','')`
      );
    }
  }

  const sql = str + values.join(",");
  console.log("Bowen: genSql -> sql", sql);
}

// 课程
function genCourse() {
  const str =
    "INSERT INTO `t_training_course` (`uuid`, `catagroy_uuid`, `author_uuid`, `title`, `description`, `image`, `publish_datetime`, `total_score`, `count`, `state`) VALUES ";
  const values = [];
  const uuids = [];
  for (const [index, item] of courses.entries()) {
    const currentUuid = uuid();
    const rundomNum = (num = 12) => Math.floor(Math.random() * num);
    uuids.push(currentUuid);
    values.push(
      `('${currentUuid}', '${
        item.category == "解决方案"
          ? "08245bc2-d621-342b-391a-eccc62834c3c"
          : "d72679bb-e3d5-456e-a3b0-291b2986efb0"
      }','03489ea5-d227-472b-860d-ecdf80640d9a', '${item.title}', '${
        item.introduction
      }','${item.imageUrl}', '${dateFormat(
        new Date(Date.now() - (rundomNum() * oneDay - rundomNum() * oneHours))
      )}', '100', '1', '0')`
    );
  }
  const sql = str + values.join(",");
  console.log("Bowen: genCourse -> sql", sql);
  console.log("Bowen: genCourse -> currentUuid", uuids);
  return uuids;
}
// genSql();
// genSql1();

function genCourseData() {
  let uuids = genCourse(courses);
  genDirectoryList(directoryListsOrgin, uuids);
}

genCourseData();
