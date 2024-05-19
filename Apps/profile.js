import { plugin } from '#Karin'
import Profile from '../model/profile.js'

export class sr_profile extends plugin {
  constructor () {
    super({
      name: '崩坏：星穹铁道角色面板',
      dsc: '崩坏：星穹铁道角色面板查询',
      event: 'message',
      priority: 200,
      rule: [
        {
          reg: /^#sr([^#sr]+)\s*(详细|详情|面板|面版|圣遗物|伤害([1-9]+\d*)?)\s*(\d{9,10})*(.*[换变改].*)?$/,
          fnc: 'profileDetail'
        }
      ]
    })
  }

  /** 角色面板 */
  async profileDetail () {
    const img = await new Profile(this.e).detail()
    if (!img) return

    this.reply(img)
  }
}
