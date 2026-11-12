import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// redirect after applying container
// e.g. http://ff1/route?route=https://google.com
app.get('/route', (c) => {
  return c.redirect(c.req.query('route') ?? '')
})

// routes after applying container
// e.g. http://ff1/me to http://go/me after applying container
app.get('/:shortcut', (c) => {
  return c.redirect(`http://go/${c.req.param('shortcut')}`)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
