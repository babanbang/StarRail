import { plugin } from '#Karin'
import GachaLog from '../model/gachaLog.js'
import { MysUtil } from '#MysTool/mys'
import { Data } from '#MysTool/utils'

const reg = MysUtil.reg.sr
export class sr_GachaLog extends plugin {
  constructor () {
    super({
      name: '崩坏：星穹铁道抽卡记录',
      dsc: '抽卡记录数据统计',
      event: 'message',
      priority: 200,
      rule: [
        {
          reg: new RegExp(`^${reg}?(抽卡|抽奖|角色|武器|常驻|up|新手|全部|光锥)+池*(记录|祈愿|分析)$`, 'i'),
          fnc: "getLog"
        },
        {
          reg: new RegExp(`^${reg}?(更新|刷新)抽卡(记录|祈愿|分析)$`, 'i'),
          fnc: 'upLogBysk'
        },
        {
          reg: new RegExp(`^${reg}?(强制)?导出抽卡(记录|祈愿|分析)$`, 'i'),
          fnc: 'exportLog'
        },
      ],
      handler: [
        {
          key: 'mys.sr.gachaLog',
          fnc: 'upLog'
        }
      ]
    })
  }

  init () {
    Data.createDir(Data.gamePath('sr') + 'GachaData/', { root: true })
  }

  async getLog () {
    const img = await new GachaLog(this.e).getLog()
    if (!img) return

    this.reply(img)
  }

  async upLog ({ params }) {
    const msg = await new GachaLog(this.e).upLog(params)
    if (!msg) return

    this.replyForward(msg)
  }

  async exportLog () {
    if (this.e.isGroup && !this.e.msg.includes("强制")) {
      return this.reply("建议私聊导出，若你确认要在此导出，请发送【#sr强制导出抽卡记录】", { at: true })
    }

    return await new GachaLog(this.e).exportJson()
  }
}