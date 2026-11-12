# firefox-containers-router

This is a small redirect service that sends links into Firefox containers. It sits on the a docker network next to Tailscale sidecars, and each sidecar answers on its own hostname such as `ff1` or `ff2`.

## Routes

- `/route?route=<url>`
    - redirects to `<url>` after launching the firefox container
- `/<shortcut>`
    - redirects to `http://go/<shortcut>` after launching the firefox container

## Use

Assuming you are using tailscale DNS and your domain is at `ff1`. Open `http://ff1/route?route=https://example.com` in Firefox and the browser lands on example.com. Give `ff1` a container rule in Multi-Account Containers and the page opens inside that container.

## Run locally

```
npm install
npm run dev
```

Then try http://localhost:3000/route?route=https://example.com.

## Run with docker

`compose.yaml` starts the router and two Tailscale sidecars. Set `TS_AUTHKEY` in the file first, since the checked in value is redacted. Each sidecar mounts a serve config from `/volume1/docker/ff_router/serve-config.ff1.json` or the `ff2` equivalent.

The image comes from `ghcr.io/limxingzhi/firefox-containers-router`. The build workflow pushes it on each push to `main`.

`compose.yaml` is my actual compose file for deploying this service.

