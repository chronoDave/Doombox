# Protocol | Doombox Docs

---

All communication between front-end (React) and back-end (Electron) goes via [IPC](https://en.wikipedia.org/wiki/Inter-process_communication), specifically via [ipcMain](https://www.electronjs.org/docs/api/ipc-main) and [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer). Because `ipcRenderer` / `ipcMain` are simply event emitters / receivers, they have no standarized protocol of their own. To standardize the way messages are sent and received within Doombox, a custom protocol has been designed, based on [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

Currently, Doombox' API supports the following methods:

- `CREATE`
- `READ`
- `READ_ONE`
- `UPDATE`
- `UPDATE_ONE`
- `DELETE`
- `DELETE_ONE`
- `DROP`

## React

## Electron

The back-end expects the following payload structure:

```
{
  action: <String>,
  data: <Object> // Contains method data
}
```

### Methods

#### `create()`

```
{
  payload: <Object>
}
```

#### `read()`

```
{
  query: <Object>,
  modifiers: {
    skip: <Number>,
    limit: <Number>,
    projection: <Object>,
    castObject: <Bool>
  }
}
```

#### `readOne()`

```
{
  _id: <String>,
  modifiers: {
    projection: <Object>
  }
}
```

#### `update()`

<b>Only allows update query</b>

```
{
  query: <Object>,
  payload: <Object>
}
```

#### `updateOne()`

```
{
  _id: <String>,
  payload: <Object>
}
```

#### `delete()`

```
{
  query: <Object>
}
```

#### `deleteOne()`

 ```
{
  _id: <String>
}
 ```

#### `drop()`

```Does not expect a payload```
