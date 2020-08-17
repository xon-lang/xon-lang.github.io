module.exports = `si = require('systeminformation')

render_plugin()

render_plugin():
    si = 8
    si.batter().then(init)

get_charge_color(p Number):
    return select:
        p > 40: '\u001b[32m' //green
        p > 20: '\u001b[33m' //yellow
        p > 0: '\u001b[31m' //red

init(battery any):
    chargeIcon = battery.ischarging && '⚡' || ''
    color = get_charge_color(battery.percent)
    console.log(f'{color}{chargeIcon}{battery.percent}% | size=13')
    console.log('---')
    console.log('Refresh|refresh=true')


SimpleClass:
    _prop = 5
    tryped Number = 6
    only_typed String

    method(t Number, v = 4, vt String = 'sff'):
        if t+v+vt:
            render_plugin()

    location(x {z Number, dim String}, y Number = 6): ._coord(x.z, y)

    _coord(x Number, y Number):
        console.log(1 + 1)
        console.log(222)`