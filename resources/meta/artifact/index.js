import { Meta } from '#MysTool/profile'
import { Data } from '#MysTool/utils'
import lodash from 'lodash'
import artiBuffs from './calc.js'
import { mainAttr, subAttr, attrMap } from './meta.js'
import { artiSetAbbr, aliasCfg, artiAbbr } from './alias.js'
import { usefulAttr } from './artis-mark.js'
const Path = import.meta.url

const metaData = Data.readJSON('meta.json', { Path })
const setMeta = Meta.create('sr', 'artiSet')
const artiMeta = Meta.create('sr', 'arti')

const idMap = {}
lodash.forEach(Data.readJSON('data.json', { Path }), (setData) => {
  const artiSet = {
    name: setData.name,
    effect: setData.skill,
    idxs: {}
  }
  setMeta.addDataItem(artiSet.name, artiSet)

  lodash.forEach(setData.idxs, (ds, idx) => {
    artiMeta.addDataItem(ds.name, {
      ...ds,
      set: setData.name,
      setId: setData.id,
      idx
    })

    idMap[ds.name] = lodash.keys(ds.ids).join(',')
    artiSet.idxs[idx] = ds.name
  })
})

setMeta.addAbbr(artiSetAbbr)
setMeta.addAlias(aliasCfg)

artiMeta.addAbbr(artiAbbr)
artiMeta.addAlias(idMap, true)
artiMeta.addMeta({
  artiBuffs, metaData, usefulAttr, mainAttr, subAttr, attrMap
})
