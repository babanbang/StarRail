export default [{
  name: 'StarRail 面板配置',
  file: 'StarRail-profile.yaml',
  priority: 200,
  view: [
    {
      key: '面板服务选择：0:自动，1:Mihomo，2:Avocado(鳄梨), 3:EnkaHSR',
      comment: '如设置三位数字则为分服务器设置，按顺序分别为 国服/B服/外服，例如113代表国服B服Mihomo,国外EnkaHSR',
      path: 'serv',
      type: 'text'
    },
    {
      key: '米游社面板',
      comment: 'UID绑定了cookie时使用米游社面板',
      path: 'MysApi',
      type: 'boolean'
    }
  ]
}]