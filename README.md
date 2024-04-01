# DMScreen-project
An online gamemaster's screen intended to be used with 5th-edition dungeons and dragons. The client app is built with React and utilizes iframes to allow users to view other online resources while using this tool. Collapsible space along the margins allows the user to lookup and post rules and items from the open-license 5th-edition SRD for quick reference, or create their own custom cards and tables. A backend server, built with NodeJS + Express, facilitates queries between the client and an external REST API which houses the 5th-edition SRD, as well as a MongoDB database for user creations.

A live demo of this app is available [here](https://murmuring-eyrie-20813-8756f01191e8.herokuapp.com)

The 5th-edition API used by this app is published under a MIT license. You can view it [here](https://github.com/5e-bits/5e-srd-api)
