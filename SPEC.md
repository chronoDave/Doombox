# IPC

## Electron

All controllers expect two parameters: `event` and `payload`. All controllers in the spec asssume no projection.

`event`: The IPC event.

`payload`: The IPC payload, which can be decontructed as follows:

```
{
  action: String // IPC event
  data: {
    action: String // React action
    // Create
    payload: Object,
    // ReadOne, UpdateOne, DeleteOne
    _id: string,
    // Read, Update, Delete, Count
    query: Object,
    regex: {
      operator: ['and', 'or', 'not'],
      expressions: String[]
    },
    // Read
    modifiers: {
      skip: Number,
      limit: Number,
      projection: Object,
      sort: Object,
      castObject: Bool
    },
    // Update, UpdateOne
    update: Object,
  },
  options: Object // Used for non-standard requests
}
```

--- 

### Objects

#### `Song`

Metadata varies strongly per song, see [Music Metadata - Common Metadata](https://github.com/borewit/music-metadata/blob/HEAD/doc/common_metadata.md) for all possible fields.

```
{
  file: String,
  format: {
    bitrate: Number,
    codec: String,
    codecProfile: String,
    container: String,
    duration: Number,
    lossless: Bool,
    numberOfChannels: Number,
    sampleRate: Number,
    tagTypes: String[],
    tool: String
  },
  images: String[], // Image _id's
  // Strongly varies per song
  metadata: CommonMetadata
}
```

#### `Image`

Images can be created either in React (file select) or Electron (parser).

```
// Electron
{
  description: String,
  file: String,
  format: String,
  type: String,
  _id: String
}

// React
{
  lastModified: Number,
  lastModifiedDate: String,
  name: String,
  path: String,
  size: Number,
  type: String
}
```

#### `Playlist`

```
{
  collection: String[], // Song _id's
  name: String,
  cover: Image
  _id: String
}
```

#### `Config / Cache`

Both `Config` and `Cache` can be found in [@doombox/utils](packages/doombox-utils/src/index.js).

---

### Router

The router transforms the following parameters:

#### `Regex`

**Body**

```
{
  data: {
    regex: {
      operator: ['and', 'or', 'not'],
      expressions: String[]
    }?,
  }
}
```

**Response**

```
{
  data: {
    query: {
      [operator]: RegExp[]
    },
    ...
  }
}
```

---

### Library Controller

#### `create()`

Creates a collection of songs.

**Body**

```
{
  data: {
    payload: String[] // Folder paths
  }
}
```

**Protocol**

 - Send interrupt event `ACTION.STATUS.PENDING`
 - Clean database
 - Clean images folder
 - Parse `data.payload`
 - Send interrupt event `ACTION.STATUS.SUCCESS`
 - Call `read()`

**Error**

 - Call `sendError()`

---

#### `read()`

Fetch collection of songs. Populates `images` with `Image`.

**Body**

```
{
  data: {
    action: String?,
    query: Object?,
    modifiers: {
      skip: Number?,
      limit: Number?,
      projection: Object?,
      sort: Object?,
      castObject: Bool?
    }?
  }
}
```

**Protocol**

 - Read `COLLECTION.SONG`
 - Read `COLLECTION.IMAGE`
 - Populate `Song[]`
 - Send payload

**Response**

```
// ACTION.PLAYLIST.SET
{
  action: ACTION.PLAYLIST.SET,
  data: {
    name: String,
    cover: Image,
    collection: Song[]
  }
}

// ACTION.PLAYLIST.ADD
{
  action: ACTION.PLAYLIST.ADD,
  data: Song[]
}

// Default
{
  data: Song[]
}
```

---

#### `update()`

Updates the library by rescanning the items defined in the query.

**Body**

```
{
  data: {
    query: String[] // Folder paths
  }
}
```

**Protocol**

 - Send interrupt event `ACTION.STATUS.PENDING`
 - Parse `data.payload`
 - Send interrupt event `ACTION.STATUS.SUCCESS`
 - Call `read()`

**Error**

 - Call `sendError()`

---

#### `delete()`

Delete songs based on query.

**Body**

```
{
  data: {
    query: Object?
  }
}
```

**Protocol**

 - Delete `COLLECTION.SONG`
 - If `!data.query`, drop `COLLECTIONG.IMAGE`
 - Call `read()`

---

### Playlist Controller

#### `create()`

Creates a playlist.

**Body**

```
{
  data: {
    payload: {
      name: String,
      image: {
        lastModified: Number,
        lastModifiedDate: String,
        name: String,
        path: String,
        size: Number,
        type: String
      }?,
      collection: String[] // Song _id's
    }
  }
}
```

**Protocol**

 - Create `Playlist`
 - Call `read()`

---

#### `read()`

Fetch all playlists, referred as `Mixography` in React.

**Body**

```
{
  data: {
    query: Object?,
    modifiers: Object?
  }
}
```

**Response**

```
{
  data: Playlist[] // Mixography
}
```

---

#### `readOne()`

Fetch a single playlist. Get populated depending on action.

**Body**

```
{
  data: {
    action: String?,
    _id: String,
    projection: Object?
  }
}
```

**Response**

```
// ACTION.PLAYLIST.SET
{
  action: ACTION.PLAYLIST.SET,
  data: {
    name: String,
    collection: Song[]
  }
}

// ACTION.PLAYLIST.ADD
{
  action: ACTION.PLAYLIST.ADD,
  data: Song[]
}

// Default
{
  action: ACTION.CRUD.READ_ONE
  data: {
    collection: Song[]
    name: String,
    cover: Image
    _id: String
  }
}
```

---

#### `updateOne()`

Update a playlist.

**Body**

```
{
  data: {
    _id: String,
    update: Object
  }
}
```

**Response**

`updateOne()` calls `read()` on completion.

---

#### `deleteOne()`

Deletes a playlist.

**Body**

```
{
  data: {
    _id: String
  }
}
```

**Response**

`deleteOne()` calls `read()` on completion.

---

### Rpc Controller

#### `create()`

Create [Discord RPC](https://discordapp.com/rich-presence) status.

**Body**

```
{
  startTimestamp: Date || Number,
  endTimestamp: Date || Number,
  largeImageKey: String,
  largeImageText: String,
  smallImageKey: String,
  smallImageText: String,
  partySize: Number,
  partyId: String,
  partyMax: Number,
  matchSecret: String,
  joinSecret: String,
  spectateSecret: String,
  state: String,
  details: String,
  instance: String
}
```

**Response**

`create()` does not return any data.

---

### Storage Controller

The Storage controller class is used for both `Config` and `Cache`.

#### `read()`

Fetch all storage data.

**Body**

`read()` does not accept any arguments.

**Response**

```
{
  data: Config || Cache
}
```

---

#### `updateOne()`

Updates a single `key-value` pair.

**Body**

```
{
  data: {
    _id: String, // Key
    update: Any // Value
  }
}
```

**Response**

`updateOne()` calls `read()` on completion.
