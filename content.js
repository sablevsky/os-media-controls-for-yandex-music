'use strict'

const script = document.createElement('script')
script.setAttribute('type', 'module')
script.setAttribute('src', chrome.extension.getURL('scripts/main.js'))
document.body.append(script)
