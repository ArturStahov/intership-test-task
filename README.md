### intership-test-task

Use libs:

- uniqid;

Use pre/post processor:

- SASS;

Module bundler:

- Webpack;

### Summary:

- Display meetings planned;
- Filter meetings for a particular team member;
- Add new meetings;
- Delete meetings;
- Auto save and load events

### Basic feature

- On a “Calendar” screen user should be able to see all meetings scheduled for
  the meeting room;
- User should be able to filter meetings by person;
- In order to create new meeting user should click “New Event+” button at
  “Calendar” screen, after that he should be transferred to “Create event”
  screen.
- At that screen user should enter meeting title, select participants
  (multiple), select day (Mon-Fri), select time (10:00-18:00); The meeting can
  be successfully created if and only if the time slot for that day and time is
  free. Otherwise the error bar should be shown. After successful creation of an
  event, the user should be transferred back to the “Calendar” screen where new
  event should already be displayed.
- In order to delete a meeting user has to click the delete icon near the
  meeting title at “Calendar” screen and then confirm his action in a
  confirmation dialog.
- Auto save and load events;(localstorage)

GitHub pages: https://ArturStahov.github.io/intership-test-task
