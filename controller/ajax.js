// ajax请求
module.exports = {
  todo: {
    async list() {
      // yuanye：mock数据
      const list = [{
        id: 1,
        name: '测试测试1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nemo possimus temporibus dolore doloribus facere nisi, nostrum neque, quos qui. Reprehenderit, tempore sit odio deserunt numquam quia, delectus illo consequuntur!',
        createTime: Date.UTC(2018, 6, 10, 12),
        updateTime: Date.UTC(2018, 6, 12, 11),
        status: '已完成'
      }, {
        id: 2,
        name: '测试测试2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et sunt, nesciunt optio reprehenderit unde quas. Doloremque, perspiciatis. Possimus ad qui excepturi, voluptas sequi, cumque placeat odit dicta aspernatur. Magnam!',
        createTime: Date.UTC(2018, 6, 15, 12),
        updateTime: Date.UTC(2018, 6, 18, 11),
        status: '已完成'
      }, {
        id: 3,
        name: '测试测试3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolorem sit id corrupti, tempore ullam ipsa fugiat nostrum magni eveniet laboriosam sed, inventore. Omnis alias provident facere atque dolor adipisci?',
        createTime: Date.UTC(2018, 7, 10, 12),
        updateTime: Date.UTC(2018, 7, 10, 12),
        status: '未完成'
      }, {
        id: 4,
        name: '测试测试4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolorem sit id corrupti, tempore ullam ipsa fugiat nostrum magni eveniet laboriosam sed, inventore. Omnis alias provident facere atque dolor adipisci?',
        createTime: Date.UTC(2018, 7, 10, 12),
        updateTime: Date.UTC(2018, 7, 10, 12),
        status: '延后'
      }, {
        id: 5,
        name: '测试测试5',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolorem sit id corrupti, tempore ullam ipsa fugiat nostrum magni eveniet laboriosam sed, inventore. Omnis alias provident facere atque dolor adipisci?',
        createTime: Date.UTC(2018, 7, 10, 12),
        updateTime: Date.UTC(2018, 7, 10, 12),
        status: '已删除'
      }, {
        id: 6,
        name: '测试测试6',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolorem sit id corrupti, tempore ullam ipsa fugiat nostrum magni eveniet laboriosam sed, inventore. Omnis alias provident facere atque dolor adipisci?',
        createTime: Date.UTC(2018, 7, 10, 12),
        updateTime: Date.UTC(2018, 7, 10, 12),
        status: '已删除'
      }, {
        id: 7,
        name: '测试测试7',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem molestiae ea blanditiis soluta! A ab fugiat omnis cum facere maxime, quis, iure quaerat quia repellat natus. Amet praesentium, aut quae?',
        createTime: Date.now(),
        updateTime: Date.now(),
        status: '未完成'
      }]
      // 模拟加载两秒
      await new Promise((res) => setTimeout(res, 2000))
      this.body = list
    }
  }
}