import karin from 'node-karin'
import { MysUtil } from '#MysTool/mys'
import Explore from '../model/explore.js'

const reg = MysUtil.reg.sr
export const explore = karin.command(
  new RegExp(`^${reg}?(宝箱|成就|(探险|探索)(度)?)((18|[1-9])[0-9]{8})*$`, 'i'),
  async (e) => {
    const img = await new Explore(e).get()
    if (img) e.reply(img)
    return true
  },
  { name: '星铁探索查询', priority: 200 }
)
