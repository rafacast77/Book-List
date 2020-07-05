# Librarian   :books:   
This is a desktop application for a library system. The app allows to manage books, members and bookings. My solution takes an object oriented approach using JS ES6 classes, and static methods.

## This are the requierements fulfilled by the app
* **Books**
  * Book fields with * must be filled.
  * ISBN must be of the correct format.
  * Must use a book object
  * Added books must be added to a dataset and UI.
  * Books can be edited and removed from dataset and UI.
  * Search bar to look for book's ISBN, tittle or author.
  * ISBN can be easily copied to the clipboard
* **Members**
  * Member fields with an * must be filled.
  * Member ID must be randomly generated and unique
  * Must use a Member object.
  * Members must be added to the UI and dataset
  * Members can be edited and removed from dataset and UI
  * Search bar to serch by member's ID, name, phone#.
  * Member ID can be easily copied to clipboard.
* **Booking**
  * All booking fields with an * must be filled.
  * Must use a booking object
  * Must check if member exist in dataset.
  * Must check if member has reached booking limit. (booking limit per member is 2 books at the same time)
  * Must check if book exist in dataset.
  * Must check if book is available.
  * Added bookings must be added to UI and dataset.
  * Bookings must be returned after 7 days of booking, booking must include a date object with a return section informing when the book must be returned and weather is delayed or on time.
  * A return button which removes the booking from UI and dataset. Returns the book to library. Member booking limit is set appropriately.
 * **General**
   * Application is when changing windows size on desktop pc
   * Must rehuse HTML components
   * Must use alerts to inform the user of error or success
   * Must Load dummy examples on DOM load.
   * Must be well documented (No exesive documentation)

## Technologies and techniques used for this project
* **HTML 5**

* **CSS**
   * **Cirrus** A fully responsive CSS framework with beautiful controls and simplistic structure. The framework is well documented and intuitive to use.

* **DOM manipulation with vanilla JavaScript :**
   * Event delegation
   * DOM Styles, Events, Element, Document, Window.
   * Manipulation of Array, string, date object, class object, static methods
* **Color pallette :** :art: 

![Colors](angular-src/src/app/images/NutriApp_color_palette.jpg?raw=true "Color Palette")
