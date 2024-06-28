import { MysUtil } from '#MysTool/mys'
import karin from 'node-Karin'
import Explore from '../model/explore.js'

const reg = MysUtil.reg.sr

/** 探险 */
export const sr_explore = karin.command(
  new RegExp(`^${reg}?(宝箱|成就|(探险|探索)(度)?)((18|[1-9])[0-9]{8})*$`, 'i'),
  async (e) => {
    const img = await new Explore(e).get()
    if (img) e.reply(img)
    return true
  },
  { name: '崩坏：星穹铁道探索查询', priority: 200 }
)
