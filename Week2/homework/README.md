

About the Project (the web page) :
====================================
Extra effort was included to fortify the page from breaking due to bad / unexpected data.

For this reason extra functionality was included and there exists an option to run the page in data emulation mode (which actually is the initial page mode), wherein the data is not requested through an API call, but is instead supplied by an internal function, that produces data with diverse errors, nonexistent, unexpected or invalid values.

To that end, a special "options" section has been added to the top of the page, whence from the page behavior can be influenced.

All the originally-required essential HTML elements are produced through javascript code.
The only additions to the actual html file are those introduced for the new "options" section, and that only so they can retain their settings between page refreshes.


About the "options" section :
====================================
The "options" section can be toggled to visible / hidden by tapping the cog icon on the upper right corner.
If hidden, it will stay so until revealed by taping the same icon (or when you refresh the web page and option #4 is checked)
It can be kept permanently hidden after page refresh, by un-checking option #4.

By default the options are set to emulate API calls, and will do so while option #1 is checked.

Options #1 , #2 and #3 will influence the next fetch operation
(meaning you could mix & match "emulated" and "live" data)
except when the page gets refreshed, where there are 2 consecutive fetches, both of which are subjected to the specified options.

Error production (option #2) is done by:
    a.  in case of emulated data a sample error is thrown
    b.  in case of real API call, the URL is slightly altered to produce an error response

Empty datasets (option #3) are always emulated, regardles of option #1

In case when options #3 and #4 are both checked, then option #3 has precedence, meaning an error result will be produced before an empty dataset.


About the "emulated" data :
====================================
The emulated "repositories" result consists of a special data collection with a multitude of nonexistent, erroneous, null, undefined, empty or missing values, test values, missing names, same names with upper/lower case differences, etc...
It is supposed to test all possible problems a page may encounter, and has to fortify against in order not to break.

The subsequent "contributors" results are semi-random, meaning that names are completely random but images and links are real, tho inserted into random objects, and also the resulting contributor list length is randomized.


About the "live" API data :
====================================
Some subsequent (contributor list) fetches fail because of bad links.
Located repos with links that fail are:
    english-booster
    hyfer-infra
Those 2 hold broken values in their "contributors_url"
Evoking the address on that url, even in the browser, yields an empty page.

Also the repo "DataStructures" has an empty contrib list result.


About the data in general :
====================================
In case of subsequent fetch errors (those for contributors) I have opted not to display an error but instead to just log the error and the link in the console, and then let the page behave as if an empty result was received.

In order to avoid web traffic, and possible github request refusal due to frequency, "contributors" fetching is done once for each repo, and that result is stored and used until page refresh.

That means that, once a result has been received, whether it is an actual list, an empty dataset or an error which results in an empty dataset, that will be the result displayed each time the user selects that repo from the repo selection element.
