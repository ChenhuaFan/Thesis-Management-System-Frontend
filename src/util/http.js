import request from 'superagent'

const defaultConfig = {
  header: {'Accept': 'application/json'}
}

const post = function (config) {
  return new Promise((resolve, reject) => {
    request
        .post(config.url ? config.url : '')
        .send(config.body ? config.body : {})
        .set(config.header ? config.header : defaultConfig.header)
        .end((err, res) => {
          if(err) {
            reject(err.message)
          } else {
            if(res.status == 200) {
              resolve(res.body)
            }
          }
        })
  })
}

const get = function (config) {
  let query = config.query ? config.query : {}
  query['t'] = new Date().getTime();
  return new Promise((resolve, reject) => {
    request
      .get(config.url ? config.url : '')
      .query(query)
      .set(config.header ? config.header : defaultConfig.header)
      .end((err, res) => {
        if(err) {
          reject(err.message)
        } else {
          if(res.status == 200) {
            resolve(res.body)
          }
        }
      })
  })
}

export default {
  post,
  get
}