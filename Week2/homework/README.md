

About this web page :
====================================
Extra effort was included to fortify the page from breaking due to bad / unexpected data.

For this reason extra functionality was included and there exists an option (actually it is the initial page mode) to run the page in emulation mode, wherein the data is not requested through an API call, but is instead supplied by an internal function, that produces data with diverse errors, emissions and unexpected / invalid values.

To that end, a special "options" section has been added to the top of the page, whence from the page behavior can be influenced.

All the originally-required essential HTML elements are produced through javascript code.
The only additions to the actual html file are those introduced for the new "options" section, and that only so they can retain their settings between page refreshes.


About the "options" section :
====================================
The upper section, named "options", can be temporary hidden by clicking the black cog on the upper right corner.
If so, it will stay hidden until revealed by clicking the same icon (or when you refresh the web page and option #4 is checked)

It can be kept permanently hidden after page refresh, by un-checking option #4, in which case it can be toggled visible / hidden by tapping the cog icon.

By default the options are set to emulate API calls, and will do so while option #1 named is checked.

Options #1 , #2 and #3 will influence the next fetch operation.
(Meaning you could mix & match "emulated" and "live" data)
An exception to that is: when the page gets refreshed, there are 2 consecutive fetches, both of which are subjected to those options.

Error production (option #2) is done by:
a. in case of emulated data a sample error is thrown
b. in case of real API call, the URL is slightly altered to produce an error response

Empty datasets are always emulated, regardles of option #1

In case when options #3 and #4 are both checked, then option #3 has precedence, meaning an error result will be produced before an empty dataset.


About the "emulated" data :
====================================
The emulated "repositories" result consists of a special data collection with a multitude of nonexistent, erroneous, null, undefined, empty or missing values, test values, missing names, same names with upper/lower case differences, etc...
It is supposed to test all possible problems a page may encounter, and has to fortify against in order not to break.

The subsequent "contributors" results are semi-random, meaning that names are completely random but images and links are real but inserted into random objects, and also the resulting list length is randomized.


About the "live" API data :
====================================
Some subsequent (contributor list) fetches fail because of bad links.
Located (so far) repos with such are:
    english-booster
    hyfer-infra
Those 2 hold broken values in their "contributors_url"
Evoking the address on that url, even in the browser, yields an empty page.

Also the repo "DataStructures" has an empty contrib list result.


About the data in general :
====================================
In case of subsequent fetch errors (those for contributors) I have opted not to display an error but instead to just log the error and the link, and then let the page behave as if an empty result was received.

In order to avoid web traffic, "contributors" fetching is done once for each repo, and that result is stored and used until page refresh.

That means that, once a result has been received, whether it is an actual list, an empty dataset or an error which results in an empty dataset, that will be the result displayed each time the user selects that repo from the repo selection element.
.
