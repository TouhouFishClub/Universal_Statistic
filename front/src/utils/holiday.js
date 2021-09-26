const holiday = {
  "01-01": {"holiday": true, "name": "元旦", "wage": 3, "date": "2021-01-01"},
  "01-02": {"holiday": true, "name": "元旦", "wage": 2, "date": "2021-01-02"},
  "01-03": {"holiday": true, "name": "元旦", "wage": 2, "date": "2021-01-03"},
  "02-07": {"holiday": false, "name": "春节前补班", "after": false, "wage": 1, "target": "春节", "date": "2021-02-07"},
  "02-11": {"holiday": true, "name": "除夕", "wage": 2, "date": "2021-02-11"},
  "02-12": {"holiday": true, "name": "初一", "wage": 3, "date": "2021-02-12"},
  "02-13": {"holiday": true, "name": "初二", "wage": 3, "date": "2021-02-13"},
  "02-14": {"holiday": true, "name": "初三", "wage": 3, "date": "2021-02-14"},
  "02-15": {"holiday": true, "name": "初四", "wage": 2, "date": "2021-02-15"},
  "02-16": {"holiday": true, "name": "初五", "wage": 2, "date": "2021-02-16"},
  "02-17": {"holiday": true, "name": "初六", "wage": 2, "date": "2021-02-17"},
  "02-20": {"holiday": false, "name": "春节后补班", "after": true, "wage": 1, "target": "春节", "date": "2021-02-20"},
  "04-03": {"holiday": true, "name": "清明节", "wage": 2, "date": "2021-04-03"},
  "04-04": {"holiday": true, "name": "清明节", "wage": 3, "date": "2021-04-04"},
  "04-05": {"holiday": true, "name": "清明节", "wage": 2, "date": "2021-04-05"},
  "04-25": {"holiday": false, "name": "劳动节前补班", "after": false, "wage": 1, "target": "劳动节", "date": "2021-04-25"},
  "05-01": {"holiday": true, "name": "劳动节", "wage": 3, "date": "2021-05-01"},
  "05-02": {"holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-02"},
  "05-03": {"holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-03"},
  "05-04": {"holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-04"},
  "05-05": {"holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-05"},
  "05-08": {"holiday": false, "name": "劳动节后补班", "after": true, "wage": 1, "target": "劳动节", "date": "2021-05-08"},
  "06-12": {"holiday": true, "name": "端午节", "wage": 2, "date": "2021-06-12"},
  "06-13": {"holiday": true, "name": "端午节", "wage": 2, "date": "2021-06-13"},
  "06-14": {"holiday": true, "name": "端午节", "wage": 3, "date": "2021-06-14"},
  "09-18": {
    "holiday": false,
    "after": false,
    "name": "中秋节前补班",
    "wage": 1,
    "target": "中秋节",
    "date": "2021-09-18",
    "rest": 17
  },
  "09-19": {"holiday": true, "name": "中秋节", "wage": 2, "date": "2021-09-19", "rest": 18},
  "09-20": {"holiday": true, "name": "中秋节", "wage": 2, "date": "2021-09-20"},
  "09-21": {"holiday": true, "name": "中秋节", "wage": 3, "date": "2021-09-21", "rest": 1},
  "09-26": {
    "holiday": false,
    "after": false,
    "name": "国庆节前补班",
    "wage": 1,
    "target": "国庆节",
    "date": "2021-09-26",
    "rest": 1
  },
  "10-01": {"holiday": true, "name": "国庆节", "wage": 3, "date": "2021-10-01", "rest": 5},
  "10-02": {"holiday": true, "name": "国庆节", "wage": 3, "date": "2021-10-02", "rest": 1},
  "10-03": {"holiday": true, "name": "国庆节", "wage": 3, "date": "2021-10-03", "rest": 1},
  "10-04": {"holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-04", "rest": 1},
  "10-05": {"holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-05", "rest": 1},
  "10-06": {"holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-06", "rest": 1},
  "10-07": {"holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-07", "rest": 1},
  "10-09": {
    "holiday": false,
    "name": "国庆节后补班",
    "after": true,
    "wage": 1,
    "target": "国庆节",
    "date": "2021-10-09",
    "rest": 1
  }
}

const createLabel = dayOffset =>
  new Map(
    Object
      .values(holiday)
      .map(info => [~~(new Date(info.date).getTime() / 86400000), info])
  ).get(dayOffset)?.name
  ??
  (new Set([0, 6]).has((dayOffset + 4) % 7) ? '周末' : false)

export default createLabel
