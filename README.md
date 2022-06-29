# ICU_Cap_Map
ICU Capacity map with integrated google maps api support

Author: David Martinez
Version: 1.0 

It is a single page web application that loads an instance of Google Maps into a container, makes an HTTP API request to an endpoint managed by the DHHS, and populates the map with markers that you can hover over to see the ICU bed
information from the specific hosptial. This includes capacity, occupied beds, and when the data was last updated. The map dyanmically fetches the data on load, and refetches as a user pans around the map. The pins are rerendered as the map moves around. The sidebar shows addtional details about the hosptial like adddress, calculated free beds, and the capacity vs occupied is also dynamically updated here. The sidebar has the ability to sort by geographical distance to the user location and alphabetically.

There is also an integrated google auto complete search bar for setting the location inside the app, otherwise the default is over Washington DC, or if allowed by the user, the geographical location reported by the current device.

*TO GET FULL FUNCTIONALITY YOU MUST USE AN API KEY *
