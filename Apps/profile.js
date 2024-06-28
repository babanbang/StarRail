import karin, { plugin } from 'node-Karin'
import Profile from '../model/profile.js'
import { MysUtil } from '#MysTool/mys'

const reg = MysUtil.reg.sr
export const sr_profile_Refresh = karin.command(
  new RegExp(`^${reg}(全部面板更新|更新全部面板|获取游戏角色详情|更新面板|面板更新)\\s*((18|[1-9])[0-9]{8})?$`, 'i'),
  async (e) => {
    const img = await new Profile(e).refresh()
    if (img) e.reply(img)
    return true
  },
  { name: '更新崩坏：星穹铁道角色面板', priority: 200 }
)

export const sr_profile_List = karin.command(
  new RegExp(`^${reg}面板(列表)?\\s*((18|[1-9])[0-9]{8})?$`, 'i'),
  async (e) => {
    const img = await new Profile(e).list()
    if (img) e.reply(img)
    return true
  },
  { name: '崩坏：星穹铁道角色面板列表', priority: 200 }
)

export class sr_profile extends plugin {
  constructor () {
    super({
      name: '崩坏：星穹铁道角色面板',
      dsc: '崩坏：星穹铁道角色面板查询',
      event: 'message',
      priority: 200,
      handler: [
        {
          key: 'mys.sr.profile',
          fnc: 'Detail'
        }
      ]
    })
  }
  /** 查询角色面板 */
  async Detail ({ profile }) {
    const img = await new Profile(this.e).detail(profile)
    if (!img) return

    this.reply(img)
  }
}
