const { Client } = require('@elastic/elasticsearch')

const es_prod = new Client({
  node: process.env.ELASTIC_SEARCH_URI_PROD,
})

const es_dev = new Client({
  node: process.env.ELASTIC_SEARCH_URI_DEV,
})

const es = {
  prod: es_prod,
  dev: es_dev,
}

module.exports = (env, clientEnv, prefix) => {
  const client = es[clientEnv || env]
  if (!client) throw new Error('Error elastic search env.')

  const getSeqSid = (sidSeq) => {
    return client.search({
      index: `${prefix || env}_evp`,
      size: 1,
      body: {
        query: {
          match: {
            'sidSeq.keyword': sidSeq,
          }
        },
      },
    }).then(res => {
      const [sessionObj] = res.body.hits.hits

      return sessionObj && sessionObj._source
    })
  }

  return {
    getSeqSid,
  }
}