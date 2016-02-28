# NoComment

![logo](https://github.com/dsgriffin/NoComment/raw/master/app/images/icon-128.png)

A Chrome extension for hiding comment sections across the web (Social Media, News Articles, Blogs etc).

# Features
* Users can choose whether to `hide all` comments (except those on URLs/URL patterns specified in the Allow List) or `show all` by default (hiding only the URLs/URL patterns specified in the Block List). **Default**: `hide all`  

* Users can select how they want this to visually look - either `collapsed` (`display: none`) which completely removes the space usually taken or `hidden` (`visibility: hidden`) which keeps the space the comment section would usually take up. **Default**: `collapsed`

* An Allow List and Block List, where users can define URLs/URL patterns they want to allow or block respectively. **Default**: `empty lists`

# Try it out

http://chrome.google.com/webstore/detail/nocomment/bcaffknecaohmingfdfimlbllnebpepe

(Please feel free to rate/provide constructive feedback/share etc)

# Build/Test

**Build**

* Clone repo and run `npm install`
* Run `grunt build` to build the `dist` folder 
* Run `grunt watch` for your changes in `app` to be tracked and to appear in `dist`

**Test**

* Go to the Chrome extensions page (either via `chrome://extensions/` or the `Chrome Settings Tab > More Tools > Extensions`)
* Make sure the `Developer Mode` checkbox is ticked
* Load the `dist` folder as an unpacked extension

**Release**

* When you're finished coding/testing your changes, run `grunt release` which will update the version number (in `app`, `dist` and `package`) and will replace the `zip` inside `package` with the new version of NoComment (which will then be uploaded to the Chrome Web Store by myself).
  
P.S: If you accidentally mess up the release, you can just delete the `dist` + `package` folders and rollback the `version` in `app/manifest.json` :) 

# Contributing

Check the "issues" tab. If you'd like to add any kind of improvement, I would be grateful!

# License

NoComment is licensed under the [MIT](LICENSE.txt) license.