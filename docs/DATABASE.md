<img height="100" align="right" src="./faunadb.png">

# Database

Uses [FaunaDB](https://fauna.com) for a DB designed for serverless architectures.

[FaunaDB for SQL Users](https://docs.fauna.com/fauna/current/start/fql_for_sql_users.html)

## Create Database

```javascript
CreateDatabase({ name: "temtem" });
```

## Tables

### Users

#### DDL

```javascript
CreateCollection({name: 'user'})
CreateIndex({
  name: 'user_by_id',
  source: Collection('user),
  terms: [{field: ['data', 'id]}],
  unique: true
});
```

#### Schema

```sql
CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL,
  reddit_id TEXT NOT NULL UNIQUE,
  reddit_name TEXT NOT NULL,
  reddit_icon TEXT NOT NULL,
  reddit_darkmode BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATE NOT NULL DEFAULT NOW(),
  updated_at DATE NOT NULL DEFAULT NOW(),
  deleted_at DATE
);
```

#### Typescript

```typescript
interface User {
  id: number;
  redditId: string;
  redditName: string;
  redditIcon: string;
  redditDarkmode: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

---

### User Preferences

#### DDL

```javascript
CreateCollection({ name: "user_preference" });
```

#### Schema

```sql
CREATE TABLE user_preference (
  id INT PRIMARY KEY NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATE NOT NULL DEFAULT NOW(),
  updated_at DATE NOT NULL DEFAULT NOW(),
  deleted_at DATE
);
```

#### Typescript

```typescript
interface UserPreference {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

---

### ExchangeListings

#### DDL

```javascript
CreateCollection({name: 'exchange_listing'});
CreateIndex({
  name: 'exchange_listing_by_id',
  source: Collection('exchange_listing),
  terms: [{field: ['data', 'id]}],
  unique: true
});
```

#### Schema

```sql
CREATE TABLE exchange_listing (
  id INT PRIMARY KEY NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATE NOT NULL DEFAULT NOW(),
  updated_at DATE NOT NULL DEFAULT NOW(),
  deleted_at DATE
);
```

#### Typescript

```typescript
interface ExchangeListing {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

---

### ExchangeSaved

#### DDL

```javascript
CreateCollection({ name: "exchange_saved" });
```

#### Schema

```sql
CREATE TABLE exchange_saved (
  id INT PRIMARY KEY NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATE NOT NULL DEFAULT NOW(),
  updated_at DATE NOT NULL DEFAULT NOW(),
  deleted_at DATE
);
```

#### Typescript

```typescript
interface ExchangeSaved {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

---

### TempediaEntry

#### DDL

```javascript
CreateCollection({ name: "tempedia_entry" });
```

#### Schema

```sql
CREATE TABLE tempedia_entry (
  id INT PRIMARY KEY NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATE NOT NULL DEFAULT NOW(),
  updated_at DATE NOT NULL DEFAULT NOW(),
  deleted_at DATE
);
```

#### Typescript

```typescript
interface TempediaEntry {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

---

### QuestTracker

#### DDL

```javascript
CreateCollection({ name: "tracked_quest" });
```

#### Schema

```sql
CREATE TABLE tracked_quest (
  id INT PRIMARY KEY NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATE NOT NULL DEFAULT NOW(),
  updated_at DATE NOT NULL DEFAULT NOW(),
  deleted_at DATE
);
```

#### Typescript

```typescript
interface TrackedQuest {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```
