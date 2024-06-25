import { ApiTool, MysTool } from "#MysTool/mys"

ApiTool.setApiMap('sr', function (data) {
  return {
    /** 首页宝箱 */
    index: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/index`,
      query: `role_id=${this.uid}&server=${this.server}`
    },
    /** 角色详情 */
    character: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/avatar/info`,
      query: `need_wiki=true&role_id=${this.uid}&server=${this.server}`
    },
    /** 开拓阅历接口 */
    ledger: {
      url: `${MysTool.web_api}event/srledger/month_info`,
      query: `region=${this.server}&uid=${this.uid}&month=${data.month}`
    },
    /** 养成计算器 */
    compute: {
      url: `${MysTool.web_api}event/rpgcalc/compute`,
      query: 'game=hkrpg',
      body: data.body
    },
    /** 详情 */
    detail: {
      url: `${MysTool.web_api}event/rpgcalc/avatar/detail`,
      query: `game=hkrpg&lang=zh-cn&item_id=${data.avatar_id}&tab_from=${data.tab_from}&change_target_level=0&uid=${this.uid}&region=${this.server}`
    },
    /** 模拟宇宙 */
    rogue: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/rogue`,
      query: `need_detail=true&role_id=${this.uid}&schedule_type=3&server=${this.server}`
    },
    /** 差分宇宙 */
    rogue_tourn: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/rogue_tourn`,
      query: `need_detail=true&role_id=${this.uid}&schedule_type=3&server=${this.server}`
    },
    /** 黄金与机械 */
    rogue_nous: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/rogue_nous`,
      query: `need_detail=true&role_id=${this.uid}&schedule_type=3&server=${this.server}`
    },
    /** 寰宇蝗灾 */
    rogue_locust: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/rogue_locust`,
      query: `need_detail=true&role_id=${this.uid}&schedule_type=3&server=${this.server}`
    },
    /** 忘却之庭 */
    challenge: {
      url: `${MysTool.record_api}game_record/app/hkrpg/api/challenge`,
      query: `${data.need_all ? 'isPrev=true&need_all=true&' : ''}role_id=${this.uid}&schedule_type=${data.schedule_type}&server=${this.server}`
    },
    gacha: {
      url: `${MysTool.web_api}common/gacha_record/api/getGachaLog`,
      query: `authkey_ver=1&lang=zh-cn&authkey=${data.authkey}&gacha_type=${data.gacha_type}&page=${data.page}&size=20&end_id=${data.end_id}&game_biz=${this.game_biz}`,
      HeaderType: 'noHeader'
    }
  }
}, 'mys')

ApiTool.setApiMap('sr', function (data) {
  return {
    /** 首页宝箱 */
    index: {
      url: `${MysTool.os_record_api}game_record/hkrpg/api/index`,
      query: `role_id=${this.uid}&server=${this.server}`
    },
    /** 角色详情 */
    character: {
      url: `${MysTool.os_record_api}game_record/hkrpg/avatar/info`,
      query: `need_wiki=true&role_id=${this.uid}&server=${this.server}`
    },
    /** 开拓阅历接口 */
    ledger: {
      url: `${MysTool.web_api}event/srledger/month_detail`,
      query: `region=${this.server}&uid=${this.uid}&month=${data.month}`
    },
    /** 养成计算器 */
    compute: {
      url: `${MysTool.web_api}event/rpgcalc/compute`,
      query: 'game=hkrpg',
      body: data.body
    },
    /** 详情 */
    detail: {
      url: `${MysTool.web_api}event/rpgcalc/avatar/detail`,
      query: `game=hkrpg&lang=zh-cn&item_id=${data.avatar_id}&tab_from=${data.tab_from}&change_target_level=0&uid=${this.uid}&region=${this.server}`
    },
    /** 模拟宇宙 */
    rogue: {
      url: `${MysTool.os_record_api}game_record/hkrpg/api/rogue`,
      query: `need_detail=true&role_id=${this.uid}&schedule_type=3&server=${this.server}`
    },
    /** 差分宇宙 */
    rogue_tourn: {
      url: `${MysTool.os_record_api}game_record/hkrpg/api/rogue_tourn`,
      query: `need_detail=true&role_id=${this.uid}&server=${this.server}`
    },
    /** 黄金与机械 */
    rogue_nous: {
      url: `${MysTool.os_record_api}game_record/hkrpg/api/rogue_nous`,
      query: `need_detail=true&role_id=${this.uid}&server=${this.server}`
    },
    /** 寰宇蝗灾 */
    rogue_locust: {
      url: `${MysTool.os_record_api}game_record/hkrpg/api/rogue_locust`,
      query: `need_detail=true&role_id=${this.uid}&server=${this.server}`
    },
    /** 忘却之庭 */
    challenge: {
      url: `${MysTool.os_record_api}game_record/hkrpg/api/challenge`,
      query: `${data.need_all ? 'isPrev=true&need_all=true&' : ''}role_id=${this.uid}&schedule_type=${data.schedule_type}&server=${this.server}`
    },
    gacha: {
      url: `${MysTool.os_web_api}common/gacha_record/api/getGachaLog`,
      query: `authkey_ver=1&lang=zh-cn&authkey=${data.authkey}&gacha_type=${data.gacha_type}&page=${data.page}&size=20&end_id=${data.end_id}&game_biz=${this.game_biz}`,
      HeaderType: 'noHeader'
    }
  }
}, 'hoyolab')