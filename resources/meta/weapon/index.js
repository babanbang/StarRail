import { Meta } from '#MysTool/profile'
import { Data } from '#MysTool/utils'
import lodash from 'lodash'
import { abbr, aliasCfg } from './alias.js'
const Path = import.meta.url

const types = '存护,丰饶,毁灭,同谐,虚无,巡猎,智识'.split(',')
const data = Data.readJSON('data.json', { Path })
const meta = Meta.create('sr', 'weapon')

meta.addData([{ id: 'allweapons', data }])
meta.addData(data)
meta.addAlias(aliasCfg)
meta.addAbbr(abbr)

const weaponBuffs = {}
let loadBuffs = async function () {
  for (const type of types) {
    let calc = (await Data.importDefault(`${type}/calc.js`, { Path })).module
    if (lodash.isFunction(calc)) {
      calc = calc((idx, key) => {
        return {
          isStatic: true,
          idx,
          key
        }
      }, (title, key, idx) => {
        if (lodash.isPlainObject(key)) {
          return (tables) => {
            const data = {}
            lodash.forEach(key, (idx, k) => {
              data[k] = tables[idx]
            })
            return {
              title,
              data
            }
          }
        } else {
          return {
            title,
            idx,
            key
          }
        }
      })
    }
    lodash.forEach(calc, (ds, key) => {
      let id = meta.getId(key)
      if (id) weaponBuffs[id] = ds
    })
  }
}
await loadBuffs()

meta.addMeta({ weaponBuffs })
