# news-explorer-api

The API of "entertainment-web" an entertainment fullstack web app project, features movies and tv shows where user can save media to it's profile.

#### Link to the API: https://entertainment-web-app-api.herokuapp.com/

#### Technologies and Techniques

<p align="left"> 
 <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="express js" width="40" height="40"/>

<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_plain_wordmark_logo_icon_146423.png" alt="mongoDB" width="40" height="40"/>
</p>

#### To run the server

```
  git clone https://github.com/effip24/entertainment-web-app-api.git
```

```
  cd entertainment-web-app-api

```

```
  npm install
```

```
  npm run start
```

#### Link to the API:

| end point                      | Description                            |
| :----------------------------- | :------------------------------------- |
| `POST /signin`                 | authorization                          |
| `POST /signup`                 | registration                           |
| `GET /users`                   | returns all users                      |
| `GET /users/me`                | returns a logged in user               |
| `GET /media`                | returns all media saved by the user |
| `POST /media`               | creates a new media(movie or tv show)                     |
| `DELETE /media/:mediaId ` | deletes the stored media by \_id     |
