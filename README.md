# Overview

Axolotl* is a platform that brings coders together. It connects prospective pair-programmers, allowing them to search for similarly-inclined people in their area and choose potential partners based on their skills, interests and background. When matched, our app shares their contact information so they can meet up and start coding!

## Features
- Persistent user profiles stored on a cloud database
- Email notification on successful match
- Stable user interface that allows users to:
  - Sign up, login and sign out
  - View and edit profile information
  - Scroll through other users and invite them to pair program
  - Navigate to other user profiles to read bios and get more info
  - Easily navigate between views in the app

## Getting Started
- Fork repo to GitHub profile and clone files to your computer
- Open two terminal windows
  - Navigate first window to main project folder (`axolotl`)
  - Navigate second window to `axolotl/server`
- Run `npm install` in both folders (server has a separate package.json)
- Run `npm run build` from within main project folder, keep running for auto rebuilds
- Run `npm start` in server folder
- Navigate to  [localhost:5000](http://localhost:5000/) in browser to view application
- Database (Mongo, using Mongoose) is hosted by [mLab](https://mlab.com/)

## Future Features

Iterate on our project! It's stable and well-documented(ish), so you can jump right in and add the stuff you think would be cool!

### Iteration Ideas
- Add support for user photos
- Render a list of matched users in Profile
- Separate matched, invited and nearby users in Feed
- Rework how skills and interests are handled
- Search users by skills / interests / location in Feed
- Add support for chat between matched users
  - Could use web sockets for instant updates and save content to DB
  - Might show up when you navigate to a matched user's profile
- Finish styling application
- Add React Router support
