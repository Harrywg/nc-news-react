> [!NOTE]
> This repo was a project for the [Northcoders Bootcamp](https://github.com/northcoders)

# NC News Frontend
## Intro

Hosted link : https://hwg-nc-news.netlify.app/

This is the front end React application for my fullstack project NC News. I spent a week on this project, building on the foundation of the api available here : https://github.com/Harrywg/nc-news

#### Key Features
- Post, comment, like, delete functionality
- Sorting and filtering
- User context using the js local storage api
- Fully responsive layout for all devices
- Infinite scrolling using the js intersection observer api.

#### Technologies
- React
- JSX
- CSS
- Vite
- React Router

## Using the App
There are multiple pages, of which are all of them standard to see in this type of application.

Note that you will be prompted to log in on first load, of which the session will be kept in storage for future use. All pages are navigable using the UI, but you may navigate in the url if you wish. For mobile devices use the drop down locatable in the top right of the app.

#### Pages
- Login /login
- Home /home
- Topics /topics
- Topic /topics/:topic
- Create Post /create-post

## Instructions
Follow these instructions to set up the project for test and development.

1. First clone the repo in your terminal

```
git clone https://github.com/Harrywg/nc-news-react
```
2. Ensure that you install the required dependencies

```
npm i
```
3. Run dev server
```
npm run dev
```
