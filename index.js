import { MysUtil } from '#MysTool/mys'
import { Cfg, getDir } from '#MysTool/utils'
import './model/mys/ApiMap.js'

MysUtil.addGames('sr', '星穹铁道')

const dir = getDir(import.meta.url)
Cfg.initCfg('/lib/components', dir.name + '/', 'sr', '星穹铁道')

for (const type of ['artifact', 'character', 'weapon']) {
  await import(`file://${dir.path}/resources/meta/${type}/index.js`)
}

export * from './Apps/explore.js'
export * from './Apps/gachaLog.js'
export * from './Apps/ledger.js'
export * from './Apps/profile.js'
export * from './Apps/rogue.js'
export * from './Apps/role.js'
