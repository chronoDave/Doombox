# Doombox - IPC

## Channels

- `WINDOW` - Window actions (minimize, maximize, etc.)
- `LIBRARY` - Library controller
- `IMAGE` - Image controller
- `ALBUM` - Album controller
- `LABEL` - Label controller
- `THEME` - Storage controller (theme)
- `CACHE` - Storage controller (cache)
- `CONFIG` - Storage controller (config)
- `KEYBIND` - Keybind actions (play, pause, etc.)
- `INTERRUPT` - Interrupt data channel
- `ROUTE` - Routing (interrupt, main, etc.)

## Protocol

Electron expects a specific payload structure:

**Payload**

```JSON
{
  action: <String>, // IPC.ACTION
  route: { // Optional
    from: <String>, // ROUTE, set client route to `from` on arrival
    to: <String> // ROUTE, set client route to `to` on success
  },
  data: <Object> // Data, depends on action
}
```

**Action: INSERT**

```JSON
{
  data: <String> || Array<String>
}
```

**Action: FIND**

```JSON
{
  data: {
    query: <String>
  }
}
```

**Action: UPDATE**

```JSON
{
  data: {
    query: <String>,
    update: <Object>
  }
}
```
