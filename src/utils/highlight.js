const hljs = require('highlight.js/lib/highlight')

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))

export default hljs