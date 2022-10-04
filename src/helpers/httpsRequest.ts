import https from 'https'

type paramsType = string | https.RequestOptions | URL

export const httpsRequest = async (params: paramsType, postData?: any): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const req = https.request(params, (res) => {
      // reject on bad status
      if (res.statusCode !== undefined && (res.statusCode < 200 || res.statusCode >= 300)) {
        return reject(new Error(`statusCode= ${res.statusCode}`))
      }

      // cumulate data
      let body: any[] = []
      res.on('data', (chunk) => {
        body.push(chunk)
      })

      // resolve on request end
      res.on('end', () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString())
        } catch (e) {
          reject(e)
        }
        resolve(body)
      })
    })

    // reject on request error
    req.on('error', (err) => {
      reject(err)
    })

    // write post data if it exists
    if (postData !== undefined) {
      req.write(postData)
    }

    req.end()
  })
}
