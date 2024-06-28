import karin from 'node-Karin'
import { MysUtil } from '#MysTool/mys'
import Rogue from '../model/rogue.js'

const reg = MysUtil.reg.sr

async function get_data (e, typt) {
  const img = await new Rogue(e)[typt]()
  if (img) e.reply(img)
  return true
}

export const sr_rogue = karin.command(
  new RegExp(`^${reg}?[上期|往期|本期]*模拟宇宙$`, 'i'),
  async (e) => await get_data(e, 'rogue'),
  { name: '崩坏：星穹铁道模拟宇宙信息查询', priority: 200 }
)

export const sr_rogue_tourn = karin.command(
  new RegExp(`^${reg}?[上周|上期|往期|本期]*(差分(宇宙)*|(差分(宇宙)*)*(周期|常规)演算)$`, 'i'),
  async (e) => await get_data(e, 'rogue_tourn'),
  { name: '崩坏：星穹铁道差分宇宙信息查询', priority: 200 }
)

export const sr_rogue_nous = karin.command(
  new RegExp(`^${reg}?黄金与机械$`, 'i'),
  async (e) => await get_data(e, 'rogue_nous'),
  { name: '崩坏：星穹铁道黄金与机械信息查询', priority: 200 }
)

export const sr_rogue_locust = karin.command(
  new RegExp(`^${reg}?寰宇蝗灾$`, 'i'),
  async (e) => await get_data(e, 'rogue_locust'),
  { name: '崩坏：星穹铁道寰宇蝗灾信息查询', priority: 200 }
)
