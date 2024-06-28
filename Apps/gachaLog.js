import karin, { plugin } from 'node-Karin'
import GachaLog from '../model/gachaLog.js'
import { MysUtil } from '#MysTool/mys'

const reg = MysUtil.reg.sr

export const sr_GachaLog_getLog = karin.command(
  new RegExp(`^${reg}?(抽卡|抽奖|角色|武器|常驻|up|新手|全部|光锥)+池*(记录|祈愿|分析)$`, 'i'),
  async (e) => {
    const img = await new GachaLog(e).getLog()
    if (img) e.reply(img)
    return true
  },
  { name: '崩坏：星穹铁道抽卡记录查询', priority: 200 }
)

export const sr_GachaLog_exportLog = karin.command(
  new RegExp(`^${reg}?(强制)?导出抽卡(记录|祈愿|分析)$`, 'i'),
  async (e) => {
    if (e.isGroup && !e.msg.includes("强制")) {
      e.reply("建议私聊导出，若你确认要在此导出，请发送【#sr强制导出抽卡记录】", { at: true })
      return true
    }

    return await new GachaLog(e).exportJson()
  },
  { name: '导出崩坏：星穹铁道抽卡记录', priority: 200 }
)

export class sr_GachaLog extends plugin {
  constructor () {
    super({
      name: '崩坏：星穹铁道抽卡记录',
      dsc: '抽卡记录数据统计',
      event: 'message',
      priority: 200,
      handler: [
        {
          key: 'mys.sr.gachaLog',
          fnc: 'upLog'
        }
      ]
    })
  }

  /** 更新抽卡记录 */
  async upLog ({ params }) {
    const msg = await new GachaLog(this.e).upLog(params)
    if (!msg) return

    this.replyForward(msg)
  }
}