import karin from 'node-karin'
import { MysUtil } from '#MysTool/mys'
import DailyNote from '../model/dailyNote.js'

const reg = MysUtil.reg.sr

export const dailyNote = karin.command(
  new RegExp(`^${reg}(查询)?(体力|开拓力)$`, 'i'),
  async (e) => await new DailyNote(e).get(),
  { name: '星铁开拓力查询', priority: 200 }
)

export const dailyNoteAll = karin.handler(
  'mys.sr.dailyNote',
  async (e) => await new DailyNote(e).getNoteImgs(this.e.user_id),
  { priority: 200 }
)

// export const Task = karin.task(
//   '星铁体力推送任务',
//   Cfg.getConfig('cron', 'sr').dailyNoteTask || '0 * * * * ?',
//   () => {
//     new DailyNote().dailyNoteTask()
//     return true
//   }
// )
