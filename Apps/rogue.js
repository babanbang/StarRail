import { plugin } from '#Karin'
import { MysUtil } from '#MysTool/mys'
import Rogue from '../model/rogue.js'

const reg = MysUtil.reg.sr
export class sr_rogue extends plugin {
  constructor () {
    super({
      name: '崩坏：星穹铁道差分宇宙、模拟宇宙、拓展装置查询',
      dsc: '崩坏：星穹铁道角色差分宇宙、模拟宇宙、拓展装置查询',
      event: 'message',
      priority: 200,
      rule: [
        {
          reg: new RegExp(`^${reg}?[上期|往期|本期]*模拟宇宙$`, 'i'),
          fnc: 'rogue'
        },
        {
          reg: new RegExp(`^${reg}?[上周|上期|往期|本期]*(差分(宇宙)*|(差分(宇宙)*)*(周期|常规)演算)$`, 'i'),
          fnc: 'rogue_tourn'
        },
        {
          reg: new RegExp(`^${reg}?黄金与机械$`, 'i'),
          fnc: 'rogue_nous'
        },
        {
          reg: new RegExp(`^${reg}?寰宇蝗灾$`, 'i'),
          fnc: 'rogue_locust'
        }
      ]
    })
  }

  /** 模拟宇宙 */
  async rogue () {
    const img = await new Rogue(this.e).rogue()
    if (img) this.reply(img)
    return true
  }

  /** 差分宇宙 */
  async rogue_tourn () {
    const img = await new Rogue(this.e).rogue_tourn()
    if (img) this.reply(img)
    return true
  }

  /** 黄金与机械 */
  async rogue_nous () {
    const img = await new Rogue(this.e).rogue_nous()
    if (img) this.reply(img)
    return true
  }

  /** 寰宇蝗灾 */
  async rogue_locust () {
    const img = await new Rogue(this.e).rogue_locust()
    if (img) this.reply(img)
    return true
  }
}
