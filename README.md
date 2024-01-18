# Scope and purpose

This app is meant to be a private social media platform to coordinate events with my Men's group.
It was built as the very final project of the Front-End curriculum in my coding school, Devslopes, where I developed proficiency in HTML, CSS, JS, and React.
Because this project is meant as a _pre-cursor_ to learning Databases and Back-End, the CRUD operations are querrying data in a `db.json` file on the Front-End using `JSON Server`, rather than using a real Back-End database.
Subsequent learning in Devslopes curriculum will oversee the implementation of a real backend database with this app.

## Tech used

- React.js
- React Router
- Material UI Content Editable
- React Date Picker
- Github Large File Storage
- JSON Server

## Cool features

- Because this app is meant only for private use, new users are met with a _login gate_, and can only proceed to the `login/sign-up` page upon correct submission of the gate code

- Once submitted, the gate code gets stored in _local storage_ and the login-gate remains unlocked for that user. The login-gate page will never be shown to them again, unless `admin` changes the gate-code

- For security, when a user logs out, the user is `navigated` back to the login screen, which actually **replaces** the home screen in the history stack, meaning that nobody can use the browser back button to access the last logged-in account
  (See `logout()` function in `Home.tsx`)

## Authorization

- All users can post in the community message board, post events, and post a bio and schedule in their own profiles

  ### Message Board

  - In the message board, users can edit or delete comments they themselves wrote by hovering over their own comment and clicking the ellipsis on the right side of the comment box

  - comments written by other users will not reveal an ellipsis when hovered over

  ### Events

  - All users are allowed to edit any existing event
  - Events can only be deleted by the user who created it
  - Events get a title, date, and the option to include further details (`not required`)
  - Event details can be shown or hidden by clicking the down-arrow

  ### Friends

  - All users on the app get displayed in a list of 'Friends' thumbnails, just like Facebook
  - Each thumbnail `<Links to="">` that user's profile using `React-Router`

  ### Profiles

  - A generic profile template gets populated with the data associated with whichever user was clicked on

  - For the currently-logged-in user's own profile, all text information can be edited by simply clicking on it
    - Home
    - Occupation
    - Birthday
    - Bio
    - Schedule Appointments
  - Age is calculated from user's birthday

    _Schedule_

  - Users can hover over each day in their schedule to reveal the "add appointment" button and "trashcan" button
  - Trashcan button renders appointments for that day as a list of checkboxes, where each selected appointment gets added to a "deletion queue"
  - By clicking "delete", the deletion queue gets mapped into array of API calls to a deletion function, which gets executed with a Promise.all()

## Photos

- All photos are currently stored in this app Project folder itself, and stored on Github using Github's Large File Storage service
- the `db.json` file has a separate endpoint, `Photos`, where each object is a link to one of the photos, and an associated date

  ### Photos get sorted and displayed in groups by month

- when the <Photos/> component mounts, all photo links are retrieved, then
  - .sorted() in ascending order, then
  - .reduced() into an object where
    - each key is a month
    - && each value is an array of photos for that month
- that object gets fed into `Object.values()` to return an array of grouped-by-month photo arrays
- the array of grouped-photo-arrays gets mapped over to render photos to the screen sorted by month

## The future of this app

- One idea for the future of this app is that it could be sourced out to any different organizations wanting their own private social media platform, where an organization can have their own "pod" or gated virtual community. When an organization signs up for the app, they are given their own gate, and then all organization members get sorted into data groups associated with that gated community.

- In its current rendition, there is no means for uploading a user profile photo, so all new users get assigned the blank profile image. This is because `large data` storage, like data from photos and videos, usually requires some type of Server storage like an S3 bucket - which was beyond the scope of this project.
  Future possibilities include using a service like an AWS S3 SDK, or a 3rd party service like UploadThing, to allow users to upload their own photos and then query a database to retrieve those photos whenever the app is in use.
  This would provide both for user-submitted profile photos AND users adding to the community Photos collection

- Another future consideration for the `Photos` section is to create a carasoul display where whichever photo that gets clicked on gets displayed in a large window in the center of the screen, with left and right arrows to cycle through the list of photos

- future considerations for the community message board, (`Posts`) section, are to allow users the ability to respond to and like individual comments, and also to keep track of which messages have been read and which are still unread, to properly initiate scroll position within the message board based on wherever a user last left off.

## Considerations regarding Data organization

- I struggled with deciding if the `Users` endpoint and `Profiles` endpoint should be lumped into one endpoint, as users often need to access all of the data contained in `Profiles`, and having these endpoints be separate often means multiple calls in the same event - for example, when creating a new account, calls to both `Users` and `Profiles` must be made to create a new data object for both a new `User` and a new `Profile` connected to the same new account.
  If all of the data in a `Profile` object was simply lumped into the `User` object, less HTTP calls could be made.
  The deciding factor for me was a gut feeling that `Profile` data should not have access to `authentication` (User) data.
  In other words, when the app is making a call to `Profile` data to populate profile information on the screen, it should not have `authentication` data available as an intellisense option.
  This safe-guards against any possibility of human error in future development of the code base.
