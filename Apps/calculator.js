import karin from 'node-karin'
import Calculator from '../model/calculator.js'
import '../index.js'

export const calculator_help = karin.handler(
  'mys.sr.calculator.help',
  (e) => new Calculator(e).help(),
  { name: '星铁养成计算帮助', priority: 200 }
)

export const calculator = karin.handler(
  'mys.sr.calculator',
  async ({ e, calculator }) => {
    const img = await new Calculator(e).character_count(calculator)
    if (img) e.reply(img)
    return true
  },
  { name: '星铁养成计算', priority: 200 }
)