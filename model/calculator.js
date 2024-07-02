import { MysInfo } from '#MysTool/mys'
import { Character, Material, Weapon } from '#MysTool/profile'
import { Base, Data, PluginName } from '#MysTool/utils'
import { common } from 'node-karin'
import lodash from 'lodash'

export default class Calculator extends Base {
  constructor (e) {
    super(e, 'sr')
    this.model = 'calculator/character'
    this.tips = [
      '如果需要选择点亮行迹请自行参考行迹图中对应序号(0-9a-c)，需要使用|与其他等级分隔，不填写则默认点亮可点亮的所有行迹',
      '示例1：#sr行于流逝的岸养成80\n参数为光锥等级',
      '示例2：#sr黄泉 行于流逝的岸养成75 6 9 9 9 80|abc0126789\n参数为角色、普攻、战技、终结技、天赋、光锥、点亮行迹',
      '示例3：#sr黄泉养成60-80 2-6 6-10 9 10 80|abc0126789\n参数为参数为角色、普攻、战技、终结技、天赋、光锥(未装备可不填)、点亮行迹（可从某个等级升至某个等级）',
      '请在角色名、光锥名及各等级间使用,，.或空格分割。'
    ]
  }

  /** @type {MysInfo} */
  mysInfo

  help () {
    this.e.bot.sendForwardMessage(this.e.contact, common.makeForward(this.tips))
    return true
  }

  async character_count (calculator) {
    this.mysInfo = await MysInfo.init({ e: this.e, apis: 'compute', game: this.game, option: { log: false } })
    if (!this.mysInfo?.ckInfo?.ck) return false

    /** 
     * @type {{
     * role:import('#MysTool/profile').Character[]
     * weapon:import('#MysTool/profile').Weapon[]
     * }}
     */
    const { roles, weapons, set } = calculator
    if (set?.length > 2) {
      this.e.reply('参数错误，请按示例输入！')
      this.help()
      return false
    }

    if (roles.length > 0) {
      this.character = await this.mysInfo.getData('character')
      if (this.character?.retcode !== 0) return false
    }

    const item = roles.length > 0 ? roles[0] : weapons[0]
    /** 获取设置参数 */
    const setSkill = await this.getSet(set, ...item)

    const Body = await this.getBody(setSkill, ...item)
    if (!Body) return false

    /** 计算 */
    const computes = await this.computes(Body, [item[0], Body])
    if (!computes) return false

    return await this.renderImg({
      uid: this.mysInfo.uid,
      ...computes
    }, { test: true })
  }

  async getSet (sets, role) {
    let [set, talent] = sets
    const MaxSkill = '90,6,10,10,10,90'.split(',').map(Number)
    if (!role && set?.[0]) set = ['', '', '', '', '', set[0]]

    if (lodash.isEmpty(set)) {
      return { min: [-1, -1, -1, -1, -1, -1], max: MaxSkill }
    } else {
      const min = [...MaxSkill]
      const max = [...MaxSkill]
      MaxSkill.forEach((v, i) => {
        min[i] = (set[i]?.[1] && set[i]?.[0]) ? set[i][0] : -1
        max[i] = Math.min(v, set[i]?.[1] || set[i]?.[0] || v)
      })

      return { min, max }
    }
  }

  async getBody (setSkill, role, weapon) {
    let body = {}
    const { min, max } = setSkill

    /** 角色技能 */
    let char = this.character?.data?.avatars?.find?.(item => item.id === role.id)
    if (role) {
      let skillList = Object.values(role.detail.talent).map(item => {
        return {
          group_id: item.id,
          level_current: 1,
        }
      })
      if (char) {
        /** 角色存在获取技能数据 */
        const detail = await this.mysInfo.getData('detail', { avatar_id: role.id })
        if (detail?.retcode !== 0) return false

        skillList = skillList.map(v => {
          return detail.data.skill_list.find((item) => Number(item.group_id) === Number(v.group_id))
        })
      } else {
        char = {
          level: 1,
          name: role.name,
          icon: role.face,
          rarity: role.star
        }
      }

      /** 拼接计算参数 */
      body = {
        avatar_id: Number(role.id),
        avatar_level_current: min[0] > 0 ? min[0] : char.level,
        avatar_level_target: max[0],
        skill_list: [
          {
            id: Number(skillList[0].group_id),
            level_current: min[1] > 0 ? min[1] : skillList[0].level_current,
            level_target: max[1]
          },
          {
            id: Number(skillList[1].group_id),
            level_current: min[2] > 0 ? min[2] : skillList[1].level_current,
            level_target: max[2]
          },
          {
            id: Number(skillList[2].group_id),
            level_current: min[3] > 0 ? min[3] : skillList[2].level_current,
            level_target: max[3]
          }
        ]
      }
    }

    if (this.mysApi.hoyolab) {
      body.lang = 'zh-cn'
    }

    if (weapon?.id || char?.weapon?.id) {
      const w = {
        id: Number(weapon?.id || char.weapon.id),
        rarity: Number(weapon?.star || char.weapon.rarity),
        level: (weapon ? 1 : char.weapon.level) ?? 1
      }
      if (w.rarity < 3) {
        min[4] = min[4] > 0 ? Math.min(min[4], 70) : -1
        max[4] = Math.min(max[4], 70)
      }

      body.weapon = {
        id: w.id,
        level_current: min[4] > 0 ? min[4] : w.level,
        level_target: max[4]
      }
    }

    return body
  }

  async getSkillId (roleId) {
    const avatarSkill = await this.mysInfo.getData('avatarSkill', {
      avatar_id: roleId
    })
    if (avatarSkill?.retcode !== 0) return false
    avatarSkill.data.list.forEach((item) => {
      item.level_current = 1
    })

    return avatarSkill.data.list
  }

  async computes (body, avatarData) {
    const computes = await this.mysInfo.getData('compute', { body })
    if (computes?.retcode !== 0) return false
    Data.writeJSON(`data/${PluginName}/data.json`, { body, avatarData, computes }, 'root')
    // const { body, avatarData, computes } = Data.readJSON(`data/${PluginName}/data.json`, 'root')
    const { data } = computes
    const avatars = []

    const formart = (num) => {
      return num > 10000 ? (num / 10000).toFixed(1) + ' w' : num
    }
    const overall = data.overall_consume.map(val => {
      this.checkImg(val)
      const tem = {
        name: val.name,
        level: val.level,
        num: val.num,
        lack_num: 0 - Number(val.lack_num),
        icon: val.icon
      }
      if (tem.lack_num > 0) {
        tem.lack_num = '<p style="color:green">+' + tem.lack_num + '</p>'
      } else if (tem.lack_num < 0) {
        tem.lack_num = '<p style="color:red">' + tem.lack_num + '</p>'
      } else {
        tem.lack_num = '<p>' + tem.lack_num + '</p>'
      }
      return tem
    })

    const available = lodash.sortBy(data.available_material.map(val => {
      this.checkImg(val)
      return {
        name: val.name,
        level: val.level,
        num: val.num
      }
    }), ['level', 'num']).reverse()

    const talentKey = ['a', 'e', 'q']
    data.items.forEach((item, idx) => {
      const [role1, body] = avatarData[idx]
      const role = Character.get(role1._id, 'gs')
      const avatar = {
        name: role?.name,
        star: role?.star,
        level: [body.avatar_level_current, body.avatar_level_target],
        mona: {},
        exper: {},
        skillList: body.skill_list
      }
      if (role?.getImgs) {
        avatar.imgs = role.getImgs()
      }
      if (body.weapon?.id) {
        const weapon = Weapon.get(body.weapon.id, 'gs')
        avatar.weaponInfo = {
          name: weapon.name,
          star: weapon.star,
          level: [body.weapon.level_current, body.weapon.level_target],
          icon: weapon.icon
        }
      }

      for (const key of ['avatar', 'avatar_skill', 'weapon']) {
        const v = item[key + '_consume']
        if (!v || v.length === 0) continue
        avatar[key] = []
        v.forEach(val => {
          if (val.name === '摩拉') {
            avatar.mona[key] = val.num
          } if (['大英雄的经验', '精锻用魔矿'].includes(val.name)) {
            avatar.exper[key] = val.num
          } if (val.name === '智识之冕') {
            avatar.skillPlus = val.num
          } else {
            avatar[key].push({
              name: val.name,
              level: val.level,
              _num: val.num,
              num: formart(val.num)
            })
          }
        })

        avatar[key] = lodash.sortBy(avatar[key], ['level', '_num']).reverse()
      }

      if (item.skills_consume?.length > 0) {
        avatar.skills = {}
        const talent = lodash.keyBy(Object.values(role.detail.talent), 'id')

        item.skills_consume.forEach((val, i) => {
          const info = {
            ...val.skill_info,
            name: talent[val.skill_info.id].name,
            key: talentKey[i]
          }
          const list = []
          val.consume_list.forEach(v => {
            list.push({
              name: v.name,
              level: v.level,
              _num: v.num,
              num: formart(v.num)
            })
          })
          avatar.skills[info.id] = { info, list: lodash.sortBy(list, ['level', '_num']).reverse() }
        })
      }
      avatar.calendar = this.calendar(item.calendar)
      avatars.push(avatar)
    })

    return { avatars, available, overall, itemsImgs: this.itemsImgs }
  }

  calendar (data) {
    if (!data) return false
    const day = ['一', '二', '三', '四', '五', '六', '日']
    return {
      name: data.dungeon_name,
      time: '每周' + data.drop_day.sort((a, b) => {
        return Number(a) - Number(b)
      }).map(d => day[Number(d) - 1]).join('/') + '开启',
    }
  }

  checkImg (data) {
    const { name, icon } = data
    if (!this.itemsImgs) this.itemsImgs = { imgs: {}, icons: {} }

    if (!this.itemsImgs.imgs[name] && !this.itemsImgs.icons[name]) {
      const material = Material.get(name, 'gs')
      if (!material) {
        logger.info(`找不到材料图片:${logger.red(name)}，请联系开发者添加！`)
        this.itemsImgs.icons[name] = icon
      } else {
        this.itemsImgs.imgs[name] = material.icon
      }
    }
  }
}