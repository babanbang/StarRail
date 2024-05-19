import { Base } from '#Mys.tool'
import { Player } from '#Mys.profile'

export default class Profile extends Base {
  constructor (e) {
    super(e, 'sr')
    this.model = 'profile/detail'
  }

  async detail () {
    const player = Player.create(this.e.MysUid, 'sr')

    const data = await player.getProfileDetail(this.e._profile)

    return await this.renderImg(data, { test: true })
  }
}
