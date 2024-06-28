import karin from 'node-Karin'
import { MysUtil } from '#MysTool/mys'
import Role from '../model/role.js'

const reg = MysUtil.reg.sr
export const sr_role = karin.command(
  new RegExp(`^${reg}?(角色|查询|查询角色|角色查询)((18|[1-9])[0-9]{8})*$|^${reg}?uid(\\+|\\s)*(18|[1-9])[0-9]{8}$|^#(18|[1-9])[0-9]{8}`, 'i'),
  async (e) => {
    const img = await new Role(e).roleList()
    if (img) e.reply(img)
    return true
  },
  { name: '崩坏：星穹铁道角色信息查询', priority: 200 }
)
