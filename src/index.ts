import { Cfg, MysUtil, Data, GameNames, GamePathType, GameList } from 'karin-plugin-mystool'
import { logger } from 'node-karin'

MysUtil.initGame(GameList.Sr)
/** 初始化配置 */
Cfg.initCfg(GamePathType.sr)

const pkg = Cfg.package(GamePathType.sr)
const name = Data.getGamePath(GamePathType.sr)
logger.info(`${logger.violet(`[插件:${pkg.version}]`)} ${logger.green(name)}${GameNames.sr}初始化完成~`)