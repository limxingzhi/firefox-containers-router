import { serve } from '@hono/node-server'
import { HTTPException } from 'hono/http-exception'
import { Hono } from 'hono'

const app = new Hono()

// redirect after applying container
// e.g. http://ff1/route?route=https://google.com
app.get('/route', (c) => {

  if (c.req.query('route')) {
    console.log('routing via ' + c.req.query('route'))
    return c.redirect(c.req.query('route') as string)
  }

  console.error('No route query param was given')
  throw new HTTPException(400, { message: 'No route was given' })
})

// routes after applying container
// e.g. http://ff1/me to http://go/me after applying container
app.get('/:shortcut', (c) => {

  if (c.req.param('shortcut')) {
    console.log('shortcut via ' + c.req.param('shortcut'))
    return c.redirect(`http://go/${c.req.param('shortcut')}`)
  }
  
  throw new HTTPException(400, { message: 'No shortcut was given' })
})

app.get('*', () => {
  console.log('invalid route')
  throw new HTTPException(400, { message: 'invalid route' })
})

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT ?? 3000)
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
