# SVT

### MySQL setup

```
CREATE DATABASE svt;

USE svt;

CREATE TABLE users (name VARCHAR(128), discriminator SMALLINT NOT NULL, access_token VARCHAR(30), refresh_token VARCHAR(30), avatar VARCHAR(128), id VARCHAR(32), bio VARCHAR(512), banner VARCHAR(512), catchScores TEXT, roles TEXT);

CREATE TABLE posts (title VARCHAR(64), author VARCHAR(20), text VARCHAR(2500), thumbnailPath VARCHAR(128), url VARCHAR(64), date DATETIME);

CREATE TABLE beatmaps (title VARCHAR(128), artist VARCHAR(128), difficulty VARCHAR(128), path VARCHAR(128), length SMALLINT, creator VARCHAR(128));
```

### Features

- Publish articles only if logged in
- Sort articles on home feed
- Edit already published articles (before twitter)
- Articles regenerated after template at server start
- svt!catch, written from scratch in javascript
- Support for all osu! beatmaps

### Badges

- Krönikör
  - Default
- Epic
  - Nothing special
- Reporter
  - Can create articles
- Redaktör
  - Can edit and remove all articles
- Chefredaktör 
  - Can assign roles

    

    

### svt!catch timeline

- **24/12**
  - Added a new page with a playfield and fruits
  - Gave fruits gravity
  - Gave catcher (a really laggy) movement
- **25/12**
  - Added methods to summon a fruit or droplet
  - Added catcher collission
  - Added an accuracy display
  - Added beatmap parser
    - Game starts on page load with CustomiZ - COOLEST
  - Gave catcher smooth movement
  - Added svt!catch to the navigation bar
  - Removed fruit gravity and gave them a smooth static fall speed
  - Implemented a beatmap builder to fill the database with beatmaps
  - Added beatmap listing to catch website to let user start custom maps
  - Added kiai time with catcher expressions
  - Made catcher flip the way he is moving
  - Added banana rains
- **26/12**
  - Added hitsounding
  - Fixed audio offset
  - Added confetti during kiai time
  - Made playfield wider
  - Added 23 new beatmaps
  - Remove banana rains affecting accuracy
  - Add scoring
- **27/12**
  - Rewrote database system to fit game for web
  - Added metadata to catch site
  - Added background image to games
  - Optimized catch to be ran at slower internet speeds
    - Game will wait for music and hitsounds to be fully loaded before starting
- **29/12**
  - Replace old login-system with Discord oauth2
  - Dimmed catch field during games
  - Add user profiles
- **30/12**
  - Rewrote database system to only add new beatmaps
  - Made server create thumbnails for all beatmap covers to reduce loading speeds
  - Fix slider length
  - Fix slider ending positions
    - No longer randomized, resulting in more accurate gameplay
  - Reduce hitsound size
- **31/12**
  - Added 11 new beatmaps
  - Rework playfield to resize based on display size
  - Add mobile controls
  - Show accuracy with 2 decimals
  - Fixed bug where first fruit always counted as miss
  - Smoothed score changes 
- **1/1**
  - Reworked song select design
  - Add color to fruit sprites
  - Added ranks to user profiles
- **2/1**
  - Add stat for highest combo
  - Add medal pop-ups
  - Rewrote catch scripts to ease modding
- **3/1**
  - Compressed all catch sprites to optimize loading
  - Scaled speeds to work across all refresh rates
- **4/1**
  - Added mobile support
- **7/1**
  - Song title now shown in page title
  - Added more maps
  - Added volume sliders