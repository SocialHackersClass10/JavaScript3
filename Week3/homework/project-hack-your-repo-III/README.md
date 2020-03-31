
PROJECT: Hack Your Repo III
=====================


PART 1: Modify API data request technique: replace fetch.then().catch() with Axios-async/await
=====================
Applied changes are :
1.  index.html :     Included script for axios library
2.  Model.js :       Modified function fetchJSON() to implement requirements:
converted to async method, replaced fetch API cal with axios and included await for results


PART 2: Moving to the OOP version of the homework
=====================
1.  Util.js :                Added 3 utility functions for data rendering
2.  RepoView.js :            Implemented repository data rendering
3.  ContributorsView.js :    Implemented contributors data rendering
4.  style.css :              Implemented page styles


BONUS: A case study on caveats
=====================
Multiple consecutive data fetches & renders
By design, if the user focuses on the repository selection field without opening the list (with TAB for example) or after a list item was selected, and then presses and holds UP/DOWN arrow buttons, the code will ussue a number of data fetches & renders, equal to the traversed repos, resulting in an equal number of quick consecutive data redraws.

As a proof-of-caveat, this behavior can be clearly observed by opening the original unaltered page, found at
https://github.com/SocialHackersClass10/JavaScript3/tree/master/homework-classes
which does a console log for every fetch and thus demonstrates the effect.

A modification to the fetchData() evocation, whence the fetch & render cycle triggers from, has to be implemented to prevent such ( ? undesired ? ) behavior. Said modification would only re-evoke fetchData() once the currently ongoing fetch & render cycle has completed.

That modification would be implemented in HeaderView.js and should involve the change-handler function of the eventListener.

A similar nehavior prevention modification has already been implemented by me as proof-of-concept in the project of week 2.

