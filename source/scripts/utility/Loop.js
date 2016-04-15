import raf from "raf"

export default function Loop(func) {
    (function loop(tick) {
        func(Math.min((window.performance.now() - tick) / 1000, 1000))
        raf(loop.bind(this, window.performance.now()))
    })(window.performance.now())
}
