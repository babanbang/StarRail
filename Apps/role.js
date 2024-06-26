import { plugin } from 'node-Karin'
import { MysUtil } from '#MysTool/mys'
import Role from '../model/role.js'

const reg = MysUtil.reg.sr
export class sr_role extends plugin {
  constructor () {
    super({
      name: '崩坏：星穹铁道角色查询',
      dsc: '崩坏：星穹铁道角色信息查询',
      event: 'message',
      priority: 200,
      rule: [
        {
          reg: new RegExp(`^${reg}?(角色|查询|查询角色|角色查询)((18|[1-9])[0-9]{8})*$|^${reg}?uid(\\+|\\s)*(18|[1-9])[0-9]{8}$|^#(18|[1-9])[0-9]{8}`, 'i'),
          fnc: 'roleList'
        }
      ]
    })
  }

  /** 角色列表 */
  async roleList () {
    const img = await new Role(this.e).roleList()
    if (!img) return

    this.reply(img)
  }
}
