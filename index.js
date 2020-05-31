module.exports = function (bot, _options) {
  let options = {
    timeout: 500
  }

  options = Object.assign(options, _options)

  return function (event, context, callback) {
    if (!event || !event.body) {
      return callback(null, {
        statusCode: 200,
        body: ''
      })
    }

    let update
    try {
      update = JSON.parse(event.body)
    } catch (e) {
      console.error('JSON parse error', e)
      return callback(null, {
        statusCode: 200,
        body: ''
      })
    }

    let bodySent = false

    let endTimer = setTimeout(() => {
      callback(null, {
        statusCode: 200,
        body: ''
      })
    }, options.timeout)

    let returnObj = {
      end: function (data) {
        bodySent = true
        clearTimeout(endTimer)
        callback(null, {
          statusCode: 200,
          body: data,
          headers: { 'content-type': 'application/json' }
        })
      },
      headersSent: true,
    }

    bot.handleUpdate(update, returnObj).then(() => {
      if (bodySent) return

      clearTimeout(endTimer)
      callback(null, {
        statusCode: 200,
        body: ''
      })
    }).catch((error) => {
      if (bodySent) return

      clearTimeout(endTimer)
      callback(null, {
        statusCode: 200,
        body: ''
      })
    })
  }
}
